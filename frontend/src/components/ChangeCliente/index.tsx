import {
  Button,
  FormControl,
  Input,
  List,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useCliente } from '../../hooks/useCliente';
import { ClientType } from '../../types/client';
import { api } from '../../utils/api';

interface ChangeClienteProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ChangeClienteModal({ isOpen, onClose }: ChangeClienteProps) {
  const initialRef = useRef(null);
  const { setCreateMode, setClient } = useCliente();
  const [query, setQuery] = useState('');
  const [clients, setClients] = useState([] as ClientType[]);

  useEffect(() => {
    if (!isOpen) return;

    (async function getClients() {
      try {
        const response = await api.get('/clientes');
        setClients(response.data.map((client: ClientType) => ({
          ...client,
          contatos: [],
          contabilidades: []
        })));
      } catch (err) {
        console.log(err);
      }
    })();

    return () => {
      setClients([]);
    };
  }, [isOpen]);

  const selectedClients = useMemo(() => {
    const cleanQuery = query.toLowerCase().trim();
    if (cleanQuery === '') return [...clients];

    return clients.filter((client) =>
      client.nome.toLowerCase().search(cleanQuery) !== -1
    );
  }, [query, clients]);

  function handleChangeClient(client: ClientType) {
    setClient(client);
    setCreateMode(false);
    onClose();
  }

  return (
    <Modal
      initialFocusRef={initialRef}
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={false}
    >
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(4px)" />
      <ModalContent>
        <ModalHeader>Selecione o cliente</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <Input placeholder="Pesquise o nome do cliente" mb={3} value={query} onChange={e => setQuery(e.target.value)}/>
          </FormControl>
          <List spacing={3}>
            {selectedClients.length > 0
              ? selectedClients
                .sort((a, b) => Number(a.codigo) - Number(b.codigo))
                .map((client, index) => (
                  <ListItem key={index}>
                    <Button
                      overflow="hidden"
                      whiteSpace="nowrap"
                      textOverflow="ellipsis"
                      w="full"
                      justifyContent="start"
                      padding="26px 16px"
                      variant="outline"
                      onClick={() => handleChangeClient(client)}
                    >
                      {client.nome}
                    </Button>
                  </ListItem>
                ))
              : (
                <Text textAlign='center' color='#666' mt={3}>
                  Nenhuma empresa cadastrada
                </Text>
              )
            }
          </List>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
