import { CourseDiagnosticAssessment } from './courseDiagnostics';

export const ADDITIONAL_COURSE_DIAGNOSTICS: Record<string, CourseDiagnosticAssessment> = {
  'track-java': {
    trackId: 'track-java',
    trackName: 'Java 21 LTS Master Track',
    timeLimitMinutes: 8,
    questions: [
      {
        id: 'java-pre-1',
        tier: 'scratch',
        topicKey: 'java-scratch-records',
        topicTitle: 'Records & Immutable Data Carriers',
        question: 'What does a Java 21 Record implicitly provide upon declaration?',
        codeSnippet: `public record Point(int x, int y) {}`,
        options: [
          'Mutable setter methods for all fields',
          'Private final fields, canonical constructor, accessors x() and y(), equals(), hashCode(), and toString()',
          'A database table mapping automatically',
          'Multiple inheritance from multiple classes'
        ],
        correctIndex: 1,
        explanation: 'Java Records are transparent carriers for immutable data, automatically generating canonical constructors, getters (field name without get), equals, hashCode, and toString.'
      },
      {
        id: 'java-pre-2',
        tier: 'scratch',
        topicKey: 'java-scratch-matching',
        topicTitle: 'Pattern Matching for Switch',
        question: 'Why does pattern matching in Java 21 eliminate redundant explicit type casting?',
        codeSnippet: `static String format(Object obj) {
    return switch (obj) {
        case Integer i -> "Integer: " + i;
        case String s  -> "String length: " + s.length();
        default        -> "Unknown";
    };
}`,
        options: [
          'It forces all objects to become strings',
          'The compiler binds the matched type directly to the pattern variable (e.g., s as String), eliminating the need for instanceof and manual (String)obj casts',
          'It converts types to C++ void pointers',
          'It runs dynamically via JavaScript eval'
        ],
        correctIndex: 1,
        explanation: 'Pattern matching performs test and extraction atomically: if obj matches String, pattern variable "s" is scoped as a strongly-typed String.'
      },
      {
        id: 'java-pre-3',
        tier: 'intermediate',
        topicKey: 'java-inter-streams',
        topicTitle: 'Streams & Terminal Operations',
        question: 'What is the evaluation characteristic of intermediate operations in the Java Stream API?',
        codeSnippet: `var stream = list.stream().filter(x -> x > 10).map(x -> x * 2);`,
        options: [
          'They execute immediately and create intermediate List allocations at each step',
          'They are lazy: no computation or traversal occurs until a terminal operation (like collect, count, or forEach) is invoked',
          'They spawn new virtual threads for each element',
          'They mutate the original collection directly'
        ],
        correctIndex: 1,
        explanation: 'Java Streams are lazily evaluated pipelines. Intermediate operations (filter, map) only describe the transformation; processing begins upon invoking a terminal operation.'
      },
      {
        id: 'java-pre-4',
        tier: 'intermediate',
        topicKey: 'java-inter-try-resources',
        topicTitle: 'Try-With-Resources & AutoCloseable',
        question: 'Which interface must a resource class implement to be managed safely inside a Java try-with-resources statement?',
        codeSnippet: `try (var conn = dataSource.getConnection()) { ... }`,
        options: [
          'java.io.Serializable',
          'java.lang.AutoCloseable',
          'java.lang.Runnable',
          'java.util.Observer'
        ],
        correctIndex: 1,
        explanation: 'try-with-resources requires AutoCloseable (or Closeable). The JVM guarantees close() is invoked upon exit, even when exceptions occur.'
      },
      {
        id: 'java-pre-5',
        tier: 'advanced',
        topicKey: 'java-adv-virtual-threads',
        topicTitle: 'Virtual Threads (Project Loom)',
        question: 'How do Java 21 Virtual Threads differ fundamentally from traditional java.lang.Thread OS platform threads?',
        codeSnippet: `Thread.startVirtualThread(() -> { ... });`,
        options: [
          'Virtual threads require 1MB of reserved stack memory each',
          'Virtual threads are lightweight JVM-managed tasks that unmount from carrier OS threads during blocking I/O, allowing millions of concurrent tasks with minimal RAM',
          'Virtual threads cannot perform network I/O',
          'Virtual threads run exclusively on the GPU'
        ],
        correctIndex: 1,
        explanation: 'Traditional platform threads map 1:1 to OS kernel threads (~1MB stack). Virtual threads are cheap JVM heap objects that unmount during blocking I/O, scaling to millions of concurrent connections.'
      },
      {
        id: 'java-pre-6',
        tier: 'advanced',
        topicKey: 'java-adv-zgc',
        topicTitle: 'JVM Memory Architecture & Low-Latency GC',
        question: 'What enables ZGC (Z Garbage Collector) to maintain sub-millisecond pauses across multi-terabyte heaps?',
        codeSnippet: `// JVM flag: -XX:+UseZGC -XX:+ZGenerational`,
        options: [
          'Freezing all application threads during heap compaction',
          'Concurrent execution of all major GC phases using colored pointers and load barriers with reference processing during active application runtime',
          'Disabling all heap memory and storing objects in CPU registers',
          'Deleting old generation objects without verification'
        ],
        correctIndex: 1,
        explanation: 'ZGC performs marking, relocation, and reference processing concurrently with mutator threads using colored reference pointers and read load barriers.'
      }
    ]
  },

  'track-kotlin': {
    trackId: 'track-kotlin',
    trackName: 'Kotlin Master Track',
    timeLimitMinutes: 8,
    questions: [
      {
        id: 'kt-pre-1',
        tier: 'scratch',
        topicKey: 'kt-scratch-null',
        topicTitle: 'Null Safety & Safe Calls',
        question: 'In Kotlin, what does the Elvis operator `?:` evaluate to when the left operand is null?',
        codeSnippet: `val length = text?.length ?: -1`,
        options: [
          'It throws a NullPointerException',
          'It returns the fallback expression on the right (-1)',
          'It evaluates to null',
          'It loops indefinitely'
        ],
        correctIndex: 1,
        explanation: 'The Elvis operator ?: returns the left-hand expression if non-null; otherwise, it computes and returns the right-hand fallback expression.'
      },
      {
        id: 'kt-pre-2',
        tier: 'scratch',
        topicKey: 'kt-scratch-dataclass',
        topicTitle: 'Data Classes & Destructuring',
        question: 'Which component functions does the Kotlin compiler generate automatically for data classes?',
        codeSnippet: `data class Point(val x: Int, val y: Int)
val (px, py) = Point(10, 20)`,
        options: [
          'component1(), component2(), etc., enabling positional destructuring declarations',
          'None, destructuring requires manual reflection',
          'SQL queries',
          'Serialization to XML only'
        ],
        correctIndex: 0,
        explanation: 'Data classes automatically generate componentN() methods corresponding to constructor properties, powering destructuring syntax like val (a, b) = pair.'
      },
      {
        id: 'kt-pre-3',
        tier: 'intermediate',
        topicKey: 'kt-inter-coroutines',
        topicTitle: 'Coroutines & Suspension Points',
        question: 'What happens when a coroutine encounters a `delay()` call inside a suspend function?',
        codeSnippet: `suspend fun perform() { delay(1000) }`,
        options: [
          'The underlying OS thread is blocked and idle for 1 second',
          'The coroutine suspends without blocking the OS thread, freeing the thread to run other coroutines on the dispatcher',
          'The program exits immediately',
          'A new thread is created'
        ],
        correctIndex: 1,
        explanation: 'Coroutines suspend cooperatively: delay unregisters the task from the thread scheduler and schedules a resume event without blocking the underlying thread.'
      },
      {
        id: 'kt-pre-4',
        tier: 'intermediate',
        topicKey: 'kt-inter-flow',
        topicTitle: 'Reactive Flow vs Iterable',
        question: 'Why is Kotlin Flow considered an asynchronous cold stream?',
        codeSnippet: `val numbers = flow { emit(1); delay(100); emit(2) }`,
        options: [
          'Because it freezes system RAM',
          'The flow builder code does not execute until a terminal operator (like collect()) is invoked by a collector',
          'It runs in a separate process',
          'It can only emit strings'
        ],
        correctIndex: 1,
        explanation: 'Flows are cold streams: each invocation of collect() independently triggers the flow producer block from scratch.'
      },
      {
        id: 'kt-pre-5',
        tier: 'advanced',
        topicKey: 'kt-adv-reified',
        topicTitle: 'Inline Functions & Reified Types',
        question: 'Why does Kotlin require `inline` when using `reified` type parameters?',
        codeSnippet: `inline fun <reified T> isType(value: Any) = value is T`,
        options: [
          'Because JVM type erasure removes generic type arguments at compile time, but inlining copies the concrete class bytecode directly into the call site',
          'Because inline makes the binary smaller',
          'To prevent garbage collection',
          'To bypass Java security managers'
        ],
        correctIndex: 0,
        explanation: 'JVM bytecodes erase generic type arguments. When an inline function has a reified parameter, the compiler replaces T with the exact concrete type directly at call sites.'
      },
      {
        id: 'kt-pre-6',
        tier: 'advanced',
        topicKey: 'kt-adv-concurrency',
        topicTitle: 'Structured Concurrency & Cancellation',
        question: 'In Kotlin Structured Concurrency, what occurs if one child coroutine inside a `coroutineScope` fails with an unhandled exception?',
        codeSnippet: `coroutineScope {
    launch { throw RuntimeException("Error") }
    launch { delay(5000); println("Done") }
}`,
        options: [
          'The failing child is ignored and other children continue unaffected',
          'The exception cancels the parent scope, which in turn cancels all sibling child coroutines, guaranteeing no leaked background tasks',
          'The JVM crashes immediately',
          'The exception is swallowed silently'
        ],
        correctIndex: 1,
        explanation: 'Structured concurrency guarantees no leaked tasks: an uncaught exception cancels the parent scope, propagating cancellation down to all active sibling coroutines.'
      }
    ]
  },

  'track-swift': {
    trackId: 'track-swift',
    trackName: 'Swift 6 Master Track',
    timeLimitMinutes: 8,
    questions: [
      {
        id: 'swift-pre-1',
        tier: 'scratch',
        topicKey: 'swift-scratch-values',
        topicTitle: 'Value Types vs Reference Types',
        question: 'What is the primary memory and behavior distinction between a Swift `struct` and a `class`?',
        codeSnippet: `struct Position { var x: Int }\nclass Coordinate { var x: Int }`,
        options: [
          'Classes cannot have methods',
          'Structs are value types (copied upon assignment with value semantics); Classes are reference types (variables hold pointers to a shared instance)',
          'Structs are stored in the Cloud; Classes are local',
          'Classes do not support inheritance'
        ],
        correctIndex: 1,
        explanation: 'Structs have value semantics (independent instances copied upon mutation); Classes have reference semantics with shared mutable state.'
      },
      {
        id: 'swift-pre-2',
        tier: 'scratch',
        topicKey: 'swift-scratch-optionals',
        topicTitle: 'Optionals & Guard Let Unwrapping',
        question: 'Why is `guard let` preferred over deeply nested `if let` for early returns in Swift?',
        codeSnippet: `guard let token = user.token else { return }`,
        options: [
          'guard let runs faster on older iPhones',
          'guard let unwraps optionals into the outer scope and mandates an early exit (return/throw) if nil, avoiding nested pyramid of doom code',
          'guard let forces the variable to be global',
          'guard let converts nil to empty string automatically'
        ],
        correctIndex: 1,
        explanation: 'guard let promotes happy-path code alignment by requiring an early exit in the else clause, while keeping the unwrapped constant available in the rest of the function scope.'
      },
      {
        id: 'swift-pre-3',
        tier: 'intermediate',
        topicKey: 'swift-inter-arc',
        topicTitle: 'Automatic Reference Counting (ARC) & Retain Cycles',
        question: 'How do `weak` and `unowned` references resolve retain cycles between two class instances in Swift?',
        codeSnippet: `class DelegateHandler { weak var delegate: Delegate? }`,
        options: [
          'They delete the classes from RAM',
          'They do not increment the instance ARC reference count, allowing memory deallocation when strong references reach zero',
          'They convert references into C strings',
          'They trigger garbage collection every 10ms'
        ],
        correctIndex: 1,
        explanation: 'Swift uses ARC. If two instances hold strong references to each other, a retain cycle occurs (leak). weak/unowned references do not increase reference count.'
      },
      {
        id: 'swift-pre-4',
        tier: 'intermediate',
        topicKey: 'swift-inter-async',
        topicTitle: 'Async / Await Cooperative Concurrency',
        question: 'What happens to the thread when execution reaches an `await` expression in Swift?',
        codeSnippet: `let data = await downloadPayload()`,
        options: [
          'The OS thread blocks and waits synchronously',
          'The function yields its execution thread to the system cooperative pool, resuming when the awaited asynchronous task completes',
          'The app crashes if on main thread',
          'It creates a new UI window'
        ],
        correctIndex: 1,
        explanation: 'await marks a suspension point: the function yields its underlying thread to execute other waiting tasks, preventing thread explosion.'
      },
      {
        id: 'swift-pre-5',
        tier: 'advanced',
        topicKey: 'swift-adv-actors',
        topicTitle: 'Actors & Data Race Safety',
        question: 'How do Swift 6 Actors guarantee thread safety without requiring manual pthread mutexes?',
        codeSnippet: `actor CacheStore { private var items: [String: Data] = [:] }`,
        options: [
          'Actors disable multi-core CPU execution',
          'Actors isolate their mutable state, serializing all access so only one task can mutate their state at any instant',
          'Actors store data in SQLite',
          'Actors convert all variables into constants'
        ],
        correctIndex: 1,
        explanation: 'Actors enforce state isolation: caller tasks must use await to asynchronously interact with actor methods, guaranteeing data-race free execution.'
      },
      {
        id: 'swift-pre-6',
        tier: 'advanced',
        topicKey: 'swift-adv-sendable',
        topicTitle: 'Sendable Types & Swift 6 Strict Concurrency',
        question: 'What is the role of the `Sendable` protocol in Swift 6 compile-time safety?',
        codeSnippet: `protocol Sendable {}`,
        options: [
          'It handles network JSON packet dispatch',
          'It verifies at compile time that a value can be safely passed across concurrent execution boundaries without data races',
          'It encodes audio streams',
          'It encrypts passwords'
        ],
        correctIndex: 1,
        explanation: 'Sendable types can be safely passed across concurrency domains without data races (e.g., value types, immutable classes, or actor-isolated types).'
      }
    ]
  },

  'track-csharp': {
    trackId: 'track-csharp',
    trackName: 'C# 12 & .NET 8 Master Track',
    timeLimitMinutes: 8,
    questions: [
      {
        id: 'cs-pre-1',
        tier: 'scratch',
        topicKey: 'cs-scratch-struct-class',
        topicTitle: 'Value Types (struct) vs Reference Types (class)',
        question: 'Where are value types primarily stored compared to standard reference type objects in .NET?',
        codeSnippet: `struct Point { public int X; public int Y; }`,
        options: [
          'Value types are always stored on hard disk',
          'Value types live inline where declared (on the stack or inside their containing object); Reference types reside on the managed heap accessed via pointers',
          'Both are stored identically in CPU L1 cache only',
          'Reference types do not consume memory'
        ],
        correctIndex: 1,
        explanation: 'Structs are value types allocated inline on the stack or embedded inside containing types. Classes are reference types allocated on the garbage-collected managed heap.'
      },
      {
        id: 'cs-pre-2',
        tier: 'scratch',
        topicKey: 'cs-scratch-linq',
        topicTitle: 'LINQ & Deferred Execution',
        question: 'Why does the following LINQ query not iterate through `orders` when defined?',
        codeSnippet: `var highValue = orders.Where(o => o.Amount > 1000);`,
        options: [
          'Because the query has a syntax error',
          'LINQ operators use deferred execution; evaluation occurs only when enumerated (e.g., in a foreach loop, .ToList(), or .Count())',
          'Because orders is empty',
          'Because LINQ only runs on SQL servers'
        ],
        correctIndex: 1,
        explanation: 'Deferred execution ensures queries represent an iterator definition rather than the execution result. Materialization triggers traversal.'
      },
      {
        id: 'cs-pre-3',
        tier: 'intermediate',
        topicKey: 'cs-inter-async',
        topicTitle: 'Async/Await & ValueTask vs Task',
        question: 'When should high-performance .NET code return `ValueTask<T>` instead of `Task<T>`?',
        codeSnippet: `public ValueTask<int> GetCountAsync()`,
        options: [
          'Never, Task is always superior',
          'When the operation frequently completes synchronously (e.g. from cache), avoiding unnecessary Task heap allocations on the GC',
          'When running on mobile devices only',
          'When using thread sleep'
        ],
        correctIndex: 1,
        explanation: 'ValueTask<T> is a struct. If the result is already available synchronously, returning ValueTask avoids allocating a Task object on the heap.'
      },
      {
        id: 'cs-pre-4',
        tier: 'intermediate',
        topicKey: 'cs-inter-generics',
        topicTitle: 'Generic Constraints & Collections',
        question: 'What does the constraint `where T : class, new()` enforce on a generic type in C#?',
        codeSnippet: `public class Factory<T> where T : class, new()`,
        options: [
          'T must be an int and have no constructor',
          'T must be a reference type and possess a public parameterless constructor',
          'T must be an abstract class',
          'T can only be instantiated once per process'
        ],
        correctIndex: 1,
        explanation: 'where T : class restricts T to reference types; new() requires T to have an accessible zero-parameter constructor so new T() can be called.'
      },
      {
        id: 'cs-pre-5',
        tier: 'advanced',
        topicKey: 'cs-adv-span',
        topicTitle: 'Span<T> & Zero-Allocation Memory Slicing',
        question: 'What prevents `Span<T>` from being stored as a field in a standard managed class?',
        codeSnippet: `public ref struct MyParser { Span<byte> data; }`,
        options: [
          'It is too large for 64-bit systems',
          'Span<T> is a `ref struct` guaranteed to live only on the stack, preventing dangling pointers to stack memory if the containing class survives on the heap',
          'The CLR compiler restricts generics inside structs',
          'Span<T> can be stored in classes if marked static'
        ],
        correctIndex: 1,
        explanation: 'Span<T> is a ref struct. By disallowing heap allocation (boxing, class fields), the CLR guarantees it will never outlive the memory buffer it references.'
      },
      {
        id: 'cs-pre-6',
        tier: 'advanced',
        topicKey: 'cs-adv-gc',
        topicTitle: '.NET Garbage Collection Generations',
        question: 'What is the function of the Large Object Heap (LOH) in the .NET GC architecture?',
        codeSnippet: `// Allocations >= 85,000 bytes:`,
        options: [
          'To run garbage collection twice as fast',
          'To hold objects 85,000 bytes or larger, collected during Gen 2 collections and typically not compacted to avoid expensive memory copying',
          'To store all strings in the program',
          'To cache web requests'
        ],
        correctIndex: 1,
        explanation: 'The LOH stores large allocations (>= 85,000 bytes). Compacting huge memory chunks is CPU-intensive, so LOH is collected with Gen 2 and avoids relocation by default.'
      }
    ]
  },

  'track-ruby': {
    trackId: 'track-ruby',
    trackName: 'Ruby 3 Master Track',
    timeLimitMinutes: 8,
    questions: [
      {
        id: 'rb-pre-1',
        tier: 'scratch',
        topicKey: 'rb-scratch-blocks',
        topicTitle: 'Blocks, Yield & Closures',
        question: 'What happens when a method executes `yield` without any arguments in Ruby?',
        codeSnippet: `def repeat; yield; end`,
        options: [
          'The program terminates',
          'It executes the code block supplied by the caller at the call site',
          'It pauses the CPU for 1 second',
          'It returns nil'
        ],
        correctIndex: 1,
        explanation: 'In Ruby, yield invokes the block associated with the method call, passing control temporarily to the caller block.'
      },
      {
        id: 'rb-pre-2',
        tier: 'scratch',
        topicKey: 'rb-scratch-symbols',
        topicTitle: 'Symbols vs Strings',
        question: 'Why are Symbols (`:status`) preferred over Strings (`"status"`) as hash keys in Ruby?',
        codeSnippet: `options = { status: :active }`,
        options: [
          'Strings cannot be used as keys',
          'Symbols are immutable and interned into a single object ID across the entire Ruby runtime, reducing memory allocation and speeding up equality checks',
          'Symbols are encrypted',
          'Symbols can only contain numbers'
        ],
        correctIndex: 1,
        explanation: 'Each String literal creates a distinct heap object; Symbols are interned immutable identifiers sharing a single object ID.'
      },
      {
        id: 'rb-pre-3',
        tier: 'intermediate',
        topicKey: 'rb-inter-mixins',
        topicTitle: 'Modules, Include vs Prepend',
        question: 'In Ruby method lookup order (ancestors), where does `prepend ModuleName` place the module relative to the host class?',
        codeSnippet: `class Service; prepend Logging; end`,
        options: [
          'After the Superclass',
          'Before the host class itself, allowing the module method to intercept calls and invoke `super` to reach the class implementation',
          'It replaces all methods permanently',
          'At the end of Object'
        ],
        correctIndex: 1,
        explanation: 'prepend inserts the module before the class in the ancestor chain, making it the primary method interception mechanism.'
      },
      {
        id: 'rb-pre-4',
        tier: 'intermediate',
        topicKey: 'rb-inter-procs',
        topicTitle: 'Procs vs Lambdas',
        question: 'How do Lambdas differ from standard Procs regarding argument checking and return behavior in Ruby?',
        codeSnippet: `my_lambda = ->(x) { return x * 2 }`,
        options: [
          'They are completely identical',
          'Lambdas strictly check argument counts (arity) and a `return` exits only the lambda, whereas a Proc returns from the enclosing method',
          'Procs run faster on macOS',
          'Lambdas cannot accept parameters'
        ],
        correctIndex: 1,
        explanation: 'Lambdas behave like regular methods: strict parameter count validation and local return scope.'
      },
      {
        id: 'rb-pre-5',
        tier: 'advanced',
        topicKey: 'rb-adv-metaprogramming',
        topicTitle: 'The Ruby Object Model & Eigenclasses',
        question: 'Where does Ruby store singleton methods defined on a specific individual object instance (`def obj.special_method`)?',
        codeSnippet: `obj = Object.new\ndef obj.speak; "Hi"; end`,
        options: [
          'Directly in Kernel',
          'In the object\'s anonymous singleton class (eigenclass / metaclass) inserted just above the object in the lookup hierarchy',
          'In global RAM',
          'On disk'
        ],
        correctIndex: 1,
        explanation: 'Ruby dynamically inserts a hidden singleton class (eigenclass) between the instance and its real class to hold object-specific methods.'
      },
      {
        id: 'rb-pre-6',
        tier: 'advanced',
        topicKey: 'rb-adv-ractors',
        topicTitle: 'Ruby 3 Ractors & True Multi-Core Concurrency',
        question: 'How do Ruby 3 Ractors achieve true multi-core parallel execution despite MRI\'s Global VM Lock (GVL)?',
        codeSnippet: `r = Ractor.new { ... }`,
        options: [
          'By compiling Ruby to C++ at runtime',
          'Each Ractor possesses an isolated memory heap and its own GVL; Ractors communicate solely via message passing without shared mutable state',
          'By disabling thread switching',
          'By running in the browser'
        ],
        correctIndex: 1,
        explanation: 'Ractors (Ruby Actors) have isolated heaps and independent GVLs, unlocking true parallel thread execution across multi-core CPUs without data races.'
      }
    ]
  },

  'track-php': {
    trackId: 'track-php',
    trackName: 'PHP 8.3 Master Track',
    timeLimitMinutes: 8,
    questions: [
      {
        id: 'php-pre-1',
        tier: 'scratch',
        topicKey: 'php-scratch-strict',
        topicTitle: 'Strict Typing & Return Declarations',
        question: 'What does `declare(strict_types=1);` enforce at the top of a PHP file?',
        codeSnippet: `declare(strict_types=1);
function add(int $a, int $b): int { return $a + $b; }`,
        options: [
          'It forces all variable names to be capitalized',
          'It prohibits scalar type coercion at call sites in that file; passing a string like "5" to an int parameter throws a TypeError',
          'It disables error logging',
          'It compiles the file to Java'
        ],
        correctIndex: 1,
        explanation: 'declare(strict_types=1) disables PHP’s default coercive type conversions, ensuring callers pass exact type signatures or receive a fatal TypeError.'
      },
      {
        id: 'php-pre-2',
        tier: 'scratch',
        topicKey: 'php-scratch-match',
        topicTitle: 'Match Expressions vs Switch Statements',
        question: 'What is a critical advantage of PHP 8 `match` over the classic `switch` statement?',
        codeSnippet: `$status = match($code) { 200 => 'OK', 404 => 'Not Found', default => 'Error' };`,
        options: [
          'match requires break statements on every line',
          'match evaluates using strict identity (===) instead of loose equality (==), returns a value as an expression, and requires exhaustive coverage',
          'match runs on a background thread',
          'match only works with integers'
        ],
        correctIndex: 1,
        explanation: 'match uses strict comparison (===), produces an expression result, prevents fallthrough bugs without break, and throws an UnhandledMatchError if non-exhaustive.'
      },
      {
        id: 'php-pre-3',
        tier: 'intermediate',
        topicKey: 'php-inter-pdo',
        topicTitle: 'Prepared Statements & SQL Injection Prevention',
        question: 'Why do PDO prepared statements with bound parameters eliminate SQL injection vulnerabilities?',
        codeSnippet: `$stmt = $pdo->prepare('SELECT * FROM users WHERE email = :email');
$stmt->execute(['email' => $userInput]);`,
        options: [
          'Because PDO converts the query to binary format',
          'The SQL query structure is parsed and compiled by the database server prior to parameter binding; user input is treated strictly as data literals, never executable SQL tokens',
          'Because PDO removes quotes automatically',
          'Because PDO runs queries inside Docker'
        ],
        correctIndex: 1,
        explanation: 'Prepared statements separate SQL query grammar compilation from data values, rendering injection attacks structurally impossible.'
      },
      {
        id: 'php-pre-4',
        tier: 'intermediate',
        topicKey: 'php-inter-attributes',
        topicTitle: 'PHP 8 Native Attributes',
        question: 'How do native PHP 8 Attributes (`#[Route("/api")]`) improve upon legacy docblock annotations (`/** @Route("/api") */`)?',
        codeSnippet: `#[Route('/api/v1/users', methods: ['GET'])]`,
        options: [
          'They are parsed directly by the PHP Zend engine as first-class AST nodes, validated at compile time, and accessible via Reflection without regex string parsing',
          'They run on the client side',
          'They translate PHP to CSS',
          'They increase database speed by 10x'
        ],
        correctIndex: 0,
        explanation: 'Attributes are first-class language constructs parsed into the AST with full IDE autocomplete, static analysis support, and zero regex docblock overhead.'
      },
      {
        id: 'php-pre-5',
        tier: 'advanced',
        topicKey: 'php-adv-fibers',
        topicTitle: 'PHP Fibers & Asynchronous Event Loops',
        question: 'What runtime capability do Fibers introduce to modern PHP 8.1+ applications?',
        codeSnippet: `$fiber = new Fiber(function() { Fiber::suspend(); });`,
        options: [
          'Multi-threaded GPU rendering',
          'Full-stack coroutines capable of suspending and resuming execution with their own call stack, powering non-blocking asynchronous I/O frameworks (e.g., Revolt/Amp)',
          'Automated database backups',
          'Automatic CSS minification'
        ],
        correctIndex: 1,
        explanation: 'Fibers represent lightweight, isolated execution stacks (coroutines). They allow pausing and resuming functions without rewriting entire codebases into promises.'
      },
      {
        id: 'php-pre-6',
        tier: 'advanced',
        topicKey: 'php-adv-jit',
        topicTitle: 'Zend OPcache & JIT Compilation',
        question: 'How does the PHP OPcache JIT compiler optimize compute-heavy PHP execution?',
        codeSnippet: `// php.ini: opcache.jit=tracing`,
        options: [
          'It compresses images on the server',
          'It compiles frequently executed Zend VM bytecodes into native x86/ARM machine code at runtime, bypassing the Zend VM interpreter loop for hot code paths',
          'It converts PHP files into HTML files',
          'It clears server RAM after each request'
        ],
        correctIndex: 1,
        explanation: 'The tracing JIT identifies hot loops and compiles Zend bytecode directly into native CPU instructions, delivering immense speedups for CPU-bound computations.'
      }
    ]
  },

  'track-sql': {
    trackId: 'track-sql',
    trackName: 'Advanced SQL & PostgreSQL Track',
    timeLimitMinutes: 8,
    questions: [
      {
        id: 'sql-pre-1',
        tier: 'scratch',
        topicKey: 'sql-scratch-joins',
        topicTitle: 'JOIN Semantics & Nullability',
        question: 'What is the output difference between an INNER JOIN and a LEFT OUTER JOIN when right-table matches are absent?',
        codeSnippet: `SELECT * FROM users u LEFT JOIN orders o ON u.id = o.user_id;`,
        options: [
          'INNER JOIN includes all users; LEFT JOIN discards them',
          'INNER JOIN excludes unmatched users; LEFT JOIN retains unmatched left rows, populating right-table columns with NULL values',
          'Both return identical results in all relational engines',
          'LEFT JOIN throws a database constraint violation'
        ],
        correctIndex: 1,
        explanation: 'LEFT JOIN guarantees all records from the left table are returned; if no matching right record exists, NULLs fill the right-side columns.'
      },
      {
        id: 'sql-pre-2',
        tier: 'scratch',
        topicKey: 'sql-scratch-having',
        topicTitle: 'HAVING Clause vs WHERE Clause',
        question: 'Why does attempting to filter by `WHERE count(*) > 5` cause a SQL syntax error?',
        codeSnippet: `SELECT dept, count(*) FROM employees WHERE count(*) > 5 GROUP BY dept; -- Syntax Error!`,
        options: [
          'WHERE cannot reference columns',
          'The WHERE clause filters individual rows BEFORE aggregate grouping occurs; filtering on aggregate results must be performed in the HAVING clause',
          'Because count(*) can only be evaluated in subqueries',
          'Because GROUP BY must appear before WHERE'
        ],
        correctIndex: 1,
        explanation: 'Logical SQL processing order executes WHERE before GROUP BY. To filter the aggregated groups created by GROUP BY, the HAVING clause is required.'
      },
      {
        id: 'sql-pre-3',
        tier: 'intermediate',
        topicKey: 'sql-inter-window',
        topicTitle: 'Window Functions (RANK vs DENSE_RANK)',
        question: 'If three students tie for the highest score of 100, what rank will the student with 99 receive under `RANK()` vs `DENSE_RANK()`?',
        codeSnippet: `RANK() OVER (ORDER BY score DESC)\nDENSE_RANK() OVER (ORDER BY score DESC)`,
        options: [
          'RANK: 2, DENSE_RANK: 4',
          'RANK: 4 (skips positions 2 and 3), DENSE_RANK: 2 (no gap in sequence)',
          'Both assign rank 2',
          'Both assign rank 4'
        ],
        correctIndex: 1,
        explanation: 'RANK leaves gaps corresponding to the number of tied rows (1, 1, 1, 4). DENSE_RANK does not skip sequence positions (1, 1, 1, 2).'
      },
      {
        id: 'sql-pre-4',
        tier: 'intermediate',
        topicKey: 'sql-inter-cte',
        topicTitle: 'Recursive CTEs & Hierarchical Traversal',
        question: 'What two query blocks are combined with `UNION ALL` to formulate a Recursive Common Table Expression?',
        codeSnippet: `WITH RECURSIVE org_tree AS ( ... UNION ALL ... )`,
        options: [
          'A DELETE query and an UPDATE query',
          'An Anchor member (base non-recursive seed query) and a Recursive member that references the CTE name iteratively',
          'Two unrelated SELECT queries',
          'An index creation and a vacuum statement'
        ],
        correctIndex: 1,
        explanation: 'A recursive CTE requires an Anchor member to seed the initial result set, followed by a Recursive member that repeatedly queries the prior output until returning empty.'
      },
      {
        id: 'sql-pre-5',
        tier: 'advanced',
        topicKey: 'sql-adv-explain',
        topicTitle: 'EXPLAIN ANALYZE & Query Costing',
        question: 'What critical information does `EXPLAIN (ANALYZE, BUFFERS)` provide that standard `EXPLAIN` cannot?',
        codeSnippet: `EXPLAIN (ANALYZE, BUFFERS) SELECT * FROM large_table WHERE status = 'pending';`,
        options: [
          'It writes the query output to a CSV file',
          'Standard EXPLAIN only displays the optimizer\'s theoretical cost estimates; ANALYZE actually executes the query, showing real elapsed time, actual row counts, and buffer hits',
          'It fixes all slow queries automatically',
          'It drops unused indexes'
        ],
        correctIndex: 1,
        explanation: 'EXPLAIN ANALYZE executes the query to collect actual runtime metrics, pinpointing discrepancies between optimizer row count estimates and actual rows returned.'
      },
      {
        id: 'sql-pre-6',
        tier: 'advanced',
        topicKey: 'sql-adv-mvcc',
        topicTitle: 'PostgreSQL MVCC & Write-Ahead Log (WAL)',
        question: 'In PostgreSQL MVCC, why does an UPDATE operation require writing a completely new row version (tuple)?',
        codeSnippet: `-- Tuple header xmin/xmax transaction visibility:`,
        options: [
          'Because PostgreSQL does not support in-place updates; old row versions must remain intact with xmax set so concurrent transactions and snapshots can view consistent data',
          'To consume hard drive space faster',
          'Because tables are read-only',
          'Because indexes cannot be updated'
        ],
        correctIndex: 0,
        explanation: 'PostgreSQL MVCC is append-only: updates create a new tuple with the current transaction ID as xmin and mark the old tuple with xmax, ensuring readers never block writers.'
      }
    ]
  },

  'track-r': {
    trackId: 'track-r',
    trackName: 'R for Data Science Master Track',
    timeLimitMinutes: 8,
    questions: [
      {
        id: 'r-pre-1',
        tier: 'scratch',
        topicKey: 'r-scratch-vectors',
        topicTitle: 'Vectorized Operations & Recycling Rule',
        question: 'What is the result of adding `c(1, 2, 3, 4) + c(10, 20)` in R?',
        codeSnippet: `res <- c(1, 2, 3, 4) + c(10, 20)`,
        options: [
          'An error because vector lengths are unequal',
          'c(11, 22, 13, 24) because R recycles the shorter vector to match the length of the longer vector',
          'c(11, 22)',
          'A matrix of dimension 2x2'
        ],
        correctIndex: 1,
        explanation: 'Under R\'s vector recycling rule, the shorter vector c(10, 20) is repeated as c(10, 20, 10, 20) to match length 4.'
      },
      {
        id: 'r-pre-2',
        tier: 'scratch',
        topicKey: 'r-scratch-factors',
        topicTitle: 'Factors & Categorical Encoding',
        question: 'Why does storing categorical variables as `factor` in R matter for statistical modeling functions like `lm()`?',
        codeSnippet: `df$treatment <- factor(df$treatment, levels = c("Control", "DrugA"))`,
        options: [
          'Factors make strings uppercase',
          'Factors define explicit baseline reference levels, allowing regression models to calculate dummy-variable contrasts accurately against the baseline',
          'Factors prevent data from being saved',
          'Factors disable plotting'
        ],
        correctIndex: 1,
        explanation: 'Factors encode categorical data with discrete levels. Statistical functions treat the first level as the baseline reference category in contrast matrices.'
      },
      {
        id: 'r-pre-3',
        tier: 'intermediate',
        topicKey: 'r-inter-dplyr',
        topicTitle: 'Dplyr Pipelines & Window Verbs',
        question: 'What is the purpose of `mutate()` combined with `group_by()` in dplyr?',
        codeSnippet: `df %>% group_by(team) %>% mutate(relative_score = score - mean(score))`,
        options: [
          'It collapses all rows into a single summary row',
          'It computes the mean per group and adds a new column for every original row without collapsing table dimension',
          'It deletes unmatched rows',
          'It exports data to Excel'
        ],
        correctIndex: 1,
        explanation: 'summarize collapses rows into group summaries; mutate calculates group-wise values while preserving every individual row in the dataframe.'
      },
      {
        id: 'r-pre-4',
        tier: 'intermediate',
        topicKey: 'r-inter-apply',
        topicTitle: 'The Apply Family vs For Loops',
        question: 'Why is `vapply()` preferred over `sapply()` in production R packages?',
        codeSnippet: `vapply(data_list, mean, numeric(1))`,
        options: [
          'sapply is deprecated in R',
          'vapply requires an explicit return value template (e.g. numeric(1)), ensuring type-consistent outputs and preventing silent type mutations if inputs are empty',
          'vapply runs on the GPU',
          'vapply only accepts matrices'
        ],
        correctIndex: 1,
        explanation: 'sapply simplifies output heuristically (vector, list, or matrix). vapply enforces a strict type and dimension contract, catching bugs immediately.'
      },
      {
        id: 'r-pre-5',
        tier: 'advanced',
        topicKey: 'r-adv-rcpp',
        topicTitle: 'High-Performance Computing with Rcpp',
        question: 'Why does passing R objects directly into compiled C++ code via `Rcpp` provide dramatic speedups for iterative simulations?',
        codeSnippet: `// [[Rcpp::export]]\nNumericVector fast_sim(NumericVector x) { ... }`,
        options: [
          'Because C++ does not support loops',
          'It provides zero-overhead access to the underlying SEXP memory buffers, executing tight loops at raw machine speed without R interpreter dispatch overhead',
          'It compresses RAM by 90%',
          'It converts R to Python'
        ],
        correctIndex: 1,
        explanation: 'R is an interpreted language with significant loop overhead. Rcpp wraps C++ pointers to R internal memory (SEXP), delivering native machine code execution.'
      },
      {
        id: 'r-pre-6',
        tier: 'advanced',
        topicKey: 'r-adv-nse',
        topicTitle: 'Non-Standard Evaluation (NSE) & Tidy Evaluation',
        question: 'What is a "quosure" in R tidyverse (rlang) meta-programming?',
        codeSnippet: `my_col <- enquo(user_input_col)`,
        options: [
          'A database connection pool',
          'A data structure that captures both an un-evaluated expression and its lexical environment, allowing hygienic evaluation across function calls without variable masking',
          'A type of plot in ggplot2',
          'A memory leak in R'
        ],
        correctIndex: 1,
        explanation: 'A quosure bundles an un-evaluated R expression with its definition environment, preventing variable scoping collisions during tidy evaluation.'
      }
    ]
  },

  'track-dart': {
    trackId: 'track-dart',
    trackName: 'Dart 3 & Flutter Master Track',
    timeLimitMinutes: 8,
    questions: [
      {
        id: 'dart-pre-1',
        tier: 'scratch',
        topicKey: 'dart-scratch-null',
        topicTitle: 'Sound Null Safety',
        question: 'What does "sound" null safety in Dart 3 guarantee at runtime?',
        codeSnippet: `int value = 42; // non-nullable`,
        options: [
          'Non-nullable types can never hold null at runtime, allowing the AOT compiler to optimize out null-check instructions entirely',
          'Any variable can be null if needed',
          'Null pointer errors are converted to warning popups',
          'Memory is allocated in sound waves'
        ],
        correctIndex: 0,
        explanation: 'Sound null safety guarantees non-nullable types are never null at runtime, permitting aggressive ahead-of-time (AOT) optimizations and eliminating NPE crashes.'
      },
      {
        id: 'dart-pre-2',
        tier: 'scratch',
        topicKey: 'dart-scratch-records',
        topicTitle: 'Dart 3 Records & Pattern Matching',
        question: 'What is a Dart 3 Record, and how does it compare to classes?',
        codeSnippet: `(String, int) getDetails() => ("Alex", 25);`,
        options: [
          'A record is a database table',
          'Records are anonymous, immutable, aggregate value types with structural equality, allowing functions to return multiple typed values without declaring custom classes',
          'Records are mutable objects with setters',
          'Records can only store text'
        ],
        correctIndex: 1,
        explanation: 'Records bundle multiple values into an anonymous, immutable value type with structural equality and destructuring pattern support.'
      },
      {
        id: 'dart-pre-3',
        tier: 'intermediate',
        topicKey: 'dart-inter-eventloop',
        topicTitle: 'Event Loop & Microtask vs Event Queue',
        question: 'In Dart’s single-threaded event loop, what is the scheduling priority between the Microtask Queue and the Event Queue?',
        codeSnippet: `scheduleMicrotask(() => print("Microtask"));\nFuture(() => print("Event"));`,
        options: [
          'Event queue has priority',
          'The Microtask Queue is always drained completely before the event loop pulls the next event from the Event Queue',
          'They run simultaneously on separate CPU cores',
          'The order is random'
        ],
        correctIndex: 1,
        explanation: 'The Microtask queue processes short internal tasks eagerly; the Event queue (I/O, timer events, user gestures) is only serviced when the microtask queue is empty.'
      },
      {
        id: 'dart-pre-4',
        tier: 'intermediate',
        topicKey: 'dart-inter-streams',
        topicTitle: 'Streams & Broadcast vs Single-Subscription',
        question: 'What happens if a second listener attempts to listen to a standard single-subscription Stream in Dart?',
        codeSnippet: `Stream<int> stream = controller.stream;\nstream.listen(...);\nstream.listen(...); // Second listener!`,
        options: [
          'Both listeners receive the data simultaneously',
          'A StateError is thrown because single-subscription streams permit only one active listener over their lifetime',
          'The stream restarts from the beginning',
          'The second listener waits in queue'
        ],
        correctIndex: 1,
        explanation: 'Single-subscription streams allow exactly one listener to prevent missed events; broadcast streams (.asBroadcastStream()) allow multiple listeners.'
      },
      {
        id: 'dart-pre-5',
        tier: 'advanced',
        topicKey: 'dart-adv-isolates',
        topicTitle: 'Dart Isolates & Memory Concurrency',
        question: 'Why do Dart Isolates eliminate traditional multi-threading race conditions and mutex deadlocks?',
        codeSnippet: `await Isolate.spawn(heavyTask, message);`,
        options: [
          'Isolates run on a single CPU core only',
          'Each Isolate has its own private heap memory and event loop; they communicate exclusively via message passing across SendPort/ReceivePort with zero shared mutable state',
          'Isolates disable all background computation',
          'Isolates run in SQLite'
        ],
        correctIndex: 1,
        explanation: 'Isolates share no mutable heap memory. Messages are copied or transferred, completely eliminating data races and lock contention.'
      },
      {
        id: 'dart-pre-6',
        tier: 'advanced',
        topicKey: 'dart-adv-modifiers',
        topicTitle: 'Dart 3 Class Modifiers (base, interface, final, sealed)',
        question: 'What does the `sealed` modifier enforce on a Dart 3 class hierarchy?',
        codeSnippet: `sealed class Vehicle {}\nclass Car extends Vehicle {}\nclass Bike extends Vehicle {}`,
        options: [
          'The class cannot be instantiated anywhere',
          'All subclasses must be defined in the same library file, enabling the Dart compiler to guarantee exhaustive switch pattern matching',
          'The class is encrypted',
          'It prevents methods from being overridden'
        ],
        correctIndex: 1,
        explanation: 'sealed classes restrict subtype declarations to the immediate library file, allowing switch statements over Vehicle to be proven exhaustive at compile time.'
      }
    ]
  },

  'track-scala': {
    trackId: 'track-scala',
    trackName: 'Scala 3 Master Track',
    timeLimitMinutes: 8,
    questions: [
      {
        id: 'scala-pre-1',
        tier: 'scratch',
        topicKey: 'scala-scratch-caseclass',
        topicTitle: 'Case Classes & Algebraic Data Types',
        question: 'What methods and properties does Scala 3 synthesize automatically for `case class` definitions?',
        codeSnippet: `case class User(id: Int, name: String)`,
        options: [
          'Mutable setters for all fields',
          'Immutable public val fields, structural equals and hashCode, copy() method, toString, and unapply for pattern matching',
          'A thread pool and socket server',
          'A database table migration'
        ],
        correctIndex: 1,
        explanation: 'Case classes are primary carriers of immutable data, synthesizing value equality, copy constructors, pattern extractors (unapply), and serializability.'
      },
      {
        id: 'scala-pre-2',
        tier: 'scratch',
        topicKey: 'scala-scratch-enums',
        topicTitle: 'Scala 3 Enums & ADTs',
        question: 'How do Scala 3 Enums simplify algebraic data type modeling compared to Scala 2 sealed traits?',
        codeSnippet: `enum Option[+T]:\n  case Some(x: T)\n  case None`,
        options: [
          'Enums are converted to C enums with integer values only',
          'Scala 3 enums provide concise first-class syntax for parameter-carrying cases while retaining full generic variance and exhaustiveness checking',
          'Enums cannot take generic parameters',
          'Enums are stored on disk'
        ],
        correctIndex: 1,
        explanation: 'Scala 3 enums unify simple enumeration with parameterized algebraic data types, removing boilerplate sealed trait and case object declarations.'
      },
      {
        id: 'scala-pre-3',
        tier: 'intermediate',
        topicKey: 'scala-inter-givens',
        topicTitle: 'Contextual Abstractions: Given & Using',
        question: 'How do Scala 3 `given` and `using` clauses replace Scala 2 `implicit` parameters?',
        codeSnippet: `given Ordering[Item] with { ... }\ndef sort[T](list: List[T])(using ord: Ordering[T]): List[T]`,
        options: [
          'They are identical aliases for the implicit keyword',
          'They separate the definition of contextual values (given) from their consumption (using), eliminating ambiguities and making typeclass derivation explicit and principled',
          'They disable compiler type inference',
          'They make all variables global'
        ],
        correctIndex: 1,
        explanation: 'Scala 3 replaces overloaded implicit mechanisms with clear intent: given defines contextual instances, using requests them at call sites.'
      },
      {
        id: 'scala-pre-4',
        tier: 'intermediate',
        topicKey: 'scala-inter-monads',
        topicTitle: 'For-Comprehensions & Monadic Composition',
        question: 'What does a Scala for-comprehension desugar into when chaining multiple generators?',
        codeSnippet: `for { x <- optA; y <- optB } yield x + y`,
        options: [
          'A while loop with counter variables',
          'Nested invocations of flatMap, map, and withFilter',
          'A Java for-each loop on arrays',
          'A background actor call'
        ],
        correctIndex: 1,
        explanation: 'Scala for-comprehensions are syntactic sugar: multiple generators desugar into nested flatMap calls terminated by a map call.'
      },
      {
        id: 'scala-pre-5',
        tier: 'advanced',
        topicKey: 'scala-adv-variance',
        topicTitle: 'Variance Annotations (+T Covariance, -T Contravariance)',
        question: 'If `Cat` is a subtype of `Animal`, what does covariance `+T` on `List[+T]` establish in Scala type theory?',
        codeSnippet: `trait List[+T]`,
        options: [
          'List[Animal] is a subtype of List[Cat]',
          'List[Cat] is validly accepted as a subtype of List[Animal]',
          'List[T] cannot be instantiated',
          'Cats cannot be added to lists'
        ],
        correctIndex: 1,
        explanation: 'Covariance (+T) preserves subtyping direction: since Cat <: Animal, List[Cat] <: List[Animal].'
      },
      {
        id: 'scala-pre-6',
        tier: 'advanced',
        topicKey: 'scala-adv-types',
        topicTitle: 'Union & Intersection Types',
        question: 'What does the Scala 3 union type `String | Int` represent?',
        codeSnippet: `def parse(input: String): String | Int`,
        options: [
          'A string concatenated with an integer',
          'A native unboxed sum type where values are instances of either String or Int, without requiring wrapper objects like Either[String, Int]',
          'A bitwise OR operation on memory',
          'An invalid syntax error'
        ],
        correctIndex: 1,
        explanation: 'Scala 3 union types (A | B) are true commutative sum types that avoid allocation overhead of wrapper classes like Either.'
      }
    ]
  }
};
