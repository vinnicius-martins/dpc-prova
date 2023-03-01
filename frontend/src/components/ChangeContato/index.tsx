import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Switch, useToast } from '@chakra-ui/react';
import { useRef, useState, useEffect } from 'react';
import { useCliente } from '../../hooks/useCliente';
import { ContatoType } from '../../types/contato';

interface ChangeContatoProps {
  isOpen: boolean;
  contact: any;
  contactId: number | null;
  onClose: () => void;
}

export function ChangeContatoModal({ isOpen, onClose, contact, contactId }: ChangeContatoProps) {
  const initialRef = useRef(null);
  const { setClient, client } = useCliente();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const toast = useToast({
    position: 'top-right'
  });

  useEffect(() => {
    setNome(contact?.nome);
    setEmail(contact?.email);
    setTelefone(contact?.telefone);
  }, [contact]);

  async function handleEditContact() {
    if (contactId === null) return;

    const newContact: Partial<ContatoType> = {
      nome,
      email,
      telefone,
    };

    const newContacts = [...client.contatos];
    newContacts[contactId] = {
      ...newContacts[contactId],
      ...newContact
    };

    setClient(state => ({
      ...state,
      contatos: newContacts,
    }));

    onClose();
  }

  async function handleSaveContact() {
    const newContact: ContatoType = {
      nome,
      email,
      telefone,
      status: 'Ativo',
      empresaId: client.codigo
    };

    setClient(state => ({
      ...state,
      contatos: [...state.contatos, newContact],
    }));
    onClose();

    toast({
      description: 'Contato salvo com sucesso.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  }

  return (
    <Modal
      initialFocusRef={initialRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay
        bg='blackAlpha.300'
        backdropFilter='blur(4px)'
      />
      <ModalContent>
        <ModalHeader>
          {contactId !== null ? 'Alterar contato' : 'Criar novo contato'}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Nome</FormLabel>
            <Input ref={initialRef} value={nome} onChange={e => setNome(e.target.value)}/>
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Email</FormLabel>
            <Input type='email' value={email} onChange={e => setEmail(e.target.value)}/>
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Telefone</FormLabel>
            <Input type='tel' value={telefone} onChange={e => setTelefone(e.target.value)}/>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button onClick={onClose} mr={3}>Cancelar</Button>
          {contactId !== null
            ? (
              <Button colorScheme='blue' onClick={handleEditContact}>
                Salvar Alterações
              </Button>
            )
            : (
              <Button colorScheme='green' onClick={handleSaveContact}>
                Salvar Contato
              </Button>
            )
          }
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
