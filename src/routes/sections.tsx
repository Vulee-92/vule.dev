import type { RouteObject } from 'react-router';

import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

import { AuthLayout } from 'src/layouts/auth';
import { PublicLayout } from 'src/layouts/public';
import { DashboardLayout } from 'src/layouts/dashboard';
import AboutMain from 'src/sections/portfolio/AboutMain';
import ResumePage from 'src/sections/portfolio/resume';
import CaseStudy from 'src/sections/portfolio/ProjectDetail';
import ProjectsList from 'src/sections/portfolio/projects/ProjectsList';
import { YoutubeSection } from 'src/sections/portfolio/youtube-section';

// ----------------------------------------------------------------------

export const PortfolioPage = lazy(() => import('src/pages/portfolio'));
export const SignInPage = lazy(() => import('src/pages/sign-in'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const HomePage = lazy(() => import('src/pages/home'));

const renderFallback = () => (
  <Box
    sx={{
      display: 'flex',
      flex: '1 1 auto',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <LinearProgress
      sx={{
        width: 1,
        maxWidth: 320,
        bgcolor: (theme) => varAlpha(theme.vars.palette.text.primaryChannel, 0.16),
        [`& .${linearProgressClasses.bar}`]: { bgcolor: 'text.primary' },
      }}
    />
  </Box>
);

export const routesSection: RouteObject[] = [
  // Public routes
  {
    path: '/',
    element: (
      <PublicLayout>
        <Suspense fallback={renderFallback()}>
          <Outlet />
        </Suspense>
      </PublicLayout>
    ),
    children: [
      { index: true, element: <PortfolioPage /> },
      { path: 'projects', element: <ProjectsList /> },
      { path: 'music', element: <YoutubeSection /> },
      { path: 'cv', element: <ResumePage /> },
      { path: 'about', element: <AboutMain /> },
      { path: 'project/:slug', element: <CaseStudy /> },


    ],
  },
  // Dashboard routes
  {
    path: 'dashboard',
    element: (
      <DashboardLayout>
        <Suspense fallback={renderFallback()}>
          <Outlet />
        </Suspense>
      </DashboardLayout>
    ),
    children: [
      // { path: 'user', element: <UserPage /> },
    ],
  },
  {
    path: 'sign-in',
    element: (
      <AuthLayout>
        <SignInPage />
      </AuthLayout>
    ),
  },
  {
    path: '404',
    element: <Page404 />,
  },
  { path: '*', element: <Page404 /> },
];
