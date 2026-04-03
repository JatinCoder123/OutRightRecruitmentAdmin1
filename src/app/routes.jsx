import { createBrowserRouter, Navigate } from 'react-router';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Candidates from './pages/Candidates';
import CandidateDetail from './pages/CandidateDetail';
import Results from './pages/Results';
import Analytics from './pages/Analytics';
import Questions from './pages/Questions';
import Prompts from './pages/Prompts';
import Roles from './pages/Roles';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'candidates',
        element: <Candidates />,
      },
      {
        path: 'candidates/:id',
        element: <CandidateDetail />,
      },
      {
        path: 'results',
        element: <Results />,
      },
      {
        path: 'analytics',
        element: <Analytics />,
      },
      {
        path: 'questions',
        element: <Questions />,
      },
      {
        path: 'prompts',
        element: <Prompts />,
      },
      {
        path: 'roles',
        element: <Roles />,
      },
      {
        path: 'settings',
        element: <Settings />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);