import { Flex, FormLabel, Switch as SwitchBase } from '@chakra-ui/react';
import { useCliente } from '../../hooks/useCliente';
import { ChangeEvent } from 'react';

interface SwitchProps {
  label: string;
  checked: boolean | undefined;
  name: 'vip' | 'necessitaMarketing' | 'necessitaTI' | 'moedaEstrangeira';
}

export function Switch({ label, checked, name }: SwitchProps) {
  const { toggleSwitch } = useCliente();

  async function handleToggleSwitch() {
    await toggleSwitch(name);
  }

  return (
    <Flex direction="row" gap="8px" justifyContent="end" alignItems="end">
      <SwitchBase isChecked={checked} onChange={handleToggleSwitch}/>
      <FormLabel margin={0} alignSelf="end" fontSize="15px">
        {label}
      </FormLabel>
    </Flex>
  );
}
