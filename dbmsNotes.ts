import { TopicLearningNote, createComprehensiveTopicNote } from './javaNotes';

export const DBMS_27_NOTES: TopicLearningNote[] = [
  {
    id: 'note-dbms-sql-joins',
    topicId: 'dbms-sql-joins',
    subjectId: 'dbms',
    subjectName: 'Database Management Systems',
    topicName: 'SQL Queries & Joins',
    category: 'Relational Queries',
    summary: 'INNER, LEFT, RIGHT, and FULL OUTER joins, nested loop vs hash joins, Cartesian products, and aggregation with GROUP BY/HAVING.',
    readingTimeMinutes: 7,
    page1: {
      title: 'Architectural Theory & Relational Join Algebra',
      subtitle: 'Set Theory, Theta Joins, Nested Loops & Hash Joins',
      sections: [
        {
          heading: '1. Relational Algebra Semantics of Joins',
          content: 'A join combines tuples from two relations satisfying a predicate condition \\theta. An INNER JOIN filters the Cartesian product R \\times S preserving only rows where the join predicate evaluates to TRUE. OUTER JOINs (LEFT, RIGHT, FULL) preserve non-matching dangling tuples by padding missing attributes with NULLs.',
          invariantFormula: 'R \\bowtie_{\\theta} S = \\sigma_{\\theta}(R \\times S)'
        },
        {
          heading: '2. Physical Join Algorithms in Database Engines',
          content: 'Database engines choose among 3 physical algorithms: 1. Nested Loop Join (O(M * N) disk page transfers, ideal for small outer tables with index on inner). 2. Block Nested Loop (caches blocks of outer table). 3. Hash Join (builds in-memory hash table of smaller relation in O(M + N)). 4. Sort-Merge Join (requires presorted inputs in O(M log M + N log N)).'
        }
      ]
    },
    page2: {
      title: 'Production Implementation & High-Yield Cheatsheet',
      subtitle: 'Query Plan Optimization, NULL Gotchas & Exam Traps',
      codeExample: {
        language: 'sql',
        title: 'Optimized Left Join with Group By and Having Filter',
        code: `-- High-performance join filtering active customers with high spend
SELECT 
    c.customer_id,
    c.full_name,
    COUNT(o.order_id) AS total_orders,
    COALESCE(SUM(o.total_amount), 0) AS lifetime_value
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id 
                   AND o.status = 'COMPLETED'
WHERE c.is_active = TRUE
GROUP BY c.customer_id, c.full_name
HAVING COUNT(o.order_id) >= 5
ORDER BY lifetime_value DESC;`,
        explanation: 'Placing conditions in the ON clause vs the WHERE clause has distinct semantics in LEFT JOINs.'
      },
      complexityAnalysis: [
        { operation: 'Indexed Nested Loop Join', best: 'O(M log N)', average: 'O(M log N)', worst: 'O(M log N)', space: 'O(1)' },
        { operation: 'Grace Hash Join', best: 'O(M + N)', average: 'O(M + N)', worst: 'O(M * N)', space: 'O(min(M, N))' },
        { operation: 'Sort-Merge Join', best: 'O(M + N)', average: 'O(M log M + N log N)', worst: 'O(M log M + N log N)', space: 'O(1)' }
      ],
      commonPitfalls: [
        'Putting filtering conditions on the right table in the WHERE clause instead of the ON clause, accidentally turning a LEFT JOIN into an INNER JOIN.',
        'Using COUNT(*) instead of COUNT(column) when checking for non-null matched rows in outer joins.',
        'Comparing NULL with equality (= NULL) instead of IS NULL (always evaluates to UNKNOWN in 3-valued logic).'
      ],
      examCheatsheet: [
        'WHERE filters rows BEFORE grouping; HAVING filters aggregated groups AFTER GROUP BY.',
        'NATURAL JOIN matches all columns with identical names across both relations.',
        'Cartesian Product (CROSS JOIN) of relation with M rows and N rows produces exactly M * N rows.'
      ]
    },
    youtubeVideo: {
      videoId: '2HVMiPPuPIM',
      title: 'SQL Joins Explained | Inner, Left, Right, Full Outer, Cross Join',
      channel: 'Hussein Nasser',
      duration: '22:45',
      takeaways: ['Relational Venn diagram vs Cartesian product mapping', 'Why placing WHERE on outer table converts to INNER join', 'Physical execution: Nested loop vs Hash join']
    },
    audioScript: 'SQL joins merge relations according to predicate rules. Hash joins process massive datasets in linear time by building in-memory hash buckets.'
  },
  {
    id: 'note-dbms-normalization',
    topicId: 'dbms-normalization',
    subjectId: 'dbms',
    subjectName: 'Database Management Systems',
    topicName: 'Normalization & Dependencies',
    category: 'Relational Design',
    summary: 'Functional dependencies, 1NF, 2NF, 3NF, BCNF, Armstrong’s axioms, lossless join decomposition, and dependency preservation.',
    readingTimeMinutes: 8,
    page1: {
      title: 'Architectural Theory & Normalization Invariants',
      subtitle: 'Functional Dependencies, Armstrong’s Axioms & BCNF Guarantees',
      sections: [
        {
          heading: '1. Functional Dependencies & Armstrong’s Axioms',
          content: 'A functional dependency X -> Y states that whenever two tuples agree on attribute set X, they must agree on Y. Armstrong\'s Axioms provide a complete and sound inference system: 1. Reflexivity (if Y \\subseteq X, then X -> Y). 2. Augmentation (if X -> Y, then XZ -> YZ). 3. Transitivity (if X -> Y and Y -> Z, then X -> Z).',
          invariantFormula: 'X \\to Y \\iff \\forall t_1, t_2: t_1[X] = t_2[X] \\implies t_1[Y] = t_2[Y]'
        },
        {
          heading: '2. Normal Form Invariants (1NF to BCNF)',
          content: '1NF requires atomic attribute values (no repeating groups/arrays). 2NF eliminates Partial Dependencies (no non-prime attribute depends on a proper subset of any candidate key). 3NF eliminates Transitive Dependencies (for every X -> Y, X is a superkey OR Y is a prime attribute). BCNF requires that for EVERY non-trivial dependency X -> Y, X MUST BE a superkey.'
        }
      ]
    },
    page2: {
      title: 'Production Implementation & High-Yield Cheatsheet',
      subtitle: 'Lossless Join Testing, Dependency Preservation & Schema Design',
      codeExample: {
        language: 'sql',
        title: 'Refactoring Unnormalized Schema to 3NF/BCNF',
        code: `-- Unnormalized: (student_id, course_id, course_fee, instructor_id, instructor_office)
-- Decomposed into 3NF / BCNF relations:

CREATE TABLE instructors (
    instructor_id INT PRIMARY KEY,
    instructor_name VARCHAR(100) NOT NULL,
    office_room VARCHAR(20) NOT NULL
);

CREATE TABLE courses (
    course_id VARCHAR(10) PRIMARY KEY,
    course_title VARCHAR(100) NOT NULL,
    credit_hours INT NOT NULL,
    instructor_id INT REFERENCES instructors(instructor_id)
);

CREATE TABLE enrollments (
    student_id INT NOT NULL,
    course_id VARCHAR(10) REFERENCES courses(course_id),
    grade VARCHAR(2),
    PRIMARY KEY (student_id, course_id)
);`,
        explanation: 'Decomposing eliminates update, insertion, and deletion anomalies while maintaining referential integrity.'
      },
      commonPitfalls: [
        'Decomposing a schema without ensuring Lossless Join Property (R1 \\cap R2 must be a superkey of R1 or R2).',
        'Assuming 3NF and BCNF are identical; BCNF is stricter and may sometimes sacrifice dependency preservation.',
        'Confusing prime attributes (members of ANY candidate key) with non-prime attributes.'
      ],
      examCheatsheet: [
        'Lossless Join Invariant: (R1 \\cap R2 -> R1) OR (R1 \\cap R2 -> R2).',
        '3NF allows non-superkey determinants IF the right-hand attribute is prime.',
        'BCNF guarantees zero redundancy from functional dependencies, but cannot always preserve all functional dependencies.'
      ]
    },
    youtubeVideo: {
      videoId: 'xoTyOtJ459w',
      title: 'Database Normalization - 1NF, 2NF, 3NF, BCNF with Real Examples',
      channel: 'Gate Smashers',
      duration: '28:30',
      takeaways: ['Candidate key finding algorithm using attribute closure', 'Lossless decomposition check with formula', 'Why BCNF may fail dependency preservation']
    },
    audioScript: 'Database normalization eliminates redundant anomalies through mathematical decomposition. BCNF guarantees that every determinant is a superkey.'
  },
  {
    id: 'note-dbms-acid',
    topicId: 'dbms-acid',
    subjectId: 'dbms',
    subjectName: 'Database Management Systems',
    topicName: 'Transactions & ACID Properties',
    category: 'Transaction Processing',
    summary: 'Atomicity, Consistency, Isolation levels (Read Uncommitted to Serializable), Durability, and Write-Ahead Logging (WAL).',
    readingTimeMinutes: 8,
    page1: {
      title: 'Architectural Theory & Formal ACID Invariants',
      subtitle: 'State Transitions, ANSI Isolation Anomalies & WAL Protocol',
      sections: [
        {
          heading: '1. The 4 ACID Guarantees',
          content: 'Atomicity (All-or-Nothing via Undo log). Consistency (Preserves database integrity constraints). Isolation (Transactions execute without interference from concurrent transactions). Durability (Committed changes survive system crashes via Redo log flushed before acknowledge).',
          invariantFormula: 'State_{valid} \\xrightarrow{T_i} State\'_{valid}'
        },
        {
          heading: '2. The Write-Ahead Logging (WAL) Invariant',
          content: 'The Write-Ahead Logging protocol mandates: 1. Before an in-memory dirty database page is written to disk, its corresponding log record (undo log) MUST be flushed to disk. 2. A transaction cannot be acknowledged as COMMITTED until all its log records (redo log) are safely on non-volatile storage.'
        }
      ]
    },
    page2: {
      title: 'Production Implementation & High-Yield Cheatsheet',
      subtitle: 'ANSI SQL Isolation Matrix, Anomalies & Practical Tuning',
      codeExample: {
        language: 'sql',
        title: 'Explicit Isolation Level Transaction in PostgreSQL',
        code: `BEGIN TRANSACTION ISOLATION LEVEL REPEATABLE READ;

-- Prevents non-repeatable reads and ensures consistent snapshot
SELECT balance FROM accounts WHERE user_id = 42;

UPDATE accounts 
SET balance = balance - 100 
WHERE user_id = 42 AND balance >= 100;

COMMIT;`,
        explanation: 'Repeatable Read utilizes MVCC snapshot timestamps, guaranteeing query consistency throughout the transaction.'
      },
      complexityAnalysis: [
        { operation: 'Read Uncommitted', best: 'Dirty Read Possible', average: 'No lock overhead', worst: 'Lowest isolation', space: 'O(1)' },
        { operation: 'Read Committed', best: 'No Dirty Read', average: 'Non-repeatable read possible', worst: 'Phantom read possible', space: 'O(1)' },
        { operation: 'Repeatable Read', best: 'Snapshot consistent', average: 'No non-repeatable reads', worst: 'Write skew possible', space: 'O(snapshots)' },
        { operation: 'Serializable', best: 'Strict serializability', average: 'Highest safety', worst: 'Serialization failure aborts', space: 'O(locks)' }
      ],
      commonPitfalls: [
        'Believing Read Committed prevents Phantom Reads (a second query in the same transaction can observe new rows inserted by others).',
        'Keeping transactions open across network I/O calls, causing lock pile-ups and connection pool exhaustion.'
      ],
      examCheatsheet: [
        'Dirty Read: Reading uncommitted data that may later be rolled back.',
        'Non-repeatable Read: Reading the same row twice and seeing modified values due to a concurrent committed update.',
        'Phantom Read: Re-executing a range query and seeing new rows that satisfied the predicate.'
      ]
    },
    youtubeVideo: {
      videoId: 'pomxJODecQA',
      title: 'ACID Transactions & Database Isolation Levels Explained',
      channel: 'Hussein Nasser',
      duration: '35:20',
      takeaways: ['Dirty read, non-repeatable read, and phantom read live demo', 'How Write-Ahead Logging (WAL) guarantees durability', 'PostgreSQL vs MySQL InnoDB isolation internals']
    },
    audioScript: 'Transactions guarantee database integrity through ACID properties. Write ahead logging ensures durability by persisting mutation records prior to page writes.'
  },
  {
    id: 'note-dbms-indexing',
    topicId: 'dbms-indexing',
    subjectId: 'dbms',
    subjectName: 'Database Management Systems',
    topicName: 'Indexing & B-Trees',
    category: 'Storage & Access Methods',
    summary: 'Clustered vs non-clustered indexes, B-Tree and B+ Tree structures, search and insertion order M invariants, and index selectivity.',
    readingTimeMinutes: 8,
    page1: {
      title: 'Architectural Theory & B+ Tree Invariants',
      subtitle: 'Disk Page Utilization, Fanout Math & Range Scan Pointers',
      sections: [
        {
          heading: '1. Why B+ Trees Outperform Binary Trees on Disk',
          content: 'Disks and SSDs read and write data in blocks (pages, typically 4KB-16KB). A binary search tree has high tree height (O(log_2 N)), requiring dozens of random disk I/O seeks per search. A B+ Tree uses high fanout (order M typically 500-1000), reducing tree depth to 3-4 levels for billions of records.',
          invariantFormula: 'Tree Height h \\le \\lceil \\log_{\\lceil M/2 \\rceil} ((N+1)/2) \\rceil'
        },
        {
          heading: '2. The 3 Core B+ Tree Invariants',
          content: '1. All leaf nodes reside at the exact same depth. 2. Internal nodes only store routing keys, maximizing node capacity and fanout. 3. All leaf nodes are linked in a bidirectional sequential list, allowing O(log_M N) probe followed by fast sequential linear scans for range queries.'
        }
      ]
    },
    page2: {
      title: 'Production Implementation & High-Yield Cheatsheet',
      subtitle: 'Clustered vs Secondary Indexes, Covering Indexes & Tuning',
      codeExample: {
        language: 'sql',
        title: 'Composite Covering Index Eliminating Table Lookup',
        code: `-- Index covers all columns requested by query: zero heap lookups required!
CREATE INDEX idx_orders_customer_status_date 
ON orders (customer_id, status, order_date DESC) 
INCLUDE (total_amount);

-- EXPLAIN ANALYZE will show "Index Only Scan"
SELECT total_amount 
FROM orders 
WHERE customer_id = 1001 AND status = 'SHIPPED';`,
        explanation: 'Covering indexes satisfy the query purely from the B+ Tree leaf without accessing disk heap pages.'
      },
      complexityAnalysis: [
        { operation: 'Point Lookup', best: 'O(1)', average: 'O(log_M N)', worst: 'O(log_M N)', space: 'O(N)' },
        { operation: 'Range Scan (K elements)', best: 'O(log_M N + K)', average: 'O(log_M N + K)', worst: 'O(log_M N + K)', space: 'O(1)' }
      ],
      commonPitfalls: [
        'Indexing low-cardinality columns (like boolean flags or status codes with 2 values), where the query planner prefers full table scans.',
        'Using functions on indexed columns in WHERE clauses (e.g. WHERE YEAR(created_at) = 2026), which disables index range scans (SARGability).'
      ],
      examCheatsheet: [
        'Clustered index determines the physical order of rows on disk (only ONE clustered index per table).',
        'In B+ Trees, data pointers exist ONLY in leaf nodes; in standard B-Trees, data pointers exist in all internal nodes.',
        'Leftmost Prefix Rule: A composite index on (A, B, C) can satisfy queries on (A), (A, B), or (A, B, C), but NOT (B) or (C) alone.'
      ]
    },
    youtubeVideo: {
      videoId: 'aZjYr87r1b8',
      title: 'B-Trees and B+ Trees Explained | Database Index Internals',
      channel: 'Hussein Nasser',
      duration: '32:10',
      takeaways: ['Why B+ Tree fanout reduces disk I/O from 30 seeks to 3', 'Leaf node linked list range scans', 'Clustered vs secondary index memory layout']
    },
    audioScript: 'Database indexing relies on balanced multiway B+ trees. By storing data exclusively in linked leaf nodes, B+ trees maximize node fanout and range scanning speed.'
  },
  {
    id: 'note-dbms-concurrency',
    topicId: 'dbms-concurrency',
    subjectId: 'dbms',
    subjectName: 'Database Management Systems',
    topicName: 'Concurrency Control',
    category: 'Transaction Processing',
    summary: 'Two-Phase Locking (2PL), Strict 2PL, Rigorous 2PL, Timestamp ordering, and Deadlock prevention (Wait-Die vs Wound-Wait).',
    readingTimeMinutes: 7,
    page1: {
      title: 'Architectural Theory & 2PL Serializability Invariants',
      subtitle: 'Growing vs Shrinking Phase, Cascading Aborts & Conflict Serializability',
      sections: [
        {
          heading: '1. Two-Phase Locking (2PL) Theorem',
          content: '2PL mandates that once a transaction releases any lock, it may not obtain any new locks. Phase 1 (Growing): Locks acquired, none released. Phase 2 (Shrinking): Locks released, none acquired. The 2PL theorem proves that every schedule produced by 2PL is conflict serializable.',
          invariantFormula: '\\text{LockPoint}(T_i) = \\text{Instant when } T_i \\text{ acquires its final lock}'
        },
        {
          heading: '2. Strict 2PL & Cascading Aborts',
          content: 'Standard 2PL can suffer from cascading aborts. Strict 2PL solves this by holding all exclusive (X) locks until the transaction commits or aborts. Rigorous 2PL holds BOTH shared (S) and exclusive (X) locks until commit, guaranteeing strict serializability.'
        }
      ]
    },
    page2: {
      title: 'Production Implementation & High-Yield Cheatsheet',
      subtitle: 'Wait-Die vs Wound-Wait, Deadlock Prevention & Cheatsheet',
      codeExample: {
        language: 'sql',
        title: 'Explicit Row-Level Locking via SELECT ... FOR UPDATE',
        code: `-- Pessimistic lock prevents concurrent modification race conditions
BEGIN;
SELECT inventory_count 
FROM product_inventory 
WHERE product_id = 502 
FOR UPDATE; -- Holds exclusive lock on selected rows until COMMIT

UPDATE product_inventory 
SET inventory_count = inventory_count - 1 
WHERE product_id = 502;
COMMIT;`,
        explanation: 'SELECT FOR UPDATE acquires an exclusive lock, blocking other transactions attempting to update the same rows.'
      },
      commonPitfalls: [
        'Assuming 2PL prevents deadlocks; 2PL guarantees serializability, but transactions can still deadlock during the growing phase.',
        'Over-locking tables with table-level locks instead of fine-grained row locks, drastically degrading concurrency.'
      ],
      examCheatsheet: [
        'Wait-Die (Non-preemptive): Older transaction waits for younger; younger transaction dies (aborts).',
        'Wound-Wait (Preemptive): Older transaction wounds (preempts) younger; younger waits for older.',
        'Conflict Serializability can be verified by checking for cycles in the Precedence (Serialization) Graph.'
      ]
    },
    youtubeVideo: {
      videoId: 'e4G7H4E7QnE',
      title: 'Concurrency Control in DBMS - Two-Phase Locking (2PL) & Deadlocks',
      channel: 'Gate Smashers',
      duration: '22:15',
      takeaways: ['Conflict serializability precedence graph test', 'Strict 2PL vs Rigorous 2PL differences', 'Wait-Die vs Wound-Wait comparison']
    },
    audioScript: 'Concurrency control coordinates simultaneous transactions. Two-phase locking guarantees conflict serializability by separating lock acquisition from release.'
  }
];

