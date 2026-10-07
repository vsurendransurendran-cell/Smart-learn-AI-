import { DuolingoUnit } from '../../types';

export const JAPANESE_DUOLINGO_UNITS: DuolingoUnit[] = [
  {
    unitNumber: 1,
    title: 'Unit 1: Hiragana, Katakana & Tech Greetings',
    subtitle: 'Konnichiwa! Master Japanese phonetic syllabaries, polite introductions, and office greetings.',
    theme: 'Foundations & Social Greetings',
    color: 'from-rose-500 to-red-600',
    lessons: [
      {
        id: 'ja-u1-l1',
        unitNumber: 1,
        lessonNumber: 1,
        title: 'Konnichiwa & Daily Greetings',
        description: 'Learn polite introductions, Arigatou, and stating your name in Japanese.',
        icon: '🌸',
        xpReward: 15,
        exercises: [
          {
            id: 'ja-u1-l1-e1',
            type: 'translate_choice',
            prompt: 'Select the polite Japanese greeting for "Hello / Good Afternoon":',
            targetPhrase: 'こんにちは (Konnichiwa)',
            options: ['こんにちは (Konnichiwa)', 'さようなら (Sayounara)', 'おやすみなさい (Oyasuminasai)', 'いただきます (Itadakimasu)'],
            correctAnswer: 'こんにちは (Konnichiwa)',
            audioText: 'こんにちは',
            explanation: '"こんにちは" (Konnichiwa) is the standard polite daytime greeting in Japan.'
          },
          {
            id: 'ja-u1-l1-e2',
            type: 'word_bank',
            prompt: 'Assemble: "I am an engineer" in Japanese:',
            englishPrompt: 'I am an engineer.',
            correctAnswer: ['私は', 'エンジニア', 'です。'],
            wordBank: ['私は', 'エンジニア', 'です。', '学生', 'ではありません', '昨日'],
            audioText: '私はエンジニアです。',
            explanation: '"Watashi wa" (As for me) + "Enjinia" (Engineer) + "desu" (polite to be).'
          },
          {
            id: 'ja-u1-l1-e3',
            type: 'listening',
            prompt: 'Listen to the audio and select what you hear:',
            audioText: 'はじめまして、よろしくお願いします',
            options: [
              'はじめまして、よろしくお願いします',
              'おはようございます皆さん',
              'どういたしまして',
              'お疲れ様でした'
            ],
            correctAnswer: 'はじめまして、よろしくお願いします',
            explanation: '"Hajimemashite, yoroshiku onegaishimasu" is the standard introduction ("Nice to meet you, please treat me well").'
          },
          {
            id: 'ja-u1-l1-e4',
            type: 'match_pairs',
            prompt: 'Match Japanese greetings to English:',
            matchingPairs: [
              { term: 'おはようございます (Ohayou)', match: 'Good morning' },
              { term: 'ありがとうございます (Arigatou)', match: 'Thank you very much' },
              { term: 'お疲れ様です (Otsukaresama)', match: 'Thank you for your hard work' },
              { term: 'すみません (Sumimasen)', match: 'Excuse me / Sorry' }
            ],
            correctAnswer: 'all_matched',
            explanation: 'Subarashii! Essential Japanese conversational phrases matched.'
          }
        ]
      },
      {
        id: 'ja-u1-l2',
        unitNumber: 1,
        lessonNumber: 2,
        title: 'Developer Katakana & Cloud Tech',
        description: 'Learn Katakana tech terms: sabā, kuroudo, puroguramingu, and tesuto.',
        icon: '🗾',
        xpReward: 20,
        exercises: [
          {
            id: 'ja-u1-l2-e1',
            type: 'translate_choice',
            prompt: 'What does "サーバー" (Sābā) mean?',
            targetPhrase: 'サーバー (Sābā)',
            options: ['Server', 'Software', 'System', 'Screen'],
            correctAnswer: 'Server',
            audioText: 'サーバー',
            explanation: 'Loan words from English use Katakana: サーバー = Server.'
          },
          {
            id: 'ja-u1-l2-e2',
            type: 'word_bank',
            prompt: 'Assemble: "The automated test passed successfully":',
            englishPrompt: 'The test passed successfully.',
            correctAnswer: ['テストが', '成功', 'しました。'],
            wordBank: ['テストが', '成功', 'しました。', '失敗', 'エラー', '今日'],
            audioText: 'テストが成功しました。',
            explanation: '"Tesuto ga seikou shimashita" = The test succeeded.'
          }
        ]
      }
    ]
  },
  {
    unitNumber: 2,
    title: 'Unit 2: Tokyo Tech Office & Engineering Keigo',
    subtitle: 'Communicate during daily standups, report task progress, and review PRs in Japanese IT companies.',
    theme: 'Engineering Collaboration & Keigo',
    color: 'from-indigo-600 to-purple-700',
    lessons: [
      {
        id: 'ja-u2-l1',
        unitNumber: 2,
        lessonNumber: 1,
        title: 'Morning Standup (Choureikai) & Task Updates',
        description: 'Report what you completed yesterday and your sprint goals for today.',
        icon: '💻',
        xpReward: 25,
        exercises: [
          {
            id: 'ja-u2-l1-e1',
            type: 'translate_choice',
            prompt: 'How do you say "Please check the pull request" in polite Japanese?',
            targetPhrase: 'プルリクエストをご確認ください',
            options: [
              'プルリクエストをご確認ください',
              'コードを削除しました',
              'サーバーを再起動します',
              '会議は中止になりました'
            ],
            correctAnswer: 'プルリクエストをご確認ください',
            audioText: 'プルリクエストをご確認ください',
            explanation: '"o-kakunin kudasai" is the polite business way to ask someone to review/check.'
          },
          {
            id: 'ja-u2-l1-e2',
            type: 'word_bank',
            prompt: 'Assemble: "Today I will fix the database error":',
            englishPrompt: 'Today I will fix the database error.',
            correctAnswer: ['今日、', 'データベースの', 'エラーを', '修正します。'],
            wordBank: ['今日、', 'データベースの', 'エラーを', '修正します。', '明日', '作成'],
            audioText: '今日、データベースのエラーを修正します。',
            explanation: '"Shuusei shimasu" (will fix/modify).'
          }
        ]
      }
    ]
  }
];
