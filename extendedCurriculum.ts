import { Topic, Question } from '../types';

export const ADDITIONAL_JAVA_TOPICS: Topic[] = [
  { id: 'java-generics', subjectId: 'java', name: 'Generics & Type Erasure', description: 'Type parameters, wildcards (? extends T), bounded types, and runtime type erasure', difficulty: 'Medium', conceptsCount: 6, questionsCount: 5 },
  { id: 'java-lambdas', subjectId: 'java', name: 'Lambda Expressions & Functional Interfaces', description: 'Functional interfaces, SAM pattern, Predicate, Function, Supplier, and method references', difficulty: 'Easy', conceptsCount: 5, questionsCount: 5 },
  { id: 'java-streams', subjectId: 'java', name: 'Stream API & Parallel Processing', description: 'Intermediate vs terminal operations, Collectors, map/filter/reduce, and parallel streams', difficulty: 'Medium', conceptsCount: 7, questionsCount: 5 },
  { id: 'java-reflection', subjectId: 'java', name: 'Java Reflection & Annotations', description: 'Runtime metadata inspection, Class<T>, dynamic method invocation, and custom annotations', difficulty: 'Hard', conceptsCount: 5, questionsCount: 5 },
  { id: 'java-loom', subjectId: 'java', name: 'Virtual Threads & Project Loom', description: 'Lightweight user-mode threads, continuation stacks, carrier thread pooling, and scalability', difficulty: 'Hard', conceptsCount: 6, questionsCount: 5 },
  { id: 'java-records', subjectId: 'java', name: 'Records & Sealed Classes', description: 'Immutable data carriers, compact constructors, sealed hierarchies, and permits clauses', difficulty: 'Easy', conceptsCount: 5, questionsCount: 5 },
  { id: 'java-patterns', subjectId: 'java', name: 'Pattern Matching & Modern Switch', description: 'Instanceof pattern matching, guarded patterns (when clauses), and exhaustive switch expressions', difficulty: 'Medium', conceptsCount: 5, questionsCount: 5 },
  { id: 'java-modules', subjectId: 'java', name: 'Java Platform Module System (JPMS)', description: 'Module-info.java declarations, requires transitive, exports, opens, and jlink runtime creation', difficulty: 'Hard', conceptsCount: 5, questionsCount: 5 },
  { id: 'java-jmm', subjectId: 'java', name: 'JVM Memory Model & Happens-Before', description: 'Instruction reordering, memory barriers, volatile read/write semantics, and thread visibility', difficulty: 'Hard', conceptsCount: 6, questionsCount: 5 },
  { id: 'java-gc-tuning', subjectId: 'java', name: 'Garbage Collection Tuning & Latency', description: 'G1GC regions, ZGC colored pointers, Shenandoah concurrent evacuation, and JVM flags', difficulty: 'Hard', conceptsCount: 6, questionsCount: 5 },
  { id: 'java-nio', subjectId: 'java', name: 'File I/O & NIO.2 Channels', description: 'Path, Files, ByteBuffer allocation, Non-blocking Channels, and asynchronous Selectors', difficulty: 'Medium', conceptsCount: 5, questionsCount: 5 },
  { id: 'java-http', subjectId: 'java', name: 'Modern HTTP Client & WebSockets', description: 'HttpClient API, asynchronous CompletableFuture responses, HTTP/2 push, and WebSocket handshakes', difficulty: 'Medium', conceptsCount: 5, questionsCount: 5 },
  { id: 'java-jdbc', subjectId: 'java', name: 'JDBC & Connection Pooling', description: 'PreparedStatements, transactions, batch updates, and HikariCP connection pool mechanics', difficulty: 'Easy', conceptsCount: 5, questionsCount: 5 },
  { id: 'java-jpa', subjectId: 'java', name: 'JPA & Hibernate ORM', description: 'Entity states (transient/managed/detached), N+1 query problem, second-level cache, and JPQL', difficulty: 'Hard', conceptsCount: 6, questionsCount: 5 },
  { id: 'java-spring-ioc', subjectId: 'java', name: 'Spring Framework Core & IoC', description: 'Inversion of Control container, @Component scanning, Bean scopes, and lifecycle callbacks', difficulty: 'Medium', conceptsCount: 6, questionsCount: 5 },
  { id: 'java-spring-rest', subjectId: 'java', name: 'Spring Boot REST Architecture', description: 'Controller endpoints, @RestControllerAdvice, validation (@Valid), and Actuator endpoints', difficulty: 'Medium', conceptsCount: 5, questionsCount: 5 },
  { id: 'java-testing', subjectId: 'java', name: 'Testing with JUnit 5 & Mockito', description: 'Assertions, @ParameterizedTest, @Mock, @InjectMocks, stubbing, and verification', difficulty: 'Easy', conceptsCount: 5, questionsCount: 5 },
  { id: 'java-security', subjectId: 'java', name: 'Java Security Architecture', description: 'Custom ClassLoaders, bytecode verification, SecurityManager policies, and Cryptography (JCA/JCE)', difficulty: 'Hard', conceptsCount: 5, questionsCount: 5 },
  { id: 'java-serialization', subjectId: 'java', name: 'Serialization & Jackson JSON', description: 'Serializable interface, serialVersionUID, transient fields, and Jackson ObjectMapper tuning', difficulty: 'Medium', conceptsCount: 5, questionsCount: 5 },
  { id: 'java-completable-future', subjectId: 'java', name: 'CompletableFuture & Async Pipelines', description: 'Asynchronous task composition, thenApply, thenCompose, exceptional handling, and timeouts', difficulty: 'Hard', conceptsCount: 6, questionsCount: 5 },
  { id: 'java-forkjoin', subjectId: 'java', name: 'Fork/Join Framework & Work-Stealing', description: 'RecursiveTask, RecursiveAction, ForkJoinPool, work-stealing deques, and divide-and-conquer', difficulty: 'Hard', conceptsCount: 5, questionsCount: 5 },
  { id: 'java-jmh', subjectId: 'java', name: 'Microbenchmarking with JMH', description: 'Java Microbenchmark Harness, dead-code elimination, loop unrolling, and jitter profiling', difficulty: 'Hard', conceptsCount: 4, questionsCount: 5 }
];

