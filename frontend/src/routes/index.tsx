import { createBrowserRouter } from 'react-router-dom';
import { Home } from '../pages/Home';
import { App } from '../App';
import { Cadastro } from '../pages/Cadastro';
import { PageNotFound } from '../pages/PageNotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/clientes/cadastro',
        element: <Cadastro />,
      },
      {
        path: '*',
        element: <PageNotFound />
      },
    ]
  }
]);
