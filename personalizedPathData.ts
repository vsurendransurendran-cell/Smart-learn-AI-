import { LearningPathStep, TopicPerformance } from '../types';

export interface CareerPathGoal {
  id: string;
  name: string;
  badge: string;
  description: string;
  coreSubjects: string[];
  icon: string;
  estimatedWeeks: number;
}

export const CAREER_GOALS: CareerPathGoal[] = [
  {
    id: 'fullstack-eng',
    name: 'Full-Stack Software Engineer',
    badge: 'ENTERPRISE TRACK',
    description: 'Master robust object-oriented backend design, scalable relational databases, and concurrent services.',
    coreSubjects: ['java', 'dbms', 'dsa'],
    icon: 'Layers',
    estimatedWeeks: 12
  },
  {
    id: 'faang-dsa',
    name: 'FAANG / LeetCode Algorithm Specialist',
    badge: 'TECHNICAL INTERVIEW TRACK',
    description: 'High-yield algorithmic patterns, pointer techniques, dynamic programming, and asymptotic proofs.',
    coreSubjects: ['dsa', 'java'],
    icon: 'Code2',
    estimatedWeeks: 8
  },
  {
    id: 'systems-architect',
    name: 'Systems Architect & OS Specialist',
    badge: 'DEEP-TECH TRACK',
    description: 'Kernel scheduling, virtual memory management, deadlock avoidance, and concurrency primitives.',
    coreSubjects: ['os', 'java', 'dbms'],
    icon: 'Cpu',
    estimatedWeeks: 10
  },
  {
    id: 'database-engineer',
    name: 'Database & Backend Scale Engineer',
    badge: 'INFRASTRUCTURE TRACK',
    description: 'Normalization, B-Tree index optimization, ACID transactional isolation, and query engines.',
    coreSubjects: ['dbms', 'os', 'dsa'],
    icon: 'Database',
    estimatedWeeks: 8
  },
  {
    id: 'gate-cs',
    name: 'GATE CS & Academic Excellence',
    badge: 'NATIONAL ACCREDITATION TRACK',
    description: 'Rigorous theoretical foundations across Operating Systems, DBMS, Algorithms, and Language runtimes.',
    coreSubjects: ['os', 'dbms', 'dsa', 'java'],
    icon: 'Award',
    estimatedWeeks: 14
  }
];

