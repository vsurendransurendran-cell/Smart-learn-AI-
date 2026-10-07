import { Subject, Question, LearningMaterial } from '../types';
import { 
  ADDITIONAL_JAVA_TOPICS, 
  ADDITIONAL_OS_TOPICS, 
  ADDITIONAL_DBMS_TOPICS, 
  ADDITIONAL_DSA_TOPICS,
  EXTENDED_QUESTIONS
} from './extendedCurriculum';

export const SUBJECTS: Subject[] = [
  {
    id: 'java',
    name: 'Java Programming',
    code: 'CS201',
    description: 'Object-Oriented Programming, Memory Management, Exception Handling, Collections, and Concurrency.',
    iconName: 'Coffee',
    color: 'amber',
    topics: [
      { id: 'java-oop', subjectId: 'java', name: 'Object-Oriented Principles', description: 'Encapsulation, Inheritance, Polymorphism, Abstraction, and Interfaces', difficulty: 'Easy', conceptsCount: 6, questionsCount: 5 },
      { id: 'java-exceptions', subjectId: 'java', name: 'Exception Handling', description: 'Checked vs Unchecked Exceptions, try-with-resources, custom exceptions, throw vs throws', difficulty: 'Medium', conceptsCount: 5, questionsCount: 5 },
      { id: 'java-collections', subjectId: 'java', name: 'Collections Framework', description: 'List, Set, Map hierarchies, ArrayList vs LinkedList, HashMap internal hashing', difficulty: 'Medium', conceptsCount: 7, questionsCount: 5 },
      { id: 'java-concurrency', subjectId: 'java', name: 'Multithreading & Concurrency', description: 'Thread lifecycle, synchronized blocks, locks, volatile, and ExecutorService', difficulty: 'Hard', conceptsCount: 6, questionsCount: 5 },
      { id: 'java-memory', subjectId: 'java', name: 'Memory & Garbage Collection', description: 'Stack vs Heap, JVM generational spaces (Eden, Survivor, Tenured), GC algorithms', difficulty: 'Hard', conceptsCount: 5, questionsCount: 5 },
      ...ADDITIONAL_JAVA_TOPICS
    ]
  },
  {
    id: 'os',
    name: 'Operating Systems',
    code: 'CS301',
    description: 'Processes, CPU Scheduling, Deadlocks, Virtual Memory, and File System architecture.',
    iconName: 'Cpu',
    color: 'blue',
    topics: [
      { id: 'os-scheduling', subjectId: 'os', name: 'Process Scheduling', description: 'FCFS, SJF, Round Robin, Multi-level Feedback Queues, Gantt charts', difficulty: 'Easy', conceptsCount: 5, questionsCount: 5 },
      { id: 'os-sync-deadlock', subjectId: 'os', name: 'Synchronization & Deadlocks', description: 'Semaphores, Mutex, Critical Section, Banker’s Algorithm, Resource Allocation Graphs', difficulty: 'Hard', conceptsCount: 6, questionsCount: 5 },
      { id: 'os-paging', subjectId: 'os', name: 'Memory Management & Paging', description: 'Logical vs Physical address translation, Page Tables, TLB, Fragmentation', difficulty: 'Medium', conceptsCount: 5, questionsCount: 5 },
      { id: 'os-virtual-mem', subjectId: 'os', name: 'Virtual Memory & Page Replacement', description: 'Demand paging, Page Faults, FIFO, LRU, Optimal replacement algorithms', difficulty: 'Medium', conceptsCount: 5, questionsCount: 5 },
      { id: 'os-file-systems', subjectId: 'os', name: 'File Systems & Storage', description: 'Inodes, directory structures, contiguous vs indexed allocation, disk scheduling', difficulty: 'Easy', conceptsCount: 4, questionsCount: 5 },
      ...ADDITIONAL_OS_TOPICS
    ]
  },
  {
    id: 'dbms',
    name: 'Database Management Systems',
    code: 'CS204',
    description: 'Relational algebra, SQL joins, Normalization (1NF to BCNF), Indexing, and ACID Transactions.',
    iconName: 'Database',
    color: 'emerald',
    topics: [
      { id: 'dbms-sql-joins', subjectId: 'dbms', name: 'SQL Queries & Joins', description: 'INNER, LEFT, RIGHT, FULL OUTER joins, aggregation, GROUP BY, HAVING', difficulty: 'Easy', conceptsCount: 6, questionsCount: 5 },
      { id: 'dbms-normalization', subjectId: 'dbms', name: 'Normalization & Dependencies', description: 'Functional dependencies, 1NF, 2NF, 3NF, BCNF losslessness and dependency preservation', difficulty: 'Hard', conceptsCount: 6, questionsCount: 5 },
      { id: 'dbms-acid', subjectId: 'dbms', name: 'Transactions & ACID Properties', description: 'Atomicity, Consistency, Isolation levels, Durability, Write-Ahead Logging', difficulty: 'Medium', conceptsCount: 5, questionsCount: 5 },
      { id: 'dbms-indexing', subjectId: 'dbms', name: 'Indexing & B-Trees', description: 'Primary vs Secondary indexes, Clustered vs Non-clustered, B-Tree and B+ Tree structures', difficulty: 'Hard', conceptsCount: 5, questionsCount: 5 },
      { id: 'dbms-concurrency', subjectId: 'dbms', name: 'Concurrency Control', description: 'Two-Phase Locking (2PL), Timestamp ordering, Phantom reads, Deadlock handling', difficulty: 'Medium', conceptsCount: 5, questionsCount: 5 },
      ...ADDITIONAL_DBMS_TOPICS
    ]
  },
  {
    id: 'dsa',
    name: 'Data Structures & Algorithms',
    code: 'CS202',
    description: 'Arrays, Strings, Linked Lists, Trees, Graphs, Sorting, and Dynamic Programming.',
    iconName: 'Network',
    color: 'purple',
    topics: [
      { id: 'dsa-arrays-strings', subjectId: 'dsa', name: 'Arrays & Strings', description: 'Sliding window, Two pointers, Kadane’s algorithm, Prefix sums, Memory layouts', difficulty: 'Easy', conceptsCount: 5, questionsCount: 5 },
      { id: 'dsa-linked-lists', subjectId: 'dsa', name: 'Linked Lists', description: 'Singly, Doubly, Circular lists, Fast & Slow pointers, cycle detection, list reversal', difficulty: 'Medium', conceptsCount: 5, questionsCount: 5 },
      { id: 'dsa-stacks-queues', subjectId: 'dsa', name: 'Stacks & Queues', description: 'LIFO, FIFO, Monotonic stacks, Priority queues, Deque, expression parsing', difficulty: 'Medium', conceptsCount: 5, questionsCount: 5 },
      { id: 'dsa-trees', subjectId: 'dsa', name: 'Binary Trees & BST', description: 'In-order, Pre-order, Post-order traversals, BST search/insert, AVL height balancing', difficulty: 'Hard', conceptsCount: 6, questionsCount: 5 },
      { id: 'dsa-graphs', subjectId: 'dsa', name: 'Graphs & Traversals', description: 'Adjacency list/matrix, BFS, DFS, Dijkstra’s shortest path, Topological sort', difficulty: 'Hard', conceptsCount: 6, questionsCount: 5 },
      ...ADDITIONAL_DSA_TOPICS
    ]
  }
];

