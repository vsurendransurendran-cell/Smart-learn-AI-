import { Webinar } from '../types';
import { TAMIL_WEBINARS } from './tamilWebinars';

const CORE_WEBINARS: Webinar[] = [
  {
    id: 'webinar-gemini-agents-google',
    title: 'Building Production-Ready Multimodal AI Agents with Gemini 2.5 Flash & LangGraph',
    hostName: 'Logan Kilpatrick & Paige Bailey',
    hostRole: 'Lead Product Manager & Principal AI Advocate',
    hostCompany: 'Google AI Studio & DeepMind',
    hostAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    platform: 'YouTube Live',
    category: 'AI & LLMs',
    language: 'English',
    scheduledDate: '2026-09-22',
    scheduledTime: '6:30 PM IST (9:00 AM EST)',
    durationMinutes: 75,
    description: 'Deep-dive into architecting autonomous multimodal agent workflows. Learn how to combine Gemini 2.5 Flash with LangGraph state machines, real-time tool use, streaming audio, and Google Search grounding to build enterprise-grade reasoning engines.',
    agendaPoints: [
      'Architecting resilient state graphs with LangGraph & Gemini API',
      'Function calling, JSON schema enforcement, and tool execution error handling',
      'Implementing live voice & multimodal image reasoning with low-latency streaming',
      'Production benchmarking: Latency, token economics, and eval harnesses'
    ],
    prerequisites: 'Basic Python or TypeScript knowledge and fundamental familiarity with LLM prompts.',
    registrationUrl: 'https://youtube.com/live/googledevs',
    liveStreamUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    isFree: true,
    certificateOffered: true,
    registeredCount: 3840,
    featured: true,
    sourceSocialLink: 'https://twitter.com/GoogleAI/status/183500129847192',
    speakers: [
      {
        name: 'Logan Kilpatrick',
        role: 'AI Product Lead',
        company: 'Google AI Studio',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
        twitter: 'https://twitter.com/OfficialLoganK'
      },
      {
        name: 'Paige Bailey',
        role: 'Principal Engineer & AI Advocate',
        company: 'Google DeepMind',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
        linkedin: 'https://linkedin.com/in/paigebailey'
      }
    ]
  },
  {
    id: 'webinar-system-design-gergely',
    title: 'Cracking System Design & Tech Lead Interviews: From High-Growth Startups to FAANG',
    hostName: 'Gergely Orosz',
    hostRole: 'Author of The Pragmatic Engineer (ex-Uber Eng Lead)',
    hostCompany: 'The Pragmatic Engineer & Tech Lead Academy',
    hostAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    platform: 'LinkedIn Live',
    category: 'Career & Interviews',
    language: 'English',
    scheduledDate: '2026-09-24',
    scheduledTime: '7:00 PM IST (1:30 PM GMT)',
    durationMinutes: 90,
    description: 'Practical, unvarnished insider advice on how tech hiring panels evaluate SDE-1, SDE-2, and Tech Lead candidates in 2026. Includes live mock architecture breakdown of scaling a distributed real-time messaging pipeline.',
    agendaPoints: [
      'The 2026 Tech Job Market reality: Where startups and Big Tech are actively hiring',
      'The 4-stage System Design rubric: Requirements, High-level, Deep-dive, Bottlenecks',
      'Common pitfalls: Premature caching, neglecting network partitions, and vague estimations',
      'Live Q&A: Negotiating offers, equity vs. base pay, and standout portfolio artifacts'
    ],
    prerequisites: 'Foundational understanding of databases (SQL/NoSQL) and client-server HTTP architectures.',
    registrationUrl: 'https://linkedin.com/events/systemdesign2026live',
    liveStreamUrl: 'https://linkedin.com/video/live/event-gergely-eng',
    isFree: true,
    certificateOffered: false,
    registeredCount: 5210,
    featured: true,
    sourceSocialLink: 'https://www.linkedin.com/pulse/tech-hiring-trends-2026-gergely-orosz/',
    speakers: [
      {
        name: 'Gergely Orosz',
        role: 'Ex-Engineering Manager',
        company: 'Uber / The Pragmatic Engineer',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
        linkedin: 'https://linkedin.com/in/gergelyorosz',
        twitter: 'https://twitter.com/GergelyOrosz'
      }
    ]
  },
  {
    id: 'webinar-ebpf-kubernetes-kelsey',
    title: 'Modern Cloud Native 2026: eBPF, Cilium, and Platform Engineering Demystified',
    hostName: 'Kelsey Hightower & Liz Rice',
    hostRole: 'Cloud Native Luminary & Chief Open Source Officer',
    hostCompany: 'CNCF & Isovalent / Cisco',
    hostAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    platform: 'Twitch Tech',
    category: 'DevOps & Kubernetes',
    language: 'English',
    scheduledDate: '2026-09-26',
    scheduledTime: '8:30 PM IST (11:00 AM EST)',
    durationMinutes: 80,
    description: 'Join cloud infrastructure legends Kelsey Hightower and Liz Rice for a hands-on live terminal session. Watch live packet tracing with Linux kernel eBPF, Cilium service mesh without sidecars, and automated canary rollouts.',
    agendaPoints: [
      'Why eBPF is replacing iptables and traditional Linux kernel networking',
      'Configuring Cilium Service Mesh: Mutual TLS, L7 observability, and zero sidecar overhead',
      'Platform Engineering in practice: Internal Developer Platforms (IDPs) that developers actually enjoy',
      'Interactive Terminal Demos: Debugging network drops in real-time with Hubble CLI'
    ],
    prerequisites: 'Basic familiarity with Docker, Linux shell commands, and Kubernetes pods.',
    registrationUrl: 'https://twitch.tv/cloudnativecomputing',
    liveStreamUrl: 'https://twitch.tv/cloudnativecomputing',
    isFree: true,
    certificateOffered: true,
    registeredCount: 2940,
    featured: true,
    sourceSocialLink: 'https://twitter.com/kelseyhightower/status/1832941098231',
    speakers: [
      {
        name: 'Kelsey Hightower',
        role: 'Open Source Advocate & Author',
        company: 'Cloud Native Computing Foundation',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80',
        twitter: 'https://twitter.com/kelseyhightower'
      },
      {
        name: 'Liz Rice',
        role: 'Chief Open Source Officer',
        company: 'Isovalent / Cisco',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80',
        linkedin: 'https://linkedin.com/in/lizrice'
      }
    ]
  },
  {
    id: 'webinar-unsloth-finetuning-huggingface',
    title: 'Fine-Tuning Llama 3.3 & DeepSeek with Unsloth: 2x Faster, 70% Less VRAM on Free Colab',
    hostName: 'Daniel & Michael Han (Unsloth AI) with Philipp Schmid',
    hostRole: 'Founders & Technical Lead',
    hostCompany: 'Unsloth AI & Hugging Face',
    hostAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    platform: 'Luma',
    category: 'AI & LLMs',
    language: 'English',
    scheduledDate: '2026-09-28',
    scheduledTime: '6:00 PM IST (8:30 AM EST)',
    durationMinutes: 90,
    description: 'A revolutionary practical workshop demonstrating how to fine-tune 8B and 70B open weights models on standard developer hardware. Learn LoRA/QLoRA math, custom dataset curation, and exporting GGUF models for local Ollama inference.',
    agendaPoints: [
      'Understanding flash-attention optimizations and Triton kernel overrides in Unsloth',
      'Dataset formatting for Alpaca vs ShareGPT conversational schemas',
      'Training a specialized code generation model live in a Google Colab T4 instance',
      'Quantization benchmarks: 4-bit, 8-bit, and 16-bit evaluation metrics'
    ],
    prerequisites: 'Familiarity with PyTorch or basic Hugging Face Transformers syntax.',
    registrationUrl: 'https://lu.ma/unsloth-huggingface-workshop-2026',
    liveStreamUrl: 'https://youtube.com/live/huggingface_community',
    isFree: true,
    certificateOffered: true,
    registeredCount: 4720,
    featured: false,
    sourceSocialLink: 'https://twitter.com/UnslothAI/status/183491029482',
    speakers: [
      {
        name: 'Daniel Han',
        role: 'Co-founder',
        company: 'Unsloth AI',
        avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&auto=format&fit=crop&q=80',
        twitter: 'https://twitter.com/danielhanchen'
      },
      {
        name: 'Philipp Schmid',
        role: 'Technical Lead & AI Researcher',
        company: 'Hugging Face',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80',
        twitter: 'https://twitter.com/_philschmid'
      }
    ]
  },
  {
    id: 'webinar-react19-theo-fullstack',
    title: 'React 19, Server Actions & Modern Full-Stack Web Development Architecture',
    hostName: 'Theo Browne (t3.gg) & Tanner Linsley',
    hostRole: 'Creator of Create-T3-App & Creator of TanStack',
    hostCompany: 'Ping Labs & TanStack',
    hostAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    platform: 'YouTube Live',
    category: 'Frontend & Mobile',
    language: 'English',
    scheduledDate: '2026-09-30',
    scheduledTime: '9:00 PM IST (11:30 AM EST)',
    durationMinutes: 75,
    description: 'Cutting through the framework marketing hype: an honest engineering breakdown of React 19 compiler optimizations, useActionState, TanStack Start vs Next.js, and how to structure production web applications without bloated dependencies.',
    agendaPoints: [
      'How the React 19 Compiler removes useMemo and useCallback boilerplate forever',
      'Form mutations with useActionState, useOptimistic, and Server Actions',
      'TanStack Router vs File-System Routing: Type-safe URL search parameters',
      'Database integration best practices with Drizzle ORM and serverless PostgreSQL'
    ],
    prerequisites: 'Experience with React, TypeScript, and modern JavaScript syntax.',
    registrationUrl: 'https://youtube.com/live/theobrowne-ping',
    liveStreamUrl: 'https://www.youtube.com/@t3dotgg/live',
    isFree: true,
    certificateOffered: false,
    registeredCount: 3380,
    featured: false,
    sourceSocialLink: 'https://twitter.com/theo/status/1831902837482',
    speakers: [
      {
        name: 'Theo Browne',
        role: 'CEO & Tech Creator',
        company: 'Ping Labs (ex-Twitch SWE)',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
        twitter: 'https://twitter.com/theo'
      },
      {
        name: 'Tanner Linsley',
        role: 'Creator of TanStack Query/Router',
        company: 'TanStack / Nozzle',
        avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&auto=format&fit=crop&q=80',
        twitter: 'https://twitter.com/tannerlinsley'
      }
    ]
  },
  {
    id: 'webinar-aws-serverless-eventbridge',
    title: 'Mastering Event-Driven Architecture with AWS EventBridge, SQS & Lambda Powertools',
    hostName: 'Julian Wood & Eric Johnson',
    hostRole: 'Principal Developer Advocates for Serverless',
    hostCompany: 'Amazon Web Services (AWS)',
    hostAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
    platform: 'Twitch Tech',
    category: 'Cloud & Systems',
    language: 'English',
    scheduledDate: '2026-10-03',
    scheduledTime: '7:30 PM IST (10:00 AM EST)',
    durationMinutes: 90,
    description: 'Learn how tier-1 software architectures decompose monoliths into asynchronous, failure-isolated distributed systems using AWS EventBridge Schema Registry, dead-letter queues (DLQ), and idempotent event consumers.',
    agendaPoints: [
      'Event-Driven Design patterns: Choreography vs. Orchestration with AWS Step Functions',
      'Eliminating message loss with dead-letter queue retries and circuit breakers',
      'Implementing structured logging, metrics, and distributed tracing with AWS Lambda Powertools for TypeScript/Python',
      'Cost optimization: How to process 50 million events/month under $50'
    ],
    prerequisites: 'Basic knowledge of cloud computing, REST APIs, and serverless concepts.',
    registrationUrl: 'https://twitch.tv/aws',
    liveStreamUrl: 'https://twitch.tv/aws',
    isFree: true,
    certificateOffered: true,
    registeredCount: 2650,
    featured: false,
    sourceSocialLink: 'https://aws.amazon.com/developer/community/events/',
    speakers: [
      {
        name: 'Julian Wood',
        role: 'Principal Serverless Advocate',
        company: 'AWS',
        avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=120&auto=format&fit=crop&q=80',
        twitter: 'https://twitter.com/julian_wood'
      }
    ]
  },
  {
    id: 'webinar-chai-code-hitesh-sde',
    title: 'How to Build & Ship Full-Stack AI SaaS: Docker, Next.js 15 & Stripe Live Masterclass',
    hostName: 'Hitesh Choudhary & Piyush Garg',
    hostRole: 'Founders & Senior Engineering Mentors',
    hostCompany: 'Chai aur Code & Tech Educator',
    hostAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    platform: 'YouTube Live',
    category: 'Frontend & Mobile',
    language: 'Hindi',
    scheduledDate: '2026-10-06',
    scheduledTime: '8:00 PM IST (English / Hinglish)',
    durationMinutes: 120,
    description: 'A 2-hour live coding marathon! Building an end-to-end AI document query SaaS from scratch: authentication, rate limiting with Redis Upstash, vector database indexing with Pinecone, Docker multi-stage builds, and deployment on DigitalOcean & Cloudflare.',
    agendaPoints: [
      'Setting up Next.js 15 App Router with Tailwind CSS and Shadcn UI',
      'Document chunking, text embeddings generation, and vector similarity search',
      'Implementing Redis sliding-window rate limiting to prevent API bill shock',
      'Live deployment with GitHub Actions CI/CD to VPS with custom domain & SSL'
    ],
    prerequisites: 'Basic knowledge of JavaScript, React, and simple backend endpoints.',
    registrationUrl: 'https://youtube.com/live/chaiaurcode',
    liveStreamUrl: 'https://www.youtube.com/@HiteshChoudharydotcom/live',
    isFree: true,
    certificateOffered: true,
    registeredCount: 7890,
    featured: true,
    sourceSocialLink: 'https://twitter.com/Hiteshdotcom/status/1834190827361',
    speakers: [
      {
        name: 'Hitesh Choudhary',
        role: 'Founder & Senior Architect',
        company: 'Chai aur Code (ex-LCO / iNeuron)',
        avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&auto=format&fit=crop&q=80',
        linkedin: 'https://linkedin.com/in/hiteshchoudhary',
        twitter: 'https://twitter.com/Hiteshdotcom'
      },
      {
        name: 'Piyush Garg',
        role: 'Tech Lead & Educator',
        company: 'Dev Community',
        avatar: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=120&auto=format&fit=crop&q=80',
        twitter: 'https://twitter.com/piyushgarg_dev'
      }
    ]
  },
  {
    id: 'webinar-redis-websockets-system-design',
    title: 'System Design Deep Dive: Scaling Real-Time WebSockets to 10 Million Concurrent Users',
    hostName: 'Arpit Bhayani',
    hostRole: 'Senior Staff Engineer (ex-Unacademy, Google, Amazon)',
    hostCompany: 'Asli Engineering & System Design Fellowship',
    hostAvatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80',
    platform: 'Zoom',
    category: 'System Design',
    language: 'English',
    scheduledDate: '2026-10-09',
    scheduledTime: '6:30 PM IST',
    durationMinutes: 90,
    description: 'Demystifying real-time architecture: how Discord, WhatsApp, and live trading terminals maintain persistent socket connections across distributed clusters with Redis Pub/Sub, HAProxy, and Linux kernel epoll tuning.',
    agendaPoints: [
      'The anatomy of a WebSocket connection: HTTP 101 Upgrade, framing, and TCP keepalives',
      'Solving the C10M problem: Linux kernel sysctl limits, file descriptors, and memory per socket',
      'Distributed Pub/Sub message broadcast: Redis Streams vs. Kafka vs. NATS JetStream',
      'Handling sudden disconnections, reconnect thundering herds, and exponential backoff jitter'
    ],
    prerequisites: 'Core understanding of networking, TCP/IP, and basic concurrency.',
    registrationUrl: 'https://zoom.us/webinar/register/WN_arpit_sysdesign_2026',
    liveStreamUrl: 'https://zoom.us/j/94827103982',
    isFree: true,
    certificateOffered: true,
    registeredCount: 4190,
    featured: false,
    sourceSocialLink: 'https://twitter.com/arpit_bhayani/status/1832091827361',
    speakers: [
      {
        name: 'Arpit Bhayani',
        role: 'Staff Engineer & Educator',
        company: 'Asli Engineering',
        avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=120&auto=format&fit=crop&q=80',
        twitter: 'https://twitter.com/arpit_bhayani',
        linkedin: 'https://linkedin.com/in/arpitbhayani'
      }
    ]
  }
];

export const REALTIME_WEBINARS: Webinar[] = [
  ...TAMIL_WEBINARS,
  ...CORE_WEBINARS
];

export const WEBINAR_LANGUAGES = [
  'All Languages',
  'Tamil (தமிழ்)',
  'English',
  'Hindi'
];

export const WEBINAR_SORT_OPTIONS = [
  { id: 'date-asc', label: 'Upcoming Date (Soonest)' },
  { id: 'popular', label: 'Most Popular (Registered)' },
  { id: 'tamil-first', label: 'Language: Tamil First (தமிழ்)' },
  { id: 'language-az', label: 'Language (A to Z)' },
  { id: 'duration-asc', label: 'Duration (Short to Long)' }
];

export const WEBINAR_CATEGORIES = [
  'All',
  'AI & LLMs',
  'Cloud & Systems',
  'Career & Interviews',
  'System Design',
  'Frontend & Mobile',
  'DevOps & Kubernetes'
];

export const WEBINAR_PLATFORMS = [
  'All',
  'YouTube Live',
  'LinkedIn Live',
  'Luma',
  'Zoom',
  'Twitch Tech',
  'X Spaces'
];