export const ADDITIONAL_OS_TOPICS: Topic[] = [
  { id: 'os-pcb', subjectId: 'os', name: 'Process Control Block & Context Switch', description: 'PCB structure, CPU register states, context switch overhead, and process state queues', difficulty: 'Easy', conceptsCount: 5, questionsCount: 5 },
  { id: 'os-ipc', subjectId: 'os', name: 'Inter-Process Communication (IPC)', description: 'Anonymous pipes, named FIFOs, shared memory segments, and POSIX message queues', difficulty: 'Medium', conceptsCount: 6, questionsCount: 5 },
  { id: 'os-threads', subjectId: 'os', name: 'Threading Models & POSIX Threads', description: 'User-level threads vs kernel-level threads, Many-to-One vs One-to-One, and clone syscall', difficulty: 'Medium', conceptsCount: 5, questionsCount: 5 },
  { id: 'os-sync-classical', subjectId: 'os', name: 'Classical Synchronization Problems', description: 'Dining Philosophers, Readers-Writers with starvation avoidance, and Producer-Consumer buffers', difficulty: 'Hard', conceptsCount: 6, questionsCount: 5 },
  { id: 'os-hw-sync', subjectId: 'os', name: 'Hardware Synchronization Primitives', description: 'Test-and-Set, Compare-and-Swap (CAS), Fetch-and-Add, atomic instructions, and spinlocks', difficulty: 'Hard', conceptsCount: 5, questionsCount: 5 },
  { id: 'os-deadlock-detect', subjectId: 'os', name: 'Deadlock Detection & Recovery', description: 'Wait-for graphs, cycle detection algorithms, process termination, and rollback strategies', difficulty: 'Medium', conceptsCount: 5, questionsCount: 5 },
  { id: 'os-segmentation', subjectId: 'os', name: 'Segmentation & Address Translation', description: 'Segment tables, base and limit registers, segmentation faults, and external fragmentation', difficulty: 'Medium', conceptsCount: 5, questionsCount: 5 },
  { id: 'os-thrashing', subjectId: 'os', name: 'Thrashing & Working Set Model', description: 'Page fault frequency, working set window delta, locality of reference, and prepaging', difficulty: 'Hard', conceptsCount: 5, questionsCount: 5 },
  { id: 'os-tlb', subjectId: 'os', name: 'Translation Lookaside Buffer (TLB)', description: 'TLB hit/miss penalties, effective memory access time, TLB shootdown, and address-space IDs', difficulty: 'Hard', conceptsCount: 5, questionsCount: 5 },
  { id: 'os-inverted-page', subjectId: 'os', name: 'Multi-Level & Inverted Page Tables', description: 'Hierarchical page tables, address translation formulas, inverted tables, and hashing', difficulty: 'Hard', conceptsCount: 6, questionsCount: 5 },
  { id: 'os-kernels', subjectId: 'os', name: 'Kernel Architectures & Design', description: 'Monolithic vs Microkernels (Mach/seL4), Hybrid kernels, and Exokernels', difficulty: 'Easy', conceptsCount: 5, questionsCount: 5 },
  { id: 'os-syscalls', subjectId: 'os', name: 'System Calls & Protection Rings', description: 'CPU privilege levels (Ring 0 vs 3), software interrupts, SYSCALL/SYSRET, and trap handlers', difficulty: 'Medium', conceptsCount: 5, questionsCount: 5 },
  { id: 'os-disk-scheduling', subjectId: 'os', name: 'Disk Head Scheduling Algorithms', description: 'SSTF, SCAN (Elevator), C-SCAN, LOOK, and C-LOOK seek-time optimizations', difficulty: 'Easy', conceptsCount: 5, questionsCount: 5 },
  { id: 'os-raid', subjectId: 'os', name: 'RAID Storage & Reliability', description: 'RAID 0, 1, 5, 6, 10 architectures, striping, mirroring, Hamming codes, and parity calculations', difficulty: 'Medium', conceptsCount: 5, questionsCount: 5 },
  { id: 'os-ext4', subjectId: 'os', name: 'File System Internals & ext4', description: 'Inodes, directory entries, extents, superblock redundancy, and write-ahead journaling modes', difficulty: 'Hard', conceptsCount: 6, questionsCount: 5 },
  { id: 'os-free-space', subjectId: 'os', name: 'Free Space Management & Allocators', description: 'Bitmaps, linked list free chains, buddy systems, and slab allocator internals', difficulty: 'Medium', conceptsCount: 5, questionsCount: 5 },
  { id: 'os-dma', subjectId: 'os', name: 'I/O Hardware & Direct Memory Access', description: 'Polling vs interrupt-driven I/O, DMA controllers, cycle stealing, and scatter-gather lists', difficulty: 'Medium', conceptsCount: 5, questionsCount: 5 },
  { id: 'os-rtos', subjectId: 'os', name: 'Real-Time Operating Systems (RTOS)', description: 'Hard vs soft real-time constraints, Rate Monotonic Scheduling (RMS), and priority inversion', difficulty: 'Hard', conceptsCount: 5, questionsCount: 5 },
  { id: 'os-security', subjectId: 'os', name: 'OS Protection & Access Control', description: 'Access matrices, Access Control Lists (ACL), capability lists, and mandatory access control', difficulty: 'Medium', conceptsCount: 5, questionsCount: 5 },
  { id: 'os-virtualization', subjectId: 'os', name: 'Hypervisors & Containerization', description: 'Type 1 vs Type 2 hypervisors, hardware virtualization (VT-x), Linux namespaces, and cgroups', difficulty: 'Hard', conceptsCount: 6, questionsCount: 5 },
  { id: 'os-cow', subjectId: 'os', name: 'Copy-on-Write (COW) & mmap', description: 'Memory-mapped files, fork() page duplication delay, write-fault trapping, and dirty tracking', difficulty: 'Medium', conceptsCount: 5, questionsCount: 5 },
  { id: 'os-distributed', subjectId: 'os', name: 'Distributed OS & Clock Synchronization', description: 'Lamport logical clocks, vector timestamps, Chandy-Lamport global snapshots, and consensus', difficulty: 'Hard', conceptsCount: 6, questionsCount: 5 }
];