export const QUESTION_BANK: Question[] = [
  ...EXTENDED_QUESTIONS,
  // --- JAVA: OOP ---
  {
    id: 'j-oop-1',
    subjectId: 'java',
    topicId: 'java-oop',
    subjectName: 'Java Programming',
    topicName: 'Object-Oriented Principles',
    difficulty: 'Easy',
    questionText: 'Which OOP principle is demonstrated when a subclass provides a specific implementation of a method that is already defined in its superclass?',
    options: [
      'Method Overloading (Compile-time Polymorphism)',
      'Method Overriding (Runtime Polymorphism)',
      'Data Encapsulation',
      'Structural Coupling'
    ],
    correctIndex: 1,
    explanation: 'Method overriding happens at runtime when a subclass defines a method with the exact same signature as in the parent class, enabling dynamic method dispatch (runtime polymorphism).',
    hint: 'Think about runtime dynamic dispatch.'
  },
  {
    id: 'j-oop-2',
    subjectId: 'java',
    topicId: 'java-oop',
    subjectName: 'Java Programming',
    topicName: 'Object-Oriented Principles',
    difficulty: 'Easy',
    questionText: 'What will be the output of the following Java snippet?',
    codeSnippet: `class Parent {
  void show() { System.out.print("P"); }
}
class Child extends Parent {
  void show() { System.out.print("C"); }
}
public class Test {
  public static void main(String[] args) {
    Parent obj = new Child();
    obj.show();
  }
}`,
    options: [
      'P',
      'C',
      'Compilation Error',
      'Runtime NullPointerException'
    ],
    correctIndex: 1,
    explanation: 'In Java, method calls on objects are resolved based on the actual runtime object instance ("Child"), not the reference variable type ("Parent"). Hence Child\'s show() outputs "C".',
    hint: 'Virtual method invocation relies on the instance type in heap memory.'
  },
  {
    id: 'j-oop-3',
    subjectId: 'java',
    topicId: 'java-oop',
    subjectName: 'Java Programming',
    topicName: 'Object-Oriented Principles',
    difficulty: 'Medium',
    questionText: 'Can an interface in Java 8+ have concrete methods?',
    options: [
      'No, interfaces can strictly only contain abstract method signatures.',
      'Yes, using default or static method keywords.',
      'Only if the interface extends an abstract class.',
      'Yes, but only private helper methods.'
    ],
    correctIndex: 1,
    explanation: 'Java 8 introduced default and static methods in interfaces to allow adding new methods without breaking existing implementations.',
    hint: 'Keywords like "default" and "static" allow method bodies in interfaces.'
  },
  {
    id: 'j-oop-4',
    subjectId: 'java',
    topicId: 'java-oop',
    subjectName: 'Java Programming',
    topicName: 'Object-Oriented Principles',
    difficulty: 'Medium',
    questionText: 'Which statement accurately describes the difference between an abstract class and an interface in modern Java?',
    options: [
      'A class can implement only one interface, but extend multiple abstract classes.',
      'Abstract classes can maintain state with non-static instance fields, whereas interfaces cannot.',
      'Interfaces can declare protected and package-private methods, whereas abstract classes cannot.',
      'Abstract classes cannot have constructors, while interfaces always have constructors.'
    ],
    correctIndex: 1,
    explanation: 'Abstract classes can hold mutable instance variables and constructors. Interfaces cannot have instance state; all variables declared in an interface are implicitly public, static, and final.',
    hint: 'Consider where instance fields and state can reside.'
  },
  {
    id: 'j-oop-5',
    subjectId: 'java',
    topicId: 'java-oop',
    subjectName: 'Java Programming',
    topicName: 'Object-Oriented Principles',
    difficulty: 'Hard',
    questionText: 'Why does Java not support multiple inheritance with concrete classes, and how does it prevent the "Diamond Problem"?',
    options: [
      'To reduce compiler memory usage during bytecode generation.',
      'Because multiple classes might implement conflicting state and method definitions, leading to ambiguity on which superclass method to execute.',
      'Because the JVM garbage collector cannot trace multiple parent pointers.',
      'It is supported if classes are marked with the "multiple" keyword.'
    ],
    correctIndex: 1,
    explanation: 'The Diamond Problem occurs when class D extends B and C, both inheriting from A. If B and C override a method from A, D has ambiguity regarding which method to invoke. Java avoids this by permitting single class inheritance while allowing multiple interface implementations with explicit collision resolution.',
    hint: 'Ambiguity in method resolution order and superclass state.'
  },

  // --- JAVA: EXCEPTION HANDLING ---
  {
    id: 'j-exc-1',
    subjectId: 'java',
    topicId: 'java-exceptions',
    subjectName: 'Java Programming',
    topicName: 'Exception Handling',
    difficulty: 'Easy',
    questionText: 'Which of the following is a checked exception in Java?',
    options: [
      'NullPointerException',
      'ArrayIndexOutOfBoundsException',
      'IOException',
      'ArithmeticException'
    ],
    correctIndex: 2,
    explanation: 'IOException directly inherits from java.lang.Exception and is a checked exception that must be either caught with try-catch or declared with throws. The others inherit from RuntimeException and are unchecked.',
    hint: 'Checked exceptions are verified at compile time.'
  },
  {
    id: 'j-exc-2',
    subjectId: 'java',
    topicId: 'java-exceptions',
    subjectName: 'Java Programming',
    topicName: 'Exception Handling',
    difficulty: 'Medium',
    questionText: 'What will be returned by this method execution?',
    codeSnippet: `public int calculate() {
  try {
    return 10;
  } finally {
    return 20;
  }
}`,
    options: [
      '10',
      '20',
      'Compilation Error',
      'Undefined Behavior'
    ],
    correctIndex: 1,
    explanation: 'The finally block always executes prior to method exit. A return statement in a finally block overrides any previous return statement in the try or catch block.',
    hint: 'The finally block executes immediately before control returns to the caller.'
  },
  {
    id: 'j-exc-3',
    subjectId: 'java',
    topicId: 'java-exceptions',
    subjectName: 'Java Programming',
    topicName: 'Exception Handling',
    difficulty: 'Medium',
    questionText: 'What interface must an object implement to be eligible for use in Java\'s try-with-resources statement?',
    options: [
      'java.io.Serializable',
      'java.lang.AutoCloseable',
      'java.lang.Cloneable',
      'java.util.Disposable'
    ],
    correctIndex: 1,
    explanation: 'Any resource passed to try-with-resources must implement java.lang.AutoCloseable (or its sub-interface java.io.Closeable), which provides the close() method invoked automatically upon leaving the try block.',
    hint: 'Think about automatic closing of streams.'
  },
  {
    id: 'j-exc-4',
    subjectId: 'java',
    topicId: 'java-exceptions',
    subjectName: 'Java Programming',
    topicName: 'Exception Handling',
    difficulty: 'Hard',
    questionText: 'What happens to a suppressed exception when both the try block and the auto-closing mechanism in try-with-resources throw exceptions?',
    options: [
      'The close() exception is thrown, and the try block exception is lost silently.',
      'The try block exception is thrown, and the close() exception is attached as a suppressed exception accessible via getSuppressed().',
      'Both exceptions trigger an immediate JVM crash with OutOfMemoryError.',
      'The program hangs indefinitely.'
    ],
    correctIndex: 1,
    explanation: 'In Java 7+, try-with-resources prioritizes the exception thrown by the code body and suppresses exceptions thrown during automatic closing, attaching them to Throwable.getSuppressed().',
    hint: 'Java preserves the primary error and attaches auxiliary errors.'
  },
  {
    id: 'j-exc-5',
    subjectId: 'java',
    topicId: 'java-exceptions',
    subjectName: 'Java Programming',
    topicName: 'Exception Handling',
    difficulty: 'Hard',
    questionText: 'In multi-catch syntax introduced in Java 7 (`catch (IOException | SQLException ex)`), what is a restriction on the caught exception types?',
    options: [
      'The exception variable "ex" is implicitly final and cannot be reassigned.',
      'Both exceptions must belong to the exact same package.',
      'Only unchecked exceptions can be combined in multi-catch.',
      'At least three exceptions must be chained together.'
    ],
    correctIndex: 0,
    explanation: 'In a multi-catch block, the catch parameter is implicitly final, so you cannot reassign "ex = new IOException();". Furthermore, the alternatives cannot have a subclass-superclass relationship with each other.',
    hint: 'Can you reassign the variable inside the multi-catch block?'
  },

  // --- JAVA: COLLECTIONS ---
  {
    id: 'j-col-1',
    subjectId: 'java',
    topicId: 'java-collections',
    subjectName: 'Java Programming',
    topicName: 'Collections Framework',
    difficulty: 'Easy',
    questionText: 'What is the primary difference in performance between ArrayList and LinkedList when accessing an element at a random index (e.g., list.get(5000))?',
    options: [
      'ArrayList is O(1) random access, LinkedList is O(n) linear traversal.',
      'LinkedList is O(1) random access, ArrayList is O(n).',
      'Both take O(log n) time.',
      'Both take O(1) time.'
    ],
    correctIndex: 0,
    explanation: 'ArrayList is backed by a contiguous array, allowing immediate pointer arithmetic in O(1) time. LinkedList is a doubly-linked chain of node pointers requiring sequential traversal from head or tail in O(n) time.',
    hint: 'Contiguous memory vs pointer chasing.'
  },
  {
    id: 'j-col-2',
    subjectId: 'java',
    topicId: 'java-collections',
    subjectName: 'Java Programming',
    topicName: 'Collections Framework',
    difficulty: 'Medium',
    questionText: 'How does HashMap in Java 8+ handle bucket collisions when the number of elements in a single bucket exceeds TREEIFY_THRESHOLD (default 8)?',
    options: [
      'It discards older entries using LRU cache eviction.',
      'It converts the bucket linked list into a balanced Red-Black Tree to guarantee O(log n) search.',
      'It triggers a fatal HashCollisionException.',
      'It doubles the capacity without reorganizing the bucket.'
    ],
    correctIndex: 1,
    explanation: 'In Java 8, when a bucket reaches 8 items (and total capacity >= 64), the linked list converts into a TreeNode red-black tree, preventing worst-case O(n) collision degradation down to O(log n).',
    hint: 'From linear search to balanced binary tree search.'
  },
  {
    id: 'j-col-3',
    subjectId: 'java',
    topicId: 'java-collections',
    subjectName: 'Java Programming',
    topicName: 'Collections Framework',
    difficulty: 'Medium',
    questionText: 'If two objects are equal according to the equals(Object) contract, what must be true regarding their hashCode() values?',
    options: [
      'Their hashCode() values can be different as long as their memory addresses match.',
      'Their hashCode() values MUST be identical.',
      'Their hashCode() values must be negative numbers.',
      'There is no relationship between equals and hashCode.'
    ],
    correctIndex: 1,
    explanation: 'The Java contract states: If obj1.equals(obj2) is true, obj1.hashCode() MUST equal obj2.hashCode(). Violating this causes hash-based collections (HashSet, HashMap) to lose entries.',
    hint: 'The equals-hashCode contract.'
  },
  {
    id: 'j-col-4',
    subjectId: 'java',
    topicId: 'java-collections',
    subjectName: 'Java Programming',
    topicName: 'Collections Framework',
    difficulty: 'Hard',
    questionText: 'Why is ConcurrentHashMap preferred over Collections.synchronizedMap(map) in high-throughput multithreaded applications?',
    options: [
      'ConcurrentHashMap uses fine-grained lock striping / synchronized buckets and lock-free reads, whereas synchronizedMap locks the entire map on every operation.',
      'ConcurrentHashMap does not allow null keys, making it execute 10x faster.',
      'ConcurrentHashMap runs in native C++ assembly on the CPU.',
      'synchronizedMap crashes if more than two threads write simultaneously.'
    ],
    correctIndex: 0,
    explanation: 'ConcurrentHashMap achieves high concurrency by avoiding table-wide locks. In Java 8, it uses CAS (Compare-And-Swap) for empty bucket insertions and synchronizes only on the head node of specific buckets, allowing concurrent reads and writes across disparate buckets.',
    hint: 'Whole-table locking vs bucket-level locking.'
  },
  {
    id: 'j-col-5',
    subjectId: 'java',
    topicId: 'java-collections',
    subjectName: 'Java Programming',
    topicName: 'Collections Framework',
    difficulty: 'Hard',
    questionText: 'What triggers a ConcurrentModificationException when iterating through a standard ArrayList with an iterator?',
    options: [
      'Reading an item that is currently null.',
      'Modifying the list structurally (add/remove) outside the iterator\'s own remove() method while iteration is in progress.',
      'Iterating backwards from index size-1 to 0.',
      'Accessing the list from two separate CPU cores simultaneously.'
    ],
    correctIndex: 1,
    explanation: 'Standard collection iterators are "fail-fast". They maintain an expectedModCount; if the collection\'s modCount differs (due to list.add or list.remove during loop), it immediately throws ConcurrentModificationException.',
    hint: 'Structural modifications outside the iterator.'
  },

  // --- JAVA: CONCURRENCY ---
  {
    id: 'j-con-1',
    subjectId: 'java',
    topicId: 'java-concurrency',
    subjectName: 'Java Programming',
    topicName: 'Multithreading & Concurrency',
    difficulty: 'Medium',
    questionText: 'What does the "volatile" keyword guarantee in Java multi-threaded execution?',
    options: [
      'It guarantees mutual exclusion and atomicity for compound operations like count++.',
      'It ensures visibility of changes across threads by reading/writing directly to main memory, preventing CPU cache staleness.',
      'It locks the entire class for 5 milliseconds.',
      'It forces the thread to sleep after reading the variable.'
    ],
    correctIndex: 1,
    explanation: 'volatile guarantees visibility and prevents instruction reordering (happens-before relationship), but it does NOT guarantee atomicity for non-atomic compound operations like count++ (read-modify-write).',
    hint: 'Visibility across CPU L1/L2 caches vs atomicity.'
  },
  {
    id: 'j-con-2',
    subjectId: 'java',
    topicId: 'java-concurrency',
    subjectName: 'Java Programming',
    topicName: 'Multithreading & Concurrency',
    difficulty: 'Hard',
    questionText: 'How does an AtomicInteger guarantee thread-safe incrementAndGet() without using traditional synchronized locks?',
    options: [
      'By using Hardware-level Compare-And-Swap (CAS) CPU instructions.',
      'By sleeping 1 nanosecond on collision.',
      'By pausing the entire JVM operating system process.',
      'By converting integer values to strings.'
    ],
    correctIndex: 0,
    explanation: 'AtomicInteger uses low-level CAS (Compare-And-Swap) operations provided by Unsafe / VarHandle. It checks if the current value matches the expected value; if true, it atomically swaps it; otherwise, it retries in a tight spin loop without thread context-switching overhead.',
    hint: 'Optimistic concurrency via hardware CAS.'
  },

  // --- JAVA: MEMORY & GC ---
  {
    id: 'j-mem-1',
    subjectId: 'java',
    topicId: 'java-memory',
    subjectName: 'Java Programming',
    topicName: 'Memory & Garbage Collection',
    difficulty: 'Hard',
    questionText: 'In the JVM generational memory model, what happens to objects that survive multiple Minor GC cycles in the Young Generation (Eden and Survivor spaces)?',
    options: [
      'They are immediately deallocated to free RAM.',
      'They are promoted to the Old (Tenured) Generation once they exceed the aging threshold.',
      'They are stored directly in the CPU L3 register.',
      'They are converted into static classes.'
    ],
    correctIndex: 1,
    explanation: 'Most Java objects are short-lived. Those that survive several scavenging cycles in Eden and Survivor spaces (incrementing their age counter up to MaxTenuringThreshold) are promoted into the Old/Tenured Generation, which is collected less frequently via Major/Full GC.',
    hint: 'Tenuring and generational promotion.'
  },

  // --- OPERATING SYSTEMS: SCHEDULING ---
  {
    id: 'os-sch-1',
    subjectId: 'os',
    topicId: 'os-scheduling',
    subjectName: 'Operating Systems',
    topicName: 'Process Scheduling',
    difficulty: 'Easy',
    questionText: 'Which CPU scheduling algorithm gives each process a small unit of CPU time (time quantum) and runs them in a circular queue?',
    options: [
      'Shortest Job First (SJF)',
      'First-Come, First-Served (FCFS)',
      'Round Robin (RR)',
      'Priority Scheduling without preemption'
    ],
    correctIndex: 2,
    explanation: 'Round Robin (RR) scheduling is designed for time-sharing systems. The CPU scheduler cycles through the ready queue, allocating a time quantum to each process before preempting it.',
    hint: 'Circular queue with fixed time slices.'
  },
  {
    id: 'os-sch-2',
    subjectId: 'os',
    topicId: 'os-scheduling',
    subjectName: 'Operating Systems',
    topicName: 'Process Scheduling',
    difficulty: 'Medium',
    questionText: 'What is the "Convoy Effect" in operating systems scheduling?',
    options: [
      'Many I/O-bound processes wait behind one long CPU-bound process in FCFS scheduling, causing poor CPU and device utilization.',
      'Processes moving together through memory in groups.',
      'When two processes exchange messages continuously across sockets.',
      'When the OS scheduler runs out of PID numbers.'
    ],
    correctIndex: 0,
    explanation: 'In First-Come, First-Served (FCFS), when a heavy CPU-burst process holds the CPU, lighter I/O-bound processes sit idle waiting behind it like a convoy of cars behind a slow truck.',
    hint: 'Heavy processes blocking fast processes in FCFS.'
  },

  // --- OPERATING SYSTEMS: SYNCHRONIZATION & DEADLOCK ---
  {
    id: 'os-syn-1',
    subjectId: 'os',
    topicId: 'os-sync-deadlock',
    subjectName: 'Operating Systems',
    topicName: 'Synchronization & Deadlocks',
    difficulty: 'Hard',
    questionText: 'Which four Coffman conditions must hold simultaneously for a deadlock to occur?',
    options: [
      'Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait',
      'CPU Scheduling, Paging, Swapping, Deadlock',
      'Read, Write, Execute, Append',
      'Process, Thread, Semaphore, Mutex'
    ],
    correctIndex: 0,
    explanation: 'Deadlock can occur if and only if all four Coffman conditions hold: 1) Mutual Exclusion, 2) Hold and Wait, 3) No Preemption, and 4) Circular Wait. Eliminating any one condition prevents deadlocks.',
    hint: 'The 4 fundamental Coffman conditions.'
  },
  {
    id: 'os-syn-2',
    subjectId: 'os',
    topicId: 'os-sync-deadlock',
    subjectName: 'Operating Systems',
    topicName: 'Synchronization & Deadlocks',
    difficulty: 'Hard',
    questionText: 'In Banker\'s Algorithm for deadlock avoidance, a state is considered "safe" if:',
    options: [
      'All processes have finished execution.',
      'There exists at least one sequence of process allocations that allows all processes to finish without entering a deadlock.',
      'Total available resources exceed total system memory.',
      'The CPU utilization is at 100%.'
    ],
    correctIndex: 1,
    explanation: 'A system is in a safe state if there exists a safe sequence <P1, P2, ... Pn> such that for each Pi, the resources that Pi can still request can be satisfied by current available resources plus resources held by all preceding processes.',
    hint: 'Existence of a safe execution sequence.'
  },

  // --- OPERATING SYSTEMS: PAGING & VIRTUAL MEMORY ---
  {
    id: 'os-pag-1',
    subjectId: 'os',
    topicId: 'os-paging',
    subjectName: 'Operating Systems',
    topicName: 'Memory Management & Paging',
    difficulty: 'Medium',
    questionText: 'What is the function of the Translation Lookaside Buffer (TLB)?',
    options: [
      'To store deleted files temporarily before permanent disk removal.',
      'A fast hardware cache of recent virtual-to-physical page address translations, avoiding main memory page table lookups.',
      'To compress executable binaries before swapping them.',
      'To manage network bandwidth for virtual machines.'
    ],
    correctIndex: 1,
    explanation: 'The TLB is a high-speed associative hardware cache. If a virtual page number is found in the TLB (TLB hit), the physical frame number is obtained in 1 CPU cycle, avoiding 2-4 memory accesses for multi-level page tables.',
    hint: 'Hardware cache for virtual memory address translations.'
  },
  {
    id: 'os-vmem-1',
    subjectId: 'os',
    topicId: 'os-virtual-mem',
    subjectName: 'Operating Systems',
    topicName: 'Virtual Memory & Page Replacement',
    difficulty: 'Medium',
    questionText: 'What is "Belady\'s Anomaly" in page replacement algorithms?',
    options: [
      'Increasing the number of page frames results in more page faults rather than fewer (commonly observed in FIFO).',
      'The operating system running out of disk swap space during peak load.',
      'When an algorithm runs in exponential time instead of linear time.',
      'Page faults decreasing to zero when memory is full.'
    ],
    correctIndex: 0,
    explanation: 'Belady\'s Anomaly is the counter-intuitive phenomenon where allocating more physical page frames causes the number of page faults to increase for certain access patterns under the First-In-First-Out (FIFO) algorithm.',
    hint: 'More frames causing more page faults in FIFO.'
  },
  {
    id: 'os-vmem-2',
    subjectId: 'os',
    topicId: 'os-virtual-mem',
    subjectName: 'Operating Systems',
    topicName: 'Virtual Memory & Page Replacement',
    difficulty: 'Hard',
    questionText: 'What is "Thrashing" in an operating system?',
    options: [
      'When a hard drive makes physical grinding noises.',
      'A state where the system spends more time servicing page faults and swapping pages than executing actual process instructions.',
      'Overclocking the CPU beyond temperature limits.',
      'Malicious malware overwriting system memory.'
    ],
    correctIndex: 1,
    explanation: 'Thrashing occurs when total working set sizes of active processes exceed available physical memory. The OS constantly swaps pages in and out, CPU utilization drops, scheduler brings in more processes, exacerbating the collapse.',
    hint: 'Page swapping dominating CPU execution time.'
  },

  // --- DBMS: SQL & NORMALIZATION ---
  {
    id: 'db-sql-1',
    subjectId: 'dbms',
    topicId: 'dbms-sql-joins',
    subjectName: 'Database Management Systems',
    topicName: 'SQL Queries & Joins',
    difficulty: 'Easy',
    questionText: 'Which SQL JOIN returns all records from the left table, and the matched records from the right table, filling with NULL when there is no match?',
    options: [
      'INNER JOIN',
      'LEFT (OUTER) JOIN',
      'RIGHT (OUTER) JOIN',
      'CROSS JOIN'
    ],
    correctIndex: 1,
    explanation: 'LEFT JOIN returns all rows from the left table even if there are no matches in the right table. For non-matching rows, right table columns contain NULL values.',
    hint: 'Preserves all left table rows.'
  },
  {
    id: 'db-norm-1',
    subjectId: 'dbms',
    topicId: 'dbms-normalization',
    subjectName: 'Database Management Systems',
    topicName: 'Normalization & Dependencies',
    difficulty: 'Hard',
    questionText: 'A relation R is in Third Normal Form (3NF) if it is in 2NF and for every functional dependency X -> A:',
    options: [
      'X is a superkey OR A is a prime attribute (part of a candidate key).',
      'X is always a foreign key.',
      'A depends transitively on the primary key.',
      'Every column is an integer datatype.'
    ],
    correctIndex: 0,
    explanation: '3NF eliminates transitive dependencies. Formally, for every non-trivial functional dependency X -> A, either X is a superkey, or A is a prime attribute. If X is strictly required to be a superkey in all cases, that is Boyce-Codd Normal Form (BCNF).',
    hint: 'Superkey condition or prime attribute condition.'
  },
  {
    id: 'db-norm-2',
    subjectId: 'dbms',
    topicId: 'dbms-normalization',
    subjectName: 'Database Management Systems',
    topicName: 'Normalization & Dependencies',
    difficulty: 'Hard',
    questionText: 'What is the crucial advantage that 3NF maintains over BCNF when decomposing a relational schema?',
    options: [
      '3NF always guarantees dependency preservation, whereas BCNF decomposition cannot always preserve all functional dependencies.',
      '3NF uses less storage space than BCNF.',
      '3NF queries execute without requiring any index.',
      '3NF supports unlimited multi-valued dependencies.'
    ],
    correctIndex: 0,
    explanation: 'While BCNF is stricter and completely eliminates redundancy based on functional dependencies, decomposing into BCNF may lose dependency preservation. 3NF always guarantees both lossless join decomposition and functional dependency preservation.',
    hint: 'Dependency preservation vs stricter redundancy elimination.'
  },

  // --- DBMS: ACID & INDEXING ---
  {
    id: 'db-acid-1',
    subjectId: 'dbms',
    topicId: 'dbms-acid',
    subjectName: 'Database Management Systems',
    topicName: 'Transactions & ACID Properties',
    difficulty: 'Medium',
    questionText: 'In the ACID transaction model, which isolation level prevents "Dirty Reads" but still permits "Non-Repeatable Reads"?',
    options: [
      'Read Uncommitted',
      'Read Committed',
      'Repeatable Read',
      'Serializable'
    ],
    correctIndex: 1,
    explanation: 'Read Committed ensures that transactions can only view data that has been committed by other transactions, preventing Dirty Reads. However, if row data changes and commits between two reads in the same transaction, a Non-Repeatable Read can occur.',
    hint: 'Only reads committed data, but subsequent reads may differ.'
  },
  {
    id: 'db-idx-1',
    subjectId: 'dbms',
    topicId: 'dbms-indexing',
    subjectName: 'Database Management Systems',
    topicName: 'Indexing & B-Trees',
    difficulty: 'Hard',
    questionText: 'Why do relational databases prefer B+ Trees over standard B-Trees for disk-based indexing?',
    options: [
      'In B+ Trees, all data records/pointers are stored exclusively in leaf nodes linked sequentially, making range scans and disk I/O much faster.',
      'B+ Trees require zero disk storage.',
      'B-Trees cannot store numeric values.',
      'B+ Trees only have a single root node with no child branches.'
    ],
    correctIndex: 0,
    explanation: 'In a B+ Tree, internal nodes store only routing keys (allowing higher fan-out and shallower tree depth), while leaf nodes hold all data pointers and are chained in a bidirectional linked list, enabling O(1) sequential range queries.',
    hint: 'Leaf node linked list and higher branching factor.'
  },

  // --- DSA: ARRAYS, TREES, GRAPHS ---
  {
    id: 'dsa-arr-1',
    subjectId: 'dsa',
    topicId: 'dsa-arrays-strings',
    subjectName: 'Data Structures & Algorithms',
    topicName: 'Arrays & Strings',
    difficulty: 'Easy',
    questionText: 'What is the time complexity of Kadane’s Algorithm for finding the Maximum Subarray Sum in an array of size n?',
    options: [
      'O(n^2)',
      'O(n)',
      'O(log n)',
      'O(n log n)'
    ],
    correctIndex: 1,
    explanation: 'Kadane’s algorithm computes the maximum subarray sum in a single linear pass (O(n) time and O(1) auxiliary space) by keeping track of the current maximum ending at each index.',
    hint: 'Single pass dynamic programming.'
  },
  {
    id: 'dsa-tree-1',
    subjectId: 'dsa',
    topicId: 'dsa-trees',
    subjectName: 'Data Structures & Algorithms',
    topicName: 'Binary Trees & BST',
    difficulty: 'Medium',
    questionText: 'What tree traversal on a Binary Search Tree (BST) visits nodes in strictly ascending sorted order?',
    options: [
      'Pre-order Traversal (Root, Left, Right)',
      'In-order Traversal (Left, Root, Right)',
      'Post-order Traversal (Left, Right, Root)',
      'Level-order Breadth-First Traversal'
    ],
    correctIndex: 1,
    explanation: 'In a BST, all nodes in the left subtree are smaller than the root, and all in the right subtree are larger. Visiting Left -> Root -> Right (In-order) naturally yields elements in sorted order.',
    hint: 'Left -> Current -> Right.'
  },
  {
    id: 'dsa-tree-2',
    subjectId: 'dsa',
    topicId: 'dsa-trees',
    subjectName: 'Data Structures & Algorithms',
    topicName: 'Binary Trees & BST',
    difficulty: 'Hard',
    questionText: 'What is the maximum balance factor allowed for any node in an AVL self-balancing binary search tree before a rotation is required?',
    options: [
      '0 only',
      '-1, 0, or +1',
      '-2 or +2',
      'No restriction as long as depth is even'
    ],
    correctIndex: 1,
    explanation: 'An AVL tree strictly requires that the heights of the two child subtrees of any node differ by at most 1 (balance factor in {-1, 0, +1}). If an insertion causes |BF| >= 2, single or double rotations restore balance in O(1) time.',
    hint: 'Height difference between left and right subtrees must not exceed 1.'
  },
  {
    id: 'dsa-graph-1',
    subjectId: 'dsa',
    topicId: 'dsa-graphs',
    subjectName: 'Data Structures & Algorithms',
    topicName: 'Graphs & Traversals',
    difficulty: 'Hard',
    questionText: 'What is Dijkstra’s algorithm\'s primary limitation regarding edge weights?',
    options: [
      'It cannot find the shortest path in undirected graphs.',
      'It may produce incorrect shortest path results if the graph contains negative weight edges.',
      'It cannot handle more than 10 vertices.',
      'It only works if all edge weights are identical powers of 2.'
    ],
    correctIndex: 1,
    explanation: 'Dijkstra’s algorithm assumes that once a vertex is marked visited, its minimum distance from the source is finalized. Negative edge weights violate this greedy invariant. The Bellman-Ford algorithm should be used when negative edges exist.',
    hint: 'Greedy assumption fails when weights can decrease.'
  },
  {
    id: 'dsa-graph-2',
    subjectId: 'dsa',
    topicId: 'dsa-graphs',
    subjectName: 'Data Structures & Algorithms',
    topicName: 'Graphs & Traversals',
    difficulty: 'Hard',
    questionText: 'Which graph algorithm can determine whether a directed graph contains a cycle and compute a valid topological ordering of tasks?',
    options: [
      'Kahn’s Algorithm (using in-degrees) or DFS with three-color cycle detection.',
      'Prim’s Minimal Spanning Tree algorithm.',
      'Floyd-Warshall all-pairs shortest path algorithm.',
      'Boyer-Moore voting algorithm.'
    ],
    correctIndex: 0,
    explanation: 'Topological sort requires a Directed Acyclic Graph (DAG). Kahn’s algorithm uses in-degrees to iteratively remove 0-in-degree nodes; if not all nodes are processed, a cycle exists. Alternatively, DFS with recursion stack tracking flags back-edges.',
    hint: 'In-degree queue processing or DFS back-edge detection.'
  }
];

