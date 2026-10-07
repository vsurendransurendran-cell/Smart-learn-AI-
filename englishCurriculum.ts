import { DuolingoUnit } from '../../types';

export const ENGLISH_DUOLINGO_UNITS: DuolingoUnit[] = [
  {
    unitNumber: 1,
    title: 'Unit 1: High-Impact Technical Communication',
    subtitle: 'Clear, concise engineering articulation. Avoid ambiguity in pull requests and architectural specs.',
    theme: 'Technical Articulation & Precision',
    color: 'from-blue-600 to-indigo-700',
    lessons: [
      {
        id: 'en-u1-l1',
        unitNumber: 1,
        lessonNumber: 1,
        title: 'System Design & Trade-off Framing',
        description: 'Master the classic "While X, Y; therefore Z" trade-off structure for system reviews.',
        icon: '📐',
        xpReward: 20,
        exercises: [
          {
            id: 'en-u1-l1-e1',
            type: 'translate_choice',
            prompt: 'Which sentence best articulates a senior architectural trade-off?',
            targetPhrase: 'While microservices provide independent scaling, they introduce operational latency.',
            options: [
              'While microservices provide independent scaling, they introduce operational latency.',
              'Microservices are always better than monoliths with zero downsides.',
              'I like using Docker because it is cool.',
              'We should rewrite everything from scratch tomorrow.'
            ],
            correctAnswer: 'While microservices provide independent scaling, they introduce operational latency.',
            audioText: 'While microservices provide independent scaling, they introduce operational latency.',
            explanation: 'Executive engineering communication always acknowledges the trade-offs of design choices.'
          },
          {
            id: 'en-u1-l1-e2',
            type: 'word_bank',
            prompt: 'Assemble the sentence explaining eventual consistency:',
            englishPrompt: 'We favor eventual consistency to guarantee high write availability.',
            correctAnswer: ['We', 'favor', 'eventual', 'consistency', 'to', 'guarantee', 'high', 'availability.'],
            wordBank: ['We', 'favor', 'eventual', 'consistency', 'to', 'guarantee', 'high', 'availability.', 'reject', 'slow'],
            audioText: 'We favor eventual consistency to guarantee high write availability.',
            explanation: 'High-availability distributed systems balance consistency with partition tolerance (CAP Theorem).'
          },
          {
            id: 'en-u1-l1-e3',
            type: 'match_pairs',
            prompt: 'Match distributed systems terms to their precise definitions:',
            matchingPairs: [
              { term: 'Idempotency', match: 'Repeating the operation yields identical side effects' },
              { term: 'Single Point of Failure', match: 'A single component whose outage downs the whole system' },
              { term: 'Backpressure', match: 'Signaling upstream producers to throttle traffic' },
              { term: 'Circuit Breaker', match: 'Failing fast to prevent cascading degradation' }
            ],
            correctAnswer: 'all_matched',
            explanation: 'Outstanding! These are essential terms in Staff+ engineering evaluations.'
          }
        ]
      },
      {
        id: 'en-u1-l2',
        unitNumber: 1,
        lessonNumber: 2,
        title: 'Incident Postmortems & Root Cause Analysis (RCA)',
        description: 'Conduct blameless postmortems, articulate timeline sequences, and define action items.',
        icon: '🚨',
        xpReward: 25,
        exercises: [
          {
            id: 'en-u1-l2-e1',
            type: 'translate_choice',
            prompt: 'Select the best phrasing for blameless incident analysis:',
            targetPhrase: 'The deployment script lacked an automated rollback trigger upon health check timeout.',
            options: [
              'The deployment script lacked an automated rollback trigger upon health check timeout.',
              'The junior developer broke production by running the wrong script.',
              'Nobody tested the code before deploying on Friday afternoon.',
              'The server just died for no apparent reason.'
            ],
            correctAnswer: 'The deployment script lacked an automated rollback trigger upon health check timeout.',
            audioText: 'The deployment script lacked an automated rollback trigger upon health check timeout.',
            explanation: 'Blameless RCAs focus on systemic safeguards and automation rather than human fault.'
          }
        ]
      }
    ]
  },
  {
    unitNumber: 2,
    title: 'Unit 2: Technical Interview & Whiteboard Defense',
    subtitle: 'Excel in FAANG / Tier-1 tech interviews, behavioral questions, and live coding explanations.',
    theme: 'Interviews & Leadership Communication',
    color: 'from-purple-600 to-pink-600',
    lessons: [
      {
        id: 'en-u2-l1',
        unitNumber: 2,
        lessonNumber: 1,
        title: 'Explaining Time & Space Complexity',
        description: 'Articulate Big-O trade-offs clearly to interviewers before writing code.',
        icon: '⏱️',
        xpReward: 30,
        exercises: [
          {
            id: 'en-u2-l1-e1',
            type: 'translate_choice',
            prompt: 'How to explain hash table lookup complexity concisely?',
            targetPhrase: 'By utilizing a hash map, we achieve average O(1) constant time lookup.',
            options: [
              'By utilizing a hash map, we achieve average O(1) constant time lookup.',
              'We use a loop and it runs very fast.',
              'The time complexity is linear because we have an array.',
              'It takes zero seconds to find elements.'
            ],
            correctAnswer: 'By utilizing a hash map, we achieve average O(1) constant time lookup.',
            audioText: 'By utilizing a hash map, we achieve average O(1) constant time lookup.',
            explanation: 'Clear Big-O notation with worst vs average case context impresses interviewers.'
          }
        ]
      }
    ]
  }
];
