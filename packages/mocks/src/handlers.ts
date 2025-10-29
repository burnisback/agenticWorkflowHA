import { rest } from 'msw';
import { demoCourse, demoCourses, demoAssignments, demoSubmissions, demoGrades, demoChatMessages, demoTeacher, demoStudents } from './fixtures';
import type { Assignment, Submission, Grade } from '@teacher-ai/core';

export const handlers = [
  // Courses
  rest.get('/api/courses', (_req, res, ctx) => {
    return res(ctx.json(demoCourses));
  }),
  rest.get('/api/courses/:courseId', (req, res, ctx) => {
    const { courseId } = req.params;
    const course = demoCourses.find((c) => c.id === courseId);
    return course ? res(ctx.json(course)) : res(ctx.status(404));
  }),
  rest.post('/api/courses', async (req, res, ctx) => {
    const data = (await req.json()) as any;
    demoCourses.push(data);
    return res(ctx.status(201), ctx.json(data));
  }),
  // Assignments
  rest.get('/api/assignments', (_req, res, ctx) => {
    return res(ctx.json(demoAssignments));
  }),
  rest.get('/api/assignments/:assignmentId', (req, res, ctx) => {
    const assignment = demoAssignments.find((a) => a.id === req.params.assignmentId);
    return assignment ? res(ctx.json(assignment)) : res(ctx.status(404));
  }),
  rest.post('/api/assignments', async (req, res, ctx) => {
    const data = (await req.json()) as Assignment;
    demoAssignments.push(data);
    return res(ctx.status(201), ctx.json(data));
  }),
  // Submissions
  rest.get('/api/submissions', (_req, res, ctx) => {
    return res(ctx.json(demoSubmissions));
  }),
  rest.post('/api/submissions', async (req, res, ctx) => {
    const data = (await req.json()) as Submission;
    demoSubmissions.push(data);
    return res(ctx.status(201), ctx.json(data));
  }),
  // Grades
  rest.get('/api/grades', (_req, res, ctx) => {
    return res(ctx.json(demoGrades));
  }),
  rest.post('/api/grades', async (req, res, ctx) => {
    const data = (await req.json()) as Grade;
    demoGrades.push(data);
    return res(ctx.status(201), ctx.json(data));
  }),
  // Users
  rest.get('/api/users', (_req, res, ctx) => {
    return res(ctx.json([demoTeacher, ...demoStudents]));
  }),
  // Chat
  rest.get('/api/chat/:channelId', (req, res, ctx) => {
    const { channelId } = req.params as any;
    const messages = demoChatMessages.filter((m) => m.channelId === channelId);
    return res(ctx.json(messages));
  }),
  rest.post('/api/chat/:channelId', async (req, res, ctx) => {
    const { channelId } = req.params as any;
    const body = await req.json();
    const id = `m${demoChatMessages.length + 1}`;
    const message = { id, channelId, senderId: body.senderId, content: body.content, sentAt: new Date().toISOString() };
    demoChatMessages.push(message);
    return res(ctx.status(201), ctx.json(message));
  })
];