export const DEFAULT_PERSONALIZED_PATH: LearningPathStep[] = [
  {
    id: 'path-step-1',
    topicId: 'java-oop',
    topicName: 'Object-Oriented Principles',
    subjectName: 'Java Programming',
    priority: 'High',
    reason: 'Critical foundational milestone: Master encapsulation, dynamic method dispatch (vtable), and polymorphism before advancing.',
    currentPercentage: 45,
    status: 'Weak',
    completed: false,
    recommendedAction: 'Read Notes & Take Quiz'
  },
  {
    id: 'path-step-2',
    topicId: 'dsa-arrays-strings',
    topicName: 'Arrays & Strings',
    subjectName: 'Data Structures & Algorithms',
    priority: 'High',
    reason: 'Core algorithmic building block: Master two-pointer techniques, sliding windows, and in-place memory mutations.',
    currentPercentage: 55,
    status: 'Needs Improvement',
    completed: false,
    recommendedAction: 'Read Notes & Take Quiz'
  },
  {
    id: 'path-step-3',
    topicId: 'dbms-sql-joins',
    topicName: 'SQL Queries & Joins',
    subjectName: 'Database Management Systems',
    priority: 'High',
    reason: 'Essential backend requirement: Master inner, outer, and hash join execution mechanics and filtering order.',
    currentPercentage: 40,
    status: 'Weak',
    completed: false,
    recommendedAction: 'Read Notes & Take Quiz'
  },
  {
    id: 'path-step-4',
    topicId: 'os-scheduling',
    topicName: 'Process Scheduling',
    subjectName: 'Operating Systems',
    priority: 'Medium',
    reason: 'Systems foundation: Understand CPU burst time distributions, Round Robin time slicing, and Multilevel Feedback Queues.',
    currentPercentage: 60,
    status: 'Needs Improvement',
    completed: false,
    recommendedAction: 'Read Notes & Take Quiz'
  },
  {
    id: 'path-step-5',
    topicId: 'java-exceptions',
    topicName: 'Exception Handling',
    subjectName: 'Java Programming',
    priority: 'Medium',
    reason: 'Production reliability: Master try-with-resources, AutoCloseable contracts, and checked vs unchecked exceptions.',
    currentPercentage: 65,
    status: 'Needs Improvement',
    completed: false,
    recommendedAction: 'Read Notes & Take Quiz'
  },
  {
    id: 'path-step-6',
    topicId: 'dsa-linked-lists',
    topicName: 'Linked Lists',
    subjectName: 'Data Structures & Algorithms',
    priority: 'Medium',
    reason: 'Pointer manipulation fluency: Solve cycle detection with Floyd\'s Tortoise and Hare and master iterative list reversal.',
    currentPercentage: 50,
    status: 'Needs Improvement',
    completed: false,
    recommendedAction: 'Read Notes & Take Quiz'
  },
  {
    id: 'path-step-7',
    topicId: 'dbms-normalization',
    topicName: 'Normalization & Dependencies',
    subjectName: 'Database Management Systems',
    priority: 'High',
    reason: 'Architectural integrity: Eliminate partial and transitive functional dependencies up to 3NF and BCNF without loss of data.',
    currentPercentage: 42,
    status: 'Weak',
    completed: false,
    recommendedAction: 'Read Notes & Take Quiz'
  },
  {
    id: 'path-step-8',
    topicId: 'os-sync-deadlock',
    topicName: 'Synchronization & Deadlocks',
    subjectName: 'Operating Systems',
    priority: 'High',
    reason: 'Critical concurrency barrier: Master mutexes, semaphores, Banker\'s safety sequences, and eliminating circular wait.',
    currentPercentage: 48,
    status: 'Weak',
    completed: false,
    recommendedAction: 'Read Notes & Take Quiz'
  },
  {
    id: 'path-step-9',
    topicId: 'java-collections',
    topicName: 'Collections Framework',
    subjectName: 'Java Programming',
    priority: 'Medium',
    reason: 'High-throughput data storage: Understand internal HashMap bucket treeification and fail-fast iterator mechanics.',
    currentPercentage: 68,
    status: 'Needs Improvement',
    completed: false,
    recommendedAction: 'Read Notes & Take Quiz'
  },
  {
    id: 'path-step-10',
    topicId: 'dsa-stacks-queues',
    topicName: 'Stacks & Queues',
    subjectName: 'Data Structures & Algorithms',
    priority: 'Medium',
    reason: 'Operational evaluation: Implement circular queues with modulo pointer math and master Monotonic Stacks in O(n) time.',
    currentPercentage: 62,
    status: 'Needs Improvement',
    completed: false,
    recommendedAction: 'Read Notes & Take Quiz'
  }
];

/**
 * Dynamically synthesizes a personalized learning path based on:
 * - Selected Career Goal
 * - Student's diagnostic performance on topics
 * - Selected student experience level
 */
