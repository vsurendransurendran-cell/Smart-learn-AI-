import { LibraryBook } from '../../types';

export const AI_AND_ALGORITHMS_BOOKS: LibraryBook[] = [
  // 16. DEEP LEARNING & TRANSFORMERS (10 PAGES)
  {
    id: 'book-transformers-ai',
    title: 'Deep Learning Foundations: Transformers & Attention Mechanisms',
    author: 'Dr. Yann LeCun & Vaswani et al.',
    category: 'ai',
    badge: 'AI Architecture',
    description: 'A 10-page mathematical and architectural treatise on Transformer encoders/decoders, self-attention, FlashAttention, and LLM scaling laws.',
    coverEmoji: '🧠',
    coverColor: 'from-purple-800 to-indigo-950',
    totalPages: 10,
    readPages: [],
    pages: [
      {
        pageNumber: 1,
        title: 'Page 1: The Pre-Transformer Era: Limitations of RNNs and LSTMs',
        content: `Before 2017, natural language processing was dominated by recurrent neural networks (RNNs) and Long Short-Term Memory networks (LSTMs). While RNNs naturally process sequential tokens by passing hidden state vectors forward, they suffer from two critical architectural bottlenecks:

1. Sequential Bottleneck: Processing token 't' strictly requires the hidden state of token 't-1'. This sequential dependency prevents parallel computation on modern GPU tensor cores during training.
2. Vanishing Gradients & Long-Range Decay: Information from distant words decays over long context lengths, making it difficult for models to capture syntactic dependencies across hundreds of tokens.

The Transformer architecture eliminated recurrence entirely, replacing it with parallel matrix multiplication over sequence positions.`
      },
      {
        pageNumber: 2,
        title: 'Page 2: Scaled Dot-Product Self-Attention: The Mathematical Core',
        content: `The foundation of the Transformer is the Scaled Dot-Product Attention mechanism:

Given input sequence representations, each token is projected into three distinct vector spaces via learned weight matrices:
- Query (Q): What the token is looking for.
- Key (K): What the token contains or offers.
- Value (V): The actual informational payload.

The mathematical formulation is:
Attention(Q, K, V) = softmax( (Q * K^T) / sqrt(d_k) ) * V

Why divide by sqrt(d_k)? For large vector dimensions, dot products grow large in magnitude, pushing the softmax function into regions with near-zero gradients. Scaling by sqrt(d_k) stabilizes gradient flow during backpropagation.`
      },
      {
        pageNumber: 3,
        title: 'Page 3: Multi-Head Attention: Diverse Subspace Projections',
        content: `Rather than computing attention once across the full hidden dimension 'd_model', Multi-Head Attention splits Queries, Keys, and Values into 'h' parallel heads (e.g., 8 or 32 heads of dimension d_k = d_model / h).

Each attention head independently attends to information at different representation subspaces:
- Head 1 might focus on subject-verb agreement.
- Head 2 might capture pronoun antecedents.
- Head 3 might track semantic tone or negation.

The outputs of all heads are concatenated and projected through a linear output matrix 'W_O', yielding a rich contextual representation that captures multifaceted relationships simultaneously.`
      },
      {
        pageNumber: 4,
        title: 'Page 4: Positional Encodings: Sine/Cosine to Rotary (RoPE)',
        content: `Because self-attention operations are permutation-invariant (order-agnostic), the model has no inherent sense of token word order. Positional information must be injected into the embeddings.

Evolution of positional encodings:
1. Sinusoidal Encodings (Vaswani et al. 2017): Adds static trigonometric sine and cosine waves of varying frequencies directly to input token embeddings.
2. Learned Positional Embeddings (BERT, GPT-2): Assigns learned vectors per absolute sequence position (limiting context windows to fixed training sizes).
3. Rotary Position Embeddings (RoPE): Multiplies Query and Key vectors by a 2D rotation matrix in the complex plane. RoPE models relative distance naturally and enables context window extrapolation (e.g., extending from 8k to 128k tokens).`
      },
      {
        pageNumber: 5,
        title: 'Page 5: Encoder-Only vs Decoder-Only Architectures',
        content: `Transformers evolved into three major architectural paradigms:

1. Encoder-Only (BERT, RoBERTa): Uses bidirectional self-attention. Every token can attend to past and future tokens. Ideal for classification, sentiment analysis, and extractive search embeddings.
2. Decoder-Only (GPT-4, Llama, Gemini): Uses causal (masked) self-attention. Tokens can ONLY attend to previous tokens. Ideal for autoregressive generative text completion.
3. Encoder-Decoder (T5, original Transformer): Encoder processes input text bidirectionally, cross-attention in decoder generates output sequentially. Ideal for translation and summarization.`
      },
      {
        pageNumber: 6,
        title: 'Page 6: Feed-Forward Networks & SwiGLU Activations',
        content: `Following the multi-head attention layer, each token vector passes through a point-wise Feed-Forward Network (FFN).

While attention mixes information ACROSS sequence tokens, the FFN transforms information WITHIN each individual token. Modern LLMs replace traditional ReLU activations with SwiGLU (Swish Gated Linear Unit):
\`\`\`
FFN_SwiGLU(x) = (Swish(x * W_gate) * (x * W_up)) * W_down
\`\`\`
Research demonstrates that SwiGLU provides superior convergence speed and higher downstream benchmark accuracy compared to standard GELU or ReLU layers.`
      },
      {
        pageNumber: 7,
        title: 'Page 7: Normalization Layers: LayerNorm vs RMSNorm',
        content: `Deep neural networks require normalization layers to prevent activations from exploding or vanishing across dozens of stacked layers:

- Pre-LN vs Post-LN: Original transformers used Post-LN (normalization after residual addition), which required delicate warm-up learning rates. Modern LLMs use Pre-LN (normalizing inputs to attention and FFN blocks), which guarantees stable gradient highways.
- RMSNorm (Root Mean Square Normalization): Replaces LayerNorm by discarding the mean calculation and normalizing strictly by the root mean square of activations. RMSNorm reduces compute latency by 7% with zero loss in training accuracy.`
      },
      {
        pageNumber: 8,
        title: 'Page 8: FlashAttention: IO-Aware GPU Memory Optimization',
        content: `Standard self-attention computes an intermediate attention score matrix of size (N x N), where N is sequence length. For long sequences (N=32,000), storing this matrix consumes massive GPU High Bandwidth Memory (HBM) and creates an IO bottleneck.

FlashAttention (Tri Dao et al.) optimizes attention by making it IO-aware:
- It splits Queries, Keys, and Values into blocks that fit within fast on-chip GPU SRAM memory.
- It computes softmax online using tiling without materializing the massive (N x N) attention matrix in main GPU HBM.
- FlashAttention-2 achieves 2x to 4x speedups in training and inference and scales context lengths linearly in memory rather than quadratically.`
      },
      {
        pageNumber: 9,
        title: 'Page 9: KV Caching in Generative Inference',
        content: `During autoregressive generation, generating each new token requires computing Query vectors for the new token and Key/Value vectors for all preceding tokens in the context.

Without caching, re-computing K and V vectors for the entire history produces O(N^2) generation latency.
The KV Cache stores the Key and Value matrices of all previous tokens in GPU memory. When generating the next token:
- Only the Query vector of the newest token is computed.
- It attends against the pre-stored KV cache.
This reduces next-token generation time from quadratic to linear O(N). Techniques like Multi-Query Attention (MQA) and Grouped-Query Attention (GQA) reduce KV cache memory footprints by sharing Key-Value heads across multiple Query heads.`
      },
      {
        pageNumber: 10,
        title: 'Page 10: Model Quantization: INT8, INT4, and AWQ',
        content: `Deploying 70-billion parameter models requires hundreds of gigabytes of VRAM in FP16 precision (16 bits per weight). Quantization compresses weights into lower bit-depth representations:

- INT8 Post-Training Quantization: Scales weights to 8-bit integers, halving memory consumption.
- Activation-aware Weight Quantization (AWQ) & GPTQ: Quantizes models down to 4 bits (INT4) by identifying and preserving the 1% most salient outlier weights in FP16 precision.
Quantization allows 70B parameter models to run efficiently on single consumer workstation GPUs or mobile edge chips with negligible degradation in reasoning capability.`
      }
    ]
  },

  // 17. BIG DATA PIPELINES (10 PAGES)
  {
    id: 'book-big-data',
    title: 'Real-Time Big Data Pipelines: Spark, Flink & Beam',
    author: 'Matei Zaharia & Stephan Ewen',
    category: 'ai',
    badge: 'Big Data Architecture',
    description: 'A 10-page architectural study of distributed computing, Apache Spark RDDs, Apache Flink stateful stream processing, and event time semantics.',
    coverEmoji: '📊',
    coverColor: 'from-amber-700 to-red-950',
    totalPages: 10,
    readPages: [],
    pages: [
      {
        pageNumber: 1,
        title: 'Page 1: The Paradigm Shift: From Hadoop MapReduce to In-Memory Spark',
        content: `Early distributed computing relied on Apache Hadoop MapReduce, which wrote intermediate computation states back to disk (HDFS) between map and reduce stages. This introduced heavy disk I/O latency and network serialization overhead.

Apache Spark revolutionized big data by introducing in-memory distributed data abstractions: Resilient Distributed Datasets (RDDs).
Spark preserves intermediate transformations in cluster RAM, enabling iterative algorithms (like machine learning gradient descent and graph algorithms) to execute up to 100 times faster than Hadoop.`
      },
      {
        pageNumber: 2,
        title: 'Page 2: Resilient Distributed Datasets (RDDs) and Lineage Graphs',
        content: `An RDD is an immutable, partitioned collection of records that can be operated on in parallel across a cluster.

RDD resilience is achieved through Lineage Graphs rather than data replication:
- Spark does not replicate RDD partitions across nodes.
- Instead, it logs the mathematical lineage of transformations (map, filter, join) that produced the dataset.
- If a worker node crashes and loses an RDD partition, Spark recomputes strictly the missing partition from the parent lineage graph, achieving fault tolerance with minimal memory overhead.`
      },
      {
        pageNumber: 3,
        title: 'Page 3: Transformations vs Actions and Lazy Evaluation',
        content: `Spark operations are partitioned into two distinct categories:

1. Transformations (Lazy): Operations like 'map()', 'filter()', and 'groupBy()'. Calling a transformation does not compute anything immediately; it simply appends a step to the execution Directed Acyclic Graph (DAG).
2. Actions (Eager): Operations like 'count()', 'collect()', and 'saveAsTextFile()'. Executing an action triggers the Spark Catalyst Optimizer to evaluate the entire DAG, optimize query plans, and schedule cluster tasks.

Lazy evaluation allows Spark to fuse multiple map operations into a single execution pass and push projection filters directly down to storage layers.`
      },
      {
        pageNumber: 4,
        title: 'Page 4: Catalyst Optimizer and Tungsten Execution Engine',
        content: `Modern Spark applications rarely use low-level RDDs directly; they utilize DataFrames and Spark SQL.

Behind Spark SQL lies two engineering engines:
1. Catalyst Optimizer: Uses rule-based and cost-based optimizations to reorder joins, eliminate redundant columns, and push predicates directly down to Parquet/ORC file readers.
2. Project Tungsten: Bypasses standard JVM garbage collection overhead by managing memory off-heap in contiguous binary byte buffers (unsafe memory). Tungsten uses whole-stage code generation, compiling complex SQL expressions into optimized JVM bytecode loops.`
      },
      {
        pageNumber: 5,
        title: 'Page 5: Stream Processing: Micro-Batch vs True Streaming',
        content: `When processing real-time continuous event feeds, two architectural models compete:

1. Micro-Batching (Spark Structured Streaming):
   - Chops unbounded data streams into tiny discrete batches (e.g., 200ms windows).
   - High throughput, easy failure recovery, but incurs higher end-to-end latency.

2. Native Streaming (Apache Flink):
   - Processes each event individually as it arrives through continuous streaming pipelines.
   - Sub-millisecond latency, fine-grained state management, ideal for real-time fraud detection and high-frequency alerting.`
      },
      {
        pageNumber: 6,
        title: 'Page 6: Event Time vs Processing Time and Watermarks',
        content: `In distributed networks, network latency causes events to arrive out of order.

Time definitions:
- Processing Time: The clock time of the machine currently processing the event. Simple, but non-deterministic.
- Event Time: The timestamp when the event actually occurred on the client device. Deterministic, but events may arrive out-of-order.

Watermarks:
A Watermark is a streaming metric that asserts: "We assume all events with event-time earlier than T have now arrived." Watermarks allow stream processors to close tumbling windows and emit aggregated state while discarding or routing late-arriving records to dead-letter queues.`
      },
      {
        pageNumber: 7,
        title: 'Page 7: Stateful Stream Processing and Checkpointing in Flink',
        content: `Stateful stream processing maintains dynamic state across events (e.g., calculating a moving 7-day average per customer).

Apache Flink manages state via:
- Embedded State Backends: In-memory hash maps or disk-backed RocksDB instances local to each worker.
- Chandy-Lamport Distributed Snapshots (Checkpointing): Flink injects checkpoint barrier markers into the stream. When workers encounter barriers, they asynchronously flush local state to durable storage (S3/HDFS).
If a cluster worker crashes, Flink rolls back all operators to the last successful checkpoint, guaranteeing Exactly-Once processing semantics.`
      },
      {
        pageNumber: 8,
        title: 'Page 8: Columnar Storage: Apache Parquet and Apache Arrow',
        content: `Analytical query performance is determined by storage format:

- Row-Oriented (CSV, JSON, Avro): Efficient for OLTP writes, but slow for analytical queries that only require 3 out of 100 columns.
- Columnar Storage (Apache Parquet): Stores values of the same column contiguously on disk.
  - Achieves massive compression ratios (Snappy, ZSTD) because identical data types sit adjacent.
  - Dictionary encoding and Run-Length Encoding (RLE).
- Apache Arrow: Standardizes in-memory columnar data structures across Python, C++, Java, and Rust, enabling zero-copy data exchange between Spark, Pandas, and DuckDB.`
      },
      {
        pageNumber: 9,
        title: 'Page 9: Open Table Formats: Apache Iceberg and Delta Lake',
        content: `Traditional data lakes were simply folders of files on S3/HDFS, suffering from inconsistent reads, missing schema evolution, and inability to perform ACID updates.

Modern Open Table Formats (Apache Iceberg, Delta Lake):
- Metadata Layers: Track tables through hierarchical JSON/Avro metadata snapshots pointing to immutable Parquet data files.
- ACID Guarantees: Multi-engine concurrent writes via Optimistic Concurrency Control (OCC).
- Time Travel: Query historical snapshots of data at specific timestamps ('SELECT * FROM orders TIMESTAMP AS OF ...').
- Partition Evolution: Alter table partitioning schemes without rewriting existing data files.`
      },
      {
        pageNumber: 10,
        title: 'Page 10: Unified Batch and Stream with Apache Beam',
        content: `Apache Beam provides an open, unified programming model for defining data processing pipelines that execute interchangeably on Spark, Flink, or Google Cloud Dataflow.

Key Beam abstractions:
- PCollection: Represents an immutable dataset, either bounded (batch) or unbounded (streaming).
- PTransform: Data processing steps (ParDo, GroupByKey).
- Windowing and Triggers: Unifies batch and stream processing logic under a single codebase, freeing developers from pipeline engine lock-in.`
      }
    ]
  },

  // 18. QUANTUM COMPUTING (10 PAGES)
  {
    id: 'book-quantum-computing',
    title: 'Quantum Computing & Quantum Algorithms Explained',
    author: 'Michael Nielsen & Isaac Chuang',
    category: 'ai',
    badge: 'Quantum Systems',
    description: 'A 10-page foundational exploration of qubits, superposition, quantum entanglement, Grover search, and Shor factoring algorithm.',
    coverEmoji: '⚛️',
    coverColor: 'from-cyan-700 to-indigo-950',
    totalPages: 10,
    readPages: [],
    pages: [
      {
        pageNumber: 1,
        title: 'Page 1: The Classical vs Quantum Computing Paradigm',
        content: `Classical computers are built upon binary bits that exist deterministically as either 0 or 1, physically implemented via silicon transistor voltage thresholds.

Quantum computing harnesses the fundamental principles of quantum mechanics:
- Qubit (Quantum Bit): A two-state quantum mechanical system.
- Superposition: A qubit can exist in a linear combination of both |0⟩ and |1⟩ states simultaneously:
  |ψ⟩ = α|0⟩ + β|1⟩, where |α|^2 + |β|^2 = 1.
- Exponential State Space: While n classical bits represent ONE of 2^n numbers at any instant, an n-qubit quantum register exists in a superposition of ALL 2^n computational states simultaneously. A 300-qubit quantum computer holds more simultaneous states than there are atoms in the observable universe.`
      },
      {
        pageNumber: 2,
        title: 'Page 2: The Bloch Sphere & State Vectors',
        content: `Geometrically, the state of a single pure qubit is visualized as a point on the surface of a unit sphere called the Bloch Sphere:

- North Pole: Represents the basis state |0⟩.
- South Pole: Represents the basis state |1⟩.
- Equator: Represents balanced superposition states (such as |+⟩ = (|0⟩ + |1⟩) / sqrt(2)).

Quantum gates are unitary matrix transformations that rotate the state vector across the surface of the Bloch sphere without changing its norm, preserving total probability.`
      },
      {
        pageNumber: 3,
        title: 'Page 3: Quantum Logic Gates: Pauli, Hadamard, and CNOT',
        content: `Quantum circuits manipulate qubits using unitary quantum gates:

1. Single-Qubit Gates:
   - Pauli-X Gate: Quantum NOT gate, flips |0⟩ to |1⟩.
   - Pauli-Z Gate: Phase flip gate, alters the relative phase of |1⟩ by π.
   - Hadamard (H) Gate: The creator of superposition. Transforms basis states |0⟩ and |1⟩ into equal superpositions.
2. Two-Qubit Gates:
   - CNOT (Controlled-NOT): Flips the target qubit if and only if the control qubit is in state |1⟩. The CNOT gate is essential for generating quantum entanglement.`
      },
      {
        pageNumber: 4,
        title: 'Page 4: Quantum Entanglement and Bell States',
        content: `Quantum entanglement is a physical phenomenon where quantum particles become inextricably linked, such that the quantum state of each particle cannot be described independently of the state of the others.

Bell States (Maximally Entangled Two-Qubit Pairs):
|Φ+⟩ = (|00⟩ + |11⟩) / sqrt(2)

If you measure the first qubit of a Bell pair and find it in state |0⟩, the second qubit instantly collapses to state |0⟩ with 100% certainty, regardless of whether the two qubits are millimeters apart or across galaxies. Albert Einstein famously called this "spooky action at a distance."`
      },
      {
        pageNumber: 5,
        title: 'Page 5: Quantum Measurement and Wavefunction Collapse',
        content: `Quantum computation is non-deterministic during measurement:

- When an observer measures a qubit in state |ψ⟩ = α|0⟩ + β|1⟩, the continuous superposition immediately collapses into a single discrete classical value: 0 (with probability |α|^2) or 1 (with probability |β|^2).
- The measurement permanently destroys the quantum superposition.
- No-Cloning Theorem: It is mathematically impossible to create an identical copy of an arbitrary unknown quantum state. This theorem prevents copying qubits for debugging, but serves as the bedrock for unbreakable Quantum Key Distribution (QKD).`
      },
      {
        pageNumber: 6,
        title: 'Page 6: Quantum Interference and Constructive Amplification',
        content: `How do quantum algorithms solve problems faster if measurement only yields a random collapse?

The secret is Quantum Interference:
- Probability amplitudes (α, β) can be positive, negative, or complex numbers.
- Quantum algorithms are designed so that the computational paths leading to the incorrect answer interfere DESTRUCTIVELY (canceling each other out).
- Paths leading to the correct answer interfere CONSTRUCTIVELY (amplifying the probability amplitude toward 1).
Upon final measurement, the circuit yields the correct answer with near-certainty.`
      },
      {
        pageNumber: 7,
        title: 'Page 7: Deutsch-Jozsa and Quantum Parallelism',
        content: `The Deutsch-Jozsa algorithm was among the first proofs of exponential quantum speedup over classical computing:

Problem: You are given an oracle function f(x) that is guaranteed to be either Constant (returns 0 for all inputs or 1 for all inputs) or Balanced (returns 0 for half the inputs and 1 for the other half).
- Classical Computer: Requires evaluating f(x) up to 2^(n-1) + 1 times in the worst case to be 100% certain.
- Quantum Computer: Evaluates the oracle exactly ONCE! By applying Hadamard gates across all input qubits, the quantum circuit queries the function across all 2^n inputs simultaneously in superposition and measures whether the function is constant or balanced in a single step.`
      },
      {
        pageNumber: 8,
        title: 'Page 8: Grover Search Algorithm: Quadratic Speedup',
        content: `Grover's Algorithm searches an unstructured database of N items for a unique target record:

- Classical Search: Linear search requires O(N) operations.
- Grover Algorithm: Locates the item in O(sqrt(N)) operations using Amplitude Amplification.

Algorithm steps:
1. Initialize qubits into an equal superposition of all database states.
2. Quantum Oracle: Inverts the phase of the target state.
3. Diffusion Operator (Inversion about the Mean): Flips amplitudes around the average, increasing the target amplitude while suppressing all non-target states.
Repeating this loop sqrt(N) times amplifies the target state probability to near 100%.`
      },
      {
        pageNumber: 9,
        title: 'Page 9: Shor Algorithm: Factoring and the End of RSA',
        content: `Peter Shor's 1994 algorithm demonstrated that quantum computers can factor large composite integers in polynomial time O((log N)^3), compared to classical sub-exponential algorithms (Number Field Sieve).

How Shor's algorithm works:
- It reduces the number-theoretic factoring problem to a Period-Finding problem: finding the order 'r' of a function f(x) = a^x mod N.
- It utilizes the Quantum Fourier Transform (QFT) to extract the periodic frequency of the function in parallel.

Impact: A sufficiently large fault-tolerant quantum computer could break contemporary RSA-2048 and ECC encryption within hours, spurring global migration to Post-Quantum Cryptography (lattice-based schemes like ML-KEM).`
      },
      {
        pageNumber: 10,
        title: 'Page 10: Quantum Hardware Architectures & Error Correction',
        content: `Today's quantum machines reside in the NISQ (Noisy Intermediate-Scale Quantum) era. Quantum states are fragile, susceptible to environmental thermal noise causing Decoherence.

Physical Qubit implementations:
- Superconducting Transmons (IBM, Google): Artificial atoms on silicon cooled to 15 millikelvin.
- Trapped Ions (IonQ, Quantinuum): Individual atomic ions suspended in vacuum by electromagnetic fields.
- Neutral Atoms & Photonic Systems.

Quantum Error Correction (Surface Code): Encodes a single fault-tolerant "logical qubit" across hundreds or thousands of noisy physical qubits, detecting and correcting bit-flip and phase-flip errors continuously without measuring the underlying computational state.`
      }
    ]
  },

  // 19. GRAPH ALGORITHMS (10 PAGES)
  {
    id: 'book-graph-algorithms',
    title: 'Advanced Graph Algorithms & Network Flow',
    author: 'Robert Tarjan & Jon Kleinberg',
    category: 'ai',
    badge: 'Algorithms',
    description: 'A 10-page rigorous mathematical guide to strongly connected components, shortest paths, max-flow min-cut, and dynamic programming on trees.',
    coverEmoji: '🕸️',
    coverColor: 'from-teal-700 to-slate-900',
    totalPages: 10,
    readPages: [],
    pages: [
      {
        pageNumber: 1,
        title: 'Page 1: Graph Representation: Matrices vs Adjacency Lists',
        content: `Graphs model relationships between entities across computer science, from social networks and dependency trees to road navigation and internet routing.

Representation trade-offs:
- Adjacency Matrix (V x V): O(1) edge lookup, but consumes O(V^2) memory. Inefficient for sparse real-world graphs where |E| << |V|^2.
- Adjacency List: Stores arrays or linked lists of neighbors per vertex. Consumes O(V + E) memory and allows iterating over incident edges in O(deg(v)).
- Forward Star / Compressed Sparse Row (CSR): Pack vertices and edges into contiguous flat arrays, maximizing CPU cache locality for billion-edge graph traversal engines.`
      },
      {
        pageNumber: 2,
        title: 'Page 2: Depth-First Search (DFS) Tree and Edge Classification',
        content: `A Depth-First Search traversal partitions the edges of a directed graph into four distinct classes:

1. Tree Edges: Edges belonging to the DFS traversal forest.
2. Back Edges: Edges pointing to an ancestor in the DFS tree. The presence of a back edge proves the existence of a directed cycle!
3. Forward Edges: Non-tree edges pointing from a node to a descendant in the DFS tree.
4. Cross Edges: Edges connecting nodes between unrelated branches or subtrees.

Tracking discovery times (tin) and low-link values during DFS powers linear-time O(V + E) algorithms for bridges, articulation points, and biconnected components.`
      },
      {
        pageNumber: 3,
        title: 'Page 3: Tarjan and Kosaraju: Strongly Connected Components (SCC)',
        content: `In a directed graph, a Strongly Connected Component (SCC) is a maximal subgraph where every vertex is reachable from every other vertex within the component.

Algorithms:
1. Kosaraju's Algorithm: Executes two DFS passes. The first pass orders vertices by completion time on the original graph. The second pass traverses the transposed graph (edges reversed) in decreasing order of completion times to extract SCCs.
2. Tarjan's Algorithm: Computes SCCs in a single DFS pass using an explicit recursion stack and low-link numbers (the lowest discovery time reachable via back edges).

Contracting SCCs into single supernodes produces a Directed Acyclic Graph (DAG), enabling topological sorting and dynamic programming.`
      },
      {
        pageNumber: 4,
        title: 'Page 4: Shortest Paths: Dijkstra, Bellman-Ford, and Johnson',
        content: `Finding shortest paths across weighted networks:

- Dijkstra's Algorithm: Greedy algorithm using a min-priority heap. Computes single-source shortest paths in O((V + E) log V). Requirement: All edge weights must be non-negative!
- Bellman-Ford Algorithm: Relaxes all |E| edges |V| - 1 times in O(V * E). Handles negative edge weights and detects negative weight cycles.
- Johnson's Algorithm: Computes all-pairs shortest paths on sparse graphs in O(V^2 log V + VE). Uses Bellman-Ford to re-weight edges positively, then runs Dijkstra from every vertex.`
      },
      {
        pageNumber: 5,
        title: 'Page 5: Minimum Spanning Trees: Kruskal and Prim',
        content: `A Minimum Spanning Tree (MST) connects all vertices of an undirected graph with the minimum total edge weight without introducing cycles.

Algorithms:
1. Kruskal's Algorithm: Sorts edges by weight and greedily adds edges that do not form cycles using a Disjoint Set Union (DSU / Union-Find) data structure with path compression and rank heuristic. Runtime: O(E log E).
2. Prim's Algorithm: Grows an MST outward from an arbitrary root vertex, greedily adding the cheapest edge connecting the tree to an unvisited vertex via a binary or Fibonacci heap. Runtime: O(E + V log V).`
      },
      {
        pageNumber: 6,
        title: 'Page 6: Maximum Flow and the Max-Flow Min-Cut Theorem',
        content: `Flow networks model the maximum capacity of pipelines, traffic grids, and telecommunication switches.

Max-Flow Min-Cut Theorem:
"In any flow network, the maximum amount of flow passing from source s to sink t equals the minimum total capacity of edges that, if removed, disconnect s from t."

Algorithms:
- Ford-Fulkerson Method: Repeatedly pushes flow along augmenting paths in the residual graph.
- Edmonds-Karp: Uses BFS to find the shortest augmenting path, guaranteeing termination in O(V * E^2).
- Dinic's Algorithm: Uses Level Graphs and Blocking Flows to achieve O(V^2 * E) on general networks and O(E * sqrt(V)) on bipartite graphs.`
      },
      {
        pageNumber: 7,
        title: 'Page 7: Bipartite Matching: Hopcroft-Karp Algorithm',
        content: `A Bipartite Graph has vertices partitioned into two disjoint sets U and V such that every edge connects a node in U to a node in V (e.g., matching job applicants to open positions).

A Maximum Bipartite Matching finds the largest set of edges without common vertices.
Hopcroft-Karp Algorithm:
- Combines BFS and DFS in iterative phases.
- BFS identifies the length of the shortest augmenting paths.
- DFS extracts a maximal set of vertex-disjoint augmenting paths of that length simultaneously.
Runs in O(E * sqrt(V)), drastically outperforming standard flow reductions.`
      },
      {
        pageNumber: 8,
        title: 'Page 8: Lowest Common Ancestor (LCA) and Binary Lifting',
        content: `In a rooted tree, the Lowest Common Ancestor of two nodes u and v is the deepest node that is an ancestor of both.

Binary Lifting:
- Precomputes an ancestor table 'up[node][k]', storing the 2^k-th ancestor of each node in O(V log V) time.
- To query LCA(u, v):
  1. Lift the deeper node until both nodes sit at identical tree depths.
  2. Lift both nodes simultaneously in descending powers of two until their parents match.
Each LCA query executes in O(log V) time, enabling high-speed tree distance calculations.`
      },
      {
        pageNumber: 9,
        title: 'Page 9: Dynamic Programming on Trees',
        content: `Many NP-hard graph problems (like Maximum Independent Set or Vertex Cover) can be solved in linear O(V) time on trees using post-order tree DP:

Example: Maximum Weight Independent Set (select vertices with maximum total weight such that no two are connected):
For every node u:
- DP[u][0]: Maximum weight in subtree of u if u is NOT included (sum of max(DP[v][0], DP[v][1]) for all children v).
- DP[u][1]: Maximum weight in subtree of u if u IS included (weight[u] + sum of DP[v][0] for all children v).
Traversing bottom-up from tree leaves to the root resolves the optimal configuration in O(V).`
      },
      {
        pageNumber: 10,
        title: 'Page 10: Heavy-Light Decomposition (HLD) and Centroid Trees',
        content: `For processing path queries and sub-tree updates on trees:

- Heavy-Light Decomposition (HLD): Partitions tree edges into "Heavy" edges (leading to the child with the largest subtree) and "Light" edges. Any path from root to node traverses at most O(log V) light edges. HLD flattens the tree into a 1D Segment Tree, enabling path sum queries and updates in O(log^2 V).
- Centroid Decomposition: Divides a tree recursively by removing its Centroid (a node whose removal leaves no subtree larger than V/2), constructing a balanced centroid tree of depth O(log V) for distance queries.`
      }
    ]
  },

  // 20. PRAGMATIC SOFTWARE CRAFTSMAN (10 PAGES)
  {
    id: 'book-software-craftsman',
    title: 'The Pragmatic Software Craftsman: Code Review & System Evolution',
    author: 'Martin Fowler & Kent Beck',
    category: 'tech',
    badge: 'Software Engineering',
    description: 'A 10-page masterclass on refactoring legacy systems, code review etiquette, test-driven development (TDD), and technical debt reduction.',
    coverEmoji: '🛠️',
    coverColor: 'from-stone-700 to-indigo-950',
    totalPages: 10,
    readPages: [],
    pages: [
      {
        pageNumber: 1,
        title: 'Page 1: The Definition of Software Craftsmanship',
        content: `Writing working software is not enough; software must be maintainable, adaptable, and a joy to read.

Software Craftsmanship shifts the mindset of an engineer from an assembly-line coder to a deliberate craftsperson who values:
- Not only working software, but also well-crafted software.
- Not only responding to change, but also steadily adding value.
- Not only individuals and interactions, but also a community of professionals.

Code is read ten times more frequently than it is written. Invest in clarity, naming consistency, and self-documenting architectures over clever micro-optimizations.`
      },
      {
        pageNumber: 2,
        title: 'Page 2: The Boy Scout Rule and Continuous Refactoring',
        content: `Refactoring is the process of changing a software system in such a way that it does not alter the external behavior of the code yet improves its internal structure.

The Boy Scout Rule: "Always leave the campground cleaner than you found it."
Whenever you open a file to fix a bug or add a minor feature:
- Rename an ambiguous variable.
- Extract a 50-line bloated method into a 5-line cohesive helper.
- Delete commented-out legacy code.
Small continuous micro-cleanups prevent codebases from decaying into unmaintainable legacy monoliths.`
      },
      {
        pageNumber: 3,
        title: 'Page 3: Test-Driven Development (TDD) and the Red-Green-Refactor Loop',
        content: `TDD is not a testing technique; it is a software design discipline.

The TDD cycle:
1. Red: Write a small automated unit test for functionality that does not yet exist. Run the test and watch it fail.
2. Green: Write strictly the minimal amount of production code necessary to make the test pass.
3. Refactor: Clean up the code, remove duplication, and enhance readability while keeping the test suite green.

TDD forces modularity and loose coupling: you cannot write unit tests for tightly coupled code without suffering friction, guiding your design toward clean dependency injection.`
      },
      {
        pageNumber: 4,
        title: 'Page 4: The Testing Pyramid: Unit, Integration, and End-to-End',
        content: `Automated test suites must adhere to the Testing Pyramid:

- Unit Tests (70%): Fast, isolated tests executing in milliseconds, mocking external dependencies. Validates individual classes, pure functions, and business algorithms.
- Integration Tests (20%): Verifies interactions between components and real infrastructure (e.g., validating SQL queries against a real PostgreSQL container via Testcontainers).
- End-to-End (E2E) Tests (10%): Simulates complete user journeys in real browsers (Playwright, Cypress). High fidelity, but slow and prone to network flakiness.

Avoid the "Testing Ice Cream Cone" (few unit tests and hundreds of flaky E2E tests).`
      },
      {
        pageNumber: 5,
        title: 'Page 5: The Art of Humane Code Reviews',
        content: `Code review is a collaborative quality gate and knowledge-sharing medium, not an intellectual interrogation.

Best practices for authors:
- Keep Pull Requests small (< 300 lines). Massive PRs receive superficial reviews; small PRs receive deep scrutiny.
- Provide context: Explain WHY the change was made, attach UI screenshots, and link tickets.

Best practices for reviewers:
- Differentiate between critical bugs and subjective preferences. Prefix nitpicks with "[Nit]".
- Ask clarifying questions rather than issuing demands: "What do you think about using a map here to avoid O(N^2) lookups?"
- Praise excellent architectural solutions and elegant abstractions.`
      },
      {
        pageNumber: 6,
        title: 'Page 6: Managing Technical Debt and Debt Quadrants',
        content: `Technical debt is the implied cost of additional rework caused by choosing an easy or expedient solution now instead of using a better approach that would take longer.

Martin Fowler's Technical Debt Quadrant:
- Reckless & Deliberate: "We don't have time for design; just hack it together."
- Prudent & Deliberate: "We must ship now to validate product-market fit, and we will refactor next sprint."
- Reckless & Inadvertent: Incompetence; team does not know basic design patterns.
- Prudent & Inadvertent: "Now that we shipped and observed production traffic, we understand what the architecture should have been."

Allocate 20% of every sprint explicitly to technical debt remediation.`
      },
      {
        pageNumber: 7,
        title: 'Page 7: The Strangler Fig Pattern for Legacy Migration',
        content: `Attempting a "big-bang" rewrite of a critical legacy system is one of the most reliable ways to bankrupt a software company. The scope creeps, business requirements shift, and the new system fails to match twenty years of edge-case bug fixes.

The Strangler Fig Pattern:
- Place an API gateway / reverse proxy in front of the legacy monolith.
- Implement new capabilities as clean microservices.
- Gradually intercept specific legacy endpoints, routing traffic to new microservices.
- Over months or years, the old system is progressively replaced piece by piece until the legacy core can be safely decommissioned.`
      },
      {
        pageNumber: 8,
        title: 'Page 8: SOLID Principles Re-evaluated for Modern Systems',
        content: `The SOLID principles guide object-oriented and modular system design:

- Single Responsibility (SRP): A class or module should have one, and only one, reason to change.
- Open/Closed (OCP): Software entities should be open for extension, but closed for modification.
- Liskov Substitution (LSP): Subtypes must be substitutable for their base types without altering correctness.
- Interface Segregation (ISP): Many client-specific interfaces are better than one general-purpose interface.
- Dependency Inversion (DIP): High-level modules should not depend on low-level modules; both should depend on abstractions.`
      },
      {
        pageNumber: 9,
        title: 'Page 9: Feature Flags & Trunk-Based Development',
        content: `Long-lived Git feature branches lead to painful "merge hell" and delay feedback loops.

Trunk-Based Development:
- Engineers merge small commits into the 'main' branch daily.
- Incomplete features are concealed behind runtime Feature Flags (LaunchDarkly, Unleash).
- Decouples deployment (shipping code to production servers) from release (enabling the feature for end users).
- Enables instant kill-switches: if a new feature causes production database strain, flip the flag off in seconds without rolling back code.`
      },
      {
        pageNumber: 10,
        title: 'Page 10: Career Trajectory: From Senior to Staff & Principal',
        content: `As an engineer grows beyond Senior levels, impact shifts from personal code output to organizational leverage:

- Staff Engineer: Sets architectural vision across multiple squads, anticipates technical roadblocks 6 months in advance, and resolves cross-team dependencies.
- Principal / Fellow: Influences company-wide engineering strategy, evaluates major vendor and open-source adoptions, and mentors the next generation of technical leaders.
- The highest craft of a technical leader is building high-trust engineering cultures where every developer feels psychological safety, pride of ownership, and intellectual curiosity.`
      }
    ]
  },

  // 21. HIGH-PERFORMANCE API ARCHITECTURE (10 PAGES)
  {
    id: 'book-api-architecture',
    title: 'High-Performance API Architecture: REST, gRPC & WebSockets',
    author: 'Leonard Richardson & Sam Newman',
    category: 'tech',
    badge: 'API Architecture',
    description: 'A 10-page masterclass on HTTP/3 QUIC, gRPC streaming, GraphQL federation, rate limiting, and idempotency keys.',
    coverEmoji: '🌐',
    coverColor: 'from-blue-700 to-indigo-950',
    totalPages: 10,
    readPages: [],
    pages: [
      {
        pageNumber: 1,
        title: 'Page 1: The Evolution of Web Protocols: HTTP/1.1 to HTTP/3',
        content: `The internet was built on HTTP/1.1, which required a separate TCP connection per resource or suffered from Head-Of-Line (HOL) blocking when pipelining on a single connection.

- HTTP/2: Introduced binary framing and multiplexing over a single TCP stream. Multiple requests and responses interleave concurrently. However, if a single TCP packet is dropped, the entire connection stalls while waiting for retransmission.
- HTTP/3 & QUIC: Replaces TCP with UDP. QUIC handles packet loss independently per stream. Dropping a packet on Stream A has zero impact on Stream B, delivering major latency wins over flaky mobile networks.`
      },
      {
        pageNumber: 2,
        title: 'Page 2: RESTful API Design: Richardson Maturity Model',
        content: `Leonard Richardson categorized REST APIs into four maturity tiers:

- Level 0: The Swamp of POX. Uses HTTP purely as a transport tunnel (e.g., XML-RPC or SOAP POSTing all requests to '/endpoint').
- Level 1: Resources. Introduces individual URIs for entities (e.g., '/orders/123').
- Level 2: HTTP Verbs. Leverages HTTP verbs correctly: GET (idempotent, safe read), POST (creation), PUT (idempotent complete replacement), PATCH (partial mutation), DELETE (removal). Uses standard HTTP status codes (200, 201, 204, 400, 401, 403, 404, 409, 500).
- Level 3: HATEOAS (Hypermedia As The Engine Of Application State). Responses include hypermedia links pointing to allowable next actions.`
      },
      {
        pageNumber: 3,
        title: 'Page 3: Idempotency Keys in Payment and Mutation APIs',
        content: `Network timeouts can occur after a server processes an API call but before the client receives the 200 OK response. If the client retries a payment request, the user could be billed twice.

Idempotency Keys solve this:
- Client generates a unique UUID (Idempotency-Key header) for the mutation.
- The API Gateway or server checks a distributed cache (Redis):
  - If the key is new: Execute the transaction and store the resulting response against the key with a 24-hour TTL.
  - If the key was already processed: Skip execution and immediately return the cached response.
This guarantees that retries are 100% safe.`
      },
      {
        pageNumber: 4,
        title: 'Page 4: gRPC and Protocol Buffers: High-Speed RPC',
        content: `For low-latency inter-service communication, gRPC dominates:

Protocol Buffers (Protobuf):
- Define contracts in '.proto' files.
- Binary serialization packs data into compact byte streams using varints and field tags, achieving 5x faster serialization than JSON.
gRPC streaming modes:
1. Unary RPC: Standard request-response.
2. Server Streaming: Client sends one request, server responds with a stream of messages.
3. Client Streaming: Client streams data (e.g., file upload), server returns a single response.
4. Bidirectional Streaming: Full-duplex concurrent communication.`
      },
      {
        pageNumber: 5,
        title: 'Page 5: GraphQL and Schema Federation',
        content: `GraphQL allows client applications to request precisely the data they need through a single endpoint.

Apollo Federation:
- Breaks down a massive monolithic GraphQL schema across distributed microservice subgraphs.
- The Gateway (Router) acts as an intelligent query planner: it parses incoming client GraphQL queries, executes parallel calls to backend subgraphs (e.g., Users service and Products service), and joins the data seamlessly into a unified response JSON without frontend awareness.`
      },
      {
        pageNumber: 6,
        title: 'Page 6: Real-Time Communication: WebSockets vs Server-Sent Events (SSE)',
        content: `Choosing the right protocol for real-time data streaming:

- WebSockets: Upgrades HTTP connection to a full-duplex, bidirectional TCP socket. Both client and server can send messages at any instant with minimal framing overhead. Best for collaborative whiteboards, multiplayer games, and chat applications.
- Server-Sent Events (SSE): Unidirectional streaming from server to client over standard HTTP ('text/event-stream'). Automatic client reconnection, works through standard corporate proxies, and is ideal for LLM token streaming and financial tickers.`
      },
      {
        pageNumber: 7,
        title: 'Page 7: Rate Limiting Algorithms for API Gateways',
        content: `Defending APIs against abuse and traffic spikes requires rate limiting algorithms:

1. Token Bucket: Tokens fill a bucket at a fixed rate; each request consumes a token. Allows controlled burstiness up to bucket capacity.
2. Leaky Bucket: Requests enter a queue and are processed at a steady constant rate, smoothing out spiky traffic.
3. Sliding Window Log: Records timestamps of every request in a Redis sorted set (ZSET). Provides mathematically exact rate limiting, but consumes higher memory.
4. Sliding Window Counter: Combines fixed window counters with weightings, achieving high precision with low memory usage.`
      },
      {
        pageNumber: 8,
        title: 'Page 8: API Versioning Strategies',
        content: `How to evolve APIs without breaking legacy mobile clients:

1. URI Path Versioning ('/v1/users', '/v2/users'): Highly visible, easy to cache at CDN edges, but pollutes endpoint routes.
2. Query Parameter Versioning ('/users?version=2'): Simple, but easy for clients to omit.
3. Header / Content Negotiation ('Accept: application/vnd.company.v2+json'): Clean RESTful approach, but harder to test in standard web browsers.
Deprecation Policy: Announce deprecations with Sunset HTTP headers ('Sunset: Wed, 11 Nov 2026 00:00:00 GMT') and log usage of deprecated endpoints to notify active callers.`
      },
      {
        pageNumber: 9,
        title: 'Page 9: Webhook Architectures & Signature Verification',
        content: `Webhooks provide asynchronous push notifications to external customer endpoints (e.g., Stripe notifying your server that a subscription was renewed).

Webhook engineering requirements:
- Cryptographic Signatures: Sign the webhook payload using HMAC-SHA256 with a shared secret, passing the signature in a header ('X-Signature'). The receiver verifies the signature before processing the payload.
- Exponential Backoff Retries: If the recipient endpoint returns a 5xx error, retry delivery with randomized jitter (e.g., 5s, 1m, 10m, 1hr).
- Dead-Letter Queues (DLQ): Alert customers when endpoints fail continuously for 24 hours.`
      },
      {
        pageNumber: 10,
        title: 'Page 10: API Security: JWTs, Scopes, and mTLS',
        content: `Securing modern APIs requires rigorous access control:

- JSON Web Tokens (JWT): Self-contained, cryptographically signed tokens containing user claims. Verify signatures using asymmetric public keys (JWKS / RS256) rather than shared symmetric secrets.
- Scope-Based Authorization: Validate that tokens possess the explicit scope required for the operation (e.g., 'orders:write' vs 'orders:read').
- Mutual TLS (mTLS): Authenticate both client and server at the transport layer for high-security financial B2B API integrations.`
      }
    ]
  }
];
