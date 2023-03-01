import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  HStack,
  Image,
  Text,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { Container } from './styles';

interface DrawerProps {
  onClose: () => void;
}

export function Drawer({ onClose }: DrawerProps) {
  const navigate = useNavigate();

  return (
    <Container allowToggle>
      <AccordionItem>
        <AccordionButton
          display="flex"
          justifyContent="space-between"
          padding="16px 18px"
          onClick={() => navigate('/')}
        >
          <HStack>
            <Image
              width="16px"
              height="16px"
              src="/src/assets/images/icon-inicio.svg"
            />
            <Text fontSize="14px" lineHeight="150%" letterSpacing="0.25px">
              Início
            </Text>
          </HStack>
        </AccordionButton>
      </AccordionItem>
      <AccordionItem>
        <AccordionButton
          display="flex"
          justifyContent="space-between"
          padding="16px 18px;"
        >
          <HStack>
            <Image
              width="16px"
              height="16px"
              src="/src/assets/images/icon-clientes.svg"
            />
            <Text fontSize="14px" lineHeight="150%" letterSpacing="0.25px">
              Clientes
            </Text>
          </HStack>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel padding={0}>
          <AccordionItem>
            <AccordionButton
              display="flex"
              justifyContent="space-between"
              padding="16px 18px"
              onClick={() => {
                navigate('/clientes/cadastro/');
                onClose();
              }}
            >
              <HStack>
                <Image
                  width="16px"
                  height="16px"
                  src="/src/assets/images/icon-cadastro.svg"
                  marginLeft='16px'
                />
                <Text fontSize="14px" lineHeight="150%" letterSpacing="0.25px">
                  Cadastro
                </Text>
              </HStack>
            </AccordionButton>
          </AccordionItem>
        </AccordionPanel>
      </AccordionItem>
    </Container>
  );
}
