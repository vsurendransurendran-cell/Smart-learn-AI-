import { DuolingoUnit } from '../../types';

export const SPANISH_DUOLINGO_UNITS: DuolingoUnit[] = [
  {
    unitNumber: 1,
    title: 'Unit 1: Essential Greetings & Phonetics',
    subtitle: 'Lay the foundations of pronunciation, formal vs informal greetings, and self-introduction.',
    theme: 'Foundations & Meet-and-Greet',
    color: 'from-amber-500 to-orange-600',
    lessons: [
      {
        id: 'es-u1-l1',
        unitNumber: 1,
        lessonNumber: 1,
        title: 'Hello & Basic Greetings',
        description: 'Learn common polite greetings and day-to-day hellos in Spanish.',
        icon: '👋',
        xpReward: 15,
        exercises: [
          {
            id: 'es-u1-l1-e1',
            type: 'translate_choice',
            prompt: 'Select the correct translation for "Hello, good morning":',
            targetPhrase: '¡Hola, buenos días!',
            options: ['¡Hola, buenos días!', '¡Adiós, buenas noches!', 'Muchas gracias', 'Por favor'],
            correctAnswer: '¡Hola, buenos días!',
            audioText: 'Hola, buenos días',
            explanation: '"Buenos días" is the standard morning greeting in Spanish, used until midday.'
          },
          {
            id: 'es-u1-l1-e2',
            type: 'word_bank',
            prompt: 'Translate this sentence into Spanish:',
            englishPrompt: 'How are you today?',
            correctAnswer: ['¿Cómo', 'estás', 'hoy?'],
            wordBank: ['¿Cómo', 'hoy?', 'estás', 'gracias', 'mucho', 'adiós', 'bueno'],
            audioText: '¿Cómo estás hoy?',
            explanation: '"¿Cómo estás?" is the informal way to ask how someone is doing; "hoy" means "today".'
          },
          {
            id: 'es-u1-l1-e3',
            type: 'listening',
            prompt: 'Listen to the audio and select what you hear:',
            audioText: 'Mucho gusto en conocerte',
            options: ['Mucho gusto en conocerte', 'Muchas gracias por todo', 'Hasta luego amigo', 'Buenas tardes profesor'],
            correctAnswer: 'Mucho gusto en conocerte',
            explanation: '"Mucho gusto en conocerte" translates to "Nice to meet you".'
          },
          {
            id: 'es-u1-l1-e4',
            type: 'fill_blank',
            prompt: 'Complete the sentence with the correct missing word:',
            blankSentence: 'Yo me ___ Carlos y soy de Madrid.',
            blankOptions: ['llamo', 'llama', 'llamas', 'llamamos'],
            correctAnswer: 'llamo',
            explanation: 'First-person singular "Yo" pairs with "me llamo" (My name is).'
          },
          {
            id: 'es-u1-l1-e5',
            type: 'match_pairs',
            prompt: 'Tap matching pairs to connect Spanish and English:',
            matchingPairs: [
              { term: 'Hola', match: 'Hello' },
              { term: 'Gracias', match: 'Thank you' },
              { term: 'Por favor', match: 'Please' },
              { term: 'Adiós', match: 'Goodbye' }
            ],
            correctAnswer: 'all_matched',
            explanation: 'Well done! You have mastered core Spanish politeness formulas.'
          }
        ]
      },
      {
        id: 'es-u1-l2',
        unitNumber: 1,
        lessonNumber: 2,
        title: 'Numbers & Time Coordination',
        description: 'Master numbers 1-20, telling time, and scheduling meetings.',
        icon: '⏰',
        xpReward: 20,
        exercises: [
          {
            id: 'es-u1-l2-e1',
            type: 'translate_choice',
            prompt: 'What is the correct Spanish word for "Ten"?',
            targetPhrase: 'Diez',
            options: ['Diez', 'Cinco', 'Veinte', 'Ocho'],
            correctAnswer: 'Diez',
            audioText: 'Diez',
            explanation: 'Numbers 1-10: uno, dos, tres, cuatro, cinco, seis, siete, ocho, nueve, diez.'
          },
          {
            id: 'es-u1-l2-e2',
            type: 'word_bank',
            prompt: 'Assemble the sentence: "The meeting is at three":',
            englishPrompt: 'The meeting is at three.',
            correctAnswer: ['La', 'reunión', 'es', 'a', 'las', 'tres.'],
            wordBank: ['La', 'reunión', 'es', 'a', 'las', 'tres.', 'ayer', 'ahora', 'cuatro'],
            audioText: 'La reunión es a las tres.',
            explanation: '"A las tres" means "at three o\'clock". Feminine plural "las" refers to "horas".'
          },
          {
            id: 'es-u1-l2-e3',
            type: 'match_pairs',
            prompt: 'Match Spanish numbers to their English digits:',
            matchingPairs: [
              { term: 'Cinco', match: '5' },
              { term: 'Quince', match: '15' },
              { term: 'Doce', match: '12' },
              { term: 'Veinte', match: '20' }
            ],
            correctAnswer: 'all_matched',
            explanation: 'Numbers are fundamental for meeting times and sprint estimations!'
          }
        ]
      }
    ]
  },
  {
    unitNumber: 2,
    title: 'Unit 2: Daily Workplace & Standup Conversations',
    subtitle: 'Communicate fluently during morning standups, sprint retrospectives, and code reviews.',
    theme: 'Agile Team Collaboration',
    color: 'from-blue-600 to-cyan-600',
    lessons: [
      {
        id: 'es-u2-l1',
        unitNumber: 2,
        lessonNumber: 1,
        title: 'Morning Standup & Sprint Updates',
        description: 'Explain what you did yesterday, what you are doing today, and any blockers.',
        icon: '📋',
        xpReward: 25,
        exercises: [
          {
            id: 'es-u2-l1-e1',
            type: 'translate_choice',
            prompt: 'Select the phrase for "I have a blocker with the API":',
            targetPhrase: 'Tengo un bloqueo con la API',
            options: [
              'Tengo un bloqueo con la API',
              'Terminé la tarea sin problemas',
              'El despliegue fue un éxito',
              'Voy a almorzar ahora'
            ],
            correctAnswer: 'Tengo un bloqueo con la API',
            audioText: 'Tengo un bloqueo con la API',
            explanation: '"Bloqueo" is used by dev teams across Latin America and Spain for a sprint blocker.'
          },
          {
            id: 'es-u2-l1-e2',
            type: 'word_bank',
            prompt: 'Assemble: "Yesterday I completed the database migration":',
            englishPrompt: 'Yesterday I completed the database migration.',
            correctAnswer: ['Ayer', 'completé', 'la', 'migración', 'de', 'datos.'],
            wordBank: ['Ayer', 'completé', 'la', 'migración', 'de', 'datos.', 'mañana', 'servidor', 'bloqueo'],
            audioText: 'Ayer completé la migración de datos.',
            explanation: '"Completé" is the preterite past tense of completar (I completed).'
          },
          {
            id: 'es-u2-l1-e3',
            type: 'fill_blank',
            prompt: 'Complete with the verb for "Today I am working on..." (trabajando):',
            blankSentence: 'Hoy estoy ___ en el nuevo componente.',
            blankOptions: ['trabajando', 'trabajé', 'trabajo', 'trabajar'],
            correctAnswer: 'trabajando',
            explanation: '"Estar + gerundio" (-ando/-iendo) indicates actions currently in progress.'
          },
          {
            id: 'es-u2-l1-e4',
            type: 'match_pairs',
            prompt: 'Match agile workflow terms:',
            matchingPairs: [
              { term: 'La tarea', match: 'The task' },
              { term: 'El bloqueo', match: 'The blocker' },
              { term: 'La solicitud de extracción', match: 'Pull Request (PR)' },
              { term: 'El despliegue', match: 'Deployment' }
            ],
            correctAnswer: 'all_matched',
            explanation: '¡Excelente! You are now prepared for daily international standups.'
          }
        ]
      },
      {
        id: 'es-u2-l2',
        unitNumber: 2,
        lessonNumber: 2,
        title: 'Pull Request Reviews & Code Comments',
        description: 'Give constructive code review feedback and discuss edge cases politely.',
        icon: '🔍',
        xpReward: 25,
        exercises: [
          {
            id: 'es-u2-l2-e1',
            type: 'translate_choice',
            prompt: 'How do you say "Please check line 45" in Spanish?',
            targetPhrase: 'Por favor revisa la línea cuarenta y cinco',
            options: [
              'Por favor revisa la línea cuarenta y cinco',
              'Borra todo el archivo',
              'El código no compila',
              'Cierra la solicitud'
            ],
            correctAnswer: 'Por favor revisa la línea cuarenta y cinco',
            audioText: 'Por favor revisa la línea cuarenta y cinco',
            explanation: '"Revisar" is the standard verb for inspecting or reviewing code.'
          },
          {
            id: 'es-u2-l2-e2',
            type: 'word_bank',
            prompt: 'Assemble: "This function has high complexity":',
            englishPrompt: 'This function has high complexity.',
            correctAnswer: ['Esta', 'función', 'tiene', 'alta', 'complejidad.'],
            wordBank: ['Esta', 'función', 'tiene', 'alta', 'complejidad.', 'bajo', 'error', 'rápido'],
            audioText: 'Esta función tiene alta complejidad.',
            explanation: 'Clean code discussions use exact adjectives: alta (high) vs baja (low).'
          }
        ]
      }
    ]
  },
  {
    unitNumber: 3,
    title: 'Unit 3: Cloud Systems & Technical Architecture',
    subtitle: 'Discuss microservices, cloud infrastructure, latency, and database scaling in Spanish.',
    theme: 'Technical Infrastructure & Cloud',
    color: 'from-emerald-600 to-teal-700',
    lessons: [
      {
        id: 'es-u3-l1',
        unitNumber: 3,
        lessonNumber: 1,
        title: 'Backend, APIs & Databases',
        description: 'Discuss RESTful endpoints, SQL indexing, and cache optimization.',
        icon: '⚡',
        xpReward: 30,
        exercises: [
          {
            id: 'es-u3-l1-e1',
            type: 'translate_choice',
            prompt: 'What is the Spanish translation for "Database replica"?',
            targetPhrase: 'Réplica de la base de datos',
            options: [
              'Réplica de la base de datos',
              'Página de inicio web',
              'Lenguaje de programación',
              'Memoria volátil'
            ],
            correctAnswer: 'Réplica de la base de datos',
            audioText: 'Réplica de la base de datos',
            explanation: '"Base de datos" is feminine, hence "la base de datos".'
          },
          {
            id: 'es-u3-l1-e2',
            type: 'word_bank',
            prompt: 'Assemble: "We reduced latency by forty percent":',
            englishPrompt: 'We reduced latency by forty percent.',
            correctAnswer: ['Redujimos', 'la', 'latencia', 'en', 'un', 'cuarenta', 'por', 'ciento.'],
            wordBank: ['Redujimos', 'la', 'latencia', 'en', 'un', 'cuarenta', 'por', 'ciento.', 'aumentamos', 'segundo'],
            audioText: 'Redujimos la latencia en un cuarenta por ciento.',
            explanation: '"Redujimos" is past tense of reducir (we reduced).'
          }
        ]
      }
    ]
  },
  {
    unitNumber: 4,
    title: 'Unit 4: Job Interview & Technical Presentation',
    subtitle: 'Defend architecture choices, describe career experiences, and handle interview questions.',
    theme: 'Career Mastery & Interviews',
    color: 'from-purple-600 to-indigo-700',
    lessons: [
      {
        id: 'es-u4-l1',
        unitNumber: 4,
        lessonNumber: 1,
        title: 'Technical Self-Introduction',
        description: 'Introduce your technical strengths, full-stack experience, and design philosophies.',
        icon: '💼',
        xpReward: 35,
        exercises: [
          {
            id: 'es-u4-l1-e1',
            type: 'translate_choice',
            prompt: 'How to say: "I have five years of experience in distributed systems"?',
            targetPhrase: 'Tengo cinco años de experiencia en sistemas distribuidos',
            options: [
              'Tengo cinco años de experiencia en sistemas distribuidos',
              'Quiero aprender informática hoy',
              'No conozco ninguna base de datos',
              'Estudio ingeniería en la universidad'
            ],
            correctAnswer: 'Tengo cinco años de experiencia en sistemas distribuidos',
            audioText: 'Tengo cinco años de experiencia en sistemas distribuidos',
            explanation: 'Spanish expresses age and experience using the verb "Tener" (to have).'
          },
          {
            id: 'es-u4-l1-e2',
            type: 'word_bank',
            prompt: 'Assemble: "My main strength is problem solving":',
            englishPrompt: 'My main strength is problem solving.',
            correctAnswer: ['Mi', 'principal', 'fortaleza', 'es', 'la', 'resolución', 'de', 'problemas.'],
            wordBank: ['Mi', 'principal', 'fortaleza', 'es', 'la', 'resolución', 'de', 'problemas.', 'debilidad', 'rápido'],
            audioText: 'Mi principal fortaleza es la resolución de problemas.',
            explanation: 'Essential phrase for tech interviews.'
          }
        ]
      }
    ]
  }
];
