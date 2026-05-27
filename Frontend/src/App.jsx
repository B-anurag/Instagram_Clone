import react from 'react';
import { RouterProvider } from 'react-router';
import router from './auth.routes.jsx';
import './features/shared/global.scss'
import { AuthProvider } from './features/auth/auth.context.jsx'


const App = () => {
  return (
    <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>
  ) 
}

export default App;