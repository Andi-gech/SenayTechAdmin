import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import createStore from 'react-auth-kit/createStore';
import AuthProvider from 'react-auth-kit';

const queryClient = new QueryClient()
const store = createStore({
  authName:'_auth',
  authType:'cookie',
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === 'https:',
});
ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider store={store}>
  <QueryClientProvider client={queryClient}>
  <BrowserRouter>
   <React.StrictMode>
    <App />
    <ReactQueryDevtools />
  </React.StrictMode></BrowserRouter>
  </QueryClientProvider>
  </AuthProvider>
 
)
