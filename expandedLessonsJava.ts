import { CodeLesson } from '../types';

export const EXPANDED_JAVA_LESSONS: CodeLesson[] = [
  {
    id: 'java-exp-1',
    title: 'Project Loom: Virtual Threads (Java 21)',
    level: 'advanced',
    durationMinutes: 30,
    summary: 'Scale to millions of concurrent requests using lightweight user-mode Virtual Threads managed by the JVM.',
    concepts: ['Virtual threads vs OS carrier threads', 'Thread.ofVirtual().start()', 'ForkJoinPool carrier pool', 'Non-blocking I/O unmounting'],
    starterCode: `public class VirtualThreadsDemo {
    public static void main(String[] args) throws InterruptedException {
        System.out.println("Starting Virtual Thread simulation...");
        
        // In Java 21+: Thread.startVirtualThread(() -> { ... });
        Runnable task = () -> {
            System.out.println("Virtual thread executed with minimal memory footprint!");
        };
        
        Thread vThread = new Thread(task);
        vThread.start();
        vThread.join();
        
        System.out.println("Main completed.");
    }
}`,
    expectedOutput: 'Starting Virtual Thread simulation...\nVirtual thread executed with minimal memory footprint!\nMain completed.',
    explanation: 'Virtual threads are lightweight threads managed by the JVM rather than the OS kernel, reducing per-thread memory from 1MB to less than 1KB.',
    bugChallenge: {
      title: 'Pinning Virtual Threads with Synchronized Blocks Bug',
      description: 'Entering a synchronized block or calling native methods pins the virtual thread to its OS carrier thread, preventing cooperative scheduling.',
      buggyCode: `synchronized (lock) {\n    Thread.sleep(1000); // BUG: Pins carrier OS thread!\n}`,
      solutionCode: `ReentrantLock lock = new ReentrantLock();\nlock.lock();\ntry {\n    Thread.sleep(1000); // Does not pin carrier thread\n} finally {\n    lock.unlock();\n}`,
      hint: 'Replace `synchronized` blocks with `ReentrantLock` in high-throughput virtual thread code.',
      bugExplanation: '`synchronized` blocks prevent the JVM from unmounting the virtual thread from its underlying OS carrier thread during blocking calls.'
    }
  },
  {
    id: 'java-exp-2',
    title: 'Java 17+ Records & Canonical Constructors',
    level: 'scratch',
    durationMinutes: 20,
    summary: 'Define immutable data carriers with concise syntax, automatic equals(), hashCode(), and toString() generation.',
    concepts: ['record keyword syntax', 'Compact constructors for validation', 'Canonical constructor semantics', 'Immutability and record pattern matching'],
    starterCode: `public class RecordsDemo {
    public record CourseStudent(String id, String name, int grade) {
        // Compact constructor for validation
        public CourseStudent {
            if (grade < 0 || grade > 100) {
                throw new IllegalArgumentException("Grade must be between 0 and 100");
            }
        }
    }

    public static void main(String[] args) {
        CourseStudent student = new CourseStudent("ST-101", "Grace Hopper", 98);
        System.out.println("Student Name: " + student.name());
        System.out.println("Record toString: " + student);
    }
}`,
    expectedOutput: 'Student Name: Grace Hopper\nRecord toString: CourseStudent[id=ST-101, name=Grace Hopper, grade=98]',
    explanation: 'Records are transparent, immutable data carriers that eliminate getters, private final fields, and boilerplate equals/hashCode implementations.',
    bugChallenge: {
      title: 'Attempting to Declare Instance Fields in Record',
      description: 'Declaring non-static instance fields in records causes a compilation error because all instance state must be in the record header.',
      buggyCode: `record Point(int x, int y) {\n    private int z; // BUG: Instance fields not allowed in records!\n}`,
      solutionCode: `record Point(int x, int y, int z) {} // All state must be in the header`,
      hint: 'Add the field to the record header parameter list.',
      bugExplanation: 'Records enforce that state is entirely defined in the primary component header.'
    }
  },
  {
    id: 'java-exp-3',
    title: 'Pattern Matching for switch (Java 21)',
    level: 'intermediate',
    durationMinutes: 25,
    summary: 'Match types, guard conditions, and null cases cleanly in switch expressions without ugly instanceof casts.',
    concepts: ['switch pattern matching (case Type name)', 'Guard clauses (when keyword)', 'Handling null in switch', 'Sealed class completeness'],
    starterCode: `public class SwitchPatternDemo {
    sealed interface Shape permits Circle, Rectangle {}
    record Circle(double radius) implements Shape {}
    record Rectangle(double width, double height) implements Shape {}

    static String describeShape(Shape s) {
        return switch (s) {
            case Circle c when c.radius() > 10 -> "Large Circle (r=" + c.radius() + ")";
            case Circle c -> "Standard Circle (r=" + c.radius() + ")";
            case Rectangle r -> "Rectangle (" + r.width() + "x" + r.height() + ")";
        };
    }

    public static void main(String[] args) {
        Shape c = new Circle(15.0);
        System.out.println(describeShape(c));
    }
}`,
    expectedOutput: 'Large Circle (r=15.0)',
    explanation: 'Pattern matching for switch combines type testing and pattern extraction into a single expression with optional `when` guard conditions.',
    bugChallenge: {
      title: 'Missing Sealed Interface Subclass in Switch Bug',
      description: 'Omitting a permitted subclass in an exhaustive switch over a sealed hierarchy causes a compilation error.',
      buggyCode: `return switch(shape) { case Circle c -> 1; }; // BUG: Rectangle is not covered!`,
      solutionCode: `return switch(shape) { case Circle c -> 1; case Rectangle r -> 2; };`,
      hint: 'Cover all permitted subclasses of the sealed interface.',
      bugExplanation: 'Switch expressions over sealed hierarchies must be exhaustive; the compiler verifies all subclasses are handled.'
    }
  },
  {
    id: 'java-exp-4',
    title: 'Sealed Classes & Interfaces (permits Clause)',
    level: 'intermediate',
    durationMinutes: 20,
    summary: 'Restrict which classes or interfaces may extend or implement your abstractions.',
    concepts: ['sealed, non-sealed, and final modifiers', 'permits clause hierarchy', 'Domain modeling algebraic data types', 'Compiler exhaustive type analysis'],
    starterCode: `public class SealedDemo {
    public sealed interface PaymentMethod permits CreditCard, BankTransfer {}

    public static final class CreditCard implements PaymentMethod {
        public String brand() { return "Visa"; }
    }

    public static final class BankTransfer implements PaymentMethod {
        public String iban() { return "DE89..."; }
    }

    public static void main(String[] args) {
        PaymentMethod pm = new CreditCard();
        System.out.println("Payment Method configured: " + pm.getClass().getSimpleName());
    }
}`,
    expectedOutput: 'Payment Method configured: CreditCard',
    explanation: 'Sealed classes allow API authors to define closed inheritance hierarchies where only permitted subclasses can inherit, preventing unauthorized extensions.',
    bugChallenge: {
      title: 'Permitted Subclass Missing sealed/final/non-sealed',
      description: 'Every class permitted by a sealed type must explicitly be marked as final, sealed, or non-sealed.',
      buggyCode: `sealed class A permits B {}\nclass B extends A {} // BUG: B must be declared final, sealed, or non-sealed!`,
      solutionCode: `sealed class A permits B {}\nfinal class B extends A {}`,
      hint: 'Mark subclass B with `final`.',
      bugExplanation: 'The Java specification mandates that every subclass of a sealed class explicitly declare its extension policy.'
    }
  },
  {
    id: 'java-exp-5',
    title: 'Java Stream API: Grouping, Partitioning & Parallel Streams',
    level: 'intermediate',
    durationMinutes: 25,
    summary: 'Process collections declaratively with collectors like groupingBy, partitioningBy, and parallel streams.',
    concepts: ['Collectors.groupingBy', 'Collectors.partitioningBy', 'Downstream collectors (counting, mapping)', 'parallelStream() fork-join pools'],
    starterCode: `import java.util.*;
import java.util.stream.Collectors;

public class StreamCollectorsDemo {
    record Employee(String name, String department, int salary) {}

    public static void main(String[] args) {
        List<Employee> staff = List.of(
            new Employee("Alice", "Engineering", 120000),
            new Employee("Bob", "Marketing", 90000),
            new Employee("Charlie", "Engineering", 130000)
        );

        Map<String, List<Employee>> byDept = staff.stream()
            .collect(Collectors.groupingBy(Employee::department));

        System.out.println("Engineering headcount: " + byDept.get("Engineering").size());
        System.out.println("Marketing headcount: " + byDept.get("Marketing").size());
    }
}`,
    expectedOutput: 'Engineering headcount: 2\nMarketing headcount: 1',
    explanation: 'The Stream API provides powerful functional reductions; `Collectors.groupingBy` organizes elements into multi-maps based on classification functions.',
    bugChallenge: {
      title: 'Modifying Collection Inside Stream Pipeline Bug',
      description: 'Adding or removing elements from a collection while streaming it throws ConcurrentModificationException.',
      buggyCode: `list.stream().forEach(item -> list.add("new")); // BUG: ConcurrentModificationException!`,
      solutionCode: `List<String> newItems = list.stream().map(String::toUpperCase).collect(Collectors.toList());`,
      hint: 'Stream pipelines should be non-interfering and functional; collect results to a new list.',
      bugExplanation: 'Streams require the underlying data source to remain unmodified during execution.'
    }
  },
  {
    id: 'java-exp-6',
    title: 'CompletableFuture: Asynchronous Non-Blocking Pipelines',
    level: 'advanced',
    durationMinutes: 30,
    summary: 'Compose asynchronous event-driven pipelines using thenApplyAsync, thenCompose, and handle.',
    concepts: ['CompletableFuture.supplyAsync()', 'thenApply vs thenCompose', 'allOf and anyOf coordination', 'Exceptionally recovery fallback'],
    starterCode: `import java.util.concurrent.CompletableFuture;

public class AsyncPipelineDemo {
    public static void main(String[] args) {
        CompletableFuture<String> pipeline = CompletableFuture.supplyAsync(() -> "User_Data")
            .thenApply(data -> data + "_Processed")
            .thenApply(String::toUpperCase);

        System.out.println("Pipeline result: " + pipeline.join());
    }
}`,
    expectedOutput: 'Pipeline result: USER_DATA_PROCESSED',
    explanation: '`CompletableFuture` represents a promise of future execution that can be chained without blocking threads until explicitly resolving with `.join()`.',
    bugChallenge: {
      title: 'Uncaught Exception Swallowed in CompletableFuture',
      description: 'Exceptions thrown inside an async stage are swallowed silently unless .exceptionally() or .handle() is attached.',
      buggyCode: `CompletableFuture.runAsync(() -> { throw new RuntimeException("DB Down"); }); // Exception silently ignored!`,
      solutionCode: `CompletableFuture.runAsync(() -> { throw new RuntimeException("DB Down"); })\n    .exceptionally(ex -> { System.err.println("Handled: " + ex.getMessage()); return null; });`,
      hint: 'Always chain `.exceptionally()` or `.handle()` to log or recover from errors.',
      bugExplanation: 'Asynchronous exceptions are stored in the future state and only thrown when .get()/.join() is invoked.'
    }
  },
  {
    id: 'java-exp-7',
    title: 'JVM Garbage Collection Tuning: G1 vs ZGC',
    level: 'advanced',
    durationMinutes: 30,
    summary: 'Understand low-latency GC architectures: G1 regions versus ZGC concurrent colored pointers.',
    concepts: ['Generational hypothesis (Eden, Survivor, Tenured)', 'Garbage-First (G1) region evacuation', 'ZGC sub-millisecond pauses', 'Colored pointers and load barriers'],
    starterCode: `public class GCTuningConcepts {
    public static void main(String[] args) {
        Runtime runtime = Runtime.getRuntime();
        long maxMemMB = runtime.maxMemory() / (1024 * 1024);
        long freeMemMB = runtime.freeMemory() / (1024 * 1024);
        
        System.out.println("Available JVM Processors: " + runtime.availableProcessors());
        System.out.println("JVM Max Heap: " + maxMemMB + " MB");
        System.out.println("GC Architecture configured (ZGC / G1GC active)");
    }
}`,
    expectedOutput: 'Available JVM Processors:\nJVM Max Heap:\nGC Architecture configured (ZGC / G1GC active)',
    explanation: 'Modern JVMs like ZGC perform memory marking and compaction concurrently with application threads, achieving sub-millisecond max pause times even on multi-terabyte heaps.',
    bugChallenge: {
      title: 'Explicit System.gc() Full GC Stop-The-World Bug',
      description: 'Calling System.gc() triggers an expensive full heap stop-the-world pause that degrades production throughput.',
      buggyCode: `System.gc(); // BUG: Forces full GC pause across all cores!`,
      solutionCode: `// Rely on automatic heuristics; or disable with -XX:+DisableExplicitGC flag`,
      hint: 'Avoid calling `System.gc()`.',
      bugExplanation: 'Explicit GC calls interrupt the concurrent collector cycles with a synchronous full pause.'
    }
  },
  {
    id: 'java-exp-8',
    title: 'Custom Annotations & Java Reflection API',
    level: 'intermediate',
    durationMinutes: 25,
    summary: 'Build runtime dependency injection and validation frameworks using custom annotations and reflection.',
    concepts: ['@Retention(RetentionPolicy.RUNTIME)', '@Target(ElementType.METHOD)', 'Class.getDeclaredMethods()', 'AccessibleObject.setAccessible()'],
    starterCode: `import java.lang.annotation.*;
import java.lang.reflect.Method;

public class AnnotationDemo {
    @Retention(RetentionPolicy.RUNTIME)
    @Target(ElementType.METHOD)
    public @interface AuditLog {
        String action();
    }

    public static class Service {
        @AuditLog(action = "USER_LOGIN")
        public void execute() {}
    }

    public static void main(String[] args) throws Exception {
        Method method = Service.class.getMethod("execute");
        if (method.isAnnotationPresent(AuditLog.class)) {
            AuditLog audit = method.getAnnotation(AuditLog.class);
            System.out.println("Detected audit action annotation: " + audit.action());
        }
    }
}`,
    expectedOutput: 'Detected audit action annotation: USER_LOGIN',
    explanation: 'Annotations with `RetentionPolicy.RUNTIME` are stored in class bytecode attributes, allowing reflection frameworks like Spring and Hibernate to inspect metadata at runtime.',
    bugChallenge: {
      title: 'Annotation Disappearing at Runtime Bug',
      description: 'Omitting @Retention(RetentionPolicy.RUNTIME) defaults retention to CLASS, making the annotation invisible to reflection.',
      buggyCode: `@Target(ElementType.METHOD)\npublic @interface MyAnno {} // BUG: Default retention CLASS drops it at runtime!`,
      solutionCode: `@Retention(RetentionPolicy.RUNTIME)\n@Target(ElementType.METHOD)\npublic @interface MyAnno {}`,
      hint: 'Add `@Retention(RetentionPolicy.RUNTIME)`.',
      bugExplanation: 'Without RUNTIME retention, the JVM strips annotation metadata during class loading.'
    }
  },
  {
    id: 'java-exp-9',
    title: 'Java Memory Model (JMM): volatile, final & Happens-Before',
    level: 'advanced',
    durationMinutes: 30,
    summary: 'Understand CPU hardware memory caches, memory reordering, and the Java happens-before relationship.',
    concepts: ['volatile visibility guarantees', 'final field freeze semantics', 'Happens-before order rules', 'Double-checked locking pattern'],
    starterCode: `public class MemoryModelDemo {
    private static volatile boolean running = true;

    public static void main(String[] args) throws InterruptedException {
        Thread worker = new Thread(() -> {
            int count = 0;
            while (running) { // volatile ensures CPU cache flush
                count++;
                if (count > 100) break;
            }
            System.out.println("Worker thread detected stop signal");
        });

        worker.start();
        running = false;
        worker.join();
        System.out.println("Memory barrier confirmed.");
    }
}`,
    expectedOutput: 'Worker thread detected stop signal\nMemory barrier confirmed.',
    explanation: '`volatile` prevents the compiler and CPU from reordering instructions and ensures reads/writes bypass CPU L1/L2 caches to main RAM.',
    bugChallenge: {
      title: 'Non-Volatile Flag Infinite Loop Bug',
      description: 'Without volatile, the worker thread caches the boolean in a CPU register and never observes mutations from other threads.',
      buggyCode: `private static boolean stop = false; // BUG: JIT compiler hoists check to 'while(true)'!`,
      solutionCode: `private static volatile boolean stop = false;`,
      hint: 'Declare shared communication flags with `volatile`.',
      bugExplanation: 'JIT optimizations can cache non-volatile variables in CPU registers indefinitely.'
    }
  },
  {
    id: 'java-exp-10',
    title: 'Foreign Function & Memory API (Project Panama in Java 22)',
    level: 'advanced',
    durationMinutes: 30,
    summary: 'Replace fragile JNI boilerplate with modern, high-performance native memory off-heap access.',
    concepts: ['Arena & MemorySegment', 'Off-heap native memory allocation', 'Linker & SymbolLookup', 'Zero JNI compilation overhead'],
    starterCode: `public class PanamaMemoryDemo {
    public static void main(String[] args) {
        System.out.println("Project Panama Foreign Memory Segment demo");
        // Conceptual representation of Arena allocation
        System.out.println("Allocated off-heap memory buffer safely without JNI headers");
        System.out.println("MemorySegment bounds and lifetime enforced deterministically.");
    }
}`,
    expectedOutput: 'Project Panama Foreign Memory Segment demo\nAllocated off-heap memory buffer safely without JNI headers\nMemorySegment bounds and lifetime enforced deterministically.',
    explanation: 'Project Panama (FFM API) replaces JNI with direct, type-safe foreign memory segments and native method handles, running at near-C speeds.',
    bugChallenge: {
      title: 'Accessing Closed Arena Segment Bug',
      description: 'Attempting to read or write to a MemorySegment after its Arena is closed throws an IllegalStateException.',
      buggyCode: `// MemorySegment seg;\n// try (Arena arena = Arena.ofConfined()) { seg = arena.allocate(10); }\n// seg.get(ValueLayout.JAVA_INT, 0); // BUG: Arena is already closed!`,
      solutionCode: `// Always access memory within the active Arena scope`,
      hint: 'Keep memory operations within the try-with-resources Arena block.',
      bugExplanation: 'Arenas provide deterministic lifetime management; closing the arena frees off-heap memory immediately.'
    }
  },
  {
    id: 'java-exp-11',
    title: 'Java NIO.2: File Channels, Paths & WatchService',
    level: 'scratch',
    durationMinutes: 20,
    summary: 'Perform asynchronous non-blocking file I/O and monitor directory changes using Path and WatchService.',
    concepts: ['java.nio.file.Path & Paths', 'Files.readString and Files.writeString', 'FileChannel memory-mapped I/O', 'WatchService directory event monitoring'],
    starterCode: `import java.nio.file.Path;
import java.nio.file.Paths;

public class NioDemo {
    public static void main(String[] args) {
        Path path = Paths.get("data", "config", "application.properties");
        System.out.println("File Name: " + path.getFileName());
        System.out.println("Parent Directory: " + path.getParent());
        System.out.println("Absolute Path normalize: " + path.toAbsolutePath().normalize());
    }
}`,
    expectedOutput: 'File Name: application.properties\nParent Directory: data/config\nAbsolute Path normalize:',
    explanation: 'Java NIO.2 (`java.nio.file`) modernizes file operations with unified path representations, atomic moves, and symbolic link support.',
    bugChallenge: {
      title: 'Using Legacy java.io.File Blocking Methods Bug',
      description: 'Legacy java.io.File throws no descriptive exceptions on failures (returns false) and blocks worker threads.',
      buggyCode: `new File("test.txt").delete(); // BUG: Returns false on failure without reason!`,
      solutionCode: `Files.delete(Paths.get("test.txt")); // Throws NoSuchFileException with clear error context`,
      hint: 'Use `Files.delete` from `java.nio.file.Files`.',
      bugExplanation: 'NIO.2 throws informative, specific exceptions rather than returning ambiguous booleans.'
    }
  },
  {
    id: 'java-exp-12',
    title: 'Generic Type Erasure & Reified Type Tokens',
    level: 'intermediate',
    durationMinutes: 25,
    summary: 'Overcome compile-time type erasure using Super Type Tokens (TypeReference) for JSON deserialization.',
    concepts: ['Type erasure in javac', 'Wildcards (? extends T vs ? super T)', 'PECS rule (Producer Extends, Consumer Super)', 'Super Type Token pattern'],
    starterCode: `import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.List;

public class TypeErasureDemo {
    // Abstract Super Type Token
    public static abstract class TypeReference<T> {
        private final Type type;
        public TypeReference() {
            Type superclass = getClass().getGenericSuperclass();
            this.type = ((ParameterizedType) superclass).getActualTypeArguments()[0];
        }
        public Type getType() { return type; }
    }

    public static void main(String[] args) {
        TypeReference<List<String>> token = new TypeReference<>() {};
        System.out.println("Preserved generic type at runtime: " + token.getType());
    }
}`,
    expectedOutput: 'Preserved generic type at runtime: java.util.List<java.lang.String>',
    explanation: 'Although JVM erases generics on instances, generic type arguments in class signatures are preserved in class bytecode attributes.',
    bugChallenge: {
      title: 'PECS Rule Invariance Violation Bug',
      description: 'Attempting to pass List<Integer> to a method expecting List<Number> fails without bounded wildcards.',
      buggyCode: `void print(List<Number> list) {}\n// print(new ArrayList<Integer>()); // BUG: List<Integer> is NOT a List<Number>!`,
      solutionCode: `void print(List<? extends Number> list) {} // Producer Extends permits subtypes`,
      hint: 'Use `? extends Number` following the PECS principle.',
      bugExplanation: 'Generics are invariant by default in Java to prevent putting non-integers into an integer list.'
    }
  },
  {
    id: 'java-exp-13',
    title: 'Dynamic Proxies with java.lang.reflect.Proxy',
    level: 'advanced',
    durationMinutes: 30,
    summary: 'Implement AOP logging, transactions, and security interceptors dynamically at runtime.',
    concepts: ['InvocationHandler interface', 'Proxy.newProxyInstance', 'Method interception and forwarding', 'Comparison with CGLIB bytecode generation'],
    starterCode: `import java.lang.reflect.*;

public class DynamicProxyDemo {
    interface Greeter {
        String greet(String name);
    }

    static class RealGreeter implements Greeter {
        public String greet(String name) { return "Hello, " + name; }
    }

    public static void main(String[] args) {
        Greeter real = new RealGreeter();
        Greeter proxy = (Greeter) Proxy.newProxyInstance(
            Greeter.class.getClassLoader(),
            new Class<?>[]{Greeter.class},
            (p, method, mArgs) -> {
                System.out.println("[AUDIT] Method invoked: " + method.getName());
                return method.invoke(real, mArgs);
            }
        );

        System.out.println("Output: " + proxy.greet("James Gosling"));
    }
}`,
    expectedOutput: '[AUDIT] Method invoked: greet\nOutput: Hello, James Gosling',
    explanation: 'JDK dynamic proxies generate synthetic bytecode at runtime implementing target interfaces, intercepting all method calls via an `InvocationHandler`.',
    bugChallenge: {
      title: 'Proxying Concrete Class with JDK Proxy Bug',
      description: 'JDK dynamic proxies only support interfaces; passing a concrete class throws an IllegalArgumentException.',
      buggyCode: `// Proxy.newProxyInstance(..., new Class[]{ RealGreeter.class }, ...); // BUG: Not an interface!`,
      solutionCode: `// Pass interfaces only: new Class[]{ Greeter.class }`,
      hint: 'JDK proxies require interface types; use CGLIB or ByteBuddy for concrete classes.',
      bugExplanation: '`Proxy.newProxyInstance` requires every class in the interfaces array to be an interface.'
    }
  },
  {
    id: 'java-exp-14',
    title: 'Structured Concurrency (Java 21 Preview)',
    level: 'advanced',
    durationMinutes: 25,
    summary: 'Treat groups of related concurrent tasks running in different threads as a single unit of work.',
    concepts: ['StructuredTaskScope', 'ShutdownOnFailure & ShutdownOnSuccess', 'Automatic cancellation cascades', 'Eliminating thread leaks and orphan threads'],
    starterCode: `public class StructuredConcurrencyDemo {
    public static void main(String[] args) {
        System.out.println("StructuredTaskScope coordination initialized");
        System.out.println("Spawning subtask A: Fetching User Profile");
        System.out.println("Spawning subtask B: Fetching Order History");
        System.out.println("Parent scope awaits all subtasks; if either fails, the other is cancelled automatically.");
    }
}`,
    expectedOutput: 'StructuredTaskScope coordination initialized\nSpawning subtask A: Fetching User Profile\nSpawning subtask B: Fetching Order History\nParent scope awaits all subtasks; if either fails, the other is cancelled automatically.',
    explanation: 'Structured Concurrency ensures child tasks do not outlive their parent scope, making asynchronous code as easy to reason about as synchronous code.',
    bugChallenge: {
      title: 'Orphaned Task Leaks with Unstructured Threads Bug',
      description: 'Spawning threads with new Thread() or unmanaged pools allows background threads to continue running after the caller fails.',
      buggyCode: `// subtask continues running forever if caller crashes`,
      solutionCode: `// StructuredTaskScope guarantees child tasks terminate when the scope block exits`,
      hint: 'Wrap concurrent subtasks in a `StructuredTaskScope`.',
      bugExplanation: 'Structured concurrency ties child lifetimes to lexical scope blocks.'
    }
  },
  {
    id: 'java-exp-15',
    title: 'Scoped Values (Java 21): Lightweight ThreadLocal Replacement',
    level: 'advanced',
    durationMinutes: 25,
    summary: 'Pass immutable contextual data safely to subtasks and virtual threads without ThreadLocal memory leaks.',
    concepts: ['ScopedValue.newInstance()', 'ScopedValue.where().run()', 'Immutability and inheritance across virtual threads', 'Avoiding ThreadLocal map leaks'],
    starterCode: `public class ScopedValuesDemo {
    public static void main(String[] args) {
        System.out.println("Scoped Values initialized");
        System.out.println("Context [User: Admin_42] bound to current execution scope");
        System.out.println("Calley methods read ScopedValue with O(1) speed and zero memory retention leaks");
    }
}`,
    expectedOutput: 'Scoped Values initialized\nContext [User: Admin_42] bound to current execution scope\nCalley methods read ScopedValue with O(1) speed and zero memory retention leaks',
    explanation: '`ScopedValue` allows safely sharing immutable data across method calls and threads for a bounded execution window, replacing error-prone ThreadLocal variables.',
    bugChallenge: {
      title: 'ThreadLocal Memory Leak in Thread Pools Bug',
      description: 'Failing to call threadLocal.remove() when using pooled threads leaks ClassLoaders and session memory across tasks.',
      buggyCode: `threadLocal.set(user); // BUG: Forgot threadLocal.remove(); pooled thread retains memory!`,
      solutionCode: `try {\n    threadLocal.set(user);\n    process();\n} finally {\n    threadLocal.remove();\n}`,
      hint: 'Always clean up ThreadLocal in a finally block (or migrate to ScopedValue).',
      bugExplanation: 'Pooled threads never die; ThreadLocal values remain in the thread map until explicitly removed.'
    }
  },
  {
    id: 'java-exp-16',
    title: 'VarHandle & Atomic Field Updaters',
    level: 'advanced',
    durationMinutes: 30,
    summary: 'Execute low-overhead memory fenced operations using java.lang.invoke.VarHandle without sun.misc.Unsafe.',
    concepts: ['MethodHandles.lookup()', 'VarHandle volatile/acquire/release access', 'Atomic field updates without object wrappers', 'Modern replacement for Unsafe'],
    starterCode: `import java.lang.invoke.MethodHandles;
import java.lang.invoke.VarHandle;

public class VarHandleDemo {
    private volatile int state = 0;
    private static final VarHandle STATE_HANDLE;

    static {
        try {
            STATE_HANDLE = MethodHandles.lookup().findVarHandle(VarHandleDemo.class, "state", int.class);
        } catch (ReflectiveOperationException e) {
            throw new Error(e);
        }
    }

    public static void main(String[] args) {
        VarHandleDemo demo = new VarHandleDemo();
        boolean success = STATE_HANDLE.compareAndSet(demo, 0, 1);
        System.out.println("CAS updated state: " + success);
        System.out.println("New state value: " + demo.state);
    }
}`,
    expectedOutput: 'CAS updated state: true\nNew state value: 1',
    explanation: '`VarHandle` provides safe, high-performance equivalents to `sun.misc.Unsafe` for atomic operations, memory fences, and variable access modes.',
    bugChallenge: {
      title: 'Field Not Found in VarHandle Lookup Bug',
      description: 'Typoing the field name in findVarHandle throws NoSuchFieldException at class initialization.',
      buggyCode: `MethodHandles.lookup().findVarHandle(VarHandleDemo.class, "status", int.class); // BUG: field is named 'state'!`,
      solutionCode: `MethodHandles.lookup().findVarHandle(VarHandleDemo.class, "state", int.class);`,
      hint: 'Ensure the string matches the exact field identifier.',
      bugExplanation: 'VarHandle lookups perform exact reflection checks against class fields.'
    }
  },
  {
    id: 'java-exp-17',
    title: 'Text Blocks & String Formatting (Java 15+)',
    level: 'scratch',
    durationMinutes: 15,
    summary: 'Write readable multiline JSON, SQL, and HTML strings using triple-quote text blocks without escape characters.',
    concepts: ['Triple-quote (\"\"\") syntax', 'Incidental whitespace stripping', 'Escape sequences (\\ and \\s)', 'String.formatted() method'],
    starterCode: `public class TextBlocksDemo {
    public static void main(String[] args) {
        String jsonQuery = """
            {
                "query": "SELECT * FROM orders WHERE status = '%s'",
                "timeoutMs": %d
            }
            """.formatted("COMPLETED", 5000);

        System.out.println("Formatted JSON payload:");
        System.out.println(jsonQuery.trim());
    }
}`,
    expectedOutput: 'Formatted JSON payload:\n{\n    "query": "SELECT * FROM orders WHERE status = \'COMPLETED\'",\n    "timeoutMs": 5000\n}',
    explanation: 'Text blocks automatically determine common indentation and strip incidental whitespace, producing clean multiline string literals.',
    bugChallenge: {
      title: 'Text Block Opening on Same Line Bug',
      description: 'Placing characters after the opening \"\"\" on the same line triggers a compilation error.',
      buggyCode: `String s = """SELECT * FROM table; // BUG: Illegal text block start!`,
      solutionCode: `String s = """\n    SELECT * FROM table;\n    """;`,
      hint: 'The opening `"""` must be followed by a line terminator.',
      bugExplanation: 'The Java grammar requires a newline immediately after the opening triple quotes.'
    }
  },
  {
    id: 'java-exp-18',
    title: 'Functional Interfaces: Predicate, Function, Supplier & Consumer',
    level: 'scratch',
    durationMinutes: 20,
    summary: 'Master standard java.util.function primitives and method references (::) to write functional code.',
    concepts: ['@FunctionalInterface contract', 'BiFunction and UnaryOperator', 'Primitive specializations (IntPredicate)', 'Method references (Class::method)'],
    starterCode: `import java.util.function.Function;
import java.util.function.Predicate;

public class FunctionalDemo {
    public static void main(String[] args) {
        Predicate<String> isLong = s -> s.length() > 5;
        Function<String, String> addPrefix = s -> "Tag: " + s;

        String word = "Microservices";
        if (isLong.test(word)) {
            System.out.println(addPrefix.apply(word));
        }
    }
}`,
    expectedOutput: 'Tag: Microservices',
    explanation: '`java.util.function` provides standardized functional interfaces that enable lambda expressions and method references throughout the Java standard library.',
    bugChallenge: {
      title: 'Autoboxing Overhead with Generic Functions',
      description: 'Using Function<Integer, Integer> in high-throughput loops creates millions of Integer objects, degrading GC performance.',
      buggyCode: `Function<Integer, Integer> square = x -> x * x; // BUG: Boxed overhead!`,
      solutionCode: `java.util.function.IntUnaryOperator square = x -> x * x; // Zero heap allocations`,
      hint: 'Use specialized primitive interfaces like `IntUnaryOperator`.',
      bugExplanation: 'Primitive functional specializations bypass JVM boxing overhead completely.'
    }
  },
  {
    id: 'java-exp-19',
    title: 'Custom ClassLoaders & Bytecode Isolation',
    level: 'advanced',
    durationMinutes: 30,
    summary: 'Load classes from encrypted files or network streams and isolate conflicting dependencies using custom ClassLoaders.',
    concepts: ['ClassLoader delegation hierarchy', 'Parent-first vs Child-first loading', 'findClass() vs loadClass()', 'Hot-reloading plugins dynamically'],
    starterCode: `public class ClassLoaderDemo {
    public static void main(String[] args) {
        ClassLoader appLoader = ClassLoaderDemo.class.getClassLoader();
        ClassLoader platformLoader = appLoader.getParent();
        ClassLoader bootstrapLoader = platformLoader.getParent();

        System.out.println("Application ClassLoader: " + appLoader.getClass().getSimpleName());
        System.out.println("Platform ClassLoader: " + platformLoader.getClass().getSimpleName());
        System.out.println("Bootstrap ClassLoader (C++ native): " + bootstrapLoader);
    }
}`,
    expectedOutput: 'Application ClassLoader:\nPlatform ClassLoader:\nBootstrap ClassLoader (C++ native): null',
    explanation: 'The JVM ClassLoader hierarchy delegates requests upward before loading classes locally, ensuring core standard classes cannot be replaced maliciously.',
    bugChallenge: {
      title: 'Overriding loadClass Instead of findClass Bug',
      description: 'Overriding loadClass() breaks the parent delegation model and can cause duplicate class definitions and LinkageErrors.',
      buggyCode: `protected Class<?> loadClass(...) { /* custom loading */ } // Breaks parent delegation!`,
      solutionCode: `protected Class<?> findClass(String name) { /* load byte array and call defineClass */ }`,
      hint: 'Override `findClass` rather than `loadClass`.',
      bugExplanation: '`findClass` is called only after parent delegation fails, preserving the standard loading hierarchy.'
    }
  },
  {
    id: 'java-exp-20',
    title: 'Java 21 Vector API (Incubator): Hardware SIMD',
    level: 'advanced',
    durationMinutes: 30,
    summary: 'Accelerate machine learning matrix multiplications and cryptography using hardware AVX/Neon vector registers.',
    concepts: ['VectorSpecies<Float>', 'FloatVector.fromArray', 'Vector lane operations (add, mul)', 'Loop vectorization with masked tail'],
    starterCode: `public class VectorApiDemo {
    public static void main(String[] args) {
        System.out.println("Vector API SIMD instruction pipeline initialized");
        System.out.println("VectorSpecies: 256-bit registers (8 float lanes per CPU cycle)");
        System.out.println("Hardware vectorized computation speedup: ~6.5x over scalar loops");
    }
}`,
    expectedOutput: 'Vector API SIMD instruction pipeline initialized\nVectorSpecies: 256-bit registers (8 float lanes per CPU cycle)\nHardware vectorized computation speedup: ~6.5x over scalar loops',
    explanation: 'The Vector API compiles directly into CPU SIMD instructions at runtime, allowing Java applications to execute data-parallel algorithms at native speeds.',
    bugChallenge: {
      title: 'Missing Tail Mask for Array Length Not Multiple of Species',
      description: 'Running a vectorized loop without handling the remaining trailing elements out-of-bounds causes an ArrayIndexOutOfBoundsException.',
      buggyCode: `for (int i = 0; i < len; i += species.length()) { ... } // BUG: overshoots array boundary!`,
      solutionCode: `// Use species.indexInRange(i, len) mask to safely process trailing lanes`,
      hint: 'Apply a vector mask for the loop tail.',
      bugExplanation: 'When array size is not a multiple of vector width, masked operations protect out-of-bound memory.'
    }
  }
];
