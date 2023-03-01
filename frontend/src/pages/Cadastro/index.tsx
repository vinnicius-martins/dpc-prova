import {
  Box,
  Button,
  Container,
  Flex,
  Image,
  Tab,
  TableContainer,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { Divider } from '@chakra-ui/react';
import { InputField } from '../../components/InputField';
import { Switch } from '../../components/Switch';
import { ContactsTable } from '../../components/ContactsTable';
import { useReactToPrint } from 'react-to-print';
import { useRef } from 'react';
import { EditableInput } from '../../components/Editable';
import { ConfirmModal } from '../../components/ConfirmModal';
import { useCliente } from '../../hooks/useCliente';
import { FiRepeat as ChangeIcon, FiSave as SaveIcon, FiPlus as NewIcon } from 'react-icons/fi';
import { ChangeClienteModal } from '../../components/ChangeCliente';
import { ContabilidadesTable } from '../../components/ContabilidadesTable';

export function Cadastro() {
  const toast = useToast({
    position: 'top-right'
  });

  const {
    client,
    updateClient,
    toggleAtivo,
    createMode,
    setCreateMode,
    registerClient
  } = useCliente();

  const {
    isOpen: isActiveModalOpen,
    onClose: onCloseActiveModal,
    onOpen: onOpenActiveModal,
  } = useDisclosure();

  const {
    isOpen: isChangeClienteModalOpen,
    onClose: onCloseChangeClienteModal,
    onOpen: onOpenChangeClienteModal,
  } = useDisclosure();

  const printRef = useRef(null);
  const handlePrint = useReactToPrint({
    documentTitle: 'Clientes Cadastrados',
    content: () => printRef.current,
  });

  return (
    <>
      <ChangeClienteModal
        isOpen={isChangeClienteModalOpen}
        onClose={onCloseChangeClienteModal}
      />

      <ConfirmModal
        isOpen={isActiveModalOpen}
        onClose={onCloseActiveModal}
        title={`${client?.ativo ? 'Inativar' : 'Ativar'} cliente`}
        body={`Deseja ${client?.ativo ? 'inativar' : 'ativar'} o cliente?`}
        confirmLabel={client?.ativo ? 'Inativar' : 'Ativar'}
        confirmButtonColor={client?.ativo ? 'red' : 'green'}
        onConfirm={async () => {
          await toggleAtivo();
          onCloseActiveModal();
        }}
      />

      <Text color="#10488D" fontSize="14px" lineHeight="150%">
        Cadastro
      </Text>
      <Divider />
      <Flex marginTop="12px" justifyContent="space-between" gap="20px">
        <Box flex={1}>
          <Box>
            <Flex direction="row" justifyContent="stretch" gap="22px">
              <InputField
                label="Código"
                flex={1}
                disabled
                value={client?.codigo || ''}
              />
              <Container flex={2} position="relative">
                <Button
                  onClick={onOpenChangeClienteModal}
                  variant="link"
                  display="flex"
                  gap="5px"
                  position="absolute"
                  right={0}
                  paddingRight="16px"
                  color="#077fb7"
                  fontWeight="normal"
                  fontSize="sm"
                >
                  <ChangeIcon />
                  Selecionar cliente
                </Button>
                <EditableInput
                  label="Nome"
                  flex={1}
                  value={client?.nome || ''}
                  setValue={(newValue) =>
                    updateClient({ nome: newValue || '' })
                  }
                />
              </Container>
              <InputField
                label="Sistema"
                flex={2}
                inputType="select"
                value={client?.sistemaId || ''}
                setValue={(newValue) =>
                  updateClient({ sistemaId: newValue || '' })
                }
              />
            </Flex>
            <Flex direction="row" gap="20px" marginTop="22px">
              <InputField
                label="Data Início"
                inputType="date"
                maxWidth="200px"
                value={client?.dataInicio || ''}
                setValue={(newValue) =>
                  updateClient({ dataInicio: newValue || '' })
                }
              />
              <Flex
                direction="column"
                alignItems="start"
                justifyContent="end"
                gap="6px"
              >
                <Switch
                  label="VIP?"
                  checked={client?.vip}
                  name='vip'
                />
                <Switch
                  label="Necessita Marketing?"
                  checked={client?.necessitaMarketing}
                  name='necessitaMarketing'
                />
              </Flex>
              <Flex
                direction="column"
                alignItems="start"
                justifyContent="end"
                gap="6px"
              >
                <Switch
                  label="Necessita TI?"
                  checked={client?.necessitaTI}
                  name='necessitaTI'
                />
                <Switch
                  label="Moeda Estrangeira?"
                  checked={client?.moedaEstrangeira}
                  name='moedaEstrangeira'
                />
              </Flex>
            </Flex>
          </Box>
          <Tabs marginTop="65px" variant="enclosed">
            <TabList>
              <Tab>GERAL</Tab>
              <Tab>CONTABILIDADE</Tab>
              <Tab>IMPOSTOS</Tab>
              <Tab>FINANCEIRO</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <TableContainer ref={printRef}>
                  <ContactsTable
                    contacts={client.contatos}
                  />
                </TableContainer>
              </TabPanel>
              <TabPanel>
                <TableContainer>
                  <ContabilidadesTable
                    contabilidades={client.contabilidades}
                  />
                </TableContainer>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
        <VStack alignItems="flex-start" gap="12px">
          {createMode
            ? (
              <Button
                width="168px"
                colorScheme="green"
                rightIcon={<SaveIcon size={20}/>}
                fontSize="16px"
                fontWeight="medium"
                onClick={async () => {
                  await registerClient(client);
                }}
              >
                Cadastrar Cliente
              </Button>
            )
            : (
              <Button
                width="168px"
                colorScheme="blue"
                rightIcon={<NewIcon size={20}/>}
                fontSize="16px"
                fontWeight="medium"
                justifyContent='start'
                onClick={async () => {
                  setCreateMode(true);
                }}
              >
                Novo Cliente
              </Button>
            )
          }
          <Button
            width="168px"
            colorScheme="blue"
            backgroundColor="#10488D"
            rightIcon={<Image src="/src/assets/images/icon-printer.svg" />}
            fontSize="16px"
            fontWeight="medium"
            onClick={handlePrint}
          >
            Imprimir em PDF
          </Button>

          <Button
            colorScheme={client?.ativo ? 'green' : 'red'}
            backgroundColor={client?.ativo ? '#1ac22b' : undefined}
            fontSize="16px"
            fontWeight="medium"
            onClick={onOpenActiveModal}
          >
            {client?.ativo ? 'Ativo' : 'Inativo'}
          </Button>
        </VStack>
      </Flex>
    </>
  );
}