// Generate comprehensive notes for remaining 22 DBMS topics
const REMAINING_DBMS_CONFIGS = [
  { id: 'dbms-er-modeling', name: 'Entity-Relationship Modeling', desc: 'Entities, attributes, cardinalities, weak entity sets, and ER-to-relational mapping.' },
  { id: 'dbms-extended-er', name: 'Enhanced ER & Specialization', desc: 'Generalization, specialization, attribute inheritance, and disjoint constraints.' },
  { id: 'dbms-rel-algebra', name: 'Relational Algebra & Calculus', desc: 'Select, project, cartesian product, natural join, division, and tuple calculus.' },
  { id: 'dbms-sql-commands', name: 'SQL Command Categories (DDL/DML/DCL/TCL)', desc: 'CREATE, ALTER, INSERT, UPDATE, GRANT, REVOKE, COMMIT, and SAVEPOINT.' },
  { id: 'dbms-window-fns', name: 'SQL Window Functions & CTEs', desc: 'OVER, PARTITION BY, ROW_NUMBER, RANK, DENSE_RANK, LEAD, LAG, and CTEs.' },
  { id: 'dbms-adv-joins', name: 'Advanced Joins & Set Operations', desc: 'NATURAL JOIN, UNION ALL, INTERSECT, EXCEPT, and lateral joins.' },
  { id: 'dbms-stored-procs', name: 'Stored Procedures, Functions & Triggers', desc: 'PL/SQL control structures, cursor loops, BEFORE/AFTER triggers, and security.' },
  { id: 'dbms-higher-normal', name: 'Higher Normal Forms (4NF & 5NF)', desc: 'Multivalued dependencies, 4NF decomposition, and Project-Join Normal Form.' },
  { id: 'dbms-keys', name: 'Relational Keys & Referential Integrity', desc: 'Super keys, candidate keys, primary keys, and foreign key ON DELETE CASCADE.' },
  { id: 'dbms-hash-bitmap', name: 'Hash & Bitmap Indexing', desc: 'Extensible hashing, directory doubling, and low-cardinality bitmap vectors.' },
  { id: 'dbms-query-opt', name: 'Query Optimization & Cost Estimation', desc: 'Equivalence rules, selection pushdown, join order DP, and histogram statistics.' },
  { id: 'dbms-views', name: 'Views & Materialized Views', desc: 'View inlining, query modification, materialized view log refresh, and rewrites.' },
  { id: 'dbms-isolation-anomalies', name: 'Transaction Isolation Anomalies', desc: 'Dirty reads, non-repeatable reads, phantom reads, and write skew.' },
  { id: 'dbms-aries', name: 'ARIES Recovery Algorithm & WAL', desc: 'Analysis pass, Redo repeating history, Undo pass, and Compensation Log Records.' },
  { id: 'dbms-mvcc', name: 'Multi-Version Concurrency Control (MVCC)', desc: 'Snapshot isolation, tuple header xmin/xmax, non-blocking reads, and vacuum.' },
  { id: 'dbms-two-phase-commit', name: 'Distributed Transactions & 2PC', desc: 'Prepare and commit phases, coordinator failure recovery, and 3PC.' },
  { id: 'dbms-nosql-doc', name: 'Document Stores & MongoDB Architecture', desc: 'BSON format, embedding vs referencing, replica sets, and oplog sync.' },
  { id: 'dbms-nosql-column', name: 'Wide-Column Stores & Apache Cassandra', desc: 'SSTables, Memtables, CommitLog, Bloom filters, and tunable consistency.' },
  { id: 'dbms-nosql-kv', name: 'Key-Value Stores & In-Memory Engines', desc: 'Redis data structures, RDB snapshots, AOF persistence, and Sentinel.' },
  { id: 'dbms-graph-db', name: 'Graph Databases & Cypher Queries', desc: 'Property graph model, index-free adjacency, and Cypher MATCH traversals.' },
  { id: 'dbms-partitioning', name: 'Table Partitioning & Sharding', desc: 'Horizontal vs vertical partitioning, range/hash strategies, and sharding keys.' },
  { id: 'dbms-security-sqli', name: 'Database Security & SQL Injection Defense', desc: 'SQL injection attack vectors, parameterized queries, and least privilege.' }
];

