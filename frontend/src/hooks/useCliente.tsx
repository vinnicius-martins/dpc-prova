import { useContext } from 'react';
import { ClienteContext } from '../contexts/cliente';

export function useCliente() {
  const cliente = useContext(ClienteContext);

  return cliente;
}
