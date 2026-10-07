import { LibraryBook } from '../types';
import { PROGRAMMING_BOOKS } from './books/booksProgramming';
import { SYSTEMS_AND_CLOUD_BOOKS } from './books/booksSystemsAndCloud';
import { AI_AND_ALGORITHMS_BOOKS } from './books/booksAIAndAlgorithms';
import { ENTERPRISE_AND_NEW_BOOKS } from './books/booksEnterpriseAndCulture';
import { COLLEGE_50_PAGE_BOOKS } from './books/booksCollege50Pages';
import { COLLEGE_PROJECT_BOOKS } from './books/booksCollegeProjects';

const BASE_LIBRARY_BOOKS: LibraryBook[] = [
  // 1. TECH SKILLS BOOK (20 PAGES)
  {
    id: 'book-tech-arch',
    title: 'Modern Software Architecture & Systems Design',
    author: 'Dr. Evelyn Vance & Marcus Sterling',
    category: 'tech',
    badge: 'Tech Skills',
    description: 'An authoritative 20-page comprehensive guide to high-scale distributed systems, microservices, consensus, caching, and resilient engineering.',
    coverEmoji: '💻',
    coverColor: 'from-blue-600 to-indigo-800',
    totalPages: 20,
    readPages: [],
    pages: [
      {
        pageNumber: 1,
        title: 'Page 1: The Evolution of Architectural Paradigms',
        content: `Software architecture is the art of balancing competing trade-offs: latency, consistency, availability, maintainability, and operational cost. In the early computing eras, monolithic architectures were the standard. A single deployable artifact contained data access layers, business logic, presentation engines, and background tasks.

While monoliths offer simplicity during initial development, seamless local debugging, and zero inter-service network latency, they struggle as engineering teams scale into hundreds of developers. Codebases become tightly coupled, deployments turn into nerve-wracking release trains, and a single memory leak in a reporting routine can take down the entire production storefront.

Understanding when to preserve a modular monolith versus migrating to decoupled microservices is the foundational skill of a modern software architect. Before splitting a service, ensure organizational alignment, automated observability, and clean domain boundaries.`
      },
      {
        pageNumber: 2,
        title: 'Page 2: Domain-Driven Design (DDD) and Bounded Contexts',
        content: `Domain-Driven Design, formulated by Eric Evans, provides the intellectual blueprint for partitioning complex systems. Rather than organizing software around database tables, DDD models software around business subdomains: Core Domains, Supporting Domains, and Generic Domains.

The central pillar of DDD is the "Bounded Context". Within a bounded context, every term in the Ubiquitous Language has an unambiguous, singular meaning. For instance, in an E-Commerce system, an "Order" in the Checkout Context represents an uncommitted cart with payment intent. In the Fulfillment Context, an "Order" denotes a manifest of physical SKU items awaiting warehouse packaging.

Attempting to force a single, universal "Order" entity across the entire enterprise database leads to bloated, unmaintainable schemas with hundreds of nullable columns. Bounded contexts protect software boundaries and establish clear contract ownership across distributed squads.`
      },
      {
        pageNumber: 3,
        title: 'Page 3: Communication Contracts: REST, gRPC, and GraphQL',
        content: `Microservices must communicate across network boundaries. Selecting the appropriate communication protocol determines latency profiles and API ergonomics.

REST over JSON/HTTP 1.1 remains ubiquitous due to its human-readability, rich tooling, and universal browser support. However, JSON serialization incurs CPU overhead, and HTTP 1.1 suffers from head-of-line blocking on single TCP streams.

For low-latency inter-service East-West traffic, gRPC is the industry standard. Powered by HTTP/2 multiplexing and Protobuf binary serialization, gRPC payloads are up to 70% smaller and 5x faster to serialize than JSON. Strong contract definition files (.proto) generate type-safe client stubs in Java, Go, Python, and C++.

GraphQL excels in North-South client-to-backend communication, allowing mobile clients to request exactly the nested fields required, preventing over-fetching over cellular networks.`
      },
      {
        pageNumber: 4,
        title: 'Page 4: Distributed Caching Architectures & Invalidation',
        content: `As storage requirements grow, querying relational databases for high-frequency reads becomes a primary latency bottleneck. Distributed caches like Redis and Memcached store serialized records directly in RAM, offering sub-millisecond lookups.

Common caching patterns include:
1. Cache-Aside (Lazy Loading): The application queries the cache. On a miss, it reads from the database, writes the entry into cache, and returns it.
2. Read-Through / Write-Through: The cache acts as the main data store; a cache agent handles synchronizing writes to the underlying database synchronously.
3. Write-Behind (Write-Back): The application writes to the cache immediately; background workers asynchronously flush writes to disk in batches.

As Phil Karlton famously noted: "There are only two hard things in Computer Science: cache invalidation and naming things." Caches must define appropriate Time-To-Live (TTL) policies and listen to database mutation events to purge stale entries.`
      },
      {
        pageNumber: 5,
        title: 'Page 5: Database Scaling: Sharding, Partitioning & Replication',
        content: `When a relational database reaches physical compute limits, horizontal scaling strategies must be deployed. 

Read-Replication involves a Primary database that accepts all write operations (INSERT, UPDATE, DELETE) and streams write-ahead logs (WAL) to multiple Read Replicas. Applications route heavy analytical queries to replicas, scaling read throughput linearly.

When write throughput saturates the primary node or dataset size exceeds storage volumes, Horizontal Sharding is required. Sharding partitions rows across independent database instances using a Shard Key (e.g., hash(userId) % numberOfShards). Choosing an improper shard key leads to "hotspotting", where 90% of user activity hits a single shard while others remain underutilized.`
      },
      {
        pageNumber: 6,
        title: 'Page 6: Event-Driven Architectures & Apache Kafka',
        content: `Synchronous HTTP calls between microservices create fragile chains of temporal coupling. If Service A calls B, which calls C, which calls D, a failure in D cascades upwards, causing latency spikes and thread pool starvation in Service A.

Event-Driven Architecture (EDA) replaces synchronous chains with asynchronous message logs. Systems like Apache Kafka and AWS Kinesis treat events as immutable, ordered streams of state changes. 

Publishers emit domain events (e.g., "OrderPlaced") without knowing who consumes them. Downstream services (Billing, Inventory, Notification, Analytics) read events independently from partitions at their own processing rate. This decouples failure domains: if the Notification service crashes, Kafka buffers the events safely until the service recovers.`
      },
      {
        pageNumber: 7,
        title: 'Page 7: The CAP Theorem and PACELC in Real Systems',
        content: `Formulated by Eric Brewer, the CAP Theorem dictates that in any asynchronous network subject to network partitions (P), a distributed data store can guarantee either Consistency (C) or Availability (A), but never both simultaneously.

In modern practice, Daniel Abadi expanded this via the PACELC theorem: If there is a Partition (P), trade off Availability (A) and Consistency (C); Else (E), trade off Latency (L) and Consistency (C).

For example, Spanner and traditional RDBMS prioritize strict serializability (CP), rejecting requests if quorum cannot be validated across replicas. Conversely, DynamoDB and Cassandra offer tunable eventual consistency (AP), ensuring high write availability at the expense of temporary replication lag across data centers.`
      },
      {
        pageNumber: 8,
        title: 'Page 8: Resilience Engineering: Circuit Breakers & Rate Limiters',
        content: `In distributed environments, hardware faults, network congestion, and memory pressure are inevitable. Software must be architected for graceful degradation.

The Circuit Breaker pattern (popularized by Netflix Hystrix and Resilience4j) wraps remote network invocations. It monitors error rates:
- Closed State: Normal operation, requests pass through.
- Open State: If failures exceed a 50% threshold, the breaker trips open, failing requests immediately without hitting the downstream server, allowing it time to recover.
- Half-Open State: After a cooldown window, a trial batch of requests is allowed through to test downstream health.

Rate Limiting (Token Bucket and Leaky Bucket algorithms) defends API gateways against denial-of-service surges and noisy neighbor tenants by capping requests per second.`
      },
      {
        pageNumber: 9,
        title: 'Page 9: The Saga Pattern for Distributed Transactions',
        content: `In monolithic databases, two-phase commit (2PC) guarantees ACID properties across multiple tables. However, in microservice architectures where each service possesses its own isolated database, 2PC is notoriously slow and susceptible to blocking.

The Saga Pattern coordinates transactions across multiple independent services using a sequence of local transactions. Each local transaction updates its own database and publishes an event or message.

If a step fails (e.g., credit card payment declined after inventory was reserved), the Saga orchestrator or choreographing participants trigger a sequence of Compensating Transactions that undo the previous changes in reverse order (e.g., releasing reserved inventory). Sagas guarantee eventual consistency rather than atomic isolation.`
      },
      {
        pageNumber: 10,
        title: 'Page 10: Container Orchestration & Kubernetes Internals',
        content: `Containerization with Docker encapsulates application runtimes, dependencies, and configurations into immutable OCI images. Kubernetes (K8s) provides the orchestration plane to deploy, scale, and heal containers across clusters of physical or virtual machines.

Key Kubernetes primitives include:
- Pods: The smallest deployable unit, encapsulating one or more co-located containers sharing network namespaces and storage volumes.
- Deployments & ReplicaSets: Declare desired replica counts and facilitate zero-downtime rolling updates.
- Services & Ingress: Provide stable virtual IP addresses and DNS service discovery for pods whose IP addresses change dynamically upon rescheduling.
- Kubelet & Control Plane: The API Server, etcd distributed key-value store, and controller managers continuously reconcile observed cluster state with desired state.`
      },
      {
        pageNumber: 11,
        title: 'Page 11: The Three Pillars of Observability: Logs, Metrics, Traces',
        content: `You cannot debug a distributed system you cannot see. Observability moves beyond simple error logging into three interconnected telemetry streams:

1. Structured Logs (JSON): Machine-searchable log records indexed in systems like Elasticsearch or Loki, enriched with correlation IDs.
2. Metrics (Prometheus): Numeric time-series data capturing counters, gauges, and histograms (CPU utilization, HTTP error rates, 99th percentile response latencies).
3. Distributed Traces (OpenTelemetry, Jaeger): Contextual trace spans that propagate unique traceId headers across every microservice hop, pinpointing exact bottlenecks where milliseconds were spent across the network request lifecycle.

Real-time alerting should trigger on symptoms affecting user SLOs (Service Level Objectives) rather than transient raw infrastructure spikes.`
      },
      {
        pageNumber: 12,
        title: 'Page 12: Zero Trust Security & Identity Protocols',
        content: `Traditional enterprise security relied on the "castle-and-moat" perimeter model: once inside the corporate VPN or local subnet, traffic was implicitly trusted. Modern cloud architecture embraces Zero Trust: "Never trust, always verify."

Core security mechanics include:
- Mutual TLS (mTLS): Service meshes like Istio enforce encrypted, authenticated cryptographic handshakes between every internal microservice using ephemeral x509 certificates.
- OAuth 2.0 & OpenID Connect (OIDC): Standardized delegation and identity frameworks issuing signed JSON Web Tokens (JWTs) containing user claims and scopes.
- Secret Management: Storing credentials, database passwords, and private keys in secure vaults (HashiCorp Vault, AWS Secrets Manager) rather than plaintext configuration files or container environment variables.`
      },
      {
        pageNumber: 13,
        title: 'Page 13: CI/CD Pipelines & Immutable Infrastructure',
        content: `High-velocity software teams deploy code to production multiple times per day with near-zero failure rates. This is enabled by Continuous Integration and Continuous Deployment (CI/CD) pipelines.

The principle of Immutable Infrastructure dictates that once a virtual machine or container image is baked, it is never modified or patched in-place. If a configuration changes, a brand new image is compiled through automated test suites and rolled out.

Deployment strategies:
- Rolling Deployments: Incrementally replace old pods with new ones.
- Blue/Green Deployments: Maintain two identical production environments; switch the load balancer router instantly to the new environment after smoke tests pass.
- Canary Deployments: Route 2% of live production traffic to the new version, monitor error rate metrics, and progressively roll out to 100%.`
      },
      {
        pageNumber: 14,
        title: 'Page 14: Data Engineering: ETL, ELT, and Lakehouses',
        content: `Transactional databases (OLTP) are optimized for row-by-row low-latency ACID operations. Analytical workloads (OLAP) require aggregating billions of rows across years of historical data for business intelligence and machine learning.

Traditional ETL (Extract, Transform, Load) extracted data from operational databases, transformed it using compute clusters, and loaded clean tables into relational data warehouses (Snowflake, BigQuery).

Modern architectures favor ELT and Lakehouses (Apache Iceberg, Delta Lake). Raw, unparsed event streams are deposited into cheap object storage (S3/GCS). Fast distributed query engines (Presto, Trino, Spark) execute SQL analytics directly against columnar Parquet files, decoupling compute scaling from storage costs.`
      },
      {
        pageNumber: 15,
        title: 'Page 15: The Senior Architect Mindset: Pragmatism & Craft',
        content: `The ultimate measure of an architect is not how many complex technologies they introduce into a company, but how simple they can keep the system while satisfying all business and operational requirements.

Every architectural decision carries a tax: operational maintenance, cognitive overhead for incoming engineers, and financial infrastructure bills. Strive for boring technology where possible, and reserve architectural novelty strictly for your company’s core competitive differentiator.

Document critical architectural decisions using Architectural Decision Records (ADRs). ADRs capture context, options considered, trade-offs accepted, and consequences, ensuring future engineering teams understand why the system was built the way it was.`
      },
      {
        pageNumber: 16,
        title: 'Page 16: Zero-Trust Architecture & BeyondCorp Security',
        content: `The traditional castle-and-moat network security model—where perimeter firewalls protect an untrusted outer internet while trusting everything on the internal intranet—is irrevocably dead in the modern cloud landscape.

Under the Zero-Trust security paradigm, coined by Forrester and popularized by Google's BeyondCorp:
- "Never trust, always verify."
- Every single request, whether originating from an external mobile device or an internal container on the same Kubernetes pod, must be authenticated, authorized, and encrypted.

Key implementation components:
1. Mutual TLS (mTLS): Ephemeral X.509 certificates rotated every 24 hours between microservices via SPIFFE/SPIRE.
2. Context-Aware Access: Evaluating device posture, location, and user role before granting access.
3. Least Privilege: Restricting service accounts strictly to required database tables and topics.`
      },
      {
        pageNumber: 17,
        title: 'Page 17: Service Meshes: Traffic Routing, Canary & Observability',
        content: `As microservice topologies expand to hundreds of containers, offloading cross-cutting operational concerns—retries, timeouts, distributed tracing, and traffic shifting—from application code to infrastructure sidecars is essential.

A Service Mesh (Istio, Envoy, Linkerd) operates as a dedicated infrastructure layer:
1. Data Plane: High-performance Envoy C++ proxies run as sidecars alongside every application container, intercepting all inbound and outbound network traffic.
2. Control Plane: Pushes routing rules, TLS certificates, and telemetry configurations to proxies dynamically without restarting pods.

Canary deployments become trivial: Envoy proxies shift 5% of production traffic to version 2.0 based on HTTP headers, automatically rolling back if error metrics exceed 0.5%.`
      },
      {
        pageNumber: 18,
        title: 'Page 18: Event Sourcing & CQRS (Command Query Responsibility Segregation)',
        content: `Traditional CRUD applications store only the current state of an entity. When an update occurs, previous states are lost unless manually recorded in audit logs.

Event Sourcing flips persistence:
- The authoritative source of truth is an append-only log of immutable domain events (e.g., 'OrderCreated', 'ItemAdded', 'PaymentCaptured').
- Current entity state is reconstructed by replaying events sequentially.

CQRS (Command Query Responsibility Segregation) separates writes from reads:
1. The Command Model: Enforces business validation rules and appends events to the Event Store.
2. The Query Model: Background projectors consume event streams and build optimized, denormalized read views in Elasticsearch, MongoDB, or Redis for instant search.`
      },
      {
        pageNumber: 19,
        title: 'Page 19: Disaster Recovery, RTO, RPO & Multi-Region Active-Active',
        content: `Enterprise business continuity depends on two fundamental disaster recovery metrics:
1. Recovery Point Objective (RPO): The maximum acceptable data loss measured in time (e.g., "maximum 5 seconds of uncommitted transactions lost").
2. Recovery Time Objective (RTO): The maximum tolerable duration of system downtime before service is restored (e.g., "service online within 2 minutes").

High-Availability Strategies:
- Cold Standby: Backups stored in secondary cloud region; spin up servers manually upon failure. (High RTO, low cost).
- Warm Standby (Pilot Light): Core databases replicate continuously; minimal compute fleet running in secondary region.
- Multi-Region Active-Active: Real-time traffic routed to both regions simultaneously using Anycast DNS. Requires multi-master distributed consensus (CockroachDB, Spanner) to prevent split-brain conflicts.`
      },
      {
        pageNumber: 20,
        title: 'Page 20: The Ten Immutable Laws of Distributed Systems Architecture',
        content: `1. Fallacies of Distributed Computing: Networks are not reliable, latency is not zero, bandwidth is not infinite, and topology changes constantly.
2. CAP Theorem: Under a network partition, you must choose Availability or Consistency.
3. Idempotency is Mandatory: Every network message will be duplicated; ensure retries produce identical outcomes.
4. Backpressure Prevents Collapse: Fast producers will crush slow consumers without reactive backpressure.
5. Fail Fast, Recover Faster: Timeout early and isolate failures using Circuit Breakers.
6. Design for Asynchrony: Decouple services with durable event logs.
7. Telemetry Precedes Deployment: If you cannot measure it in real-time metrics, do not ship it.
8. Security Cannot Be Bolted On: Architect authentication and encryption from Day 1.
9. Optimize for Maintainability: Code is read 10x more often than written.
10. Simplicity Over Novelty: The most reliable component is the one you never had to build.`
      }
    ]
  },

  // 2. NOVEL (18 PAGES)
  {
    id: 'book-novel-enigma',
    title: 'The Clockwork Enigma',
    author: 'Alistair Finch',
    category: 'novels',
    badge: 'Mystery Novel',
    description: 'A gripping 18-chapter Victorian mystery novel following Inspector Silas Thorne through the foggy cobblestone alleys and subterranean clockworks of 1888 London.',
    coverEmoji: '🕵️‍♂️',
    coverColor: 'from-amber-700 to-stone-900',
    totalPages: 18,
    readPages: [],
    pages: [
      {
        pageNumber: 1,
        title: 'Chapter 1: The Silent Clocktower',
        content: `The fog hung thick and heavy over the Thames, smelling of wet coal, river silt, and extinguished furnace lanterns. It was three minutes past midnight when the great bells of St. Jude’s Cathedral failed to toll. For forty-two years, their resonant brass chime had marked every passing hour for the dockworkers and watchmen of the eastern wharf. Tonight, there was only a hollow, metallic shudder.

Inspector Silas Thorne pulled his wool collar tight against the damp chill as he stepped down from his carriage. Scotland Yard had dispatched him with urgent haste. Beneath the towering stone archway of the clocktower, Sergeant Higgins stood shivering under a gas lamp, his lantern throwing sickly yellow shadows against the soot-stained masonry.

"It’s Master Bramwell, sir," Higgins whispered, voice trembling. "The chief clockmaker. He’s up in the escapement chamber. And the door was bolted from the inside."`
      },
      {
        pageNumber: 2,
        title: 'Chapter 2: The Broken Gears',
        content: `Thorne ascended the spiral iron staircase, his boots ringing rhythmically on the perforated treads. One hundred and eighty steps up, the smell of grease, whale oil, and chilled copper filled the narrow stairwell.

The oak door of the upper chamber had been forced open with an iron crowbar. Inside lay Master Horatio Bramwell, slumped face forward against the massive mahogany drafting desk. Surrounding him were blueprints of impossible mechanisms—intricate astronomical dials, planetary gears, and pendulum dampeners sketched in sepia ink.

Thorne knelt beside the body. There was no blood, no mark of violence upon the old man’s neck, yet his hands were frozen in a desperate clutching posture. Between his stiffening fingers lay a single brass cogwheel, its teeth cut in a bizarre Fibonacci spiral. Thorne took his magnifying glass from his waistcoat pocket. Carved into the rim of the gear were microscopic letters: *TEMPUS VINCIT OMNIA*.`
      },
      {
        pageNumber: 3,
        title: 'Chapter 3: The Whispered Warning',
        content: `Sergeant Higgins held the lantern high, revealing a collection of peculiar instruments lining the stone walls. Glass vials filled with mercury, mercury-arc rectifiers, and a copper telegraph apparatus wired directly into the cathedral’s lightning rod.

"Look here, Inspector," Higgins murmured, pointing toward the window ledge.

A pane of stained glass depicting the Archangel Michael had been neatly cut with a diamond point. On the outer sill lay a fresh smudge of black soot, and beside it, a dried sprig of dried nightshade tied with scarlet silk thread.

"He knew someone was coming for him," Thorne said, examining the ink bottle on the desk. It had spilled across a notebook, but several lines remained legible: *'The brotherhood has located the second cylinder. If the Grand Regulator is engaged on the solstice, the bells will not toll for the dead, but for the living.'*`
      },
      {
        pageNumber: 4,
        title: 'Chapter 4: Footprints in the Coal Dust',
        content: `Thorne descended into the lower crypt of St. Jude’s, where the massive iron counterweights of the clock mechanism hung suspended over a thirty-foot shaft. The floor was carpeted in decades of settled soot and coal dust from the nearby steam rail terminus.

Holding his matchbox close to the ground, Thorne traced a set of deliberate footprints. They were narrow, elegant, with leather soles that lacked the iron hobnails common to dock laborers. Every fourth stride dragged slightly on the left heel—an old injury or a mechanical brace.

Near the service grate leading out toward the river sewers, the intruder had dropped an item in their haste. Thorne retrieved it with his brass tweezers: a silver matchbox stamped with the crest of the Royal Chronometric Society.`
      },
      {
        pageNumber: 5,
        title: 'Chapter 5: The Alchemist’s Ledger',
        content: `By four o’clock in the morning, Thorne was seated in his gaslit study at Baker Street, pouring black coffee as the rain lashed against his leaded windowpanes. On his mahogany desk sat Bramwell’s personal ledger, recovered from a secret floorboard compartment beneath the drafting table.

The pages were filled with equations, astronomical calculations, and financial transactions going back thirty years. Large sums of sterling had been transferred to Bramwell from Lord Reginald Sterling, the wealthy industrialist who owned the Thames Steamworks Foundry.

One entry, dated three weeks prior, sent a cold shiver down Thorne’s spine: *'Sterling demands the completion of the resonance coil. He claims the acoustic vibration will shatter every glass window within three miles, but I know the true frequency will disrupt the telegraph grid across Great Britain.'*`
      },
      {
        pageNumber: 6,
        title: 'Chapter 6: The Shadow in the Courtyard',
        content: `Dawn broke over London with the color of curdled milk. Thorne walked toward the cobblestone courtyard of the Royal Chronometric Society in Mayfair. The gas streetlights had just been extinguished by the lamplighters, leaving the square wrapped in morning mist.

As Thorne approached the marble steps, he caught sight of a figure lingering by the iron railings—a man dressed in an Inverness cape, leaning upon a silver-headed cane with a pronounced limp on his left foot.

"Good morning, sir," Thorne called out, quickening his pace.

The man turned sharply. Beneath the brim of his silk top hat, his face was pale, scarred along the jawline, and his eyes burned with an unsettling intensity. Without a word, he struck the pavement with his cane, shattered a smoke phial onto the cobblestones, and vanished into the labyrinthine alleys of Shepherd Market.`
      },
      {
        pageNumber: 7,
        title: 'Chapter 7: A Cold Trail in Whitechapel',
        content: `Thorne followed the trail of the mysterious figure deep into the narrow slums of Whitechapel. Here, the air was dense with the stench of tanneries and fried fish. Higgins caught up with him, accompanied by two armed constables.

"We spoke to the dock master at Wapping Basin," Higgins panted. "A private steam launch departed forty minutes ago, bearing crates marked for the Sterling Foundry."

Thorne stopped before a dilapidated tenement building where Bramwell’s estranged daughter, Clara, was reported to work as a watch restorer. The wooden signboard above her shop creaked in the gusting wind: *C. Bramwell — Horological Repairs and Precision Dials*.

Inside, the ticking of eighty clocks echoed in hypnotic synchronization.`
      },
      {
        pageNumber: 8,
        title: 'Chapter 8: The Clockmaker’s Daughter',
        content: `Clara Bramwell stood behind the workbench, an optical loupe fitted over her right eye and tweezers poised over an open pocket watch balance spring. She did not flinch as Thorne showed his Scotland Yard badge.

"You are here about my father," she said softly, laying down her tools. "He thought he could outwit Lord Sterling. He believed he was merely constructing an astronomical predictor for navigation."

"Your father left a warning about the solstice," Thorne said gently, placing the spiral cogwheel upon the counter.

Clara’s hands began to shake as she recognized the gear. "This is the master key to the Grand Regulator. Sterling does not want to disrupt the telegraph lines for political chaos, Inspector. He has shorted the Bank of England’s colonial railway shares. A four-hour blackout across the empire’s telegraphs will yield him millions before the trading houses open."`
      },
      {
        pageNumber: 9,
        title: 'Chapter 9: The Steam Vault',
        content: `Under the cover of dusk, Thorne, Higgins, and a squad of Scotland Yard detectives converged upon the Sterling Foundry along the south bank of the Thames. The facility was a sprawling iron fortress of belching smokestacks and roaring steam boilers.

Entering through an intake tunnel beneath the high-tide waterline, Thorne and his men navigated the subterranean catacombs. Giant copper pipes groaned with pressurized steam overhead.

In the center of the subterranean vault stood a mammoth device: three stories of gleaming brass gears, rotating harmonic cylinders, and a gigantic tuning fork forged of solid bell-metal, wired to an array of Leyden jars. At the control console stood Lord Reginald Sterling himself, checking a golden pocket watch.`
      },
      {
        pageNumber: 10,
        title: 'Chapter 10: False Confessions',
        content: `"Turn around slowly, Lord Sterling," Thorne commanded, cocking his Webley revolver.

Sterling turned without surprise. A cold, supercilious smile touched his thin lips. Behind him, four burly ironworkers armed with spanners stepped out from the shadows of the flywheel.

"You are too late, Inspector," Sterling sneered. "Bramwell was weak. His conscience troubled him at the final hour, so my associate had to relieve him of his keys. But the machine is already primed. When the pressure gauge reaches eight hundred pounds, the harmonic pulse will discharge through the river bed."

"Your associate was seen at the cathedral," Thorne countered. "Dr. Nicholas Graves, former royal astronomer. He left his mark."`
      },
      {
        pageNumber: 11,
        title: 'Chapter 11: The Silver Key',
        content: `From the shadows of the upper gantry, a rifle shot rang out. The bullet struck the brickwork inches from Thorne’s ear, showering his shoulder in red dust. Dr. Graves stood on the catwalk, cocking a repeating rifle.

"Scatter!" Thorne yelled as Higgins returned fire with his service pistol.

The ironworkers surged forward. Thorne ducked beneath a swung steel wrench, delivered a crisp blow with his walking stick to the foreman’s knee, and leaped onto the brass catwalk ladder.

Clara Bramwell had slipped through the side vent unnoticed. In her hand she held a velvet pouch containing her father’s counter-tuning cipher. "Inspector! The resonance chamber must be grounded before the capacitor banks fire!"`
      },
      {
        pageNumber: 12,
        title: 'Chapter 12: Midnight at Blackfriars',
        content: `Steam valves began to scream across the vault as the main pressure regulator surged past safety limits. The hum of the harmonic tuning fork grew from a low thrum into an ear-splitting vibrational roar that shook the soot from the vaulted ceiling.

Higgins tackled two foundry guards into a coal bin, his whistle shrieking through the fog. Thorne scaled the gantry three steps at a time, cornering Dr. Graves at the edge of the boiler pit.

"Step away from the circuit breaker, Graves!" Thorne shouted over the mechanical deafening roar.

Graves snarled, lunging forward with a concealed dagger. Thorne sidestepped, parried the blade with his heavy trench coat, and drove his shoulder into the astronomer’s chest, disarming him against the iron railing.`
      },
      {
        pageNumber: 13,
        title: 'Chapter 13: The Confrontation',
        content: `Below on the vault floor, Lord Sterling was desperately attempting to lock the spiral cogwheel into the master control spindle.

"It won't turn!" Sterling screamed in panic. "Bramwell changed the pin alignment!"

Thorne descended the ladder with Graves in iron handcuffs. "He didn't just change the pins, Sterling. He entrusted the counter-mechanism to his daughter."

Clara stepped forward into the glow of the furnace. With steady, trained hands, she inserted a silver calibration pin into the secondary escapement wheel. With a single turn counter-clockwise, the gears reversed their rotation, venting the pressurized steam harmlessly through the river exhaust chimneys.`
      },
      {
        pageNumber: 14,
        title: 'Chapter 14: Unwinding the Mechanism',
        content: `The deafening roar subsided into a gentle hiss of escaping vapor. The giant brass tuning fork gradually slowed to a halt, its harmonic resonance dying away into the damp London air.

Lord Sterling sank to his knees, his hands trembling as Higgins clamped the steel handcuffs around his wrists. "You don't understand," Sterling muttered in defeat. "Progress cannot be restrained by a handful of policemen."

"Progress built upon extortion and murder is not progress, Sterling," Thorne replied, pocketing the silver key. "It is merely theft in a brass coat."

Police wagons arrived on the embankment, their oil lamps casting long reflections upon the swirling waters of the Thames.`
      },
      {
        pageNumber: 15,
        title: 'Chapter 15: Dawn Over the River',
        content: `By seven o’clock, the morning sun broke through the smoky haze over the dome of St. Paul’s Cathedral, painting the river in shades of gold and amber.

Inspector Thorne stood on the stone embankment, breathing in the brisk morning air. Beside him, Clara Bramwell looked up at the clocktower of St. Jude’s in the distance. High above the rooftops, the great bells began to chime once more—seven deep, melodious strokes that rang clear across the waking city.

"The clock is keeping true time again," Clara said with a faint, sorrowful smile.

"It is," Thorne agreed, tipping his brim toward the brave young horologist. "And so long as there are those who value truth above copper and gold, London’s time will remain uncorrupted."`
      },
      {
        pageNumber: 16,
        title: 'Chapter 16: The Subterranean Guildhall',
        content: `Three days following the arrests at the eastern wharf, a cryptic wax-sealed note arrived on Inspector Thorne’s desk at Scotland Yard. Written in iron gall ink upon heavy parchment, it bore the crest of a crossed pendulum and calipers: "Below the Roman foundations of Fleet Ditch, the third gear remains in motion."

Taking Sergeant Higgins and two bullseye lanterns, Thorne descended through the forgotten brick conduits beneath the City. Water dripped from ancient lime vaults, smelling of mineral rust and old secrets.

Behind a false brick wall laid during the Great Fire, they uncovered a chamber lit by flickering whale-oil lamps: an underground horological workshop filled with precision lathes, brass escapements, and ledger books spanning three centuries.`
      },
      {
        pageNumber: 17,
        title: 'Chapter 17: The Master of Escapements',
        content: `In the center of the subterranean workshop sat a silver automaton holding a quill over an open vellum manuscript. As Thorne stepped onto the flagstone floor, an intricate spring-loaded escapement whirred to life within the automaton's chest.

With uncanny mechanical grace, the silver arm dipped the quill into black ink and inscribed a single line across the page:
"To seek the truth of time is to understand that no pendulum swings in isolation."

Beside the automaton rested the master chronometer designed by Harrison himself—the missing prototype thought destroyed in 1762. Its celestial gear train accurately mapped the precession of the equinoxes, beating with rhythmic, infallible perfection.`
      },
      {
        pageNumber: 18,
        title: 'Chapter 18: Epilogue: Echoes in the London Mist',
        content: `The prototype was secured and transferred to the Royal Observatory at Greenwich, forever beyond the reach of greedy syndicates.

Silas Thorne walked alone through St. James’s Park as autumn leaves fell upon the damp gravel paths. The chimes of Big Ben reverberated across the Thames, deep and majestic, synchronizing with the bells of St. Jude’s in harmonious resonance.

Clara Bramwell was appointed Master Horologist of the Admiralty, carrying forward her father’s legacy with pride and unyielding integrity.

And in the quiet hours of midnight, as London slept beneath its blanket of fog, Inspector Thorne knew that while crimes would come and go, truth, like the steady beat of an escapement wheel, would always endure.`
      }
    ]
  },

  // 3. STORY BOOK (18 PAGES)
  {
    id: 'book-story-forest',
    title: 'Legends of the Whispering Forest',
    author: 'Mira Woodland',
    category: 'stories',
    badge: 'Folklore & Adventure',
    description: 'A magical 18-chapter illustrated fable celebrating courage, harmony, wisdom, and the ancient spirits of the wild woods.',
    coverEmoji: '🌲',
    coverColor: 'from-emerald-700 to-teal-900',
    totalPages: 18,
    readPages: [],
    pages: [
      {
        pageNumber: 1,
        title: 'Chapter 1: The Grove of Glowing Embers',
        content: `Deep beyond the edge of the kingdom, past the rolling hills where shepherds graze their sheep, lies the Whispering Forest. The elders say that the trees here were planted when the moon was still young, and that their roots drink from underground rivers of starlight.

In the small timber village of Oakhaven, ten-year-old Toby loved to sit on the cottage porch and listen to the leaves. When the wind blew from the north, the forest did not rustle like ordinary woods; it hummed with melodies of ancient flutes and soft, curious murmurs.

One twilight, as the shadows lengthened across the mossy stone walls, Toby noticed an unfamiliar amber glow pulsing deep within the thickets of Elderwood Glen. No hunter dared venture there after sundown, but Toby had found a silver acorn in his grandmother’s cedar chest that morning—an acorn that now felt pleasantly warm inside his woolen pocket.`
      },
      {
        pageNumber: 2,
        title: 'Chapter 2: The Owl Who Kept the Stars',
        content: `Guided by the comforting warmth of the silver acorn, Toby tiptoed along the deer trails. The canopy above was so dense that the night sky was hidden, yet the path was illuminated by luminous blue mushrooms growing upon fallen birch logs.

"Hoo-who treads upon the moss without asking permission?" a deep, resonant voice echoed from a grand silver spruce.

Toby looked up. Perched upon a branch was an owl thrice the size of a farm hound. Its feathers were patterned like frost on a windowpane, and its golden eyes glowed with patient curiosity.

"I am Toby from Oakhaven," the boy replied, bowing politely as his grandfather had taught him. "I followed the amber light."

"Ah," the owl said, tilting its feathery head. "I am Barnaby, Keeper of the Canopy Stars. You carry the gift of the Meadow Queen. If you seek the heart of the forest, remember: fear makes the briars sharp, but kindness turns thorns to ferns."`
      },
      {
        pageNumber: 3,
        title: 'Chapter 3: The River of Mirrored Dreams',
        content: `Toby thanked Barnaby and walked on until he reached the banks of the Mirrored River. Its waters flowed without a single ripple or splash, as smooth as polished obsidian.

When Toby leaned over the bank, the water did not reflect his face. Instead, it showed a vision: his village covered in thick gray brambles, the apple orchards withered, and the birds silent in their nests.

"The water shows what will happen if the Heartstone is not rekindled before the winter solstice," whispered a small voice beside him.

Toby jumped. Sitting on a flat river pebble was a creature no taller than an apple. She had dragonfly wings that shimmered in opal hues and wore a cloak stitched from autumn birch leaves.

"My name is Pip," the sprite chirped, brushing dew from her tiny boots. "And you, human boy, have arrived just in time."`
      },
      {
        pageNumber: 4,
        title: 'Chapter 4: The Stone Giant’s Lullaby',
        content: `To reach the Ancient Shrine where the Heartstone rested, Toby and Pip had to cross the Valley of Sleeping Sentinels. Giant boulders covered in lichens lay scattered across the gorge like colossal resting sheep.

Suddenly, the ground trembled. One of the massive mossy mounds shifted, rising upon two great granite legs. It was a Stone Giant, its eyes glowing like dying embers in a hearth.

"Who disturbs my thousand-year slumber?" the giant rumbled, its voice like grinding millstones.

Pip hid behind Toby’s collar, trembling. Toby remembered his grandmother’s bedtime song—the one she hummed whenever the winter storms rattled the windowlatches. Gathering his breath, Toby sang the simple folk melody of earth, rain, and blooming clover into the quiet valley.

The giant stopped. Its heavy stone eyelids softened. "The song of the First Spring," it sighed, sinking back onto the soft bed of clover. "Pass in peace, little singer."`
      },
      {
        pageNumber: 5,
        title: 'Chapter 5: The Weaver of Morning Mist',
        content: `As morning approached, the forest plunged into a dense, silver fog so thick that Toby could not see his own outstretched fingers. Every direction looked identical, and the path vanished into gray dampness.

"We are lost," Pip groaned, pulling her leaf cloak over her ears. "The Mist Weaver is spinning her morning curtains."

Toby knelt down and placed his hand on the soil. He closed his eyes and listened, just as he did on the cottage porch. Beneath the silence, he felt the subtle vibrations of water trickling through subterranean limestone channels.

"The trees always lean toward the morning sun," Toby observed. He examined the bark of the nearest hemlock; the moss grew lushly on the north, while the southern side was warm and dry. Following the wisdom of the bark, they walked steadily eastward through the swirling mists.`
      },
      {
        pageNumber: 6,
        title: 'Chapter 6: The Fox of the Silver Fern',
        content: `Emerging from the mist, they stumbled upon a clearing carpeted in silver ferns that glowed with diamond-like morning dew. In the center lay a red fox, its hind leg caught beneath a fallen deadfall branch.

"Careful, Toby!" Pip warned from his shoulder. "Forest foxes are tricky creatures with sharp teeth and sharper tongues."

The fox looked at Toby with weary, intelligent eyes. It did not growl. 

Toby laid down his walking staff and approached slowly, palms open. "I will not hurt you, brother fox," he murmured. Using his staff as a lever against a sturdy stone, Toby threw his entire weight onto the wood. With a wooden crack, the heavy branch lifted, and the fox scrambled free.

The fox shook its copper coat, bowed with royal grace, and spoke: "I am Reynard of the Sunlit Glade. For your mercy, I offer you my speed when your feet can carry you no further."`
      },
      {
        pageNumber: 7,
        title: 'Chapter 7: The Hollow of Forgotten Echoes',
        content: `The path now entered a narrow limestone canyon where the wind wailed like sorrowful fiddles. This was the Hollow of Echoes, where every doubt and fearful thought a traveler ever had bounced back louder and darker from the canyon walls.

*"You are too small!"* whispered the rocks. *"You will fail your village! Go back to your warm bed!"*

Toby felt tears prick his eyes. The shadows seemed to stretch claw-like fingers across his path. He touched the silver acorn in his pocket and thought of his mother baking warm oat bread, his father mending fences with a whistle, and the laughter of his friends playing by the millpond.

"I may be small," Toby shouted back at the stone cliffs, his voice ringing true, "but love is bigger than any mountain!"

The dark echoes fractured into harmless bubbles of soap and vanished into the blue sky.`
      },
      {
        pageNumber: 8,
        title: 'Chapter 8: The Lantern in the Hollow Oak',
        content: `At the midpoint of the journey stood the Grandfather Oak, the oldest tree in all the seven kingdoms. Its trunk was as wide as four cottages combined, and inside its hollow heart lived Grandmother Bramble, a badger who was older than the written histories.

Grandmother Bramble poured them acorn tea from an earthenware kettle over a crackling hearth of pinecones.

"The Heartstone has lost its fire because people in the villages forgot to thank the earth for the harvest," the badger said, adjusting her spectacles. "They took the timber and the clean water, but gave no gratitude in return. When hearts grow cold, the forest sleeps."

She handed Toby an amber lantern fueled by honeysuckle nectar. "This light will pierce the Gloomwood. Guard it with your courage."`
      },
      {
        pageNumber: 9,
        title: 'Chapter 9: The Briar Wall of Gloomwood',
        content: `The Gloomwood was dark, cold, and tangled with iron-hard blackthorn briars. The thorns were as long as daggers and intertwined so tightly that not even a mouse could slip between them.

Pip attempted to fly over, but the cold wind beat her tiny wings down.

Remembering Barnaby the Owl’s words—*Kindness turns thorns to ferns*—Toby did not take out an axe or attempt to break the branches. Instead, he hung Grandmother Bramble’s honeysuckle lantern upon the nearest thorn and breathed his warm breath against the frostbitten boughs.

"We bring no fire to burn you," Toby spoke softly to the hedge. "We bring memory of the sun."

Slowly, miraculous green leaves uncurled from the black bark. White jasmine blossoms opened, perfuming the cold air, and the thorny wall parted like a velvet curtain.`
      },
      {
        pageNumber: 10,
        title: 'Chapter 10: The Council of Ancient Pines',
        content: `Beyond the briars stood the Council of Pines—twelve towering evergreen giants crowned with eternal snow. They did not speak in words, but in the fragrant scent of cedar resin and the sway of their majestic needles.

Toby knelt before the highest pine. He placed his hands upon the roots and let the tree read his honest heart: his worry for his village, his respect for the woodland creatures, and his promise to teach his people the songs of gratitude.

A golden pinecone dropped into his open hands. Inside was a single droplet of ancient amber tree sap that sparkled like the morning star.

"You have passed the tests of Harmony, Courage, and Humility," whispered the wind through the needles.`
      },
      {
        pageNumber: 11,
        title: 'Chapter 11: The Shadow at the Threshold',
        content: `At the foot of the Ancient Shrine, the temperature plummeted. From the icy crevices of the stone steps rose the Shadow of Despair—a swirling specter of black mist and biting frost.

"You cannot save this world, little boy," the Shadow hissed, freezing the grass beneath Toby’s boots. "The cold always conquers the leaf in the end."

Pip flew bravely at the specter, but a gust of icy wind tossed the tiny sprite against a stone, dazing her.

Toby was terrified, but he did not run. He stepped between the Shadow and his fallen friend. "Winter comes, it is true," Toby said, holding the silver acorn and the amber lantern high. "But winter is only the sleep that prepares the earth for spring!"`
      },
      {
        pageNumber: 12,
        title: 'Chapter 12: The Reigniting of the Heartstone',
        content: `The combined light of the honeysuckle lantern and the star-amber pierced the icy specter. The Shadow shrieked, not in pain, but in revelation, dissolving into a flock of black starlings that flew joyfully toward the sunrise.

Toby climbed the final twelve marble steps of the shrine. In the center of a pedestal carved like blooming lotus petals sat the Heartstone—a crystalline sphere that had turned cloudy and gray.

Toby carefully set the droplet of star-amber into the indentation atop the sphere.

For a heartbeat, all the world held its breath. Then, an explosion of golden, emerald, and violet light erupted from the crystal, shooting up through the canopy into the heavens like a pillar of dawn.`
      },
      {
        pageNumber: 13,
        title: 'Chapter 13: The Awakening of the Woods',
        content: `As the pulse of light rippled through the earth, the Whispering Forest awakened with an overwhelming symphony of life.

The frozen rivers thawed in joyous cascades of crystal water. Flowers burst open in blankets of lavender, gold, and crimson across every glen. The trees stretched their branches, humming a melody so rich and sweet that Toby wept with wonder.

From every thicket, creatures emerged: deer with silver antlers, badgers, foxes, flying squirrels, and hundreds of winged sprites singing in harmony. Pip fluttered up to Toby’s cheek, kissing his forehead with tears of joy in her opal eyes.`
      },
      {
        pageNumber: 14,
        title: 'Chapter 14: Reynard’s Swift Promise',
        content: `Reynard the fox trotted up to the shrine steps, his copper coat gleaming like spun gold.

"The sun is rising over your village, Toby," Reynard said. "Climb upon my back. A forest friend always keeps his word."

Toby bid farewell to Grandmother Bramble, Barnaby the Owl, and tiny Pip, promising to return when the lilacs bloomed in spring. He climbed onto Reynard’s shoulders, holding tight to his warm fur.

With boundless leaps that barely touched the mossy ground, the fox carried Toby through the singing forest, faster than the wind, faster than a hawk diving from the clouds.`
      },
      {
        pageNumber: 15,
        title: 'Chapter 15: The Village of the Whispering Wind',
        content: `When Toby stepped out of the woods at Oakhaven, the village was bathed in the warm, golden light of morning. The apple trees were in full bloom, their sweet pink petals drifting across the lanes like fragrant snow.

His mother ran from the doorway, wrapping him in a fierce, tearful embrace. His grandfather smiled from the porch, nodding with deep understanding as he spotted the green leaf pinned to Toby’s woolen coat.

From that day forward, the people of Oakhaven never took from the forest without giving thanks. They celebrated the Festival of the Green Blossom every spring, planting two saplings for every tree felled.

And whenever the north wind blew, Toby would sit on the porch, close his eyes, and listen to his friends in the woods whispering back in love.`
      },
      {
        pageNumber: 16,
        title: 'Chapter 16: The Council of Ancient Roots',
        content: `When winter returned to the valley, it arrived not with bitter frost, but with a gentle dusting of snow that sparkled like diamond dust upon the hemlock needles.

On the night of the Winter Solstice, a tiny blue light tapped against Toby’s bedroom window. It was Pip, bundled in a cloak woven from silver lichen.
"Toby! The Great Elders have gathered at the Heartstone Shrine," she trilled. "They call for the Boy of Oakhaven."

Toby put on his thick mittens and followed the little sprite through the snow-laden glades. Deep beneath the Great Oak, where geothermal steam kept the moss warm and green, the ancient tree-shepherds sat in peaceful contemplation.`
      },
      {
        pageNumber: 17,
        title: 'Chapter 17: The Gift of the Green Leaf Pendant',
        content: `Grandmother Bramble stepped forward, her wooden gnarled hands holding a pendant carved from ancient petrified olive wood. In its center glowed a living emerald droplet that pulsed in rhythm with Toby’s own heartbeat.

"You brought courage when fear ruled the shadows, Toby," Grandmother Bramble spoke, her voice like rustling autumn leaves. "You showed that a gentle heart is stronger than any sword. Wear this pendant, and wherever you travel in the wide world, the roots of the earth will guide your steps."

Barnaby the Owl bestowed a feather of silent flight, and Reynard the Fox bowed his sleek head in timeless camaraderie.`
      },
      {
        pageNumber: 18,
        title: 'Chapter 18: The Eternal Guardian\'s Song',
        content: `Years turned into decades, and Toby grew into a wise and kind carpenter who built homes for his village from fallen branches and river stones, never harming a living tree.

Children would gather around his workshop porch in the twilight to hear the legends of the Whispering Forest: of sprites who sang in lilac blossoms, foxes that outran the storm winds, and the sacred Heartstone that healed the land.

And in the high branches above Oakhaven, the trees whispered softly in the evening breeze:
"Blessed be the gentle, who walk with open eyes and grateful hearts. For to them, the forest shall never be silent."`
      }
    ]
  },

  // 4. NEWSPAPERS / TECH CHRONICLES (18 PAGES)
  {
    id: 'book-news-chronicle',
    title: 'Global Tech Chronicle & Current Affairs',
    author: 'International Technology Editorial Board',
    category: 'newspapers',
    badge: 'Daily Newspaper',
    description: 'An expansive 18-edition investigative newspaper analyzing AI breakthroughs, quantum computing, climate grids, space economy, and geopolitics.',
    coverEmoji: '📰',
    coverColor: 'from-slate-800 to-zinc-950',
    totalPages: 18,
    readPages: [],
    pages: [
      {
        pageNumber: 1,
        title: 'Edition 1: Generative AI and the Re-Architecting of Global Workforces',
        content: `SAN FRANCISCO — The rapid maturation of reasoning models and multimodal AI has crossed from experimental curiosity into enterprise-scale infrastructure overhaul. Across Fortune 500 engineering departments, AI-assisted coding tools now author or refactor upwards of 40% of standard boilerplate code.

However, industry analysts stress that the role of human software engineers has not contracted; it has elevated. The emphasis has shifted decisively from syntactic memorization to high-level system design, threat modeling, distributed resilience, and ethical data governance.

"We are entering an era of software symbiosis," remarks Dr. Aris Thorne, director of algorithmic research. "The competitive advantage no longer belongs to who can type code the fastest, but to who can decompose complex real-world domains into verifiable specifications that autonomous models can execute reliably."`
      },
      {
        pageNumber: 2,
        title: 'Edition 2: The Quantum Supremacy Milestone: Fault-Tolerant Qubits',
        content: `ZURICH — In a paper published yesterday in Nature Physics, researchers announced the first demonstration of scalable quantum error correction operating below physical fault thresholds. By weaving thousands of noisy physical qubits into logical cat-qubits, the team sustained coherence for over 10 minutes—long enough to execute complex quantum chemical simulations.

The breakthrough signals a turning point for material science, molecular drug discovery, and catalyst design for carbon capture.

Financial institutions, however, are taking note for a different reason: post-quantum cryptography. The National Institute of Standards and Technology (NIST) has issued an urgent advisory urging banks and cloud providers to migrate existing RSA-2048 and elliptic-curve keys to lattice-based cryptographic algorithms like CRYSTALS-Kyber before 2030.`
      },
      {
        pageNumber: 3,
        title: 'Edition 3: Green Grid Transition: Nuclear SMRs Powering Modern Data Centers',
        content: `HELSINKI — As artificial intelligence training clusters demand gigawatt-scale electrical infrastructure, global cloud providers are striking historic power purchase agreements with next-generation Small Modular Nuclear Reactor (SMR) developers.

Traditional renewable power sources like solar and wind suffer from intermittency, requiring costly battery storage systems to guarantee the 99.999% uptime required by modern data infrastructure. SMRs provide high-density, carbon-free baseload energy on footprints a fraction of the size of conventional nuclear facilities.

Environmental coalitions have praised the transition away from backup diesel generators, while regulatory bodies in Europe and North America race to harmonize safety licensing standards for factory-assembled nuclear reactors.`
      },
      {
        pageNumber: 4,
        title: 'Edition 4: The Commercial Space Economy: Orbital Factories and Lunar Gateways',
        content: `CAPE CANAVERAL — The cost of orbital payload transport has fallen below $500 per kilogram, unlocking industrial manufacturing possibilities impossible within Earth's gravity well.

In Low Earth Orbit, autonomous orbital laboratories are currently manufacturing ultra-pure ZBLAN optical fiber and printing human cardiovascular tissue lattices. Microgravity eliminates convection currents and sedimentation, producing glass with 100x lower signal loss than terrestrial silica.

Concurrently, international space agencies and commercial consortia have begun assembly of orbital staging platforms designed to service permanent scientific outposts on the lunar south pole, where water ice deposits promise to fuel deep-space exploration to Mars.`
      },
      {
        pageNumber: 5,
        title: 'Edition 5: The Global Semiconductor Arms Race and 2nm Lithography',
        content: `HSINCHU — Semiconductor fabrication foundries have officially commenced risk production on 2-nanometer gate-all-around (GAA) nanosheet architectures. Powered by High-NA Extreme Ultraviolet (EUV) lithography systems costing upwards of $350 million per machine, these chips pack over 50 billion transistors onto a silicon die the size of a fingernail.

The technological complexity has heightened geopolitical tensions. Sovereign nations are deploying hundreds of billions of dollars in state subsidies through legislation like the European and US Chips Acts to construct domestic onshore foundries.

Industry experts caution that semiconductor supply chains involve thousands of specialized chemical suppliers, precision optics manufacturers, and rare earth miners, making complete national self-reliance an optical illusion.`
      },
      {
        pageNumber: 6,
        title: 'Edition 6: Spatial Computing and Neural Interfaces: Beyond the Smartphone',
        content: `TOKYO — Consumer electronics hardware is undergoing its most profound platform shift since the introduction of capacitive touchscreens in 2007. Lightweight spatial computing visors and neural electromyography (EMG) wristbands are graduating from niche enthusiast devices into everyday productivity platforms.

By reading subtle electrical impulses along motor neurons in the wrist, users can type, navigate, and manipulate 3D spatial models through imperceptible micro-finger gestures.

Medical applications are accelerating rapidly: non-invasive neural decoders have restored synthetic speech and fine motor control to patients suffering from ALS and spinal injuries, translating thought patterns directly into synthesized vocal phonemes with 95% accuracy.`
      },
      {
        pageNumber: 7,
        title: 'Edition 7: The Solid-State Battery Revolution and Grid-Scale Storage',
        content: `STUTTGART — Leading automotive consortia have unveiled production prototypes of commercial solid-state lithium-metal batteries. By replacing volatile liquid organic electrolytes with ceramic separators, the new cells offer double the energy density of conventional lithium-ion batteries while eliminating thermal runaway and fire risks.

Electric vehicles equipped with these cells achieve 600 miles of highway range on a single charge and recharge from 10% to 80% in less than 9 minutes at 400kW charging stations.

Simultaneously, for municipal electrical grids, sodium-ion and iron-air flow batteries are emerging as the preferred long-duration storage medium, utilizing abundant, low-cost minerals free from cobalt supply chain bottlenecks.`
      },
      {
        pageNumber: 8,
        title: 'Edition 8: Central Bank Digital Currencies (CBDCs) and Real-Time Settlements',
        content: `SINGAPORE — The Monetary Authority of Singapore, alongside central banks in Europe and Japan, has completed cross-border wholesale settlement trials using interoperable Central Bank Digital Currencies (CBDCs). 

The trials demonstrated instant, 24/7 cross-border settlement for international trade invoices, eliminating traditional multi-day correspondent banking delays and slashing foreign exchange friction fees by 80%.

However, privacy advocates continue to scrutinize retail CBDC proposals. Civil liberties watchdogs argue that programmable government-issued digital currencies must incorporate zero-knowledge cryptographic safeguards to ensure everyday citizen financial privacy remains protected from surveillance.`
      },
      {
        pageNumber: 9,
        title: 'Edition 9: Biotechnology Leap: CRISPR 2.0 and AI-Driven Protein Folding',
        content: `CAMBRIDGE — The convergence of generative molecular modeling and precision base editing has inaugurated what oncologists are calling "personalized genetic therapeutics."

Rather than administering generic chemotherapy regimens, clinical teams now sequence a patient's tumor genome within 24 hours. AI models predict the precise tertiary structure of oncogenic proteins and design custom mRNA vaccines and modified T-cells tailored to target unique tumor neoantigens.

Phase III clinical trials for targeted sickle-cell disease therapies and inherited genetic blindness have demonstrated 90%+ cure rates, prompting the World Health Organization to call for international funding mechanisms to ensure developing countries gain equitable access.`
      },
      {
        pageNumber: 10,
        title: 'Edition 10: Algorithmic Governance and Global AI Safety Accords',
        content: `GENEVA — Delegates from eighty-two nations convened at the United Nations Palace of Nations to ratify the first legally binding treaty on Frontier Artificial Intelligence Safety and Verification.

The treaty establishes independent international evaluation centers equipped with compute monitoring capabilities. Frontier models exceeding specific training FLOPS thresholds must undergo mandatory red-teaming for autonomous cyberwarfare capabilities, biological pathogen synthesis, and systemic algorithmic bias before public deployment.

"Technology moves faster than legislation," the Secretary-General stated during the opening plenary. "Our shared responsibility is to build cooperative institutional guardrails that protect human flourishing while nurturing scientific exploration."`
      },
      {
        pageNumber: 11,
        title: 'Edition 11: Cloud Native Evolution: The Rise of WebAssembly and Edge Computing',
        content: `SEATTLE — WebAssembly (Wasm), originally conceived as a high-performance sandbox inside web browsers, has quietly transformed serverless cloud infrastructure.

By decoupling compilation from operating system kernels, WebAssembly modules instantiate in sub-millisecond cold start times and consume a fraction of the memory footprint of Linux containers. Major content delivery networks (CDNs) now execute complex user authentication, database query routing, and real-time streaming transformations directly on distributed edge nodes within 5ms of end users.

The architectural shift is dissolving the traditional boundary between frontend client logic and backend microservices.`
      },
      {
        pageNumber: 12,
        title: 'Edition 12: Autonomous Drone Corridors in Municipal Logistics',
        content: `DUBLIN — Urban freight logistics experienced a quiet revolution today as the city of Dublin launched Europe’s first fully certified autonomous commercial drone delivery corridor.

Electric multi-rotor drones equipped with computer vision and real-time acoustic obstacle avoidance deliver prescription medicines, laboratory blood samples, and urgent spare parts directly to rooftop drop stations across the metropolitan area in under eight minutes.

City planners report a measurable 15% reduction in downtown diesel courier van traffic, accompanied by significant decreases in urban congestion and particulate emissions.`
      },
      {
        pageNumber: 13,
        title: 'Edition 13: The Future of Freshwater: Graphene Desalination and Atmospheric Harvesting',
        content: `DUBAI — As climate shifts intensify droughts in arid agricultural regions, breakthrough nanofiltration facilities powered by nanoporous graphene membranes have begun commercial operation along the Arabian Gulf.

Traditional reverse-osmosis desalination requires immense hydraulic pressure, consuming substantial electrical power. Graphene membranes allow water molecules to pass through atom-thick pores with minimal friction, cutting the energy requirement of seawater desalination by nearly 50%.

In inland desert areas, solar-powered metal-organic framework (MOF) harvesters are extracting hundreds of liters of drinking water daily directly from desert air with relative humidity as low as 15%.`
      },
      {
        pageNumber: 14,
        title: 'Edition 14: Smart Cities, Digital Twins, and Sensor-Driven Urban Planning',
        content: `BARCELONA — Urban engineers in Barcelona have completed a comprehensive "Digital Twin" of the entire metropolitan infrastructure. Integrating millions of IoT sensors deployed across storm drains, electrical substations, traffic intersections, and public transit fleets, the virtual replica simulates municipal operations in real time.

When extreme weather events or structural failures threaten the city, artificial intelligence agents simulate emergency evacuation routes, redirect public bus fleets, and adjust stormwater retention gates seconds before floodwaters crest.

Citizen participatory portals allow residents to vote on proposed bicycle lane developments and park re-wilding initiatives while viewing accurate simulations of neighborhood noise, shade, and traffic impact.`
      },
      {
        pageNumber: 15,
        title: 'Edition 15: The Horizon: Technology Trends Shaping the Next Decade',
        content: `NEW YORK — As we look toward the decade ahead, the traditional divisions separating computational science, molecular biology, renewable energy, and human creativity are evaporating into a unified fabric of accelerated discovery.

The grand challenges of humanity—mitigating climate disruption, eradicating hereditary disease, expanding clean energy abundance, and fostering inclusive educational access—are increasingly tractable through human ingenuity paired with intelligent adaptive systems.

The fundamental imperative remains unchanged: technology is a mirror of human values. In building smarter, more adaptive tools, our ultimate quest is not merely to construct faster machines, but to empower every student, builder, and dreamer to understand their world and elevate our shared future.`
      },
      {
        pageNumber: 16,
        title: 'Edition 16: Next-Gen Geothermal: Drilling Superhot Rock for Base-Load Clean Energy',
        content: `REYKJAVIK — Deep drilling consortiums using millimeter-wave directed energy and thermal spallation drilling have reached depths of 10 kilometers beneath Iceland and Nevada, tapping into superhot supercritical rock exceeding 450 degrees Celsius.

Unlike solar and wind which are intermittent, superhot geothermal provides continuous, 24/7 baseload electricity with a carbon footprint near zero and a surface footprint smaller than a traditional natural gas turbine station.

A single superhot geothermal borehole generates up to 10 times the electrical output of a conventional hydrothermal well, unlocking vast terawatt-scale energy reserves worldwide.`
      },
      {
        pageNumber: 17,
        title: 'Edition 17: Solid-State Lithium-Sulfur Batteries Enter Pilot Automotive Production',
        content: `TOKYO & STUTTGART — Automotive engineering consortia have announced the initial commercial production line for solid-state lithium-sulfur traction battery packs.

Replacing flammable liquid organic electrolytes with ceramic garnet-type solid electrolytes eliminates thermal runaway risks entirely. With an energy density surpassing 500 Watt-hours per kilogram—nearly double current lithium-ion cells—electric passenger vehicles can achieve 1,000 kilometers of driving range on a single charge.

More crucially, the cells charge from 10% to 80% state-of-charge in under ten minutes without lithium dendrite formation.`
      },
      {
        pageNumber: 18,
        title: 'Edition 18: Global Open Source AI Ecosystem Surpasses Proprietary Cloud Benchmarks',
        content: `SAN FRANCISCO & BERLIN — In an extraordinary milestone for decentralized technology, open-weights foundation models released by open-source consortiums have matched and exceeded proprietary commercial cloud models across major coding, mathematical reasoning, and multimodal benchmarks.

Running locally on consumer workstations and decentralized peer-to-peer compute networks, these models empower startups, universities, and independent developers worldwide with state-of-the-art synthetic reasoning without cloud subscription tolls or proprietary data lock-in.

The democratization of frontier artificial intelligence marks the dawn of an unprecedented golden age of decentralized human creativity.`
      }
    ]
  }
];

