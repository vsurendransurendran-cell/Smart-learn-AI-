import { Internship } from '../types';
import { TAMIL_NADU_INTERNSHIPS } from './tamilNaduInternships';

export const REALTIME_INTERNSHIPS: Internship[] = [
  // --- Tamil Nadu Hub (34+ Verified Programs across Chennai, Coimbatore, Madurai, Trichy, Tenkasi) ---
  ...TAMIL_NADU_INTERNSHIPS,

  // --- Small Companies & Startups ---
  {
    id: 'intern-sarvam-ai-research-small',
    title: 'Generative AI & Indic LLM Intern',
    company: 'Sarvam AI',
    companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=128&auto=format&fit=crop&q=80',
    platform: 'Wellfound',
    location: 'Bangalore, Karnataka / Remote',
    country: 'India',
    state: 'Karnataka',
    city: 'Bangalore',
    companyType: 'Startup',
    companySize: '11-50 employees',
    workMode: 'Hybrid',
    stipend: '₹55,000 / month',
    stipendNumericMonthly: 55000,
    currency: 'INR',
    duration: '3 - 6 Months',
    postedAt: '15 minutes ago',
    postedMinutesAgo: 15,
    appliedCount: 42,
    urgencyStatus: 'Actively Hiring',
    domain: 'AI & Machine Learning',
    eligibleBatches: ['2025 Batch', '2026 Batch', '2027 Batch'],
    ppoOffered: true,
    requiredSkills: ['PyTorch', 'Transformers', 'Hugging Face', 'Multilingual Tokenization', 'Python'],
    description: 'Sarvam AI is a high-conviction AI research startup building foundational AI models tailored for India\'s languages. Work directly with top researchers and founders on tokenizer efficiency, speech synthesis (TTS), and small language models (SLMs).',
    responsibilities: [
      'Experiment with low-resource Indic language training datasets and phonetic tokenizers.',
      'Fine-tune speech-to-text models using Whisper and custom CTC loss functions.',
      'Deploy low-latency model inference pipelines with vLLM on H100 GPU clusters.',
      'Attend weekly paper reading seminars with senior founding researchers.'
    ],
    qualifications: [
      'Strong grasp of deep learning, attention mechanisms, and PyTorch tensors.',
      'Demonstrated interest in NLP or speech synthesis.',
      'Ability to move fast in an agile 25-person startup environment.'
    ],
    perks: [
      'Direct mentorship from founding research scientists',
      'Early employee equity grants / fast PPO track (₹20-30 LPA CTC)',
      'Subsidized GPU cluster access for independent experiments',
      'Flexible remote/hybrid work and healthy catering in Koramangala'
    ],
    applyUrl: 'https://wellfound.com/company/sarvam-ai',
    companyWebsite: 'https://sarvam.ai',
    verifiedListing: true,
    matchScore: 97
  },
  {
    id: 'intern-agilepulse-chennai-small',
    title: 'Full Stack React & Node.js Developer Intern',
    company: 'AgilePulse Software Solutions',
    companyLogo: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=128&auto=format&fit=crop&q=80',
    platform: 'Internshala',
    location: 'Chennai (OMR / Guindy), Tamil Nadu',
    country: 'India',
    state: 'Tamil Nadu',
    city: 'Chennai',
    companyType: 'Small Boutique',
    companySize: '11-50 employees',
    workMode: 'Hybrid',
    stipend: '₹22,000 / month',
    stipendNumericMonthly: 22000,
    currency: 'INR',
    duration: '6 Months',
    postedAt: '40 minutes ago',
    postedMinutesAgo: 40,
    appliedCount: 28,
    urgencyStatus: 'Immediate Joining',
    domain: 'Full Stack',
    eligibleBatches: ['2025 Batch', '2026 Batch'],
    ppoOffered: true,
    requiredSkills: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Tailwind CSS'],
    description: 'AgilePulse is a boutique software development studio in Chennai delivering high-performance SaaS applications for healthcare and logistics clients. You will work in a tight-knit 20-developer squad with 1-on-1 mentorship from the technical lead.',
    responsibilities: [
      'Build client-facing dashboards using React 18, Tailwind CSS, and TanStack Table.',
      'Design RESTful APIs and write PostgreSQL database migrations.',
      'Integrate third-party SMS, WhatsApp notifications, and payment webhooks.',
      'Write end-to-end tests using Playwright.'
    ],
    qualifications: [
      'Comfortable writing modern ES6+ JavaScript/TypeScript.',
      'Understanding of component state, props, and REST API consumption.',
      'Located in or willing to commute to Chennai office 3 days a week.'
    ],
    perks: [
      'Direct mentorship from the CTO with weekly code review sessions',
      'Guaranteed PPO conversion for sincere performers (₹6 - ₹9 LPA full-time)',
      'Free snacks, high-speed fiber internet, and dual-monitor desk setup',
      'Certificate of internship and glowing letter of recommendation'
    ],
    applyUrl: 'https://internshala.com/internship/detail/full-stack-agilepulse-chennai',
    companyWebsite: 'https://agilepulse.dev',
    verifiedListing: true,
    matchScore: 91
  },
  {
    id: 'intern-codecrafters-hyderabad-small',
    title: 'Systems & Compilers Engineering Intern',
    company: 'CodeCrafters Labs',
    companyLogo: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=128&auto=format&fit=crop&q=80',
    platform: 'Wellfound',
    location: 'Hyderabad (Hitec City), Telangana / Remote',
    country: 'India',
    state: 'Telangana',
    city: 'Hyderabad',
    companyType: 'Startup',
    companySize: '1-10 employees',
    workMode: 'Remote',
    stipend: '₹35,000 / month',
    stipendNumericMonthly: 35000,
    currency: 'INR',
    duration: '4 - 6 Months',
    postedAt: '1 hour ago',
    postedMinutesAgo: 60,
    appliedCount: 35,
    urgencyStatus: 'Early Applicant',
    domain: 'Software Engineering',
    eligibleBatches: ['2025 Batch', '2026 Batch', '2027 Batch'],
    ppoOffered: true,
    requiredSkills: ['Rust', 'Go', 'Linux Systems', 'Operating Systems', 'Git Internals'],
    description: 'CodeCrafters is an indie developer tools company where developers recreate Git, Redis, Docker, and SQLite from scratch. Join our 8-person engineering team to design interactive test runners, build virtualized sandbox containers, and write low-level systems code.',
    responsibilities: [
      'Author automated test suites that evaluate user implementations of Redis/Git in 10+ languages.',
      'Implement micro-VM isolation using Linux cgroups and Firecracker.',
      'Optimize CLI response times and binary distribution sizes in Rust.',
      'Contribute to open-source developer educational challenges.'
    ],
    qualifications: [
      'Solid command of low-level systems programming in Rust, Go, or C++.',
      'Understanding of TCP/IP sockets, Unix domain sockets, and file descriptors.',
      'Passion for developer tools and self-directed open-source work.'
    ],
    perks: [
      '100% remote work with flexible asynchronous hours',
      'Home office equipment grant (₹40,000)',
      'Free lifetime access to CodeCrafters Pro catalog',
      'Competitive PPO with early startup profit-sharing bonuses'
    ],
    applyUrl: 'https://wellfound.com/company/codecrafters-labs',
    companyWebsite: 'https://codecrafters.io',
    verifiedListing: true,
    matchScore: 94
  },
  {
    id: 'intern-vyapar-pune-small',
    title: 'Mobile App Developer Intern (Flutter / React Native)',
    company: 'Vyapar Tech Studio',
    companyLogo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=128&auto=format&fit=crop&q=80',
    platform: 'Naukri',
    location: 'Pune (Baner / Hinjewadi), Maharashtra',
    country: 'India',
    state: 'Maharashtra',
    city: 'Pune',
    companyType: 'Small Boutique',
    companySize: '11-50 employees',
    workMode: 'Hybrid',
    stipend: '₹25,000 / month',
    stipendNumericMonthly: 25000,
    currency: 'INR',
    duration: '6 Months',
    postedAt: '2 hours ago',
    postedMinutesAgo: 120,
    appliedCount: 51,
    urgencyStatus: 'Actively Hiring',
    domain: 'Frontend',
    eligibleBatches: ['2025 Batch', '2026 Batch'],
    ppoOffered: true,
    requiredSkills: ['Flutter / Dart', 'React Native', 'SQLite / Hive', 'REST APIs', 'Offline-First Sync'],
    description: 'Vyapar Tech Studio crafts offline-first billing, inventory, and GST compliance mobile tools for 50,000+ small businesses across Maharashtra and Western India. Help build instant thermal printer Bluetooth pairing and lightweight mobile UI.',
    responsibilities: [
      'Develop clean Flutter widgets and responsive screens adhering to Material 3.',
      'Implement local SQLite database caching with conflict-free sync algorithms.',
      'Integrate Bluetooth thermal POS receipt printing libraries.',
      'Profile memory and FPS performance on budget Android devices.'
    ],
    qualifications: [
      'Experience developing at least one functional mobile app in Flutter or React Native.',
      'Understanding of state management (Bloc, Provider, or Riverpod).',
      'Based in Pune or able to relocate to Baner office.'
    ],
    perks: [
      'PPO opportunity with competitive Pune tech compensation (₹7 - ₹10 LPA)',
      'Free breakfast and team gaming lounge in Pune office',
      'Testing devices (Android & iOS) provided during internship',
      'Collaborative culture without corporate red-tape'
    ],
    applyUrl: 'https://www.naukri.com/job-listings-flutter-intern-vyapar-pune',
    companyWebsite: 'https://vyapar.tech',
    verifiedListing: true,
    matchScore: 88
  },
  {
    id: 'intern-vectorscale-gurgaon-small',
    title: 'AI Agents & Vector Database Intern',
    company: 'VectorScale AI',
    companyLogo: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=128&auto=format&fit=crop&q=80',
    platform: 'LinkedIn',
    location: 'Gurgaon (Cyber City), Haryana / Delhi NCR',
    country: 'India',
    state: 'Haryana',
    city: 'Gurgaon',
    companyType: 'Startup',
    companySize: '1-10 employees',
    workMode: 'Hybrid',
    stipend: '₹32,000 / month',
    stipendNumericMonthly: 32000,
    currency: 'INR',
    duration: '3 - 6 Months',
    postedAt: '50 minutes ago',
    postedMinutesAgo: 50,
    appliedCount: 38,
    urgencyStatus: 'Early Applicant',
    domain: 'AI & Machine Learning',
    eligibleBatches: ['2025 Batch', '2026 Batch', '2027 Batch'],
    ppoOffered: true,
    requiredSkills: ['Python', 'LangChain / LlamaIndex', 'Qdrant / Milvus', 'FastAPI', 'Docker'],
    description: 'VectorScale is a YC-backed seed-stage AI startup headquartered in Cyber City Gurgaon. We build autonomous procurement agents for enterprise supply chains using hybrid vector search and structured function execution.',
    responsibilities: [
      'Build retrieval-augmented generation (RAG) pipelines with hybrid keyword-dense vector search.',
      'Implement multi-agent supervisor loops with LangGraph and OpenAI/Gemini models.',
      'Optimize embedding batching and quantization for sub-50ms query latencies.',
      'Write production FastAPI endpoints with Pydantic type validation.'
    ],
    qualifications: [
      'Strong hands-on Python experience and familiarity with vector stores (Qdrant, Chroma, Pinecone).',
      'Knowledge of prompt engineering, function calling schemas, and evaluation metrics (RAGAS).',
      'Enthusiasm for shipping working code daily.'
    ],
    perks: [
      'Fast-track PPO offer with early founding team equity (0.25% - 0.75%)',
      'Office right next to Rapid Metro in Gurgaon with subsidized lunch',
      'Access to state-of-the-art API credits (Anthropic, Gemini, OpenAI)',
      'Direct mentorship from ex-Google / IIT Delhi founders'
    ],
    applyUrl: 'https://linkedin.com/jobs/view/vectorscale-ai-intern-gurgaon',
    companyWebsite: 'https://vectorscale.ai',
    verifiedListing: true,
    matchScore: 95
  },
  {
    id: 'intern-cloudops-noida-small',
    title: 'Junior DevOps & Kubernetes Cloud Intern',
    company: 'Noida CloudOps Solutions',
    companyLogo: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=128&auto=format&fit=crop&q=80',
    platform: 'Naukri',
    location: 'Noida (Sector 62), Uttar Pradesh / Delhi NCR',
    country: 'India',
    state: 'Uttar Pradesh',
    city: 'Noida',
    companyType: 'Small Boutique',
    companySize: '11-50 employees',
    workMode: 'Hybrid',
    stipend: '₹26,000 / month',
    stipendNumericMonthly: 26000,
    currency: 'INR',
    duration: '6 Months',
    postedAt: '1 hour ago',
    postedMinutesAgo: 70,
    appliedCount: 45,
    urgencyStatus: 'Actively Hiring',
    domain: 'Cloud & DevOps',
    eligibleBatches: ['2025 Batch', '2026 Batch'],
    ppoOffered: true,
    requiredSkills: ['Linux CLI', 'Docker', 'Kubernetes', 'Bash Scripting', 'GitHub Actions', 'AWS basics'],
    description: 'Noida CloudOps is a specialized cloud engineering consultancy in Sector 62 Noida. We manage high-availability infrastructure for 40+ European startups. Learn real-world production incident response and automated Terraform pipelines.',
    responsibilities: [
      'Write Dockerfiles with multi-stage builds to minimize image sizes and CVE vulnerabilities.',
      'Configure Helm charts for deploying microservices onto AWS EKS clusters.',
      'Set up Prometheus monitoring alerts and Grafana dashboards for client SLA tracking.',
      'Automate repetitive sysadmin tasks with clean Bash and Python scripts.'
    ],
    qualifications: [
      'Strong command of the Linux terminal (grep, awk, sed, systemd, networking).',
      'Hands-on understanding of Docker containers and basic Kubernetes manifests (Pods, Deployments, Services).',
      'Good written English communication skills for client documentation.'
    ],
    perks: [
      '100% reimbursement for CKA (Certified Kubernetes Administrator) exam fee upon passing',
      'PPO conversion to Junior Cloud Engineer (₹7 - ₹10 LPA)',
      'Metro connectivity (walking distance from Sector 62 metro station)',
      'Friendly, learning-focused environment with weekly hack afternoons'
    ],
    applyUrl: 'https://naukri.com/job-listings-devops-intern-cloudops-noida',
    companyWebsite: 'https://noidacloudops.com',
    verifiedListing: true,
    matchScore: 90
  },
  {
    id: 'intern-kochifinlabs-kerala-small',
    title: 'Python Backend & Data Microservices Intern',
    company: 'Kochi FinLabs',
    companyLogo: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=128&auto=format&fit=crop&q=80',
    platform: 'Internshala',
    location: 'Kochi (Infopark / Kakkanad), Kerala',
    country: 'India',
    state: 'Kerala',
    city: 'Kochi',
    companyType: 'Small Boutique',
    companySize: '11-50 employees',
    workMode: 'Hybrid',
    stipend: '₹22,000 / month',
    stipendNumericMonthly: 22000,
    currency: 'INR',
    duration: '6 Months',
    postedAt: '1.5 hours ago',
    postedMinutesAgo: 90,
    appliedCount: 22,
    urgencyStatus: 'Immediate Joining',
    domain: 'Backend',
    eligibleBatches: ['2025 Batch', '2026 Batch'],
    ppoOffered: true,
    requiredSkills: ['Python 3', 'FastAPI / Django', 'PostgreSQL', 'Redis', 'RESTful Design'],
    description: 'Located in the scenic Infopark Kakkanad, Kochi FinLabs develops automated wealth management and mutual fund portfolio rebalancing engines for regional cooperatives and fintech brokers.',
    responsibilities: [
      'Write clean, asynchronous Python backend routes using FastAPI and SQLAlchemy.',
      'Implement scheduled data ingestion cron jobs parsing financial feeds from NSE/BSE.',
      'Optimize database queries and indexing strategies in PostgreSQL.',
      'Write unit test suites achieving >85% code coverage.'
    ],
    qualifications: [
      'Sound knowledge of Python, data structures, and relational databases.',
      'Understanding of basic API security (JWT, rate limiting, hashing).',
      'Located in Kerala or willing to work out of Infopark Kochi.'
    ],
    perks: [
      'Direct PPO opportunity with full-time benefits (₹5.5 - ₹8 LPA)',
      'Infopark campus amenities: sports arenas, food courts, and campus transport',
      'Supportive senior developers who love pairing on challenging bugs',
      'Certificate of excellence and official reference letter'
    ],
    applyUrl: 'https://internshala.com/internship/detail/python-backend-kochi-finlabs',
    companyWebsite: 'https://kochifinlabs.io',
    verifiedListing: true,
    matchScore: 89
  },
  {
    id: 'intern-mumbai-finedge-small',
    title: 'Algorithmic Trading Systems & Python Intern',
    company: 'Mumbai FinEdge Quantitative Studio',
    companyLogo: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=128&auto=format&fit=crop&q=80',
    platform: 'Wellfound',
    location: 'Mumbai (BKC / Andheri), Maharashtra',
    country: 'India',
    state: 'Maharashtra',
    city: 'Mumbai',
    companyType: 'Small Boutique',
    companySize: '11-50 employees',
    workMode: 'On-site',
    stipend: '₹35,000 / month',
    stipendNumericMonthly: 35000,
    currency: 'INR',
    duration: '3 - 6 Months',
    postedAt: '2 hours ago',
    postedMinutesAgo: 130,
    appliedCount: 64,
    urgencyStatus: 'Actively Hiring',
    domain: 'Data Science',
    eligibleBatches: ['2025 Batch', '2026 Batch', '2027 Batch'],
    ppoOffered: true,
    requiredSkills: ['Python', 'Pandas', 'NumPy', 'Financial Math', 'C++ or Cython', 'ZeroMQ / WebSockets'],
    description: 'FinEdge is a boutique proprietary quantitative development studio in Mumbai. We build high-throughput market making bots and statistical arbitrage models for options and futures markets.',
    responsibilities: [
      'Backtest statistical trading signals across 5 years of tick-by-tick market orderbook data.',
      'Profile order execution latency and minimize tick-to-trade timestamps.',
      'Build real-time risk monitoring telemetry dashboards with Plotly and Streamlit.',
      'Implement automated kill-switches and sanity checks for trading algorithms.'
    ],
    qualifications: [
      'Solid mathematical intuition in probability, linear regression, and calculus.',
      'High coding speed in vectorized Python (NumPy/Pandas) or C++.',
      'Enthusiasm for financial markets and algorithmic execution.'
    ],
    perks: [
      'High-performing interns receive performance profit bonuses (up to ₹50,000 additional)',
      'Substantial PPO packages (₹18 - ₹25 LPA CTC)',
      'Premium office in Bandra Kurla Complex (BKC) with catered meals',
      'One-on-one coaching with veteran institutional derivatives traders'
    ],
    applyUrl: 'https://wellfound.com/company/finedge-mumbai',
    companyWebsite: 'https://finedgequantitative.com',
    verifiedListing: true,
    matchScore: 93
  },
  {
    id: 'intern-austin-devventures-us-small',
    title: 'Full Stack TypeScript & AI SaaS Intern',
    company: 'Austin DevVentures',
    companyLogo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=128&auto=format&fit=crop&q=80',
    platform: 'Wellfound',
    location: 'Austin, Texas, USA / Remote Global',
    country: 'United States',
    state: 'Texas',
    city: 'Austin',
    companyType: 'Startup',
    companySize: '1-10 employees',
    workMode: 'Remote',
    stipend: '$2,500 / month (approx ₹2,05,000 / mo)',
    stipendNumericMonthly: 205000,
    currency: 'USD',
    duration: '3 - 4 Months',
    postedAt: '1.2 hours ago',
    postedMinutesAgo: 72,
    appliedCount: 58,
    urgencyStatus: 'Actively Hiring',
    domain: 'Full Stack',
    eligibleBatches: ['2025 Batch', '2026 Batch', '2027 Batch'],
    ppoOffered: true,
    requiredSkills: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'Drizzle ORM', 'Server Actions', 'Stripe'],
    description: 'Austin DevVentures is a fast-growing tech studio building AI-enabled workflow tools for real estate and construction enterprises. Join a 9-person squad where your features deploy directly to paying customers every single day.',
    responsibilities: [
      'Design modern, accessible user interfaces using Next.js 15, Tailwind, and Shadcn UI.',
      'Implement end-to-end database schemas using Drizzle ORM and Neon Serverless PostgreSQL.',
      'Integrate Stripe Billing, webhook signature verification, and automated customer receipt emails.',
      'Pair-program with the founder and senior engineers via Tuple and GitHub Codespaces.'
    ],
    qualifications: [
      'Fluency in modern TypeScript across frontend and backend.',
      'Portfolio of deployed full-stack web applications on GitHub / Vercel.',
      'Self-starter mindset with reliable asynchronous remote communication.'
    ],
    perks: [
      'Global USD compensation paid directly via wire transfer or Deel',
      'Flexible working hours with asynchronous team cadence',
      'Top performers offered full-time remote contracts ($60k - $85k USD/year)',
      'Home office hardware and software tool subscriptions covered'
    ],
    applyUrl: 'https://wellfound.com/company/austin-devventures',
    companyWebsite: 'https://austindevventures.com',
    verifiedListing: true,
    matchScore: 95
  },
  {
    id: 'intern-bayarea-robotics-us-small',
    title: 'Embedded Systems & Robotics Software Intern',
    company: 'NextGen Robotics Lab',
    companyLogo: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=128&auto=format&fit=crop&q=80',
    platform: 'LinkedIn',
    location: 'San Francisco, California, USA / Hybrid',
    country: 'United States',
    state: 'California',
    city: 'San Francisco',
    companyType: 'Startup',
    companySize: '11-50 employees',
    workMode: 'Hybrid',
    stipend: '$3,200 / month (approx ₹2,65,000 / mo)',
    stipendNumericMonthly: 265000,
    currency: 'USD',
    duration: '12 - 16 Weeks',
    postedAt: '3 hours ago',
    postedMinutesAgo: 180,
    appliedCount: 75,
    urgencyStatus: 'Closing Soon',
    domain: 'Software Engineering',
    eligibleBatches: ['2025 Batch', '2026 Batch', '2027 Batch'],
    ppoOffered: true,
    requiredSkills: ['C++20', 'ROS2 (Robot Operating System)', 'Linux RT-Kernel', 'Sensors (LiDAR / IMU)', 'Python'],
    description: 'NextGen Robotics builds autonomous inspection rovers for clean energy solar and wind farms in California. Work hands-on with sensor fusion, trajectory planning, and low-latency motor control firmware.',
    responsibilities: [
      'Develop ROS2 nodes in modern C++ for sensor data pipeline ingestion (LiDAR, stereo cameras).',
      'Calibrate Extended Kalman Filters (EKF) for reliable robot localization in GPS-denied environments.',
      'Write hardware abstraction drivers communicating via CAN-bus and SPI protocols.',
      'Test autonomous navigation algorithms in simulation (Gazebo) and on physical test robots in SOMA lab.'
    ],
    qualifications: [
      'Strong programming proficiency in C++ and Python.',
      'Familiarity with ROS/ROS2, robotics coordinate transforms, and basic control theory.',
      'Prior student robotics team (Formula Student, RoboSub, Rover) experience is highly valued.'
    ],
    perks: [
      'Competitive US internship stipend with San Francisco travel stipend',
      'Daily meals and electric scooter pass for SOMA district',
      'Direct hands-on experience touching real autonomous hardware',
      'PPO pipeline for Full-Time Robotics Software Engineer ($120k+ base)'
    ],
    applyUrl: 'https://linkedin.com/jobs/view/robotics-software-intern-nextgen-sf',
    companyWebsite: 'https://nextgenrobotics.ai',
    verifiedListing: true,
    matchScore: 92
  },

  // --- Big Tech & High Growth Enterprise ---
  {
    id: 'intern-google-swe-summer2026',
    title: 'Software Engineering Intern - Summer 2026',
    company: 'Google',
    companyLogo: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=128&auto=format&fit=crop&q=80',
    platform: 'LinkedIn',
    location: 'Bangalore / Hyderabad, India',
    country: 'India',
    state: 'Karnataka',
    city: 'Bangalore',
    companyType: 'Tech Giant',
    companySize: '500+ employees',
    workMode: 'Hybrid',
    stipend: '₹1,15,000 / month',
    stipendNumericMonthly: 115000,
    currency: 'INR',
    duration: '10 - 12 Weeks (May - July 2026)',
    postedAt: '28 minutes ago',
    postedMinutesAgo: 28,
    appliedCount: 412,
    urgencyStatus: 'Actively Hiring',
    domain: 'Software Engineering',
    eligibleBatches: ['2026 Batch', '2027 Batch'],
    ppoOffered: true,
    requiredSkills: ['Data Structures & Algorithms', 'C++', 'Java', 'Python', 'Distributed Systems'],
    description: 'Join Google engineering teams in Bangalore or Hyderabad to build scalable infrastructure, search indexing services, cloud solutions, and developer tools used by billions across the globe.',
    responsibilities: [
      'Write production-grade, maintainable code with unit and integration test suites.',
      'Collaborate with Senior Staff Engineers and Product Managers on system architecture.',
      'Optimize algorithms for latency, concurrency, memory footprint, and bandwidth efficiency.',
      'Participate in design reviews and site reliability post-mortems.'
    ],
    qualifications: [
      'Currently enrolled in a Bachelor\'s, Master\'s, or PhD in Computer Science or related STEM degree.',
      'Strong problem-solving proficiency in C++, Java, or Python.',
      'Understanding of core computer science fundamentals (OS, Computer Networks, DBMS).'
    ],
    perks: [
      'Pre-Placement Offer (PPO) for Full-Time SWE role (L3)',
      'Free gourmet meals, barista coffee, and campus transit shuttles',
      'Relocation assistance and temporary corporate housing accommodation',
      '1-on-1 mentorship with Google Staff Principal Engineers'
    ],
    applyUrl: 'https://careers.google.com/jobs/results/',
    companyWebsite: 'https://google.com',
    verifiedListing: true,
    matchScore: 96
  },
  {
    id: 'intern-razorpay-backend-sde',
    title: 'Backend Engineering Intern (Fintech Payments)',
    company: 'Razorpay',
    companyLogo: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=128&auto=format&fit=crop&q=80',
    platform: 'Naukri',
    location: 'Bangalore, Karnataka',
    country: 'India',
    state: 'Karnataka',
    city: 'Bangalore',
    companyType: 'Mid-Market',
    companySize: '500+ employees',
    workMode: 'Hybrid',
    stipend: '₹45,000 / month',
    stipendNumericMonthly: 45000,
    currency: 'INR',
    duration: '6 Months (Immediate Joining)',
    postedAt: '1 hour ago',
    postedMinutesAgo: 60,
    appliedCount: 184,
    urgencyStatus: 'Immediate Joining',
    domain: 'Backend',
    eligibleBatches: ['2025 Batch', '2026 Batch'],
    ppoOffered: true,
    requiredSkills: ['Golang', 'Node.js / TypeScript', 'PostgreSQL', 'Redis', 'Kafka', 'Docker'],
    description: 'Work directly on high-throughput payment gateway pipelines handling 10,000+ TPS. You will design idempotent payment webhooks, microservices, and fraud-detection telemetry pipelines.',
    responsibilities: [
      'Architect resilient REST and gRPC microservices in Go and TypeScript.',
      'Design PostgreSQL database schemas with read-replicas and connection pooling.',
      'Implement distributed event streaming with Apache Kafka for merchant settlement reconciliations.',
      'Monitor low-latency payment rails with Prometheus and Grafana alerting.'
    ],
    qualifications: [
      'Proficiency in at least one backend language: Go, Node.js, Python, or Java.',
      'Solid grasp of SQL transactions (ACID), indexing, and query plan optimization.',
      'Familiarity with Git branch workflows and containerized microservices (Docker).'
    ],
    perks: [
      'High conversion PPO rate (up to ₹24 LPA full-time CTC package)',
      'MacBook Pro M3 Max workstation provided',
      'Monthly wellness allowance and comprehensive health insurance',
      'Hybrid flexibility with catered office lunches'
    ],
    applyUrl: 'https://razorpay.com/jobs/',
    companyWebsite: 'https://razorpay.com',
    verifiedListing: true,
    matchScore: 92
  },
  {
    id: 'intern-microsoft-ai-research',
    title: 'AI & Machine Learning Research Intern',
    company: 'Microsoft Research (MSR)',
    companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=128&auto=format&fit=crop&q=80',
    platform: 'LinkedIn',
    location: 'Bangalore (Hybrid) / Remote Option',
    country: 'India',
    state: 'Karnataka',
    city: 'Bangalore',
    companyType: 'Tech Giant',
    companySize: '500+ employees',
    workMode: 'Hybrid',
    stipend: '₹1,00,000 / month',
    stipendNumericMonthly: 100000,
    currency: 'INR',
    duration: '3 - 6 Months',
    postedAt: '2 hours ago',
    postedMinutesAgo: 120,
    appliedCount: 310,
    urgencyStatus: 'Actively Hiring',
    domain: 'AI & Machine Learning',
    eligibleBatches: ['2025 Batch', '2026 Batch', '2027 Batch'],
    ppoOffered: true,
    requiredSkills: ['PyTorch', 'Transformers / HuggingFace', 'LLM Fine-Tuning', 'Python', 'CUDA / GPU Optimization'],
    description: 'Collaborate with top computer vision and NLP researchers at Microsoft Research India. Focus on efficient model distillation, multilingual LLMs for low-resource languages, and agentic workflows.',
    responsibilities: [
      'Conduct experiments on state-of-the-art generative transformer models.',
      'Fine-tune open-source LLMs using LoRA, QLoRA, and RLHF reinforcement feedback.',
      'Author and co-publish research findings to top-tier conferences (NeurIPS, ICML, ACL).',
      'Benchmark inference acceleration techniques with vLLM, TensorRT-LLM, and ONNX Runtime.'
    ],
    qualifications: [
      'Background in Deep Learning, Linear Algebra, and Statistical Learning theory.',
      'Strong coding ability in Python and PyTorch / JAX frameworks.',
      'Prior research experience, competitive coding, or demonstrable GitHub open-source projects.'
    ],
    perks: [
      'Direct interview path to Microsoft Research Fellows / Full-Time Applied Scientist',
      'Subsidized Azure GPU cluster compute hours (A100 / H100 clusters)',
      'Conference travel grant sponsorship for accepted papers',
      'Stipend plus housing allowance'
    ],
    applyUrl: 'https://careers.microsoft.com/',
    companyWebsite: 'https://microsoft.com',
    verifiedListing: true,
    matchScore: 94
  },
  {
    id: 'intern-uber-fullstack-intern',
    title: 'Full Stack Engineering Intern (Rider Experience)',
    company: 'Uber',
    companyLogo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=128&auto=format&fit=crop&q=80',
    platform: 'LinkedIn',
    location: 'Hyderabad / Bangalore',
    country: 'India',
    state: 'Telangana',
    city: 'Hyderabad',
    companyType: 'Tech Giant',
    companySize: '500+ employees',
    workMode: 'Hybrid',
    stipend: '₹85,000 / month',
    stipendNumericMonthly: 85000,
    currency: 'INR',
    duration: '6 Months',
    postedAt: '3 hours ago',
    postedMinutesAgo: 180,
    appliedCount: 228,
    urgencyStatus: 'High Demand',
    domain: 'Full Stack',
    eligibleBatches: ['2026 Batch'],
    ppoOffered: true,
    requiredSkills: ['React', 'TypeScript', 'Node.js / Java', 'GraphQL', 'WebSockets', 'Tailwind CSS'],
    description: 'Work on real-time trip matching, rider geospatial maps, dynamic pricing dashboards, and checkout systems for millions of daily active Uber riders across 70+ countries.',
    responsibilities: [
      'Build responsive, high-performance web and mobile web interfaces using React and Base Web.',
      'Integrate bidirectional WebSocket streams for live driver telemetry and routing updates.',
      'Collaborate with UX researchers to conduct A/B testing on ride checkout funnels.',
      'Contribute to internal open-source component libraries and design tokens.'
    ],
    qualifications: [
      'Strong grasp of JavaScript / TypeScript semantics, closures, and async event loop.',
      'Experience building modern React component hierarchies and custom hooks.',
      'Familiarity with REST and GraphQL API communication.'
    ],
    perks: [
      'Pre-Placement Offer (PPO) opportunities with Tier-1 tech compensation',
      'Uber ride credits and Uber Eats food credits every month',
      'Flexible working hours with ergonomic home-office budget',
      'International team exposure across Amsterdam and San Francisco'
    ],
    applyUrl: 'https://www.uber.com/us/en/careers/',
    companyWebsite: 'https://uber.com',
    verifiedListing: true,
    matchScore: 89
  },
  {
    id: 'intern-swiggy-frontend-intern',
    title: 'Frontend Developer Intern (Instamart & Food)',
    company: 'Swiggy',
    companyLogo: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?w=128&auto=format&fit=crop&q=80',
    platform: 'Internshala',
    location: 'Bangalore / Remote Pan-India',
    country: 'India',
    state: 'Karnataka',
    city: 'Bangalore',
    companyType: 'Mid-Market',
    companySize: '500+ employees',
    workMode: 'Remote',
    stipend: '₹40,000 / month',
    stipendNumericMonthly: 40000,
    currency: 'INR',
    duration: '3 - 6 Months',
    postedAt: '45 minutes ago',
    postedMinutesAgo: 45,
    appliedCount: 156,
    urgencyStatus: 'Actively Hiring',
    domain: 'Frontend',
    eligibleBatches: ['2025 Batch', '2026 Batch', '2027 Batch'],
    ppoOffered: true,
    requiredSkills: ['React.js', 'Next.js', 'Redux Toolkit / Zustand', 'HTML5/CSS3', 'Web Performance / Core Web Vitals'],
    description: 'Optimize checkout load speed and high-converting grocery ordering funnels for Swiggy Instamart. Improve Core Web Vitals (LCP < 1.2s), implement smooth micro-animations, and manage client-side state.',
    responsibilities: [
      'Develop modular, reusable UI components in Next.js and TypeScript.',
      'Optimize client asset bundles with code-splitting and progressive image loading.',
      'Implement real-time cart synchronization and live order tracking widgets.',
      'Ensure 100% WCAG accessibility and responsive rendering across mobile and desktop.'
    ],
    qualifications: [
      'Hands-on experience building web apps with React or Next.js.',
      'Eye for detail, smooth CSS transitions, and clean component architecture.',
      'Understanding of browser rendering pipelines and DOM optimization.'
    ],
    perks: [
      '100% Remote flexibility with equipment delivery',
      'Monthly Swiggy One premium membership & food credits',
      'Direct mentorship from Senior Staff Frontend Architects',
      'PPO opportunities with fast-track promotion paths'
    ],
    applyUrl: 'https://careers.swiggy.com/',
    companyWebsite: 'https://swiggy.com',
    verifiedListing: true,
    matchScore: 91
  },
  {
    id: 'intern-cred-devops-cloud',
    title: 'Cloud Systems & DevOps Engineering Intern',
    company: 'CRED',
    companyLogo: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=128&auto=format&fit=crop&q=80',
    platform: 'Wellfound',
    location: 'Bangalore (Indiranagar), Karnataka',
    country: 'India',
    state: 'Karnataka',
    city: 'Bangalore',
    companyType: 'Mid-Market',
    companySize: '500+ employees',
    workMode: 'Hybrid',
    stipend: '₹60,000 / month',
    stipendNumericMonthly: 60000,
    currency: 'INR',
    duration: '6 Months',
    postedAt: '1 hour ago',
    postedMinutesAgo: 65,
    appliedCount: 98,
    urgencyStatus: 'Early Applicant',
    domain: 'Cloud & DevOps',
    eligibleBatches: ['2025 Batch', '2026 Batch'],
    ppoOffered: true,
    requiredSkills: ['Kubernetes', 'Docker', 'AWS', 'Terraform', 'CI/CD GitHub Actions', 'Linux / Bash'],
    description: 'CRED is known for architectural craftsmanship. Join the platform engineering guild managing multi-region Kubernetes clusters, zero-downtime canary deployments, and automated cloud security policies.',
    responsibilities: [
      'Write Infrastructure-as-Code using Terraform and OpenTofu for AWS resources.',
      'Maintain automated CI/CD pipelines deploying hundreds of daily canary releases.',
      'Implement service mesh telemetry (Istio / Envoy) for secure mutual TLS communication.',
      'Participate in chaos engineering drills and automated disaster recovery simulations.'
    ],
    qualifications: [
      'Strong command of Linux command line, system calls, and bash scripting.',
      'Familiarity with container concepts: namespaces, cgroups, and Dockerfiles.',
      'Eagerness to learn cloud-native systems (Kubernetes, Helm, Terraform).'
    ],
    perks: [
      'PPO offer package up to ₹28 LPA CTC for top performers',
      'Top-tier Apple hardware (MacBook Pro M3 Max + 4K Studio Display)',
      'In-house culinary chef and specialty coffee bar',
      'Unlimited book allowance and certification exam fee reimbursements'
    ],
    applyUrl: 'https://careers.cred.club/',
    companyWebsite: 'https://cred.club',
    verifiedListing: true,
    matchScore: 88
  },
  {
    id: 'intern-atlassian-sde-summer',
    title: 'Software Engineer Intern (Jira & Confluence Cloud)',
    company: 'Atlassian',
    companyLogo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=128&auto=format&fit=crop&q=80',
    platform: 'LinkedIn',
    location: 'Remote (India - Anywhere)',
    country: 'India',
    state: 'Remote',
    city: 'Remote',
    companyType: 'Tech Giant',
    companySize: '500+ employees',
    workMode: 'Remote',
    stipend: '₹90,000 / month',
    stipendNumericMonthly: 90000,
    currency: 'INR',
    duration: '10 Weeks (Summer 2026)',
    postedAt: '4 hours ago',
    postedMinutesAgo: 240,
    appliedCount: 520,
    urgencyStatus: 'Actively Hiring',
    domain: 'Software Engineering',
    eligibleBatches: ['2026 Batch', '2027 Batch'],
    ppoOffered: true,
    requiredSkills: ['Java / Kotlin', 'Spring Boot', 'React', 'AWS Microservices', 'Distributed Data Stores'],
    description: 'Atlassian is Team Anywhere! Build collaborative real-time editor engines and high-volume notification pipelines powering millions of engineering teams using Jira and Confluence worldwide.',
    responsibilities: [
      'Design event-driven backend services handling billions of monthly collaboration events.',
      'Build rich, accessible UI components adhering to the Atlassian Design System.',
      'Write comprehensive automated end-to-end and performance test suites.',
      'Work alongside global mentors across Sydney, San Francisco, and Bengaluru.'
    ],
    qualifications: [
      'Pursuing degree in Computer Science, Software Engineering, or related technical field.',
      'Strong core CS knowledge: Algorithmic analysis, Thread concurrency, and Object-Oriented Design.',
      'Demonstrated passion for building developer tools or collaborative software.'
    ],
    perks: [
      'Full Work-From-Home stipend to furnish your personal workspace (₹75,000 home office grant)',
      'High PPO conversion to Graduate Software Engineer role (₹26+ LPA)',
      'Wellness leave days and paid holidays',
      'Annual team offsites in Goa and international hubs'
    ],
    applyUrl: 'https://www.atlassian.com/company/careers/students',
    companyWebsite: 'https://atlassian.com',
    verifiedListing: true,
    matchScore: 95
  },
  {
    id: 'intern-adobe-cybersecurity-intern',
    title: 'Product Cybersecurity & Threat Intelligence Intern',
    company: 'Adobe',
    companyLogo: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=128&auto=format&fit=crop&q=80',
    platform: 'Naukri',
    location: 'Noida (Sector 132), Uttar Pradesh / Bangalore',
    country: 'India',
    state: 'Uttar Pradesh',
    city: 'Noida',
    companyType: 'Tech Giant',
    companySize: '500+ employees',
    workMode: 'Hybrid',
    stipend: '₹75,000 / month',
    stipendNumericMonthly: 75000,
    currency: 'INR',
    duration: '6 Months',
    postedAt: '2 hours ago',
    postedMinutesAgo: 140,
    appliedCount: 164,
    urgencyStatus: 'Actively Hiring',
    domain: 'Cybersecurity',
    eligibleBatches: ['2025 Batch', '2026 Batch'],
    ppoOffered: true,
    requiredSkills: ['Web Application Security (OWASP Top 10)', 'Python Security Scripting', 'Burp Suite', 'Cloud Security (AWS/Azure)', 'Penetration Testing'],
    description: 'Join Adobe\'s Global Security Operations Center (ASOC). You will perform automated vulnerability scanning, ethical hacking, secure code reviews, and threat modeling on Adobe Creative Cloud services.',
    responsibilities: [
      'Identify and remediate security vulnerabilities across enterprise web services.',
      'Conduct automated SAST and DAST scans using industry standard security tooling.',
      'Develop custom Python exploits and security regression tests in CI/CD.',
      'Assist with incident response investigations and forensic malware analysis.'
    ],
    qualifications: [
      'Understanding of network protocols (TCP/IP, TLS/SSL, DNS) and OS internals.',
      'Hands-on knowledge of common web attack vectors (XSS, CSRF, SSRF, SQLi).',
      'Participation in CTFs (Capture The Flag) or bug bounty programs is a major plus.'
    ],
    perks: [
      'PPO opportunity for Associate Security Engineer positions',
      'Complimentary Adobe Creative Cloud All Apps subscription license',
      'Health benefits and generous paid leave',
      'Sponsored certifications: CEH, CompTIA Security+, or OSCP path'
    ],
    applyUrl: 'https://www.adobe.com/careers.html',
    companyWebsite: 'https://adobe.com',
    verifiedListing: true,
    matchScore: 87
  },
  {
    id: 'intern-zomato-data-analyst',
    title: 'Data Science & Product Analytics Intern',
    company: 'Zomato',
    companyLogo: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=128&auto=format&fit=crop&q=80',
    platform: 'Unstop',
    location: 'Gurgaon (Delhi NCR), Haryana',
    country: 'India',
    state: 'Haryana',
    city: 'Gurgaon',
    companyType: 'Mid-Market',
    companySize: '500+ employees',
    workMode: 'On-site',
    stipend: '₹40,000 / month',
    stipendNumericMonthly: 40000,
    currency: 'INR',
    duration: '3 - 6 Months',
    postedAt: '5 hours ago',
    postedMinutesAgo: 300,
    appliedCount: 280,
    urgencyStatus: 'Actively Hiring',
    domain: 'Data Science',
    eligibleBatches: ['2025 Batch', '2026 Batch', '2027 Batch'],
    ppoOffered: true,
    requiredSkills: ['SQL (Advanced Window Functions)', 'Python (Pandas, NumPy)', 'A/B Testing & Statistics', 'Tableau / PowerBI', 'Data Warehousing'],
    description: 'Dive deep into millions of food delivery orders, restaurant partner insights, and user retention metrics. Build predictive churn models and experiment funnels driving real operational revenue.',
    responsibilities: [
      'Write complex SQL queries on Snowflake and BigQuery data lakes.',
      'Design and analyze statistical A/B experiments for consumer app features.',
      'Build executive dashboards tracking real-time delivery turnaround times and fleet efficiency.',
      'Collaborate with Product Managers to synthesize behavioral cohort analyses.'
    ],
    qualifications: [
      'High proficiency in SQL and Python data manipulation.',
      'Solid intuition for statistics: hypothesis testing, p-values, and statistical power.',
      'Curiosity for consumer tech metrics (DAU, MAU, LTV, CAC, Retention curves).'
    ],
    perks: [
      'Competitive monthly stipend with PPO conversion potential',
      'Free daily gourmet meals at the Gurgaon headquarters',
      'Fast-paced startup culture with direct ownership of live experiments',
      'Fun company culture and networking events'
    ],
    applyUrl: 'https://www.zomato.com/careers',
    companyWebsite: 'https://zomato.com',
    verifiedListing: true,
    matchScore: 90
  },
  {
    id: 'intern-snowflake-us-remote',
    title: 'Cloud Infrastructure & Core Database Intern',
    company: 'Snowflake',
    companyLogo: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=128&auto=format&fit=crop&q=80',
    platform: 'LinkedIn',
    location: 'Remote (US & Global)',
    country: 'United States',
    state: 'Remote',
    city: 'Remote',
    companyType: 'Tech Giant',
    companySize: '500+ employees',
    workMode: 'Remote',
    stipend: '$45 / hour (approx ₹2,90,000 / mo)',
    stipendNumericMonthly: 290000,
    currency: 'USD',
    duration: '12 Weeks (Summer 2026)',
    postedAt: '10 minutes ago',
    postedMinutesAgo: 10,
    appliedCount: 88,
    urgencyStatus: 'Closing Soon',
    domain: 'Software Engineering',
    eligibleBatches: ['2026 Batch', '2027 Batch'],
    ppoOffered: true,
    requiredSkills: ['C++', 'Rust', 'Distributed Systems', 'Database Query Engines', 'Linux Kernel'],
    description: 'Work at the heart of Snowflake\'s cloud data platform query execution engine. Optimize vectorized expression evaluators, storage caching layers, and multi-tenant isolation.',
    responsibilities: [
      'Develop modern C++ and Rust code for high-throughput distributed database engines.',
      'Profile CPU cache utilization, memory allocation, and SIMD instruction pipelines.',
      'Implement scalable distributed consensus protocols and replication guarantees.',
      'Participate in rigorous code reviews with veteran database architects.'
    ],
    qualifications: [
      'Exceptional algorithmic and systems programming skills in C++, Rust, or Go.',
      'Deep understanding of computer architecture (caches, virtual memory, concurrency).',
      'Prior database engine or operating system project experience.'
    ],
    perks: [
      'Top-tier global compensation package ($45/hr + $2,500 monthly housing stipend)',
      '100% remote flexibility across authorized countries',
      'High conversion to full-time SWE with lucrative equity RSUs',
      'State-of-the-art developer hardware shipped directly to you'
    ],
    applyUrl: 'https://careers.snowflake.com/',
    companyWebsite: 'https://snowflake.com',
    verifiedListing: true,
    matchScore: 93
  }
];