export const ADDITIONAL_DBMS_TOPICS: Topic[] = [
  { id: 'dbms-er-modeling', subjectId: 'dbms', name: 'Entity-Relationship Modeling', description: 'Entities, attributes, relationships, cardinalities, weak entity sets, and ER-to-relational mapping', difficulty: 'Easy', conceptsCount: 5, questionsCount: 5 },
  { id: 'dbms-extended-er', subjectId: 'dbms', name: 'Enhanced ER & Specialization', description: 'Specialization, generalization, attribute inheritance, disjoint vs overlapping constraints', difficulty: 'Medium', conceptsCount: 5, questionsCount: 5 },
  { id: 'dbms-rel-algebra', subjectId: 'dbms', name: 'Relational Algebra & Calculus', description: 'Select, project, cartesian product, theta join, natural join, division, and tuple relational calculus', difficulty: 'Hard', conceptsCount: 6, questionsCount: 5 },
  { id: 'dbms-sql-commands', subjectId: 'dbms', name: 'SQL Command Categories (DDL/DML/DCL/TCL)', description: 'CREATE/ALTER vs INSERT/UPDATE, GRANT/REVOKE, COMMIT/ROLLBACK/SAVEPOINT, and TRUNCATE', difficulty: 'Easy', conceptsCount: 5, questionsCount: 5 },
  { id: 'dbms-window-fns', subjectId: 'dbms', name: 'SQL Window Functions & CTEs', description: 'OVER (PARTITION BY ... ORDER BY), ROW_NUMBER, RANK, DENSE_RANK, LEAD/LAG, and recursive CTEs', difficulty: 'Medium', conceptsCount: 6, questionsCount: 5 },
  { id: 'dbms-adv-joins', subjectId: 'dbms', name: 'Advanced Joins & Set Operations', description: 'CROSS JOIN, NATURAL JOIN, UNION, UNION ALL, INTERSECT, EXCEPT, and lateral joins', difficulty: 'Medium', conceptsCount: 5, questionsCount: 5 },
  { id: 'dbms-stored-procs', subjectId: 'dbms', name: 'Stored Procedures, Functions & Triggers', description: 'PL/SQL control structures, cursor loops, IN/OUT parameters, BEFORE/AFTER triggers, and auditing', difficulty: 'Medium', conceptsCount: 5, questionsCount: 5 },
  { id: 'dbms-higher-normal', subjectId: 'dbms', name: 'Higher Normal Forms (4NF & 5NF)', description: 'Multivalued dependencies (MVD), 4NF decomposition, join dependencies, and 5NF (Project-Join Normal Form)', difficulty: 'Hard', conceptsCount: 6, questionsCount: 5 },
  { id: 'dbms-keys', subjectId: 'dbms', name: 'Relational Keys & Referential Integrity', description: 'Super keys, candidate keys, primary keys, surrogate keys, and CASCADE delete rules', difficulty: 'Easy', conceptsCount: 5, questionsCount: 5 },
  { id: 'dbms-hash-bitmap', subjectId: 'dbms', name: 'Hash & Bitmap Indexing', description: 'Static vs extensible hashing, directory doubling, bitmap vectors, and fast low-cardinality filtering', difficulty: 'Hard', conceptsCount: 5, questionsCount: 5 },
  { id: 'dbms-query-opt', subjectId: 'dbms', name: 'Query Optimization & Cost Estimation', description: 'Relational algebra equivalence rules, selection pushdown, join order dynamic programming, and catalog stats', difficulty: 'Hard', conceptsCount: 6, questionsCount: 5 },
  { id: 'dbms-views', subjectId: 'dbms', name: 'Views & Materialized Views', description: 'Virtual view inlining, query modification, materialized view log refresh, and query rewrite engines', difficulty: 'Medium', conceptsCount: 5, questionsCount: 5 },
  { id: 'dbms-isolation-anomalies', subjectId: 'dbms', name: 'Transaction Isolation Anomalies', description: 'Dirty reads, non-repeatable reads, phantom reads, write skew, and ANSI SQL isolation levels', difficulty: 'Hard', conceptsCount: 6, questionsCount: 5 },
  { id: 'dbms-aries', subjectId: 'dbms', name: 'ARIES Recovery Algorithm & WAL', description: 'Write-Ahead Logging protocol, Analysis pass, Redo (repeating history), Undo pass, and CLRs', difficulty: 'Hard', conceptsCount: 6, questionsCount: 5 },
  { id: 'dbms-mvcc', subjectId: 'dbms', name: 'Multi-Version Concurrency Control (MVCC)', description: 'Snapshot isolation, tuple header xmin/xmax timestamps, non-blocking reads, and vacuuming', difficulty: 'Hard', conceptsCount: 6, questionsCount: 5 },
  { id: 'dbms-two-phase-commit', subjectId: 'dbms', name: 'Distributed Transactions & 2PC', description: 'Two-Phase Commit protocol (Prepare & Commit phases), coordinator failure handling, and 3PC', difficulty: 'Hard', conceptsCount: 6, questionsCount: 5 },
  { id: 'dbms-nosql-doc', subjectId: 'dbms', name: 'Document Stores & MongoDB Architecture', description: 'BSON format, document embedding vs referencing, replica set election, and oplog replication', difficulty: 'Medium', conceptsCount: 5, questionsCount: 5 },
  { id: 'dbms-nosql-column', subjectId: 'dbms', name: 'Wide-Column Stores & Apache Cassandra', description: 'SSTables, Memtables, CommitLog, Bloom filters, row keys vs clustering keys, and tunable consistency', difficulty: 'Hard', conceptsCount: 6, questionsCount: 5 },
  { id: 'dbms-nosql-kv', subjectId: 'dbms', name: 'Key-Value Stores & In-Memory Engines', description: 'Redis data types (strings, hashes, sorted sets, streams), RDB vs AOF persistence, and Sentinel', difficulty: 'Easy', conceptsCount: 5, questionsCount: 5 },
  { id: 'dbms-graph-db', subjectId: 'dbms', name: 'Graph Databases & Cypher Queries', description: 'Property graph model, index-free adjacency, node traversal efficiency, and Cypher MATCH queries', difficulty: 'Medium', conceptsCount: 5, questionsCount: 5 },
  { id: 'dbms-partitioning', subjectId: 'dbms', name: 'Table Partitioning & Sharding', description: 'Horizontal vs vertical partitioning, range/list/hash strategies, and consistent hashing rings', difficulty: 'Hard', conceptsCount: 5, questionsCount: 5 },
  { id: 'dbms-security-sqli', subjectId: 'dbms', name: 'Database Security & SQL Injection Defense', description: 'SQL injection attack vectors, parameterized statements, principle of least privilege, and role-based access', difficulty: 'Easy', conceptsCount: 5, questionsCount: 5 }
];

