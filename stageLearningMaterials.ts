// Multi-Page Learning Material Data Engine for Spoken Languages
// Provides structured, 4-page preparatory study materials before each stage assessment quiz

export interface StageVocabEntry {
  word: string;
  phonetic: string;
  translation: string;
  category: string;
  exampleSentence: string;
  exampleTranslation: string;
}

export interface StageDialogueLine {
  speaker: string;
  role: string;
  avatarColor: string;
  text: string;
  phonetic: string;
  translation: string;
}

export interface StageGrammarSection {
  ruleTitle: string;
  conceptSummary: string;
  keyRule: string;
  table?: {
    headers: string[];
    rows: string[][];
  };
  examples: { original: string; translated: string; note?: string }[];
}

export interface StageStudyPage {
  pageNumber: number;
  pageTitle: string;
  pageSubtitle: string;
  type: 'grammar' | 'vocab' | 'dialogue' | 'review';
  icon: string;
  readingTimeMinutes: number;
  grammarSections?: StageGrammarSection[];
  vocabulary?: StageVocabEntry[];
  dialogue?: {
    scenario: string;
    setting: string;
    lines: StageDialogueLine[];
    culturalTip: string;
  };
  reviewChecklist?: {
    summaryPoints: string[];
    commonMistakes: { mistake: string; correction: string; why: string }[];
    readinessQuestions: string[];
  };
}

export interface StageLearningMaterial {
  stageNumber: number;
  stageName: string;
  levelBadge: string;
  languageName: string;
  flag: string;
  totalPages: number;
  pages: StageStudyPage[];
}

