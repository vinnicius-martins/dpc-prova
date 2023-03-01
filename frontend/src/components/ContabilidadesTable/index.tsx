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
import { useState, useMemo } from 'react';
import { ConfirmModal } from '../ConfirmModal';
import { useCliente } from '../../hooks/useCliente';
import { ContabilidadeType } from '../../types/contabilidade';
import moment from 'moment';
import { ChangeContabilidadeModal } from '../ChangeContabilidade';

interface TableProps {
  contabilidades: ContabilidadeType[];
}

export function ContabilidadesTable({ contabilidades }: TableProps) {
  const {
    isOpen: isChangeContabilidadeModalOpen,
    onClose: onCloseChangeContabilidadeModal,
    onOpen: onOpenChangeContabilidadeModal,
  } = useDisclosure();

  const {
    isOpen: isActiveModalOpen,
    onClose: onCloseActiveModal,
    onOpen: onOpenActiveModal,
  } = useDisclosure();

  const headers = useMemo(() => ['Código', 'Nome', 'Data Início', 'Data Fim'], []);
  const { setClient, client } = useCliente();
  const [selectedItemId, setSelectedItemId] = useState<null | number>(null);
  const [selectedItem, setSelectedItem] = useState<ContabilidadeType | null>(null);
  const isSelectedItemAtivo = selectedItem?.dataFim === '' ? true : false;

  function setItem(id: number) {
    setSelectedItem(contabilidades[id]);
    setSelectedItemId(id);
  }

  function handleEdit(itemId: number) {
    setItem(itemId);
    onOpenChangeContabilidadeModal();
  }

  function handleRequestToggle(itemId: number) {
    setItem(itemId);
    onOpenActiveModal();
  }

  function toggleActive() {
    if (selectedItemId === null) return;

    const newArray = client.codigo !== '' ? [...client?.contabilidades] : [];
    const newItem = newArray[selectedItemId];

    newArray[selectedItemId] = {
      ...newArray[selectedItemId],
      dataFim: newItem.dataFim === '' ? moment().format('DD/MM/YYYY') : ''
    };

    setClient(state => ({
      ...state,
      contabilidades: state.contabilidades ? newArray : [newItem],
    }));

    onCloseActiveModal();
    setSelectedItem(null);
  }

  return (
    <>
      <ChangeContabilidadeModal
        isOpen={isChangeContabilidadeModalOpen}
        onClose={() => {
          onCloseChangeContabilidadeModal();
          setSelectedItem(null);
        }}
        contabilidade={selectedItem}
        contabilidadeId={selectedItemId}
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
              <Tooltip label="Adicionar Contabilidade">
                <Button
                  variant="unstyled"
                  padding={0}
                  onClick={onOpenChangeContabilidadeModal}
                >
                  <AddIcon size={20}/>
                </Button>
              </Tooltip>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {contabilidades.map((contabilidade, index) => (
            <Tr key={index}>
              {Object.entries(contabilidade).map(([key, value], index) =>
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
                  label={contabilidade.dataFim === '' ? 'Inativar' : 'Ativar'}
                  cursor="pointer"
                >
                  <Button
                    variant="unstyled"
                    padding={0}
                    onClick={() => handleRequestToggle(index)}
                  >
                    {contabilidade.dataFim === '' ? (
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
