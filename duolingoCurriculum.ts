import { DuolingoUnit } from '../types';
import { SPANISH_DUOLINGO_UNITS } from './curriculum/spanishCurriculum';
import { TAMIL_DUOLINGO_UNITS } from './curriculum/tamilCurriculum';
import { GERMAN_DUOLINGO_UNITS } from './curriculum/germanCurriculum';
import { JAPANESE_DUOLINGO_UNITS } from './curriculum/japaneseCurriculum';
import { ENGLISH_DUOLINGO_UNITS } from './curriculum/englishCurriculum';

export const FRENCH_DUOLINGO_UNITS: DuolingoUnit[] = [
  {
    unitNumber: 1,
    title: 'Unit 1: French Foundations & Tech Salutations',
    subtitle: 'Master French phonetics, nasal vowels, and introductory tech dialogues.',
    theme: 'Foundations & Workplace French',
    color: 'from-blue-600 to-indigo-700',
    lessons: [
      {
        id: 'fr-u1-l1',
        unitNumber: 1,
        lessonNumber: 1,
        title: 'Bonjour & Polite Salutations',
        description: 'Essential greetings and introductory polite phrases in French.',
        icon: '🥐',
        xpReward: 15,
        exercises: [
          {
            id: 'fr-u1-l1-e1',
            type: 'translate_choice',
            prompt: 'Select the French translation for "Good morning, how are you?":',
            targetPhrase: 'Bonjour, comment allez-vous ?',
            options: ['Bonjour, comment allez-vous ?', 'Bonsoir, au revoir', 'Merci beaucoup mon ami', 'S\'il vous plaît'],
            correctAnswer: 'Bonjour, comment allez-vous ?',
            audioText: 'Bonjour, comment allez-vous ?',
            explanation: '"Comment allez-vous ?" is the polite formal standard in professional environments.'
          },
          {
            id: 'fr-u1-l1-e2',
            type: 'word_bank',
            prompt: 'Translate: "I am a software engineer":',
            englishPrompt: 'I am a software engineer.',
            correctAnswer: ['Je', 'suis', 'ingénieur', 'logiciel.'],
            wordBank: ['Je', 'suis', 'ingénieur', 'logiciel.', 'tu', 'es', 'programme', 'très'],
            audioText: 'Je suis ingénieur logiciel.',
            explanation: '"Je suis" is "I am"; in French professions don\'t take the indefinite article "un/une".'
          },
          {
            id: 'fr-u1-l1-e3',
            type: 'listening',
            prompt: 'Listen and select the meaning:',
            audioText: 'Enchanté de faire votre connaissance',
            options: ['Pleased to make your acquaintance', 'Have a wonderful weekend', 'See you at tomorrow\'s meeting', 'Thank you for your assistance'],
            correctAnswer: 'Pleased to make your acquaintance',
            explanation: '"Enchanté" is the classic French expression for "Delighted / Pleased to meet you".'
          },
          {
            id: 'fr-u1-l1-e4',
            type: 'match_pairs',
            prompt: 'Match the French words to English:',
            matchingPairs: [
              { term: 'Bonjour', match: 'Hello' },
              { term: 'Merci', match: 'Thank you' },
              { term: 'Au revoir', match: 'Goodbye' },
              { term: 'Oui', match: 'Yes' }
            ],
            correctAnswer: 'all_matched',
            explanation: 'Excellent work! Essential French vocab mastered.'
          }
        ]
      },
      {
        id: 'fr-u1-l2',
        unitNumber: 1,
        lessonNumber: 2,
        title: 'Agile & Developer Vocabulary',
        description: 'Learn tech keywords: bug, code, deploy, database, and servers.',
        icon: '💻',
        xpReward: 20,
        exercises: [
          {
            id: 'fr-u1-l2-e1',
            type: 'translate_choice',
            prompt: 'What does "La base de données" mean?',
            targetPhrase: 'La base de données',
            options: ['The database', 'The network router', 'The cloud cluster', 'The keyboard'],
            correctAnswer: 'The database',
            audioText: 'La base de données',
            explanation: '"Données" is the French word for "data".'
          },
          {
            id: 'fr-u1-l2-e2',
            type: 'word_bank',
            prompt: 'Assemble: "We deploy the application today":',
            englishPrompt: 'We deploy the application today.',
            correctAnswer: ['Nous', 'déployons', 'l\'application', 'aujourd\'hui.'],
            wordBank: ['Nous', 'déployons', 'l\'application', 'aujourd\'hui.', 'hier', 'demain', 'serveur'],
            audioText: 'Nous déployons l\'application aujourd\'hui.',
            explanation: '"Déployons" is the 1st person plural (we) present of "déployer".'
          }
        ]
      }
    ]
  },
  {
    unitNumber: 2,
    title: 'Unit 2: Daily Standups & Code Collaboration',
    subtitle: 'Participate in agile standups, explain blockers, and request code reviews in French.',
    theme: 'Agile & Team Collaboration',
    color: 'from-purple-600 to-indigo-700',
    lessons: [
      {
        id: 'fr-u2-l1',
        unitNumber: 2,
        lessonNumber: 1,
        title: 'Standup & Daily Progress',
        description: 'Express what you completed and your tasks for today.',
        icon: '🚀',
        xpReward: 25,
        exercises: [
          {
            id: 'fr-u2-l1-e1',
            type: 'translate_choice',
            prompt: 'Select: "I have a blocker with the microservice":',
            targetPhrase: 'J\'ai un blocage avec le microservice',
            options: [
              'J\'ai un blocage avec le microservice',
              'Tout fonctionne parfaitement',
              'Je pars en vacances aujourd\'hui',
              'La réunion est annulée'
            ],
            correctAnswer: 'J\'ai un blocage avec le microservice',
            audioText: 'J\'ai un blocage avec le microservice',
            explanation: '"Un blocage" is the French term for a sprint blocker.'
          }
        ]
      }
    ]
  }
];

