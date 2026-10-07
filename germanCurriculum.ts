import { DuolingoUnit } from '../../types';

export const GERMAN_DUOLINGO_UNITS: DuolingoUnit[] = [
  {
    unitNumber: 1,
    title: 'Unit 1: German Phonetics & V2 Sentence Structure',
    subtitle: 'Master Umlauts (ä, ö, ü), greeting etiquette, and the golden Verb-Second (V2) rule.',
    theme: 'Foundations & Precision Syntax',
    color: 'from-amber-600 to-yellow-600',
    lessons: [
      {
        id: 'de-u1-l1',
        unitNumber: 1,
        lessonNumber: 1,
        title: 'Guten Tag & Polite Communication',
        description: 'Learn Sie vs Du, polite office greetings, and introducing your tech title.',
        icon: '🇩🇪',
        xpReward: 15,
        exercises: [
          {
            id: 'de-u1-l1-e1',
            type: 'translate_choice',
            prompt: 'Select the formal German greeting for "Good day, how are you?":',
            targetPhrase: 'Guten Tag, wie geht es Ihnen?',
            options: ['Guten Tag, wie geht es Ihnen?', 'Tschüss, bis morgen!', 'Gute Nacht, schlaf gut', 'Keine Ahnung'],
            correctAnswer: 'Guten Tag, wie geht es Ihnen?',
            audioText: 'Guten Tag, wie geht es Ihnen?',
            explanation: '"Wie geht es Ihnen?" uses the formal capitalized pronoun "Ihnen" (Dative).'
          },
          {
            id: 'de-u1-l1-e2',
            type: 'word_bank',
            prompt: 'Assemble: "I am a software engineer in Berlin":',
            englishPrompt: 'I am a software engineer in Berlin.',
            correctAnswer: ['Ich', 'bin', 'Softwareentwickler', 'in', 'Berlin.'],
            wordBank: ['Ich', 'bin', 'Softwareentwickler', 'in', 'Berlin.', 'haben', 'heute', 'nicht'],
            audioText: 'Ich bin Softwareentwickler in Berlin.',
            explanation: 'German does not require an article before profession (say "Ich bin Ingenieur", not "Ich bin ein Ingenieur").'
          },
          {
            id: 'de-u1-l1-e3',
            type: 'listening',
            prompt: 'Listen to the audio and select what you hear:',
            audioText: 'Vielen Dank für Ihre Unterstützung',
            options: [
              'Vielen Dank für Ihre Unterstützung',
              'Guten Morgen allerseits',
              'Ich habe eine Frage zum Code',
              'Auf Wiedersehen bis nächste Woche'
            ],
            correctAnswer: 'Vielen Dank für Ihre Unterstützung',
            explanation: '"Vielen Dank für Ihre Unterstützung" means "Thank you very much for your support".'
          },
          {
            id: 'de-u1-l1-e4',
            type: 'match_pairs',
            prompt: 'Match German everyday terms:',
            matchingPairs: [
              { term: 'Guten Morgen', match: 'Good morning' },
              { term: 'Danke schön', match: 'Thank you very much' },
              { term: 'Bitte schön', match: 'You\'re welcome' },
              { term: 'Auf Wiedersehen', match: 'Goodbye' }
            ],
            correctAnswer: 'all_matched',
            explanation: 'Sehr gut! German etiquette mastered.'
          }
        ]
      },
      {
        id: 'de-u1-l2',
        unitNumber: 1,
        lessonNumber: 2,
        title: 'Numbers & Sprint Schedules',
        description: 'Telling time, numbers 1-100, and sprint deadline planning.',
        icon: '🕒',
        xpReward: 20,
        exercises: [
          {
            id: 'de-u1-l2-e1',
            type: 'translate_choice',
            prompt: 'What is the German word for "Fifteen"?',
            targetPhrase: 'Fünfzehn',
            options: ['Fünfzehn', 'Fünfzig', 'Zwanzig', 'Zehn'],
            correctAnswer: 'Fünfzehn',
            audioText: 'Fünfzehn',
            explanation: '"Fünf" (5) + "zehn" (10) = Fünfzehn (15).'
          },
          {
            id: 'de-u1-l2-e2',
            type: 'word_bank',
            prompt: 'Assemble: "The daily standup begins at nine o\'clock":',
            englishPrompt: 'The daily standup begins at nine o\'clock.',
            correctAnswer: ['Das', 'Daily', 'Standup', 'beginnt', 'um', 'neun', 'Uhr.'],
            wordBank: ['Das', 'Daily', 'Standup', 'beginnt', 'um', 'neun', 'Uhr.', 'gestern', 'Ende'],
            audioText: 'Das Daily Standup beginnt um neun Uhr.',
            explanation: 'Remember: Verb "beginnt" sits in position 2!'
          }
        ]
      }
    ]
  },
  {
    unitNumber: 2,
    title: 'Unit 2: Software Engineering & Agile Workplace',
    subtitle: 'Communicate effectively during sprints, bug fixing, and pull request reviews in German teams.',
    theme: 'Workplace Tech Collaboration',
    color: 'from-blue-600 to-cyan-700',
    lessons: [
      {
        id: 'de-u2-l1',
        unitNumber: 2,
        lessonNumber: 1,
        title: 'Bugs, Releases & CI/CD Pipelines',
        description: 'Report bugs, explain fix strategies, and announce pipeline status.',
        icon: '🐛',
        xpReward: 25,
        exercises: [
          {
            id: 'de-u2-l1-e1',
            type: 'translate_choice',
            prompt: 'Select the German phrase for "The bug in the pipeline is resolved":',
            targetPhrase: 'Der Fehler in der Pipeline ist behoben',
            options: [
              'Der Fehler in der Pipeline ist behoben',
              'Der Server ist komplett abgestürzt',
              'Wir brauchen ein neues Meeting',
              'Die Dokumentation fehlt'
            ],
            correctAnswer: 'Der Fehler in der Pipeline ist behoben',
            audioText: 'Der Fehler in der Pipeline ist behoben',
            explanation: '"Der Fehler ist behoben" is the standard phrase for "The bug has been fixed".'
          },
          {
            id: 'de-u2-l1-e2',
            type: 'word_bank',
            prompt: 'Assemble: "I pushed the commit to GitHub":',
            englishPrompt: 'I pushed the commit to GitHub.',
            correctAnswer: ['Ich', 'habe', 'den', 'Commit', 'gepusht.'],
            wordBank: ['Ich', 'habe', 'den', 'Commit', 'gepusht.', 'gelöscht', 'gestern', 'nein'],
            audioText: 'Ich habe den Commit gepusht.',
            explanation: 'In conversational German, past actions often use the Perfekt tense ("habe ... gepusht").'
          },
          {
            id: 'de-u2-l1-e3',
            type: 'match_pairs',
            prompt: 'Match German software engineering compound words:',
            matchingPairs: [
              { term: 'Die Softwareentwicklung', match: 'Software development' },
              { term: 'Die Datenverarbeitung', match: 'Data processing' },
              { term: 'Der Quellcode', match: 'Source code' },
              { term: 'Die Fehlerbehebung', match: 'Debugging / Troubleshooting' }
            ],
            correctAnswer: 'all_matched',
            explanation: 'Perfekt! Notice how compound nouns merge concepts into single nouns.'
          }
        ]
      }
    ]
  },
  {
    unitNumber: 3,
    title: 'Unit 3: Cloud Systems & Microservice Architecture',
    subtitle: 'System latency, database indexing, and cloud container scaling.',
    theme: 'Cloud Infrastructure & Systems',
    color: 'from-emerald-600 to-teal-700',
    lessons: [
      {
        id: 'de-u3-l1',
        unitNumber: 3,
        lessonNumber: 1,
        title: 'Scalability & Cloud Architecture',
        description: 'Explain high availability, Kubernetes clusters, and caching layers in German.',
        icon: '☁️',
        xpReward: 30,
        exercises: [
          {
            id: 'de-u3-l1-e1',
            type: 'translate_choice',
            prompt: 'What does "Die Hochverfügbarkeit" mean?',
            targetPhrase: 'Die Hochverfügbarkeit',
            options: ['High Availability', 'Low Latency', 'Memory Leak', 'Network Timeout'],
            correctAnswer: 'High Availability',
            audioText: 'Die Hochverfügbarkeit',
            explanation: '"Hoch" (High) + "Verfügbarkeit" (Availability).'
          },
          {
            id: 'de-u3-l1-e2',
            type: 'word_bank',
            prompt: 'Assemble: "We optimized the database query":',
            englishPrompt: 'We optimized the database query.',
            correctAnswer: ['Wir', 'haben', 'die', 'Datenbankabfrage', 'optimiert.'],
            wordBank: ['Wir', 'haben', 'die', 'Datenbankabfrage', 'optimiert.', 'zerstört', 'neu'],
            audioText: 'Wir haben die Datenbankabfrage optimiert.',
            explanation: '"Datenbankabfrage" = database query.'
          }
        ]
      }
    ]
  }
];