// Specialized detailed curriculum materials for key languages & stages
const SPANISH_MATERIALS: Record<number, StageStudyPage[]> = {
  1: [
    {
      pageNumber: 1,
      pageTitle: 'Grammar & Structural Foundations',
      pageSubtitle: 'Subject Pronouns, Ser vs. Estar, and Formal vs. Informal Registers',
      type: 'grammar',
      icon: 'BookOpen',
      readingTimeMinutes: 3,
      grammarSections: [
        {
          ruleTitle: 'Ser vs. Estar: The Two Spanish "To Be" Verbs',
          conceptSummary: 'Spanish distinguishes between permanent identity/essence (Ser) and temporary states/locations (Estar).',
          keyRule: 'Use SER for DOCTOR: Description, Occupation, Characteristic, Time, Origin, Relationship. Use ESTAR for PLACE: Position, Location, Action (progressives), Condition, Emotion.',
          table: {
            headers: ['Pronoun', 'Ser (Identity/Profession)', 'Estar (State/Location)'],
            rows: [
              ['Yo (I)', 'soy (Soy desarrollador)', 'estoy (Estoy ocupado)'],
              ['Tú (You - informal)', 'eres (Eres amable)', 'estás (Estás en la oficina)'],
              ['Él / Ella / Usted', 'es (Es ingeniero)', 'está (Está disponible)'],
              ['Nosotros/as (We)', 'somos (Somos un equipo)', 'estamos (Estamos listos)'],
              ['Ellos / Ellas / Ustedes', 'son (Son expertos)', 'están (Están en línea)']
            ]
          },
          examples: [
            { original: 'Soy ingeniero de software en SmartLearn.', translated: 'I am a software engineer at SmartLearn (Permanent profession -> Ser).', note: 'Do not use indefinite article "un" with professions unless modified by an adjective.' },
            { original: 'El servidor está caído en este momento.', translated: 'The server is down right now (Temporary state -> Estar).', note: 'Temporary condition uses estar.' },
            { original: '¿Cómo está usted?', translated: 'How are you? (Formal workplace register).', note: 'Use "usted" with colleagues and clients.' }
          ]
        },
        {
          ruleTitle: 'Direct Object Pronouns (lo, la, los, las)',
          conceptSummary: 'Replace direct nouns to avoid repetition. Match gender and number.',
          keyRule: 'Place before conjugated verbs: "los servidores" -> "Los reinicié" (I restarted them).',
          examples: [
            { original: 'Tengo el archivo. -> Lo tengo.', translated: 'I have the file. -> I have it.', note: 'El archivo (masculine singular) -> lo' },
            { original: 'Revisé las pruebas. -> Las revisé.', translated: 'I reviewed the tests. -> I reviewed them.', note: 'Las pruebas (feminine plural) -> las' }
          ]
        }
      ]
    },
    {
      pageNumber: 2,
      pageTitle: 'Core Vocabulary & Numbers',
      pageSubtitle: 'Essential Workplace Introductions, Cardinal Numbers & Time',
      type: 'vocab',
      icon: 'Library',
      readingTimeMinutes: 3,
      vocabulary: [
        { word: 'Buenos días', phonetic: 'BWE-nos DEE-as', translation: 'Good morning', category: 'Greetings', exampleSentence: 'Buenos días a todos, empecemos la reunión.', exampleTranslation: 'Good morning everyone, let us begin the meeting.' },
        { word: 'Mucho gusto', phonetic: 'MOO-cho GOOS-to', translation: 'Pleased to meet you', category: 'Greetings', exampleSentence: 'Mucho gusto, soy Alex, nuevo desarrollador frontend.', exampleTranslation: 'Nice to meet you, I am Alex, new frontend developer.' },
        { word: 'Setenta y cinco', phonetic: 'se-TEN-ta ee SEEN-ko', translation: 'Seventy-five (75)', category: 'Numbers', exampleSentence: 'Completamos setenta y cinco pruebas unitarias hoy.', exampleTranslation: 'We completed 75 unit tests today.' },
        { word: 'La reunión', phonetic: 'la reh-oo-NYON', translation: 'The meeting', category: 'Workplace', exampleSentence: 'La reunión diaria de sincronización es a las diez.', exampleTranslation: 'The daily sync meeting is at 10:00.' },
        { word: 'El servidor', phonetic: 'el ser-bee-DOR', translation: 'The server', category: 'Tech', exampleSentence: 'El servidor de producción está funcionando perfectamente.', exampleTranslation: 'The production server is running smoothly.' },
        { word: '¿Cómo está usted?', phonetic: 'KOH-mo es-TAH oos-TED', translation: 'How are you? (Formal)', category: 'Workplace', exampleSentence: 'Hola ingeniera, ¿cómo está usted hoy?', exampleTranslation: 'Hello engineer, how are you doing today?' }
      ]
    },
    {
      pageNumber: 3,
      pageTitle: 'Workplace Dialogue in Action',
      pageSubtitle: 'Daily Morning Standup & Welcome Introduction',
      type: 'dialogue',
      icon: 'MessageSquare',
      readingTimeMinutes: 3,
      dialogue: {
        scenario: 'First Day Tech Team Orientation',
        setting: 'Remote Zoom meeting room with Team Lead Carlos and new engineer Sofia.',
        lines: [
          { speaker: 'Carlos (Tech Lead)', role: 'Host', avatarColor: 'bg-violet-600', text: '¡Buenos días a todos! Bienvenidos a la reunión de sincronización. Hoy tenemos a una nueva compañera.', phonetic: 'BWE-nos DEE-as a TOH-dos! Byen-be-NEE-dos a la reh-oo-NYON...', translation: 'Good morning everyone! Welcome to the sync meeting. Today we have a new teammate.' },
          { speaker: 'Sofía (Software Engineer)', role: 'Participant', avatarColor: 'bg-emerald-600', text: 'Hola a todos, mucho gusto. Soy Sofía, ingeniera de backend. Estoy muy contenta de unirme al equipo.', phonetic: 'OH-la a TOH-dos, MOO-cho GOOS-to. Soy So-FEE-a...', translation: 'Hello everyone, pleased to meet you. I am Sofia, backend engineer. I am very happy to join the team.' },
          { speaker: 'Carlos (Tech Lead)', role: 'Host', avatarColor: 'bg-violet-600', text: 'Excelente, Sofía. ¿Tiene acceso a los repositorios de GitHub?', phonetic: 'Ek-se-LEN-te, So-FEE-a. TYEH-ne ak-SEH-so a los reh-po-see-TOH-ryos...?', translation: 'Excellent, Sofia. Do you have access to the GitHub repositories?' },
          { speaker: 'Sofía (Software Engineer)', role: 'Participant', avatarColor: 'bg-emerald-600', text: 'Sí, los tengo todos configurados en mi máquina. Todo está listo para comenzar.', phonetic: 'See, los TEN-go TOH-dos kon-fee-goo-RAH-dos... TOH-do es-TAH LEES-to...', translation: 'Yes, I have them all configured on my machine. Everything is ready to begin.' }
        ],
        culturalTip: 'In Spanish-speaking engineering teams, formal "usted" is typically used during first meetings and interviews, but teams quickly transition to friendly "tú" (tutear) once working together.'
      }
    },
    {
      pageNumber: 4,
      pageTitle: 'Stage 1 Cheat-Sheet & Quiz Readiness',
      pageSubtitle: 'Review Key Pitfalls and Ensure 100% Preparedness for the 5-Question Quiz',
      type: 'review',
      icon: 'CheckCircle2',
      readingTimeMinutes: 2,
      reviewChecklist: {
        summaryPoints: [
          'Permanent profession is ALWAYS "Soy ingeniero/a", never "Estoy ingeniero".',
          'Formal greeting uses "¿Cómo está usted?" (third person singular), whereas "¿Cómo estás?" is casual for close friends.',
          '75 is "setenta y cinco" (setenta = 70, sesenta = 60).',
          'Masculine plural direct object pronoun is "los" (e.g. los servidores -> los reinicié).',
          '"Buenos días a todos, empecemos la reunión" uses the polite cohortative subjunctive "empecemos" (let us start).'
        ],
        commonMistakes: [
          { mistake: 'Saying "Soy bien" when asked how you are.', correction: 'Say "Estoy bien, gracias."', why: '"Bien" describes a temporary physical/mental condition, requiring Estar.' },
          { mistake: 'Confusing 60 (sesenta) and 70 (setenta).', correction: 'Remember: seis -> sesenta; siete -> setenta.', why: 'A classic trap in Spanish listening and reading comprehension.' },
          { mistake: 'Using "un" before your job title: "Soy un programador".', correction: 'Omit "un": "Soy programador".', why: 'In Spanish, professions take no indefinite article unless accompanied by an adjective like "un programador talentoso".' }
        ],
        readinessQuestions: [
          'Can you confidently choose between Ser and Estar for a profession vs a server status?',
          'Do you know the difference between "tú" (informal) and "usted" (formal)?',
          'Are you ready to assemble workplace greetings and understand object pronouns?'
        ]
      }
    }
  ],
  2: [
    {
      pageNumber: 1,
      pageTitle: 'Past Tense & Prepositions in Tech',
      pageSubtitle: 'Pretérito Indefinido for Completed Tasks & "Por vs. Para"',
      type: 'grammar',
      icon: 'BookOpen',
      readingTimeMinutes: 3,
      grammarSections: [
        {
          ruleTitle: 'Pretérito Indefinido: Reporting Completed Standup Tasks',
          conceptSummary: 'Use the preterite to describe actions completed at a specific point in past time (e.g. yesterday, last sprint).',
          keyRule: '-AR verbs take: -é, -aste, -ó, -amos, -aron. -ER/-IR verbs take: -í, -iste, -ió, -imos, -ieron.',
          table: {
            headers: ['Verb', 'Yo (Yesterday I...)', 'Él/Ella (She/He...)', 'Nosotros (We...)'],
            rows: [
              ['Arreglar (To fix)', 'arreglé (Ayer arreglé el bug)', 'arregló (Ella arregló la API)', 'arreglamos (Arreglamos el issue)'],
              ['Terminar (To finish)', 'terminé (Terminé el ticket)', 'terminó (Terminó el script)', 'terminamos (Terminamos la sprint)'],
              ['Escribir (To write)', 'escribí (Escribí los tests)', 'escribió (Escribió la doc)', 'escribimos (Escribimos el código)']
            ]
          },
          examples: [
            { original: 'Ayer arreglé el error de autenticación.', translated: 'Yesterday I fixed the authentication error.', note: 'Arreglé is first-person singular preterite.' },
            { original: 'Hice el despliegue a producción esta mañana.', translated: 'I did the deployment to production this morning (Hacer -> hice).', note: 'Hacer is irregular in the preterite.' }
          ]
        },
        {
          ruleTitle: 'Por vs. Para: Deadlines vs. Causation',
          conceptSummary: 'Para indicates recipient, destination, and deadlines (by Friday). Por indicates reason, duration, or exchange.',
          keyRule: 'Deadline/Goal = PARA ("Estará listo para el viernes"). Reason/Duration = POR ("Trabajé por 4 horas").',
          examples: [
            { original: 'El microservicio estará listo para el viernes.', translated: 'The microservice will be ready for/by Friday.', note: 'Para = specific deadline.' },
            { original: 'El sistema falló por una fuga de memoria.', translated: 'The system failed due to/because of a memory leak.', note: 'Por = cause or reason.' }
          ]
        }
      ]
    },
    {
      pageNumber: 2,
      pageTitle: 'Workplace Hardware & Sprint Terms',
      pageSubtitle: 'Peripherals, Sprint Status, and Standup Vocabulary',
      type: 'vocab',
      icon: 'Library',
      readingTimeMinutes: 3,
      vocabulary: [
        { word: 'La pantalla', phonetic: 'la pan-TA-ya', translation: 'The monitor / display screen', category: 'Hardware', exampleSentence: 'Necesito una segunda pantalla para programar.', exampleTranslation: 'I need a second monitor for programming.' },
        { word: 'El teclado', phonetic: 'el teh-KLAH-do', translation: 'The keyboard', category: 'Hardware', exampleSentence: 'Mi teclado mecánico es muy cómodo.', exampleTranslation: 'My mechanical keyboard is very comfortable.' },
        { word: 'Bloqueado/a', phonetic: 'blo-keh-AH-do', translation: 'Blocked (having blockers)', category: 'Standup', exampleSentence: 'Estoy bloqueado esperando la clave de API.', exampleTranslation: 'I am blocked waiting for the API key.' },
        { word: 'En progreso', phonetic: 'en proh-GREH-so', translation: 'In progress', category: 'Standup', exampleSentence: 'La tarea de refactorización está en progreso.', exampleTranslation: 'The refactoring task is in progress.' },
        { word: 'El error / El fallo', phonetic: 'el eh-RROR / el FA-yo', translation: 'The bug / defect', category: 'Tech', exampleSentence: 'Encontré un fallo crítico en la pasarela de pagos.', exampleTranslation: 'I found a critical bug in the payment gateway.' },
        { word: 'El despliegue', phonetic: 'el des-PLYEH-geh', translation: 'The deployment', category: 'DevOps', exampleSentence: 'El despliegue al cluster de Kubernetes fue exitoso.', exampleTranslation: 'The deployment to the Kubernetes cluster was successful.' }
      ]
    },
    {
      pageNumber: 3,
      pageTitle: 'Sprint Standup Dialogue',
      pageSubtitle: 'Reporting Yesterday, Today, and Blockers in Agile Spanish',
      type: 'dialogue',
      icon: 'MessageSquare',
      readingTimeMinutes: 3,
      dialogue: {
        scenario: 'Daily Morning Agile Standup',
        setting: 'Remote Scrum meeting with Scrum Master Mariana and Developer Mateo.',
        lines: [
          { speaker: 'Mariana (Scrum Master)', role: 'Facilitator', avatarColor: 'bg-cyan-600', text: 'Mateo, cuéntanos tus avances del sprint.', phonetic: 'Mah-TEH-o, KWEN-tah-nos toos ah-VAN-ses del sprint.', translation: 'Mateo, tell us your sprint updates.' },
          { speaker: 'Mateo (Backend Dev)', role: 'Speaker', avatarColor: 'bg-amber-600', text: 'Ayer arreglé el error de autenticación OAuth y completé setenta pruebas.', phonetic: 'Ah-YER ah-rreh-GLEH el eh-RROR deh ow-ten-tee-kah-SYON...', translation: 'Yesterday I fixed the OAuth authentication bug and completed seventy tests.' },
          { speaker: 'Mariana (Scrum Master)', role: 'Facilitator', avatarColor: 'bg-cyan-600', text: '¡Excelente! ¿Qué tienes planeado para hoy? ¿Algún impedimento?', phonetic: 'Ehk-seh-LEN-teh! Keh TYEH-nes plah-neh-AH-do PAH-rah oy?', translation: 'Excellent! What do you have planned for today? Any blockers?' },
          { speaker: 'Mateo (Backend Dev)', role: 'Speaker', avatarColor: 'bg-amber-600', text: 'Hoy voy a optimizar las consultas SQL. No tengo ningún bloqueo; estará listo para el viernes.', phonetic: 'Oy voy ah op-tee-mee-ZAHR lahs kon-SOOL-tahs SQL...', translation: 'Today I am going to optimize SQL queries. I have no blockers; it will be ready by Friday.' }
        ],
        culturalTip: 'In standups, using the three-part format ("Ayer hice...", "Hoy haré...", "Estoy bloqueado por...") is standard practice across international dev teams.'
      }
    },
    {
      pageNumber: 4,
      pageTitle: 'Stage 2 Summary & Exam Tips',
      pageSubtitle: 'Key Rules Tested on the Stage 2 Assessment',
      type: 'review',
      icon: 'CheckCircle2',
      readingTimeMinutes: 2,
      reviewChecklist: {
        summaryPoints: [
          '"Ayer arreglé..." uses first-person singular preterite (-é for -AR verbs).',
          'Use PARA for deadlines ("para el viernes") and recipient/purpose.',
          'Use POR for causes, duration, and exchange ("por una fuga de memoria").',
          'Screen/monitor is "la pantalla" (feminine) and keyboard is "el teclado" (masculine).'
        ],
        commonMistakes: [
          { mistake: 'Using present tense "Ayer arreglo el bug".', correction: 'Use preterite: "Ayer arreglé el bug".', why: 'Time markers like "ayer" (yesterday) mandate past preterite.' },
          { mistake: 'Saying "listo por el viernes".', correction: 'Say "listo para el viernes".', why: 'Deadlines always take para.' }
        ],
        readinessQuestions: [
          'Do you know how to conjugate regular -AR and -ER verbs in the preterite?',
          'Can you describe hardware and peripheral equipment accurately?',
          'Can you distinguish between Para (deadline) and Por (cause)?'
        ]
      }
    }
  ]
};