export const MANDARIN_DUOLINGO_UNITS: DuolingoUnit[] = [
  {
    unitNumber: 1,
    title: 'Unit 1: Mandarin Pinyin & Software Vocabulary',
    subtitle: 'Nǐ hǎo! Master the four tones, Pinyin, and core IT terms in Chinese.',
    theme: 'Foundations & Chinese Tech Ecosystem',
    color: 'from-emerald-600 to-teal-700',
    lessons: [
      {
        id: 'zh-u1-l1',
        unitNumber: 1,
        lessonNumber: 1,
        title: 'Greetings & Polite Form',
        description: 'Nǐ hǎo, xièxie, and introducing your name and tech specialty.',
        icon: '🏮',
        xpReward: 15,
        exercises: [
          {
            id: 'zh-u1-l1-e1',
            type: 'translate_choice',
            prompt: 'What is the standard Mandarin greeting for "Hello"?',
            targetPhrase: '你好 (Nǐ hǎo)',
            options: ['你好 (Nǐ hǎo)', '再见 (Zàijiàn)', '谢谢 (Xièxie)', '对不起 (Duìbuqǐ)'],
            correctAnswer: '你好 (Nǐ hǎo)',
            audioText: '你好',
            explanation: '"Nǐ" (you) + "hǎo" (good) is the universal greeting in the Chinese-speaking world.'
          },
          {
            id: 'zh-u1-l1-e2',
            type: 'word_bank',
            prompt: 'Assemble: "I am a programmer":',
            englishPrompt: 'I am a programmer.',
            correctAnswer: ['我是', '程序员。'],
            wordBank: ['我是', '程序员。', '你', '在', '很好', '什么'],
            audioText: '我是程序员。',
            explanation: '"Wǒ shì" (I am) + "chéngxùyuán" (programmer / software engineer).'
          },
          {
            id: 'zh-u1-l1-e3',
            type: 'match_pairs',
            prompt: 'Match Chinese characters to English:',
            matchingPairs: [
              { term: '谢谢 (Xièxie)', match: 'Thank you' },
              { term: '不客气 (Bù kèqi)', match: 'You\'re welcome' },
              { term: '再见 (Zàijiàn)', match: 'Goodbye' },
              { term: '早上好 (Zǎoshang hǎo)', match: 'Good morning' }
            ],
            correctAnswer: 'all_matched',
            explanation: 'Hěn bàng! Essential Mandarin social phrases matched.'
          }
        ]
      },
      {
        id: 'zh-u1-l2',
        unitNumber: 1,
        lessonNumber: 2,
        title: 'Code & Systems Terminology',
        description: 'Daìmǎ (Code), Fúwùqì (Server), Shùjùkù (Database), and Kāifā (Development).',
        icon: '💻',
        xpReward: 20,
        exercises: [
          {
            id: 'zh-u1-l2-e1',
            type: 'translate_choice',
            prompt: 'What does "数据库" (Shùjùkù) mean?',
            targetPhrase: '数据库 (Shùjùkù)',
            options: ['Database', 'Algorithm', 'Operating System', 'Compiler'],
            correctAnswer: 'Database',
            audioText: '数据库',
            explanation: '"Shùjù" (data) + "kù" (storehouse/warehouse) = Database.'
          },
          {
            id: 'zh-u1-l2-e2',
            type: 'word_bank',
            prompt: 'Assemble: "Write clean code":',
            englishPrompt: 'Write clean code.',
            correctAnswer: ['写', '干净的', '代码。'],
            wordBank: ['写', '干净的', '代码。', '看', '慢', '错误'],
            audioText: '写干净的代码。',
            explanation: '"Xiě" (write) + "gānjìng de" (clean) + "dàimǎ" (code).'
          }
        ]
      }
    ]
  },
  {
    unitNumber: 2,
    title: 'Unit 2: Daily Standups & High-Scale Systems',
    subtitle: 'Daily standups, Git branches, and distributed cloud microservices in Mandarin.',
    theme: 'Cloud Engineering & High Scale',
    color: 'from-red-600 to-amber-700',
    lessons: [
      {
        id: 'zh-u2-l1',
        unitNumber: 2,
        lessonNumber: 1,
        title: 'Daily Standup Updates',
        description: 'Report completed tasks and sprint roadblocks.',
        icon: '⚡',
        xpReward: 25,
        exercises: [
          {
            id: 'zh-u2-l1-e1',
            type: 'translate_choice',
            prompt: 'How to say "The bug has been fixed" in Chinese?',
            targetPhrase: 'Bug已经修复了 (Bug yǐjīng xiūfù le)',
            options: [
              'Bug已经修复了 (Bug yǐjīng xiūfù le)',
              '我们需要重新开会',
              '服务器宕机了',
              '今天没有任务'
            ],
            correctAnswer: 'Bug已经修复了 (Bug yǐjīng xiūfù le)',
            audioText: 'Bug已经修复了',
            explanation: '"Yǐjīng" (already) + "xiūfù" (repaired/fixed).'
          }
        ]
      }
    ]
  }
];

