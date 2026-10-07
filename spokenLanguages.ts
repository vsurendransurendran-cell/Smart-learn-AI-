import { LanguageLearningStage } from '../types';
import { getStageQuiz } from './languageStageQuizzes';

export interface VocabularyItem {
  id: string;
  word: string;
  phonetic: string;
  translation: string;
  category: 'Essentials' | 'Engineering & Work' | 'Conversation' | 'Tech Vocabulary';
  exampleSentence: string;
  exampleTranslation: string;
}

export interface ConversationLine {
  speaker: string;
  text: string;
  translation: string;
}

export interface ConversationDialogue {
  id: string;
  title: string;
  scenario: string;
  lines: ConversationLine[];
}

export interface GrammarRule {
  title: string;
  concept: string;
  rule: string;
  examples: { original: string; translated: string }[];
}

export interface LanguageTrack {
  id: string;
  name: string;
  nativeName: string;
  flag: string;
  code: string; // Speech synthesis code e.g. 'es-ES'
  level: 'Beginner' | 'Intermediate' | 'Professional Tech';
  description: string;
  overviewSummary: string;
  learningPath: LanguageLearningStage[];
  grammarRules: GrammarRule[];
  vocabulary: VocabularyItem[];
  dialogues: ConversationDialogue[];
  practiceQuiz: {
    id: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
}

export function createStandardLanguageLearningPath(langName: string, flag: string, trackId: string = 'lang-spanish'): LanguageLearningStage[] {
  return [
    {
      stageNumber: 1,
      stageName: `${langName} Foundations, Alphabet & Phonetics`,
      levelBadge: 'A1 - Beginner',
      estimatedHours: 25,
      objectives: [
        `Master accurate ${langName} phonetics, vowel length, consonants, and pronunciation clarity`,
        'Introduce yourself, exchange formal and informal greetings, and state your role',
        'Learn cardinal numbers 1-100, calendar days, months, and time coordination',
        'Understand basic subject pronouns, articles, and gender/number agreement'
      ],
      keyTopics: ['Alphabet & Sound Patterns', 'Formal vs Informal Greetings', 'Subject Pronouns & Articles', 'Cardinal Numbers & Scheduling Time'],
      vocabularyCount: 300,
      grammarFocus: 'Present tense indicative, core irregular verbs (to be, to have, to do), basic negation',
      milestoneProject: `Record a 60-second video or voice introduction in ${langName} covering your name, engineering role, daily schedule, and favorite technologies.`,
      checkpointQuiz: getStageQuiz(trackId, 1)
    },
    {
      stageNumber: 2,
      stageName: 'Elementary Syntax & Daily Workplace',
      levelBadge: 'A2 - Elementary',
      estimatedHours: 40,
      objectives: [
        'Communicate during daily morning standups, asking for task updates and sharing progress',
        'Express completed tasks, recent accomplishments, and upcoming sprint plans',
        'Navigate office logistics, equipment requests, and calendar invites',
        'Ask clarifying questions and express blockers effectively'
      ],
      keyTopics: ['Past Tense / Perfective Verbs', 'Directional & Locational Prepositions', 'Calendar & Sprint Meetings', 'Office Hardware & Workstation Terminology'],
      vocabularyCount: 750,
      grammarFocus: 'Past compound tenses, direct/indirect object pronouns, modal auxiliary verbs',
      milestoneProject: `Draft a 3-paragraph sprint retro update in ${langName} describing completed tasks, pull requests merged, and upcoming sprint goals.`,
      checkpointQuiz: getStageQuiz(trackId, 2)
    },
    {
      stageNumber: 3,
      stageName: 'Professional Technical Collaboration & Code Reviews',
      levelBadge: 'B1 - Intermediate',
      estimatedHours: 60,
      objectives: [
        'Engage in constructive pull request reviews and architectural discussions',
        'Report production bugs, explain root causes, and summarize bug fixes',
        'Participate actively in technical grooming sessions and story pointing',
        'Explain algorithmic trade-offs (time vs space complexity) in conversation'
      ],
      keyTopics: ['Technical System Vocabulary', 'Conditional / Hypothesis Clauses (If... then...)', 'Incident Postmortems & Root Cause Analysis', 'Pull Request Review Etiquette'],
      vocabularyCount: 1500,
      grammarFocus: 'Subjunctive mood, conditional hypothesis clauses, passive voice in technical documentation',
      milestoneProject: `Conduct a simulated 15-minute system design review in ${langName} explaining database schema choices, caching layers, and latency tradeoffs.`,
      checkpointQuiz: getStageQuiz(trackId, 3)
    },
    {
      stageNumber: 4,
      stageName: 'Cloud Systems, Architecture & Incident Defense',
      levelBadge: 'B2 - Upper Intermediate',
      estimatedHours: 75,
      objectives: [
        'Explain distributed systems, microservices, containerization, and cloud scaling',
        'Lead high-severity incident bridges and coordinate cross-team mitigation',
        'Defend architectural RFCs (Request for Comments) before principal engineers',
        'Draft clear technical specifications and API documentation'
      ],
      keyTopics: ['High Availability & Fault Tolerance', 'RESTful API & GraphQL Design', 'Incident Command Communication', 'Microservices vs Monoliths'],
      vocabularyCount: 2200,
      grammarFocus: 'Complex relative clauses, discourse markers, nuanced concession phrases',
      milestoneProject: `Write and present a 4-page Technical Architecture RFC in ${langName} proposing a migration from a legacy database to a distributed cluster.`,
      checkpointQuiz: getStageQuiz(trackId, 4)
    },
    {
      stageNumber: 5,
      stageName: 'Technical Interviews & Executive Presentations',
      levelBadge: 'C1 - Advanced Professional',
      estimatedHours: 90,
      objectives: [
        'Excel in technical interviews for Tier-1 multinational engineering roles',
        'Deliver tech talks, conference keynotes, and enterprise client demonstrations',
        'Negotiate SLAs, engineering budgets, deliverables, and team roadmaps',
        'Communicate with cross-cultural fluency, empathy, and diplomatic persuasion'
      ],
      keyTopics: ['Executive Technical Presentations', 'Contract & SLA Negotiations', 'System Design Whiteboard Defense', 'Cross-Cultural Engineering Ethics'],
      vocabularyCount: 3200,
      grammarFocus: 'Rhetorical framing, advanced conditional constructions, idiomatic industry metaphors',
      milestoneProject: `Deliver a recorded 20-minute capstone technical presentation in ${langName} analyzing cloud infrastructure reliability, followed by a live Q&A defense.`,
      checkpointQuiz: getStageQuiz(trackId, 5)
    },
    {
      stageNumber: 6,
      stageName: 'Mastery & Bilingual Engineering Leadership',
      levelBadge: 'C2 - Native / Bilingual Fluency',
      estimatedHours: 120,
      objectives: [
        `Achieve effortless native-level technical and conversational fluency in ${langName}`,
        'Mentor junior and mid-level international developers in their native tongue',
        'Author technical blog posts, whitepapers, or book chapters published internationally',
        'Represent company as a keynote speaker at global technology symposiums'
      ],
      keyTopics: ['Published Technical Authorship', 'Global Engineering Diplomacy', 'Nuanced Idiomatic Mastery', 'Multilingual System Architecture'],
      vocabularyCount: 5000,
      grammarFocus: 'Complete mastery of formal, informal, technical, and literary registers',
      milestoneProject: `Publish an open-source tutorial or whitepaper in ${langName} and lead a multilingual community workshop for 50+ engineers.`,
      checkpointQuiz: getStageQuiz(trackId, 6)
    }
  ];
}

export const SPOKEN_LANGUAGE_TRACKS: LanguageTrack[] = [
  {
    id: 'lang-spanish',
    name: 'Spanish',
    nativeName: 'Español',
    flag: '🇪🇸',
    code: 'es-ES',
    level: 'Beginner',
    description: 'Learn conversational and workplace Spanish. Master pronunciation, essential vocabulary, and tech communication.',
    overviewSummary: 'Spanish is the second most spoken native language worldwide. It follows consistent phonetic rules where vowels are crisp and predictable.',
    learningPath: createStandardLanguageLearningPath('Spanish', '🇪🇸', 'lang-spanish'),
    grammarRules: [
      {
        title: 'Subject Pronouns & Verb Conjugation',
        concept: 'Spanish verbs conjugate by person and tense. Often subject pronouns (yo, tú) can be omitted because the verb ending clarifies the subject.',
        rule: 'Drop the infinitive ending (-ar, -er, -ir) and append person-specific suffixes: Habl-o (I speak), Habl-as (you speak).',
        examples: [
          { original: 'Trabajo como ingeniero de software.', translated: 'I work as a software engineer.' },
          { original: '¿Puedes revisar este código?', translated: 'Can you review this code?' }
        ]
      },
      {
        title: 'Ser vs. Estar (To Be)',
        concept: 'Both mean "to be", but "Ser" describes permanent attributes, identity, and time, while "Estar" expresses temporary states, emotions, and physical location.',
        rule: 'Use SER for DOCTOR (Description, Occupation, Characteristic, Time, Origin, Relationship). Use ESTAR for PLACE (Position, Location, Action, Condition, Emotion).',
        examples: [
          { original: 'Soy desarrollador (Ser).', translated: 'I am a developer (Identity/Occupation).' },
          { original: 'El servidor está caído (Estar).', translated: 'The server is down (Temporary state).' }
        ]
      },
      {
        title: 'Gender & Number Agreement',
        concept: 'Nouns are masculine or feminine. Adjectives must agree in gender and number with the noun they modify.',
        rule: 'Most masculine nouns end in -o (el libro), and feminine nouns in -a (la función). Plural adds -s or -es.',
        examples: [
          { original: 'Una base de datos rápida.', translated: 'A fast database (feminine singular).' },
          { original: 'Los algoritmos eficientes.', translated: 'The efficient algorithms (masculine plural).' }
        ]
      }
    ],
    vocabulary: [
      {
        id: 'es-1',
        word: 'Hola, ¿cómo estás?',
        phonetic: 'OH-lah, KOH-moh ess-TAHS',
        translation: 'Hello, how are you?',
        category: 'Essentials',
        exampleSentence: 'Hola, ¿cómo estás hoy con el proyecto?',
        exampleTranslation: 'Hello, how are you doing with the project today?'
      },
      {
        id: 'es-2',
        word: 'Mucho gusto',
        phonetic: 'MOO-choh GOOS-toh',
        translation: 'Pleased to meet you',
        category: 'Essentials',
        exampleSentence: 'Mucho gusto, soy el nuevo arquitecto de sistemas.',
        exampleTranslation: 'Pleased to meet you, I am the new systems architect.'
      },
      {
        id: 'es-3',
        word: 'Despliegue en producción',
        phonetic: 'dess-PLYEH-gweh en pro-dook-SYOHN',
        translation: 'Production deployment',
        category: 'Engineering & Work',
        exampleSentence: 'Vamos a realizar el despliegue en producción a las diez.',
        exampleTranslation: 'We are going to perform the production deployment at ten.'
      },
      {
        id: 'es-4',
        word: 'Base de datos',
        phonetic: 'BAH-seh deh DAH-tohs',
        translation: 'Database',
        category: 'Engineering & Work',
        exampleSentence: 'La base de datos tiene una réplica en la nube.',
        exampleTranslation: 'The database has a cloud replica.'
      },
      {
        id: 'es-5',
        word: 'Solución eficiente',
        phonetic: 'soh-loo-SYOHN eh-fee-SYEHN-teh',
        translation: 'Efficient solution',
        category: 'Tech Vocabulary',
        exampleSentence: 'Este algoritmo ofrece una solución eficiente en tiempo logarítmico.',
        exampleTranslation: 'This algorithm provides an efficient solution in logarithmic time.'
      },
      {
        id: 'es-6',
        word: '¿Entiendes la arquitectura?',
        phonetic: 'en-TYEHN-dess lah ar-kee-tek-TOO-rah',
        translation: 'Do you understand the architecture?',
        category: 'Conversation',
        exampleSentence: '¿Entiendes la arquitectura del microservicio?',
        exampleTranslation: 'Do you understand the microservice architecture?'
      }
    ],
    dialogues: [
      {
        id: 'es-diag-1',
        title: 'Morning Standup Meeting',
        scenario: 'Two engineers discussing task progress during a morning standup.',
        lines: [
          { speaker: 'Elena (Lead)', text: '¡Buenos días equipo! ¿En qué estás trabajando hoy?', translation: 'Good morning team! What are you working on today?' },
          { speaker: 'Mateo (Dev)', text: 'Terminé las pruebas unitarias y ahora optimizo la consulta SQL.', translation: 'I finished the unit tests and now I am optimizing the SQL query.' },
          { speaker: 'Elena (Lead)', text: 'Excelente. ¿Necesitas ayuda con la revisión de código?', translation: 'Excellent. Do you need any help with the code review?' },
          { speaker: 'Mateo (Dev)', text: 'No por ahora, gracias. Crearé la solicitud de extracción pronto.', translation: 'Not for now, thank you. I will open the pull request shortly.' }
        ]
      }
    ],
    practiceQuiz: [
      {
        id: 'es-q1',
        question: 'Which verb correctly completes: "El servidor ______ apagado temporalmente."?',
        options: ['es', 'está', 'ser', 'estar'],
        correctIndex: 1,
        explanation: 'We use "está" (from Estar) because the server being powered down is a temporary condition/state, not a permanent identity.'
      },
      {
        id: 'es-q2',
        question: 'What is the Spanish translation for "Database"?',
        options: ['Red informática', 'Base de datos', 'Lenguaje de programación', 'Sistema operativo'],
        correctIndex: 1,
        explanation: '"Base de datos" literally translates to "base of data", meaning database.'
      }
    ]
  },
  {
    id: 'lang-german',
    name: 'German',
    nativeName: 'Deutsch',
    flag: '🇩🇪',
    code: 'de-DE',
    level: 'Beginner',
    description: 'Master German for engineering, tech careers, and precision communication in German-speaking innovation hubs.',
    overviewSummary: 'German features compound words, precise grammatical cases (Nominative, Accusative, Dative, Genitive), and verb-second syntax in main clauses.',
    learningPath: createStandardLanguageLearningPath('German', '🇩🇪', 'lang-german'),
    grammarRules: [
      {
        title: 'Verb-Second (V2) Word Order',
        concept: 'In normal German main clauses, the conjugated verb MUST always occupy the second grammatical position, regardless of what comes first.',
        rule: 'Position 1 (Subject or Adverbial) + Position 2 (Conjugated Verb) + Remainder.',
        examples: [
          { original: 'Heute lerne ich Deutsch.', translated: 'Today I learn German. (Verb "lerne" sits in position 2).' },
          { original: 'Wir entwickeln eine neue Software.', translated: 'We are developing new software.' }
        ]
      },
      {
        title: 'Compound Nouns (Komposita)',
        concept: 'German links multiple nouns into a single word without spaces. The grammatical gender is ALWAYS determined by the last noun in the chain.',
        rule: 'Word 1 + Word 2 = Combined Term. (Das System + Die Architektur = Die Systemarchitektur).',
        examples: [
          { original: 'Die Datenverarbeitung', translated: 'Data processing (from Daten + Verarbeitung).' },
          { original: 'Der Quellcode', translated: 'Source code (from Quelle + Code).' }
        ]
      }
    ],
    vocabulary: [
      {
        id: 'de-1',
        word: 'Guten Tag, wie geht es Ihnen?',
        phonetic: 'GOO-ten TAHK, vee GAYT ess EE-nen',
        translation: 'Good day, how are you? (Formal)',
        category: 'Essentials',
        exampleSentence: 'Guten Tag, wie geht es Ihnen heute?',
        exampleTranslation: 'Good day, how are you doing today?'
      },
      {
        id: 'de-2',
        word: 'Die Softwareentwicklung',
        phonetic: 'dee ZOFT-vehr-ent-VIK-loong',
        translation: 'Software development',
        category: 'Engineering & Work',
        exampleSentence: 'Ich arbeite in der Softwareentwicklung.',
        exampleTranslation: 'I work in software development.'
      },
      {
        id: 'de-3',
        word: 'Der Fehler ist behoben',
        phonetic: 'dair FAY-ler ist beh-HOH-ben',
        translation: 'The bug is fixed',
        category: 'Engineering & Work',
        exampleSentence: 'Der Fehler in der Pipeline ist behoben.',
        exampleTranslation: 'The bug in the pipeline is fixed.'
      },
      {
        id: 'de-4',
        word: 'Vielen Dank für Ihre Hilfe',
        phonetic: 'FEE-len DAHNK feer EE-reh HIL-feh',
        translation: 'Thank you very much for your help',
        category: 'Essentials',
        exampleSentence: 'Vielen Dank für Ihre Hilfe bei der Fehlerbehebung.',
        exampleTranslation: 'Thank you very much for your help with debugging.'
      }
    ],
    dialogues: [
      {
        id: 'de-diag-1',
        title: 'Technical Discussion with Tech Lead',
        scenario: 'Discussing system scalability and server latency in Berlin office.',
        lines: [
          { speaker: 'Hans (Lead)', text: 'Hallo Lukas! Wie steht es um die Latenz unserer API?', translation: 'Hello Lukas! How is the latency of our API looking?' },
          { speaker: 'Lukas (Dev)', text: 'Die Latenz liegt jetzt unter fünfzig Millisekunden.', translation: 'The latency is now under fifty milliseconds.' },
          { speaker: 'Hans (Lead)', text: 'Sehr gut gemacht! Das beschleunigt unser ganzes System.', translation: 'Very well done! That accelerates our entire system.' }
        ]
      }
    ],
    practiceQuiz: [
      {
        id: 'de-q1',
        question: 'Where must the conjugated verb sit in a German main clause?',
        options: ['Always at the end', 'In position 2', 'At the very beginning', 'Position 3'],
        correctIndex: 1,
        explanation: 'The Verb-Second (V2) rule mandates that the finite verb sits in the second slot of the main clause.'
      }
    ]
  },
  {
    id: 'lang-japanese',
    name: 'Japanese',
    nativeName: '日本語',
    flag: '🇯🇵',
    code: 'ja-JP',
    level: 'Beginner',
    description: 'Learn foundational Japanese, phonetic Hiragana/Katakana essentials, tech company etiquette, and everyday software terms.',
    overviewSummary: 'Japanese utilizes Subject-Object-Verb (SOV) structure with grammatical particles (は, が, を, に) to denote syntactic roles.',
    learningPath: createStandardLanguageLearningPath('Japanese', '🇯🇵', 'lang-japanese'),
    grammarRules: [
      {
        title: 'Subject-Object-Verb (SOV) Word Order',
        concept: 'Unlike English (SVO: "I code Python"), Japanese puts the verb strictly at the end of the sentence.',
        rule: 'Subject (wa) + Object (o) + Verb: わたし は パイソン を かきます (Watashi wa Python o kakimasu).',
        examples: [
          { original: '私はコードを書きます。', translated: 'I write code. (I [topic] code [object] write).' },
          { original: 'バグを見つけました。', translated: 'I found a bug. (Bug [object] found).' }
        ]
      },
      {
        title: 'Polite Form (Desu / Masu)',
        concept: 'Verbs in standard professional settings take the -masu ending; nouns and adjectives take desu.',
        rule: 'Dictionary verb -> Masu stem + masu (e.g. Taberu -> Tabemasu).',
        examples: [
          { original: 'よろしくお願いします。', translated: 'Please treat me favorably / Looking forward to working together.' },
          { original: 'これは仕様です。', translated: 'This is the specification / intended behavior.' }
        ]
      }
    ],
    vocabulary: [
      {
        id: 'ja-1',
        word: 'こんにちは (Konnichiwa)',
        phonetic: 'kohn-nee-chee-wah',
        translation: 'Hello / Good afternoon',
        category: 'Essentials',
        exampleSentence: '皆さん、こんにちは。',
        exampleTranslation: 'Hello everyone.'
      },
      {
        id: 'ja-2',
        word: 'エンジニア (Enjinia)',
        phonetic: 'en-jee-nee-ah',
        translation: 'Engineer / Developer',
        category: 'Engineering & Work',
        exampleSentence: '私はクラウドエンジニアです。',
        exampleTranslation: 'I am a cloud engineer.'
      },
      {
        id: 'ja-3',
        word: '了解しました (Ryoukai shimashita)',
        phonetic: 'ryoh-kye shee-mah-shee-tah',
        translation: 'Understood / Roger that',
        category: 'Engineering & Work',
        exampleSentence: 'はい、仕様の変更について了解しました。',
        exampleTranslation: 'Yes, understood regarding the specification changes.'
      },
      {
        id: 'ja-4',
        word: 'ありがとうございます (Arigatou gozaimasu)',
        phonetic: 'ah-ree-gah-toh goh-zeye-mahs',
        translation: 'Thank you very much (Polite)',
        category: 'Essentials',
        exampleSentence: 'コードレビュー、ありがとうございます。',
        exampleTranslation: 'Thank you very much for the code review.'
      }
    ],
    dialogues: [
      {
        id: 'ja-diag-1',
        title: 'Joining a Tokyo Engineering Team',
        scenario: 'Introducing yourself to teammates on your first day.',
        lines: [
          { speaker: 'Kenji (Manager)', text: '新しいメンバーの田中さんです。どうぞ！', translation: 'Here is our new team member, Tanaka-san. Go ahead!' },
          { speaker: 'Tanaka (Dev)', text: '初めまして、田中です。よろしくお願いします！', translation: 'Nice to meet you, I am Tanaka. Looking forward to working with you!' },
          { speaker: 'Team', text: 'ようこそ！一緒に頑張りましょう。', translation: 'Welcome! Let us do our best together.' }
        ]
      }
    ],
    practiceQuiz: [
      {
        id: 'ja-q1',
        question: 'What is the sentence structure of standard Japanese?',
        options: ['Subject-Verb-Object (SVO)', 'Subject-Object-Verb (SOV)', 'Verb-Subject-Object (VSO)', 'Object-Verb-Subject (OVS)'],
        correctIndex: 1,
        explanation: 'Japanese places the verb at the very end of the sentence (Subject - Object - Verb).'
      }
    ]
  },
  {
    id: 'lang-french',
    name: 'French',
    nativeName: 'Français',
    flag: '🇫🇷',
    code: 'fr-FR',
    level: 'Beginner',
    description: 'Learn French for international organizations, tech startups in Paris, and European engineering collaboration.',
    overviewSummary: 'French is known for musical intonation, silent final consonants, and liaison connecting adjacent vowel sounds.',
    learningPath: createStandardLanguageLearningPath('French', '🇫🇷', 'lang-french'),
    grammarRules: [
      {
        title: 'Liaison & Phonetic Flow',
        concept: 'In French, normally silent consonants at the end of a word are pronounced when the following word begins with a vowel sound.',
        rule: 'Les (silent s) + amis (starts with a) = "Leh-zah-mee".',
        examples: [
          { original: 'Les ingénieurs travaillent.', translated: 'The engineers are working.' },
          { original: 'C’est une bonne idée.', translated: 'That is a good idea.' }
        ]
      }
    ],
    vocabulary: [
      {
        id: 'fr-1',
        word: 'Bonjour, comment allez-vous ?',
        phonetic: 'bohn-zhoor, koh-mahn tah-lay voo',
        translation: 'Hello, how are you? (Polite)',
        category: 'Essentials',
        exampleSentence: 'Bonjour, comment allez-vous aujourd’hui ?',
        exampleTranslation: 'Hello, how are you doing today?'
      },
      {
        id: 'fr-2',
        word: 'Le développement informatique',
        phonetic: 'luh day-vel-op-mahn an-for-mah-teek',
        translation: 'Computer programming / software development',
        category: 'Engineering & Work',
        exampleSentence: 'Il travaille dans le développement informatique.',
        exampleTranslation: 'He works in software development.'
      },
      {
        id: 'fr-3',
        word: 'Merci beaucoup',
        phonetic: 'mair-see boh-koo',
        translation: 'Thank you very much',
        category: 'Essentials',
        exampleSentence: 'Merci beaucoup pour votre aide.',
        exampleTranslation: 'Thank you very much for your help.'
      }
    ],
    dialogues: [
      {
        id: 'fr-diag-1',
        title: 'Project Kickoff Meeting',
        scenario: 'Greeting colleagues during a sprint planning session.',
        lines: [
          { speaker: 'Camille (Lead)', text: 'Bonjour à tous. Nous commençons la réunion de sprint.', translation: 'Hello everyone. We are starting the sprint meeting.' },
          { speaker: 'Lucas (Dev)', text: 'Parfait. Tous les tickets sont prêts pour validation.', translation: 'Perfect. All tickets are ready for validation.' }
        ]
      }
    ],
    practiceQuiz: [
      {
        id: 'fr-q1',
        question: 'How do you say "Thank you very much" in French?',
        options: ['De rien', 'Merci beaucoup', 'S’il vous plaît', 'À bientôt'],
        correctIndex: 1,
        explanation: '"Merci beaucoup" translates to "Thank you very much".'
      }
    ]
  },
  {
    id: 'lang-english-pro',
    name: 'Professional English',
    nativeName: 'Tech English',
    flag: '🇬🇧',
    code: 'en-US',
    level: 'Professional Tech',
    description: 'Master high-impact English for technical interviews, architecture defenses, executive presentations, and cross-border engineering teams.',
    overviewSummary: 'Focused on precision articulation, avoiding ambiguity in technical specs, and confident communication during code reviews and system design sessions.',
    learningPath: createStandardLanguageLearningPath('Professional Tech English', '🇬🇧', 'lang-english-pro'),
    grammarRules: [
      {
        title: 'Trade-off Articulation Structure',
        concept: 'Technical leaders frame architecture choices using clear conditional concessions rather than absolute claims.',
        rule: '"While [Option A] offers [Benefit], it introduces [Trade-off]; therefore, [Option B] is preferable for [Target Scale]."',
        examples: [
          { original: 'While microservices provide independent scalability, they introduce operational complexity.', translated: 'Clear executive trade-off framing.' },
          { original: 'To mitigate network partitions, we favor eventual consistency across availability zones.', translated: 'Architectural rationale.' }
        ]
      }
    ],
    vocabulary: [
      {
        id: 'en-1',
        word: 'Single Point of Failure (SPOF)',
        phonetic: 'SING-gul poynt ov FAYL-yer',
        translation: 'A component whose failure stops the entire system',
        category: 'Tech Vocabulary',
        exampleSentence: 'Eliminating the single point of failure was our primary objective.',
        exampleTranslation: 'Designing high availability prevents complete outages.'
      },
      {
        id: 'en-2',
        word: 'Decoupled Architecture',
        phonetic: 'dee-KUP-uld AHR-kih-tek-chur',
        translation: 'Independent components connected via clean APIs or message queues',
        category: 'Tech Vocabulary',
        exampleSentence: 'We migrated to a decoupled architecture to speed up deployments.',
        exampleTranslation: 'Isolated services reduce coordination overhead.'
      },
      {
        id: 'en-3',
        word: 'Bottleneck Identification',
        phonetic: 'BAHT-ul-nek eye-den-tih-fih-KAY-shun',
        translation: 'Pinpointing the slowest part of a pipeline or algorithm',
        category: 'Engineering & Work',
        exampleSentence: 'Profiling revealed the database lock as the principal bottleneck.',
        exampleTranslation: 'Identifying performance choke points.'
      }
    ],
    dialogues: [
      {
        id: 'en-diag-1',
        title: 'System Design Architecture Interview',
        scenario: 'Explaining a distributed caching strategy to a Senior Staff Engineer.',
        lines: [
          { speaker: 'Interviewer', text: 'How would you handle sudden traffic spikes on the read path?', translation: 'Question about scaling high read volume.' },
          { speaker: 'Candidate', text: 'I would introduce a distributed Redis cluster using a cache-aside pattern with TTLs to offload 95% of reads from the database.', translation: 'Precise technical solution with clear operational pattern.' },
          { speaker: 'Interviewer', text: 'Great. What strategy would you adopt to prevent cache stampedes?', translation: 'Follow-up query on concurrency resilience.' },
          { speaker: 'Candidate', text: 'We can implement mutex locking or probabilistic early expiration to ensure only a single worker computes the cache refresh.', translation: 'Senior-level edge-case mitigation.' }
        ]
      }
    ],
    practiceQuiz: [
      {
        id: 'en-q1',
        question: 'What does "Idempotent" mean in RESTful API design?',
        options: [
          'An endpoint that executes asynchronously in the background',
          'An operation that produces the same result no matter how many times it is repeated',
          'A route that requires high-level administrator permissions',
          'A database transaction that rolls back on any error'
        ],
        correctIndex: 1,
        explanation: 'Idempotency means multiple identical requests have the exact same side-effect as a single request (e.g. HTTP PUT or DELETE).'
      }
    ]
  },
  {
    id: 'lang-tamil',
    name: 'Tamil',
    nativeName: 'தமிழ்',
    flag: '🇮🇳',
    code: 'ta-IN',
    level: 'Beginner',
    description: 'Master conversational, professional, and software engineering Tamil. Build confidence speaking with tech teams across Chennai, Coimbatore, and international Tamil tech communities.',
    overviewSummary: 'Tamil is one of the longest-surviving classical languages with rich literature and a modern IT terminology ecosystem. It uses an agglutinative grammar where prefixes and suffixes convey tense, aspect, and respect.',
    learningPath: createStandardLanguageLearningPath('Tamil', '🇮🇳', 'lang-tamil'),
    grammarRules: [
      {
        title: 'Subject-Object-Verb (SOV) Word Order',
        concept: 'Unlike English (SVO), standard Tamil sentences position the verb at the very end of the clause.',
        rule: 'Subject + Object + Verb. Example: நான் (I) + நிரல் (code) + எழுதுகிறேன் (write).',
        examples: [
          { original: 'நான் மென்பொருள் உருவாக்குகிறேன்.', translated: 'I build software. (Verb உருவாக்குகிறேன் comes at the end).' },
          { original: 'அவர் தரவுத்தளத்தை ஆய்வு செய்கிறார்.', translated: 'He inspects the database.' }
        ]
      },
      {
        title: 'Polite vs. Informal Registers (நீ vs. நீங்கள்)',
        concept: 'Tamil features distinct pronouns for intimacy vs respect. In professional engineering teams, respectful forms are universally preferred.',
        rule: 'Use "நீங்கள்" (Neengal) with "-கள்" verb endings for teammates, clients, and interviewers. Use "நீ" (Nee) strictly for close personal friends.',
        examples: [
          { original: 'நீங்கள் எப்படி இருக்கிறீர்கள்?', translated: 'How are you? (Polite / Professional).' },
          { original: 'தயவுசெய்து சரிபாருங்கள்.', translated: 'Please review / verify this.' }
        ]
      },
      {
        title: 'Agglutinative Suffixes for Cases (வேற்றுமை உருபுகள்)',
        concept: 'Nouns change meaning by adding case suffixes rather than separate prepositions.',
        rule: 'Direct object adds -ஐ (-ai), locational "in/at" adds -இல் (-il), recipient "to" adds -க்கு (-kku).',
        examples: [
          { original: 'சர்வரில் (Server-il)', translated: 'In the server.' },
          { original: 'திட்டத்திற்கு (Thittathir-kku)', translated: 'For the project.' }
        ]
      }
    ],
    vocabulary: [
      {
        id: 'ta-1',
        word: 'வணக்கம் (Vanakkam)',
        phonetic: 'Vah-nuk-kum',
        translation: 'Hello / Greetings',
        category: 'Essentials',
        exampleSentence: 'அனைவருக்கும் காலை வணக்கம்.',
        exampleTranslation: 'Good morning everyone.'
      },
      {
        id: 'ta-2',
        word: 'நன்றி (Nandri)',
        phonetic: 'Nun-dree',
        translation: 'Thank you',
        category: 'Essentials',
        exampleSentence: 'உங்கள் உதவிக்கு மிக்க நன்றி.',
        exampleTranslation: 'Thank you very much for your help.'
      },
      {
        id: 'ta-3',
        word: 'மென்பொருள் பொறியாளர் (Menporul Poriyalar)',
        phonetic: 'Men-por-ul Poh-ree-yah-lur',
        translation: 'Software Engineer',
        category: 'Engineering & Work',
        exampleSentence: 'நான் ஒரு மென்பொருள் பொறியாளர்.',
        exampleTranslation: 'I am a software engineer.'
      },
      {
        id: 'ta-4',
        word: 'தரவுத்தளம் (Tharavuththekkam)',
        phonetic: 'Thuh-ruh-vooth-thehk-kum',
        translation: 'Database',
        category: 'Engineering & Work',
        exampleSentence: 'தரவுத்தளத்தில் புதிய அட்டவணை சேர்க்கப்பட்டது.',
        exampleTranslation: 'A new table was added to the database.'
      },
      {
        id: 'ta-5',
        word: 'நிரலாக்க மொழி (Niralakka Mozhi)',
        phonetic: 'Nee-ruh-lahk-kuh Moh-zhee',
        translation: 'Programming Language',
        category: 'Tech Vocabulary',
        exampleSentence: 'பைதான் ஒரு எளிய நிரலாக்க மொழி.',
        exampleTranslation: 'Python is a simple programming language.'
      },
      {
        id: 'ta-6',
        word: 'பிழைத்திருத்தம் (Pizhaithiruththam)',
        phonetic: 'Pee-zhye-thee-rooth-thum',
        translation: 'Debugging / Bug Fix',
        category: 'Tech Vocabulary',
        exampleSentence: 'பிழைத்திருத்தம் வெற்றிகரமாக முடிந்தது.',
        exampleTranslation: 'Debugging completed successfully.'
      },
      {
        id: 'ta-7',
        word: 'விரைவான செயலாக்கம் (Viraivaana Seyalaakkam)',
        phonetic: 'Vee-rye-vah-nuh Seh-yuh-lahk-kum',
        translation: 'High-speed / Low latency execution',
        category: 'Tech Vocabulary',
        exampleSentence: 'இந்த வழிமுறை விரைவான செயலாக்கத்தை அளிக்கிறது.',
        exampleTranslation: 'This algorithm delivers high-speed execution.'
      }
    ],
    dialogues: [
      {
        id: 'ta-diag-1',
        title: 'Chennai Tech Firm Standup (காலை ஆலோசனைக் கூட்டம்)',
        scenario: 'Two software engineers discussing sprint tasks and bug fixing in Chennai.',
        lines: [
          { speaker: 'Karthik (Lead)', text: 'காலை வணக்கம் அனிதா! நேற்றைய பணி நிலை என்ன?', translation: 'Good morning Anitha! What is yesterday\'s work status?' },
          { speaker: 'Anitha (Dev)', text: 'காலை வணக்கம் கார்த்திக். நான் ஏபிஐ பிழையை சரிசெய்து புல் ரிக்வெஸ்ட் அனுப்பியுள்ளேன்.', translation: 'Good morning Karthik. I fixed the API bug and opened a pull request.' },
          { speaker: 'Karthik (Lead)', text: 'மிக்க மகிழ்ச்சி! சர்வரில் ஏதேனும் தாமதம் உள்ளதா?', translation: 'Great! Is there any latency on the server?' },
          { speaker: 'Anitha (Dev)', text: 'இல்லை, செயல்திறன் மிகவும் சீராக உள்ளது. இன்று லைவ் செய்யலாம்.', translation: 'No, performance is very consistent. We can deploy live today.' }
        ]
      }
    ],
    practiceQuiz: [
      {
        id: 'ta-q1',
        question: 'What is the Tamil technical term for "Software"?',
        options: ['வன்பொருள் (Vanporul)', 'மென்பொருள் (Menporul)', 'திரை (Thirai)', 'விசைப்பலகை (Visaippalagai)'],
        correctIndex: 1,
        explanation: '"மென்பொருள்" (Menporul) is the standard Tamil translation for Software.'
      },
      {
        id: 'ta-q2',
        question: 'Which respectful greeting is used in professional workplace meetings?',
        options: ['வணக்கம் (Vanakkam)', 'வாடா (Vada)', 'போடா (Poda)', 'எங்கே (Engae)'],
        correctIndex: 0,
        explanation: '"வணக்கம்" (Vanakkam) is the dignified polite greeting appropriate for all professional contexts.'
      }
    ]
  }
];
