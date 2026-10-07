import { CodeLesson } from '../types';

export const EXPANDED_KOTLIN_LESSONS: CodeLesson[] = [
  {
    id: 'kt-exp-1',
    title: 'Coroutines: Dispatchers, Structured Concurrency & coroutineScope',
    level: 'intermediate',
    durationMinutes: 25,
    summary: 'Coordinate non-blocking asynchronous coroutines using Dispatchers.IO, Dispatchers.Default, and coroutineScope.',
    concepts: ['coroutineScope hierarchy', 'Dispatchers (IO, Default, Main)', 'Cancellation propagation to children', 'runBlocking vs launch'],
    starterCode: `import kotlinx.coroutines.*

fun main() = runBlocking {
    println("Main coroutine started on: \${Thread.currentThread().name}")
    
    val job = launch(Dispatchers.Default) {
        println("Background task running on: \${Thread.currentThread().name}")
        delay(10)
        println("Background task finished.")
    }
    
    job.join()
    println("All coroutines completed.")
}`,
    expectedOutput: 'Main coroutine started on: \nBackground task running on: \nBackground task finished.\nAll coroutines completed.',
    explanation: 'Kotlin Coroutines use structured concurrency where parent coroutine scopes supervise children, ensuring no orphaned background tasks leak.',
    bugChallenge: {
      title: 'GlobalScope Task Leak Anti-Pattern',
      description: 'Launching coroutines in GlobalScope bypasses structured concurrency, leaking resources if the enclosing component is destroyed.',
      buggyCode: `// GlobalScope.launch { delay(10000); } // BUG: Uncontrolled lifetime!`,
      solutionCode: `// coroutineScope { launch { delay(10000); } }`,
      hint: 'Use `coroutineScope` or lifecycle-bound CoroutineScope instead of `GlobalScope`.',
      bugExplanation: '`GlobalScope` creates top-level coroutines that cannot be cancelled with the enclosing parent scope.'
    }
  },
  {
    id: 'kt-exp-2',
    title: 'Kotlin Flows: Cold Streams, Flow Builders & Operators',
    level: 'intermediate',
    durationMinutes: 25,
    summary: 'Emit sequential asynchronous values lazily using cold Flows and transform them with map, filter, and collect.',
    concepts: ['flow { emit() } builder', 'Cold stream lazy execution', 'flowOn(Dispatchers.IO) context switching', 'Terminal operators (collect, toList)'],
    starterCode: `import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*

fun countUpFlow(): Flow<Int> = flow {
    for (i in 1..3) {
        emit(i)
    }
}

fun main() = runBlocking {
    countUpFlow()
        .map { it * 10 }
        .collect { value ->
            println("Collected flow item: \$value")
        }
}`,
    expectedOutput: 'Collected flow item: 10\nCollected flow item: 20\nCollected flow item: 30',
    explanation: 'Flows are cold asynchronous data streams; the block inside `flow { ... }` only executes when a terminal operator like `.collect()` is invoked.',
    bugChallenge: {
      title: 'Context Preservation Invariant Violation in Flow Bug',
      description: 'Calling withContext(Dispatchers.IO) inside a flow builder violates flow context preservation and throws IllegalStateException.',
      buggyCode: `flow { withContext(Dispatchers.IO) { emit(1) } } // BUG: Flow invariant violation!`,
      solutionCode: `flow { emit(1) }.flowOn(Dispatchers.IO) // Safe context switch`,
      hint: 'Use `.flowOn(Dispatchers.IO)` to switch upstream dispatcher.',
      bugExplanation: 'Flow enforces context preservation; emissions must occur in the collector context unless modified via `flowOn`.'
    }
  },
  {
    id: 'kt-exp-3',
    title: 'StateFlow and SharedFlow for Reactive State Management',
    level: 'advanced',
    durationMinutes: 30,
    summary: 'Broadcast observable UI state and one-time events using hot StateFlow and SharedFlow streams.',
    concepts: ['StateFlow vs LiveData', 'MutableStateFlow & value property', 'SharedFlow event broadcasting (replay, extraBufferCapacity)', 'Hot stream lifecycle'],
    starterCode: `import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*

fun main() = runBlocking {
    val state = MutableStateFlow("Initial State")
    println("Current state: \${state.value}")

    val job = launch {
        state.collect { newState ->
            println("Observed state update: \$newState")
        }
    }

    state.value = "User Profile Loaded"
    delay(10)
    job.cancel()
}`,
    expectedOutput: 'Current state: Initial State\nObserved state update: Initial State\nObserved state update: User Profile Loaded',
    explanation: '`StateFlow` is a hot, replay-1 observable state holder that always holds a current value and emits updates to any active subscribers.',
    bugChallenge: {
      title: 'Collecting StateFlow on Inactive Android Lifecycle Bug',
      description: 'Collecting StateFlow directly in UI components without repeatOnLifecycle keeps collecting in the background, wasting battery.',
      buggyCode: `// lifecycleScope.launch { flow.collect() } // Continues collecting when app is in background!`,
      solutionCode: `// lifecycleScope.launch { repeatOnLifecycle(Lifecycle.State.STARTED) { flow.collect() } }`,
      hint: 'Use `repeatOnLifecycle` or `flowWithLifecycle` on Android.',
      bugExplanation: 'StateFlow is hot and active; lifecycle-aware collection pauses emissions when the view is stopped.'
    }
  },
  {
    id: 'kt-exp-4',
    title: 'Inline Functions, noinline & crossinline Modifiers',
    level: 'advanced',
    durationMinutes: 25,
    summary: 'Eliminate lambda object allocation and virtual method invocation overhead using the inline modifier.',
    concepts: ['inline function bytecode substitution', 'Non-local returns (return from caller)', 'crossinline to prevent non-local returns', 'noinline to retain lambda reference'],
    starterCode: `inline fun measureTime(block: () -> Unit) {
    val start = System.currentTimeMillis()
    block()
    val elapsed = System.currentTimeMillis() - start
    println("Execution took: \${elapsed}ms (Zero lambda allocation)")
}

fun main() {
    measureTime {
        var sum = 0
        for (i in 1..1000) sum += i
    }
}`,
    expectedOutput: 'Execution took: 0ms (Zero lambda allocation)',
    explanation: 'The `inline` keyword instructs the Kotlin compiler to copy the function body and lambda directly into the call site, eliminating lambda object allocation.',
    bugChallenge: {
      title: 'Inlining Massive Function Body Code Bloat Bug',
      description: 'Marking large functions as inline causes excessive bytecode bloat because the entire body is duplicated at every call site.',
      buggyCode: `// Inlining a 500-line function called from 50 places expands bytecode by 25,000 lines!`,
      solutionCode: `// Only inline small utility functions that take lambda parameters`,
      hint: 'Reserve `inline` for small functions accepting lambda arguments.',
      bugExplanation: 'Inlining large functions multiplies compiled DEX/JAR binary size unnecessarily.'
    }
  },
  {
    id: 'kt-exp-5',
    title: 'Reified Type Parameters with reified Keyword',
    level: 'intermediate',
    durationMinutes: 20,
    summary: 'Inspect generic types at runtime (`T::class.java`) without passing explicit Class<T> token parameters.',
    concepts: ['reified type parameter syntax', 'inline fun <reified T>', 'Bypassing JVM type erasure', 'Type-safe JSON deserialization helpers'],
    starterCode: `inline fun <reified T> printTypeName(item: Any) {
    if (item is T) {
        println("Item is an instance of: \${T::class.simpleName}")
    } else {
        println("Item is NOT of expected type")
    }
}

fun main() {
    printTypeName<String>("SmartLearn Kotlin")
    printTypeName<Int>(100)
}`,
    expectedOutput: 'Item is an instance of: String\nItem is an instance of: Int',
    explanation: 'Because `inline` functions copy code directly into the call site, the compiler knows the exact concrete type and substitutes `T::class` directly.',
    bugChallenge: {
      title: 'Attempting Reified on Non-Inline Function Bug',
      description: 'Using the reified modifier on a standard non-inline function triggers a compile-time error.',
      buggyCode: `fun <reified T> check(x: Any) {} // BUG: Only type parameters of inline functions can be reified!`,
      solutionCode: `inline fun <reified T> check(x: Any) {}`,
      hint: 'Add the `inline` keyword to the function declaration.',
      bugExplanation: 'Reification is only possible when the compiler inlines the method body at compile time.'
    }
  },
  {
    id: 'kt-exp-6',
    title: 'Kotlin Delegation: by lazy, by Delegates.observable & Custom Delegates',
    level: 'intermediate',
    durationMinutes: 20,
    summary: 'Delegate property reading and writing to reusable handlers using the by keyword.',
    concepts: ['by lazy thread-safe initialization', 'Delegates.observable & vetoable', 'Custom ReadWriteProperty delegate', 'Class delegation (interface forwarding)'],
    starterCode: `import kotlin.properties.Delegates

class UserProfile {
    // Computed once upon first access
    val heavyDatabaseToken: String by lazy {
        println("[LAZY] Generating expensive cryptographic token...")
        "token_sec_9941"
    }

    // Property observation
    var score: Int by Delegates.observable(0) { prop, old, new ->
        println("Property '\${prop.name}' changed from \$old to \$new")
    }
}

fun main() {
    val user = UserProfile()
    println("Accessing token: \${user.heavyDatabaseToken}")
    user.score = 50
    user.score = 100
}`,
    expectedOutput: '[LAZY] Generating expensive cryptographic token...\nAccessing token: token_sec_9941\nProperty \'score\' changed from 0 to 50\nProperty \'score\' changed from 50 to 100',
    explanation: 'Kotlin property delegation delegates getter/setter operations to an underlying object that implements `ReadOnlyProperty` or `ReadWriteProperty`.',
    bugChallenge: {
      title: 'Lazy Property Thread Safety Mode Misconfiguration',
      description: 'Using LazyThreadSafetyMode.NONE in multithreaded environments causes duplicate initialization and race conditions.',
      buggyCode: `val x by lazy(LazyThreadSafetyMode.NONE) { Heavy() } // BUG: Not thread safe!`,
      solutionCode: `val x by lazy(LazyThreadSafetyMode.SYNCHRONIZED) { Heavy() } // Default safe mode`,
      hint: 'Use SYNCHRONIZED (default) for thread-safe lazy properties.',
      bugExplanation: 'SYNCHRONIZED mode uses a double-checked lock to guarantee single initialization across threads.'
    }
  },
  {
    id: 'kt-exp-7',
    title: 'Sealed Classes, Sealed Interfaces & Exhaustive when',
    level: 'scratch',
    durationMinutes: 20,
    summary: 'Model restricted class hierarchies where all subclasses are known at compile time for safe pattern matching.',
    concepts: ['sealed class vs sealed interface', 'Exhaustive when expressions without else', 'Data objects in sealed hierarchies', 'Domain modeling state machines'],
    starterCode: `sealed interface NetworkResult {
    data class Success(val data: String) : NetworkResult
    data class Failure(val error: String) : NetworkResult
    data object Loading : NetworkResult
}

fun handleResult(result: NetworkResult): String = when (result) {
    is NetworkResult.Success -> "Loaded data: \${result.data}"
    is NetworkResult.Failure -> "Failed with error: \${result.error}"
    NetworkResult.Loading -> "Loading in progress..."
}

fun main() {
    val res = NetworkResult.Success("200 OK")
    println(handleResult(res))
}`,
    expectedOutput: 'Loaded data: 200 OK',
    explanation: 'The Kotlin compiler verifies that every subclass of a sealed hierarchy is covered in `when` expressions, eliminating the need for brittle `else` branches.',
    bugChallenge: {
      title: 'Non-Exhaustive When Expression on Sealed Class Bug',
      description: 'Omitting a variant of a sealed hierarchy in a when expression used as a value causes a compile-time error.',
      buggyCode: `val msg = when(res) { is NetworkResult.Success -> "OK" } // BUG: Loading and Failure not handled!`,
      solutionCode: `val msg = when(res) {\n    is NetworkResult.Success -> "OK"\n    is NetworkResult.Failure -> "Err"\n    NetworkResult.Loading -> "Load"\n}`,
      hint: 'Handle all subclasses or provide an else branch.',
      bugExplanation: 'When used as an expression, `when` must be exhaustive.'
    }
  },
  {
    id: 'kt-exp-8',
    title: 'Type-Safe Builders & DSL Design with Domain Scope',
    level: 'advanced',
    durationMinutes: 30,
    summary: 'Design declarative, type-safe DSLs like Kotlin HTML or routing using function types with receiver and @DslMarker.',
    concepts: ['Function types with receiver (T.() -> Unit)', '@DslMarker annotation to prevent scope leaking', 'Hierarchical builder trees', 'Declarative UI design'],
    starterCode: `@DslMarker
annotation class HtmlDsl

@HtmlDsl
class HtmlBuilder {
    private val children = mutableListOf<String>()

    fun body(init: BodyBuilder.() -> Unit) {
        val b = BodyBuilder().apply(init)
        children.add(b.render())
    }

    fun render(): String = "<html>\\n\${children.joinToString(\"\\n\")}\\n</html>"
}

@HtmlDsl
class BodyBuilder {
    private val content = mutableListOf<String>()
    fun p(text: String) { content.add("  <p>\$text</p>") }
    fun render(): String = content.joinToString("\\n")
}

fun html(init: HtmlBuilder.() -> Unit): String = HtmlBuilder().apply(init).render()

fun main() {
    val page = html {
        body {
            p("Welcome to Kotlin Type-Safe DSLs!")
        }
    }
    println(page)
}`,
    expectedOutput: '<html>\n  <p>Welcome to Kotlin Type-Safe DSLs!</p>\n</html>',
    explanation: 'Function types with receiver (`T.() -> Unit`) pass `this` implicitly into lambda bodies, enabling clean, hierarchical DSL syntax.',
    bugChallenge: {
      title: 'Outer Scope Implicit Leak in Nested DSLs Bug',
      description: 'Without @DslMarker, inner blocks can accidentally call outer builder methods, creating corrupted hierarchies.',
      buggyCode: `// body { body { ... } } // Should be disallowed by compiler!`,
      solutionCode: `// Decorate all builder classes with custom @DslMarker annotation`,
      hint: 'Apply a custom `@DslMarker` annotation to builder classes.',
      bugExplanation: '`@DslMarker` restricts implicit `this` calls from outer receiver scopes.'
    }
  },
  {
    id: 'kt-exp-9',
    title: 'Value Classes (@JvmInline value class) for Zero-Cost Abstractions',
    level: 'intermediate',
    durationMinutes: 20,
    summary: 'Wrap primitive values into strongly-typed domain wrappers with zero heap allocation overhead.',
    concepts: ['@JvmInline value class', 'Compile-time type safety', 'Underlying primitive inlined by bytecode', 'Preventing unit-of-measure bugs (Seconds vs Millis)'],
    starterCode: `@JvmInline
value class Milliseconds(val value: Long)

@JvmInline
value class Seconds(val value: Long) {
    fun toMillis(): Milliseconds = Milliseconds(value * 1000)
}

fun waitDuration(ms: Milliseconds) {
    println("Waiting for \${ms.value}ms")
}

fun main() {
    val sec = Seconds(5)
    waitDuration(sec.toMillis())
    // waitDuration(sec) // Rejected at compile time!
}`,
    expectedOutput: 'Waiting for 5000ms',
    explanation: '`@JvmInline value class` wraps a single value into a strongly-typed class that is inlined as a primitive at runtime, avoiding object allocation overhead.',
    bugChallenge: {
      title: 'Value Class Multiple Properties Compilation Bug',
      description: 'Declaring more than one property in a value class causes a compile-time error.',
      buggyCode: `@JvmInline value class Point(val x: Int, val y: Int) // BUG: Value class must have exactly one primary constructor parameter!`,
      solutionCode: `@JvmInline value class XCoordinate(val x: Int)`,
      hint: 'Value classes must wrap exactly one property.',
      bugExplanation: 'The JVM can only inline a value class if it maps directly to a single underlying primitive or reference.'
    }
  },
  {
    id: 'kt-exp-10',
    title: 'Operator Overloading & Custom Infix Functions',
    level: 'scratch',
    durationMinutes: 20,
    summary: 'Create expressive fluent APIs using infix notation and overload standard mathematical operators.',
    concepts: ['infix fun syntax', 'operator fun plus, minus, times', 'operator fun get & set (indexed access)', 'operator fun invoke'],
    starterCode: `data class Point(val x: Int, val y: Int) {
    operator fun plus(other: Point): Point = Point(x + other.x, y + other.y)
}

infix fun String.shouldEqual(expected: String) {
    if (this == expected) {
        println("Assertion PASSED: '\$this' matches '\$expected'")
    } else {
        println("Assertion FAILED: got '\$this', expected '\$expected'")
    }
}

fun main() {
    val p1 = Point(10, 20)
    val p2 = Point(5, 15)
    val p3 = p1 + p2
    println("Added points: x=\${p3.x}, y=\${p3.y}")

    "SmartLearn" shouldEqual "SmartLearn"
}`,
    expectedOutput: 'Added points: x=15, y=35\nAssertion PASSED: \'SmartLearn\' matches \'SmartLearn\'',
    explanation: 'The `operator` modifier binds functions to standard Kotlin operator conventions (`+`, `*`, `[]`), while `infix` allows omitting dot and parentheses.',
    bugChallenge: {
      title: 'Missing operator Keyword on Overloaded Method Bug',
      description: 'Declaring a method named plus without the operator keyword prevents using the + operator symbol.',
      buggyCode: `fun plus(other: Point): Point { ... }\n// p1 + p2 // BUG: '+' not resolved!`,
      solutionCode: `operator fun plus(other: Point): Point { ... }`,
      hint: 'Add the `operator` modifier to the method.',
      bugExplanation: 'Kotlin requires explicit `operator` intent to map method names to symbols.'
    }
  },
  {
    id: 'kt-exp-11',
    title: 'Contracts API (kotlin.contracts): Guiding Smart Casts',
    level: 'advanced',
    durationMinutes: 25,
    summary: 'Inform the compiler about function effects such as null checks and lambda execution guarantees.',
    concepts: ['contract { returns() implies ... }', 'Smart casting custom validation functions', 'callsInPlace lambda contract', 'ExperimentalContracts opt-in'],
    starterCode: `import kotlin.contracts.*

@OptIn(ExperimentalContracts::class)
fun requireString(value: Any?): Boolean {
    contract {
        returns(true) implies (value is String)
    }
    return value is String
}

fun main() {
    val input: Any? = "Kotlin Compiler Contracts"
    if (requireString(input)) {
        // Smart cast to String automatically verified by contract!
        println("Length of verified string: \${input.length}")
    }
}`,
    expectedOutput: 'Length of verified string: 25',
    explanation: 'Kotlin Contracts allow functions to communicate semantic side-effects to the compiler type checker, enabling smart casts across function boundaries.',
    bugChallenge: {
      title: 'Contract Declaration Not First Statement Bug',
      description: 'Placing code before the contract { ... } block triggers a compile-time error.',
      buggyCode: `fun test(x: Any?) {\n    println("probe"); // BUG: contract must be the very first statement!\n    contract { ... }\n}`,
      solutionCode: `fun test(x: Any?) {\n    contract { ... }\n    println("probe");\n}`,
      hint: 'Ensure `contract { ... }` is the very first line of the function body.',
      bugExplanation: 'The Kotlin compiler requires contract declarations to precede any executable code.'
    }
  },
  {
    id: 'kt-exp-12',
    title: 'Variance: Declaration-Site Covariance (out) & Contravariance (in)',
    level: 'advanced',
    durationMinutes: 30,
    summary: 'Master Kotlin declaration-site generics: out for producers (covariant) and in for consumers (contravariant).',
    concepts: ['Declaration-site variance vs Java wildcards', 'Producer out (List<out T>)', 'Consumer in (Comparable<in T>)', 'Type projection site variance'],
    starterCode: `// Covariant producer: Can only produce T, never consume T
interface Source<out T> {
    fun next(): T
}

class StringSource : Source<String> {
    override fun next(): String = "Produced Message"
}

fun main() {
    val stringSource: Source<String> = StringSource()
    // Safe because Source is covariant (out T)
    val anySource: Source<Any> = stringSource
    println("Source output: \${anySource.next()}")
}`,
    expectedOutput: 'Source output: Produced Message',
    explanation: 'Declaration-site variance (`out T`) guarantees that `Source<String>` can be safely assigned to `Source<Any>` because `T` only appears in return positions.',
    bugChallenge: {
      title: 'Using out Type in Parameter Position Bug',
      description: 'Declaring a parameter with an `out` type parameter causes a compilation error because consumers require invariant or in variance.',
      buggyCode: `interface Box<out T> {\n    fun put(item: T) // BUG: Type parameter T is declared as 'out' but occurs in 'in' position!\n}`,
      solutionCode: `interface Box<in T> {\n    fun put(item: T)\n}`,
      hint: 'Use `in` for parameters or remove variance for read/write collections.',
      bugExplanation: 'An `out` type can only be returned; accepting it as a parameter would violate type safety.'
    }
  },
  {
    id: 'kt-exp-13',
    title: 'Scope Functions Deep Dive: let, run, with, apply & also',
    level: 'scratch',
    durationMinutes: 15,
    summary: 'Choose the exact idiomatic scope function based on context object (it vs this) and return value.',
    concepts: ['Context object: this (run, with, apply) vs it (let, also)', 'Return value: Lambda result (let, run, with) vs Context object (apply, also)', 'Null-safe chaining with ?.let', 'Object configuration with apply'],
    starterCode: `class Config {
    var host: String = ""
    var port: Int = 0
}

fun main() {
    // apply: returns context object, uses 'this' for initialization
    val cfg = Config().apply {
        host = "api.smartlearn.io"
        port = 443
    }
    
    // let: returns transformation result, uses 'it'
    val summary = cfg.let { "Connected to \${it.host}:\${it.port}" }
    println(summary)
}`,
    expectedOutput: 'Connected to api.smartlearn.io:443',
    explanation: 'Scope functions execute a block of code within the context of an object. Selecting the right function makes code clean and eliminates temporary variables.',
    bugChallenge: {
      title: 'Using apply When Transformation Result Needed Bug',
      description: 'Using apply instead of let returns the original object rather than the computed lambda result.',
      buggyCode: `val str = user.apply { this.name.uppercase() } // Returns user object, not string!`,
      solutionCode: `val str = user.let { it.name.uppercase() }`,
      hint: 'Use `let` or `run` to return the lambda expression result.',
      bugExplanation: '`apply` always returns the context object itself.'
    }
  },
  {
    id: 'kt-exp-14',
    title: 'Kotlin Multiplatform (KMP): expect/actual Declarations',
    level: 'advanced',
    durationMinutes: 30,
    summary: 'Share business logic across Android, iOS, Desktop, and Web while accessing platform-specific APIs.',
    concepts: ['commonMain shared module', 'expect declaration in shared code', 'actual implementation on Android/iOS', 'KMP compilation targets'],
    starterCode: `// Simulation of expect/actual platform bridge
interface Platform {
    val name: String
}

class JVMPlatform : Platform {
    override val name: String = "JVM Runtime Architecture"
}

fun getPlatform(): Platform = JVMPlatform()

fun main() {
    println("Running on shared KMP target: \${getPlatform().name}")
}`,
    expectedOutput: 'Running on shared KMP target: JVM Runtime Architecture',
    explanation: 'Kotlin Multiplatform uses `expect` in the common module to define platform contracts and `actual` in target platforms to provide native implementations.',
    bugChallenge: {
      title: 'Missing actual Implementation in KMP Target Bug',
      description: 'Declaring an expect class without providing an actual implementation in a target platform fails compilation for that target.',
      buggyCode: `// expect fun getDeviceId(): String // Missing actual fun on iOS target!`,
      solutionCode: `// Provide actual fun getDeviceId() on every configured platform module`,
      hint: 'Ensure every `expect` declaration has a matching `actual` definition per target.',
      bugExplanation: 'KMP linkers verify completeness across all target platforms.'
    }
  },
  {
    id: 'kt-exp-15',
    title: 'Channel Communication & Actors in Coroutines',
    level: 'intermediate',
    durationMinutes: 25,
    summary: 'Pass data streams between coroutines using Channel and protect state with actor-like coroutines.',
    concepts: ['Channel<T>() rendezvous and buffered', 'produce coroutine builder', 'consumeEach and for-loop on channels', 'Actor pattern with channels'],
    starterCode: `import kotlinx.coroutines.*
import kotlinx.coroutines.channels.*

fun main() = runBlocking {
    val channel = Channel<Int>(Channel.BUFFERED)

    launch {
        for (x in 1..3) {
            channel.send(x * x)
        }
        channel.close()
    }

    for (y in channel) {
        println("Received from channel: \$y")
    }
}`,
    expectedOutput: 'Received from channel: 1\nReceived from channel: 4\nReceived from channel: 9',
    explanation: 'Channels facilitate safe communication between concurrently executing coroutines by passing messages rather than sharing memory.',
    bugChallenge: {
      title: 'Reading Closed Channel Without Checking isClosedForReceive',
      description: 'Calling receive() on a closed, empty channel throws ClosedReceiveChannelException.',
      buggyCode: `channel.close(); channel.receive() // BUG: ClosedReceiveChannelException!`,
      solutionCode: `for (item in channel) { ... } // Safely terminates when channel is closed`,
      hint: 'Iterate with `for (item in channel)` or use `receiveCatching()`.',
      bugExplanation: 'A closed channel throws an exception on direct `receive()` once buffered elements are exhausted.'
    }
  },
  {
    id: 'kt-exp-16',
    title: 'Kotlin Coroutines Exception Handling: CoroutineExceptionHandler & SupervisorJob',
    level: 'advanced',
    durationMinutes: 25,
    summary: 'Isolate child coroutine failures to prevent canceling siblings using SupervisorJob.',
    concepts: ['Job vs SupervisorJob', 'Cancellation propagation hierarchy', 'CoroutineExceptionHandler for root launch', 'try/catch in async await()'],
    starterCode: `import kotlinx.coroutines.*

fun main() = runBlocking {
    val handler = CoroutineExceptionHandler { _, exception ->
        println("Caught handled exception: \${exception.message}")
    }

    // SupervisorScope prevents failure of one child from canceling siblings!
    supervisorScope {
        val child1 = launch(handler) {
            println("Child 1 running successfully")
        }
        val child2 = launch(handler) {
            throw RuntimeException("Child 2 encountered simulated network timeout")
        }
        val child3 = launch(handler) {
            delay(10)
            println("Child 3 executed without being cancelled by Child 2 failure!")
        }
        joinAll(child1, child2, child3)
    }
}`,
    expectedOutput: 'Child 1 running successfully\nCaught handled exception: Child 2 encountered simulated network timeout\nChild 3 executed without being cancelled by Child 2 failure!',
    explanation: 'With a standard `Job`, a child failure cancels the parent and all siblings. A `SupervisorJob` isolates child failures so siblings continue executing.',
    bugChallenge: {
      title: 'Passing CoroutineExceptionHandler to async Coroutine Bug',
      description: 'CoroutineExceptionHandler has no effect when passed to async {} because async encapsulates errors inside the returned Deferred.',
      buggyCode: `async(handler) { throw Exception() } // BUG: Handler is ignored!`,
      solutionCode: `val def = async { throw Exception() }; try { def.await() } catch(e: Exception) { ... }`,
      hint: 'Wrap `deferred.await()` in try/catch for `async` coroutines.',
      bugExplanation: '`async` exposes exceptions when `await()` is called rather than dispatching to the uncaught exception handler.'
    }
  },
  {
    id: 'kt-exp-17',
    title: 'Custom Property Getters, Setters & Backing Fields (field)',
    level: 'scratch',
    durationMinutes: 15,
    summary: 'Intercept property reads and writes using custom accessors and the special field identifier.',
    concepts: ['custom get() and set(value)', 'backing field identifier', 'Computed properties without backing fields', 'Private set visibility'],
    starterCode: `class BankAccount {
    var balance: Double = 0.0
        set(value) {
            if (value >= 0.0) {
                field = value // 'field' refers to backing storage
            } else {
                println("Rejected negative balance update: \$value")
            }
        }

    // Computed property (no backing field generated in bytecode)
    val isPositive: Boolean
        get() = balance > 0.0
}

fun main() {
    val account = BankAccount()
    account.balance = 500.0
    println("Balance: \${account.balance}, IsPositive: \${account.isPositive}")
    account.balance = -100.0 // Rejected
}`,
    expectedOutput: 'Balance: 500.0, IsPositive: true\nRejected negative balance update: -100.0',
    explanation: 'The `field` identifier represents the property backing field inside accessors. Properties with only a getter generate no memory allocation in bytecode.',
    bugChallenge: {
      title: 'Recursive Property Call Inside Setter StackOverflow Bug',
      description: 'Using the property name instead of `field` inside its own setter triggers infinite recursive calls and StackOverflowError.',
      buggyCode: `set(value) { this.balance = value } // BUG: Recursively calls setter until crash!`,
      solutionCode: `set(value) { field = value }`,
      hint: 'Assign to `field` instead of `this.propertyName`.',
      bugExplanation: 'Referencing the property name calls its setter method recursively.'
    }
  },
  {
    id: 'kt-exp-18',
    title: 'Null Safety: Safe Call (?.), Elvis (?:) & Not-Null Assertion (!!)',
    level: 'scratch',
    durationMinutes: 15,
    summary: 'Write resilient, null-pointer-free code using idiomatic Kotlin null safety primitives.',
    concepts: ['Nullable types (String?)', 'Safe call operator (?.)', 'Elvis operator (?:)', 'Double-bang (!!) dangers and best practices'],
    starterCode: `fun processEmail(email: String?): String {
    // Elvis operator with fallback default
    val validEmail = email?.trim()?.takeIf { it.contains("@") } ?: "guest@smartlearn.ai"
    return validEmail
}

fun main() {
    println("With valid input: " + processEmail("  alex@dev.org  "))
    println("With null input: " + processEmail(null))
    println("With malformed input: " + processEmail("invalid-email"))
}`,
    expectedOutput: 'With valid input: alex@dev.org\nWith null input: guest@smartlearn.ai\nWith malformed input: guest@smartlearn.ai',
    explanation: 'Kotlin null safety distinguishes nullable from non-nullable types at compile time, eliminating NullPointerExceptions with the Elvis fallback operator.',
    bugChallenge: {
      title: 'Using !! on Null Value Crash',
      description: 'Applying the !! operator on a null variable throws KotlinNullPointerException.',
      buggyCode: `val s: String? = null;\nprintln(s!!.length); // BUG: NullPointerException!`,
      solutionCode: `val s: String? = null;\nprintln(s?.length ?: 0);`,
      hint: 'Use `?.` with `?:` instead of `!!`.',
      bugExplanation: '`!!` asserts that a value is non-null, throwing an exception if it is null.'
    }
  },
  {
    id: 'kt-exp-19',
    title: 'Kotlin Reflection & KClass Properties (kotlin.reflect)',
    level: 'advanced',
    durationMinutes: 25,
    summary: 'Inspect constructors, member properties, and annotations programmatically using KClass.',
    concepts: ['KClass<T> vs Java Class<T>', 'memberProperties & memberFunctions', 'call() and callBy() with named parameters', 'Checking isSubclassOf'],
    starterCode: `import kotlin.reflect.full.*

data class Course(val title: String, val hours: Int)

fun main() {
    val kClass = Course::class
    println("Class simple name: \${kClass.simpleName}")
    println("Is data class: \${kClass.isData}")

    val instance = Course("Kotlin Systems", 12)
    kClass.memberProperties.forEach { prop ->
        println("Property: \${prop.name} = \${prop.call(instance)}")
    }
}`,
    expectedOutput: 'Class simple name: Course\nIs data class: true\nProperty: hours = 12\nProperty: title = Kotlin Systems',
    explanation: 'Kotlin reflection (`kotlin.reflect`) provides idiomatic access to Kotlin features (nullable types, default arguments) beyond standard Java reflection.',
    bugChallenge: {
      title: 'Missing kotlin-reflect.jar Runtime Dependency Bug',
      description: 'Using advanced reflection features without bundling kotlin-reflect.jar causes KotlinReflectionNotSupportedError at runtime.',
      buggyCode: `// Calling .memberProperties without kotlin-reflect dependency throws runtime error!`,
      solutionCode: `// Ensure implementation("org.jetbrains.kotlin:kotlin-reflect") is in build.gradle`,
      hint: 'Include the `kotlin-reflect` library in dependencies.',
      bugExplanation: 'Full Kotlin reflection is packaged as an optional library to minimize standard app binary size.'
    }
  },
  {
    id: 'kt-exp-20',
    title: 'Coroutines Mutex, Semaphore & Thread Confinement',
    level: 'advanced',
    durationMinutes: 25,
    summary: 'Protect shared mutable state across coroutines using non-blocking Mutex and SingleThreadDispatcher.',
    concepts: ['kotlinx.coroutines.sync.Mutex', 'mutex.withLock { }', 'Semaphore for concurrency rate limiting', 'Dispatchers.newSingleThreadContext confinement'],
    starterCode: `import kotlinx.coroutines.*
import kotlinx.coroutines.sync.Mutex
import kotlinx.coroutines.sync.withLock

class SafeCoroutinesCounter {
    private val mutex = Mutex()
    var count = 0
        private set

    suspend fun increment() {
        // Non-blocking lock (suspends, does not block OS thread!)
        mutex.withLock {
            count++
        }
    }
}

fun main() = runBlocking {
    val counter = SafeCoroutinesCounter()
    val jobs = List(10) {
        launch(Dispatchers.Default) {
            counter.increment()
        }
    }
    jobs.joinAll()
    println("Final safe concurrent count: \${counter.count}")
}`,
    expectedOutput: 'Final safe concurrent count: 10',
    explanation: '`Mutex.withLock` suspends the coroutine instead of blocking the underlying OS thread, allowing other coroutines on that thread to continue executing.',
    bugChallenge: {
      title: 'Using Java synchronized Inside Coroutines Bug',
      description: 'Using synchronized (lock) inside a coroutine blocks the carrier thread, breaking cooperative multitasking.',
      buggyCode: `synchronized(lock) { delay(100) } // BUG: delay is suspend function; illegal inside synchronized!`,
      solutionCode: `mutex.withLock { delay(100) } // Safe! Coroutine-aware suspension lock`,
      hint: 'Use `kotlinx.coroutines.sync.Mutex` instead of `synchronized`.',
      bugExplanation: 'Suspension functions cannot be called inside `synchronized` blocks; `Mutex` is coroutine-native.'
    }
  }
];
