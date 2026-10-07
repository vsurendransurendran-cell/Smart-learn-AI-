import { JobRoleRecommendation } from '../types';

export const JOB_ROLES_CATALOG: JobRoleRecommendation[] = [
  {
    id: 'role-backend-distributed',
    title: 'Backend & Distributed Systems Engineer',
    shortTitle: 'Backend Engineer',
    icon: 'Server',
    demandLevel: 'Explosive',
    averageSalaryUs: '$145,000 - $210,000',
    averageSalaryInr: '₹22 - ₹48 LPA',
    roleSummary: 'Architect high-throughput microservices, distributed transaction pipelines, fault-tolerant consensus systems, and ultra-low latency APIs.',
    description: 'Specializes in server-side computing, distributed state machines, database sharding, caching tiers, asynchronous message brokers, and concurrency safety.',
    recommendedSkills: [
      { name: 'Multithreading & Concurrency', category: 'Core Computer Science', level: 'Essential', description: 'Locks, CAS primitives, memory barriers, thread safety, and thread pools.' },
      { name: 'Distributed Transactions & ACID', category: 'Core Computer Science', level: 'Essential', description: 'Two-phase commit, MVCC, isolation levels, write-ahead logging.' },
      { name: 'B-Trees & Database Indexing', category: 'Core Computer Science', level: 'Essential', description: 'Query plan optimization, clustering keys, and index selectivity.' },
      { name: 'Microservices & gRPC/REST', category: 'Architecture', level: 'Essential', description: 'Idempotency keys, Circuit breakers, rate limiters, distributed tracing.' },
      { name: 'Kafka / Event-Driven Systems', category: 'Cloud & Systems', level: 'Recommended', description: 'Partitioning semantics, consumer groups, exactly-once delivery.' },
      { name: 'Virtual Threads & Non-Blocking I/O', category: 'Frameworks & Tools', level: 'Advanced', description: 'NIO channels, Project Loom, reactive streams.' }
    ],
    recommendedLanguages: [
      { name: 'Java', type: 'Programming', reason: 'Industry standard for enterprise distributed systems (Spring Boot, Kafka, Netty).', trackId: 'track-java' },
      { name: 'Go (Golang)', type: 'Programming', reason: 'High concurrency, lightweight goroutines, and standard for Kubernetes/Docker tooling.', trackId: 'track-go' },
      { name: 'SQL', type: 'Programming', reason: 'Complex analytical queries, index design, window functions, and transaction tuning.', trackId: 'track-sql' },
      { name: 'Tech English', type: 'Spoken', reason: 'Global engineering RFCs, system architecture reviews, and sprint planning.' }
    ],
    recommendedTopicIds: [
      'java-concurrency', 'java-memory', 'java-spring-ioc', 'java-spring-rest', 'java-loom',
      'os-sync-deadlock', 'os-ipc', 'os-distributed', 'os-hw-sync',
      'dbms-acid', 'dbms-indexing', 'dbms-concurrency', 'dbms-mvcc', 'dbms-two-phase-commit', 'dbms-partitioning',
      'dsa-hash-tables', 'dsa-b-trees', 'dsa-heaps', 'dsa-graphs'
    ],
    recommendedCertifications: [
      { title: 'Google Cloud Associate Cloud Engineer', provider: 'Google', url: 'https://cloud.google.com/learn/certification/cloud-engineer', duration: '6-8 weeks' },
      { title: 'AWS Certified Solutions Architect', provider: 'AWS', url: 'https://aws.amazon.com/certification/certified-solutions-architect-associate/', duration: '8 weeks' },
      { title: 'IBM Backend Application Development MicroBachelors', provider: 'IBM', url: 'https://www.edx.org/certificates/microbachelors/ibm-backend-application-development', duration: '12 weeks' }
    ]
  },
  {
    id: 'role-fullstack',
    title: 'Full Stack Web & Application Engineer',
    shortTitle: 'Full Stack Engineer',
    icon: 'Layers',
    demandLevel: 'Very High',
    averageSalaryUs: '$130,000 - $185,000',
    averageSalaryInr: '₹18 - ₹36 LPA',
    roleSummary: 'Build end-to-end modern web applications combining responsive client experiences with scalable REST/GraphQL APIs and relational/NoSQL backends.',
    description: 'Bridges frontend engineering (TypeScript, React, performance optimization, state management) with backend architecture (REST, ORMs, authentication, database design).',
    recommendedSkills: [
      { name: 'Modern TypeScript & JavaScript', category: 'Frameworks & Tools', level: 'Essential', description: 'Async/await, closures, prototypes, type narrowing, and build tooling.' },
      { name: 'Relational Database Design & SQL', category: 'Core Computer Science', level: 'Essential', description: 'Normalization, joins, constraints, foreign keys, and indexes.' },
      { name: 'REST & GraphQL API Design', category: 'Architecture', level: 'Essential', description: 'Status codes, authentication (JWT/OAuth), pagination, and caching headers.' },
      { name: 'Browser Internals & DOM Tree', category: 'Core Computer Science', level: 'Recommended', description: 'Critical rendering path, event loops, WebSockets, and service workers.' },
      { name: 'System Security & OWASP Top 10', category: 'Architecture', level: 'Essential', description: 'SQL injection defense, XSS, CSRF, CORS, and least privilege principles.' }
    ],
    recommendedLanguages: [
      { name: 'TypeScript', type: 'Programming', reason: 'Full-stack type safety across frontend React apps and Node/Next.js backends.', trackId: 'track-typescript' },
      { name: 'Python', type: 'Programming', reason: 'Fast backend prototyping with FastAPI/Django and scripting automation.', trackId: 'track-python' },
      { name: 'SQL', type: 'Programming', reason: 'Essential for relational data modeling and querying Postgres/MySQL.', trackId: 'track-sql' },
      { name: 'Spanish', type: 'Spoken', reason: 'Expanding remote international tech markets across Europe and the Americas.' }
    ],
    recommendedTopicIds: [
      'java-spring-rest', 'java-http', 'java-testing',
      'dbms-sql-joins', 'dbms-normalization', 'dbms-acid', 'dbms-views', 'dbms-nosql-doc', 'dbms-security-sqli',
      'os-pcb', 'os-ipc',
      'dsa-arrays-strings', 'dsa-hash-tables', 'dsa-stacks-queues'
    ],
    recommendedCertifications: [
      { title: 'Meta Front-End & Back-End Developer Professional Certificate', provider: 'Meta', url: 'https://www.coursera.org/professional-certificates/meta-front-end-developer', duration: '8 weeks' },
      { title: 'Microsoft Certified: Azure Developer Associate (AZ-204)', provider: 'Microsoft', url: 'https://learn.microsoft.com/en-us/credentials/certifications/azure-developer/', duration: '6-8 weeks' }
    ]
  },
  {
    id: 'role-ai-ml',
    title: 'AI & Machine Learning Systems Engineer',
    shortTitle: 'AI / ML Engineer',
    icon: 'Brain',
    demandLevel: 'Explosive',
    averageSalaryUs: '$160,000 - $235,000',
    averageSalaryInr: '₹25 - ₹55 LPA',
    roleSummary: 'Develop machine learning pipelines, LLM fine-tuning loops, neural network architectures, vector retrieval pipelines, and scalable inference backends.',
    description: 'Combines mathematical rigor, asymptotic analysis, matrix algebra, and large-scale parallel processing to build production AI systems.',
    recommendedSkills: [
      { name: 'Computational Complexity & Asymptotics', category: 'Core Computer Science', level: 'Essential', description: 'Big-O, Master Theorem, memory locality in matrix multiplication.' },
      { name: 'Vector Embeddings & Spatial Search', category: 'Core Computer Science', level: 'Essential', description: 'KD-Trees, cosine similarity, HNSW nearest-neighbor search.' },
      { name: 'Multithreading & GPU Parallelism', category: 'Core Computer Science', level: 'Recommended', description: 'SIMD instructions, CUDA concepts, and asynchronous pipelines.' },
      { name: 'Data Pipeline Engineering', category: 'Frameworks & Tools', level: 'Essential', description: 'Feature stores, batch vs streaming pipelines, and dataset versioning.' }
    ],
    recommendedLanguages: [
      { name: 'Python', type: 'Programming', reason: 'The unquestioned linga franca of machine learning, PyTorch, NumPy, and Hugging Face.', trackId: 'track-python' },
      { name: 'C++', type: 'Programming', reason: 'High-performance model inference kernels, tensor runtimes (ONNX, llama.cpp), and memory layout.', trackId: 'track-cpp' },
      { name: 'SQL', type: 'Programming', reason: 'Extracting training batches, feature engineering, and data warehouse analytics.', trackId: 'track-sql' },
      { name: 'Tech English', type: 'Spoken', reason: 'Reading arXiv machine learning research papers and contributing to open-source models.' }
    ],
    recommendedTopicIds: [
      'dsa-asymptotics', 'dsa-spatial', 'dsa-divide-conquer', 'dsa-heaps', 'dsa-graphs', 'dsa-randomized',
      'os-virtual-mem', 'os-paging', 'os-dma',
      'dbms-indexing', 'dbms-partitioning', 'dbms-nosql-column',
      'java-forkjoin', 'java-concurrency'
    ],
    recommendedCertifications: [
      { title: 'Google Professional Machine Learning Engineer', provider: 'Google', url: 'https://cloud.google.com/learn/certification/machine-learning-engineer', duration: '10 weeks' },
      { title: 'IBM AI Engineering Professional Certificate', provider: 'IBM', url: 'https://www.coursera.org/professional-certificates/ibm-ai-engineer', duration: '8 weeks' }
    ]
  },
  {
    id: 'role-devops-cloud',
    title: 'Cloud & DevOps Platform Architect',
    shortTitle: 'Cloud / DevOps Architect',
    icon: 'Cloud',
    demandLevel: 'Very High',
    averageSalaryUs: '$140,000 - $205,000',
    averageSalaryInr: '₹20 - ₹45 LPA',
    roleSummary: 'Design resilient multi-region cloud infrastructure, container orchestration clusters, automated CI/CD pipelines, and zero-trust security postures.',
    description: 'Automates cloud infrastructure, manages Kubernetes clusters, optimizes cloud spend, tunes Linux kernel parameters, and monitors high-availability SLAs.',
    recommendedSkills: [
      { name: 'OS Internals, Namespaces & Cgroups', category: 'Core Computer Science', level: 'Essential', description: 'Linux container isolation, chroot, cgroups v2 resource limits.' },
      { name: 'Virtualization & Hypervisors', category: 'Core Computer Science', level: 'Essential', description: 'Type 1 vs Type 2 hypervisors, hardware virtualization, and containerization.' },
      { name: 'Computer Networking & Firewalls', category: 'Core Computer Science', level: 'Essential', description: 'TCP 3-way handshake, CIDR subnetting, DNS resolution, BGP routing.' },
      { name: 'Infrastructure as Code (Terraform)', category: 'Cloud & Systems', level: 'Essential', description: 'State management, modular declarations, and immutable infrastructure.' },
      { name: 'Site Reliability & Chaos Engineering', category: 'Architecture', level: 'Recommended', description: 'SLAs, SLOs, SLIs, MTTR metrics, and automated disaster failover.' }
    ],
    recommendedLanguages: [
      { name: 'Go (Golang)', type: 'Programming', reason: 'Language of Kubernetes, Terraform providers, Docker, and Prometheus.', trackId: 'track-go' },
      { name: 'Python', type: 'Programming', reason: 'Cloud automation scripts, AWS Boto3 SDK, and infrastructure testing.', trackId: 'track-python' },
      { name: 'German', type: 'Spoken', reason: 'High European enterprise cloud presence (Frankfurt AWS/GCP regions and DACH tech firms).' }
    ],
    recommendedTopicIds: [
      'os-virtualization', 'os-kernels', 'os-syscalls', 'os-ext4', 'os-security', 'os-dma',
      'dbms-partitioning', 'dbms-two-phase-commit', 'dbms-aries',
      'java-security', 'java-loom',
      'dsa-topo-sort', 'dsa-shortest-paths'
    ],
    recommendedCertifications: [
      { title: 'Linux Foundation Certified System Administrator (LFCS)', provider: 'Linux Foundation', url: 'https://training.linuxfoundation.org/certification/certified-sysadmin-lfcs/', duration: '8 weeks' },
      { title: 'Google Cloud Professional Cloud Architect', provider: 'Google', url: 'https://cloud.google.com/learn/certification/cloud-architect', duration: '8-10 weeks' }
    ]
  },
  {
    id: 'role-systems-cpp',
    title: 'Low-Level Systems & C++ / Rust Engineer',
    shortTitle: 'Systems / Low-Level Engineer',
    icon: 'Cpu',
    demandLevel: 'High',
    averageSalaryUs: '$150,000 - $220,000',
    averageSalaryInr: '₹24 - ₹50 LPA',
    roleSummary: 'Develop ultra-fast trading engines, database storage engines, operating system kernels, device drivers, game engines, and embedded microcontrollers.',
    description: 'Masters bare-metal hardware interaction, manual memory management, CPU cache topologies, assembly instructions, and lockless data structures.',
    recommendedSkills: [
      { name: 'Manual Memory Layout & Paging', category: 'Core Computer Science', level: 'Essential', description: 'Virtual to physical address translation, page faults, and cache lines.' },
      { name: 'Hardware Synchronization & CAS', category: 'Core Computer Science', level: 'Essential', description: 'Atomic instructions, memory fences, spinlocks, and cache coherency.' },
      { name: 'Direct Memory Access & Disk I/O', category: 'Core Computer Science', level: 'Essential', description: 'Interrupt-driven I/O, DMA cycle stealing, and zero-copy transfer.' },
      { name: 'Cache-Conscious Data Structures', category: 'Core Computer Science', level: 'Advanced', description: 'B-Trees, flat arrays, and eliminating pointer-chasing.' }
    ],
    recommendedLanguages: [
      { name: 'C++', type: 'Programming', reason: 'Direct memory pointers, RAII, templates, and zero-cost abstractions.', trackId: 'track-cpp' },
      { name: 'Rust', type: 'Programming', reason: 'Memory safety without garbage collection, borrow checker, and fearless concurrency.', trackId: 'track-rust' },
      { name: 'Japanese', type: 'Spoken', reason: 'Global semiconductor, automotive electronics, and embedded robotics leadership.' }
    ],
    recommendedTopicIds: [
      'os-paging', 'os-tlb', 'os-thrashing', 'os-hw-sync', 'os-cow', 'os-rtos', 'os-free-space',
      'dsa-heaps', 'dsa-b-trees', 'dsa-red-black', 'dsa-asymptotics',
      'java-jmm', 'java-jmh',
      'dbms-aries', 'dbms-indexing'
    ],
    recommendedCertifications: [
      { title: 'Linux Foundation Linux Kernel Internals & Development', provider: 'Linux Foundation', url: 'https://training.linuxfoundation.org/training/linux-kernel-internals-and-development-lfd420/', duration: '12 weeks' },
      { title: 'Cisco Certified CyberOps Associate', provider: 'Cisco', url: 'https://www.cisco.com/c/en/us/training-events/training-certifications/certifications/associate/cyberops-associate.html', duration: '8 weeks' }
    ]
  },
  {
    id: 'role-data-engineer',
    title: 'Data Platform Engineer & Database Architect',
    shortTitle: 'Data Engineer',
    icon: 'Database',
    demandLevel: 'Very High',
    averageSalaryUs: '$135,000 - $195,000',
    averageSalaryInr: '₹19 - ₹42 LPA',
    roleSummary: 'Architect enterprise data lakes, real-time stream ingestion, analytical warehouse schemas (Star/Snowflake), and high-reliability ETL pipelines.',
    description: 'Designs massive distributed storage systems, wide-column database clusters, analytical columnar stores (Parquet/Arrow), and query optimizations.',
    recommendedSkills: [
      { name: 'Advanced SQL, Window Functions & CTEs', category: 'Core Computer Science', level: 'Essential', description: 'PARTITION BY, rolling aggregations, recursive tree traversal queries.' },
      { name: 'Table Partitioning & Sharding', category: 'Core Computer Science', level: 'Essential', description: 'Hash rings, range partitions, and distributed query execution.' },
      { name: 'Wide-Column Stores & LSM Trees', category: 'Core Computer Science', level: 'Essential', description: 'Memtables, SSTables, Bloom filters, and tunable consistency levels.' },
      { name: 'Distributed Consensus & Replication', category: 'Core Computer Science', level: 'Recommended', description: 'Raft consensus, master-replica sync, and split-brain resolution.' }
    ],
    recommendedLanguages: [
      { name: 'SQL', type: 'Programming', reason: 'The foundational data manipulation language for warehouses and query engines.', trackId: 'track-sql' },
      { name: 'Python', type: 'Programming', reason: 'Apache Spark, Pandas, Airflow orchestration, and custom ETL pipelines.', trackId: 'track-python' },
      { name: 'Java', type: 'Programming', reason: 'Core engine language of Apache Spark, Flink, Hadoop, and Kafka.', trackId: 'track-java' },
      { name: 'Tech English', type: 'Spoken', reason: 'Interfacing across product teams, business intelligence analysts, and executives.' }
    ],
    recommendedTopicIds: [
      'dbms-sql-joins', 'dbms-window-fns', 'dbms-query-opt', 'dbms-partitioning', 'dbms-nosql-column', 'dbms-nosql-kv', 'dbms-graph-db',
      'java-streams', 'java-forkjoin',
      'dsa-trie', 'dsa-b-trees', 'dsa-fenwick', 'dsa-segment-tree',
      'os-raid', 'os-ext4'
    ],
    recommendedCertifications: [
      { title: 'Google Cloud Professional Data Engineer', provider: 'Google', url: 'https://cloud.google.com/learn/certification/data-engineer', duration: '8 weeks' },
      { title: 'IBM Data Engineering Professional Certificate', provider: 'IBM', url: 'https://www.coursera.org/professional-certificates/ibm-data-engineer', duration: '10 weeks' }
    ]
  }
];