// Adaptive multi-page generator for any language and stage (Japanese, German, French, Tamil, etc.)
export function getStageLearningMaterial(
  track: { id: string; name: string; nativeName: string; flag: string; code: string; learningPath: any[] },
  stageNumber: number
): StageLearningMaterial {
  const currentStage = track.learningPath.find(s => s.stageNumber === stageNumber) || track.learningPath[0];

  // If we have hand-crafted Spanish stage data, return it
  if (track.id === 'lang-spanish' && SPANISH_MATERIALS[stageNumber]) {
    return {
      stageNumber,
      stageName: currentStage.stageName,
      levelBadge: currentStage.levelBadge,
      languageName: track.name,
      flag: track.flag,
      totalPages: SPANISH_MATERIALS[stageNumber].length,
      pages: SPANISH_MATERIALS[stageNumber]
    };
  }

  // Generate dynamic, rich 4-page curriculum based on stage metadata
  const stageObjectives = currentStage.objectives || [
    `Master foundational syntax and grammatical rules for ${track.name}`,
    `Acquire ${currentStage.vocabularyCount || 300}+ workplace and technical terms`,
    'Engage in professional workplace conversations and pull request discussions',
    'Demonstrate fluency and pass the 5-question comprehension check'
  ];

  const grammarFocus = currentStage.grammarFocus || 'Sentence structure, core verbs, tense agreement, and workplace etiquette';
  const keyTopics = currentStage.keyTopics || ['Core Syntax', 'Workplace Terms', 'Technical Dialogue', 'Comprehension Review'];

  const pages: StageStudyPage[] = [
    // Page 1: Grammar & Core Syntactic Rules
    {
      pageNumber: 1,
      pageTitle: `${track.name} Grammar & Syntactic Mechanics`,
      pageSubtitle: `Mastering ${currentStage.levelBadge} Grammar Focus & Sentence Construction`,
      type: 'grammar',
      icon: 'BookOpen',
      readingTimeMinutes: 3,
      grammarSections: [
        {
          ruleTitle: `Key Grammar Foundation: ${currentStage.keyTopics?.[0] || 'Core Syntax'}`,
          conceptSummary: `In this stage of ${track.name}, accuracy in sentence structure and tense agreement is essential for clear professional communication.`,
          keyRule: `Grammar Focus: ${grammarFocus}. Ensure proper subject-verb agreement and formal workplace register.`,
          table: {
            headers: ['Syntactic Component', 'Rule in ' + track.name, 'Application / Context'],
            rows: [
              ['Word Order', 'Standard declarative phrasing', 'Forming clear workplace statements'],
              ['Verbal Invariants', 'Subject-predicate agreement', 'Reporting completed vs active tasks'],
              ['Polite Register', 'Professional / Honorific forms', 'Interviews, standups & code reviews'],
              ['Question Formation', 'Interrogative markers & intonation', 'Clarifying requirements & asking for help']
            ]
          },
          examples: [
            { original: `Example 1 (${track.nativeName} Structure)`, translated: 'Demonstrates proper verbal agreement for completed sprint tasks.', note: 'Pay special attention to regular vs irregular verb roots.' },
            { original: `Example 2 (${track.nativeName} Formal Register)`, translated: 'Used when addressing senior engineers, clients, and during interviews.', note: 'Matches the grammar tested on question 1 and 2 of this stage quiz.' }
          ]
        },
        {
          ruleTitle: 'Syntactic Invariants & Sentence Frames',
          conceptSummary: 'Use repeatable sentence frames during technical meetings to express progress, bottlenecks, and solutions without hesitation.',
          keyRule: 'Master sentence frames: [Time Marker] + [Subject] + [Verb (Past/Present)] + [Technical Object].',
          examples: [
            { original: 'Yesterday + [Action] + [Feature/Bug]', translated: 'Yesterday I finished implementing the database migration.', note: 'Past tense completed action.' },
            { original: 'Today + [Plan] + [Goal]', translated: 'Today I plan to review pull requests and update documentation.', note: 'Present / future intent.' }
          ]
        }
      ]
    },

    // Page 2: High-Yield Vocabulary & Technical Terminology
    {
      pageNumber: 2,
      pageTitle: 'High-Yield Vocabulary & Technical Terminology',
      pageSubtitle: `Target: ${currentStage.vocabularyCount || 300}+ Words • Workplace & Engineering Terms`,
      type: 'vocab',
      icon: 'Library',
      readingTimeMinutes: 3,
      vocabulary: [
        {
          word: track.code.startsWith('ja') ? 'おはようございます (Ohayou gozaimasu)' : track.code.startsWith('de') ? 'Guten Morgen' : track.code.startsWith('fr') ? 'Bonjour' : track.code.startsWith('ta') ? 'காலை வணக்கம் (Kaalai Vanakkam)' : 'Hello / Greetings',
          phonetic: 'Standard Formal Phonetics',
          translation: 'Good morning / Formal greeting',
          category: 'Essentials',
          exampleSentence: 'Used to open daily standups and engineering sync meetings.',
          exampleTranslation: 'Good morning everyone, let us begin our engineering sync.'
        },
        {
          word: track.code.startsWith('ja') ? 'サーバー (Saabaa) / データベース' : track.code.startsWith('de') ? 'Der Server / Die Datenbank' : track.code.startsWith('fr') ? 'Le serveur / La base de données' : track.code.startsWith('ta') ? 'சேவையகம் (Sevaiyagam)' : 'Server / Database',
          phonetic: 'Tech Pronunciation',
          translation: 'Server / Database System',
          category: 'Engineering & Work',
          exampleSentence: 'Production server status and database connectivity monitoring.',
          exampleTranslation: 'The server is operating at 99.9% uptime.'
        },
        {
          word: track.code.startsWith('ja') ? 'バグ修正 (Bagu shuusei) / 完了' : track.code.startsWith('de') ? 'Fehlerbehebung / Abgeschlossen' : track.code.startsWith('fr') ? 'Correction de bug / Terminé' : track.code.startsWith('ta') ? 'பிழை திருத்தம் (Pizhai thiruttam)' : 'Bug Fix / Completed',
          phonetic: 'Action Term',
          translation: 'Bug fix / Task completed',
          category: 'Engineering & Work',
          exampleSentence: 'Reporting resolved tickets in sprint retro.',
          exampleTranslation: 'I resolved the critical defect in authentication.'
        },
        {
          word: track.code.startsWith('ja') ? 'コードレビュー (Koudo rebyuu)' : track.code.startsWith('de') ? 'Code-Überprüfung (PR)' : track.code.startsWith('fr') ? 'Revue de code (PR)' : track.code.startsWith('ta') ? 'குறியீடு மதிப்பாய்வு' : 'Code Review / Pull Request',
          phonetic: 'Collaboration Term',
          translation: 'Code Review / Pull Request',
          category: 'Tech Vocabulary',
          exampleSentence: 'Collaborating constructively with teammates.',
          exampleTranslation: 'Please take a look at my pull request when you have a moment.'
        }
      ]
    },

    // Page 3: Conversational Workplace Dialogue
    {
      pageNumber: 3,
      pageTitle: 'Conversational Workplace Dialogue',
      pageSubtitle: 'Authentic Morning Standup & Technical Coordination',
      type: 'dialogue',
      icon: 'MessageSquare',
      readingTimeMinutes: 3,
      dialogue: {
        scenario: `${track.name} Engineering Standup & Sprint Planning`,
        setting: `International tech hub engineering sync conducted in ${track.name}.`,
        lines: [
          {
            speaker: 'Tech Lead / Facilitator',
            role: 'Lead',
            avatarColor: 'bg-violet-600',
            text: `[Formal Opening in ${track.name}] Team, let us review yesterday\'s accomplishments and today\'s sprint focus.`,
            phonetic: 'Clear articulation, natural cadence',
            translation: 'Good morning everyone! Let us check our sprint backlog and blockers.'
          },
          {
            speaker: 'Senior Developer',
            role: 'Speaker',
            avatarColor: 'bg-emerald-600',
            text: `[Progress Report in ${track.name}] Yesterday I completed the API endpoint and fixed the latency issue. All unit tests passed.`,
            phonetic: 'Accurate pronunciation with past tense markers',
            translation: 'Yesterday I finished the API integration and verified all tests pass.'
          },
          {
            speaker: 'Junior Engineer',
            role: 'Speaker',
            avatarColor: 'bg-amber-600',
            text: `[Clarification in ${track.name}] Today I am reviewing the system documentation. No blockers at this time.`,
            phonetic: 'Polite workplace register',
            translation: 'Today I am working on the documentation and test coverage.'
          }
        ],
        culturalTip: `When communicating in ${track.name} engineering teams, expressing gratitude ("Thank you for reviewing my code") and maintaining clear, respectful phrasing fosters strong professional rapport.`
      }
    },

    // Page 4: Stage Review Cheat-Sheet & Pre-Quiz Readiness
    {
      pageNumber: 4,
      pageTitle: `Stage ${stageNumber} Review & Quiz Readiness`,
      pageSubtitle: 'Key Rules & Exam Checklist for Passing the 5-Question Assessment',
      type: 'review',
      icon: 'CheckCircle2',
      readingTimeMinutes: 2,
      reviewChecklist: {
        summaryPoints: stageObjectives.map(obj => `Key Concept: ${obj}`),
        commonMistakes: [
          {
            mistake: `Using casual phrasing instead of formal workplace register in ${track.name}.`,
            correction: 'Always default to professional, polite forms during interviews and meetings.',
            why: 'Stage assessment questions emphasize accurate professional tone.'
          },
          {
            mistake: 'Confusing past completed actions with ongoing progressive actions.',
            correction: 'Verify time markers (e.g. yesterday vs today) before choosing verb forms.',
            why: 'Distinguishing tenses is a core focus of this stage quiz.'
          },
          {
            mistake: 'Direct translation of idioms from English into ' + track.name + '.',
            correction: 'Use authentic native collocations learned in Pages 1 and 2.',
            why: 'Prevents grammatical ambiguity and ensures natural phrasing.'
          }
        ],
        readinessQuestions: [
          `Do you understand the core grammar rules introduced in Stage ${stageNumber}?`,
          'Can you identify the essential vocabulary terms in context?',
          'Are you ready to answer 5 multiple-choice questions with at least 80% (4/5) to pass?'
        ]
      }
    }
  ];

  return {
    stageNumber,
    stageName: currentStage.stageName,
    levelBadge: currentStage.levelBadge,
    languageName: track.name,
    flag: track.flag,
    totalPages: pages.length,
    pages
  };
}
