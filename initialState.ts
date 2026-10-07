import { UserProfile, StudentStats, Achievement, NotificationItem } from '../types';

export const INITIAL_USER: UserProfile = {
  id: 'std-101',
  name: 'Alex Rivera',
  age: 21,
  mobileNumber: '+1 555-019-2834',
  isLoggedIn: false,
  email: 'student@smartlearn.ai',
  role: 'student',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  targetExam: 'GATE / Software Engineering Placements 2026',
  dailyGoalMinutes: 30,
  preferredLanguage: 'en',
  createdAt: '2026-09-01'
};

export const INITIAL_STATS: StudentStats = {
  totalAssessments: 0,
  totalQuestionsAnswered: 0,
  correctAnswers: 0,
  overallScorePercentage: 0,
  studyStreakDays: 0,
  totalXp: 0,
  currentLevel: 1,
  levelTitle: 'Novice Scholar',
  xpToNextLevel: 100,
  booksReadCount: 0,
  pagesReadCount: 0,
  weakTopicsCount: 0,
  needsImprovementCount: 0,
  strongTopicsCount: 0
};

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ach-first-step',
    title: 'First Step',
    description: 'Complete your first diagnostic assessment.',
    icon: 'Compass',
    category: 'quiz',
    unlocked: false,
    xpReward: 50,
    progress: 0,
    maxProgress: 1
  },
  {
    id: 'ach-adaptive-pilot',
    title: 'Adaptive Trailblazer',
    description: 'Launch and complete an adaptive dynamic difficulty quiz.',
    icon: 'Target',
    category: 'quiz',
    unlocked: false,
    xpReward: 75,
    progress: 0,
    maxProgress: 1
  },
  {
    id: 'ach-mastery-green',
    title: 'Strong Foundation',
    description: 'Score over 70% in any subject or topic assessment.',
    icon: 'Award',
    category: 'mastery',
    unlocked: false,
    xpReward: 100,
    progress: 0,
    maxProgress: 1
  },
  {
    id: 'ach-ten-questions',
    title: 'Question Cruncher',
    description: 'Answer 10 assessment questions accurately.',
    icon: 'CheckCircle2',
    category: 'quiz',
    unlocked: false,
    xpReward: 80,
    progress: 0,
    maxProgress: 10
  },
  {
    id: 'ach-ai-dialogue',
    title: 'Curious Inquirer',
    description: 'Ask AI Tutor for concept clarifications or mistake breakdowns.',
    icon: 'Bot',
    category: 'ai',
    unlocked: false,
    xpReward: 60,
    progress: 0,
    maxProgress: 3
  },
  {
    id: 'ach-five-pages',
    title: 'Voracious Reader',
    description: 'Read 5 pages from any library book or newspaper.',
    icon: 'BookOpen',
    category: 'library',
    unlocked: false,
    xpReward: 70,
    progress: 0,
    maxProgress: 5
  },
  {
    id: 'ach-full-book',
    title: 'Bibliophile Extraordinaire',
    description: 'Read all 15 pages of any single book in the library.',
    icon: 'BookMarked',
    category: 'library',
    unlocked: false,
    xpReward: 150,
    progress: 0,
    maxProgress: 15
  },
  {
    id: 'ach-three-streak',
    title: 'Consistency Champion',
    description: 'Maintain a 3-day active learning study streak.',
    icon: 'Flame',
    category: 'streak',
    unlocked: false,
    xpReward: 120,
    progress: 0,
    maxProgress: 3
  },
  {
    id: 'ach-code-lesson',
    title: 'Code Apprentice',
    description: 'Complete an interactive programming lesson from scratch to advanced.',
    icon: 'Code2',
    category: 'mastery',
    unlocked: false,
    xpReward: 100,
    progress: 0,
    maxProgress: 1
  },
  {
    id: 'ach-hard-certified',
    title: 'Certified Systems Architect',
    description: 'Pass the Hard Final Assessment (>=75%) and earn an official Certificate of Mastery.',
    icon: 'Award',
    category: 'mastery',
    unlocked: false,
    xpReward: 500,
    progress: 0,
    maxProgress: 1
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-welcome',
    title: 'Welcome to SmartLearn AI!',
    message: 'Your baseline is set to 0. Take your first Diagnostic Assessment to detect knowledge gaps and generate your personalized learning path.',
    type: 'system',
    timestamp: 'Just now',
    read: false,
    actionRoute: 'assessment'
  }
];
