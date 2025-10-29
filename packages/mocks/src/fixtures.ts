import { Course, Cohort, User, Assignment, Rubric, Submission, Grade, ChatMessage, Lesson } from '@teacher-ai/core';

// Teacher user
export const demoTeacher: User = {
  id: 't1',
  name: 'Alice Teacher',
  email: 'alice.teacher@example.com',
  role: 'teacher'
};

// Generate demo students
export const demoStudents: User[] = Array.from({ length: 10 }).map((_, i) => ({
  id: `s${i + 1}`,
  name: `Student ${i + 1}`,
  email: `student${i + 1}@example.com`,
  role: 'student'
}));

// Cohorts A and B
export const demoCohorts: Cohort[] = [
  {
    id: 'cA',
    name: 'Cohort A',
    students: demoStudents.slice(0, 5),
    teacher: demoTeacher
  },
  {
    id: 'cB',
    name: 'Cohort B',
    students: demoStudents.slice(5),
    teacher: demoTeacher
  }
];

// Lessons
export const demoLessons: Lesson[] = Array.from({ length: 6 }).map((_, i) => ({
  id: `l${i + 1}`,
  title: `Lesson ${i + 1}`,
  moduleId: 'm1',
  content: `Content for lesson ${i + 1}.`,
  objectives: [`Objective ${i + 1}`]
}));

// Rubric helper
const makeRubric = (id: string): Rubric => ({
  id,
  criteria: [
    { id: `${id}-c1`, description: 'Clarity', maxScore: 5 },
    { id: `${id}-c2`, description: 'Completeness', maxScore: 5 },
    { id: `${id}-c3`, description: 'Creativity', maxScore: 5 }
  ]
});

// Assignments
export const demoAssignments: Assignment[] = Array.from({ length: 4 }).map((_, i) => ({
  id: `a${i + 1}`,
  title: `Assignment ${i + 1}`,
  description: `Description for assignment ${i + 1}.`,
  dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * (i + 1)).toISOString(),
  rubric: makeRubric(`r${i + 1}`)
}));

// Submissions: some students submitted assignments
export const demoSubmissions: Submission[] = demoStudents.flatMap((student, idx) => {
  return demoAssignments.filter((_, aidx) => (idx + aidx) % 2 === 0).map((assignment) => ({
    id: `${student.id}-${assignment.id}`,
    assignmentId: assignment.id,
    studentId: student.id,
    content: `Submission by ${student.name} for ${assignment.title}.`,
    submittedAt: new Date().toISOString()
  }));
});

// Grades: partial graded submissions
export const demoGrades: Grade[] = demoSubmissions.map((sub) => ({
  id: `g-${sub.id}`,
  assignmentId: sub.assignmentId,
  studentId: sub.studentId,
  score: Math.floor(Math.random() * 15),
  feedback: 'Good job!'
}));

// Chat messages with some AI tutor replies
export const demoChatMessages: ChatMessage[] = [];
(() => {
  const channels = ['class', 'study-group'];
  for (let i = 0; i < 30; i++) {
    const isAi = i % 7 === 0;
    demoChatMessages.push({
      id: `m${i + 1}`,
      channelId: channels[i % channels.length],
      senderId: isAi ? 'ai' : demoStudents[i % demoStudents.length].id,
      content: isAi ? 'I am the AI tutor. How can I help?' : `Message ${i + 1}`,
      sentAt: new Date(Date.now() - (30 - i) * 60000).toISOString(),
      isAi
    });
  }
})();

// Demo course
export const demoCourse: Course = {
  id: 'course1',
  title: 'Algebra I',
  description: 'An introductory algebra course covering linear equations, inequalities and quadratics.',
  cohorts: demoCohorts,
  lessons: demoLessons
};

// Export a mutable array of courses seeded with the demo course. Admin pages
// can push new courses onto this array via the POST /api/courses handler.
export const demoCourses: Course[] = [demoCourse];