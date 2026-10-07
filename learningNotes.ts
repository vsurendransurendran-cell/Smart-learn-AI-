import { JAVA_27_NOTES, TopicLearningNote, TopicLearningVideo } from './notes/javaNotes';
import { OS_27_NOTES } from './notes/osNotes';
import { DBMS_27_NOTES } from './notes/dbmsNotes';
import { DSA_27_NOTES } from './notes/dsaNotes';

export type { TopicLearningNote, TopicLearningVideo };

export interface LearningNoteSection extends TopicLearningNote {
  title: string;
  theoryMarkdown: string;
  keyConcepts: {
    name: string;
    description: string;
    invariantOrFormula?: string;
  }[];
  codeSnippet?: {
    language: string;
    title: string;
    code: string;
    explanation: string;
  };
  complexityTable?: {
    operation: string;
    best: string;
    average: string;
    worst: string;
    space: string;
  }[];
  commonPitfalls: string[];
  examCheatsheet: string[];
}

export const ALL_108_TOPIC_NOTES: TopicLearningNote[] = [
  ...JAVA_27_NOTES,
  ...OS_27_NOTES,
  ...DBMS_27_NOTES,
  ...DSA_27_NOTES
];

// Provide backwards-compatible array for any views expecting COMPREHENSIVE_LEARNING_NOTES
export const COMPREHENSIVE_LEARNING_NOTES: LearningNoteSection[] = ALL_108_TOPIC_NOTES.map(note => {
  const keyConcepts = note.page1.sections.map(s => ({
    name: s.heading,
    description: s.content.slice(0, 160) + '...',
    invariantOrFormula: s.invariantFormula
  }));

  const theoryMarkdown = note.page1.sections
    .map(s => `### ${s.heading}\n${s.content}${s.diagramAscii ? '\n```\n' + s.diagramAscii + '\n```' : ''}`)
    .join('\n\n');

  return {
    ...note,
    title: `${note.topicName} - ${note.page1.title}`,
    theoryMarkdown,
    keyConcepts,
    codeSnippet: note.page2.codeExample,
    complexityTable: note.page2.complexityAnalysis,
    commonPitfalls: note.page2.commonPitfalls,
    examCheatsheet: note.page2.examCheatsheet,
    audioScript: note.audioScript
  };
});