export const INTERNSHIP_DOMAINS = [
  'All',
  'Software Engineering',
  'AI & Machine Learning',
  'Frontend',
  'Backend',
  'Full Stack',
  'Data Science',
  'Cloud & DevOps',
  'Cybersecurity'
];

export const INTERNSHIP_PLATFORMS = [
  'All',
  'LinkedIn',
  'Naukri',
  'Internshala',
  'Wellfound',
  'Unstop'
];

export const COMPANY_TYPE_OPTIONS = [
  { id: 'All', label: 'All Companies' },
  { id: 'Small', label: 'Small Companies & Startups (<50 emp)' },
  { id: 'Mid-Market', label: 'Mid-Market Companies' },
  { id: 'Tech Giant', label: 'Tech Giants & FAANG' }
];

export interface RegionDirectory {
  country: string;
  states: {
    name: string;
    cities: string[];
  }[];
}

export const REGION_DIRECTORY: RegionDirectory[] = [
  {
    country: 'India',
    states: [
      { name: 'All States', cities: ['All Cities'] },
      { name: 'Karnataka', cities: ['All Cities', 'Bangalore', 'Mysore', 'Mangalore', 'Hubli'] },
      { name: 'Maharashtra', cities: ['All Cities', 'Mumbai', 'Pune', 'Nagpur', 'Nashik'] },
      { name: 'Tamil Nadu', cities: ['All Cities', 'Chennai', 'Coimbatore', 'Madurai', 'Trichy', 'Tenkasi', 'Salem'] },
      { name: 'Telangana', cities: ['All Cities', 'Hyderabad', 'Warangal', 'Nizamabad'] },
      { name: 'Uttar Pradesh', cities: ['All Cities', 'Noida', 'Greater Noida', 'Lucknow', 'Kanpur'] },
      { name: 'Haryana', cities: ['All Cities', 'Gurgaon', 'Faridabad', 'Panchkula'] },
      { name: 'Kerala', cities: ['All Cities', 'Kochi', 'Trivandrum', 'Kozhikode', 'Thrissur'] },
      { name: 'Delhi NCR', cities: ['All Cities', 'New Delhi', 'Noida', 'Gurgaon'] },
      { name: 'West Bengal', cities: ['All Cities', 'Kolkata', 'Siliguri'] },
      { name: 'Gujarat', cities: ['All Cities', 'Ahmedabad', 'Surat', 'Vadodara'] }
    ]
  },
  {
    country: 'United States',
    states: [
      { name: 'All States', cities: ['All Cities'] },
      { name: 'California', cities: ['All Cities', 'San Francisco', 'San Jose', 'Los Angeles', 'San Diego'] },
      { name: 'Texas', cities: ['All Cities', 'Austin', 'Dallas', 'Houston'] },
      { name: 'New York', cities: ['All Cities', 'New York', 'Buffalo'] },
      { name: 'Washington', cities: ['All Cities', 'Seattle', 'Bellevue', 'Redmond'] }
    ]
  },
  {
    country: 'United Kingdom',
    states: [
      { name: 'All States', cities: ['All Cities'] },
      { name: 'England', cities: ['All Cities', 'London', 'Manchester', 'Cambridge', 'Oxford'] },
      { name: 'Scotland', cities: ['All Cities', 'Edinburgh', 'Glasgow'] }
    ]
  },
  {
    country: 'Germany',
    states: [
      { name: 'All States', cities: ['All Cities'] },
      { name: 'Berlin', cities: ['All Cities', 'Berlin'] },
      { name: 'Bavaria', cities: ['All Cities', 'Munich', 'Nuremberg'] },
      { name: 'Hesse', cities: ['All Cities', 'Frankfurt'] }
    ]
  }
];