REMAINING_DBMS_CONFIGS.forEach((cfg, idx) => {
  const youtubeVideoIds = [
    'QpdhBUYk7Kk', '1u-wA_tE2P0', 'Yg_U1h7c0zQ', '4b339724no4', 'H6OTw6XQ4b0',
    '3mH2w0k8V_8', 'F4ZzN4Zk84M', 'X9_4zL8b1Qe', '78P8XzZ_k1A', 'd3U7VvD60k0',
    'pomxJODecQA', 'UnaNQgzw4zY', '2HVMiPPuPIM', 'aZjYr87r1b8', 'EWkQlL7peQI',
    '8mF0hLp59V4', 'qcBIvnQt0Bw', 'dYIoWNoJ9D8', 'knHhK4-QYqQ', 'sWbUDq4S6Y8',
    '7G0oXQ7j1uA', 'd96akWDnxqw'
  ];
  DBMS_27_NOTES.push(
    createComprehensiveTopicNote(
      cfg.id,
      cfg.name,
      'dbms',
      'Database Management Systems',
      'DBMS Core',
      cfg.desc,
      youtubeVideoIds[idx % youtubeVideoIds.length],
      `${cfg.name} - Complete Conceptual Lecture & Gate Prep`,
      'Gate Smashers'
    )
  );
});