export const ADDITIONAL_DSA_TOPICS: Topic[] = [
  { id: 'dsa-asymptotics', subjectId: 'dsa', name: 'Asymptotic Analysis & Master Theorem', description: 'Big-O, Omega, Theta definitions, amortized cost, and solving recurrence relations via Master Theorem', difficulty: 'Medium', conceptsCount: 6, questionsCount: 5 },
  { id: 'dsa-hash-tables', subjectId: 'dsa', name: 'Hash Tables & Collision Resolution', description: 'Separate chaining, open addressing (linear, quadratic, double hashing), load factors, and rehashing', difficulty: 'Medium', conceptsCount: 5, questionsCount: 5 },
  { id: 'dsa-dsu', subjectId: 'dsa', name: 'Disjoint Set Union (Union-Find)', description: 'Find with path compression, Union by rank/size, inverse Ackermann time complexity, and cycle detection', difficulty: 'Medium', conceptsCount: 5, questionsCount: 5 },
  { id: 'dsa-heaps', subjectId: 'dsa', name: 'Heaps & Priority Queues', description: 'Binary heap array representation, Min/Max Heapify in O(N), push/pop in O(log N), and HeapSort', difficulty: 'Medium', conceptsCount: 5, questionsCount: 5 },
  { id: 'dsa-red-black', subjectId: 'dsa', name: 'Self-Balancing Trees (Red-Black & Splay)', description: 'Red-black invariant rules, left/right tree rotations, recoloring cases, and Splay tree splaying', difficulty: 'Hard', conceptsCount: 6, questionsCount: 5 },
  { id: 'dsa-trie', subjectId: 'dsa', name: 'Trie (Prefix Tree) & Radix Trees', description: 'Trie node representation, insert, search, prefix matching, memory footprint, and compressed radix trees', difficulty: 'Medium', conceptsCount: 5, questionsCount: 5 },
  { id: 'dsa-segment-tree', subjectId: 'dsa', name: 'Segment Trees & Range Queries', description: 'Range sum/min queries, point updates, tree construction in O(N), and lazy propagation for range updates', difficulty: 'Hard', conceptsCount: 6, questionsCount: 5 },
  { id: 'dsa-fenwick', subjectId: 'dsa', name: 'Fenwick Tree (Binary Indexed Tree)', description: 'Lowbit operation (x & -x), prefix sums in O(log N), point updates, and space-efficient 1D/2D arrays', difficulty: 'Hard', conceptsCount: 5, questionsCount: 5 },
  { id: 'dsa-divide-conquer', subjectId: 'dsa', name: 'Divide & Conquer Analysis', description: 'Merge Sort, Quick Sort (Lomuto vs Hoare partitioning), QuickSelect in O(N), and stability guarantees', difficulty: 'Easy', conceptsCount: 5, questionsCount: 5 },
  { id: 'dsa-dp-knapsack', subjectId: 'dsa', name: 'Dynamic Programming: Knapsack & Subsets', description: '0/1 Knapsack, Unbounded Knapsack, Subset Sum, Coin Change, and space optimization techniques', difficulty: 'Medium', conceptsCount: 6, questionsCount: 5 },
  { id: 'dsa-dp-advanced', subjectId: 'dsa', name: 'Advanced Dynamic Programming', description: 'Longest Common Subsequence (LCS), Matrix Chain Multiplication, Digit DP, and Bitmask DP', difficulty: 'Hard', conceptsCount: 6, questionsCount: 5 },
  { id: 'dsa-greedy', subjectId: 'dsa', name: 'Greedy Algorithms & Proofs', description: 'Greedy-choice property, optimal substructure, Huffman coding, and Fractional Knapsack', difficulty: 'Medium', conceptsCount: 5, questionsCount: 5 },
  { id: 'dsa-mst', subjectId: 'dsa', name: 'Minimum Spanning Tree (Kruskal & Prim)', description: 'Cut property, Kruskal’s algorithm using DSU, Prim’s algorithm using priority queues, and dense graphs', difficulty: 'Hard', conceptsCount: 5, questionsCount: 5 },
  { id: 'dsa-shortest-paths', subjectId: 'dsa', name: 'Advanced Shortest Paths (Bellman-Ford & Floyd)', description: 'Bellman-Ford with negative edge weight detection, and Floyd-Warshall all-pairs shortest paths in O(V^3)', difficulty: 'Hard', conceptsCount: 6, questionsCount: 5 },
  { id: 'dsa-network-flow', subjectId: 'dsa', name: 'Network Flow & Ford-Fulkerson', description: 'Residual graphs, augmenting paths, Edmonds-Karp BFS implementation, and Max-Flow Min-Cut theorem', difficulty: 'Hard', conceptsCount: 6, questionsCount: 5 },
  { id: 'dsa-string-matching', subjectId: 'dsa', name: 'String Matching (KMP & Rabin-Karp)', description: 'Knuth-Morris-Pratt longest proper prefix-suffix array (LPS), and Rabin-Karp polynomial rolling hash', difficulty: 'Hard', conceptsCount: 6, questionsCount: 5 },
  { id: 'dsa-backtracking', subjectId: 'dsa', name: 'Backtracking & Pruning Paradigms', description: 'State-space tree exploration, N-Queens problem, Sudoku solver, and branch pruning strategies', difficulty: 'Medium', conceptsCount: 5, questionsCount: 5 },
  { id: 'dsa-topo-sort', subjectId: 'dsa', name: 'Topological Sort & DAG Cycle Detection', description: 'Kahn’s algorithm using indegree queues, DFS finishing times, and prerequisite resolution', difficulty: 'Medium', conceptsCount: 5, questionsCount: 5 },
  { id: 'dsa-b-trees', subjectId: 'dsa', name: 'B-Trees & B+ Trees', description: 'Order M search trees, node splitting and borrowing, range scans, and cache-conscious tree nodes', difficulty: 'Hard', conceptsCount: 5, questionsCount: 5 },
  { id: 'dsa-spatial', subjectId: 'dsa', name: 'Spatial Structures: KD-Trees & QuadTrees', description: 'Multi-dimensional point partitioning, nearest neighbor search pruning, and 2D bounding boxes', difficulty: 'Hard', conceptsCount: 5, questionsCount: 5 },
  { id: 'dsa-geometric', subjectId: 'dsa', name: 'Computational Geometry & Convex Hull', description: '2D Cross product orientation test, Graham scan algorithm for Convex Hull, and intersection tests', difficulty: 'Hard', conceptsCount: 5, questionsCount: 5 },
  { id: 'dsa-randomized', subjectId: 'dsa', name: 'Randomized Algorithms & Skip Lists', description: 'Skip Lists probabilistic level assignment, randomized QuickSelect, and Monte Carlo vs Las Vegas guarantees', difficulty: 'Hard', conceptsCount: 5, questionsCount: 5 }
];

