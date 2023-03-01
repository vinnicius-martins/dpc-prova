import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { router } from './routes';
import './styles/globalStyles.css';
import { ClienteProvider } from './contexts/cliente';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <ClienteProvider>
        <RouterProvider router={router} />
      </ClienteProvider>
    </ChakraProvider>
  </React.StrictMode>
);
