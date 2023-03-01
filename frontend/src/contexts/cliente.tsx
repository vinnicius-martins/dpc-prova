import { createContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';
import { ClientType, initialClient } from '../types/client';
import { useEffect } from 'react';
import { api } from '../utils/api';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';

interface ClienteContextType {
  client: ClientType;
  setClient: Dispatch<SetStateAction<ClientType>>;
  createMode: boolean;
  setCreateMode: Dispatch<SetStateAction<boolean>>;
  toggleAtivo: () => Promise<void>;
  toggleSwitch: (name: 'vip' | 'necessitaMarketing' | 'necessitaTI' | 'moedaEstrangeira') => Promise<void>;
  registerClient: (newClient: ClientType) => Promise<void>;
  updateClient: (clientPatch: Partial<ClientType>) => void;
}

export const ClienteContext = createContext({} as ClienteContextType);

export function ClienteProvider({ children }: { children: ReactNode }) {
  const toast = useToast({
    position: 'top-right'
  });
  const [client, setClient] = useState(initialClient as ClientType);
  const [createMode, setCreateMode] = useState(true);

  useEffect(() => {
    if (createMode) {
      setClient(initialClient);
    }
  }, [createMode]);

  async function registerClient(newClient: ClientType) {
    try {
      const response = await api.post('/clientes', newClient);
      const clientData = response.data;
      setCreateMode(false);
      setClient({
        ...clientData,
        contabilidades: [...client.contabilidades],
        contatos: [...client.contatos],
      });

      toast({
        description: 'Cliente cadastrado com sucesso.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      console.log(err);
    }
  }

  async function updateClient(clientPatch: Partial<ClientType>) {
    if (createMode) {
      setClient(state => ({
        ...state,
        ...clientPatch,
      }));
    } else {
      try {
        const response = await api.put(`/clientes/${client.codigo}`, {
          ...client,
          ...clientPatch,
        });

        const updatedClient = response.data;
        setClient({
          ...updatedClient,
          contabilidades: [...client.contabilidades],
          contatos: [...client.contatos],
        });
      } catch (err) {
        if (axios.isAxiosError(err)) {
          console.log(err.response?.status);
          console.log(err.response?.data);
        }
      }
    }
  }

  async function toggleAtivo() {
    try {
      await updateClient({
        ativo: !client.ativo,
      });
    } catch (err) {
      console.log(err);
    }
  }

  async function toggleSwitch(name: 'vip' | 'necessitaMarketing' | 'necessitaTI' | 'moedaEstrangeira') {
    try {
      await updateClient({
        [name]: !client[name],
      });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <ClienteContext.Provider value={{
      toggleAtivo,
      client,
      setClient,
      updateClient,
      registerClient,
      toggleSwitch,
      createMode,
      setCreateMode,
    }}>
      { children }
    </ClienteContext.Provider>
  );
}