export const EXTENDED_QUESTIONS: Question[] = [
  // Java Generics
  {
    id: 'ext-j-gen-1',
    subjectId: 'java',
    topicId: 'java-generics',
    subjectName: 'Java Programming',
    topicName: 'Generics & Type Erasure',
    difficulty: 'Medium',
    questionText: 'What happens to generic type parameters like `List<String>` after Java source code is compiled by javac?',
    options: [
      'The generic types are stored as metadata and checked by the CPU at execution time.',
      'Type erasure replaces unbound type parameters with Object (or their bound) and inserts necessary casts.',
      'A new class bytecode file is generated for every unique concrete type parameter (like C++ templates).',
      'The types remain unchanged and dynamic dispatch verifies the types on each method call.'
    ],
    correctIndex: 1,
    explanation: 'Java uses Type Erasure for backwards compatibility with pre-generics code. Generic type parameters are stripped at compile time, replaced with Object (or their bound), and explicit casts are inserted where needed.',
    hint: 'Think about Java 1.4 backwards compatibility.'
  },
  // Java Streams
  {
    id: 'ext-j-str-1',
    subjectId: 'java',
    topicId: 'java-streams',
    subjectName: 'Java Programming',
    topicName: 'Stream API & Parallel Processing',
    difficulty: 'Medium',
    questionText: 'Which of the following operations in the Java Stream API is classified as a "terminal" operation?',
    options: [
      'filter(Predicate<T>)',
      'map(Function<T, R>)',
      'peek(Consumer<T>)',
      'reduce(BinaryOperator<T>)'
    ],
    correctIndex: 3,
    explanation: 'reduce() is a terminal operation that triggers stream pipeline traversal and produces a final single result or Optional. filter, map, and peek are lazy intermediate operations.',
    hint: 'Terminal operations trigger stream evaluation.'
  },
  // OS PCB
  {
    id: 'ext-os-pcb-1',
    subjectId: 'os',
    topicId: 'os-pcb',
    subjectName: 'Operating Systems',
    topicName: 'Process Control Block & Context Switch',
    difficulty: 'Easy',
    questionText: 'What critical piece of hardware state is saved into the Process Control Block (PCB) when a process is preempted by the scheduler?',
    options: [
      'The entire hard disk image of the application',
      'The program counter, general-purpose registers, and stack pointer',
      'The network router ARP cache',
      'The display GPU frame buffer'
    ],
    correctIndex: 1,
    explanation: 'During a context switch, the OS saves CPU registers, Program Counter (PC), and Stack Pointer (SP) into the current process PCB so that execution can later resume at the exact instruction.',
    hint: 'What CPU registers track instruction and function execution?'
  },
  // OS TLB
  {
    id: 'ext-os-tlb-1',
    subjectId: 'os',
    topicId: 'os-tlb',
    subjectName: 'Operating Systems',
    topicName: 'Translation Lookaside Buffer (TLB)',
    difficulty: 'Hard',
    questionText: 'If a TLB lookup takes 10ns, main memory access takes 100ns, and the TLB hit ratio is 90%, what is the Effective Memory Access Time (EMAT) for a single-level page table?',
    options: [
      '110 ns',
      '120 ns',
      '100 ns',
      '200 ns'
    ],
    correctIndex: 1,
    explanation: 'Hit time = 10ns (TLB) + 100ns (Data access) = 110ns. Miss time = 10ns (TLB) + 100ns (Page table) + 100ns (Data access) = 210ns. EMAT = 0.90 * 110 + 0.10 * 210 = 99 + 21 = 120ns.',
    hint: 'EMAT = Hit_Rate * (TLB + Mem) + Miss_Rate * (TLB + 2*Mem).'
  },
  // DBMS Window Functions
  {
    id: 'ext-db-win-1',
    subjectId: 'dbms',
    topicId: 'dbms-window-fns',
    subjectName: 'Database Management Systems',
    topicName: 'SQL Window Functions & CTEs',
    difficulty: 'Medium',
    questionText: 'How does DENSE_RANK() differ from RANK() when two rows have identical values in the ORDER BY clause?',
    options: [
      'DENSE_RANK() throws an ambiguous error, while RANK() assigns random numbers.',
      'DENSE_RANK() does not skip subsequent rank numbers (e.g. 1, 2, 2, 3), whereas RANK() leaves gaps (e.g. 1, 2, 2, 4).',
      'RANK() does not skip ranks, whereas DENSE_RANK() leaves gaps.',
      'There is no difference; they are exact synonyms.'
    ],
    correctIndex: 1,
    explanation: 'DENSE_RANK() produces consecutive rankings without gaps when ties occur (1, 2, 2, 3), while RANK() skips rankings to reflect the count of preceding rows (1, 2, 2, 4).',
    hint: 'Think about whether ranking numbers contain gaps or are "dense".'
  },
  // DBMS ARIES
  {
    id: 'ext-db-aries-1',
    subjectId: 'dbms',
    topicId: 'dbms-aries',
    subjectName: 'Database Management Systems',
    topicName: 'ARIES Recovery Algorithm & WAL',
    difficulty: 'Hard',
    questionText: 'In the ARIES recovery algorithm, what is the purpose of the "Redo" phase ("Repeating History")?',
    options: [
      'It rolls back all active transactions immediately.',
      'It scans the log forward from the smallest unwritten log record (RecLSN) to restore the database to its exact state before the crash.',
      'It discards all dirty pages and reboots the server in single-user mode.',
      'It writes checkpoints every 1 millisecond.'
    ],
    correctIndex: 1,
    explanation: 'ARIES repeats history during the Redo phase by reapplying all logged operations forward up to the point of failure (including loser transactions), ensuring physiological log consistency before rolling back losers in the Undo phase.',
    hint: 'Does ARIES repeat history forward before undoing losers?'
  },
  // DSA DSU
  {
    id: 'ext-dsa-dsu-1',
    subjectId: 'dsa',
    topicId: 'dsa-dsu',
    subjectName: 'Data Structures & Algorithms',
    topicName: 'Disjoint Set Union (Union-Find)',
    difficulty: 'Medium',
    questionText: 'What is the nearly constant amortized time complexity per operation in a Disjoint Set Union (DSU) with both Path Compression and Union by Rank?',
    options: [
      'O(log N)',
      'O(α(N)) where α is the inverse Ackermann function',
      'O(N log N)',
      'O(1) strict worst-case'
    ],
    correctIndex: 1,
    explanation: 'Combining path compression in find() and union by rank yields an amortized time complexity of O(alpha(N)) per operation, where alpha is the inverse Ackermann function (which is less than 5 for all practical universe sizes).',
    hint: 'What inverse function grows extremely slowly?'
  },
  // DSA Segment Tree
  {
    id: 'ext-dsa-seg-1',
    subjectId: 'dsa',
    topicId: 'dsa-segment-tree',
    subjectName: 'Data Structures & Algorithms',
    topicName: 'Segment Trees & Range Queries',
    difficulty: 'Hard',
    questionText: 'What algorithmic technique allows a Segment Tree to perform range updates in O(log N) rather than O(N)?',
    options: [
      'Divide and conquer with binary search',
      'Lazy Propagation (deferring updates to child nodes until accessed)',
      'Hash table memoization',
      'Path compression'
    ],
    correctIndex: 1,
    explanation: 'Lazy propagation stores pending updates in a lazy array and postpones updating descendant child nodes until those specific nodes are queried or modified, keeping range update time within O(log N).',
    hint: 'Deferred execution until a child is actually visited.'
  }
];
