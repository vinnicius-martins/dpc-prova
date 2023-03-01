import {
  Button,
  Table as TableBase,
  Tbody,
  Td,
  Th,
  Thead,
  Tooltip,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import { FiEdit as EditIcon, FiPlus as AddIcon } from 'react-icons/fi';
import {
  MdOutlineRemoveCircle as InativeIcon,
  MdPowerSettingsNew as ActiveIcon,
} from 'react-icons/md';
import { ChangeContatoModal } from '../ChangeContato';
import { useState, useMemo } from 'react';
import { ConfirmModal } from '../ConfirmModal';
import { ContatoType } from '../../types/contato';
import { useCliente } from '../../hooks/useCliente';

interface TableProps {
  contacts: ContatoType[];
}

export function ContactsTable({ contacts }: TableProps) {
  const {
    isOpen: isChangeContatoModalOpen,
    onClose: onCloseChangeContatoModal,
    onOpen: onOpenChangeContatoModal,
  } = useDisclosure();

  const {
    isOpen: isActiveModalOpen,
    onClose: onCloseActiveModal,
    onOpen: onOpenActiveModal,
  } = useDisclosure();

  const headers = useMemo(() => ['Nome', 'E-mail', 'Telefone', 'Status'], []);
  const { setClient, client } = useCliente();
  const [selectedItemId, setSelectedItemId] = useState<null | number>(null);
  const [selectedItem, setSelectedItem] = useState<ContatoType | null>(null);
  const isSelectedItemAtivo = selectedItem?.status === 'Ativo' ? true : false;

  function setItem(id: number) {
    setSelectedItem(contacts[id]);
    setSelectedItemId(id);
  }

  function handleEdit(itemId: number) {
    setItem(itemId);
    onOpenChangeContatoModal();
  }

  function handleRequestToggle(itemId: number) {
    setItem(itemId);
    onOpenActiveModal();
  }

  function toggleActive() {
    if (selectedItemId === null) return;

    const newArray = client.codigo !== '' ? [...client?.contatos] : [];
    const newItem = newArray[selectedItemId];

    newArray[selectedItemId] = {
      ...newArray[selectedItemId],
      status: newItem.status === 'Ativo' ? 'Inativo' : 'Ativo'
    };

    setClient(state => ({
      ...state,
      contatos: state.contatos ? newArray : [newItem],
    }));

    onCloseActiveModal();
    setSelectedItem(null);
  }

  return (
    <>
      <ChangeContatoModal
        isOpen={isChangeContatoModalOpen}
        onClose={() => {
          onCloseChangeContatoModal();
          setSelectedItem(null);
        }}
        contact={selectedItem}
        contactId={selectedItemId}
      />

      <ConfirmModal
        isOpen={isActiveModalOpen && selectedItem !== null}
        onClose={() => {
          onCloseActiveModal();
          setSelectedItem(null);
        }}
        title={`${isSelectedItemAtivo ? 'Inativar' : 'Ativar'} ${
          selectedItem?.nome
        }`}
        body={`Deseja ${isSelectedItemAtivo ? 'inativar' : 'ativar'} ${
          selectedItem?.nome
        }?`}
        confirmLabel={isSelectedItemAtivo ? 'Inativar' : 'Ativar'}
        confirmButtonColor={isSelectedItemAtivo ? 'red' : 'green'}
        onConfirm={toggleActive}
      />

      <TableBase>
        <Thead>
          <Tr>
            {headers.map((header, index) => (
              <Th key={index}>{header}</Th>
            ))}
            <Th/>
            <Th p={0}>
              <Tooltip label="Adicionar Contato">
                <Button
                  variant="unstyled"
                  padding={0}
                  onClick={onOpenChangeContatoModal}
                >
                  <AddIcon size={20}/>
                </Button>
              </Tooltip>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {contacts.map((contact, index) => (
            <Tr key={index}>
              {Object.entries(contact).map(([key, value], index) =>
                key !== 'empresaId' ? <Td key={index}>{value ? String(value) : '-------'}</Td> : null
              )}
              <Td padding={0} paddingLeft='20px'>
                <Tooltip label="Editar">
                  <Button
                    variant="unstyled"
                    padding={0}
                    onClick={() => handleEdit(index)}
                  >
                    <EditIcon size={20} color="#077fb7" />
                  </Button>
                </Tooltip>
              </Td>
              <Td p={0}>
                <Tooltip
                  label={contact.status === 'Ativo' ? 'Inativar' : 'Ativar'}
                  cursor="pointer"
                >
                  <Button
                    variant="unstyled"
                    padding={0}
                    onClick={() => handleRequestToggle(index)}
                  >
                    {contact.status === 'Ativo' ? (
                      <InativeIcon size={20} color="#d30f0f" />
                    ) : (
                      <ActiveIcon size={20} color="#1db21a" />
                    )}
                  </Button>
                </Tooltip>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </TableBase>
    </>
  );
}
