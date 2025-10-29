import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import { AppLayout } from './layout/AppLayout';
import { DashboardPage } from './pages/dashboard/DashboardPage';
import { LearnOverviewPage } from './pages/learn/LearnOverviewPage';
import { CurriculumPlannerPage } from './pages/learn/CurriculumPlannerPage';
import { LessonPlayerPage } from './pages/learn/LessonPlayerPage';
import { AssignmentsPage } from './pages/assignments/AssignmentsPage';
import { AssignmentDetailPage } from './pages/assignments/AssignmentDetailPage';
import { SubmissionPage } from './pages/assignments/SubmissionPage';
import { RubricEditorPage } from './pages/assignments/RubricEditorPage';
import { GradingInboxPage } from './pages/grading/GradingInboxPage';
import { AutoGraderReviewPage } from './pages/grading/AutoGraderReviewPage';
import { ClassChatPage } from './pages/chat/ClassChatPage';
import { StudyGroupPage } from './pages/chat/StudyGroupPage';
import { FeedPage } from './pages/social/FeedPage';
import { BadgesPage } from './pages/social/BadgesPage';
import { ProfilePage } from './pages/social/ProfilePage';
import { Student360Page } from './pages/analytics/Student360Page';
import { ClassInsightsPage } from './pages/analytics/ClassInsightsPage';
import { CoursesAdminPage } from './pages/admin/CoursesAdminPage';
import { CohortsAdminPage } from './pages/admin/CohortsAdminPage';
import { UsersAdminPage } from './pages/admin/UsersAdminPage';
import { SettingsPage } from './pages/settings/SettingsPage';

export function AppRoutes() {
  return useRoutes([
    {
      element: <AppLayout />,
      children: [
        { path: '/', element: <DashboardPage /> },
        {
          path: 'learn',
          children: [
            { index: true, element: <LearnOverviewPage /> },
            { path: 'planner', element: <CurriculumPlannerPage /> },
            { path: 'lesson/:lessonId', element: <LessonPlayerPage /> }
          ]
        },
        {
          path: 'assignments',
          children: [
            { index: true, element: <AssignmentsPage /> },
            { path: ':assignmentId', element: <AssignmentDetailPage /> },
            { path: ':assignmentId/submit', element: <SubmissionPage /> },
            { path: ':assignmentId/rubric', element: <RubricEditorPage /> }
          ]
        },
        {
          path: 'grading',
          children: [
            { index: true, element: <GradingInboxPage /> },
            { path: ':submissionId', element: <AutoGraderReviewPage /> }
          ]
        },
        {
          path: 'chat',
          children: [
            { index: true, element: <ClassChatPage /> },
            { path: 'group/:groupId', element: <StudyGroupPage /> }
          ]
        },
        {
          path: 'social',
          children: [
            { index: true, element: <FeedPage /> },
            { path: 'badges', element: <BadgesPage /> },
            { path: 'profile', element: <ProfilePage /> }
          ]
        },
        {
          path: 'analytics',
          children: [
            { index: true, element: <Student360Page /> },
            { path: 'class', element: <ClassInsightsPage /> }
          ]
        },
        {
          path: 'admin',
          children: [
            { index: true, element: <CoursesAdminPage /> },
            { path: 'cohorts', element: <CohortsAdminPage /> },
            { path: 'users', element: <UsersAdminPage /> }
          ]
        },
        { path: 'settings', element: <SettingsPage /> },
        { path: '*', element: <Navigate to="/" replace /> }
      ]
    }
  ]);
}