export const DUOLINGO_CURRICULUM: Record<string, DuolingoUnit[]> = {
  // Spanish
  'lang-es': SPANISH_DUOLINGO_UNITS,
  'lang-spanish': SPANISH_DUOLINGO_UNITS,

  // Tamil (தமிழ்)
  'lang-ta': TAMIL_DUOLINGO_UNITS,
  'lang-tamil': TAMIL_DUOLINGO_UNITS,

  // German
  'lang-de': GERMAN_DUOLINGO_UNITS,
  'lang-german': GERMAN_DUOLINGO_UNITS,

  // Japanese
  'lang-ja': JAPANESE_DUOLINGO_UNITS,
  'lang-japanese': JAPANESE_DUOLINGO_UNITS,

  // French
  'lang-fr': FRENCH_DUOLINGO_UNITS,
  'lang-french': FRENCH_DUOLINGO_UNITS,

  // Mandarin Chinese
  'lang-zh': MANDARIN_DUOLINGO_UNITS,
  'lang-mandarin': MANDARIN_DUOLINGO_UNITS,
  'lang-chinese': MANDARIN_DUOLINGO_UNITS,

  // Tech English
  'lang-en': ENGLISH_DUOLINGO_UNITS,
  'lang-english': ENGLISH_DUOLINGO_UNITS,
  'lang-english-pro': ENGLISH_DUOLINGO_UNITS
};

// Fallback generator for languages ensuring all tracks have step-by-step interactive lessons
export function getCurriculumForLanguage(langId: string): DuolingoUnit[] {
  if (DUOLINGO_CURRICULUM[langId]) {
    return DUOLINGO_CURRICULUM[langId];
  }

  const normalized = langId.replace(/^lang-/, '').toLowerCase();

  if (normalized.includes('english') || normalized.includes('en')) return ENGLISH_DUOLINGO_UNITS;
  if (normalized.includes('spanish') || normalized.includes('es')) return SPANISH_DUOLINGO_UNITS;
  if (normalized.includes('tamil') || normalized.includes('ta')) return TAMIL_DUOLINGO_UNITS;
  if (normalized.includes('german') || normalized.includes('de')) return GERMAN_DUOLINGO_UNITS;
  if (normalized.includes('japanese') || normalized.includes('ja')) return JAPANESE_DUOLINGO_UNITS;
  if (normalized.includes('french') || normalized.includes('fr')) return FRENCH_DUOLINGO_UNITS;
  if (normalized.includes('mandarin') || normalized.includes('chinese') || normalized.includes('zh')) return MANDARIN_DUOLINGO_UNITS;

  for (const key of Object.keys(DUOLINGO_CURRICULUM)) {
    const keyNorm = key.replace(/^lang-/, '').toLowerCase();
    if (keyNorm === normalized || normalized.startsWith(keyNorm) || keyNorm.startsWith(normalized)) {
      return DUOLINGO_CURRICULUM[key];
    }
  }

  return SPANISH_DUOLINGO_UNITS;
}
