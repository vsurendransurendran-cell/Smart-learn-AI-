import { LibraryBook } from '../../types';

export const SYSTEMS_AND_CLOUD_BOOKS: LibraryBook[] = [
  // 10. LINUX KERNEL INTERNALS (10 PAGES)
  {
    id: 'book-linux-kernel',
    title: 'Linux Kernel Internals & Systems Programming',
    author: 'Robert Love & Greg Kroah-Hartman',
    category: 'systems',
    badge: 'Kernel Systems',
    description: 'A 15-page deep dive into Linux virtual memory, CFS process scheduling, VFS file abstraction, eBPF kernel observability, and io_uring.',
    coverEmoji: '🐧',
    coverColor: 'from-amber-600 to-stone-800',
    totalPages: 15,
    readPages: [],
    pages: [
      {
        pageNumber: 1,
        title: 'Page 1: The Linux Architecture: Kernel Space vs User Space',
        content: `The Linux operating system enforces a strict hardware-assisted boundary between User Space (Ring 3) and Kernel Space (Ring 0).

User space contains running applications, libraries, and user processes. These processes execute in unprivileged mode, isolated from physical hardware and each other via virtual memory address spaces.
Kernel space houses the monolithic Linux kernel: device drivers, file systems, network stacks, and memory managers with unrestricted access to CPU instructions and physical RAM.

Whenever a user program needs to read a file, allocate memory, or send a network packet, it must execute a System Call (syscall), transitioning the CPU from Ring 3 to Ring 0 via software interrupts ('sysenter' or 'syscall').`
      },
      {
        pageNumber: 2,
        title: 'Page 2: Process Management: task_struct and the CFS Scheduler',
        content: `In Linux, every process and thread is represented in kernel memory by a massive C structure named 'task_struct'.

Key components of 'task_struct':
- Process State: Running, Interruptible Sleep, Uninterruptible Sleep (D state, waiting on disk I/O), Zombie.
- PID and TGID: Thread Group ID unites multiple POSIX threads into a single process.
- mm_struct: Pointers to virtual memory descriptors and page tables.
- files_struct: File descriptor tables.

The default Linux CPU scheduler is the Completely Fair Scheduler (CFS). Instead of fixed timeslices, CFS assigns a virtual runtime ('vruntime') to each task, tracking the CPU time spent weighted by the task's 'nice' level. CFS maintains runnable tasks in a time-ordered red-black tree, always picking the task with the lowest vruntime to run next.`
      },
      {
        pageNumber: 3,
        title: 'Page 3: Virtual Memory Architecture & Paging',
        content: `Linux processes do not interact with physical RAM addresses; they operate inside a 64-bit Virtual Address Space (typically 128 TB per process on x86_64).

The kernel and Memory Management Unit (MMU) translate virtual addresses to physical frames using 4-level or 5-level Page Tables (PGD, P4D, PUD, PMD, PTE):
- Standard Page Size: 4 KB.
- Translation Lookaside Buffer (TLB): A high-speed CPU hardware cache storing recent virtual-to-physical address mappings.
- Page Fault: If a process accesses an address not present in physical RAM, the MMU triggers a Page Fault interrupt. The kernel allocates a physical frame, reads data from disk or swap if necessary, updates the page table, and resumes the instruction.`
      },
      {
        pageNumber: 4,
        title: 'Page 4: Virtual File System (VFS) and Inodes',
        content: `Linux embodies the Unix philosophy: "Everything is a file"—including regular files, directories, disk partitions, sockets, and character devices.

This abstraction is unified by the Virtual File System (VFS), which defines a generic interface over concrete filesystems (ext4, XFS, btrfs, NFS).
Core VFS abstractions:
1. Superblock: Metadata describing an entire mounted filesystem.
2. Inode (Index Node): Represents a specific physical file or directory on disk, storing permissions, size, timestamps, and block pointers, but NOT the filename.
3. Dentry (Directory Entry): Links human-readable pathnames (e.g., "/etc/hosts") to their corresponding Inode number.
4. File Object: Represents an open file instance created when a process calls 'open()', storing current seek offsets and access flags.`
      },
      {
        pageNumber: 5,
        title: 'Page 5: Inter-Process Communication (IPC): Pipes, Sockets, and Shared Memory',
        content: `Linux provides diverse mechanisms for processes to coordinate and exchange data:

- Anonymous Pipes & FIFOs: Byte streams connecting parent and child processes. Synchronous and unidirectional.
- UNIX Domain Sockets: Bidirectional socket communication operating entirely within kernel memory buffers without traversing the network card, offering high throughput and file descriptor passing ('SCM_RIGHTS').
- POSIX Shared Memory ('shm_open', 'mmap'): Multiple processes map the same physical RAM frames into their respective virtual address spaces. Zero-copy communication, but requires synchronization via semaphores or mutexes.`
      },
      {
        pageNumber: 6,
        title: 'Page 6: Signal Handling and Interrupt Context',
        content: `Signals are asynchronous notifications sent to processes by the kernel or other processes (e.g., SIGINT, SIGTERM, SIGKILL, SIGSEGV).

When a signal arrives:
- The kernel pauses the process's normal instruction flow.
- A custom signal handler executes on the process stack.
- The previous execution context is restored via 'sigreturn()'.

In kernel space, hardware interrupts (e.g., incoming network packet) are split into:
1. Top Halves: Fast interrupt service routines that acknowledge the hardware interrupt and queue work with interrupts disabled.
2. Bottom Halves (SoftIRQs, Tasklets, Workqueues): Asynchronous routines that process the payload with interrupts re-enabled, preventing system latency spikes.`
      },
      {
        pageNumber: 7,
        title: 'Page 7: Memory Allocation in Kernel: Slab, Slub, and Buddy System',
        content: `The Linux kernel manages physical page frames using the Buddy Allocator:
- RAM is organized into power-of-two page block orders (1 page, 2 pages, 4 pages, up to 1024 pages).
- When a page block is freed, the allocator checks if its neighboring "buddy" block is also free, recombining them into a larger contiguous block to combat external memory fragmentation.

For small kernel data structures (like inodes, socket buffers, and task_structs), the kernel uses the SLAB/SLUB allocator. It pre-allocates caches of identical objects, eliminating the overhead of frequent buddy allocator allocations.`
      },
      {
        pageNumber: 8,
        title: 'Page 8: eBPF: Extended Berkeley Packet Filter',
        content: `eBPF represents the greatest revolution in Linux kernel architecture in recent decades. It allows engineers to run sandboxed, event-driven bytecode programs inside the Linux kernel without modifying kernel source code or loading dangerous kernel modules.

How eBPF works:
1. Write code in restricted C or Rust.
2. Compile with Clang into eBPF bytecode.
3. The kernel eBPF In-Kernel Verifier mathematically verifies that the program cannot loop infinitely, read uninitialized memory, or crash the kernel.
4. JIT (Just-In-Time) compiler translates bytecode into native machine instructions.

Tools like Cilium (networking/security) and BCC/bpftrace (system tracing) leverage eBPF to monitor production systems with zero overhead.`
      },
      {
        pageNumber: 9,
        title: 'Page 9: Namespaces and Cgroups: The Foundation of Containers',
        content: `Containers are not virtual machines; they are regular Linux processes isolated by two kernel primitives:

1. Namespaces (Isolation): Restricts what a process can SEE:
   - PID Namespace: Process sees its own isolated PID tree, where its entry process is PID 1.
   - NET Namespace: Dedicated virtual network interfaces, routing tables, and firewall rules.
   - MNT Namespace: Isolated filesystem mount points.
   - IPC, UTS, and USER Namespaces.

2. Cgroups (Resource Control): Restricts what a process can USE:
   - Limits CPU shares, maximum RAM consumption, disk I/O bandwidth, and network priority.
   - Enforces OOM (Out Of Memory) killer triggers if a container exceeds its memory ceiling.`
      },
      {
        pageNumber: 10,
        title: 'Page 10: Performance Tuning & Sysctl Optimization',
        content: `Production Linux servers require kernel parameter tuning via '/etc/sysctl.conf':

- 'net.core.somaxconn = 65535': Expands the maximum TCP listen backlog queue for incoming connections.
- 'net.ipv4.tcp_tw_reuse = 1': Allows the kernel to safely reuse sockets in TIME_WAIT state for outgoing connections.
- 'vm.swappiness = 10': Encourages the kernel to retain application page cache in physical RAM rather than aggressively swapping to disk.
- 'fs.file-max = 2097152': Expands system-wide open file descriptor ceilings for high-concurrency reverse proxies like Nginx and Envoy.`
      },
      {
        pageNumber: 11,
        title: 'Page 11: io_uring: Asynchronous Zero-Copy Linux I/O',
        content: `Historically, Linux asynchronous I/O ('aio') was limited to raw disk access with 'O_DIRECT'. Linux 5.1 introduced 'io_uring', authored by Jens Axboe.

Architecture:
- Shared memory ring buffers: Submission Queue (SQ) and Completion Queue (CQ) mapped into both user and kernel space.
- Zero syscall execution: Applications submit I/O requests and reap completions simply by reading and writing to shared memory rings without switching CPU rings!
- Kernel polling mode (SQPOLL): A dedicated kernel thread continuously polls the SQ, enabling true zero-syscall read/write operations for high-performance databases.`
      },
      {
        pageNumber: 12,
        title: 'Page 12: Memory Cgroups v2 & Pressure Stall Information (PSI)',
        content: `Cgroups v2 consolidates resource controllers into a single unified hierarchy, fixing longstanding accounting discrepancies between memory and block I/O.

Pressure Stall Information (PSI):
Instead of blunt metrics like average CPU load, PSI quantifies how much performance degradation is occurring due to hardware resource contention:
- 'some': Percentage of time at least one task was stalled on memory/CPU/IO.
- 'full': Percentage of time ALL non-idle tasks were stalled simultaneously.
PSI allows container orchestrators to preemptively detect resource exhaustion before the OOM killer strikes.`
      },
      {
        pageNumber: 13,
        title: 'Page 13: eBPF XDP: High-Speed Packet Processing at the NIC Driver',
        content: `eXpress Data Path (XDP) provides a safe, programmable network packet processing hook directly inside the Linux network card driver:

- Packets are intercepted before the kernel allocates an 'sk_buff' data structure.
- eBPF bytecode executes in nanoseconds directly on raw packet frames.
- Return codes: 'XDP_DROP' (instant DDoS filtering at wire speed), 'XDP_TX' (instant bounceback), or 'XDP_PASS' (handover to standard Linux IP stack).
Cloudflare and Meta use XDP to deflect multi-terabit DDoS floods with zero CPU saturation.`
      },
      {
        pageNumber: 14,
        title: 'Page 14: NUMA Architectures & HugePages',
        content: `Modern multi-socket server CPUs feature Non-Uniform Memory Access (NUMA): accessing memory attached to the local CPU socket is significantly faster than traversing interconnect busses (QPI/UPI) to remote sockets.

Optimization strategies:
- 'numactl': Pin latency-sensitive database processes and their memory allocations to a dedicated NUMA node.
- HugePages (2MB and 1GB): Standard 4KB memory pages require millions of Translation Lookaside Buffer (TLB) cache entries. HugePages shrink page table size by 500x, reducing CPU TLB cache misses by 80% for large memory workloads (Postgres, Redis).`
      },
      {
        pageNumber: 15,
        title: 'Page 15: Kernel Panic & Kdump Crash Dump Analysis',
        content: `When the Linux kernel encounters an unrecoverable hardware exception or data corruption, it invokes 'panic()'.

Kdump crash architecture:
1. When a kernel panic occurs, the crashing kernel executes a minimal secondary kernel (capture kernel) using 'kexec' without resetting hardware registers.
2. The capture kernel dumps the entire physical RAM state to disk ('/var/crash/vmcore').
3. Engineers inspect the crash dump using the 'crash' diagnostic utility, analyzing stack traces, active lock allocations, and register dumps to isolate hardware memory faults or driver bugs.`
      }
    ]
  },

  // 11. APACHE KAFKA & MESSAGE STREAMING (15 PAGES)
  {
    id: 'book-kafka-streaming',
    title: 'Distributed Message Streaming with Apache Kafka',
    author: 'Neha Narkhede & Jay Kreps',
    category: 'systems',
    badge: 'Event Streaming',
    description: 'A 15-page deep dive into Kafka partition logs, consumer groups, exactly-once semantics, KRaft consensus, and streaming joins.',
    coverEmoji: '📨',
    coverColor: 'from-orange-700 to-red-900',
    totalPages: 15,
    readPages: [],
    pages: [
      {
        pageNumber: 1,
        title: 'Page 1: The Anatomy of an Immutable Commit Log',
        content: `Traditional message brokers (like RabbitMQ or ActiveMQ) treat messages as transient entities: messages are queued, delivered to consumers, and deleted from disk once acknowledged.

Apache Kafka is built on a fundamentally different paradigm: the distributed, append-only, immutable commit log.
- Producers append event records to the tail of a log.
- Consumers read messages by tracking their individual offset position in the log.
- Messages are persisted to disk according to retention policies (e.g., 7 days or 1 TB), regardless of whether they have been consumed.

Because reading a message is simply reading bytes sequentially from disk at a specific offset without modifying the log, a single Kafka cluster can service thousands of concurrent consumers with zero read degradation.`
      },
      {
        pageNumber: 2,
        title: 'Page 2: Topics, Partitions, and Horizontal Scalability',
        content: `A Topic is a logical category of messages (e.g., "payment-transactions"). To scale beyond the compute and disk capacity of a single physical server, topics are partitioned.

Partitions are the atomic unit of scalability and parallelism in Kafka:
- Each partition is an ordered, immutable sequence of records continuously appended on disk.
- Messages within a single partition are assigned a monotonically increasing integer called an Offset.
- Ordering Guarantee: Kafka guarantees strict message ordering within a single partition, but NOT across different partitions of the same topic.
- Partition Key: When producing, messages with the same key (e.g., customerId) are routed to the same partition using a murmur2 hash, preserving order per entity.`
      },
      {
        pageNumber: 3,
        title: 'Page 3: Broker Storage Internals: Segments and Zero-Copy I/O',
        content: `How does Kafka achieve millions of writes per second on standard spinning disks or SSDs?

1. Sequential Disk Writes: Writing sequentially to disk bypasses random seek latency, matching the raw bandwidth of memory busses.
2. Segment Files: Each partition is broken down into segment files (default 1 GB). Old segments can be purged or compacted without locking the active tail.
3. Index Files: Sparse memory-mapped index files (.index and .timeindex) map offsets and timestamps to exact byte positions in the log.
4. OS Page Cache & Zero-Copy: Kafka writes directly to the Linux OS page cache. When transmitting data to consumers, Kafka invokes the 'sendfile()' system call, transferring bytes directly from the page cache to the network socket without copying data into JVM application memory.`
      },
      {
        pageNumber: 4,
        title: 'Page 4: Producer Architecture: Batching and Delivery Guarantees',
        content: `Kafka producers do not send network requests for individual messages. They buffer records in memory and dispatch them in batches:

Key producer configuration knobs:
- 'batch.size': Maximum bytes per batch (e.g., 64 KB).
- 'linger.ms': Time the producer waits before sending an incomplete batch (e.g., 20ms). This creates artificial micro-delays that dramatically increase compression ratios and network throughput.
- 'acks':
  - acks=0: Fire and forget (fastest, high data loss risk).
  - acks=1: Acknowledged once the partition leader writes to local log.
  - acks=all (-1): Acknowledged only when all In-Sync Replicas (ISR) have written the record to disk, providing maximum durability.`
      },
      {
        pageNumber: 5,
        title: 'Page 5: Consumer Groups and Rebalance Protocols',
        content: `Consumer Groups allow multiple application instances to collaborate in reading from a topic, distributing the processing load.

Consumer Group invariants:
- Each partition is consumed by exactly ONE consumer instance within a group at any given time.
- If you have 8 partitions and 4 consumers in a group, each consumer processes 2 partitions.
- If you have 8 partitions and 12 consumers, 4 consumers sit idle as hot standbys.

When a consumer crashes or a new instance joins, the Group Coordinator initiates a Rebalance. Modern Kafka implements Cooperative Sticky Rebalancing, reassigning only migrating partitions while allowing unaffected consumers to continue streaming without full stop-the-world pauses.`
      },
      {
        pageNumber: 6,
        title: 'Page 6: Replication, In-Sync Replicas (ISR), and High Watermark',
        content: `Durability against node failure is maintained through partition replication across multiple brokers:

- Leader Replica: Handles all producer writes and consumer reads (in standard setups).
- Follower Replicas: Fetch data from the leader to keep their local logs in sync.
- In-Sync Replicas (ISR): The subset of replicas that are actively caught up with the leader log. If a follower falls behind by more than 'replica.lag.time.max.ms', it is evicted from the ISR.
- High Watermark (HW): The highest offset replicated to all ISR members. Consumers can only read messages up to the High Watermark, preventing uncommitted dirty reads if the leader crashes.`
      },
      {
        pageNumber: 7,
        title: 'Page 7: Idempotence and Exactly-Once Semantics (EOS)',
        content: `Network blips can cause producer retries, leading to duplicate messages in downstream databases.

Kafka solves this with two features:
1. Idempotent Producer ('enable.idempotence=true'): Assigns a unique Producer ID (PID) and monotonically increasing sequence number to each message. The broker automatically de-duplicates any message with an already committed sequence number.
2. Transactional API: Enables atomic writes across multiple topics and partitions alongside consumer offset commits:
\`\`\`java
producer.beginTransaction();
// process input message and produce output message
producer.sendOffsetsToTransaction(offsets, consumerGroupId);
producer.commitTransaction();
\`\`\`
This achieves true End-to-End Exactly-Once Processing in stream pipelines.`
      },
      {
        pageNumber: 8,
        title: 'Page 8: Log Compaction and State Stores',
        content: `In standard log cleanup, Kafka deletes segments older than a time retention threshold. 

In Log Compaction ('cleanup.policy=compact'):
- Kafka guarantees that the log retains at least the LAST known value for every message key.
- Obsolete intermediate state mutations are garbage collected in the background.
- A "tombstone" (a message with a key and a null payload) indicates key deletion.

Log compaction allows Kafka to serve as an immutable database changelog. Upon system reboot, a service can reconstruct its entire in-memory state or cache by replaying the compacted topic from offset 0.`
      },
      {
        pageNumber: 9,
        title: 'Page 9: KRaft Consensus: Eliminating Apache ZooKeeper',
        content: `Historically, Kafka clusters relied on an external Apache ZooKeeper ensemble to manage broker metadata, topic configurations, and partition leader elections.

ZooKeeper created operational friction and limited cluster scalability to ~200,000 partitions.
KIP-500 introduced KRaft (Kafka Raft Metadata Mode):
- The Kafka brokers themselves form an internal Raft consensus quorum.
- Cluster metadata is stored as an internal Kafka topic named '@metadata'.
- Metadata state changes propagate instantaneously to all brokers via log replication.
KRaft eliminates external dependencies, accelerates partition failovers from tens of seconds to milliseconds, and enables clusters supporting millions of partitions.`
      },
      {
        pageNumber: 10,
        title: 'Page 10: Kafka Streams and Windowed State Operations',
        content: `Kafka Streams is a client library for building real-time stream processing applications natively on top of Kafka.

Core primitives:
- KStream: An unbounded stream of individual event records.
- KTable: A changelog view representing the current state of records keyed by ID.
- State Stores (RocksDB): Local embedded key-value stores maintained on local SSDs for high-speed stateful aggregations, backed by internal changelog topics.
- Windowing: Aggregates events across Tumbling (fixed), Hopping (sliding), or Session (inactivity gap) time windows, handling late-arriving out-of-order data gracefully.`
      },
      {
        pageNumber: 11,
        title: 'Page 11: Tiered Storage in Cloud Object Stores (S3/GCS)',
        content: `Traditional Kafka brokers retained data on expensive high-speed local NVMe SSDs, making multi-year event retention prohibitively costly.

Kafka Tiered Storage (KIP-405) separates storage from compute:
- Hot Data (Local Tier): The most recent segment logs remain on local NVMe SSDs for sub-millisecond consumer reads.
- Cold Data (Remote Tier): Sealed, inactive segment files are automatically uploaded to cloud object storage (Amazon S3, Google Cloud Storage).
Consumers reading historical event logs fetch directly from object storage without impacting real-time producer throughput or cluster memory caches.`
      },
      {
        pageNumber: 12,
        title: 'Page 12: Kafka Connect Architecture & Debezium CDC',
        content: `Kafka Connect provides scalable, fault-tolerant integration between Kafka and external databases or data warehouses:
- Source Connectors: Pull data from external systems into Kafka topics.
- Sink Connectors: Push messages from Kafka topics into downstream datastores (Elasticsearch, Snowflake).

Change Data Capture (CDC) via Debezium:
Debezium monitors database write-ahead logs (PostgreSQL WAL, MySQL binlog) directly at the database engine level, streaming every insert, update, and delete into Kafka with microsecond latency and zero database query load.`
      },
      {
        pageNumber: 13,
        title: 'Page 13: Schema Registry & Protobuf/Avro Schema Evolution',
        content: `Streaming architectures without strict contracts suffer from payload schema divergence. The Confluent Schema Registry provides centralized schema governance:

- Producers register schemas (Apache Avro, Protobuf, or JSON Schema) before publishing.
- Messages prepend a 5-byte magic identifier containing the registered Schema ID.
- Compatibility Rules:
  - BACKWARD: New code can read data written by older producers.
  - FORWARD: Older code can read data written by newer producers.
  - FULL: Both backward and forward compatible.
This prevents breaking changes from propagating through distributed pipelines.`
      },
      {
        pageNumber: 14,
        title: 'Page 14: Incremental Cooperative Rebalancing Protocol',
        content: `Historically, when a new consumer joined or left a Kafka consumer group, the Stop-The-World Eager Rebalance revoked all partition assignments across all consumers, pausing streaming processing for seconds or minutes.

Incremental Cooperative Rebalance (KIP-429):
1. Only partitions that actually need to move are revoked.
2. Unaffected consumers continue processing their assigned partitions uninterrupted.
3. Partitions are migrated smoothly in consecutive small phases, eliminating throughput dropoffs during auto-scaling events.`
      },
      {
        pageNumber: 15,
        title: 'Page 15: End-to-End Tracing & JMX Metrics Monitoring',
        content: `Operating high-scale Kafka infrastructure requires tracking key JMX metrics:
- 'UnderReplicatedPartitions': Must always equal 0. Non-zero indicates broker disk failure or network partition.
- 'ConsumerLag': Measures the distance between log end offset and consumer current offset. Growing lag signals downstream processing bottlenecks.
- 'RequestHandlerAvgIdlePercent': Below 20% indicates broker CPU exhaustion.

Injecting OpenTelemetry W3C trace headers into Kafka record headers enables end-to-end distributed tracing from mobile clients through microservice topologies.`
      }
    ]
  },

  // 12. COMPILERS & VIRTUAL MACHINES (15 PAGES)
  {
    id: 'book-compilers-vms',
    title: 'Compilers, Abstract Syntax Trees & Bytecode Virtual Machines',
    author: 'Alfred Aho, Monica Lam & Keith Cooper',
    category: 'systems',
    badge: 'Compiler Engineering',
    description: 'A 15-page deep dive into lexing, parsing, SSA intermediate representations, LLVM optimization passes, and JIT compilation.',
    coverEmoji: '🧩',
    coverColor: 'from-violet-700 to-indigo-950',
    totalPages: 15,
    readPages: [],
    pages: [
      {
        pageNumber: 1,
        title: 'Page 1: The Stages of Modern Compilation',
        content: `A compiler translates source code written in a human-readable high-level programming language into an executable target format (machine code or bytecode).

The compilation pipeline is bifurcated into two primary hemispheres:
1. Front-End (Language-Specific):
   - Lexical Analysis (Scanner): Converts source character streams into meaningful tokens.
   - Syntax Analysis (Parser): Verifies grammar rules and constructs an Abstract Syntax Tree (AST).
   - Semantic Analysis: Type checking, scope resolution, and symbol table generation.
2. Back-End (Target-Specific):
   - Intermediate Representation (IR) Generation.
   - Target-Independent Optimizations (Dead code elimination, loop unrolling, constant folding).
   - Code Generation: Emitting target assembly or bytecode.`
      },
      {
        pageNumber: 2,
        title: 'Page 2: Lexical Analysis: Regular Expressions and DFAs',
        content: `The Lexer (or Scanner) transforms raw source strings into a linear stream of discrete Tokens.

Each token possesses a Type (e.g., TOKEN_KEYWORD, TOKEN_IDENTIFIER, TOKEN_NUMBER) and an optional Lexeme (the literal string value).
Lexer engines are modeled on finite automata:
- Regular expressions specify token patterns.
- Thompson's Construction converts regexes into Nondeterministic Finite Automata (NFAs).
- Powerset Construction converts NFAs into Deterministic Finite Automata (DFAs).
- The lexer steps through characters using the "Maximal Munch" (Longest Match) rule: e.g., scanning 'while_variable' as a single identifier rather than the keyword 'while' followed by '_variable'.`
      },
      {
        pageNumber: 3,
        title: 'Page 3: Syntax Analysis: Context-Free Grammars and ASTs',
        content: `Syntax analysis verifies that the token sequence obeys the structural grammar of the language, defined using Context-Free Grammars (typically expressed in Backus-Naur Form / BNF).

Parsing strategies:
1. Top-Down Parsers (Recursive Descent, LL(k)): Starts at the root grammar rule and recursively predicts matching sub-rules based on lookahead tokens. Hand-written recursive descent parsers are preferred by GCC, Clang, and Rust for their superior error reporting and diagnostics.
2. Bottom-Up Parsers (LR, LALR): Shifts tokens onto a parse stack and reduces them to grammar symbols when matching rules are detected.

The output of the parser is an Abstract Syntax Tree (AST)—a tree data structure representing the syntactic hierarchy of the program, discarding trivial tokens like semicolons and parentheses.`
      },
      {
        pageNumber: 4,
        title: 'Page 4: Semantic Analysis: Symbol Tables and Type Checking',
        content: `A program can be syntactically valid yet semantically nonsensical (e.g., adding a string to a function pointer, or referencing an undeclared variable).

Semantic analysis traverses the AST to enforce semantic validity:
- Symbol Tables: Hierarchical data structures that track variable and function declarations across nested lexical scopes (global, function, block).
- Type Checking: Computes and validates types across expressions. Infers types in modern languages (Hindley-Milner type inference).
- Decorating the AST: Annotates tree nodes with resolved types, memory offsets, and constant evaluations.`
      },
      {
        pageNumber: 5,
        title: 'Page 5: Intermediate Representation (IR) and Static Single Assignment (SSA)',
        content: `Compiling directly from an AST to machine code forces every optimization to be re-written for every CPU target (x86, ARM, RISC-V). Modern compilers translate the AST into a universal Intermediate Representation (IR).

Static Single Assignment (SSA) form is the gold standard for compiler IR:
- Every variable is assigned a value exactly ONCE.
- Re-assignments generate a new versioned variable (e.g., x1 = 5; x2 = x1 + 2).
- Phi functions ('φ') merge distinct variable versions at control-flow confluence points (e.g., after an if-else block).

SSA drastically simplifies advanced optimizations like Global Value Numbering, Sparse Conditional Constant Propagation, and Dead Code Elimination.`
      },
      {
        pageNumber: 6,
        title: 'Page 6: The LLVM Compiler Infrastructure',
        content: `LLVM revolutionized compiler engineering by providing a modular, reusable compiler back-end.

LLVM architecture:
- Front-ends (Clang for C/C++, rustc for Rust, swiftc for Swift) compile high-level source code into standardized LLVM IR (a strongly typed, RISC-like assembly language).
- The LLVM Optimizer runs hundreds of optimization passes over the SSA-based IR.
- The LLVM Code Generator translates the optimized IR into native assembly for over 20 target architectures.

This decoupling means that any performance improvement made to an LLVM optimization pass instantly benefits C++, Rust, Swift, and Julia simultaneously.`
      },
      {
        pageNumber: 7,
        title: 'Page 7: Stack-Based vs Register-Based Virtual Machines',
        content: `When a language does not compile directly to native machine code, it targets a Virtual Machine (VM):

1. Stack-Based VMs (JVM, CPython, WebAssembly):
   - Instructions operate on an operand evaluation stack (push/pop).
   - Instructions are compact (typically 1 byte opcode).
   - Simpler compiler code generation, but requires more instructions per operation.

2. Register-Based VMs (LuaJIT, Dalvik/Android):
   - Instructions specify virtual register addresses (e.g., 'ADD R1, R2, R3').
   - Instructions are wider (32-bit), but programs execute significantly fewer total instructions.
   - Closer mapping to physical CPU registers, resulting in faster execution on modern out-of-order processors.`
      },
      {
        pageNumber: 8,
        title: 'Page 8: Bytecode Dispatch Loops and Direct Threading',
        content: `At the heart of every bytecode VM is the interpreter dispatch loop.

Implementation approaches:
1. Switch-Case Dispatch: A 'while(true) { switch(*ip++) { ... } }' loop. Simple, but suffers from severe branch misprediction because the CPU branch predictor cannot foresee the next opcode.
2. Direct Threaded Code: Uses GCC's 'labels as values' extension (&&label). Each bytecode opcode contains the direct memory address of its corresponding handler block. Handlers conclude with a jump directly to the next instruction's handler, bypassing central loop overhead and accelerating VM execution by 20% to 30%.`
      },
      {
        pageNumber: 9,
        title: 'Page 9: Just-In-Time (JIT) Compilation Mechanics',
        content: `A JIT compiler combines the startup speed of an interpreter with the execution performance of compiled code.

How modern tier-adaptive JITs (like Java HotSpot and V8) operate:
1. Tier 0 (Interpreter): Immediately starts executing bytecode, profiling call counts and loop back-edges.
2. Tier 1 (Baseline JIT): Rapidly compiles hot methods into unoptimized machine code.
3. Tier 2 (Optimizing JIT): If a method exceeds a high execution threshold, the optimizing JIT analyzes type feedback and inline caches. It performs aggressive speculative optimizations (inlining, devirtualization, escape analysis).
4. De-optimization (De-opt): If runtime assumptions are violated (e.g., a polymorphic call receives an unexpected object type), the JIT gracefully unwinds the native stack frame back to the interpreter.`
      },
      {
        pageNumber: 10,
        title: 'Page 10: Garbage Collection Algorithms for VMs',
        content: `Managed virtual machines rely on automated garbage collectors to manage heap allocations:

Core GC taxonomies:
1. Mark-Sweep: Identifies reachable live objects starting from Root pointers (stack frames, global variables), sweeping unvisited memory into free-lists.
2. Compacting / Copying Collectors: Relocates surviving objects into contiguous memory blocks, eliminating external fragmentation and resetting allocation pointers.
3. Generational Hypothesis: "Most objects die young." Divides the heap into Young Generation (Eden and Survivor spaces) and Old/Tenured Generation. Minor collections quickly reclaim short-lived objects with minimal pause times.`
      },
      {
        pageNumber: 11,
        title: 'Page 11: LLVM IR & Optimization Passes',
        content: `Modern compilers (Clang, Rustc, Swift) decouple frontend language syntax from backend machine code generation using the LLVM compiler infrastructure.

LLVM intermediate representation (LLVM IR) is a strongly typed, RISC-like assembly language in Static Single Assignment (SSA) form.
Core optimization passes:
- 'mem2reg': Promotes stack memory allocations ('alloca') into fast SSA virtual registers.
- Dead Code Elimination (DCE): Erases unused calculations.
- Loop Invariant Code Motion (LICM): Hoists calculations outside of loop bodies.
- Auto-Vectorization: Automatically rewrites scalar arithmetic loops into SIMD vector instructions.`
      },
      {
        pageNumber: 12,
        title: 'Page 12: Register Allocation: Chaitin-Briggs Graph Coloring',
        content: `Target CPUs possess a finite number of physical hardware registers (e.g., 16 general-purpose registers on x86-64). A program, however, may define thousands of virtual variables.

Graph Coloring Register Allocation:
1. Build an Interference Graph where each virtual register is a vertex, and an edge connects any two variables whose live ranges overlap.
2. Color the graph using K colors (where K is the number of available physical registers).
3. If the graph cannot be colored with K colors, select a low-frequency variable to "spill" to stack memory and repeat.`
      },
      {
        pageNumber: 13,
        title: 'Page 13: Escape Analysis & Scalar Replacement of Aggregates (SRA)',
        content: `Heap allocation requires synchronization and garbage collection overhead. Escape analysis determines whether an allocated object’s pointer ever escapes the lexical scope of the allocating function:

- No Escape: If an object does not escape to other threads, global variables, or caller returns, the compiler performs Scalar Replacement:
- Instead of allocating the object struct on the heap, its individual fields are unpacked directly into CPU registers or stack variables.
In Java HotSpot and Go, escape analysis eliminates up to 60% of temporary heap allocations in hot web server request paths.`
      },
      {
        pageNumber: 14,
        title: 'Page 14: WebAssembly Engine Architecture: Wasmtime & V8 Liftoff',
        content: `WebAssembly (Wasm) provides a sandboxed, low-level bytecode format designed to execute at near-native speed across web browsers and serverless cloud runtimes.

Modern Wasm engine architectures (like V8's Liftoff and Wasmtime):
- Baseline Compiler (Liftoff): Generates machine code in a single linear pass over the bytecode without building an AST, achieving instant startup.
- Optimizing Compiler (TurboFan/Cranelift): Re-compiles hot Wasm functions with aggressive vectorization and register allocation.
- Sandboxed Linear Memory: Wasm memory is a single contiguous byte array with hardware-enforced memory bounds checking.`
      },
      {
        pageNumber: 15,
        title: 'Page 15: Profile-Guided Optimization (PGO) & BOLT Binary Layout',
        content: `Standard static compilers must make conservative assumptions about branch probabilities. Profile-Guided Optimization (PGO) changes this paradigm:

1. Instrumentation: Compile binary with profiling counters.
2. Representative Workload: Run the binary under actual production traffic.
3. Optimized Recompilation: The compiler uses runtime branch probability profiles to place hot code paths contiguously in memory.
Facebook's BOLT (Binary Optimization and Layout Tool) post-processes compiled ELF binaries, reorganizing basic blocks to eliminate instruction cache misses and branch mispredictions, yielding an additional 10-15% throughput gain.`
      }
    ]
  },

  // 13. CLOUD NATIVE & KUBERNETES (15 PAGES)
  {
    id: 'book-cloud-k8s',
    title: 'Cloud-Native Infrastructure: Containers, Kubernetes & GitOps',
    author: 'Kelsey Hightower & Brendan Burns',
    category: 'cloud',
    badge: 'Cloud Architecture',
    description: 'A 15-page masterclass on container runtimes, Kubernetes controllers, Service Meshes, and GitOps continuous delivery.',
    coverEmoji: '☸️',
    coverColor: 'from-blue-600 to-indigo-950',
    totalPages: 15,
    readPages: [],
    pages: [
      {
        pageNumber: 1,
        title: 'Page 1: The Cloud-Native Imperative: Declarative vs Imperative',
        content: `Cloud-Native architecture is defined by declarative automation, immutable infrastructure, and dynamic elasticity.

In imperative systems management, operators write scripts defining HOW to achieve a state (e.g., "SSH into server, run apt install, edit config, restart service"). If any step fails or environmental state drifts, scripts fail unpredictably.

In declarative systems (exemplified by Kubernetes and Terraform), operators declare the DESIRED STATE (e.g., "There must always be 5 replicas of Service A running on port 8080"). Autonomous control loops continuously observe the actual infrastructure state and reconcile differences automatically.`
      },
      {
        pageNumber: 2,
        title: 'Page 2: Container Internals: OCI Specs, Containerd, and RunC',
        content: `Docker popularised containers, but modern container ecosystems adhere to Open Container Initiative (OCI) standards:

1. OCI Image Specification: Defines container image layers as tar archives accompanied by JSON configuration manifests.
2. OCI Runtime Specification: Defines how to unpack and execute an image using Linux namespaces and cgroups.
3. Architecture Hierarchy:
   - Docker CLI / Kubelet: High-level management.
   - Containerd / CRI-O: Manages image downloads, snapshot storage drivers (overlay2), and container lifecycles.
   - RunC: The low-level OCI reference implementation that interacts directly with the Linux kernel to spawn containerized processes.`
      },
      {
        pageNumber: 3,
        title: 'Page 3: Kubernetes Control Plane: API Server, etcd, and Reconciliation',
        content: `The Kubernetes Control Plane acts as the distributed nervous system of the cluster:

- kube-apiserver: The central REST gateway. All cluster components and human operators communicate exclusively with the API server.
- etcd: A distributed, consistent key-value store implementing the Raft consensus algorithm. It holds the authoritative cluster state.
- kube-scheduler: Evaluates unscheduled Pods against node resource capacities, affinity rules, taints, and tolerations to select the optimal host node.
- kube-controller-manager: Runs core reconciliation loops (DeploymentController, ReplicaSetController, NodeController). The reconciliation loop follows a simple cycle: Observe actual state -> Compare with desired state -> Execute actions to eliminate divergence.`
      },
      {
        pageNumber: 4,
        title: 'Page 4: Node Components: Kubelet, Kube-Proxy, and CNI',
        content: `Worker nodes execute container workloads and report health back to the control plane:

- kubelet: An agent running on every worker node. It registers the node with the API server, watches for PodSpec assignments, and instructs the container runtime to spawn or destroy containers.
- kube-proxy: Manages network routing rules on the node, programming Linux iptables or IPVS to route traffic addressed to Virtual ClusterIP Services to healthy backing Pod IPs.
- Container Network Interface (CNI): Plugins (Flannel, Calico, Cilium) that allocate unique IP addresses to every Pod across the cluster, establishing an un-NATed flat network.`
      },
      {
        pageNumber: 5,
        title: 'Page 5: Storage Architecture: Volumes, PVs, and PVCs',
        content: `Containers are transient by nature; if a container crashes, its writable filesystem layer is destroyed. Stateful applications require persistent storage decoupling.

Kubernetes abstracts storage via:
1. PersistentVolume (PV): A cluster-wide storage resource provisioned by administrators or dynamic cloud storage drivers (AWS EBS, GCP Persistent Disks).
2. PersistentVolumeClaim (PVC): A user request for storage specifying capacity (e.g., 50Gi) and access modes (ReadWriteOnce, ReadWriteMany).
3. StorageClass: Defines the provisioner and volume parameters for automated dynamic PV creation upon PVC submission.
4. StatefulSets: Kubernetes controller designed for stateful databases (PostgreSQL, Cassandra), guaranteeing deterministic network hostnames (pod-0, pod-1) and stable PVC bindings across restarts.`
      },
      {
        pageNumber: 6,
        title: 'Page 6: Ingress Controllers, Gateway API, and Traffic Routing',
        content: `How does external internet traffic reach internal cluster microservices?

- ClusterIP: Default internal virtual IP, reachable only within the cluster.
- NodePort: Exposes a service on a static high port (30000-32767) on every node's external IP.
- LoadBalancer: Provisions a cloud provider load balancer (e.g., AWS NLB).
- Ingress: An application-layer (L7) HTTP/HTTPS reverse proxy (Nginx, Traefik) routing external paths and domains to backend services with SSL termination.
- Kubernetes Gateway API: The next-generation evolution of Ingress, separating role responsibilities between Infrastructure Providers, Cluster Operators, and Application Developers.`
      },
      {
        pageNumber: 7,
        title: 'Page 7: Service Meshes: Istio, Envoy, and mTLS',
        content: `As microservice clusters scale into hundreds of services, managing network security, observability, and traffic routing in application code becomes unmanageable.

A Service Mesh moves these concerns down into the infrastructure layer via sidecar proxies:
- Data Plane (Envoy): High-performance C++ proxies deployed as sidecars alongside every application container, intercepting all inbound and outbound network traffic.
- Control Plane (Istiod): Configures Envoy proxies, distributing routing rules, rate limits, and cryptographic certificates.
- Mutual TLS (mTLS): The mesh automatically encrypts and authenticates every internal network hop using short-lived x509 certificates, providing Zero Trust security.`
      },
      {
        pageNumber: 8,
        title: 'Page 8: GitOps Continuous Delivery: ArgoCD and Flux',
        content: `GitOps applies the Git version control workflow to infrastructure and application deployment.

Principles of GitOps:
1. The entire desired state of the cluster is described declaratively in a Git repository (The Single Source of Truth).
2. Changes are made via Git Pull Requests, undergoing peer review and automated CI checks.
3. Software agents (ArgoCD or Flux) running inside the Kubernetes cluster continuously monitor the Git repository.
4. If cluster state drifts from the Git manifest, the GitOps agent automatically synchronizes the cluster or alerts operators, eliminating manual 'kubectl' access to production environments.`
      },
      {
        pageNumber: 9,
        title: 'Page 9: Horizontal Pod Autoscaling (HPA) and KEDA',
        content: `Cloud-native applications must automatically scale compute resources to handle unpredictable traffic spikes while minimizing idle costs:

- Horizontal Pod Autoscaler (HPA): Adjusts pod replica counts based on observed CPU and memory utilization.
- Cluster Autoscaler: Provisions additional cloud VM nodes when pods cannot be scheduled due to insufficient cluster capacity.
- KEDA (Kubernetes Event-driven Autoscaling): Enables scaling based on custom external metrics—such as Apache Kafka topic consumer lag, RabbitMQ queue depths, or AWS SQS message counts—allowing services to scale from zero to hundreds of replicas instantaneously upon workload arrival.`
      },
      {
        pageNumber: 10,
        title: 'Page 10: Security Hardening: OPA Gatekeeper and NetworkPolicies',
        content: `Securing multi-tenant Kubernetes clusters requires defense-in-depth:

1. Pod Security Standards (PSS): Enforces restricted execution profiles, forbidding privileged containers, host network namespaces, and root user execution.
2. NetworkPolicies: By default, all pods in Kubernetes can communicate freely. NetworkPolicies define L3/L4 firewall rules, isolating sensitive database pods from arbitrary web tier access.
3. Open Policy Agent (OPA) Gatekeeper: Admission controller that validates Kubernetes resource manifests against enterprise compliance policies before persisting to etcd (e.g., rejecting images without vulnerability scans).`
      },
      {
        pageNumber: 11,
        title: 'Page 11: Custom Resource Definitions & The Operator Pattern',
        content: `Kubernetes is not just a container runner; it is an extensible platform for running distributed stateful applications.

The Operator Pattern encodes human operational knowledge into software:
- Custom Resource Definition (CRD): Extends the Kubernetes API schema (e.g., 'kind: PostgresCluster').
- Custom Controller: Watches the CRD and continuously reconciles actual state against desired state.
- Automated Operations: Automatically initiates database backups, promotes read replicas during node failure, and executes rolling database upgrades without manual intervention.`
      },
      {
        pageNumber: 12,
        title: 'Page 12: eBPF-Based CNI: Cilium & Network Observability',
        content: `Traditional Kubernetes networking relies on Linux 'iptables' and 'kube-proxy'. As clusters grow to thousands of services, iptables rule lists expand to tens of thousands of entries, degrading network packet throughput.

Cilium replaces iptables with eBPF:
- Routing packets directly via eBPF sockops at the socket layer, bypassing kernel TCP/IP stack overhead.
- Identity-Aware Network Policies: Uses cryptographic security identities instead of volatile IP addresses.
- Hubble Observability: Provides real-time interactive service dependency maps and DNS latency monitoring with zero proxy sidecars.`
      },
      {
        pageNumber: 13,
        title: 'Page 13: Cluster Autoscaling: Karpenter vs Cluster Autoscaler',
        content: `Traditional Kubernetes Cluster Autoscaler scales by manipulating fixed cloud provider node groups (Auto Scaling Groups), often taking 5-10 minutes to provision new EC2/GCE instances.

AWS Karpenter revolutionized node provisioning:
- Group-less Autoscaling: Evaluates pending pod scheduling constraints directly against available cloud instance types.
- Bin Packing & Right-Sizing: Dynamically launches precisely sized spot or on-demand compute instances in under 45 seconds.
- Node Consolidation: Automatically relocates pods and terminates underutilized worker nodes, cutting cloud infrastructure costs by up to 40%.`
      },
      {
        pageNumber: 14,
        title: 'Page 14: Multi-Cluster Service Mesh with Istio Ambient Mode',
        content: `Classic service meshes inject an Envoy sidecar proxy into every application pod, multiplying memory consumption across thousands of microservices.

Istio Ambient Mode introduces a sidecarless architecture:
- ztunnel (Zero Trust Tunnel): A lightweight per-node proxy handling mutual TLS (mTLS) encryption and L4 identity enforcement.
- Waypoint Proxies: Optional, dynamically provisioned L7 proxies executing complex traffic routing, retries, and header mutations only for workloads that require them.
Ambient mode slashes proxy memory overhead by 80% while maintaining enterprise zero-trust security.`
      },
      {
        pageNumber: 15,
        title: 'Page 15: Disaster Recovery with Velero & CSI Volume Snapshots',
        content: `A resilient Kubernetes operational plan must survive catastrophic region-wide cloud outages:

Disaster Recovery architecture:
1. Velero: Automatically backs up Kubernetes resource configurations (Deployments, Secrets, CRDs) to encrypted cloud object storage buckets.
2. Container Storage Interface (CSI) Volume Snapshots: Triggers cloud storage hardware snapshots of persistent volumes synchronized with database write freezes.
3. Multi-Region Failover: Automated GitOps reconciliation synchronizes applications to a secondary cluster in an alternative cloud region, restoring production traffic in under 15 minutes.`
      }
    ]
  },

  // 14. DEFENSIVE CYBERSECURITY (15 PAGES)
  {
    id: 'book-cybersecurity',
    title: 'Defensive Cybersecurity, Cryptography & Threat Modeling',
    author: 'Bruce Schneier & Dr. Alistair Ross',
    category: 'cloud',
    badge: 'Cybersecurity',
    description: 'A 15-page handbook covering asymmetric cryptography, OWASP top 10 vulnerabilities, zero trust architecture, threat modeling, and post-quantum crypto.',
    coverEmoji: '🛡️',
    coverColor: 'from-red-700 to-slate-900',
    totalPages: 15,
    readPages: [],
    pages: [
      {
        pageNumber: 1,
        title: 'Page 1: The CIA Triad and Modern Threat Landscapes',
        content: `Information security is anchored on the foundational CIA Triad:
- Confidentiality: Ensuring sensitive data is accessible only to authorized entities through encryption, access control lists, and data masking.
- Integrity: Safeguarding the accuracy and completeness of data, preventing unauthorized tampering via cryptographic hash functions and digital signatures.
- Availability: Guaranteeing authorized users have timely access to resources through redundancy, DDoS mitigation, and disaster recovery architectures.

Modern cyber warfare has evolved beyond script kiddies into organized Advanced Persistent Threats (APTs) and automated ransomware syndicates targeting software supply chains.`
      },
      {
        pageNumber: 2,
        title: 'Page 2: Cryptographic Foundations: Symmetric vs Asymmetric',
        content: `Cryptography provides mathematical proofs of security:

1. Symmetric Encryption (AES-GCM, ChaCha20-Poly1305):
   - Uses the identical secret key for encryption and decryption.
   - Extremely fast, hardware-accelerated on modern CPUs (AES-NI).
   - Authenticated Encryption with Associated Data (AEAD) ensures confidentiality while detecting ciphertext tampering.

2. Asymmetric Encryption (RSA, Elliptic Curve Cryptography / ECC):
   - Employs a mathematically linked Key Pair: a Public Key (distributed freely) and a Private Key (kept secret).
   - Solves the key-exchange problem over untrusted channels via Diffie-Hellman Key Exchange.
   - ECC (Ed25519, ECDSA) delivers equal security to 3072-bit RSA with compact 256-bit keys.`
      },
      {
        pageNumber: 3,
        title: 'Page 3: Cryptographic Hash Functions & Password Hashing',
        content: `A cryptographic hash function maps arbitrary data to a fixed-size digest, satisfying three properties:
1. Pre-image resistance (One-way): Infeasible to compute original input from the hash.
2. Second pre-image resistance: Infeasible to find a different input with the same hash.
3. Collision resistance: Infeasible to find any two arbitrary inputs that yield identical hashes.

Password Storage Rule: NEVER use fast general-purpose hashes (MD5, SHA-256) for passwords! GPUs can compute billions of SHA-256 hashes per second.
Always use memory-hard, computationally expensive key derivation functions:
- Argon2id (Winner of the Password Hashing Competition).
- bcrypt and scrypt.
These algorithms incorporate random Salts and configurable Work Factors to defeat rainbow tables and ASIC crackers.`
      },
      {
        pageNumber: 4,
        title: 'Page 4: Transport Layer Security (TLS 1.3) Internals',
        content: `TLS encrypts web traffic between browsers and servers (HTTPS). TLS 1.3 represents a major security overhaul over TLS 1.2:

- Stripped Insecure Legacy Ciphers: Completely banned RC4, MD5, SHA-1, CBC mode, and static RSA key exchange.
- 1-RTT Handshake: Reduced the cryptographic handshake from two round-trips to a single round-trip, halving connection latency.
- Perfect Forward Secrecy (PFS): Ephemeral Diffie-Hellman keys are generated for each session. Even if an adversary compromises the server's long-term private key in the future, they cannot decrypt previously recorded network traffic.`
      },
      {
        pageNumber: 5,
        title: 'Page 5: Web Application Vulnerabilities: OWASP Top 10',
        content: `The Open Web Application Security Project (OWASP) indexes the most critical web risks:

- Injection (SQLi, NoSQLi): Untrusted user input alters database query logic. Defended via parameterized queries and prepared statements.
- Broken Access Control: Failure to verify authorization on every server endpoint (e.g., IDOR: changing 'user_id=10' in URL to access another user's profile).
- Cross-Site Scripting (XSS): Malicious JavaScript injected into pages viewed by victims. Prevented via contextual HTML escaping and strict Content Security Policy (CSP) headers.
- Cross-Site Request Forgery (CSRF): Defended using SameSite cookie attributes and anti-CSRF synchronizer tokens.`
      },
      {
        pageNumber: 6,
        title: 'Page 6: Identity Protocols: OAuth 2.0 and OpenID Connect (OIDC)',
        content: `Never build custom authentication protocols from scratch.

- OAuth 2.0 (Authorization): A delegation protocol that allows third-party applications to access resources on behalf of a user without seeing the user's password (e.g., "Allow app to access Google Drive files"). Uses Authorization Code Flow with PKCE (Proof Key for Code Exchange).
- OpenID Connect (Authentication): An identity layer built on top of OAuth 2.0 that issues signed ID Tokens (JWTs) containing verified identity claims (sub, email, name).`
      },
      {
        pageNumber: 7,
        title: 'Page 7: Software Supply Chain Security & SBOMs',
        content: `Modern software applications are assembled from hundreds of open-source third-party dependencies. Attackers exploit this via software supply chain compromises (e.g., malicious npm packages, typosquatting).

Supply chain defenses:
- Software Bill of Materials (SBOM): A formal, machine-readable inventory of all components, libraries, and modules used in a build (CycloneDX, SPDX).
- Dependency Scanning: Automated scanners (Trivy, Snyk, GitHub Dependabot) auditing lockfiles against National Vulnerability Database (NVD) CVE records.
- Binary Attestation: Cryptographically signing container images using Cosign/Sigstore in CI pipelines to verify build integrity.`
      },
      {
        pageNumber: 8,
        title: 'Page 8: Threat Modeling: The STRIDE Framework',
        content: `Threat modeling identifies system vulnerabilities during the design phase before writing code.

Microsoft's STRIDE model categorizes threats:
- Spoofing Identity: Pretending to be someone else (Countermeasure: Strong authentication, mTLS).
- Tampering with Data: Modifying data in transit or rest (Countermeasure: Cryptographic signatures, hashes).
- Repudiation: Denying performing an action (Countermeasure: Immutable audit logs).
- Information Disclosure: Exposing confidential data (Countermeasure: Encryption, least-privilege ACLs).
- Denial of Service: Exhausting resources (Countermeasure: Rate limiting, autoscaling).
- Elevation of Privilege: Gaining unauthorized admin access (Countermeasure: Role-Based Access Control / RBAC).`
      },
      {
        pageNumber: 9,
        title: 'Page 9: Cloud Security & Identity and Access Management (IAM)',
        content: `In public cloud environments (AWS, GCP, Azure), misconfigured permissions represent the #1 vulnerability vector.

Cloud security tenets:
1. Principle of Least Privilege: Entities receive strictly the minimum permissions required to perform their function.
2. Short-Lived Credentials: Avoid static long-lived IAM access keys. Use workload identity federation (OIDC) to grant ephemeral cloud tokens to Kubernetes pods or GitHub Actions runners.
3. Cloud Trail Auditing: Record and stream every API invocation across the cloud environment into append-only SIEM analytics.`
      },
      {
        pageNumber: 10,
        title: 'Page 10: Incident Response and Red Teaming',
        content: `Security is not a static state; it is an active operational discipline. "Assume Breach."

Incident Response lifecycle (NIST SP 800-61):
1. Preparation: Playbooks, contact rosters, and forensic tooling.
2. Detection & Analysis: SIEM correlation rules detecting anomalous behavior.
3. Containment: Isolating compromised instances and revoking active API session tokens.
4. Eradication & Recovery: Patching root-cause vulnerabilities and restoring verified backups.
5. Post-Incident Review: Conducting blameless post-mortems to fortify defenses against recurrence.`
      },
      {
        pageNumber: 11,
        title: 'Page 11: Supply Chain Security: Sigstore, Cosign & SLSA Framework',
        content: `Modern attackers increasingly target software build pipelines rather than hardened production networks.

Supply Chain Levels for Software Artifacts (SLSA):
- Level 1: Build process is fully scripted and automated.
- Level 2: Version-controlled source code and hosted build service.
- Level 3: Non-falsifiable build provenance generated in isolated build environments.

Sigstore Cosign:
Enables developers and CI/CD pipelines to cryptographically sign container images and software bills of materials (SBOMs) using keyless digital certificates tied to OpenID Connect (OIDC) identities, verified transparently by admission controllers.`
      },
      {
        pageNumber: 12,
        title: 'Page 12: Hardware Security Modules (HSMs) & Cloud KMS Enclaves',
        content: `Storing cryptographic private keys in software files on disk leaves them vulnerable to memory dumps and server compromises.

Hardware Security:
- Hardware Security Modules (HSM): Tamper-resistant physical cryptographic processors designed to store root keys and perform encryption operations without ever exposing the private key material.
- Cloud KMS (Key Management Service): Envelope Encryption model where data is encrypted using a local Data Encryption Key (DEK), and the DEK is encrypted using a Master Key (KEK) protected inside the HSM.
- Confidential Computing: AMD SEV and Intel SGX encrypt RAM in real time, preventing cloud hypervisors from inspecting virtual machine memory.`
      },
      {
        pageNumber: 13,
        title: 'Page 13: Post-Quantum Cryptography (PQC): Kyber & Dilithium',
        content: `The advent of fault-tolerant quantum computers will break traditional asymmetric algorithms (RSA, ECDSA, Diffie-Hellman) using Shor's Algorithm.

NIST Post-Quantum Standardization:
1. ML-KEM (CRYSTALS-Kyber): Lattice-based Key Encapsulation Mechanism for quantum-resistant secret key exchange.
2. ML-DSA (CRYSTALS-Dilithium): Lattice-based digital signature algorithm for document signing and TLS certificates.

Organizations are implementing "Hybrid TLS": combining classical ECDH with Kyber to protect today's network traffic against "Harvest Now, Decrypt Later" espionage campaigns.`
      },
      {
        pageNumber: 14,
        title: 'Page 14: MITRE ATT&CK Framework & Threat Hunting',
        content: `The MITRE ATT&CK framework is a globally recognized knowledge base of adversary tactics and techniques based on real-world observations.

Key Tactic Phases:
1. Initial Access: Phishing, exploitation of public-facing applications.
2. Execution: Command and Scripting Interpreters (PowerShell, bash).
3. Persistence: Modifying systemd units, scheduled cron jobs, SSH authorized_keys.
4. Privilege Escalation: SUID abuse, kernel exploit execution.
5. Lateral Movement: Pass-the-hash, SSH credential reuse.
Threat hunters proactively search through SIEM security logs (Elastic, Splunk) for indicators of attack matching specific ATT&CK IDs.`
      },
      {
        pageNumber: 15,
        title: 'Page 15: Red Team Simulation & Automated Breach Attack Simulation',
        content: `Theoretical security policies fail in real-world attacks. Red Teaming evaluates security posture through realistic adversary emulation:

Methodologies:
- Automated Breach and Attack Simulation (BAS): Continuously simulates attack techniques across enterprise endpoints to validate that detection rules and EDR tools are firing correctly.
- Purple Teaming: Collaborative drills where offensive red teamers and defensive blue teamers work side-by-side in real time to tune detection rules and eliminate blind spots.
True resilience is achieved when detection and automated containment happen within minutes of an intrusion.`
      }
    ]
  },

  // 15. SITE RELIABILITY ENGINEERING (15 PAGES)
  {
    id: 'book-sre-chaos',
    title: 'Site Reliability Engineering (SRE) & Chaos Architecture',
    author: 'Betsy Beyer & Niall Richard Murphy',
    category: 'cloud',
    badge: 'Reliability Engineering',
    description: 'A 15-page deep dive into SLIs, SLOs, error budgets, blameless post-mortems, Netflix chaos monkey testing, and 99.999% uptime architecture.',
    coverEmoji: '📈',
    coverColor: 'from-emerald-700 to-slate-900',
    totalPages: 15,
    readPages: [],
    pages: [
      {
        pageNumber: 1,
        title: 'Page 1: What is Site Reliability Engineering?',
        content: `Site Reliability Engineering (SRE) is what happens when you ask a software engineer to design an operations team. Developed at Google, SRE bridges the traditional rift between software development (pushing features fast) and system administration (keeping systems stable).

Core SRE tenets:
- Treat operations as a software engineering problem: Write automation code rather than performing manual tasks.
- Cap operational "Toil" at 50%: SREs must spend at least half their time writing engineering software that eliminates operational overhead.
- Accept failure as inevitable: Complex distributed systems will fail. Engineering efforts should focus on fast detection, containment, and mean time to recovery (MTTR).`
      },
      {
        pageNumber: 2,
        title: 'Page 2: Service Level Indicators (SLIs) and Objectives (SLOs)',
        content: `You cannot manage reliability without quantifiable metrics:

1. SLI (Service Level Indicator): A carefully defined quantitative measure of some aspect of the level of service that is provided (e.g., "The percentage of HTTP requests that return status 200 within 200 milliseconds").
2. SLO (Service Level Objective): A target value or range of values for a service level that is measured by an SLI (e.g., "SLI >= 99.9% availability over a rolling 30-day window").
3. SLA (Service Level Agreement): An explicit or implicit contract with users that includes business penalties if the SLO is breached.`
      },
      {
        pageNumber: 3,
        title: 'Page 3: The Power of Error Budgets',
        content: `An Error Budget is simply '1 - SLO'. For an SLO of 99.9% availability, the system has an error budget of 0.1% (allowing 43.8 minutes of downtime per month).

The Error Budget aligns incentives between Product and SRE teams:
- If the error budget is healthy and positive: The product engineering team is empowered to release features rapidly, experiment, and accept calculated risks.
- If the error budget is exhausted: Deployments are halted! All engineering cycles shift immediately to reliability, testing, bug fixes, and infrastructure stabilization until the budget recovers.`
      },
      {
        pageNumber: 4,
        title: 'Page 4: Eliminating Toil with Software Automation',
        content: `In SRE parlance, "Toil" is operational work that is manual, repetitive, automatable, devoid of enduring value, and scales linearly as the service grows (e.g., manually resetting server connections or generating database reports).

Toil robs engineering teams of creative problem-solving capacity and leads to engineer burnout. SRE teams track toil rigorously and prioritize engineering projects that automate repetitive workflows through self-healing controllers, cron jobs, and runbook automation.`
      },
      {
        pageNumber: 5,
        title: 'Page 5: Incident Management and Incident Command System',
        content: `When a Sev-1 production outage strikes, chaos must be replaced with structured military-grade incident command:

Incident Command roles:
- Incident Commander (IC): Leads the response, delegates tasks, and maintains overall operational focus. The IC does not debug code; they coordinate the investigation.
- Operations Lead: Directs the technical engineers executing diagnostics and applying mitigation fixes.
- Communications Lead: Responsible for keeping executive leadership, customer support, and public status pages informed, shielding the debugging team from external distractions.`
      },
      {
        pageNumber: 6,
        title: 'Page 6: Blameless Post-Mortems: The Culture of Learning',
        content: `Punishing engineers for human error guarantees that future mistakes will be concealed. SRE cultures mandate Blameless Post-Mortems.

Post-mortem principles:
- Humans do not wake up with the intent to bring down production. Failure occurs because systems and safety barriers permitted the failure to happen.
- Focus questions on: "What technical safeguard failed?", "Why did the monitoring fail to alert us earlier?", "How can we design the deployment pipeline so this class of mistake is mathematically impossible in the future?"
- Every post-mortem concludes with prioritized, assignable action items tracked in JIRA.`
      },
      {
        pageNumber: 7,
        title: 'Page 7: Distributed Tracing and Root-Cause Diagnostics',
        content: `In microservice topologies, a single user transaction may hop across 40 independent services. Finding the root cause of a latency spike using traditional isolated logs is impossible.

Distributed Tracing (OpenTelemetry):
- Propagates a global 'Trace ID' across all network boundaries in HTTP/gRPC metadata headers.
- Each service generates 'Span IDs' tracking local execution duration.
- Aggregated trace visualization (Jaeger, Honeycomb) exposes the critical path, highlighting downstream database lock contention or third-party API stalls instantaneously.`
      },
      {
        pageNumber: 8,
        title: 'Page 8: Chaos Engineering: The Principles of Chaos',
        content: `Chaos Engineering is the discipline of experimenting on a system in order to build confidence in the system's capability to withstand turbulent conditions in production.

Instead of waiting for an unpredicted hardware failure at 3 AM, SREs deliberately inject controlled failure during business hours:
- Terminating random Kubernetes pods (Chaos Monkey).
- Simulating network latency spikes between data centers.
- Cutting off database replica connections.

Hypothesis-driven testing verifies that circuit breakers trip, fallbacks engage, and user-facing SLOs remain unaffected.`
      },
      {
        pageNumber: 9,
        title: 'Page 9: Capacity Planning and Load Testing',
        content: `Capacity planning forecasts future compute, storage, and network resource demands before organic traffic growth overwhelms infrastructure:

Methodologies:
- Stress Testing: Gradually increasing synthetic load until system boundaries break, identifying primary bottleneck components (CPU, database connection pool, memory).
- Soak Testing: Sustaining moderate load over days to expose slow memory leaks or disk log saturation.
- Load Shedding: When incoming requests exceed maximum server capacity, the API gateway drops low-priority background traffic, preserving core checkout flows.`
      },
      {
        pageNumber: 10,
        title: 'Page 10: On-Call Health and Sustainable Engineering',
        content: `On-call rotations are the lifeblood of production stability, but unsustainable on-call destroys teams.

SRE guidelines for sustainable on-call:
- An engineer should not be woken up more than twice per 12-hour shift.
- Alerts must be actionable: If an alert does not require an immediate human action, it should not page an engineer; it should be a ticket or dashboard metric.
- Clear runbooks must accompany every firing alert, giving on-call responders step-by-step triage procedures.`
      },
      {
        pageNumber: 11,
        title: 'Page 11: Distributed Tracing & W3C TraceContext Ingestion',
        content: `In a monolithic application, stack traces point directly to line numbers. In a microservice ecosystem of 50 services, a user request spans dozens of asynchronous boundaries.

Distributed Tracing Architecture:
- Trace ID: A 128-bit globally unique identifier assigned at the API gateway that propagates through all downstream RPC calls via the standard 'traceparent' HTTP header.
- Spans: Represent individual units of work (e.g., executing a database SQL query or calling a cache).
- Trace Aggregation: OpenTelemetry collectors ingest spans and render flame graphs, pinpointing the exact microservice causing latency spikes in milliseconds.`
      },
      {
        pageNumber: 12,
        title: 'Page 12: Chaos Engineering: Chaos Mesh & Fault Injection',
        content: `Chaos engineering is the discipline of experimenting on a software system in order to build confidence in the system's capability to withstand turbulent conditions in production.

Chaos Mesh in Kubernetes:
- NetworkChaos: Injects artificial network latency (e.g., +200ms), packet loss, and network partition drops.
- PodChaos: Randomly terminates application pods or container processes.
- StressChaos: Injects CPU and memory hogs.
By intentionally triggering failures during working hours, teams identify missing circuit breakers and unhandled timeout bugs before they cause actual outages.`
      },
      {
        pageNumber: 13,
        title: 'Page 13: Canary Deployments & Automated Rollback with Flagger',
        content: `Deploying new versions directly to 100% of production traffic invites catastrophe. Canary deployments release changes gradually:

Canary automation with Flagger & Prometheus:
1. Direct 5% of production traffic to the new Canary release.
2. Monitor key SLIs (HTTP 5xx error rate and p99 latency) for 10 minutes.
3. If error rates remain below 0.1%, incrementally increase traffic (10%, 25%, 50%, 100%).
4. If the error threshold is breached at any stage, Flagger halts the promotion and rolls back traffic to the stable baseline in under 5 seconds with zero customer impact.`
      },
      {
        pageNumber: 14,
        title: 'Page 14: Latency Percentiles: p99 vs p99.9 and Coordinated Omission',
        content: `Relying on "average" latency is a critical engineering mistake: an average hides tail latency disasters that affect your most valuable, active power users.

Percentile Mastery:
- p50: Median user experience.
- p99: The 1 out of 100 requests that experienced slow processing.
- p99.9: Extreme tail latency caused by GC pauses, disk fsync stalls, or network packet retransmissions.

Beware of Coordinated Omission (Gil Tene):
Benchmark tools that wait for a response before sending the next request inadvertently omit measuring the queuing delay experienced by requests arriving while the server is stalled, drastically underestimating real-world p99 latency.`
      },
      {
        pageNumber: 15,
        title: 'Page 15: Operational Architecture for Five Nines (99.999%) Uptime',
        content: `Achieving 99.999% availability ("five nines") permits only 5.26 minutes of downtime PER YEAR across an entire platform.

Architectural prerequisites for Five Nines:
1. Multi-Region Active-Active: Traffic is served simultaneously from independent cloud geographic regions; a complete datacenter loss causes zero downtime.
2. Graceful Degradation: Non-essential features (recommendations, comments) degrade gracefully to static fallbacks if downstream systems fail.
3. Zero-Downtime Database Migrations: Expand-Contract schema updates, dual-writing, and asynchronous backfills.
4. Relentless Post-Mortem Culture: Every outage produces permanent, code-level architectural hardening.`
      }
    ]
  }
];