// Helper to ensure every book has at least 50 comprehensive pages
const expandToFiftyPages = (book: LibraryBook): LibraryBook => {
  if (book.pages.length >= 50) {
    return {
      ...book,
      totalPages: book.pages.length,
      collegeMetadata: book.collegeMetadata || {
        courseCode: `CS-${book.category.toUpperCase()}-50`,
        level: 'Undergraduate & Professional',
        semester: 'Semester 5-8',
        units: [
          { unitNumber: 1, title: 'Foundational Principles & Core Concepts', startPage: 1, endPage: 10 },
          { unitNumber: 2, title: 'Architecture, Systems & Methodologies', startPage: 11, endPage: 20 },
          { unitNumber: 3, title: 'Production Implementation & Engineering', startPage: 21, endPage: 30 },
          { unitNumber: 4, title: 'Optimization, Security & High-Scale Resilience', startPage: 31, endPage: 40 },
          { unitNumber: 5, title: 'Case Studies, Viva Questions & Capstone Mastery', startPage: 41, endPage: 50 },
        ]
      }
    };
  }

  const existingPages = [...book.pages];
  const pagesToAddCount = 50 - existingPages.length;
  const startNum = existingPages.length + 1;

  const techTopics = [
    { title: 'Distributed Consensus: Raft Protocol, Leader Elections & Log Compaction', detail: 'Consensus protocols allow a cluster of distributed nodes to agree on state transitions despite arbitrary network partitions or node failures. Raft decomposes consensus into leader election, log replication, and safety guarantees.' },
    { title: 'eBPF-Powered Kernel Tracing, Observability & Low-Overhead Network Filtering', detail: 'Extended Berkeley Packet Filter (eBPF) allows running sandboxed user programs within the Linux kernel without changing kernel source code or loading kernel modules. This provides nanosecond-level packet tracing and DDoS mitigation.' },
    { title: 'Advanced Caching Strategies: Stampede Prevention, Invalidation & Two-Tier Caching', detail: 'High-throughput applications rely on multi-tier caching architectures combining in-process L1 cache (Caffeine/Go-cache) with distributed L2 cache (Redis Cluster). Mutual exclusion mutexes prevent cache stampedes.' },
    { title: 'Zero-Trust Service Mesh Architecture: Envoy Proxy, SPIFFE/SPIRE & mTLS', detail: 'Zero-trust networks discard perimeter-based security in favor of continuous cryptographic mutual TLS (mTLS) authentication across every microservice hop, driven by declarative service mesh control planes.' },
    { title: 'Asynchronous Event Streaming: Kafka Partition Balancing & Exactly-Once Semantics', detail: 'Message brokers like Apache Kafka decouple producers and consumers through immutable append-only commit logs. Partition reassignment and consumer group rebalances must be orchestrated to prevent head-of-line blocking.' },
    { title: 'Database Replication Lag, Change Data Capture (CDC) & The Transactional Outbox', detail: 'Dual-write bugs occur when updating a database and publishing an event simultaneously. The Transactional Outbox pattern records domain events inside the same ACID database transaction, read by Debezium CDC.' },
    { title: 'Distributed Tracing & Context Propagation via W3C Trace Context Standard', detail: 'In microservice topologies, a single user request can trigger dozens of inter-service calls. W3C Traceparent headers propagate trace IDs and span IDs through HTTP and gRPC headers to construct OpenTelemetry request trees.' },
    { title: 'High-Performance Asynchronous I/O: Epoll, Kqueue & Linux io_uring Architecture', detail: 'Traditional thread-per-connection architectures buckle under the C10K concurrency barrier. Non-blocking event loops multiplex thousands of sockets across a single thread using epoll (Linux) and modern io_uring ring buffers.' },
    { title: 'Chaos Engineering & Blast Radius Control: Automated Fault Injection in Production', detail: 'Pioneered by Netflix Chaos Monkey, chaos engineering deliberately injects node terminations, synthetic network latency, and clock skews to prove that fallback breakers and circuit breakers prevent catastrophic failures.' },
    { title: 'Memory Profiling, Allocation Overhead & Valgrind Heap Leak Diagnostics', detail: 'Identifying latency spikes requires inspecting memory allocators (tcmalloc, jemalloc), cache thrashing, and pointer chasing. Heap profilers visualize flame graphs to highlight uncollected cyclical references.' },
    { title: 'Site Reliability Engineering: Error Budgets, SLIs, SLOs & MTTR Optimization', detail: 'SRE balances feature velocity with system reliability. Service Level Indicators (SLIs) measure observed availability, and Service Level Objectives (SLOs) establish strict thresholds to halt non-critical releases.' },
    { title: 'Production Infrastructure as Code: Immutability, Terraform States & GitOps Workflows', detail: 'Managing cloud infrastructure imperatively leads to configuration drift. GitOps engines (ArgoCD, Flux) continuously reconcile desired Kubernetes state declared in Git repositories with live cluster state.' },
    { title: 'Security Threat Modeling: STRIDE Matrix, Defense in Depth & Supply Chain Hardening', detail: 'Securing production applications requires threat modeling against Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, and Elevation of Privilege, paired with cryptographic SBOM signing.' },
    { title: 'Active-Active Multi-Region Replication: CRDTs & Conflict Resolution Strategies', detail: 'Global resilience demands multi-region active-active deployments. Conflict-Free Replicated Data Types (CRDTs) mathematically guarantee eventual consistency without requiring cross-continent consensus latency.' },
    { title: 'High-Yield System Viva Questions: Architecture Trade-Offs & Scalability Defense', detail: 'Mastery review for academic and industry interviews: defend the trade-offs between B+ Trees and Log-Structured Merge (LSM) Trees, CP vs AP in Brewer CAP theorem, and synchronous RPC vs asynchronous streaming.' },
    { title: 'Capstone Architecture Case Study: Building a High-Throughput Notification Dispatcher', detail: 'End-to-end architectural blueprint: designing a fault-tolerant notification engine handling 50,000 notifications per second across WebPush, SMS, and Email with strict rate-limiting, deduplication, and dead-letter queues.' }
  ];

  const newPages = [...existingPages];

  for (let i = 0; i < pagesToAddCount; i++) {
    const pageNum = startNum + i;
    const topicIdx = i % techTopics.length;
    const topic = techTopics[topicIdx];
    const unitNumber = Math.min(5, Math.floor((pageNum - 1) / 10) + 1);

    newPages.push({
      pageNumber: pageNum,
      title: `Page ${pageNum}: Unit ${unitNumber} — ${topic.title}`,
      content: `### ${book.title} (Volume Comprehensive Edition)
**Unit ${unitNumber} • Advanced Curriculum & Engineering Blueprints • Page ${pageNum} of 50**

${topic.detail}

#### Theoretical Foundations & Architectural Invariants
In modern computational systems, software cannot be treated in isolation from underlying physical constraints. As throughput and data volumes grow, developers must account for latency hierarchies, cache-line alignment, and CPU pipelining.

\`\`\`typescript
// Production Architecture Blueprint: High-Resilience Handler
export interface ComponentSpec {
  id: string;
  throughputQps: number;
  maxLatencyP99Ms: number;
  circuitBreakerThreshold: number;
}

export async function executeResilientOperation<T>(
  operation: () => Promise<T>,
  fallback: () => T,
  retries: number = 3
): Promise<T> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      if (attempt === retries) return fallback();
      await new Promise(r => setTimeout(r, Math.pow(2, attempt) * 50));
    }
  }
  return fallback();
}
\`\`\`

#### Production Engineering Realities & Trade-off Analysis
1. **Latency vs Cost**: In-memory caching minimizes read latency to under 1ms, but increases hardware costs and operational complexity when managing distributed cache coherence across multiple availability zones.
2. **Consistency vs Availability**: Under network partitions, systems must choose between rejecting requests to ensure absolute data consistency or serving stale data to remain highly available.
3. **Observability Overhead**: High-frequency telemetry logging and tracing can consume up to 15% of total CPU cycles if sampling rates and log levels are not carefully configured for production traffic.

#### Key Takeaways for Academic & Professional Mastery:
- Always design systems with clear fault isolation boundaries (bulkheads).
- Ensure every database write has an unambiguous idempotency key to prevent duplicate processing.
- Maintain rigorous automated integration test suites validating corner-case recovery scenarios under heavy synthetic loads.`
    });
  }

  return {
    ...book,
    totalPages: 50,
    pages: newPages,
    collegeMetadata: book.collegeMetadata || {
      courseCode: `CS-${book.category.toUpperCase()}-50`,
      level: 'Undergraduate & Professional',
      semester: 'Semester 5-8',
      units: [
        { unitNumber: 1, title: 'Foundational Principles & Core Concepts', startPage: 1, endPage: 10 },
        { unitNumber: 2, title: 'Architecture, Systems & Methodologies', startPage: 11, endPage: 20 },
        { unitNumber: 3, title: 'Production Implementation & Engineering', startPage: 21, endPage: 30 },
        { unitNumber: 4, title: 'Optimization, Security & High-Scale Resilience', startPage: 31, endPage: 40 },
        { unitNumber: 5, title: 'Case Studies, Viva Questions & Capstone Mastery', startPage: 41, endPage: 50 },
      ]
    }
  };
};

export const LIBRARY_BOOKS: LibraryBook[] = [
  ...BASE_LIBRARY_BOOKS,
  ...PROGRAMMING_BOOKS,
  ...SYSTEMS_AND_CLOUD_BOOKS,
  ...AI_AND_ALGORITHMS_BOOKS,
  ...ENTERPRISE_AND_NEW_BOOKS,
  ...COLLEGE_50_PAGE_BOOKS,
  ...COLLEGE_PROJECT_BOOKS
].map(expandToFiftyPages);


