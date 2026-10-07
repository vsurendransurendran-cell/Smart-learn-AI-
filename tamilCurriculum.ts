import { DuolingoUnit } from '../../types';

export const TAMIL_DUOLINGO_UNITS: DuolingoUnit[] = [
  {
    unitNumber: 1,
    title: 'Unit 1: தமிழ் அடிப்படைகள் & வாழ்த்துகள் (Tamil Basics & Greetings)',
    subtitle: 'Learn classic Tamil greetings, polite expressions, and everyday phonetics.',
    theme: 'Foundations & Polite Greetings',
    color: 'from-amber-600 to-red-600',
    lessons: [
      {
        id: 'ta-u1-l1',
        unitNumber: 1,
        lessonNumber: 1,
        title: 'வணக்கம் (Hello & Greetings)',
        description: 'Master Vanakkam, Nandri, and introducing your name politely.',
        icon: '🙏',
        xpReward: 15,
        exercises: [
          {
            id: 'ta-u1-l1-e1',
            type: 'translate_choice',
            prompt: 'Select the traditional Tamil greeting for "Hello / Greetings":',
            targetPhrase: 'வணக்கம் (Vanakkam)',
            options: ['வணக்கம் (Vanakkam)', 'நன்றி (Nandri)', 'போய் வருகிறேன் (Poi Varugiren)', 'மன்னிக்கவும் (Mannikkavum)'],
            correctAnswer: 'வணக்கம் (Vanakkam)',
            audioText: 'வணக்கம்',
            explanation: '"வணக்கம்" (Vanakkam) is the universal polite Tamil greeting, accompanied by folding hands.'
          },
          {
            id: 'ta-u1-l1-e2',
            type: 'word_bank',
            prompt: 'Assemble the sentence: "How are you?" in Tamil:',
            englishPrompt: 'How are you?',
            correctAnswer: ['நீங்கள்', 'எப்படி', 'இருக்கிறீர்கள்?'],
            wordBank: ['நீங்கள்', 'இருக்கிறீர்கள்?', 'எப்படி', 'வணக்கம்', 'நன்றி', 'பெயர்'],
            audioText: 'நீங்கள் எப்படி இருக்கிறீர்கள்?',
            explanation: '"நீங்கள் எப்படி இருக்கிறீர்கள்?" (Neengal eppadi irukkireergal?) is the respectful way to ask "How are you?".'
          },
          {
            id: 'ta-u1-l1-e3',
            type: 'listening',
            prompt: 'Listen to the audio and select the phrase you hear:',
            audioText: 'மிக்க நன்றி',
            options: ['மிக்க நன்றி (Mikka Nandri)', 'காலை வணக்கம் (Kaalai Vanakkam)', 'மன்னிக்கவும் (Mannikkavum)', 'நல்வரவு (Nalvaravu)'],
            correctAnswer: 'மிக்க நன்றி (Mikka Nandri)',
            explanation: '"மிக்க நன்றி" (Mikka Nandri) means "Thank you very much".'
          },
          {
            id: 'ta-u1-l1-e4',
            type: 'fill_blank',
            prompt: 'Complete the sentence with the correct word for "My name is...":',
            blankSentence: 'என் ___ அலெக்ஸ் (My name is Alex).',
            blankOptions: ['பெயர்', 'ஊர்', 'வேலை', 'நண்பன்'],
            correctAnswer: 'பெயர்',
            explanation: '"என் பெயர்" (En peyar) translates to "My name".'
          },
          {
            id: 'ta-u1-l1-e5',
            type: 'match_pairs',
            prompt: 'Match Tamil greetings to their English meanings:',
            matchingPairs: [
              { term: 'வணக்கம் (Vanakkam)', match: 'Hello' },
              { term: 'நன்றி (Nandri)', match: 'Thank you' },
              { term: 'மன்னிக்கவும் (Mannikkavum)', match: 'Excuse me / Sorry' },
              { term: 'நல்வரவு (Nalvaravu)', match: 'Welcome' }
            ],
            correctAnswer: 'all_matched',
            explanation: 'அருமை! (Arumai / Wonderful!) You have mastered foundational Tamil politeness.'
          }
        ]
      },
      {
        id: 'ta-u1-l2',
        unitNumber: 1,
        lessonNumber: 2,
        title: 'எண்கள் & நேரம் (Numbers & Time Coordination)',
        description: 'Master numbers 1 to 10, calendar days, and scheduling appointments in Tamil.',
        icon: '⏰',
        xpReward: 20,
        exercises: [
          {
            id: 'ta-u1-l2-e1',
            type: 'translate_choice',
            prompt: 'What is the Tamil word for the number "One"?',
            targetPhrase: 'ஒன்று (Ondru)',
            options: ['ஒன்று (Ondru)', 'இரண்டு (Irandu)', 'மூன்று (Moondru)', 'நான்கு (Naangu)'],
            correctAnswer: 'ஒன்று (Ondru)',
            audioText: 'ஒன்று',
            explanation: 'Numbers 1-5: ஒன்று (1), இரண்டு (2), மூன்று (3), நான்கு (4), ஐந்து (5).'
          },
          {
            id: 'ta-u1-l2-e2',
            type: 'word_bank',
            prompt: 'Assemble: "The meeting is at three o\'clock":',
            englishPrompt: 'The meeting is at three o\'clock.',
            correctAnswer: ['கூட்டம்', 'மூன்று', 'மணிக்கு.'],
            wordBank: ['கூட்டம்', 'மணிக்கு.', 'மூன்று', 'நேற்று', 'இன்று', 'ஐந்து'],
            audioText: 'கூட்டம் மூன்று மணிக்கு.',
            explanation: '"கூட்டம்" (Koottam = Meeting), "மூன்று மணிக்கு" (Moondru manikku = at 3 o\'clock).'
          },
          {
            id: 'ta-u1-l2-e3',
            type: 'match_pairs',
            prompt: 'Match numbers in Tamil to English:',
            matchingPairs: [
              { term: 'ஐந்து (Aindhu)', match: 'Five (5)' },
              { term: 'பத்து (Pathu)', match: 'Ten (10)' },
              { term: 'இரண்டு (Irandu)', match: 'Two (2)' },
              { term: 'எட்டு (Ettu)', match: 'Eight (8)' }
            ],
            correctAnswer: 'all_matched',
            explanation: 'Correct! You now recognize foundational Tamil numerals.'
          }
        ]
      }
    ]
  },
  {
    unitNumber: 2,
    title: 'Unit 2: மென்பொருள் & கணினி கலைச்சொற்கள் (Software & Tech Terms)',
    subtitle: 'Learn everyday technical Tamil used by software engineers across Chennai and Coimbatore.',
    theme: 'Tech & Engineering Terminology',
    color: 'from-blue-600 to-indigo-700',
    lessons: [
      {
        id: 'ta-u2-l1',
        unitNumber: 2,
        lessonNumber: 1,
        title: 'நிரலாக்கம் & மென்பொருள் (Programming & Software)',
        description: 'Understand core IT terminology: Menporul, Niralakkam, and Tharavuththekkam.',
        icon: '💻',
        xpReward: 25,
        exercises: [
          {
            id: 'ta-u2-l1-e1',
            type: 'translate_choice',
            prompt: 'What does "மென்பொருள்" (Menporul) mean in English?',
            targetPhrase: 'மென்பொருள் (Menporul)',
            options: ['Software', 'Hardware', 'Network', 'Database'],
            correctAnswer: 'Software',
            audioText: 'மென்பொருள்',
            explanation: '"மென்" (Soft) + "பொருள்" (Object/Product) = Software. Hardware is "வன்பொருள்" (Vanporul).'
          },
          {
            id: 'ta-u2-l1-e2',
            type: 'word_bank',
            prompt: 'Assemble: "I write computer code":',
            englishPrompt: 'I write computer code.',
            correctAnswer: ['நான்', 'நிரல்', 'எழுதுகிறேன்.'],
            wordBank: ['நான்', 'நிரல்', 'எழுதுகிறேன்.', 'அவர்கள்', 'புத்தகம்', 'நேற்று'],
            audioText: 'நான் நிரல் எழுதுகிறேன்.',
            explanation: '"நான்" (I) + "நிரல்" (Code/Program) + "எழுதுகிறேன்" (am writing).'
          },
          {
            id: 'ta-u2-l1-e3',
            type: 'fill_blank',
            prompt: 'Complete with the word for "Database" (தரவுத்தளம்):',
            blankSentence: 'நமது பயன்பாடு கிளவுட் ___ பயன்படுத்துகிறது.',
            blankOptions: ['தரவுத்தளம்', 'திரை', 'விசைப்பலகை', 'சுட்டி'],
            correctAnswer: 'தரவுத்தளம்',
            explanation: '"தரவுத்தளம்" (Tharavuththekkam / Tharavuththezhagam / Tharavuththeerkam) represents Database.'
          },
          {
            id: 'ta-u2-l1-e4',
            type: 'match_pairs',
            prompt: 'Match tech terms to their Tamil equivalents:',
            matchingPairs: [
              { term: 'மென்பொருள் (Menporul)', match: 'Software' },
              { term: 'நிரலாக்கம் (Niralakkam)', match: 'Programming' },
              { term: 'தரவுத்தளம் (Tharavuththekkam)', match: 'Database' },
              { term: 'இணையம் (Inaiyam)', match: 'Internet / Web' }
            ],
            correctAnswer: 'all_matched',
            explanation: 'சிறப்பு! (Sirappu! / Excellent!) Technical Tamil terms mastered.'
          }
        ]
      },
      {
        id: 'ta-u2-l2',
        unitNumber: 2,
        lessonNumber: 2,
        title: 'அன்றாட அலுவலக உரையாடல் (Daily Standup & Collaboration)',
        description: 'Speak during daily Agile standups, report task progress, and discuss blockers.',
        icon: '🚀',
        xpReward: 25,
        exercises: [
          {
            id: 'ta-u2-l2-e1',
            type: 'translate_choice',
            prompt: 'How do you say "The task is completed" in Tamil?',
            targetPhrase: 'பணி முடிந்தது (Pani mudinthathu)',
            options: ['பணி முடிந்தது (Pani mudinthathu)', 'பணி தாமதமானது', 'பணி தொடங்கவில்லை', 'பணி ரத்து செய்யப்பட்டது'],
            correctAnswer: 'பணி முடிந்தது (Pani mudinthathu)',
            audioText: 'பணி முடிந்தது',
            explanation: '"பணி" (Task/Work) + "முடிந்தது" (Finished/Completed).'
          },
          {
            id: 'ta-u2-l2-e2',
            type: 'word_bank',
            prompt: 'Assemble: "Today I am fixing a bug":',
            englishPrompt: 'Today I am fixing a bug.',
            correctAnswer: ['இன்று', 'நான்', 'பிழையை', 'சரிசெய்கிறேன்.'],
            wordBank: ['இன்று', 'நான்', 'சரிசெய்கிறேன்.', 'பிழையை', 'நாளை', 'காலை'],
            audioText: 'இன்று நான் பிழையை சரிசெய்கிறேன்.',
            explanation: '"இன்று" (Today) + "நான்" (I) + "பிழையை" (the bug/error) + "சரிசெய்கிறேன்" (am fixing).'
          }
        ]
      }
    ]
  },
  {
    unitNumber: 3,
    title: 'Unit 3: கணினி கட்டமைப்பு & கிளவுட் (Cloud Architecture & Systems)',
    subtitle: 'Discuss servers, APIs, deployment, and cloud infrastructure.',
    theme: 'Cloud Infrastructure & High Availability',
    color: 'from-emerald-600 to-teal-700',
    lessons: [
      {
        id: 'ta-u3-l1',
        unitNumber: 3,
        lessonNumber: 1,
        title: 'சர்வர் & ஏபிஐ (Server & API Integration)',
        description: 'Explain endpoints, latency, and cloud deployment in Tamil engineering teams.',
        icon: '⚡',
        xpReward: 30,
        exercises: [
          {
            id: 'ta-u3-l1-e1',
            type: 'translate_choice',
            prompt: 'What is the Tamil term for "High Speed / Fast Processing"?',
            targetPhrase: 'விரைவான செயலாக்கம் (Viraivaana Seyalaakkam)',
            options: ['விரைவான செயலாக்கம் (Viraivaana Seyalaakkam)', 'மெதுவான வேகம்', 'நிறுத்தப்பட்டது', 'பிழை ஏற்பட்டது'],
            correctAnswer: 'விரைவான செயலாக்கம் (Viraivaana Seyalaakkam)',
            audioText: 'விரைவான செயலாக்கம்',
            explanation: '"விரைவான" (Fast/Rapid) + "செயலாக்கம்" (Processing/Execution).'
          },
          {
            id: 'ta-u3-l1-e2',
            type: 'word_bank',
            prompt: 'Assemble: "Deploy the new build to production":',
            englishPrompt: 'Deploy the new build to production.',
            correctAnswer: ['புதிய', 'பதிப்பை', 'லைவ்', 'செய்யுங்கள்.'],
            wordBank: ['புதிய', 'பதிப்பை', 'லைவ்', 'செய்யுங்கள்.', 'பழைய', 'நிறுத்து'],
            audioText: 'புதிய பதிப்பை லைவ் செய்யுங்கள்.',
            explanation: 'Modern Tamil dev teams combine classical roots with industry loan words.'
          }
        ]
      }
    ]
  },
  {
    unitNumber: 4,
    title: 'Unit 4: வேலை நேர்காணல் & தொழில்முறை உரையாடல் (Interview & Career Mastery)',
    subtitle: 'Excel in campus placements, technical interviews, and cross-team communication in Tamil Nadu tech hubs.',
    theme: 'Job Placements & Career Presentations',
    color: 'from-purple-600 to-pink-600',
    lessons: [
      {
        id: 'ta-u4-l1',
        unitNumber: 4,
        lessonNumber: 1,
        title: 'சுய அறிமுகம் (Self Introduction for Interviews)',
        description: 'Introduce your education, engineering projects, and career aspirations.',
        icon: '🎓',
        xpReward: 35,
        exercises: [
          {
            id: 'ta-u4-l1-e1',
            type: 'translate_choice',
            prompt: 'How do you say "I am interested in Artificial Intelligence" in Tamil?',
            targetPhrase: 'எனக்கு செயற்கை நுண்ணறிவில் ஆர்வம் உண்டு',
            options: [
              'எனக்கு செயற்கை நுண்ணறிவில் ஆர்வம் உண்டு',
              'எனக்கு விளையாட்டு பிடிக்கும்',
              'நான் இன்று விடுப்பில் உள்ளேன்',
              'நேர்காணல் முடிந்தது'
            ],
            correctAnswer: 'எனக்கு செயற்கை நுண்ணறிவில் ஆர்வம் உண்டு',
            audioText: 'எனக்கு செயற்கை நுண்ணறிவில் ஆர்வம் உண்டு',
            explanation: '"செயற்கை நுண்ணறிவு" (Seyarkai Nunnarivu) = Artificial Intelligence (AI).'
          },
          {
            id: 'ta-u4-l1-e2',
            type: 'word_bank',
            prompt: 'Assemble: "I completed my computer science project":',
            englishPrompt: 'I completed my computer science project.',
            correctAnswer: ['நான்', 'எனது', 'கணினித்', 'திட்டத்தை', 'முடித்தேன்.'],
            wordBank: ['நான்', 'எனது', 'கணினித்', 'திட்டத்தை', 'முடித்தேன்.', 'ஆசிரியர்', 'புத்தகம்'],
            audioText: 'நான் எனது கணினித் திட்டத்தை முடித்தேன்.',
            explanation: '"திட்டம்" (Thittam) = Project, "முடித்தேன்" (Mudithen) = Completed.'
          }
        ]
      }
    ]
  }
];
