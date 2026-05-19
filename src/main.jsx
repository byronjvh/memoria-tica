import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AuthPage from './pages/AuthPage.jsx';
import BackgroundOverlay from '../src/components/BackgroundOverlay.jsx'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { AuthProvider } from './context/AuthContext.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },

  {
    path: "/auth",
    element: <AuthPage />,
  },
]);

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <BackgroundOverlay className='background-overlay absolute left-0 top-0 h-full text-text-dark/20 -z-10' />
    <BackgroundOverlay className='background-overlay absolute right-0 top-0 -scale-x-100 h-full text-text-dark/20 -z-10' />
    <RouterProvider router={router} />
  </AuthProvider>
)