export function generatePersonalizedPath(
  goalId: string,
  level: 'Beginner' | 'Intermediate' | 'Advanced',
  topicPerformance: TopicPerformance[] = []
): LearningPathStep[] {
  const goal = CAREER_GOALS.find(g => g.id === goalId) || CAREER_GOALS[0];
  const perfMap = new Map<string, TopicPerformance>();
  topicPerformance.forEach(tp => perfMap.set(tp.topicId, tp));

  // Candidate topics mapped to subject
  const allCurriculumTopics: { topicId: string; topicName: string; subjectId: string; subjectName: string; defaultPriority: 'High' | 'Medium' }[] = [
    { topicId: 'java-oop', topicName: 'Object-Oriented Principles', subjectId: 'java', subjectName: 'Java Programming', defaultPriority: 'High' },
    { topicId: 'java-exceptions', topicName: 'Exception Handling', subjectId: 'java', subjectName: 'Java Programming', defaultPriority: 'Medium' },
    { topicId: 'java-collections', topicName: 'Collections Framework', subjectId: 'java', subjectName: 'Java Programming', defaultPriority: 'Medium' },
    { topicId: 'java-concurrency', topicName: 'Multithreading & Concurrency', subjectId: 'java', subjectName: 'Java Programming', defaultPriority: 'High' },
    { topicId: 'java-memory', topicName: 'Memory & Garbage Collection', subjectId: 'java', subjectName: 'Java Programming', defaultPriority: 'High' },
    
    { topicId: 'dsa-arrays-strings', topicName: 'Arrays & Strings', subjectId: 'dsa', subjectName: 'Data Structures & Algorithms', defaultPriority: 'High' },
    { topicId: 'dsa-linked-lists', topicName: 'Linked Lists', subjectId: 'dsa', subjectName: 'Data Structures & Algorithms', defaultPriority: 'Medium' },
    { topicId: 'dsa-stacks-queues', topicName: 'Stacks & Queues', subjectId: 'dsa', subjectName: 'Data Structures & Algorithms', defaultPriority: 'Medium' },
    { topicId: 'dsa-trees', topicName: 'Binary Trees & BST', subjectId: 'dsa', subjectName: 'Data Structures & Algorithms', defaultPriority: 'High' },
    { topicId: 'dsa-graphs', topicName: 'Graphs & Traversals', subjectId: 'dsa', subjectName: 'Data Structures & Algorithms', defaultPriority: 'High' },

    { topicId: 'os-scheduling', topicName: 'Process Scheduling', subjectId: 'os', subjectName: 'Operating Systems', defaultPriority: 'Medium' },
    { topicId: 'os-sync-deadlock', topicName: 'Synchronization & Deadlocks', subjectId: 'os', subjectName: 'Operating Systems', defaultPriority: 'High' },
    { topicId: 'os-paging', topicName: 'Memory Management & Paging', subjectId: 'os', subjectName: 'Operating Systems', defaultPriority: 'High' },
    { topicId: 'os-virtual-mem', topicName: 'Virtual Memory & Page Replacement', subjectId: 'os', subjectName: 'Operating Systems', defaultPriority: 'Medium' },
    { topicId: 'os-file-systems', topicName: 'File Systems & Storage', subjectId: 'os', subjectName: 'Operating Systems', defaultPriority: 'Medium' },

    { topicId: 'dbms-sql-joins', topicName: 'SQL Queries & Joins', subjectId: 'dbms', subjectName: 'Database Management Systems', defaultPriority: 'High' },
    { topicId: 'dbms-normalization', topicName: 'Normalization & Dependencies', subjectId: 'dbms', subjectName: 'Database Management Systems', defaultPriority: 'High' },
    { topicId: 'dbms-acid', topicName: 'Transactions & ACID Properties', subjectId: 'dbms', subjectName: 'Database Management Systems', defaultPriority: 'High' },
    { topicId: 'dbms-indexing', topicName: 'Indexing & B-Trees', subjectId: 'dbms', subjectName: 'Database Management Systems', defaultPriority: 'High' },
    { topicId: 'dbms-concurrency', topicName: 'Concurrency Control', subjectId: 'dbms', subjectName: 'Database Management Systems', defaultPriority: 'Medium' }
  ];

  // Filter topics based on the chosen career goal's core subjects
  const filtered = allCurriculumTopics.filter(t => goal.coreSubjects.includes(t.subjectId));

  // Sequence topics: Weak diagnostic scores first, then Needs Improvement, then foundational
  const steps: LearningPathStep[] = filtered.map((topic, idx) => {
    const perf = perfMap.get(topic.topicId);
    let percentage = perf ? perf.percentage : (level === 'Beginner' ? 45 : level === 'Intermediate' ? 60 : 75);
    let status: 'Weak' | 'Needs Improvement' | 'Strong' = 
      percentage < 50 ? 'Weak' : percentage < 70 ? 'Needs Improvement' : 'Strong';
    
    let priority: 'High' | 'Medium' = status === 'Weak' ? 'High' : topic.defaultPriority;
    let reason = '';

    if (status === 'Weak') {
      reason = `Priority Remedial Gap (${percentage}%): Diagnostic indicates fundamental misconceptions in ${topic.topicName}. Study core theory notes and pass the concept quiz to establish baseline mastery.`;
    } else if (status === 'Needs Improvement') {
      reason = `Skill Elevation Target (${percentage}%): Good foundational grasp. Solidify edge cases, production pitfalls, and asymptotic bounds via the targeted concept quiz.`;
    } else {
      reason = `Mastery Verification (${percentage}%): Maintain proficiency and test GATE / technical interview edge questions.`;
    }

    return {
      id: `tailored-step-${goalId}-${topic.topicId}-${idx}`,
      topicId: topic.topicId,
      topicName: topic.topicName,
      subjectName: topic.subjectName,
      priority,
      reason,
      currentPercentage: percentage,
      status,
      completed: status === 'Strong' && (perf?.attempts || 0) > 0,
      recommendedAction: 'Read Notes & Take Quiz'
    };
  });

  // Sort by priority: High priority first, then by lowest percentage
  steps.sort((a, b) => {
    if (a.priority === 'High' && b.priority !== 'High') return -1;
    if (b.priority === 'High' && a.priority !== 'High') return 1;
    return a.currentPercentage - b.currentPercentage;
  });

  return steps;
}
