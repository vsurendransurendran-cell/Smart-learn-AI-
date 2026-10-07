import { Question } from '../types';
import { QUESTION_BANK } from './curriculum';

export const CONCEPT_QUIZZES: Record<string, Question[]> = {
  // =========================================================================
  // JAVA PROGRAMMING
  // =========================================================================
  'java-oop': [
    {
      id: 'cq-java-oop-1',
      subjectId: 'java',
      topicId: 'java-oop',
      subjectName: 'Java Programming',
      topicName: 'Object-Oriented Principles',
      difficulty: 'Easy',
      questionText: 'Which OOP mechanism allows a subclass to provide a specific implementation of a method that is already defined in its parent class at runtime?',
      options: [
        'Method Overloading (Compile-time polymorphism)',
        'Method Overriding (Runtime polymorphism with virtual dispatch)',
        'Static Shadowing',
        'Strict Data Encapsulation'
      ],
      correctIndex: 1,
      explanation: 'Method overriding occurs when a subclass implements a method with the identical signature as in its superclass. At runtime, the JVM uses the object\'s vtable (virtual method table) to invoke the overridden method.',
      hint: 'Think about dynamic method dispatch through the vtable.'
    },
    {
      id: 'cq-java-oop-2',
      subjectId: 'java',
      topicId: 'java-oop',
      subjectName: 'Java Programming',
      topicName: 'Object-Oriented Principles',
      difficulty: 'Medium',
      questionText: 'In Java 8 and later, how can an interface provide concrete method implementations without breaking existing implementers?',
      options: [
        'Using abstract class inheritance only',
        'Declaring the method as `default` or `static` in the interface',
        'Declaring the method with the `native` modifier',
        'Marking all fields inside the interface as `volatile`'
      ],
      correctIndex: 1,
      explanation: 'Java 8 introduced `default` and `static` methods in interfaces. Default methods allow library designers to add new methods to interfaces with default implementations without breaking backwards compatibility.',
      hint: 'Look for the keyword that provides a fallback implementation in an interface.'
    },
    {
      id: 'cq-java-oop-3',
      subjectId: 'java',
      topicId: 'java-oop',
      subjectName: 'Java Programming',
      topicName: 'Object-Oriented Principles',
      difficulty: 'Medium',
      questionText: 'What is the exact difference between Abstraction and Encapsulation?',
      options: [
        'Abstraction hides internal implementation details (focusing on "what"); Encapsulation binds data with methods and restricts direct state access (focusing on "how to protect").',
        'Abstraction requires the `private` keyword; Encapsulation requires the `abstract` keyword.',
        'Encapsulation is achieved solely through interfaces; Abstraction is achieved through private variables.',
        'There is no functional difference; they are synonymous terms in OOP.'
      ],
      correctIndex: 0,
      explanation: 'Abstraction focuses on exposing the essential interface while hiding internal mechanics (e.g. interfaces, abstract classes). Encapsulation bundles data and methods together and protects internal state via access modifiers (getters/setters/private fields).',
      hint: 'One is about hiding complexity (what), the other is about safeguarding internal state (protection).'
    },
    {
      id: 'cq-java-oop-4',
      subjectId: 'java',
      topicId: 'java-oop',
      subjectName: 'Java Programming',
      topicName: 'Object-Oriented Principles',
      difficulty: 'Hard',
      questionText: 'Given the following code snippet, what does execution print?\n\n```java\nclass Base {\n  int val = 10;\n  void print() { System.out.print("B:" + val + " "); }\n}\nclass Sub extends Base {\n  int val = 20;\n  void print() { System.out.print("S:" + val + " "); }\n}\nBase obj = new Sub();\nSystem.out.print(obj.val + " ");\nobj.print();\n```',
      options: [
        '20 S:20',
        '10 S:20',
        '10 B:10',
        'Compile error: Cannot assign Sub to Base'
      ],
      correctIndex: 1,
      explanation: 'In Java, instance variables are resolved at compile time based on the reference type (Base has val=10). However, instance methods are resolved at runtime via dynamic dispatch (calling Sub.print(), which reads Sub.val=20). Therefore the output is "10 S:20".',
      hint: 'Variables are not polymorphic in Java; only non-private methods participate in dynamic dispatch.'
    },
    {
      id: 'cq-java-oop-5',
      subjectId: 'java',
      topicId: 'java-oop',
      subjectName: 'Java Programming',
      topicName: 'Object-Oriented Principles',
      difficulty: 'Hard',
      questionText: 'What rule must be followed when a class inherits multiple default methods with the exact same signature from two unrelated interfaces?',
      options: [
        'The JVM chooses the method from the interface listed first in the `implements` clause.',
        'The compiler throws an ambiguity error unless the subclass explicitly overrides the method and resolves the conflict.',
        'The interface with the most specific package wins automatically.',
        'Runtime exception occurs when the method is invoked.'
      ],
      correctIndex: 1,
      explanation: 'When two interfaces provide conflicting default implementations, Java requires the implementing class to explicitly override the method and resolve the ambiguity (often via InterfaceName.super.methodName()).',
      hint: 'The Java compiler rejects ambiguous multiple inheritance of default methods.'
    }
  ],

  'java-exceptions': [
    {
      id: 'cq-java-exc-1',
      subjectId: 'java',
      topicId: 'java-exceptions',
      subjectName: 'Java Programming',
      topicName: 'Exception Handling',
      difficulty: 'Easy',
      questionText: 'Which class serves as the root superclass of all exceptions and errors in Java?',
      options: ['java.lang.Exception', 'java.lang.Throwable', 'java.lang.RuntimeException', 'java.lang.Error'],
      correctIndex: 1,
      explanation: '`java.lang.Throwable` is the top-level root for both `Exception` and `Error`. Only instances of Throwable can be thrown by the JVM or via the `throw` keyword.',
      hint: 'Only objects inheriting this root class can be passed to a `throw` statement.'
    },
    {
      id: 'cq-java-exc-2',
      subjectId: 'java',
      topicId: 'java-exceptions',
      subjectName: 'Java Programming',
      topicName: 'Exception Handling',
      difficulty: 'Medium',
      questionText: 'What interface must a resource class implement to be safely managed inside a `try-with-resources` block?',
      options: ['java.io.Serializable', 'java.lang.AutoCloseable', 'java.lang.Cloneable', 'java.lang.Runnable'],
      correctIndex: 1,
      explanation: 'Java 7 try-with-resources requires the resource to implement `java.lang.AutoCloseable` (or its child `java.io.Closeable`). The JVM guarantees its `close()` method is invoked even if an exception occurs.',
      hint: 'The interface defines a single `void close() throws Exception` method.'
    },
    {
      id: 'cq-java-exc-3',
      subjectId: 'java',
      topicId: 'java-exceptions',
      subjectName: 'Java Programming',
      topicName: 'Exception Handling',
      difficulty: 'Medium',
      questionText: 'Which of the following represents an unchecked exception in Java?',
      options: ['java.io.IOException', 'java.sql.SQLException', 'java.lang.NullPointerException', 'java.lang.ClassNotFoundException'],
      correctIndex: 2,
      explanation: 'Exceptions that inherit from `RuntimeException` (such as NullPointerException, IndexOutOfBoundsException, IllegalArgumentException) are unchecked. They do not need to be declared in a `throws` clause.',
      hint: 'Checked exceptions inherit directly from Exception but not RuntimeException.'
    },
    {
      id: 'cq-java-exc-4',
      subjectId: 'java',
      topicId: 'java-exceptions',
      subjectName: 'Java Programming',
      topicName: 'Exception Handling',
      difficulty: 'Hard',
      questionText: 'What happens to exceptions that occur while automatically closing resources in try-with-resources when the try block has already thrown an exception?',
      options: [
        'They replace the original try block exception completely.',
        'They are quietly discarded and lost without a trace.',
        'They are attached to the primary exception as "suppressed exceptions" accessible via `getSuppressed()`.',
        'The program terminates immediately with a FatalResourceError.'
      ],
      correctIndex: 2,
      explanation: 'In try-with-resources, if both the try block and close() throw exceptions, the try block exception is thrown and the close() exception is preserved as a suppressed exception via `addSuppressed()`.',
      hint: 'Java preserves both exceptions instead of masking the original cause.'
    },
    {
      id: 'cq-java-exc-5',
      subjectId: 'java',
      topicId: 'java-exceptions',
      subjectName: 'Java Programming',
      topicName: 'Exception Handling',
      difficulty: 'Hard',
      questionText: 'What is the output when `finally` contains an explicit `return` statement while the `try` block returns another value?\n\n```java\nint test() {\n  try { return 1; }\n  finally { return 2; }\n}\n```',
      options: [
        'Returns 1',
        'Returns 2',
        'Compilation error',
        'Returns 3 (sum of both)'
      ],
      correctIndex: 1,
      explanation: 'A return statement inside a finally block overrides any previous return statement or unhandled exception in the try or catch block. This is considered an anti-pattern because it silently masks exceptions.',
      hint: 'The finally block always executes and has the final word on execution flow.'
    }
  ],

  'java-collections': [
    {
      id: 'cq-java-col-1',
      subjectId: 'java',
      topicId: 'java-collections',
      subjectName: 'Java Programming',
      topicName: 'Collections Framework',
      difficulty: 'Easy',
      questionText: 'Which data structure does `ArrayList` use internally to store its elements?',
      options: ['Doubly linked list', 'Dynamically resizable array', 'Red-Black balanced binary tree', 'Hash table with open addressing'],
      correctIndex: 1,
      explanation: '`ArrayList` is backed by a continuous array. When capacity is exceeded, it allocates a new array (typically 1.5x original size) and copies elements using System.arraycopy.',
      hint: 'It allows O(1) random access by index.'
    },
    {
      id: 'cq-java-col-2',
      subjectId: 'java',
      topicId: 'java-collections',
      subjectName: 'Java Programming',
      topicName: 'Collections Framework',
      difficulty: 'Medium',
      questionText: 'In Java 8+, what optimization does `HashMap` perform when a bucket chain exceeds 8 nodes and the table capacity is at least 64?',
      options: [
        'It converts the bucket from a linked list into a balanced Red-Black tree (TreeNode).',
        'It doubles the hash seed and forces a rehash of only that bucket.',
        'It drops the oldest entry using LRU eviction.',
        'It raises a ConcurrentModificationException.'
      ],
      correctIndex: 0,
      explanation: 'To prevent hash collision DoS attacks where attackers construct keys with identical hashcodes, Java 8 treeifies bucket linked lists into Red-Black trees when bucket length >= 8 and table capacity >= 64, reducing worst-case lookup from O(n) to O(log n).',
      hint: 'Think about reducing O(n) worst-case collision lookup to O(log n).'
    },
    {
      id: 'cq-java-col-3',
      subjectId: 'java',
      topicId: 'java-collections',
      subjectName: 'Java Programming',
      topicName: 'Collections Framework',
      difficulty: 'Medium',
      questionText: 'What contract MUST be satisfied when overriding `equals()` in custom objects used as HashMap keys?',
      options: [
        'If `a.equals(b)` is true, then `a.hashCode() == b.hashCode()` must always be true.',
        'If `a.hashCode() == b.hashCode()`, then `a.equals(b)` must always be true.',
        '`hashCode()` must return a distinct unique integer for every instance.',
        '`equals()` must be implemented without using the `this` pointer.'
      ],
      correctIndex: 0,
      explanation: 'The Java Object contract dictates: If two objects are equal according to `equals()`, their `hashCode()` must produce the exact same integer. Violating this causes equal objects to hash to different buckets, making them unretrievable.',
      hint: 'Equal objects must produce equal hash codes; different objects may produce same hash code (collision).'
    },
    {
      id: 'cq-java-col-4',
      subjectId: 'java',
      topicId: 'java-collections',
      subjectName: 'Java Programming',
      topicName: 'Collections Framework',
      difficulty: 'Hard',
      questionText: 'Why does modifying an ArrayList while iterating over it using a foreach loop throw `ConcurrentModificationException`?',
      options: [
        'Because the CPU thread is descheduled.',
        'Because the iterator checks `expectedModCount == modCount` on every `next()` call and throws if structural modification occurred outside the iterator.',
        'Because arrays in Java are strictly immutable.',
        'Because the garbage collector locks the collection during iteration.'
      ],
      correctIndex: 1,
      explanation: 'Java collections use a fail-fast iterator mechanism. The iterator maintains an `expectedModCount`. If the list\'s `modCount` changes via list.add() or list.remove() without using iterator.remove(), the iterator immediately detects the race and throws ConcurrentModificationException.',
      hint: 'It is the fail-fast check comparing expected modification count to actual list modification count.'
    },
    {
      id: 'cq-java-col-5',
      subjectId: 'java',
      topicId: 'java-collections',
      subjectName: 'Java Programming',
      topicName: 'Collections Framework',
      difficulty: 'Hard',
      questionText: 'Which Map implementation guarantees that entries are iterated strictly in the order they were inserted?',
      options: ['java.util.TreeMap', 'java.util.HashMap', 'java.util.LinkedHashMap', 'java.util.IdentityHashMap'],
      correctIndex: 2,
      explanation: '`LinkedHashMap` maintains a doubly linked list running through all of its entries in addition to its hash table buckets, maintaining predictable insertion-order iteration (or access-order when configured for LRU caches).',
      hint: 'Combines a hash table with a linked list to preserve insertion sequence.'
    }
  ],

  'java-concurrency': [
    {
      id: 'cq-java-conc-1',
      subjectId: 'java',
      topicId: 'java-concurrency',
      subjectName: 'Java Programming',
      topicName: 'Multithreading & Concurrency',
      difficulty: 'Medium',
      questionText: 'What guarantee does the `volatile` keyword provide in the Java Memory Model (JMM)?',
      options: [
        'It guarantees mutual exclusion and atomicity for compound operations like `i++`.',
        'It guarantees visibility across CPU caches and establishes a happens-before order preventing instruction reordering.',
        'It creates a new thread for each variable read.',
        'It locks the entire class monitor while the variable is read.'
      ],
      correctIndex: 1,
      explanation: '`volatile` guarantees that writes are immediately flushed to main memory and reads always fetch from main memory (visibility), preventing CPU registers/caches from storing stale values. However, it does NOT provide atomicity for compound operations like count++.',
      hint: 'It solves visibility and ordering, but not compound atomicity.'
    },
    {
      id: 'cq-java-conc-2',
      subjectId: 'java',
      topicId: 'java-concurrency',
      subjectName: 'Java Programming',
      topicName: 'Multithreading & Concurrency',
      difficulty: 'Medium',
      questionText: 'Why should wait() and notify() always be called inside a `while` loop rather than an `if` block?',
      options: [
        'To prevent stack overflow in the JVM.',
        'To guard against spurious wakeups where a thread resumes without the condition actually being satisfied.',
        'Because while loops execute on a separate CPU core.',
        'To allow the JVM to automatically garbage collect sleeping threads.'
      ],
      correctIndex: 1,
      explanation: 'Operating systems and JVMs permit spurious wakeups, where a waiting thread wakes up without an explicit notify. Checking the condition in a while loop ensures the thread re-verifies that the condition predicate actually holds before proceeding.',
      hint: 'The phenomenon is called "spurious wakeups".'
    },
    {
      id: 'cq-java-conc-3',
      subjectId: 'java',
      topicId: 'java-concurrency',
      subjectName: 'Java Programming',
      topicName: 'Multithreading & Concurrency',
      difficulty: 'Hard',
      questionText: 'Which thread pool in `java.util.concurrent` creates new threads as needed, but reuses idle threads when available, terminating threads idle for 60 seconds?',
      options: ['Executors.newFixedThreadPool()', 'Executors.newCachedThreadPool()', 'Executors.newSingleThreadExecutor()', 'Executors.newScheduledThreadPool()'],
      correctIndex: 1,
      explanation: '`Executors.newCachedThreadPool()` uses a SynchronousQueue with corePoolSize 0 and maxPoolSize Integer.MAX_VALUE. It spins up threads on demand and cleans up threads that have been idle for more than 60 seconds.',
      hint: 'It dynamically grows and shrinks based on workload burstiness.'
    },
    {
      id: 'cq-java-conc-4',
      subjectId: 'java',
      topicId: 'java-concurrency',
      subjectName: 'Java Programming',
      topicName: 'Multithreading & Concurrency',
      difficulty: 'Hard',
      questionText: 'What is the primary architectural advantage of `ConcurrentHashMap` over `Collections.synchronizedMap()`?',
      options: [
        'It uses a lock-free read path with volatile reads and striped segment/bucket-level CAS updates instead of a single global lock.',
        'It converts all keys into binary strings.',
        'It serializes all operations to disk asynchronously.',
        'It runs on background GPU threads.'
      ],
      correctIndex: 0,
      explanation: 'SynchronizedMap locks the entire collection on every operation. ConcurrentHashMap uses lock-free volatile reads and fine-grained CAS (Compare-And-Swap) / synchronized node locks at individual bucket bins, enabling high concurrent throughput.',
      hint: 'Fine-grained bucket locking and lock-free reads versus one heavy global mutex.'
    },
    {
      id: 'cq-java-conc-5',
      subjectId: 'java',
      topicId: 'java-concurrency',
      subjectName: 'Java Programming',
      topicName: 'Multithreading & Concurrency',
      difficulty: 'Hard',
      questionText: 'What hardware primitive does `AtomicInteger.incrementAndGet()` utilize to provide lock-free thread safety?',
      options: ['CPU CAS (Compare-And-Swap) instructions', 'Kernel context switching', 'Spinlock on BIOS interrupt table', 'Software semaphores in libc'],
      correctIndex: 0,
      explanation: 'Java Atomic primitives rely on Unsafe / VarHandle to emit native CPU Compare-And-Swap (CAS) instructions (e.g., CMPXCHG on x86). It atomically updates memory if the current value matches the expected value in a tight loop without OS-level thread blocking.',
      hint: 'Acronym: CAS.'
    }
  ],

  'java-memory': [
    {
      id: 'cq-java-mem-1',
      subjectId: 'java',
      topicId: 'java-memory',
      subjectName: 'Java Programming',
      topicName: 'Memory & Garbage Collection',
      difficulty: 'Easy',
      questionText: 'In the JVM memory layout, where are method local variables and method call stack frames stored?',
      options: ['Java Heap', 'JVM Call Stack', 'Metaspace', 'Direct Off-heap Memory'],
      correctIndex: 1,
      explanation: 'Each Java thread has its own private JVM Call Stack containing frames for currently executing methods. Local primitive variables and references to heap objects reside on this stack.',
      hint: 'Each thread has its own execution stack.'
    },
    {
      id: 'cq-java-mem-2',
      subjectId: 'java',
      topicId: 'java-memory',
      subjectName: 'Java Programming',
      topicName: 'Memory & Garbage Collection',
      difficulty: 'Medium',
      questionText: 'What is the "Weak Generational Hypothesis" upon which JVM garbage collection algorithms are optimized?',
      options: [
        'Most allocated objects die shortly after creation; objects that survive multiple GC cycles tend to live for a long time.',
        'Garbage collection can only run when CPU utilization is below 10%.',
        'Large objects must always be allocated directly in Metaspace.',
        'Primitive types require manual deallocation by the operating system.'
      ],
      correctIndex: 0,
      explanation: 'Empirical studies of JVM workloads reveal that over 90% of objects have very short lifespans (temporary variables, buffers). Dividing heap into Young (Eden, Survivor) and Old (Tenured) generations allows fast, frequent GC on young regions without scanning the whole heap.',
      hint: 'Most objects have very short lifespans.'
    },
    {
      id: 'cq-java-mem-3',
      subjectId: 'java',
      topicId: 'java-memory',
      subjectName: 'Java Programming',
      topicName: 'Memory & Garbage Collection',
      difficulty: 'Hard',
      questionText: 'Which JVM collector divides the entire heap into equally-sized contiguous regions and prioritizes collecting regions with the most garbage to meet target pause times?',
      options: ['Serial GC', 'Parallel GC', 'G1 (Garbage-First) GC', 'CMS (Concurrent Mark Sweep)'],
      correctIndex: 2,
      explanation: 'G1 GC divides the heap into hundreds of uniform memory regions (typically 1MB to 32MB). It models pause times and prioritizes sweeping the regions containing the highest density of reclaimable memory ("Garbage-First").',
      hint: 'Its name literally stands for "Garbage-First".'
    },
    {
      id: 'cq-java-mem-4',
      subjectId: 'java',
      topicId: 'java-memory',
      subjectName: 'Java Programming',
      topicName: 'Memory & Garbage Collection',
      difficulty: 'Hard',
      questionText: 'What replaced the PermGen (Permanent Generation) in Java 8, and where is it located in physical memory?',
      options: [
        'Metaspace, allocated in native host memory outside the Java Heap.',
        'Survivor Space, allocated on the CPU L3 cache.',
        'Eden Space, allocated inside the thread-local allocation buffer.',
        'Virtual Heap, managed by Linux swap space.'
      ],
      correctIndex: 0,
      explanation: 'Java 8 eliminated PermGen (which suffered from fixed-size java.lang.OutOfMemoryError: PermGen space) and introduced Metaspace, which stores class metadata in native OS memory and automatically resizes dynamically.',
      hint: 'It is named Metaspace and resides in native OS memory.'
    },
    {
      id: 'cq-java-mem-5',
      subjectId: 'java',
      topicId: 'java-memory',
      subjectName: 'Java Programming',
      topicName: 'Memory & Garbage Collection',
      difficulty: 'Hard',
      questionText: 'What is the difference between a Strong Reference and a WeakReference in Java?',
      options: [
        'Strong references are encrypted; WeakReferences are plaintext.',
        'An object held ONLY by WeakReferences will be reclaimed at the very next garbage collection cycle.',
        'WeakReferences cannot point to classes with finalizers.',
        'Strong references reside in CPU registers; WeakReferences reside in RAM.'
      ],
      correctIndex: 1,
      explanation: 'If an object is only reachable via WeakReference instances (like in java.util.WeakHashMap), the garbage collector ignores the weak links and immediately marks the object eligible for reclamation during the next GC pass.',
      hint: 'Weak references do not prevent an object from being garbage collected.'
    }
  ],

  // =========================================================================
  // OPERATING SYSTEMS
  // =========================================================================
  'os-scheduling': [
    {
      id: 'cq-os-sched-1',
      subjectId: 'os',
      topicId: 'os-scheduling',
      subjectName: 'Operating Systems',
      topicName: 'Process Scheduling',
      difficulty: 'Easy',
      questionText: 'Which CPU scheduling algorithm gives the lowest average waiting time for a given set of stationary processes?',
      options: ['First-Come, First-Served (FCFS)', 'Shortest Job First (SJF)', 'Round Robin (RR)', 'Priority Scheduling without aging'],
      correctIndex: 1,
      explanation: 'SJF (Shortest Job First) is provably optimal because scheduling the shortest process first minimizes the waiting times of all subsequent processes queued behind it.',
      hint: 'Shortest jobs run first to minimize cumulative delay.'
    },
    {
      id: 'cq-os-sched-2',
      subjectId: 'os',
      topicId: 'os-scheduling',
      subjectName: 'Operating Systems',
      topicName: 'Process Scheduling',
      difficulty: 'Medium',
      questionText: 'What is the "convoy effect" in CPU scheduling, and which algorithm suffers from it severely?',
      options: [
        'When high-priority processes monopolize the CPU; occurs in Multilevel Feedback Queues.',
        'When many short I/O-bound processes are blocked waiting behind one long CPU-heavy process; occurs in FCFS.',
        'When time quantum expires too rapidly; occurs in Round Robin.',
        'When deadlocked threads circle each other in a resource graph.'
      ],
      correctIndex: 1,
      explanation: 'In FCFS, if a CPU-bound process with a long burst gets the processor, all short I/O processes must wait in the ready queue, causing low CPU and device utilization. This is the convoy effect.',
      hint: 'Think of slow cars stuck behind a giant truck on a single-lane highway.'
    },
    {
      id: 'cq-os-sched-3',
      subjectId: 'os',
      topicId: 'os-scheduling',
      subjectName: 'Operating Systems',
      topicName: 'Process Scheduling',
      difficulty: 'Medium',
      questionText: 'In Round Robin scheduling, what happens if the time quantum (slice) is set to an extremely small value (e.g. 1 microsecond)?',
      options: [
        'Average response time drops to 0 with no performance penalty.',
        'CPU overhead skyrockets because the CPU spends most of its time performing context switches instead of useful work.',
        'The algorithm degenerates into First-Come First-Served.',
        'Deadlocks occur immediately across all threads.'
      ],
      correctIndex: 1,
      explanation: 'Context switching requires saving and restoring register state, updating PCB, and flushing TLB/CPU caches. An excessively small time quantum causes context switch overhead to dominate CPU cycles.',
      hint: 'Context switches are not free; they consume CPU cycles.'
    },
    {
      id: 'cq-os-sched-4',
      subjectId: 'os',
      topicId: 'os-scheduling',
      subjectName: 'Operating Systems',
      topicName: 'Process Scheduling',
      difficulty: 'Hard',
      questionText: 'How does a Multilevel Feedback Queue (MLFQ) scheduler distinguish between CPU-bound and I/O-bound processes automatically?',
      options: [
        'By analyzing compiled binary machine code metadata.',
        'Processes that exhaust their entire time quantum are demoted to lower-priority queues (CPU-bound); processes that yield CPU early before quantum expiration remain in or move to higher-priority queues (I/O-bound).',
        'By requiring the programmer to declare priority in the kernel syscall.',
        'By random sampling of process memory pages.'
      ],
      correctIndex: 1,
      explanation: 'MLFQ observes runtime behavior: interactive I/O processes block quickly to wait for user input, so they stay in high-priority queues with small time slices; computational processes consume full time slices and get demoted to lower queues with longer slices.',
      hint: 'Demotion occurs when a process uses up its entire allocated time quantum.'
    },
    {
      id: 'cq-os-sched-5',
      subjectId: 'os',
      topicId: 'os-scheduling',
      subjectName: 'Operating Systems',
      topicName: 'Process Scheduling',
      difficulty: 'Hard',
      questionText: 'What technique prevents starvation of low-priority processes in priority-based CPU scheduling algorithms?',
      options: ['Compaction', 'Aging (gradually increasing priority of processes waiting in the queue over time)', 'Paging', 'Thrashing'],
      correctIndex: 1,
      explanation: 'Aging gradually increases the priority of processes that reside in the waiting queue for prolonged periods, guaranteeing that even the lowest-priority process will eventually achieve top priority and execute.',
      hint: 'Priority grows as the process gets older.'
    }
  ],

  'os-sync-deadlock': [
    {
      id: 'cq-os-dead-1',
      subjectId: 'os',
      topicId: 'os-sync-deadlock',
      subjectName: 'Operating Systems',
      topicName: 'Synchronization & Deadlocks',
      difficulty: 'Easy',
      questionText: 'Which of the following is NOT one of Coffman\'s four necessary conditions for deadlock?',
      options: ['Mutual Exclusion', 'Hold and Wait', 'Preemption Allowed', 'Circular Wait'],
      correctIndex: 2,
      explanation: 'Coffman\'s 4 necessary conditions are: 1. Mutual Exclusion, 2. Hold and Wait, 3. No Preemption (resources cannot be preempted forcibly), and 4. Circular Wait. "Preemption Allowed" would prevent deadlock!',
      hint: 'Deadlock requires that resources CANNOT be preempted.'
    },
    {
      id: 'cq-os-dead-2',
      subjectId: 'os',
      topicId: 'os-sync-deadlock',
      subjectName: 'Operating Systems',
      topicName: 'Synchronization & Deadlocks',
      difficulty: 'Medium',
      questionText: 'What is the fundamental difference between a binary semaphore and a counting semaphore?',
      options: [
        'Binary semaphores are implemented in hardware; counting semaphores are in user space.',
        'Binary semaphore values are restricted to 0 or 1; counting semaphore values can range over an unrestricted integer domain representing available resource instances.',
        'Binary semaphores can only be accessed by one thread over the entire program lifetime.',
        'Counting semaphores prevent race conditions; binary semaphores do not.'
      ],
      correctIndex: 1,
      explanation: 'A binary semaphore has values restricted to 0 and 1 (acting as a mutual exclusion lock). A counting semaphore initializes to N available resource units, decrementing on wait() and incrementing on signal().',
      hint: 'One acts like a mutex (0/1); the other tracks a pool of multiple resource instances.'
    },
    {
      id: 'cq-os-dead-3',
      subjectId: 'os',
      topicId: 'os-sync-deadlock',
      subjectName: 'Operating Systems',
      topicName: 'Synchronization & Deadlocks',
      difficulty: 'Hard',
      questionText: 'In Banker\'s Algorithm for deadlock avoidance, a system state is defined as "safe" if:',
      options: [
        'No deadlocks currently exist and all processes are currently running.',
        'There exists at least one sequence <P1, P2, ..., Pn> such that each process Pi can satisfy its maximum remaining claim using currently available resources plus resources held by all preceding processes Pj (j < i).',
        'All resources are shared without mutual exclusion.',
        'The number of processes is less than the number of resources.'
      ],
      correctIndex: 1,
      explanation: 'A safe state guarantees that there is a safe execution sequence where every process can run to completion even if all processes simultaneously demand their maximum declared resource allocations.',
      hint: 'A safe sequence exists where every process can complete without starvation.'
    },
    {
      id: 'cq-os-dead-4',
      subjectId: 'os',
      topicId: 'os-sync-deadlock',
      subjectName: 'Operating Systems',
      topicName: 'Synchronization & Deadlocks',
      difficulty: 'Hard',
      questionText: 'In a Resource Allocation Graph (RAG) with MULTIPLE instances per resource type, does the presence of a cycle guarantee a deadlock?',
      options: [
        'Yes, any cycle in a RAG is both necessary and sufficient for deadlock.',
        'No, a cycle is necessary but not sufficient when multiple instances exist; other processes outside the cycle may release instances to break the cycle.',
        'Yes, but only if circular wait is also disabled.',
        'No, RAG graphs can never contain cycles.'
      ],
      correctIndex: 1,
      explanation: 'If all resources have only 1 instance, a cycle is a definitive deadlock. But with multiple instances, a cycle is merely a necessary condition; if another process holding an instance of that resource finishes and releases it, the cycle can be resolved.',
      hint: 'Multiple instances mean another process outside the cycle might free up a unit.'
    },
    {
      id: 'cq-os-dead-5',
      subjectId: 'os',
      topicId: 'os-sync-deadlock',
      subjectName: 'Operating Systems',
      topicName: 'Synchronization & Deadlocks',
      difficulty: 'Hard',
      questionText: 'How can the "Circular Wait" condition be systematically eliminated in an operating system to prevent deadlock by design?',
      options: [
        'By granting all resource requests instantly without checking.',
        'By imposing a global linear ordering on all resource types and requiring processes to request resources strictly in monotonically increasing order of enumeration.',
        'By terminating all processes whenever CPU utilization drops.',
        'By using spinning busy-waits exclusively.'
      ],
      correctIndex: 1,
      explanation: 'By assigning a unique integer rank F(R) to every resource type and requiring that a process holding R_i can only request R_j if F(R_j) > F(R_i), a circular dependency chain can never form, mathematically preventing circular wait.',
      hint: 'Assign a global integer hierarchy to resources and require requests in increasing order.'
    }
  ],

  'os-paging': [
    {
      id: 'cq-os-pag-1',
      subjectId: 'os',
      topicId: 'os-paging',
      subjectName: 'Operating Systems',
      topicName: 'Memory Management & Paging',
      difficulty: 'Easy',
      questionText: 'What is the difference between a "page" and a "frame" in virtual memory systems?',
      options: [
        'A page is a fixed-size block of physical RAM; a frame is a block of virtual logical memory.',
        'A page is a fixed-size block of logical (virtual) address space; a frame is a fixed-size block of physical RAM.',
        'Pages are allocated on the hard drive; frames are located on GPU VRAM.',
        'There is no difference; they are exact synonyms.'
      ],
      correctIndex: 1,
      explanation: 'Logical (virtual) memory is divided into fixed-size blocks called pages. Physical RAM is divided into blocks of the exact same size called frames.',
      hint: 'Virtual addresses reference pages; physical RAM contains frames.'
    },
    {
      id: 'cq-os-pag-2',
      subjectId: 'os',
      topicId: 'os-paging',
      subjectName: 'Operating Systems',
      topicName: 'Memory Management & Paging',
      difficulty: 'Medium',
      questionText: 'What is the purpose of the Translation Lookaside Buffer (TLB) in CPU memory management?',
      options: [
        'To cache frequently translated virtual-to-physical page mappings in fast hardware registers on the CPU die to avoid 2-step memory lookups.',
        'To store the entire Linux kernel code.',
        'To compress inactive pages onto the SSD.',
        'To arbitrate PCI Express bus bandwidth.'
      ],
      correctIndex: 0,
      explanation: 'Without a TLB, every memory reference requires two physical memory accesses (one for page table entry, one for actual data). The TLB is an associative high-speed hardware cache on the CPU that caches recent virtual-to-physical translations.',
      hint: 'Fast associative hardware cache on CPU for page table translations.'
    },
    {
      id: 'cq-os-pag-3',
      subjectId: 'os',
      topicId: 'os-paging',
      subjectName: 'Operating Systems',
      topicName: 'Memory Management & Paging',
      difficulty: 'Medium',
      questionText: 'Which type of memory fragmentation is completely eliminated by paging?',
      options: ['Internal fragmentation', 'External fragmentation', 'Register fragmentation', 'Stack fragmentation'],
      correctIndex: 1,
      explanation: 'Paging eliminates external fragmentation because any free physical frame anywhere in RAM can be allocated to any process page regardless of contiguous arrangement. However, the last page of a process may still suffer internal fragmentation.',
      hint: 'No contiguous physical placement is needed, so non-contiguous holes are eliminated.'
    },
    {
      id: 'cq-os-pag-4',
      subjectId: 'os',
      topicId: 'os-paging',
      subjectName: 'Operating Systems',
      topicName: 'Memory Management & Paging',
      difficulty: 'Hard',
      questionText: 'If a 32-bit virtual address system has a page size of 4 KB (2^12 bytes), how many entries would a single-level linear page table require, and how many bits represent the page number?',
      options: [
        '2^12 entries, 12 bits for page number',
        '2^20 entries (1,048,576 entries), 20 bits for page number (offset is 12 bits)',
        '2^32 entries, 32 bits for page number',
        '2^16 entries, 16 bits for page number'
      ],
      correctIndex: 1,
      explanation: 'With a 4 KB page size, the page offset requires log2(4096) = 12 bits. The remaining 32 - 12 = 20 bits represent the Virtual Page Number (VPN), meaning the single-level page table needs 2^20 entries.',
      hint: 'Offset takes 12 bits for 4KB. Subtract from 32 bits.'
    },
    {
      id: 'cq-os-pag-5',
      subjectId: 'os',
      topicId: 'os-paging',
      subjectName: 'Operating Systems',
      topicName: 'Memory Management & Paging',
      difficulty: 'Hard',
      questionText: 'Why do modern 64-bit operating systems use multi-level (hierarchical) or inverted page tables instead of single-level page tables?',
      options: [
        'Single-level page tables cannot store permissions.',
        'A single-level page table for a 64-bit address space would require petabytes of contiguous RAM just to store the table itself; multi-level paging allows allocating table entries only for mapped address spaces.',
        'Modern CPUs disabled hardware TLB support.',
        'Inverted page tables run on GPU cores.'
      ],
      correctIndex: 1,
      explanation: 'A 64-bit address space is unimaginably vast (16 exabytes). A flat page table would be impossible to store. Multi-level paging creates a tree where unmapped regions of the address space don\'t allocate intermediate page tables.',
      hint: 'Sparse virtual address spaces require tree structures so unused memory costs no table space.'
    }
  ],

  // =========================================================================
  // DATABASE MANAGEMENT SYSTEMS
  // =========================================================================
  'dbms-sql-joins': [
    {
      id: 'cq-dbms-join-1',
      subjectId: 'dbms',
      topicId: 'dbms-sql-joins',
      subjectName: 'Database Management Systems',
      topicName: 'SQL Queries & Joins',
      difficulty: 'Easy',
      questionText: 'Which SQL join returns ALL rows from the left table, and matching rows from the right table, filling NULL values where no match exists?',
      options: ['INNER JOIN', 'LEFT OUTER JOIN', 'CROSS JOIN', 'RIGHT OUTER JOIN'],
      correctIndex: 1,
      explanation: 'A LEFT JOIN (or LEFT OUTER JOIN) preserves all records from the left relation. When a record has no matching key in the right table, NULLs are generated for the right table columns.',
      hint: 'Preserves the entire left-hand relation.'
    },
    {
      id: 'cq-dbms-join-2',
      subjectId: 'dbms',
      topicId: 'dbms-sql-joins',
      subjectName: 'Database Management Systems',
      topicName: 'SQL Queries & Joins',
      difficulty: 'Medium',
      questionText: 'What is the key difference between the `WHERE` clause and the `HAVING` clause in SQL?',
      options: [
        '`WHERE` filters individual rows BEFORE aggregation; `HAVING` filters aggregated group records AFTER `GROUP BY` execution.',
        '`WHERE` only works on numbers; `HAVING` works on strings.',
        '`HAVING` executes before `FROM`; `WHERE` executes after `SELECT`.',
        'They are interchangeable in modern ANSI SQL.'
      ],
      correctIndex: 0,
      explanation: 'SQL processing order evaluates FROM -> WHERE -> GROUP BY -> HAVING -> SELECT. `WHERE` filters rows before groupings are formed; `HAVING` filters group summaries produced by aggregate functions (COUNT, SUM, AVG).',
      hint: 'WHERE operates on raw tuples; HAVING operates on group aggregates.'
    },
    {
      id: 'cq-dbms-join-3',
      subjectId: 'dbms',
      topicId: 'dbms-sql-joins',
      subjectName: 'Database Management Systems',
      topicName: 'SQL Queries & Joins',
      difficulty: 'Medium',
      questionText: 'Which join algorithm in a database query engine builds an in-memory hash table on the smaller relation and probes it using rows from the larger relation?',
      options: ['Nested Loop Join', 'Sort-Merge Join', 'Hash Join', 'Cartesian Product'],
      correctIndex: 2,
      explanation: 'A Hash Join consists of two phases: 1) Build Phase: reads the smaller (inner) table and builds an in-memory hash table on the join key. 2) Probe Phase: scans the larger (outer) table, hashing each row\'s key to find matches in O(1) average time.',
      hint: 'Builds an in-memory hash map and probes it.'
    },
    {
      id: 'cq-dbms-join-4',
      subjectId: 'dbms',
      topicId: 'dbms-sql-joins',
      subjectName: 'Database Management Systems',
      topicName: 'SQL Queries & Joins',
      difficulty: 'Hard',
      questionText: 'What is the result of applying a `CROSS JOIN` between Table A with 50 rows and Table B with 20 rows?',
      options: ['70 rows', '1000 rows (Cartesian Product)', '50 rows', '30 rows'],
      correctIndex: 1,
      explanation: 'A CROSS JOIN produces the Cartesian product of two relations. Every row in Table A is paired with every row in Table B. Therefore: 50 * 20 = 1000 rows.',
      hint: 'Multiply the cardinalities of both tables.'
    },
    {
      id: 'cq-dbms-join-5',
      subjectId: 'dbms',
      topicId: 'dbms-sql-joins',
      subjectName: 'Database Management Systems',
      topicName: 'SQL Queries & Joins',
      difficulty: 'Hard',
      questionText: 'When is a Sort-Merge Join preferred over a Hash Join by the cost-based query optimizer?',
      options: [
        'When both relations are already sorted on the join key (e.g. via clustered index) or require sorted output for an `ORDER BY` clause.',
        'When the join condition uses the inequality operator `<>`.',
        'When one table has only 1 row.',
        'When memory is completely infinite.'
      ],
      correctIndex: 0,
      explanation: 'If both inputs are already sorted on the join attribute (or indexed clustered), Sort-Merge Join scans both streams simultaneously in linear O(N + M) time with minimal memory overhead, avoiding expensive hash table construction.',
      hint: 'Think about pre-existing sorted order from indexes.'
    }
  ],

  'dbms-normalization': [
    {
      id: 'cq-dbms-norm-1',
      subjectId: 'dbms',
      topicId: 'dbms-normalization',
      subjectName: 'Database Management Systems',
      topicName: 'Normalization & Dependencies',
      difficulty: 'Easy',
      questionText: 'What is the primary requirement for a relation to be in First Normal Form (1NF)?',
      options: [
        'Every attribute must contain only atomic (indivisible) values, with no repeating groups or arrays.',
        'All non-key attributes must be fully dependent on the primary key.',
        'There must be no transitive dependencies.',
        'Every determinant must be a candidate key.'
      ],
      correctIndex: 0,
      explanation: '1NF mandates that each column contains only atomic (scalar) values, eliminating composite attributes, comma-separated lists, and multi-valued repeating groups.',
      hint: 'Atomic values with no repeating sets.'
    },
    {
      id: 'cq-dbms-norm-2',
      subjectId: 'dbms',
      topicId: 'dbms-normalization',
      subjectName: 'Database Management Systems',
      topicName: 'Normalization & Dependencies',
      difficulty: 'Medium',
      questionText: 'A relation is in 2NF if it is in 1NF and contains no:',
      options: ['Transitive dependencies', 'Partial functional dependencies (where a non-prime attribute depends on a proper subset of a composite candidate key)', 'Multi-valued dependencies', 'Foreign keys'],
      correctIndex: 1,
      explanation: '2NF removes partial functional dependencies: no non-prime attribute should depend on only a part of a composite candidate key; it must depend on the whole key.',
      hint: 'No non-key attribute can depend on only a part of a composite key.'
    },
    {
      id: 'cq-dbms-norm-3',
      subjectId: 'dbms',
      topicId: 'dbms-normalization',
      subjectName: 'Database Management Systems',
      topicName: 'Normalization & Dependencies',
      difficulty: 'Medium',
      questionText: 'What constitutes a "transitive dependency" which must be eliminated to achieve Third Normal Form (3NF)?',
      options: [
        'When X -> Y and Y -> Z, where Z is a non-prime attribute and Y is not a candidate key.',
        'When a table references another database on a remote server.',
        'When an index has more than 3 levels in a B-Tree.',
        'When two queries run in the same transaction.'
      ],
      correctIndex: 0,
      explanation: '3NF requires that in every non-trivial functional dependency X -> Y, either X is a superkey or Y is a prime attribute. It eliminates transitive chains like A -> B -> C where a non-key depends on another non-key.',
      hint: 'Non-key attributes must depend on the key, the whole key, and nothing but the key.'
    },
    {
      id: 'cq-dbms-norm-4',
      subjectId: 'dbms',
      topicId: 'dbms-normalization',
      subjectName: 'Database Management Systems',
      topicName: 'Normalization & Dependencies',
      difficulty: 'Hard',
      questionText: 'How is Boyce-Codd Normal Form (BCNF) strictly stronger than 3NF?',
      options: [
        'BCNF permits multi-valued attributes.',
        'In BCNF, for every functional dependency X -> Y, X MUST be a superkey (3NF allows Y to be a prime attribute even if X is not a superkey).',
        'BCNF requires all foreign keys to be composite.',
        'BCNF requires denormalizing back to 1NF.'
      ],
      correctIndex: 1,
      explanation: '3NF allows an exception: if Y is a prime attribute, X does not need to be a superkey. BCNF removes this exception: for EVERY non-trivial FD X -> Y, X MUST be a superkey, eliminating overlap anomalies.',
      hint: 'In BCNF, the left-hand determinant must ALWAYS be a superkey.'
    },
    {
      id: 'cq-dbms-norm-5',
      subjectId: 'dbms',
      topicId: 'dbms-normalization',
      subjectName: 'Database Management Systems',
      topicName: 'Normalization & Dependencies',
      difficulty: 'Hard',
      questionText: 'What trade-off can occur when decomposing a relation into BCNF that is always preserved in 3NF?',
      options: [
        'BCNF decomposition may not preserve functional dependencies (dependency preservation).',
        'BCNF tables cannot support SQL queries.',
        'BCNF results in lossy joins.',
        'BCNF causes memory leaks in the database buffer pool.'
      ],
      correctIndex: 0,
      explanation: 'While both 3NF and BCNF can always achieve lossless join decomposition, 3NF is guaranteed to preserve all functional dependencies, whereas some relations cannot be decomposed into BCNF without losing dependency preservation.',
      hint: 'Dependency preservation is guaranteed in 3NF, but not always in BCNF.'
    }
  ],

  // =========================================================================
  // DATA STRUCTURES & ALGORITHMS
  // =========================================================================
  'dsa-arrays-strings': [
    {
      id: 'cq-dsa-arr-1',
      subjectId: 'dsa',
      topicId: 'dsa-arrays-strings',
      subjectName: 'Data Structures & Algorithms',
      topicName: 'Arrays & Strings',
      difficulty: 'Easy',
      questionText: 'What is the time complexity to access an element at an arbitrary index in an array in memory?',
      options: ['O(1) constant time', 'O(n) linear time', 'O(log n) logarithmic time', 'O(n^2) quadratic time'],
      correctIndex: 0,
      explanation: 'Arrays allocate contiguous blocks of physical memory. The memory address of index i is calculated directly as: `base_address + i * element_size`, enabling instantaneous O(1) random access.',
      hint: 'Direct memory pointer arithmetic.'
    },
    {
      id: 'cq-dsa-arr-2',
      subjectId: 'dsa',
      topicId: 'dsa-arrays-strings',
      subjectName: 'Data Structures & Algorithms',
      topicName: 'Arrays & Strings',
      difficulty: 'Medium',
      questionText: 'Which algorithmic pattern is optimal for finding the maximum sum of any contiguous subarray of size K in an array of size N in O(N) time?',
      options: ['Binary search', 'Sliding Window', 'Depth-First Search', 'Divide and Conquer with recursion'],
      correctIndex: 1,
      explanation: 'The Sliding Window pattern maintains a window of size K. When advancing the window one step, it subtracts the element exiting the left edge and adds the element entering the right edge in O(1) time per step, achieving O(N) total time.',
      hint: 'A window of fixed size K slides along the array.'
    },
    {
      id: 'cq-dsa-arr-3',
      subjectId: 'dsa',
      topicId: 'dsa-arrays-strings',
      subjectName: 'Data Structures & Algorithms',
      topicName: 'Arrays & Strings',
      difficulty: 'Medium',
      questionText: 'What is Kadane\'s Algorithm used for, and what are its time and space bounds?',
      options: [
        'Finding the maximum subarray sum in O(n) time and O(1) auxiliary space.',
        'Sorting strings lexicographically in O(n log n) time and O(n) space.',
        'Finding the longest common prefix in O(n^2) time.',
        'Inverting a matrix in O(n^3) time.'
      ],
      correctIndex: 0,
      explanation: 'Kadane\'s algorithm calculates the maximum contiguous subarray sum in a single linear pass by maintaining `current_max = max(num, current_max + num)` and updating `global_max`, running in O(n) time and O(1) space.',
      hint: 'Dynamic programming for maximum contiguous subarray.'
    },
    {
      id: 'cq-dsa-arr-4',
      subjectId: 'dsa',
      topicId: 'dsa-arrays-strings',
      subjectName: 'Data Structures & Algorithms',
      topicName: 'Arrays & Strings',
      difficulty: 'Hard',
      questionText: 'In a two-pointer approach to reverse words in a character array in-place with O(1) extra space, what is the standard strategy?',
      options: [
        'First reverse the entire character array; then reverse each individual word within the array.',
        'Allocate a hash table and push characters in reverse order.',
        'Use quicksort on ASCII codes.',
        'Insert null bytes between words.'
      ],
      correctIndex: 0,
      explanation: 'Reversing the whole string puts the words in the correct global positions (but with inverted characters). Then, scanning and reversing the characters of each individual word restores the letters to normal in O(n) time and O(1) space.',
      hint: 'Reverse the whole array, then reverse word by word.'
    },
    {
      id: 'cq-dsa-arr-5',
      subjectId: 'dsa',
      topicId: 'dsa-arrays-strings',
      subjectName: 'Data Structures & Algorithms',
      topicName: 'Arrays & Strings',
      difficulty: 'Hard',
      questionText: 'What data structure allows answering range sum queries `sum(L, R)` on a static array in O(1) query time after O(n) precomputation?',
      options: ['Prefix Sum Array', 'Linked List', 'Max Heap', 'Trie'],
      correctIndex: 0,
      explanation: 'A Prefix Sum array stores P[i] = sum(A[0..i]). Any range sum from L to R is answered in O(1) via `P[R] - P[L-1]`.',
      hint: 'Precomputing cumulative sums.'
    }
  ],

  'dsa-linked-lists': [
    {
      id: 'cq-dsa-ll-1',
      subjectId: 'dsa',
      topicId: 'dsa-linked-lists',
      subjectName: 'Data Structures & Algorithms',
      topicName: 'Linked Lists',
      difficulty: 'Easy',
      questionText: 'What is the time complexity to insert a new node at the head of a singly linked list if a pointer to head is available?',
      options: ['O(1) constant time', 'O(n) linear time', 'O(log n)', 'O(n^2)'],
      correctIndex: 0,
      explanation: 'Inserting at the head simply requires setting `newNode.next = head` and `head = newNode`. This is an O(1) operation because no elements need to be shifted.',
      hint: 'No traversal or element shifting is required.'
    },
    {
      id: 'cq-dsa-ll-2',
      subjectId: 'dsa',
      topicId: 'dsa-linked-lists',
      subjectName: 'Data Structures & Algorithms',
      topicName: 'Linked Lists',
      difficulty: 'Medium',
      questionText: 'Which algorithm detects a cycle in a linked list using O(1) memory by advancing one pointer by 1 step and another by 2 steps?',
      options: ['Floyd\'s Cycle-Finding Algorithm (Tortoise and Hare)', 'Dijkstra\'s Algorithm', 'Kruskal\'s Algorithm', 'Boyer-Moore Voting Algorithm'],
      correctIndex: 0,
      explanation: 'Floyd\'s Tortoise and Hare algorithm uses two pointers: slow moves 1 node per iteration, fast moves 2 nodes. If a cycle exists, the fast pointer will lap and meet the slow pointer inside the loop in O(n) time and O(1) space.',
      hint: 'Often named after the tortoise and hare fable.'
    },
    {
      id: 'cq-dsa-ll-3',
      subjectId: 'dsa',
      topicId: 'dsa-linked-lists',
      subjectName: 'Data Structures & Algorithms',
      topicName: 'Linked Lists',
      difficulty: 'Medium',
      questionText: 'To reverse a singly linked list iteratively in O(n) time, how many pointer variables are typically maintained?',
      options: ['Three pointers: prev, curr, and next', 'One single pointer', 'An array of pointers equal to list length', 'None (recursion only)'],
      correctIndex: 0,
      explanation: 'The classic iterative reversal uses `prev = null`, `curr = head`, and a temporary `next`. In each step: `next = curr.next; curr.next = prev; prev = curr; curr = next;`.',
      hint: 'Track previous, current, and temporary next.'
    },
    {
      id: 'cq-dsa-ll-4',
      subjectId: 'dsa',
      topicId: 'dsa-linked-lists',
      subjectName: 'Data Structures & Algorithms',
      topicName: 'Linked Lists',
      difficulty: 'Hard',
      questionText: 'How can you find the middle node of a singly linked list in a single pass without computing the total length?',
      options: [
        'Advance a fast pointer by 2 steps and a slow pointer by 1 step; when fast reaches the end, slow points to the middle.',
        'Reverse the linked list halfway.',
        'Use random pointer jumping.',
        'It is impossible in a single pass without storing nodes in an array.'
      ],
      correctIndex: 0,
      explanation: 'Since the fast pointer travels at double the speed of the slow pointer, when the fast pointer reaches the end (null), the slow pointer has traversed exactly half the distance, landing directly on the middle node.',
      hint: 'Two pointers moving at speeds of 1 and 2.'
    },
    {
      id: 'cq-dsa-ll-5',
      subjectId: 'dsa',
      topicId: 'dsa-linked-lists',
      subjectName: 'Data Structures & Algorithms',
      topicName: 'Linked Lists',
      difficulty: 'Hard',
      questionText: 'What is the primary memory disadvantage of a Doubly Linked List compared to a Singly Linked List?',
      options: [
        'Each node requires an additional reference/pointer (`prev`), increasing per-node memory overhead by 8 bytes (on 64-bit JVMs).',
        'Doubly linked lists cannot store numbers.',
        'Doubly linked lists cannot be traversed forward.',
        'Garbage collection fails on doubly linked lists.'
      ],
      correctIndex: 0,
      explanation: 'Every node in a doubly linked list stores an extra backward pointer (`prev`), consuming extra memory per node, which adds significant overhead for large numbers of small elements.',
      hint: 'An extra backward reference per node.'
    }
  ],

  'dsa-stacks-queues': [
    {
      id: 'cq-dsa-sq-1',
      subjectId: 'dsa',
      topicId: 'dsa-stacks-queues',
      subjectName: 'Data Structures & Algorithms',
      topicName: 'Stacks & Queues',
      difficulty: 'Easy',
      questionText: 'What data structure operates on a First-In, First-Out (FIFO) discipline?',
      options: ['Queue', 'Stack', 'Heap', 'Trie'],
      correctIndex: 0,
      explanation: 'A Queue enforces FIFO (First-In, First-Out): elements are enqueued at the rear and dequeued from the front in the order they arrived.',
      hint: 'Like a line of people waiting at a ticket counter.'
    },
    {
      id: 'cq-dsa-sq-2',
      subjectId: 'dsa',
      topicId: 'dsa-stacks-queues',
      subjectName: 'Data Structures & Algorithms',
      topicName: 'Stacks & Queues',
      difficulty: 'Medium',
      questionText: 'Which data structure is ideal for checking whether a string of brackets (e.g. "{[()]}") is balanced?',
      options: ['Stack (LIFO)', 'Queue (FIFO)', 'Binary Search Tree', 'Hash Map'],
      correctIndex: 0,
      explanation: 'A stack is ideal because the most recently opened bracket must be the first one to be closed. Pushing opening brackets and popping upon encountering matching closing brackets solves this in O(n) time.',
      hint: 'Last opened bracket must be first to match and close.'
    },
    {
      id: 'cq-dsa-sq-3',
      subjectId: 'dsa',
      topicId: 'dsa-stacks-queues',
      subjectName: 'Data Structures & Algorithms',
      topicName: 'Stacks & Queues',
      difficulty: 'Medium',
      questionText: 'What is a "Monotonic Stack", and what classic problem does it solve in linear O(n) time?',
      options: [
        'A stack where elements are strictly increasing or decreasing; used to solve "Next Greater Element" and "Largest Rectangle in Histogram".',
        'A stack that can only hold strings of length 1.',
        'A stack that automatically sorts itself using quicksort on every push.',
        'A queue with two heads.'
      ],
      correctIndex: 0,
      explanation: 'A monotonic stack maintains elements in sorted invariant (strictly increasing or decreasing). It solves problems like Next Greater Element, Daily Temperatures, and Largest Rectangle in Histogram in O(n) overall time.',
      hint: 'Maintains an ordered sequence to find nearest greater or smaller elements.'
    },
    {
      id: 'cq-dsa-sq-4',
      subjectId: 'dsa',
      topicId: 'dsa-stacks-queues',
      subjectName: 'Data Structures & Algorithms',
      topicName: 'Stacks & Queues',
      difficulty: 'Hard',
      questionText: 'How can a Queue be implemented using TWO Stacks (inStack and outStack) with O(1) amortized time per operation?',
      options: [
        'Push to inStack on enqueue; on dequeue, if outStack is empty, pop all elements from inStack and push them into outStack, then pop from outStack.',
        'Alternate pushing between the two stacks on every enqueue.',
        'Use recursive reflection.',
        'Two stacks cannot implement a queue.'
      ],
      correctIndex: 0,
      explanation: 'Elements enter inStack. When dequeue is called, if outStack is empty, all elements are poured from inStack into outStack (reversing their order to FIFO). Since each element is transferred at most once, the amortized cost per operation is O(1).',
      hint: 'Pour elements from the first stack into the second to reverse their order.'
    },
    {
      id: 'cq-dsa-sq-5',
      subjectId: 'dsa',
      topicId: 'dsa-stacks-queues',
      subjectName: 'Data Structures & Algorithms',
      topicName: 'Stacks & Queues',
      difficulty: 'Hard',
      questionText: 'In an array-based implementation of a Circular Queue of size N, how are the front and rear pointers wrapped around?',
      options: [
        'Using the modulo operator: `(rear + 1) % N` and `(front + 1) % N`',
        'By re-allocating a new array on every push',
        'By shifting all array elements left by 1 on every dequeue',
        'By storing negative index offsets'
      ],
      correctIndex: 0,
      explanation: 'A circular queue uses the modulo operator `% capacity` to wrap the index back to 0 when it increments past the end of the array, avoiding unnecessary element shifting.',
      hint: 'Mathematical modulo arithmetic wraps indices.'
    }
  ]
};

/**
 * Returns 5 tailored, high-quality questions for any given topicId.
 * Falls back to filtering the global QUESTION_BANK or subject questions.
 */
export function getQuestionsForConcept(topicId: string, subjectId?: string): Question[] {
  // 1. Check if direct dedicated questions exist in CONCEPT_QUIZZES
  if (CONCEPT_QUIZZES[topicId] && CONCEPT_QUIZZES[topicId].length >= 3) {
    return CONCEPT_QUIZZES[topicId];
  }

  // 2. Check in global QUESTION_BANK
  const matching = QUESTION_BANK.filter(q => q.topicId === topicId);
  if (matching.length >= 3) {
    return matching;
  }

  // 3. Fallback: take matching plus subject-level questions
  const subjectMatching = QUESTION_BANK.filter(q => q.subjectId === subjectId);
  const combined = [...matching, ...subjectMatching];
  
  // Deduplicate by question id
  const uniqueMap = new Map<string, Question>();
  combined.forEach(q => uniqueMap.set(q.id, q));
  const result = Array.from(uniqueMap.values()).slice(0, 5);

  if (result.length > 0) {
    return result;
  }

  // 4. Default fallback: return first 5 from QUESTION_BANK
  return QUESTION_BANK.slice(0, 5);
}
