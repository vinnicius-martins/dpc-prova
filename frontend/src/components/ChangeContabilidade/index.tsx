import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Switch, useToast } from '@chakra-ui/react';
import { useRef, useState, useEffect } from 'react';
import { useCliente } from '../../hooks/useCliente';
import { ContabilidadeType } from '../../types/contabilidade';

interface ChangeContabilidadeProps {
  isOpen: boolean;
  contabilidade: any;
  contabilidadeId: number | null;
  onClose: () => void;
}

export function ChangeContabilidadeModal({ isOpen, onClose, contabilidade, contabilidadeId }: ChangeContabilidadeProps) {
  const initialRef = useRef(null);
  const { setClient, client } = useCliente();
  const [codigo, setCodigo] = useState('');
  const [nome, setNome] = useState('');
  const [dataInicio, setDataInicio] = useState('');
  const toast = useToast({
    position: 'top-right'
  });

  useEffect(() => {
    setNome(contabilidade?.nome);
    setCodigo(contabilidade?.codigo);
    setDataInicio(contabilidade?.dataInicio);
  }, [contabilidade]);

  async function handleEditContabilidade() {
    if (contabilidadeId === null) return;

    const newContabilidade: Partial<ContabilidadeType> = {
      nome,
      codigo,
      dataInicio,
    };

    const newContabilidades = [...client.contabilidades];
    newContabilidades[contabilidadeId] = {
      ...newContabilidades[contabilidadeId],
      ...newContabilidade
    };

    setClient(state => ({
      ...state,
      contabilidades: newContabilidades,
    }));

    onClose();
  }

  async function handleSaveContabilidade() {
    const newContabilidade: ContabilidadeType = {
      codigo,
      nome,
      dataInicio,
      dataFim: '',
      empresaId: client.codigo
    };

    setClient(state => ({
      ...state,
      contabilidades: [...state.contabilidades, newContabilidade],
    }));
    onClose();

    toast({
      description: 'Contabilidade salva com sucesso.',
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
          {contabilidadeId !== null ? 'Alterar contabilidade' : 'Criar nova contabilidade'}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Código</FormLabel>
            <Input ref={initialRef} value={codigo} onChange={e => setCodigo(e.target.value)}/>
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Nome</FormLabel>
            <Input type='email' value={nome} onChange={e => setNome(e.target.value)}/>
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Data Início</FormLabel>
            <Input type='tel' value={dataInicio} onChange={e => setDataInicio(e.target.value)}/>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button onClick={onClose} mr={3}>Cancelar</Button>
          {contabilidadeId !== null
            ? (
              <Button colorScheme='blue' onClick={handleEditContabilidade}>
                Salvar Alterações
              </Button>
            )
            : (
              <Button colorScheme='green' onClick={handleSaveContabilidade}>
                Salvar Contabilidade
              </Button>
            )
          }
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
