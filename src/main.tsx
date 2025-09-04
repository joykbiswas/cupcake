import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router-dom";
import { router } from './Routers/Routers';
import AuthProvider from './Providers/AuthProvider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <div className='max-w-screen-2xl mx-auto'>
        <RouterProvider router={router} />
      </div>
    </AuthProvider>
  </StrictMode>,
)
