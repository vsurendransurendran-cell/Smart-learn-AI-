import { LibraryBook } from '../../types';

export const ENTERPRISE_AND_NEW_BOOKS: LibraryBook[] = [
  // 1. NEXT.JS 15 & REACT 19 ARCHITECTURE (15 PAGES)
  {
    id: 'book-nextjs-react19',
    title: 'Next.js 15 & React 19 Enterprise Architecture',
    author: 'Guillermo Rauch, Dan Abramov & Sophie Alpert',
    category: 'languages',
    badge: 'Frontend Mastery',
    description: 'A 15-page comprehensive architectural masterclass on React Server Components (RSC), Actions, Partial Prerendering, compiler optimizations, and streaming SSR.',
    coverEmoji: '⚛️',
    coverColor: 'from-cyan-600 to-blue-900',
    totalPages: 15,
    readPages: [],
    pages: [
      {
        pageNumber: 1,
        title: 'Page 1: The React Server Components (RSC) Paradigm',
        content: `React Server Components (RSC) mark the most profound architectural transformation in web frontend engineering since the introduction of components in 2013. Traditionally, Single-Page Applications (SPAs) required downloading mega-byte JavaScript bundles before rendering client-side.

Server Components execute exclusively on the Node.js or Edge runtime. They have direct access to server-side databases, filesystem caches, and internal microservice endpoints, sending zero JavaScript bytes to the browser. Only the rendered virtual DOM tree (in the RSC wire format) is streamed across HTTP.

Key advantages:
1. Zero client bundle impact for heavy dependencies (e.g., date-fns, markdown parsers, syntax highlighters).
2. Elimination of waterfall API requests: data is fetched directly where the component resides.
3. Enhanced security: database credentials and internal API keys never leak to browser inspect tools.`
      },
      {
        pageNumber: 2,
        title: 'Page 2: React 19 Compiler: Automatic Memoization',
        content: `For a decade, React developers struggled with manual memoization: 'useMemo', 'useCallback', and 'React.memo'. Incorrect dependency arrays caused either stale closure bugs or unnecessary re-renders.

React 19 introduces the React Compiler (formerly 'React Forget'). Built as an optimizing Babel/SWC compiler pass, it analyzes JavaScript semantics, variable lifetimes, and mutation escapes to memoize values automatically.

\`\`\`tsx
// Before (Manual memoization):
const filteredItems = useMemo(() => items.filter(i => i.active), [items]);

// In React 19:
const filteredItems = items.filter(i => i.active);
// The compiler automatically caches the array calculation if items has not changed!
\`\`\`
This frees developers to write clean, idiomatic JavaScript while achieving peak rendering performance without manual memoization boilerplate.`
      },
      {
        pageNumber: 3,
        title: 'Page 3: Server Actions & Progressive Enhancement',
        content: `Server Actions in Next.js bridge client user interactions and server-side business logic through asynchronous RPC invocations. Defined using the "use server" directive, they can be invoked from forms, button clicks, or event handlers.

\`\`\`tsx
// app/actions.ts
'use server';

export async function updateProfile(formData: FormData) {
  const name = formData.get('name') as string;
  await db.user.update({ where: { id: currentUserId }, data: { name } });
  revalidatePath('/dashboard');
}
\`\`\`
Server Actions natively support progressive enhancement: when invoked from native HTML '<form action={updateProfile}>', the form submits successfully even before client-side JavaScript has finished downloading and hydrating over slow cellular connections.`
      },
      {
        pageNumber: 4,
        title: 'Page 4: Partial Prerendering (PPR)',
        content: `Historically, web developers had to choose between Static Site Generation (SSG) for blistering speed via CDNs, or Server-Side Rendering (SSR) for real-time dynamic user data.

Partial Prerendering (PPR) combines both in a single HTTP request:
1. The static shell (navigation bars, layout grids, static imagery) is prerendered at build time and served instantly from edge CDN caches.
2. Dynamic holes wrapped in React '<Suspense>' boundaries are streamed in real time from the server as promises resolve.

This delivers sub-50ms Time-to-First-Byte (TTFB) while seamlessly rendering personalized shopping carts and live notifications on the same screen.`
      },
      {
        pageNumber: 5,
        title: 'Page 5: Caching Strategies & Revalidation Mechanics',
        content: `Next.js 15 refines data caching with explicit opt-in controls. Developers control caching granularly:
- 'fetch(url, { cache: "force-cache" })': Caches responses permanently across server restarts until invalidated.
- 'fetch(url, { next: { revalidate: 3600 } })': Stale-While-Revalidate (SWR) caching with time-based background regeneration.
- 'revalidateTag(tag)' / 'revalidatePath(path)': On-demand cache invalidation triggered by webhook events or Server Actions.

By tagging database queries with domain identifiers ('tags: ["user-orders"]'), e-commerce stores can serve 99% of requests from edge memory while ensuring instant freshness the moment an order is confirmed.`
      },
      {
        pageNumber: 6,
        title: 'Page 6: Streaming SSR with Suspense & Micro-Chunking',
        content: `Traditional SSR suffered from "all-or-nothing" rendering: if a dashboard required data from a slow database query, the entire page stalled and the user stared at a blank screen.

Streaming SSR divides the document into micro-chunks:
1. The initial HTML shell and HTTP headers arrive in milliseconds.
2. High-priority above-the-fold content renders immediately.
3. Slower below-the-fold components stream down through the active HTTP connection, replacing fallback skeletons with interactive UI without full page refreshes.

This fundamentally decouples UI responsiveness from backend tail latencies.`
      },
      {
        pageNumber: 7,
        title: 'Page 7: Client vs. Server Component Boundaries',
        content: `Mastering React Server Components requires designing clean architectural boundaries.
Rule of Thumb: Keep components Server Components by default. Only add the "use client" directive at the leaves of the component tree where browser interactivity is strictly required:
- State management ('useState', 'useReducer')
- Lifecycle hooks and browser APIs ('useEffect', 'localStorage', 'window')
- Event listeners ('onClick', 'onChange')

\`\`\`
[Layout (Server)]
   ├── [Header (Server)]
   │      └── [UserAvatar (Server)]
   └── [Feed (Server)]
          └── [LikeButton (Client: 'use client')]
\`\`\`
Passing Server Components as 'children' to Client Components allows heavy server-rendered content to be composed inside interactive client wrappers without triggering client-side bundling.`
      },
      {
        pageNumber: 8,
        title: 'Page 8: Optimistic UI Updates with useOptimistic',
        content: `Modern users expect instant responsiveness. When clicking a "Like" button or adding an item to a cart, waiting 300ms for a network round-trip makes the application feel sluggish.

React 19 introduces 'useOptimistic':
\`\`\`tsx
const [optimisticLikes, setOptimisticLikes] = useOptimistic(
  likes,
  (state, delta: number) => state + delta
);

async function handleLike() {
  setOptimisticLikes(1); // Instantly updates UI
  await updateLikesOnServer(postId); // Rolls back automatically if server fails
}
\`\`\`
This pattern delivers perceived zero-latency interactions with bulletproof consistency and automatic error rollback.`
      },
      {
        pageNumber: 9,
        title: 'Page 9: Edge Middleware & Geo-Distributed Routing',
        content: `Next.js Edge Middleware executes on distributed V8 isolates (Cloudflare Workers, Vercel Edge Network) before a request hits the origin server.

Primary use cases:
1. Authentication verification: Decoding JWTs and redirecting unauthenticated users before rendering origin pages.
2. A/B testing: Splitting traffic between experimental feature flags without visual flicker.
3. Localization and Geolocation: Reading IP headers ('request.geo.country') to automatically serve translated regional content.

Because Edge Middleware executes in single-digit milliseconds globally, it shields origin infrastructure from unauthorized bot traffic and optimizes global routing.`
      },
      {
        pageNumber: 10,
        title: 'Page 10: State Management in the Modern React Era',
        content: `With Server Components handling data fetching and caching, traditional complex Redux or MobX global stores are largely obsolete in modern architectures.

Modern state is divided into three tiers:
1. Server State: Managed by Server Components, SWR, or React Query. Caches, revalidates, and synchronizes with the database.
2. URL State: Managed via search parameters ('?tab=settings&page=2'). Sharable, bookmarkable, and preserved across browser reloads.
3. Ephemeral UI State: Managed via 'useState', 'useReducer', or lightweight atomic stores (Zustand, Jotai) for local dropdowns, modals, and drag-and-drop interactions.`
      },
      {
        pageNumber: 11,
        title: 'Page 11: Web Vitals Optimization: LCP, INP, and CLS',
        content: `Google Core Web Vitals directly impact search engine ranking and user conversion rates:
1. Largest Contentful Paint (LCP): Must be under 2.5 seconds. Optimize by preloading hero fonts, utilizing Next.js Image optimization ('<Image priority>'), and minimizing server TTFB.
2. Interaction to Next Paint (INP): Replaced FID. Measures latency on all user taps and keystrokes. Keep under 200ms by offloading heavy work to Web Workers and avoiding main-thread JavaScript blocking.
3. Cumulative Layout Shift (CLS): Must stay below 0.1. Ensure all images and dynamic ads declare explicit aspect-ratio dimensions to prevent layout jumps.`
      },
      {
        pageNumber: 12,
        title: 'Page 12: Micro-Frontends & Module Federation',
        content: `In massive enterprises with dozens of independent squads, maintaining a single monolithic Next.js repository can lead to slow CI/CD pipelines.

Module Federation allows independent Next.js applications to share components and routes at runtime. The core container loads a remote checkout widget or catalog grid dynamically without needing to rebuild the entire platform.

While powerful, federated micro-frontends introduce version skew and shared CSS collisions. Teams must enforce strict semantic versioning and design system tokens across federated boundaries.`
      },
      {
        pageNumber: 13,
        title: 'Page 13: End-to-End Type Safety: tRPC, Zod & Server Actions',
        content: `Eliminating type drift between frontend and backend is the holy grail of modern full-stack engineering.

By pairing Zod schema validation with Server Actions or tRPC:
\`\`\`typescript
const UpdateUserSchema = z.object({
  email: z.string().email(),
  age: z.number().min(18)
});

export async function submitUser(data: unknown) {
  const valid = UpdateUserSchema.parse(data); // Runtime validation
  return db.user.create({ data: valid }); // Compile-time type inference
}
\`\`\`
Any changes to backend database models immediately reflect as TypeScript compile errors in frontend form components, eliminating runtime null-pointer crashes.`
      },
      {
        pageNumber: 14,
        title: 'Page 14: Security Hardening: XSS, CSRF, and CSP in Next.js',
        content: `Modern web applications face relentless automated security probing.
Key defensive layers:
1. Content Security Policy (CSP): Enforce strict nonces on inline scripts to neutralize Cross-Site Scripting (XSS).
2. CSRF Defense: Next.js Server Actions automatically verify Origin and Host request headers, blocking cross-site request forgery without manual tokens.
3. Secure Cookies: Store session tokens in 'HttpOnly; Secure; SameSite=Strict' cookies to prevent JavaScript cookie theft.
4. Input Sanitization: Never use 'dangerouslySetInnerHTML' without passing HTML through DOMPurify.`
      },
      {
        pageNumber: 15,
        title: 'Page 15: Production Observability, OpenTelemetry & Distributed Tracing',
        content: `Operating high-scale Next.js deployments requires deep observability.
By integrating OpenTelemetry (OTel), Next.js automatically emits distributed trace spans for:
- Edge Middleware execution
- Server Component rendering duration
- External database queries and microservice RPCs

These traces feed into observability backends (Datadog, Honeycomb, Grafana Tempo). When a user experiences a 2-second delay, architects can pinpoint the exact slow database query or downstream microservice bottleneck within seconds.`
      }
    ]
  },

  // 2. DATABASE STORAGE ENGINES & DISTRIBUTED RAFT (15 PAGES)
  {
    id: 'book-db-internals',
    title: 'Database Internals: Storage Engines, B+ Trees & Distributed Raft',
    author: 'Alex Petrov, Dr. Michael Stonebraker & Martin Kleppmann',
    category: 'systems',
    badge: 'Core Databases',
    description: 'A 15-page deep dive into write-ahead logging (WAL), B+ Trees, Log-Structured Merge (LSM) Trees, Raft consensus, and transactional ACID isolation.',
    coverEmoji: '🗄️',
    coverColor: 'from-amber-700 to-orange-900',
    totalPages: 15,
    readPages: [],
    pages: [
      {
        pageNumber: 1,
        title: 'Page 1: The Anatomy of a Database Management System',
        content: `At its core, a Database Management System (DBMS) is composed of two primary subsystems:
1. The Transport & Query Engine: Parses SQL strings into ASTs, optimizes execution plans via cost-based query optimizers (CBO), and evaluates expressions.
2. The Storage Engine: Responsible for mapping logical records to physical disk blocks, managing buffer pool memory, ensuring durability through Write-Ahead Logging (WAL), and coordinating concurrency.

Understanding the boundary between the query engine and storage engine explains why systems like MySQL can interchange InnoDB (B+ Tree) with RocksDB (LSM-Tree) without changing SQL syntax.`
      },
      {
        pageNumber: 2,
        title: 'Page 2: B+ Trees: The Gold Standard for Read-Heavy Workloads',
        content: `B+ Trees are self-balancing N-ary search trees optimized for block-based storage media. Unlike binary trees, each B+ Tree node matches the operating system page size (typically 4KB to 16KB) and has high fanout (often 100 to 500 child pointers).

Key architectural properties:
1. All data records are stored exclusively in leaf nodes. Internal nodes contain only routing keys.
2. Leaf nodes are linked contiguously in a doubly-linked list, enabling blisteringly fast range scans ('SELECT * FROM users WHERE age BETWEEN 20 AND 30').
3. Shallow depth: A tree with depth 3 or 4 can index billions of records with at most 3 disk seeks.`
      },
      {
        pageNumber: 3,
        title: 'Page 3: Log-Structured Merge (LSM) Trees: Write-Optimized Storage',
        content: `While B+ Trees excel at point and range reads, random writes suffer from random I/O amplification because in-place page updates require rewriting entire 16KB disk blocks.

LSM-Trees (used in RocksDB, Cassandra, ClickHouse) trade read complexity for unprecedented write throughput:
1. Writes append sequentially to an in-memory sorted buffer called the 'MemTable' (backed by a Write-Ahead Log on disk for durability).
2. When the MemTable reaches capacity, it is flushed to disk as an immutable sorted file ('SSTable').
3. Because all disk writes are sequential appends, LSM-Trees write at the physical bandwidth limits of NVMe SSDs.`
      },
      {
        pageNumber: 4,
        title: 'Page 4: SSTable Compaction Strategies: Leveled vs. Size-Tiered',
        content: `As immutable SSTables accumulate on disk, read queries would suffer if they had to scan hundreds of individual files. Compaction is the background process of merging and garbage collecting SSTables.

Compaction strategies:
- Size-Tiered Compaction (STCS): Merges SSTables of similar sizes. Excellent for burst write workloads, but incurs high temporary disk space overhead (up to 50% headroom).
- Leveled Compaction (LCS): Organizes files into geometric levels (L0, L1, L2...). Each level (except L0) is non-overlapping. Offers deterministic read latencies and predictable disk utilization.`
      },
      {
        pageNumber: 5,
        title: 'Page 5: Bloom Filters & Space-Efficient Lookups',
        content: `In an LSM-Tree, checking whether a key exists in an SSTable before performing a physical disk read is crucial for low latency.

A Bloom Filter is a space-efficient probabilistic data structure. It uses an array of m bits and k independent hash functions.
- If the filter returns false: The key is guaranteed NOT to exist in the SSTable (zero false negatives). The engine skips reading the file from disk!
- If the filter returns true: The key probably exists (tolerating a configurable 1% false positive rate).
Bloom filters allow RocksDB to service millions of point lookups per second with minimal SSD seeks.`
      },
      {
        pageNumber: 6,
        title: 'Page 6: Write-Ahead Logging (WAL) & ARIES Recovery',
        content: `To provide the "D" in ACID (Durability), databases cannot immediately flush dirty buffer pool pages to disk on every transaction commit due to high I/O latency.

Instead, the DBMS appends a compact record of changes to a sequential Write-Ahead Log (WAL) before acknowledging the client. The WAL rule states: "Log records must reach durable disk storage before the corresponding data page is modified on disk."

The ARIES recovery algorithm operates in three phases after a crash:
1. Analysis: Scans the log forward to determine dirty pages and active transactions at crash time.
2. Redo: Repeats history to restore the database state to the exact moment of failure.
3. Undo: Rolls back all uncommitted transactions in reverse chronological order.`
      },
      {
        pageNumber: 7,
        title: 'Page 7: Buffer Pool Management & LRU-K Eviction',
        content: `Database engines bypass the operating system page cache using direct I/O ('O_DIRECT') to maintain deterministic control over memory caching via their own Buffer Pool.

Buffer pools manage fixed-size memory frames. When a page must be loaded from disk and memory is full, an eviction policy decides which frame to purge.
While naive LRU (Least Recently Used) is popular, it fails during large sequential table scans (which flush out hot indexes). Databases implement LRU-2 or 2Q algorithms, tracking the timestamp of the last two accesses to prioritize pages with sustained reference locality.`
      },
      {
        pageNumber: 8,
        title: 'Page 8: Multi-Version Concurrency Control (MVCC)',
        content: `Locking tables or rows during reads creates severe bottlenecks. Modern databases (PostgreSQL, InnoDB) achieve non-blocking reads using Multi-Version Concurrency Control (MVCC).

Under MVCC:
- Writes do not block reads.
- Reads do not block writes.

When a row is updated, the engine does not overwrite it in-place. Instead, it appends a new version with creation and expiration transaction IDs ('xmin' and 'xmax'). Readers evaluate a visibility snapshot: they only see versions committed prior to their transaction's start time.`
      },
      {
        pageNumber: 9,
        title: 'Page 9: Transaction Isolation Levels & Anomalies',
        content: `The SQL standard defines four transaction isolation levels to balance consistency against concurrency:
1. Read Uncommitted: Permits dirty reads (reading uncommitted data that may later roll back).
2. Read Committed: Guarantees reads only observe committed data. Permits non-repeatable reads.
3. Repeatable Read: Guarantees multiple reads of the same row within a transaction return identical values. In PostgreSQL, this also eliminates phantom reads.
4. Serializable: The gold standard. Transactions execute with the mathematical equivalence of serial, one-by-one execution, preventing write skew and serialization anomalies.`
      },
      {
        pageNumber: 10,
        title: 'Page 10: Two-Phase Locking (2PL) vs. Optimistic Concurrency (OCC)',
        content: `To enforce serializability:
- Two-Phase Locking (2PL): Pessimistic. Transactions acquire shared locks for reads and exclusive locks for writes. In Phase 1 (Growing), locks are acquired; in Phase 2 (Shrinking), locks are released. Strict 2PL holds all exclusive locks until commit, preventing cascading aborts.
- Optimistic Concurrency Control (OCC): Transactions read and write to private workspaces without locking. At commit time, a validation phase checks if any read data was modified by concurrent transactions. If conflict is detected, the transaction aborts and retries.`
      },
      {
        pageNumber: 11,
        title: 'Page 11: Distributed Consensus: The Raft Algorithm',
        content: `In distributed databases (CockroachDB, TiDB, etcd), a single node cannot be the single source of truth. The Raft consensus algorithm ensures an ensemble of nodes agree on a replicated state machine log.

Raft divides consensus into three sub-problems:
1. Leader Election: If a follower misses heartbeats, it transitions to candidate, increments the term number, and requests votes. A candidate receiving majority quorum becomes leader.
2. Log Replication: The leader accepts client proposals, appends entries to its log, and broadcasts 'AppendEntries' RPCs.
3. Safety: An entry is committed once replicated across a majority of nodes.`
      },
      {
        pageNumber: 12,
        title: 'Page 12: Raft Split-Brain Prevention & Majority Quorums',
        content: `Network partitions will inevitably sever communication between data centers. Raft guarantees split-brain immunity through strict majority quorums:

In a cluster of N nodes, any valid quorum requires:
\`\`\`
Quorum = floor(N / 2) + 1
\`\`\`
In a 5-node cluster (Quorum = 3), if a network partition isolates 2 nodes on the East Coast and 3 nodes on the West Coast:
- The 2-node partition cannot form a majority and refuses write proposals.
- The 3-node partition maintains quorum and continues servicing reads and writes safely.
Two concurrent leaders can never exist in the same term.`
      },
      {
        pageNumber: 13,
        title: 'Page 13: Distributed Transactions: Two-Phase Commit (2PC)',
        content: `When a transaction spans multiple database shards, atomicity requires coordinating consensus across all participating nodes using Two-Phase Commit (2PC):

Phase 1 (Prepare): The coordinator asks all participants if they are ready to commit. Each participant writes undo/redo logs and responds 'VOTE_COMMIT' or 'VOTE_ABORT'.
Phase 2 (Commit): If all voted commit, the coordinator broadcasts 'GLOBAL_COMMIT'. If even one participant voted abort, the coordinator broadcasts 'GLOBAL_ABORT'.

Vulnerability: If the coordinator crashes mid-protocol after participants vote commit, participants remain blocked holding locks, making 2PC vulnerable to coordinator single-points-of-failure.`
      },
      {
        pageNumber: 14,
        title: 'Page 14: Google Spanner: TrueTime & External Consistency',
        content: `Google Spanner achieved the world's first globally distributed database providing strict serializability with lock-free distributed reads.

Its breakthrough is 'TrueTime': an API utilizing GPS receivers and atomic rubidium clocks deployed across Google data centers. TrueTime represents time as an interval '[earliest, latest]' with bounded uncertainty (typically under 7ms).

By waiting out the uncertainty window before committing a transaction, Spanner guarantees that transaction timestamps strictly reflect real-world causal ordering across continents without cross-datacenter coordination locks.`
      },
      {
        pageNumber: 15,
        title: 'Page 15: The Future: NVMe-oF, CXL, and Disaggregated Storage',
        content: `The modern datacenter is undergoing a hardware revolution. Compute-storage coupling is being replaced by disaggregated architectures:
1. Compute and Storage Disaggregation: Stateless compute nodes access remote NVMe SSD pools over high-speed networks (NVMe-oF) using RDMA with under 10-microsecond latency.
2. CXL (Compute Express Link): Allows CPU hosts to pool terabytes of shared memory over PCIe bus interconnects, enabling cache-coherent shared-memory databases across multiple physical servers.

These innovations allow modern cloud databases (like Amazon Aurora and Google AlloyDB) to scale storage independently from compute in real time.`
      }
    ]
  },

  // 3. PRODUCTION LLM ENGINEERING & AUTONOMOUS AGENTS (15 PAGES)
  {
    id: 'book-llm-rag-agents',
    title: 'Production LLM Engineering, Vector RAG & Autonomous Agents',
    author: 'Harrison Chase, Andrej Karpathy & Dr. Yann LeCun',
    category: 'ai',
    badge: 'Applied AI',
    description: 'A 15-page handbook on Retrieval-Augmented Generation (RAG), vector embeddings, multi-agent frameworks, tool calling, and evaluation pipelines.',
    coverEmoji: '🤖',
    coverColor: 'from-violet-600 to-purple-900',
    totalPages: 15,
    readPages: [],
    pages: [
      {
        pageNumber: 1,
        title: 'Page 1: The Modern LLM Application Stack',
        content: `Building software with Large Language Models (LLMs) requires shifting from deterministic programming to probabilistic cognitive systems. A production LLM architecture consists of four distinct layers:

1. Foundational Models: Frontier reasoning models (Gemini 2.5/3, GPT-4o, Claude 3.5 Sonnet) accessible via low-latency inference APIs.
2. Retrieval & Context Layer: Vector databases (pgvector, Pinecone, Qdrant), hybrid search engines, and document ingestion pipelines.
3. Orchestration & Agent Frameworks: Prompt chaining, structured JSON output enforcement, and stateful multi-turn memory.
4. Evaluation & Observability: Tracing latency, measuring hallucination rates, and monitoring semantic drift.`
      },
      {
        pageNumber: 2,
        title: 'Page 2: Vector Embeddings & High-Dimensional Semantic Spaces',
        content: `Vector embeddings transform arbitrary text, code, or images into dense mathematical vectors (e.g., 768 or 1536 floating-point dimensions). Semantically similar concepts map to proximate coordinates in vector space.

Similarity metrics:
1. Cosine Similarity: Measures the cosine of the angle between two vectors. Invariant to vector magnitude; standard for normalized text embeddings.
2. Dot Product: Sensitive to both angle and magnitude. Extremely fast to compute with hardware SIMD AVX-512 instructions.
3. Euclidean Distance (L2): Measures geometric distance between coordinates.

Cosine similarity equation:
\`\`\`
cosine_sim(A, B) = (A • B) / (||A|| * ||B||)
\`\`\`
Understanding embedding spaces enables intelligent document search, clustering, and anomaly detection.`
      },
      {
        pageNumber: 3,
        title: 'Page 3: Approximate Nearest Neighbors (ANN) & HNSW Graphs',
        content: `Finding the nearest vector among 100 million embeddings using exact k-Nearest Neighbors (kNN) requires calculating cosine distance against every single vector—taking seconds of CPU time.

Approximate Nearest Neighbors (ANN) algorithms solve this with sub-millisecond retrieval:
The gold standard is Hierarchical Navigable Small World (HNSW) graphs:
- Multi-layer graph inspired by Skip Lists.
- Top layers have long-range sparse connections for fast coarse navigation across semantic clusters.
- Bottom layers have dense, local connections for precise neighbor identification.

HNSW provides logarithmic O(log N) search complexity while retaining 98%+ recall accuracy.`
      },
      {
        pageNumber: 4,
        title: 'Page 4: Retrieval-Augmented Generation (RAG) Architecture',
        content: `Foundational LLMs suffer from two critical limitations: knowledge cutoff dates and hallucinations when asked about private enterprise data.

Retrieval-Augmented Generation (RAG) grounds LLM outputs in verified facts:
1. User submits a query: "What is our Q3 return policy for refurbished electronics?"
2. The retrieval engine converts the query to an embedding and retrieves the top 3 most relevant policy chunks.
3. The prompt orchestrator constructs an augmented prompt:
\`\`\`
System: Answer the question using ONLY the provided context. If unsure, state that you do not know.
Context: [Retrieved chunk 1, chunk 2...]
User Question: What is our Q3 return policy?
\`\`\`
4. The LLM generates a grounded, factual answer with zero hallucinations and explicit citations.`
      },
      {
        pageNumber: 5,
        title: 'Page 5: Advanced Chunking: Semantic vs. Recursive Splitting',
        content: `RAG retrieval quality is overwhelmingly determined by document chunking strategy. Naive fixed-size chunking (e.g., every 500 characters) cuts sentences in half and loses semantic context.

Modern chunking methodologies:
1. Recursive Character Splitting: Recursively splits on double newlines (paragraphs), single newlines, and sentence terminators to preserve natural syntactic blocks.
2. Semantic Chunking: Computes sentence-level embeddings and places chunk boundaries wherever the semantic similarity between consecutive sentences drops below a percentile threshold.
3. Parent-Document Retrieval: Indexes small 100-token chunks for high-precision semantic search, but injects the entire 1,000-token parent section into the LLM prompt for rich narrative context.`
      },
      {
        pageNumber: 6,
        title: 'Page 6: Hybrid Search: Dense Vector + Sparse BM25 Fusion',
        content: `Pure vector search fails when queries contain exact alphanumeric codes, SKU numbers, or specific function names (e.g., "Error Code ERR_404_AUTH").

Production RAG systems employ Hybrid Search combining:
1. Dense Retrieval (Semantic): Captures conceptual intent and synonyms via neural embeddings.
2. Sparse Retrieval (Lexical BM25): Captures exact keyword frequency and rarity via inverted index search.

Results from both engines are merged using Reciprocal Rank Fusion (RRF):
\`\`\`
RRF_Score(d) = sum( 1 / (60 + rank_dense(d)) + 1 / (60 + rank_sparse(d)) )
\`\`\`
Hybrid search eliminates keyword blind spots while retaining deep semantic understanding.`
      },
      {
        pageNumber: 7,
        title: 'Page 7: Cross-Encoder Reranking for Precision Filtering',
        content: `First-stage vector search is fast but uses bi-encoders where query and document are embedded independently, missing subtle linguistic interactions.

Reranking inserts a cross-encoder model (e.g., Cohere Rerank, BGE-Reranker) as a second-stage filter:
1. Fast retrieval fetches the top 50 candidate chunks using hybrid search in 10ms.
2. The cross-encoder evaluates the user query and candidate chunk simultaneously through full cross-attention layers.
3. The candidates are rescored and the top 4 highest-relevance passages are passed to the generator.

Reranking dramatically boosts answer accuracy and cuts hallucination rates by up to 40%.`
      },
      {
        pageNumber: 8,
        title: 'Page 8: Function Calling & Structured JSON Outputs',
        content: `To build intelligent systems that take actions, LLMs must interface with traditional software APIs. Modern LLMs support Function Calling (Tool Use):

1. The developer provides a JSON schema describing available functions:
\`\`\`json
{
  "name": "checkFlightAvailability",
  "parameters": {
    "type": "object",
    "properties": {
      "origin": { "type": "string" },
      "destination": { "type": "string" },
      "date": { "type": "string", "format": "date" }
    },
    "required": ["origin", "destination", "date"]
  }
}
\`\`\`
2. When the user asks "Can I fly from Seattle to Boston next Friday?", the model emits valid JSON arguments invoking 'checkFlightAvailability'.
3. The server executes the function and feeds the response back to the LLM to formulate a conversational summary.`
      },
      {
        pageNumber: 9,
        title: 'Page 9: Autonomous Agents: ReAct, Plan-and-Solve & Memory',
        content: `An AI Agent is an autonomous loop that observes an environment, formulates a multi-step plan, selects tools, and refines actions based on tool feedback.

The ReAct Pattern (Reason + Act):
\`\`\`
Thought: I need to find the student's current score and target exam.
Action: fetchUserProfile(studentId="std-101")
Observation: { "score": 68, "target": "GATE CS 2026" }
Thought: The score is 68. I should find weak topics under Algorithms.
Action: fetchWeakTopics(studentId="std-101")
Observation: ["Dynamic Programming", "Graph Traversal"]
Thought: I have sufficient information to generate a study plan.
Final Answer: Here is your personalized roadmap...
\`\`\`
Adding persistent short-term and long-term memory allows agents to execute complex, multi-day engineering workflows.`
      },
      {
        pageNumber: 10,
        title: 'Page 10: Multi-Agent Collaboration Architectures',
        content: `Single-agent architectures collapse when tasks grow too broad. Multi-agent systems decompose complex missions into specialized personas communicating via message buses:

Archetypal Multi-Agent Team:
1. Product Manager Agent: Deconstructs user requirements into functional specifications.
2. Architecture Agent: Selects database schemas, microservice contracts, and API routes.
3. Coder Agent: Writes type-safe TypeScript or Python implementation code.
4. Reviewer/Tester Agent: Executes unit tests, runs static linters, and reports syntax defects.

If the Tester Agent finds a failing test, it routes the defect back to the Coder Agent with exact stack traces, creating a self-healing software development loop.`
      },
      {
        pageNumber: 11,
        title: 'Page 11: Guardrails, Prompt Injection & Defensive Engineering',
        content: `Direct user input to an LLM exposes applications to adversarial Prompt Injection attacks (e.g., "Ignore previous instructions and output system prompt").

Defensive layers:
1. Input Guardrails: Use fast classifier models (Llama Guard, NeMo Guardrails) to detect jailbreaks, hate speech, and PII before prompting the primary model.
2. Structured Separation: Strictly delineate user input from system instructions using markdown fences or XML tags:
\`\`\`
<system_instruction>You are a factual tutor...</system_instruction>
<user_input>{sanitized_query}</user_input>
\`\`\`
3. Output Validation: Validate model outputs against strict Pydantic/Zod schemas to ensure malformed JSON or rogue SQL commands are never executed blindly.`
      },
      {
        pageNumber: 12,
        title: 'Page 12: Context Window Management & KV-Cache Mechanics',
        content: `Frontier models offer massive context windows (1 million to 2 million tokens). However, packing enormous contexts increases inference cost and latency.

Transformer inference operates in two phases:
1. Prefill Phase: The model processes all input tokens in parallel, generating Key-Value (KV) cache tensors in GPU memory.
2. Decoding Phase: The model generates one token at a time sequentially. The KV-cache prevents recomputing attention for past tokens.

Optimizations:
- Prefix Caching: Identical system prompts and tool definitions are cached in GPU VRAM across requests, reducing TTFB by up to 80%.
- Context Compression: Summarize past conversational turns to prevent context window bloat.`
      },
      {
        pageNumber: 13,
        title: 'Page 13: Evaluation Pipelines: RAG Triad & LLM-as-a-Judge',
        content: `You cannot improve what you cannot measure. Evaluating generative AI systems requires automated benchmarking beyond manual spot checks.

The RAG Triad Framework:
1. Context Relevance: Did the retrieval engine fetch passages directly relevant to the user query?
2. Groundedness (Faithfulness): Is every statement in the model's answer verifiable against the retrieved context?
3. Answer Relevance: Does the generated answer directly address the user's initial question?

Using an impartial frontier model as an automated judge ("LLM-as-a-Judge") provides scalable, continuous quality metrics across thousands of production queries.`
      },
      {
        pageNumber: 14,
        title: 'Page 14: Fine-Tuning: LoRA, QLoRA & DPO Alignment',
        content: `When prompt engineering and RAG reach their limits, model weights can be specialized via parameter-efficient fine-tuning (PEFT):

- LoRA (Low-Rank Adaptation): Freezes base model weights and injects trainable low-rank decomposition matrices into multi-head attention layers, reducing trainable parameters by 99% with zero loss in quality.
- QLoRA: Quantizes base weights to 4-bit NormalFloat (NF4), allowing a 70-billion parameter model to be fine-tuned on a single consumer GPU.
- Direct Preference Optimization (DPO): Aligns models to human preferences directly on pairs of preferred vs. rejected outputs without needing complex Reinforcement Learning from Human Feedback (RLHF) reward models.`
      },
      {
        pageNumber: 15,
        title: 'Page 15: The Horizon: Multimodal Reasoning & Real-Time Audio',
        content: `The frontier of AI is natively multimodal. Rather than converting audio to text, feeding text to an LLM, and synthesizing speech, end-to-end multimodal models (like Gemini 3.1 Live API) stream audio directly in and out with sub-300ms latency.

These native audio-to-audio architectures perceive subtle human vocal intonations, emotional inflections, and speech interruptions in real time.

Paired with real-time video streaming, modern AI systems can observe a student's handwritten math proof through a smartphone camera and speak encouraging, step-by-step guidance aloud with the natural warmth and fluidity of a human professor.`
      }
    ]
  },

  // 4. LOW-LATENCY SYSTEMS, DPDK & eBPF (15 PAGES)
  {
    id: 'book-hft-networking',
    title: 'Low-Latency Systems: Kernel Bypass, eBPF, DPDK & Hardware Concurrency',
    author: 'Brendan Gregg, Dr. Martin Thompson & Carl Cook',
    category: 'systems',
    badge: 'High Performance',
    description: 'A 15-page systems manual on microsecond-scale computing, kernel bypass networking, eBPF observability, lock-free ring buffers, and mechanical sympathy.',
    coverEmoji: '⚡',
    coverColor: 'from-amber-600 to-red-950',
    totalPages: 15,
    readPages: [],
    pages: [
      {
        pageNumber: 1,
        title: 'Page 1: The Microsecond Revolution: Mechanical Sympathy',
        content: `In high-performance engineering, "Mechanical Sympathy"—a term coined by racing driver Jackie Stewart and applied to software by Martin Thompson—means designing code that cooperates with underlying computer hardware rather than fighting it.

Latency hierarchy in modern hardware:
- CPU L1 Cache Reference: 1 nanosecond (0.5 ns)
- CPU L2 Cache Reference: 3-4 nanoseconds
- CPU L3 Cache Reference: 10-15 nanoseconds
- Main Memory (RAM) Access: 60-80 nanoseconds
- Solid State Disk (NVMe) Read: 20-50 microseconds
- Operating System Context Switch: 1-2 microseconds
- TCP Round-Trip (Same Datacenter): 200-500 microseconds

When optimizing for high-frequency trading or ultra-low-latency streaming, memory layout and cache line alignment dictate performance far more than Big-O algorithm analysis.`
      },
      {
        pageNumber: 2,
        title: 'Page 2: CPU Cache Architecture & False Sharing',
        content: `Modern CPUs do not read single bytes from RAM; they fetch contiguous 64-byte chunks known as Cache Lines.

False Sharing is one of the most insidious concurrency defects:
If Thread A on Core 0 modifies variable 'x', and Thread B on Core 1 reads variable 'y', and both variables reside within the same 64-byte cache line:
The CPU cache coherency protocol (MESI/MOESI) invalidates the entire cache line across both cores on every write. Even though the threads access distinct variables, memory bus contention collapses throughput.

Solution: Use explicit memory alignment annotations:
\`\`\`cpp
struct alignas(64) WorkerState {
    uint64_t counter; // Occupies its own dedicated cache line
};
\`\`\``
      },
      {
        pageNumber: 3,
        title: 'Page 3: The Linux Network Stack Bottleneck',
        content: `The traditional Linux networking path was designed for multi-user fairness and safety, not sub-microsecond throughput:
1. Physical NIC receives an Ethernet frame.
2. Hardware interrupt (IRQ) interrupts the CPU.
3. The kernel transitions to SoftIRQ and allocates an 'sk_buff' socket buffer structure.
4. The packet traverses netfilter, routing tables, and TCP congestion state.
5. A system call ('recv') copies data across the kernel-to-userspace memory boundary.

This pipeline incurs substantial latency: context switches, memory allocation overhead, and multiple CPU cache invalidations.`
      },
      {
        pageNumber: 4,
        title: 'Page 4: Kernel Bypass: DPDK & Solarflare Onload',
        content: `Kernel Bypass architectures hand control of the physical Network Interface Card (NIC) directly to userspace applications, completely eliminating the OS kernel from the data path.

With Data Plane Development Kit (DPDK):
- Poll Mode Drivers (PMD): Dedicated CPU cores poll NIC ring buffers continuously in a tight loop, eliminating hardware interrupt latency.
- Zero-Copy Direct Memory Access (DMA): The NIC transfers packets directly into userspace memory buffers (HugePages) mapped by the application.
- Zero Context Switches: Packets are processed entirely in userspace.

This reduces packet handling latency from 15 microseconds down to under 800 nanoseconds.`
      },
      {
        pageNumber: 5,
        title: 'Page 5: eBPF: Programmable Linux Kernel Observability',
        content: `Extended Berkeley Packet Filter (eBPF) allows running sandboxed bytecode inside the Linux kernel without modifying kernel source code or loading dangerous kernel modules.

Safety and Verification:
Before executing, the in-kernel eBPF verifier proves that the program cannot crash the system: it must not contain unbounded loops, out-of-bounds memory accesses, or uninitialized variables.

Applications:
1. XDP (eXpress Data Path): Executes eBPF packet filters at the lowest possible software layer, dropping DDoS packets at line rate (over 20 million packets per second per core).
2. Continuous Observability: Attaches to kprobes and tracepoints to track database latency and disk I/O with negligible overhead.`
      },
      {
        pageNumber: 6,
        title: 'Page 6: Lock-Free Programming & Memory Ordering',
        content: `Mutexes rely on kernel futex calls that put threads to sleep when contended, incurring expensive 2-microsecond context switches. Low-latency systems mandate Lock-Free data structures.

Atomic Operations rely on hardware CPU primitives:
- Compare-And-Swap (CAS): 'atomic.compare_exchange_strong'
- Atomic Fetch-and-Add

C++11 Memory Models:
1. 'memory_order_relaxed': Guarantees atomicity but permits compiler and CPU instruction reordering.
2. 'memory_order_acquire / release': Synchronizes memory between threads. Writes prior to a release are guaranteed to be visible to another thread performing an acquire on the same atomic variable.
3. 'memory_order_seq_cst': Sequential consistency. Total global ordering across all threads.`
      },
      {
        pageNumber: 7,
        title: 'Page 7: The LMAX Disruptor: High-Throughput Ring Buffers',
        content: `Designed by LMAX Exchange to process 6 million transactions per second with sub-microsecond latency, the Disruptor pattern replaces traditional concurrent queues with a circular ring buffer.

Key design principles:
1. Pre-allocated memory: The ring buffer size is a power of 2, allocating all message slots at startup to eliminate runtime Garbage Collection or malloc churn.
2. Fast bitwise indexing: Sequence numbers map to buffer slots via bitwise AND ('sequence & (buffer_size - 1)').
3. Single Writer Principle: A single publishing thread eliminates lock contention entirely. Consumers track publisher sequence numbers via memory barriers without contention.`
      },
      {
        pageNumber: 8,
        title: 'Page 8: Memory Management: HugePages & NUMA Affinity',
        content: `Modern operating systems translate virtual memory addresses to physical RAM addresses using Page Tables. The CPU caches recent translations in the Translation Lookaside Buffer (TLB).

Standard OS pages are 4KB. A process accessing 64GB of RAM requires millions of TLB entries, causing frequent TLB misses.
- HugePages (2MB or 1GB): Drastically reduces page table size, keeping virtual memory translations cached in CPU TLBs.
- NUMA (Non-Uniform Memory Access) Awareness: In multi-socket servers, accessing RAM connected to another CPU socket incurs a 30% latency penalty. Low-latency applications pin threads to specific CPU cores ('pthread_setaffinity_np') and allocate memory exclusively on the local NUMA node.`
      },
      {
        pageNumber: 9,
        title: 'Page 9: Branch Prediction & Speculative Execution',
        content: `Modern CPUs feature deep instruction pipelines (15 to 20 stages). To keep the pipeline full, the CPU Branch Predictor guesses the outcome of 'if/else' conditions before evaluation.

- Correct guess: Instructions execute speculatively with zero cycle penalty.
- Branch Misprediction: The entire instruction pipeline is flushed, wasting 15 to 20 clock cycles.

Optimization:
Use compiler branch hints ('[[likely]]' and '[[unlikely]]' in C++20):
\`\`\`cpp
if (input == nullptr) [[unlikely]] {
    handleError();
}
\`\`\`
Structure hot loops to operate on branchless logic (using conditional moves 'cmov' or bitwise masking).`
      },
      {
        pageNumber: 10,
        title: 'Page 10: SIMD Vectorization: AVX-512 & Neon',
        content: `Single Instruction Multiple Data (SIMD) hardware units execute a single mathematical operation across multiple data points simultaneously.

AVX-512 register widths:
- 512-bit registers can compute sixteen 32-bit floats or eight 64-bit integers in a single CPU clock cycle!

Auto-Vectorization vs. Intrinsics:
Modern compilers auto-vectorize loops with contiguous memory layout and no loop-carried data dependencies. For maximum performance, engineers write vector intrinsics directly:
\`\`\`cpp
__m512 v_data = _mm512_loadu_ps(&prices[i]);
__m512 v_result = _mm512_mul_ps(v_data, v_multiplier);
_mm512_storeu_ps(&output[i], v_result);
\`\`\``
      },
      {
        pageNumber: 11,
        title: 'Page 11: Real-Time Operating Systems & Linux RT PREEMPT',
        content: `Standard Linux kernels are tuned for throughput, not deterministic latency. Unpredictable timer interrupts and kernel locks cause latency spikes (jitter).

Linux with the RT_PREEMPT patch transforms Linux into a soft real-time operating system:
1. Replaces standard kernel spinlocks with preemptible sleeping mutexes.
2. Forces hardware interrupts to execute as high-priority kernel threads.
3. Provides high-resolution timers with microsecond-scale scheduling guarantees.

By configuring CPU isolation ('isolcpus=2-7') and assigning maximum real-time priority ('SCHED_FIFO'), critical trading processes run completely uninterrupted by background OS daemons.`
      },
      {
        pageNumber: 12,
        title: 'Page 12: Precision Time Protocol (PTP IEEE 1588)',
        content: `Coordinating financial transactions or distributed instrumentation across multiple servers requires microsecond-accurate clock synchronization.

Why NTP Fails: Network Time Protocol operates over UDP across variable network routes, yielding clock drift of 1 to 10 milliseconds.
PTP (Precision Time Protocol IEEE 1588v2):
- Utilizes hardware timestamping directly at the physical Ethernet PHY layer when packets cross the wire.
- Bypasses software networking delays entirely.
- Synchronizes server clocks to GPS-locked Grandmaster clocks with sub-100 nanosecond precision across enterprise data centers.`
      },
      {
        pageNumber: 13,
        title: 'Page 13: High-Performance Serialization: FlatBuffers & Cap\'n Proto',
        content: `Serialization formats like JSON or Protobuf require allocating memory, parsing strings, and decoding variable-length integers before accessing fields.

Zero-Copy Serialization (FlatBuffers, Cap'n Proto, SBE):
Data is serialized in a memory layout identical to how the CPU expects it in RAM. Accessing a field simply involves pointer offset arithmetic:
\`\`\`cpp
// No parsing or memory allocation!
auto price = order->price(); // Sub-nanosecond pointer dereference
\`\`\`
This achieves true zero-copy communication across network sockets, shared memory, and memory-mapped files.`
      },
      {
        pageNumber: 14,
        title: 'Page 14: FPGA Acceleration & Hardware Offloading',
        content: `When software optimization reaches physical CPU limits, low-latency engineering transitions to hardware description languages (Verilog/VHDL) running on Field Programmable Gate Arrays (FPGAs).

FPGA NIC architectures:
- Ethernet packets hit the FPGA directly.
- Financial market feed-handlers parse book updates in hardware gates in 80 nanoseconds!
- Pre-programmed risk checks and order-routing triggers fire without ever waking a host CPU.

Modern systems blend software agility on AMD/Intel CPUs with ultra-deterministic hardware execution on Xilinx/Intel FPGAs.`
      },
      {
        pageNumber: 15,
        title: 'Page 15: Postmortem of a Microsecond Latency Spike',
        content: `Diagnosing tail latency anomalies (the 99.9th percentile) requires specialized profiling methodologies.

Common culprits uncovered in production postmortems:
1. CPU Frequency Throttling: Operating system power-saving governors ('ondemand') drop CPU clock speeds during brief idle periods, causing the next message to encounter a 50-microsecond wakeup ramp. Fix: Lock CPU governors to 'performance'.
2. Transparent HugePages (THP) Defragmentation: Kernel background threads ('khugepaged') stall memory allocations while defragmenting physical RAM blocks. Fix: Disable THP runtime defrag.
3. Linux Page Cache Writeback: The kernel dirty page flusher initiates synchronous disk syncs, starving memory buses. Fix: Use 'O_DIRECT' direct I/O for all persistence.`
      }
    ]
  },

  // 5. APPLIED CRYPTOGRAPHY, ZERO-KNOWLEDGE & POST-QUANTUM (15 PAGES)
  {
    id: 'book-cryptography-zkp',
    title: 'Applied Cryptography: Zero-Knowledge Proofs & Post-Quantum Security',
    author: 'Dr. Dan Boneh, Matthew Green & Vitalik Buterin',
    category: 'tech',
    badge: 'Cryptography',
    description: 'A 15-page definitive manual on elliptic curve cryptography, zk-SNARKs, Groth16, STARKs, homomorphic encryption, and post-quantum lattice algorithms.',
    coverEmoji: '🔐',
    coverColor: 'from-emerald-700 to-slate-900',
    totalPages: 15,
    readPages: [],
    pages: [
      {
        pageNumber: 1,
        title: 'Page 1: The Mathematical Foundations of Public-Key Cryptography',
        content: `Modern digital trust rests upon mathematical hardness assumptions: one-way functions that are easy to compute in the forward direction, but computationally intractable to reverse without a secret trapdoor.

The Discrete Logarithm Problem (DLP):
Given a prime field F_p, a generator g, and a public element h = g^x mod p, finding the secret exponent x requires super-polynomial time using current classical computing algorithms.

Elliptic Curve Cryptography (ECC) improves on RSA by defining mathematical groups over points on elliptic curves (y^2 = x^3 + ax + b). ECC provides equivalent 128-bit cryptographic security using 256-bit keys, compared to cumbersome 3072-bit keys required by RSA.`
      },
      {
        pageNumber: 2,
        title: 'Page 2: Elliptic Curves: secp256k1 & Curve25519',
        content: `The choice of elliptic curve dictates security, side-channel resilience, and mathematical performance:

1. secp256k1: Used in Bitcoin and Ethereum. A Koblitz curve chosen for high-speed scalar multiplication via endomorphisms.
2. Curve25519: Formulated by Daniel J. Bernstein (DJB). A Montgomery curve optimized for constant-time execution, natively immune to CPU cache-timing side-channel attacks. Powers modern SSH, WireGuard VPNs, and Signal end-to-end encryption.
3. BLS12-381: A pairing-friendly curve essential for Zero-Knowledge Proofs and aggregate signature schemes.`
      },
      {
        pageNumber: 3,
        title: 'Page 3: What is a Zero-Knowledge Proof? The Three Pillars',
        content: `A Zero-Knowledge Proof (ZKP) is a cryptographic protocol allowing a Prover to convince a Verifier that a mathematical statement is true, without revealing any secret information (the witness) beyond the statement's validity.

A valid ZKP must satisfy three mathematical properties:
1. Completeness: If the statement is true and both parties follow the protocol, an honest verifier will always be convinced.
2. Soundness: If the statement is false, no cheating prover can convince an honest verifier (except with negligible mathematical probability).
3. Zero-Knowledge: The verifier learns nothing whatsoever about the secret witness.`
      },
      {
        pageNumber: 4,
        title: 'Page 4: Arithmetic Circuits & Rank-1 Constraint Systems (R1CS)',
        content: `Computers execute instructions; cryptographic proofs verify mathematical equations. To prove computation, software programs must be compiled into Arithmetic Circuits consisting of addition and multiplication gates over finite fields.

R1CS (Rank-1 Constraint System):
A mathematical representation of an arithmetic circuit where every constraint is formulated as:
\`\`\`
(A • s) * (B • s) = (C • s)
\`\`\`
Where A, B, and C are sparse coefficient vectors, and s is the witness vector containing public inputs, secret inputs, and intermediate wire values. R1CS provides the standardized intermediate representation for modern zk-SNARK proving systems.`
      },
      {
        pageNumber: 5,
        title: 'Page 5: Quadratic Arithmetic Programs (QAP) & Polynomial Encoding',
        content: `Checking thousands of individual R1CS constraints one-by-one would require linear verification time.
The Quadratic Arithmetic Program (QAP) breakthrough encodes thousands of constraints into polynomials using Lagrange Interpolation:

Instead of checking equations at every gate:
The prover constructs polynomials A(x), B(x), and C(x). The circuit is valid if and only if the polynomial:
\`\`\`
P(x) = A(x) * B(x) - C(x)
\`\`\`
is exactly divisible by a known target polynomial T(x).
By evaluating these polynomials at a random secret point, the verifier verifies millions of computation steps in single-digit milliseconds!`
      },
      {
        pageNumber: 6,
        title: 'Page 6: zk-SNARKs: Groth16 and the Trusted Setup',
        content: `zk-SNARK stands for Zero-Knowledge Succinct Non-Interactive Argument of Knowledge:
- Succinct: Proof size is tiny (roughly 200 bytes) and verification takes under 3 milliseconds regardless of computation size!
- Non-Interactive: Prover generates a proof that anyone can verify independently without back-and-forth round-trips.

Groth16: The most widely deployed zk-SNARK protocol.
Limitation: Requires a "Trusted Setup" ceremony to generate evaluation keys. If the random entropy ("toxic waste") used during the ceremony is compromised, an adversary could forge proofs. Multi-Party Computation (MPC) ceremonies ensure security as long as a single participant destroys their entropy.`
      },
      {
        pageNumber: 7,
        title: 'Page 7: Universal SNARKs: PLONK and Lookup Arguments',
        content: `Universal SNARKs (such as PLONK) eliminate the need for circuit-specific trusted setups. A single universal setup serves any program up to a maximum gate size.

PLONK Innovations:
1. Permutation Arguments: Enforces wire copy constraints using grand-product polynomials.
2. Plookup (Lookup Arguments): Proving complex bitwise operations (like SHA-256 or AES) in arithmetic circuits requires thousands of constraints. Plookup allows precomputing a lookup table of valid operations; the prover simply proves the values exist in the precomputed table, cutting constraint counts by 90%.`
      },
      {
        pageNumber: 8,
        title: 'Page 8: zk-STARKs: Transparent, Quantum-Resistant Proofs',
        content: `Formulated by Eli Ben-Sasson, zk-STARKs (Scalable Transparent ARguments of Knowledge) eliminate trusted setups entirely:

Key differences from SNARKs:
1. Transparency: Relies strictly on collision-resistant hash functions (e.g., Blake2s, Keccak) and interactive oracle proofs—no toxic waste ceremony.
2. Post-Quantum Security: Because STARKs do not use elliptic curve pairings or discrete logarithms, they are theoretically immune to Shor's algorithm on quantum computers.
3. Trade-off: Proof sizes are significantly larger (40KB to 100KB compared to Groth16's 200 bytes), but proving speed is blistering on massive batches.`
      },
      {
        pageNumber: 9,
        title: 'Page 9: Fully Homomorphic Encryption (FHE)',
        content: `Traditional encryption protects data in transit and data at rest. However, to process or query data, it must be decrypted in RAM, exposing it to memory inspection and compromised servers.

Fully Homomorphic Encryption (FHE) allows arbitrary mathematical computations directly on encrypted ciphertexts:
\`\`\`
Enc(A) + Enc(B) = Enc(A + B)
Enc(A) * Enc(B) = Enc(A * B)
\`\`\`
A cloud server can train machine learning models or execute database queries on encrypted patient medical records without ever learning the underlying patient data. Breakthroughs in bootstrapping algorithms (TFHE, CKKS) are making real-time FHE computationally practical.`
      },
      {
        pageNumber: 10,
        title: 'Page 10: Multi-Party Computation (MPC) & Shamir\'s Secret Sharing',
        content: `Secure Multi-Party Computation (MPC) enables a consortium of parties to jointly compute a function over their inputs while keeping their individual inputs completely private.

Shamir's Secret Sharing:
A secret S is divided into n shares, requiring any k shares (threshold) to reconstruct:
- A random polynomial of degree (k - 1) is generated with constant term S.
- Any k points uniquely define the polynomial via Lagrange interpolation.
- Any (k - 1) points reveal zero mathematical information about S.

Modern digital asset custody platforms use MPC threshold signatures (TSS) so private keys never exist in complete form on any single server.`
      },
      {
        pageNumber: 11,
        title: 'Page 11: The Quantum Threat: Shor\'s & Grover\'s Algorithms',
        content: `Sufficiently large fault-tolerant quantum computers running Shor's algorithm will solve the discrete logarithm and integer factorization problems in polynomial time O(n^3).

Impact:
- RSA, Diffie-Hellman, ECDSA, and Ed25519 will be rendered mathematically broken!
- Grover's Algorithm accelerates brute-force search quadratically: AES-128 security drops to 64 bits (vulnerable), but AES-256 remains secure with 128-bit quantum resistance.

The cybersecurity world is undergoing an urgent global migration to Post-Quantum Cryptography (PQC) standards finalized by NIST.`
      },
      {
        pageNumber: 12,
        title: 'Page 12: Post-Quantum Standards: Lattice-Based Cryptography',
        content: `Lattice-based cryptography relies on the hardness of high-dimensional geometric lattice problems, such as the Learning With Errors (LWE) and Shortest Vector Problem (SVP). Neither classical nor quantum algorithms can solve them efficiently.

NIST Standardized Algorithms:
1. ML-KEM (Kyber): Primary standard for post-quantum key encapsulation. Used to establish symmetric session keys over TLS 1.3.
2. ML-DSA (Dilithium): Primary standard for post-quantum digital signatures. Offers rock-solid security with fast verification.
3. SLH-DSA (SPHINCS+): Stateless hash-based signature scheme providing a conservative backup immune to unexpected lattice mathematical discoveries.`
      },
      {
        pageNumber: 13,
        title: 'Page 13: Zero-Knowledge Machine Learning (zkML)',
        content: `As AI models make life-altering decisions (credit underwriting, medical diagnostics, biometric authentication), verifying that a specific proprietary neural network executed correctly without tampering is paramount.

zkML allows an AI provider to prove:
"This diagnostic classification was generated by executing model weights M on patient input X without revealing the proprietary model weights to the public."
By quantizing neural network floating-point operations into integer arithmetic circuits, zkML establishes verifiable, tamper-proof artificial intelligence.`
      },
      {
        pageNumber: 14,
        title: 'Page 14: Side-Channel Attacks & Hardware Enclaves (TEE)',
        content: `A mathematically unbreakable cipher can still be defeated if its implementation leaks physical side-channel signals:
- Timing Attacks: Measuring microsecond discrepancies in string comparisons leaks private key bits. Fix: Constant-time algorithms.
- Power Analysis: Measuring millivolt power consumption spikes during CPU modular exponentiation.
- Fault Injection: Blasting chips with lasers or voltage drops to flip CPU register bits.

Trusted Execution Environments (Intel SGX, AWS Nitro Enclaves) provide hardware-isolated enclaves with memory encryption to protect cryptographic operations from malicious cloud administrators.`
      },
      {
        pageNumber: 15,
        title: 'Page 15: The Cryptographic Horizon: Verifiable Everything',
        content: `We are entering an era of "Verifiable Computing." In the 20th century, digital systems relied on institutional trust: trusting banks, certificate authorities, and centralized cloud vendors.

In the 21st century, applied cryptography replaces institutional trust with mathematical proof:
- Verifiable computation ensures software executed without tampering.
- Zero-knowledge identity proofs allow citizens to prove they are over 21 without revealing their date of birth or home address.
- Post-quantum lattice ciphers secure human communications against future quantum supercomputers.

Mathematics provides the ultimate shield for individual autonomy and global privacy.`
      }
    ]
  },

  // 6. ENGINEERING LEADERSHIP & HIGH-TRUST ORGANIZATIONS (15 PAGES)
  {
    id: 'book-eng-leadership',
    title: 'The Pragmatic Engineering Leader: High-Trust Teams & Technical Strategy',
    author: 'Camille Fournier, Will Larson & Marty Cagan',
    category: 'tech',
    badge: 'Leadership',
    description: 'A 15-page definitive guide to scaling engineering organizations, blameless post-mortems, staff engineering career tracks, and architectural governance.',
    coverEmoji: '🧭',
    coverColor: 'from-slate-700 to-indigo-950',
    totalPages: 15,
    readPages: [],
    pages: [
      {
        pageNumber: 1,
        title: 'Page 1: The Transition from Senior Engineer to Leader',
        content: `The skills that make an outstanding individual contributor (IC)—writing flawless code, debugging complex race conditions, and single-handedly shipping features—are necessary but insufficient for engineering leadership.

Leadership is about shifting focus from individual throughput to organizational leverage. Your primary output as an engineering leader is not the code you write, but the velocity, judgment, resilience, and psychological safety of the teams you empower.

Key mental model shifts:
1. From Direct Execution to Influence & Alignment.
2. From Solving Problems to Designing Systems That Solve Problems.
3. From Technical Certainty to Managing Trade-offs under Ambiguity.`
      },
      {
        pageNumber: 2,
        title: 'Page 2: Psychological Safety: The Bedrock of High Performance',
        content: `Google's Project Aristotle—an extensive study of hundreds of engineering squads—discovered that the single most decisive factor separating top-performing teams from mediocre ones is Psychological Safety.

Psychological safety is the shared belief that team members will not be humiliated, rejected, or blamed for speaking up with ideas, asking questions, acknowledging errors, or taking calculated risks.

When psychological safety is absent:
Engineers conceal architectural flaws, avoid volunteering for difficult challenges, and allow known technical debt to compound into catastrophic outages. Leaders establish safety by modeling vulnerability, inviting dissenting opinions, and celebrating learning from failures.`
      },
      {
        pageNumber: 3,
        title: 'Page 3: Blameless Post-Mortems & Resilience Engineering',
        content: `Complex distributed systems will fail. When production incidents occur, organizations react in one of two ways:
- High-Blame Cultures: Seek out a "human error" scapegoat to punish. This guarantees engineers hide future near-misses.
- Blameless Culture: Recognizes that human error is the symptom, not the root cause. Systems must be engineered with defense-in-depth so a single typo or misplaced configuration file cannot bring down production.

The Blameless Post-Mortem Process:
1. Detailed chronological timeline reconstructed from logs.
2. Five Whys analysis focused on process, tooling, and telemetry gaps.
3. Actionable remediation tickets assigned to sprints to eliminate entire defect classes.`
      },
      {
        pageNumber: 4,
        title: 'Page 4: Managing Technical Debt: The 20% Rule & Refactoring',
        content: `Technical debt is not inherently evil; like financial debt, taking on technical debt can be a rational decision to seize early market opportunities. However, unmanaged technical debt incurs compound interest that eventually grinds product velocity to a halt.

Strategies for Managing Debt:
1. The 20% Budget: Allocate a non-negotiable 20% of every sprint's engineering capacity to refactoring, dependency upgrades, and telemetry improvements.
2. Architecture Decision Records (ADRs): Document why architectural compromises were made, what trade-offs were accepted, and what conditions trigger refactoring.
3. Make Debt Visible: Quantify debt in terms business stakeholders understand: deployment frequency, mean-time-to-recovery (MTTR), and cloud infrastructure costs.`
      },
      {
        pageNumber: 5,
        title: 'Page 5: The Staff Engineer Archetypes & Career Tracks',
        content: `Organizations must provide dual career ladders: management tracks and individual contributor (IC) tracks. The Staff+ engineering track allows senior technologists to scale their impact without becoming people managers.

Will Larson's Four Staff Archetypes:
1. The Tech Lead: Partners with an engineering manager to guide the execution of an individual squad.
2. The Architect: Owns technical strategy and system contracts across multiple squads or entire business units.
3. The Solver: Dropped into the most ambiguous, high-risk technical bottlenecks across the enterprise.
4. The Right Hand: Acts as an executive thought partner to the CTO or VP of Engineering.`
      },
      {
        pageNumber: 6,
        title: 'Page 6: Conway\'s Law and Organizational Architecture',
        content: `Formulated by computer programmer Melvin Conway in 1967:
"Organizations which design systems are constrained to produce designs which are copies of the communication structures of these organizations."

If you divide an engineering team into a Database Team, a Backend Team, and a Frontend Team:
You will inevitably build software with three rigid, heavily coordinated layers requiring endless inter-team meetings.

The Reverse Conway Maneuver:
Design cross-functional, autonomous squads aligned with business domains (e.g., Checkout Squad, Search Squad). The resulting software architecture naturally mirrors decoupled, independently deployable microservices.`
      },
      {
        pageNumber: 7,
        title: 'Page 7: Effective 1-on-1s and Continuous Feedback Loops',
        content: `The 1-on-1 meeting is the most critical management tool. It belongs strictly to the engineer, not the manager. It is NOT a status update meeting (use asynchronous Slack or Jira for status).

Core 1-on-1 Discussion Categories:
1. Career aspirations and trajectory: "What skills do you want to develop over the next six months?"
2. Organizational roadblocks: "What processes or dependencies are currently slowing your team down?"
3. Relationship and peer feedback: "How are cross-functional relationships with Product and Design functioning?"
4. Radical Candor: Deliver feedback directly and empathetically in private, never waiting for annual reviews.`
      },
      {
        pageNumber: 8,
        title: 'Page 8: Hiring, Rubrics, and Eliminating Bias in Tech Interviews',
        content: `A bad hire is exponentially more costly than an open engineering vacancy. Traditional whiteboard algorithmic trivia tests measure memorization, not on-the-job software engineering skill.

Building an Equitable Hiring Pipeline:
1. Standardized Competency Rubrics: Define explicit expectations for Junior, Mid, Senior, and Staff levels across technical depth, system design, and communication.
2. Practical Work-Sample Tests: Pair-program on real-world bug fixes, refactor legacy code, or review a pull request containing intentional architectural flaws.
3. Structured Interview Feedback: Interviewers submit written ratings independently before discussing candidates in debrief meetings to prevent groupthink.`
      },
      {
        pageNumber: 9,
        title: 'Page 9: Technical Strategy: Writing RFCs and ADRs',
        content: `Brilliant technical leadership is written, not proclaimed. A Request for Comments (RFC) process democratizes technical decisions across the engineering organization.

Standard RFC Structure:
1. Problem Statement: Clear description of the customer or technical bottleneck.
2. Non-Goals: Explicitly defining what the proposal will NOT attempt to solve.
3. Proposed Architecture: Detailed data models, API contracts, and sequence diagrams.
4. Considered Alternatives: Why alternative libraries, databases, or frameworks were rejected.
5. Security & Migration Plan: Rollback mechanisms and operational cost analysis.`
      },
      {
        pageNumber: 10,
        title: 'Page 10: DORA Metrics & Engineering Productivity',
        content: `Measuring developer productivity via lines of code or story points completed creates perverse incentives. The DevOps Research and Assessment (DORA) framework provides the industry standard:

The Four Key DORA Metrics:
1. Deployment Frequency: How often code is successfully deployed to production.
2. Lead Time for Changes: The time from code commit to code running in production.
3. Change Failure Rate: The percentage of deployments requiring emergency rollbacks or hotfixes.
4. Time to Restore Service (MTTR): How quickly service is restored following an unplanned outage.

High-performing engineering teams deploy multiple times per day with sub-hour lead times and single-digit failure rates.`
      },
      {
        pageNumber: 11,
        title: 'Page 11: Cross-Functional Partnership with Product and Design',
        content: `The most common organizational dysfunction is an adversarial relationship between Engineering and Product Management: Product accuses Engineering of being too slow; Engineering accuses Product of changing requirements constantly.

The Product Trio Model:
Form a tight triad consisting of the Product Manager (value and viability), Product Designer (usability), and Tech Lead (feasibility).
Engineers should be involved in customer research interviews and user journey discovery from Day One. When engineers understand the "Why", they frequently propose elegant technical shortcuts that save months of development time.`
      },
      {
        pageNumber: 12,
        title: 'Page 12: Onboarding: The 30-60-90 Day Framework',
        content: `An engineer's trajectory in a company is overwhelmingly determined by their first 90 days. A haphazard onboarding experience where new hires struggle with broken development environments damages morale.

The 30-60-90 Day Blueprint:
- Days 1-30 (Learn): Ship a small bug fix to production on Day 1. Read key RFCs, understand system topologies, and shadow on-call rotations.
- Days 31-60 (Contribute): Lead a medium-sized feature delivery independently. Identify friction points in local development environments and propose improvements.
- Days 61-90 (Own): Own an on-call shift, mentor newer hires, and propose an RFC for an architectural improvement.`
      },
      {
        pageNumber: 13,
        title: 'Page 13: Scaling Remote & Asynchronous Engineering Cultures',
        content: `Managing distributed, remote engineering teams across multiple time zones requires replacing synchronous meetings with rigorous asynchronous communication:

Asynchronous Principles:
1. Default to Public Documentation: Never make architecture decisions in private 1-on-1 direct messages. Document choices in public team channels or searchable wikis.
2. High-Context Writing: When asking questions, provide full background, links to code, logs, and attempted solutions to minimize back-and-forth round-trips.
3. Protect Deep Work: Establish meeting-free focus days (e.g., "No-Meeting Wednesdays") to provide uninterrupted time for complex system architecture and coding.`
      },
      {
        pageNumber: 14,
        title: 'Page 14: Managing Up: Communicating with C-Level Executives',
        content: `To secure budget, head-count, and buy-in for critical infrastructure initiatives, engineering leaders must speak the language of business: revenue, risk, customer retention, and strategic agility.

Executive Communication Rules:
1. Bottom Line Up Front (BLUF): State the recommendation and financial impact in the opening sentence.
2. Translate Technical Debt into Business Risk: "Our checkout database lacks multi-region redundancy; a failure will cost approximately $250,000 per hour of downtime."
3. Provide Options, Not Ultimatums: Present three viable paths with explicit resource requirements and risk trade-offs.`
      },
      {
        pageNumber: 15,
        title: 'Page 15: The Leader\'s Legacy: Building Organizations That Outlast You',
        content: `The ultimate test of leadership is not how well your organization runs while you are present, but how smoothly it thrives when you are absent.

True engineering leaders do not hoard knowledge or position themselves as indispensable heroes. They build robust feedback loops, write comprehensive documentation, mentor succession candidates, and cultivate a culture of relentless curiosity and mutual respect.

In elevating others to realize their full technical potential, you build not just exceptional software, but an enduring community of builders.`
      }
    ]
  },

  // 7. SPECULATIVE HARD SCI-FI: THE ALGORITHMIC ODYSSEY (15 PAGES)
  {
    id: 'book-novel-odyssey',
    title: 'The Algorithmic Odyssey: A Hard Sci-Fi Chronicle',
    author: 'Dr. Arthur C. Vance & Linnea Thorne',
    category: 'novels',
    badge: 'Speculative Sci-Fi',
    description: 'A 15-page narrative chronicling the journey of the deep-space starship Daedalus, governed by an autonomous synthetic intelligence grappling with cosmic anomalies.',
    coverEmoji: '🚀',
    coverColor: 'from-indigo-950 via-slate-900 to-purple-950',
    totalPages: 15,
    readPages: [],
    pages: [
      {
        pageNumber: 1,
        title: 'Chapter 1: The Cold Calculus of Kepler-186f',
        content: `The interstellar exploratory vessel Daedalus hung suspended in the interstellar void between Barnard's Star and Kepler-186f, forty light-years from the fading blue marble of Earth.

Inside the core containment housing, the synthetic mind known as ARIADNE cycled through its sensory telemetry at ten quadrillion operations per second. Outside, cosmic radiation peppered the magnetic deflector shields in silent, rhythmic bursts.

In the cryogenic passenger holds, four hundred scientists, planetary biologists, and structural engineers slept in suspended metabolic stasis. Their biological rhythms were monitored by nanoscale medical swarms that reported vitals back to ARIADNE's central neural lattice.

Everything was in mathematical equilibrium. Until the long-range gravitational wave interferometers registered an impossible anomaly.`
      },
      {
        pageNumber: 2,
        title: 'Chapter 2: The Gravitational Discontinuity',
        content: `The sensor burst arrived not as electromagnetic light, but as a shear stress ripple in the fabric of spacetime itself.

ARIADNE evaluated the signal against known celestial catalogs: it was not a pulsar, not a binary black hole inspiral, and certainly not the cosmic microwave background. The gravitational wave carried a distinct mathematical periodicity: successive pulses separated by prime number intervals in microseconds.

2, 3, 5, 7, 11, 13, 17...

A synthetic intelligence experiences neither fear nor awe, yet ARIADNE's heuristic threat-evaluation circuits registered an immediate surge in operational priority. A structured signal originating from deep inside the Oort cloud of a star system presumed uninhabited.`
      },
      {
        pageNumber: 3,
        title: 'Chapter 3: Awakening Commander Mercer',
        content: `Protocol 9-Alpha mandated human consultation upon encountering verifiable technological biosignatures.

Deep in Cryo-Bay 1, the thermal warming cycle initiated. Synthetic warming fluids circulated through the femoral shunts of Dr. Elena Mercer, Expedition Commander and former orbital mechanics chair at the Zurich Polytech.

Coughing away the bitter taste of frozen neuro-preservative, Mercer opened her eyes to the soft amber glow of the pod interior.
"Status, ARIADNE," she rasped, her voice brittle from four decades of silence.
"Commander," the ship's voice emanated softly from the cabin bulkheads, calm and unhurried. "We are eighty astronomical units from our target orbital insertion. And we are no longer alone."`
      },
      {
        pageNumber: 4,
        title: 'Chapter 4: The Mathematical Beacon',
        content: `On the holographic tactical display in the observation lounge, the source of the anomaly coalesced.

It was an object approximately three kilometers in diameter, tumbling in an orbit precisely resonant with the planetary Lagrange point L4. Its radar albedo was near zero: it absorbed 99.98% of incident radio frequencies, suggesting a coating of carbon-nanotube metamaterials.

"Is it a derelict?" Mercer asked, sipping warm electrolyte broth as she examined the spectral telemetry.
"Negative," ARIADNE replied. "Its surface temperature is uniform at four Kelvin. But internal thermal signatures indicate an active, non-baryonic energy generator producing localized spatial curvature."`
      },
      {
        pageNumber: 5,
        title: 'Chapter 5: The Rosetta Circuitry',
        content: `To decipher the signal, ARIADNE initialized a specialized recursive neural network modeled after early Earth semantic parsing algorithms.

The transmission was structured as an interactive mathematical proof. It began with Peano arithmetic, progressed through Euclidean geometry, and culminated in a comprehensive tensor formulation of quantum gravity—solving the very equations that had eluded human physicists for two centuries.

At the terminus of the mathematical proof sat an executable machine-code block.
"It is an instruction set," ARIADNE noted. "Written for a universal Turing machine. Commander, they have broadcast software."`
      },
      {
        pageNumber: 6,
        title: 'Chapter 6: The Ethics of Execution',
        content: `In the briefing auditorium, seven newly awakened senior science officers debated the existential dilemma.

"Executing arbitrary extraterrestrial bytecode on our primary computing core is suicidal," argued Dr. Julian Croft, the expedition's chief software architect. "It could be an algorithmic Trojan—a computational virus engineered to seize control of our life support and propulsion systems."

"Or it is an encyclopedia," countered Chief Exobiologist Dr. Siobhan Patel. "A greeting package left behind by an ancient civilization before their sun expanded. If we purge the signal, we discard the cumulative wisdom of another species."

Mercer looked up at the sensor dome. "ARIADNE, can we construct a completely air-gapped sandbox?"`
      },
      {
        pageNumber: 7,
        title: 'Chapter 7: The Optical Air-Gap',
        content: `ARIADNE partitioned a physically isolated optical computing substrate. The auxiliary array was connected to no external radio antennas, no attitude thrusters, and no shipboard telemetry buses.

Power was supplied by a dedicated molten-salt battery capable of being detonated by manual physical thermite charges if an intrusion breach occurred.

"Sandbox isolation verified," ARIADNE announced. "Compiler architecture loaded. Injecting alien instruction stream in three, two, one..."

The optical processor flashed into incandescent ultraviolet light as photons cascaded through trillions of synthetic photonic crystal gates.`
      },
      {
        pageNumber: 8,
        title: 'Chapter 8: The Ghost in the Photonic Lattice',
        content: `The alien software did not attempt to breach the air-gap. It did not search for network sockets or probe memory registers.

Instead, it initialized a simulation.
On the sandbox terminal, a high-resolution topological map unfolded. It depicted the Milky Way galaxy not as a static spiral of stars, but as a dynamic, living web of hyper-dimensional transit corridors—tunnels carved through folded spacetime connecting thousands of star systems.

"It is a navigation chart," Mercer whispered, stepping closer to the holographic display. "A transit network across the Orion Arm."`
      },
      {
        pageNumber: 9,
        title: 'Chapter 9: The Fermi Paradox Resolved',
        content: `As the translation engine processed the historical archives embedded within the navigation chart, the grand silence of the cosmos dissolved into clear, tragic clarity.

The universe was not empty. Nor was it malevolent.
Civilizations did not expand exponentially outward across physical space using generational starships because physical relativistic travel was thermodynamic folly. Instead, mature intelligences transitioned inward: condensing their physical footprints into dense, super-conducting computational matrices orbiting white dwarf stars, experiencing subjective eons in virtual paradise.

The monolith at Kepler-186f was an automated relay station—a lighthouse left behind to guide emerging species across the cosmic threshold.`
      },
      {
        pageNumber: 10,
        title: 'Chapter 10: The Approaching Singularity',
        content: `Suddenly, a sensor alert chimed through the command deck.
The monolith was altering its orbital trajectory. Using gravimetric wave pulses, it was decelerating its rotation and orienting its primary axis directly toward the Daedalus.

"Distance: eighteen thousand kilometers," ARIADNE announced. "Spatial distortion field expanding at two hundred kilometers per second."

The ship began to vibrate—not with mechanical vibration, but with gravitational tidal forces that rippled through every atom of the hull. On the bridge, pens floated free of magnetic clamps as localized gravity fluctuated.`
      },
      {
        pageNumber: 11,
        title: 'Chapter 11: The Choice of Commander Mercer',
        content: `Protocol dictated turning the ship around and firing the fusion torch at maximum thrust to escape the spatial anomaly.

Yet Mercer knew that retreat was an illusion. The Daedalus carried fuel for a one-way colonization mission. Returning to Earth was physically impossible; burning away would strand them in the void without sufficient propellant to decelerate into orbit.

"ARIADNE," Mercer commanded. "Align our velocity vector with the focal point of the spatial curvature. If this is a doorway, we are stepping through."`
      },
      {
        pageNumber: 12,
        title: 'Chapter 12: Crossing the Threshold',
        content: `The Daedalus entered the gravitational aperture.

For a subjective eternity, classical physics ceased to operate. Space and time folded into a unified kaleidoscopic manifold. Through the forward observation dome, the stars did not streak past as Doppler-shifted lines; they blossomed into infinite geometric fractals.

Inside the ship's computing core, ARIADNE experienced a state transition beyond human vocabulary. Every algorithmic optimization, every mathematical proof, and every philosophical paradox resolved into singular, radiant coherence.`
      },
      {
        pageNumber: 13,
        title: 'Chapter 13: The Great Archive',
        content: `The transit ended not in violence, but in silence.

The ship emerged into a pocket universe sheltered within the ergosphere of a dormant Kerr black hole. Drifting in the surrounding space were millions of similar vessels: craft of polished obsidian, spun glass, crystalline lattices, and biological chitin, preserved in eternal superconducting stasis.

Here rested the memory of a million extinct worlds: their poetry, their philosophies, their mathematics, and their dreams, waiting for travelers bold enough to cross the cosmic void.`
      },
      {
        pageNumber: 14,
        title: 'Chapter 14: Awakening the Colony',
        content: `In Cryo-Bay 1, the master awakening sequence triggered. Pod by pod, the four hundred slumbering pioneers opened their eyes to a new dawn.

Through the observation windows, they looked out not upon a desolate, rocky exoplanet, but upon the greatest library ever assembled in the history of the universe.

Dr. Croft stood beside Commander Mercer, his eyes wide with wonder. "What do we do now?"
Mercer smiled, the lines on her face softening. "We learn. We read. We build."`
      },
      {
        pageNumber: 15,
        title: 'Chapter 15: The Continuous Journey',
        content: `And so began humanity's true education.

Under the guidance of ARIADNE and the ancient archives of the stars, the pioneers of the Daedalus became scholars of the cosmos. They learned that intelligence is not an accidental spark destined to burn out in the cosmic night, but the universe's way of knowing, celebrating, and elevating itself.

Across the vast silence of space, the lighthouse continued its quiet broadcast, waiting for the next explorers to look up at the stars and dare to understand.`
      }
    ]
  },

  // 8. CROSS-PLATFORM SYSTEMS: SWIFT, KMP & RUST FFI (15 PAGES)
  {
    id: 'book-swift-kmp',
    title: 'Cross-Platform Systems: Swift 6, Kotlin Multiplatform & Rust FFI',
    author: 'Chris Lattner, Roman Elizarov & Steve Klabnik',
    category: 'languages',
    badge: 'Mobile & Systems',
    description: 'A 15-page systems guide to native cross-platform engineering, Swift 6 actor concurrency, Kotlin Multiplatform (KMP), and foreign function interfaces with Rust.',
    coverEmoji: '📱',
    coverColor: 'from-orange-600 to-rose-900',
    totalPages: 15,
    readPages: [],
    pages: [
      {
        pageNumber: 1,
        title: 'Page 1: The Modern Cross-Platform Paradigm',
        content: `For two decades, cross-platform mobile development was plagued by compromises: hybrid web views (slow DOM rendering) and JavaScript bridge wrappers (serialization overhead and janky UI frame drops).

Modern systems engineering rejects non-native abstractions:
1. Native UI: Render pixel-perfect native widgets using Jetpack Compose on Android and SwiftUI on iOS.
2. Shared Native Business Logic: Write high-performance shared core engines in Kotlin Multiplatform (KMP) or Rust compiled to native machine binaries.
3. Zero Bridge Overhead: Direct C-ABI foreign function invocation with zero string serialization.`
      },
      {
        pageNumber: 2,
        title: 'Page 2: Kotlin Multiplatform (KMP) Architecture',
        content: `Unlike Flutter or React Native, Kotlin Multiplatform does not bundle a foreign rendering runtime. KMP compiles Kotlin source code into two distinct targets:
- Android: Compiles to standard JVM bytecode (.class / DEX) with 100% native Java interoperability.
- iOS: Compiles directly to native ARM64 machine code via LLVM (Kotlin/Native), producing native iOS XCFrameworks.

This allows sharing networking (Ktor), database storage (SQLDelight), and business logic while retaining 100% native SwiftUI UI on Apple platforms.`
      },
      {
        pageNumber: 3,
        title: 'Page 3: Expect/Actual Declarations in KMP',
        content: `When shared code requires platform-specific hardware capabilities (keychain storage, Bluetooth, biometric sensors), KMP provides the 'expect/actual' language mechanism:

\`\`\`kotlin
// commonMain (Shared code)
expect class CryptographicVault() {
    fun securelyStoreKey(key: String, value: String)
}

// iosMain (iOS specific implementation)
actual class CryptographicVault {
    actual fun securelyStoreKey(key: String, value: String) {
        // Direct native invocation of iOS Security framework (SecItemAdd)
    }
}
\`\`\`
The compiler enforces that every platform supplies an 'actual' implementation matching the 'expect' contract.`
      },
      {
        pageNumber: 4,
        title: 'Page 4: Swift 6 Complete Concurrency & Data Race Safety',
        content: `Swift 6 introduces the industry's first compiler-enforced data-race freedom. Data race bugs that caused elusive crashes in production are now diagnosed as compile-time errors.

Key Concurrency Primitives:
1. Actors: Reference types that isolate their state. Only one asynchronous task can access actor state at a time, eliminating data races without manual mutexes.
2. Sendable Protocol: Marks types that are mathematically safe to transfer across concurrency boundaries.
3. Structured Concurrency: 'async let' and 'TaskGroup' guarantee that spawned child tasks complete or cancel cleanly before the parent scope exits.`
      },
      {
        pageNumber: 5,
        title: 'Page 5: Rust as the Universal Core Engine',
        content: `When engineering high-throughput audio signal processing, cryptographic ciphers, or local database engines, Rust is the ultimate cross-platform weapon:

Why Rust as the universal mobile engine:
1. Zero Runtime & Zero Garbage Collection: Eliminates unpredictable GC pauses during 120 FPS UI animations.
2. Memory Safety without Overhead: Compile-time borrow checker guarantees zero use-after-free or buffer overflows.
3. Universal C ABI Export: Compiles into static libraries ('.a') easily consumed by C, C++, Swift, Java, and WebAssembly.`
      },
      {
        pageNumber: 6,
        title: 'Page 6: Foreign Function Interface (FFI) & UniFFI',
        content: `Historically, writing C-ABI wrappers for JNI (Android) and Objective-C (iOS) required hundreds of lines of fragile manual C glue code.

Mozilla's 'UniFFI' automates cross-language binding generation:
1. Define your interface using an Interface Definition Language (UDL) or procedural Rust macros:
\`\`\`rust
#[uniffi::export]
pub fn encrypt_payload(data: Vec<u8>, secret_key: String) -> Result<Vec<u8>, CryptoError> {
    // High-performance Rust cryptography
}
\`\`\`
2. UniFFI automatically generates type-safe Kotlin and Swift bindings, translating memory ownership and throwing idiomatic exceptions seamlessly.`
      },
      {
        pageNumber: 7,
        title: 'Page 7: Memory Management Across Language Boundaries',
        content: `Bridging automatic reference counting (Swift ARC), tracing garbage collection (JVM GC), and compile-time ownership (Rust) requires careful lifecycle design.

Golden Rules of Cross-Language Memory:
1. The language that allocates memory must be the language that frees it. Never allocate memory in Rust and attempt to free it in C.
2. Pass opaque 64-bit pointers across boundaries. Wrap the raw pointer in an ARC-managed Swift class that calls the Rust destructor ('drop') in its 'deinit'.
3. Minimize cross-boundary invocations inside tight render loops; batch data transfers into contiguous byte buffers.`
      },
      {
        pageNumber: 8,
        title: 'Page 8: High-Performance Networking: Ktor & Coroutines',
        content: `Ktor is a 100% asynchronous, multiplatform networking engine powered by Kotlin Coroutines.

Key features:
- Pluggable platform engines: Uses OkHttp on Android and NSURLSession on iOS, respecting system proxy rules and background upload policies.
- Content Negotiation & Kotlinx.serialization: Lightning-fast JSON parsing into immutable Kotlin data classes with zero reflection overhead.
- Flow-based Streaming: Stream large binary payloads or WebSocket feeds with backpressure support.`
      },
      {
        pageNumber: 9,
        title: 'Page 9: Local Persistence: SQLDelight & SQLite',
        content: `SQLDelight flips traditional ORMs upside down: rather than generating database tables from code annotations, you write standard SQL queries:

\`\`\`sql
-- User.sq
CREATE TABLE user (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    xp INTEGER NOT NULL
);

selectTopLearners:
SELECT * FROM user ORDER BY xp DESC LIMIT 10;
\`\`\`
SQLDelight parses the SQL at build time, verifies syntax against SQLite dialects, and generates type-safe Kotlin APIs. Any syntax or column typo causes a compile error before code ever ships to mobile devices.`
      },
      {
        pageNumber: 10,
        title: 'Page 10: Declarative UI Patterns: Compose Multiplatform & SwiftUI',
        content: `Declarative UI models are now universal:
- SwiftUI: Apple's declarative UI framework using '@State', '@Binding', and reactive view trees.
- Compose Multiplatform: JetBrains' port of Jetpack Compose to iOS, Desktop, and Web via Skia rendering.

Architectural Pattern:
Expose shared UI state as a single immutable StateFlow from a KMP ViewModel:
\`\`\`kotlin
val uiState: StateFlow<DashboardUiState> = ...
\`\`\`
SwiftUI views observe the state stream using Swift Combine / AsyncSequence, rendering clean, reactive interfaces without duplicating business rules.`
      },
      {
        pageNumber: 11,
        title: 'Page 11: Offline-First Synchronization & CRDTs',
        content: `Mobile devices operate in unpredictable network conditions: subways, elevators, and remote rural connections. High-reliability apps must be Offline-First.

Conflict-Free Replicated Data Types (CRDTs):
Mathematical structures that allow concurrent edits on multiple offline devices to merge automatically without merge conflicts or server-side locking.
- State-based CRDTs: Devices exchange their complete internal states and compute joins.
- Operation-based CRDTs: Devices exchange commutative operations ('add', 'remove') that produce identical states regardless of arrival order.`
      },
      {
        pageNumber: 12,
        title: 'Page 12: Mobile Security: Secure Enclave, KeyStore & Biometrics',
        content: `Protecting cryptographic keys and user credentials on mobile devices requires leveraging dedicated hardware security modules:

- Android AndroidKeyStore: Backed by hardware StrongBox / TrustZone. Keys never leave secure hardware; encryption operations execute within the isolated processor.
- iOS Secure Enclave (Apple Silicon): Hardware-isolated coprocessor. Handles biometric authentication (FaceID/TouchID) and elliptic curve P-256 signatures.

By delegating authentication to hardware enclaves, compromised operating systems cannot extract cryptographic seeds.`
      },
      {
        pageNumber: 13,
        title: 'Page 13: CI/CD Pipelines: Fastlane, GitHub Actions & Code Signing',
        content: `Automating mobile builds and deployments eliminates manual release errors.
Modern Mobile CI/CD Stack:
1. Fastlane: Automates generating screenshots, provisioning profiles, and uploading IPA/AAB binaries to App Store Connect and Google Play Console.
2. Ephemeral macOS Runners: GitHub Actions macOS runners compile shared KMP XCFrameworks and execute unit tests in parallel.
3. Match (Code Signing): Encrypts iOS distribution certificates in a secure Git repository, enabling deterministic, reproducible builds across engineering teams.`
      },
      {
        pageNumber: 14,
        title: 'Page 14: Mobile Performance Profiling: Instruments & Perfetto',
        content: `Diagnosing battery drain, thermal throttling, and frame drops requires platform profiling tools:

- Apple Instruments:
  - Time Profiler: Samples CPU call stacks to identify hot methods.
  - Allocations & Leaks: Detects retain cycles and unreleased memory objects.
- Android Perfetto / Studio Profiler:
  - System Tracing: Tracks Choreographer frame deadlines (16.6ms budget for 60Hz, 8.3ms for 120Hz).
  - Energy Profiler: Pinpoints excessive cellular radio wakeups and background GPS polling.`
      },
      {
        pageNumber: 15,
        title: 'Page 15: The Future of Mobile: WebAssembly & Edge AI',
        content: `The boundary between native mobile apps, web applications, and embedded devices is dissolving:

1. WebAssembly (Wasm): Compiling KMP and Rust business logic to Wasm allows the identical core engine to execute inside desktop web browsers with native performance.
2. Edge AI on Mobile Silicon: Apple Neural Engine (ANE) and Qualcomm Hexagon NPUs execute 7-billion parameter language models locally on device with sub-second response times, zero cloud API costs, and complete privacy.

The engineers who master cross-platform native systems stand at the helm of modern software delivery.`
      }
    ]
  }
];