export const LEARNING_MATERIALS: LearningMaterial[] = [
  {
    id: 'mat-java-oop',
    subjectId: 'java',
    topicId: 'java-oop',
    title: 'Core OOP: Mastering Polymorphism, Abstraction & Class Design',
    readingTimeMinutes: 8,
    summary: 'Explore encapsulation, abstract classes, runtime dynamic method dispatch, and interface design in modern Java 8+.',
    notes: [
      'Encapsulation bundles data and methods operating on that data, protecting state via private fields and getter/setter validation.',
      'Runtime polymorphism relies on virtual method invocation: the JVM invokes the method implementation matching the concrete instance in heap memory.',
      'Java 8 introduced default and static interface methods to enable library backward compatibility without breaking existing implementors.',
      'Favor composition over inheritance to avoid tight structural coupling and fragile base class antipatterns.'
    ],
    codeExamples: [
      {
        title: 'Dynamic Method Dispatch in Action',
        language: 'java',
        code: `// Interface with default fallback behavior
public interface PaymentGateway {
    void process(double amount);
    default void logTransaction(double amount) {
        System.out.println("Processing: $" + amount);
    }
}

public class StripeGateway implements PaymentGateway {
    @Override
    public void process(double amount) {
        logTransaction(amount);
        // Stripe API integration logic...
    }
}`,
        explanation: 'PaymentGateway provides contract abstraction while default methods allow optional hook extensions.'
      }
    ],
    keyTakeaways: [
      'Override equals() and hashCode() together when using objects in hash-based collections.',
      'Interfaces define capabilities ("what to do"), abstract classes provide shared state and partial skeletons ("how to do").'
    ],
    commonPitfalls: [
      'Violating the Liskov Substitution Principle (LSP) by throwing UnsupportedOperationException in subclasses.',
      'Confusing compile-time overloading with runtime overriding.'
    ],
    isCompleted: false
  },
  {
    id: 'mat-java-exc',
    subjectId: 'java',
    topicId: 'java-exceptions',
    title: 'Defensive Programming: Exception Handling & Resource Management',
    readingTimeMinutes: 10,
    summary: 'Deep dive into checked vs unchecked exceptions, try-with-resources internals, suppressed exceptions, and clean error handling.',
    notes: [
      'Checked exceptions extend Exception (excluding RuntimeException) and must be handled or declared. Use them for recoverable external conditions (network, disk).',
      'Unchecked exceptions extend RuntimeException. Use them for programmatic defects (NullPointer, IllegalArgument) where caller cannot gracefully recover.',
      'Try-with-resources handles closing of AutoCloseable objects safely, even when an exception is thrown in the try block.',
      'Never swallow exceptions with an empty catch block or generic catch(Exception e) without logging the stack trace.'
    ],
    codeExamples: [
      {
        title: 'Safe Resource Handling with Try-with-Resources',
        language: 'java',
        code: `public String readFirstLine(Path path) throws IOException {
    // Both reader and stream are closed automatically in reverse order
    try (BufferedReader reader = Files.newBufferedReader(path, StandardCharsets.UTF_8)) {
        return reader.readLine();
    }
    // No finally block needed! Closes cleanly even if readLine() throws.
}`,
        explanation: 'The JVM inserts bytecode ensuring reader.close() is executed, attaching secondary close errors as suppressed exceptions.'
      }
    ],
    keyTakeaways: [
      'Always catch the most specific exception first before broader parent classes.',
      'Preserve the cause when wrapping exceptions: new CustomException("Failed", cause).'
    ],
    commonPitfalls: [
      'Returning a value from a finally block: this clobbers any thrown exceptions silently!',
      'Catching java.lang.Throwable or java.lang.Error which may mask fatal OutOfMemoryErrors.'
    ],
    isCompleted: false
  },
  {
    id: 'mat-dbms-norm',
    subjectId: 'dbms',
    topicId: 'dbms-normalization',
    title: 'Relational Schema Design: Functional Dependencies & Normalization (1NF to BCNF)',
    readingTimeMinutes: 12,
    summary: 'Understand normalization anomalies, Boyce-Codd Normal Form requirements, and how to eliminate update/insertion/deletion anomalies.',
    notes: [
      '1NF: Attributes must be atomic; no repeating groups or nested arrays.',
      '2NF: Must be in 1NF and have NO partial dependencies (non-prime attributes must depend on the whole candidate key, not a proper subset).',
      '3NF: Must be in 2NF and have NO transitive dependencies (non-prime attributes must not depend on other non-prime attributes).',
      'BCNF: For every functional dependency X -> Y, X must be a superkey.',
      '3NF always preserves functional dependencies; BCNF eliminates all FD redundancy but may lose dependency preservation during decomposition.'
    ],
    codeExamples: [
      {
        title: 'Detecting Transitive Dependency',
        language: 'sql',
        code: `-- Unnormalized Table (Violates 3NF due to transitive dependency)
-- StudentID -> DepartmentID -> DepartmentHead
CREATE TABLE StudentUnnormalized (
    student_id INT PRIMARY KEY,
    name VARCHAR(100),
    dept_id INT,
    dept_head VARCHAR(100) -- Transitive dependency!
);

-- Decomposed 3NF Schemas
CREATE TABLE Departments (
    dept_id INT PRIMARY KEY,
    dept_name VARCHAR(100),
    dept_head VARCHAR(100)
);

CREATE TABLE Students (
    student_id INT PRIMARY KEY,
    name VARCHAR(100),
    dept_id INT REFERENCES Departments(dept_id)
);`,
        explanation: 'Decomposing into two tables removes update anomalies when a department head changes.'
      }
    ],
    keyTakeaways: [
      'Anomalies occur when real-world entities are bundled into a single relational table.',
      'Lossless join decomposition ensures table reconstruction via NATURAL JOIN without spurious tuples.'
    ],
    commonPitfalls: [
      'Premature over-normalization resulting in excessive 10-table joins for simple read queries; OLAP systems often denormalize for performance.',
      'Assuming 3NF and BCNF are identical.'
    ],
    isCompleted: false
  },
  {
    id: 'mat-os-sync',
    subjectId: 'os',
    topicId: 'os-sync-deadlock',
    title: 'Process Synchronization, Semaphores & Deadlock Avoidance',
    readingTimeMinutes: 11,
    summary: 'Mastering critical sections, Peterson’s solution, counting vs binary semaphores, and Banker’s algorithm.',
    notes: [
      'Critical Section Problem requires three conditions: Mutual Exclusion, Progress, and Bounded Waiting.',
      'A Semaphore is an integer synchronization variable accessed through two atomic primitives: wait() (P) and signal() (V).',
      'Binary Semaphores act as Mutexes (0 or 1); Counting Semaphores manage resource pools with finite instances.',
      'Banker’s Algorithm tests safety by simulating allocation of maximum possible resources, verifying that a safe sequence exists.'
    ],
    codeExamples: [
      {
        title: 'Producer-Consumer Synchronization with Semaphores',
        language: 'c',
        code: `semaphore mutex = 1; // Mutual exclusion for shared buffer
semaphore empty = N; // Counts empty slots in buffer
semaphore full = 0;  // Counts filled slots

void producer() {
    while (true) {
        item = produce_item();
        wait(empty);
        wait(mutex);
        insert_item(item);
        signal(mutex);
        signal(full);
    }
}`,
        explanation: 'Using distinct semaphores prevents buffer underflow/overflow and protects buffer access.'
      }
    ],
    keyTakeaways: [
      'Never swap wait(empty) and wait(mutex) in producer code; swapping leads to immediate deadlock if the buffer is full!',
      'Breaking the "Circular Wait" condition by enforcing a global ordering on resource acquisition prevents deadlocks.'
    ],
    commonPitfalls: [
      'Busy waiting / spinlocks wasting CPU cycles on single-core architectures.',
      'Priority Inversion: when a low-priority task holds a resource needed by a high-priority task, while a medium task monopolizes CPU.'
    ],
    isCompleted: false
  },
  {
    id: 'mat-dsa-trees',
    subjectId: 'dsa',
    topicId: 'dsa-trees',
    title: 'Binary Search Trees & Height-Balanced AVL Trees',
    readingTimeMinutes: 9,
    summary: 'Tree properties, recursive traversals, BST search/insertion, and AVL self-balancing rotations.',
    notes: [
      'BST Property: For any node X, all keys in left subtree are strictly < X.key, and all in right subtree are strictly > X.key.',
      'Unbalanced BST worst-case time complexity degrades to O(n) (skewed linked list) for sorted inputs.',
      'AVL Trees maintain balance factor (Height(Left) - Height(Right)) in {-1, 0, +1}, ensuring strict O(log n) height.',
      'Four AVL Rotation cases: Left-Left (Right rotation), Right-Right (Left rotation), Left-Right (Double rotation), and Right-Left (Double rotation).'
    ],
    codeExamples: [
      {
        title: 'Right Rotation in an AVL Tree',
        language: 'java',
        code: `Node rightRotate(Node y) {
    Node x = y.left;
    Node T2 = x.right;

    // Perform rotation
    x.right = y;
    y.left = T2;

    // Update heights
    y.height = Math.max(height(y.left), height(y.right)) + 1;
    x.height = Math.max(height(x.left), height(x.right)) + 1;

    // Return new root
    return x;
}`,
        explanation: 'A single right rotation restores balance when a node’s left child becomes too heavy.'
      }
    ],
    keyTakeaways: [
      'In-order traversal of a valid BST yields sorted order in O(n) time.',
      'Red-Black Trees require fewer rotations during writes than AVL trees, making them preferred in Java TreeMap / C++ std::map.'
    ],
    commonPitfalls: [
      'Forgetting to update subtree heights after pointer re-assignments in AVL rotations.',
      'Failing to handle node deletion with two children (must replace with in-order successor or predecessor).'
    ],
    isCompleted: false
  }
];
