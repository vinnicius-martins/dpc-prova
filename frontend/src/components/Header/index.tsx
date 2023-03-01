import { Flex, Image, Text } from '@chakra-ui/react';
import { FiMenu as MenuIcon, FiX as XIcon } from 'react-icons/fi';
import {
  BsFillDoorClosedFill as DoorClosedIcon,
  BsFillDoorOpenFill as DoorOpenIcon,
} from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

interface HeaderProps {
  isDrawerOpen: boolean;
  onToggleDrawer: () => void;
}

export function Header({ isDrawerOpen, onToggleDrawer }: HeaderProps) {
  const navigate = useNavigate();
  const [logoutFocused, setLogoutFocused] = useState(false);

  return (
    <Flex
      minW="full"
      maxW="full"
      bg="#084a9ad3"
      height="52px"
      alignItems="center"
      justifyContent="space-between"
      paddingInline="20px"
    >
      <Flex gap="36px">
        <button onClick={onToggleDrawer}>
          {!isDrawerOpen ? (
            <MenuIcon size={25} color="#FFF" />
          ) : (
            <XIcon size={25} color="#FFF" />
          )}
        </button>
        <Image
          userSelect="none"
          cursor="pointer"
          src="/src/assets/images/logo.png"
          width="200px"
          onClick={() => navigate('/')}
        />
      </Flex>

      {/* <Text
        color="#FFFFFF"
        userSelect="none"
        fontSize="18px"
        fontWeight="medium"
      >
        Contatos do cliente
      </Text> */}

      <Flex gap="18px" alignItems="center">
        <Text color="#fff" fontSize="14px">
          Olá, Cliente
        </Text>
        <Image
          width="30px"
          height="30px"
          src="/src/assets/images/icon-avatar.svg"
        />
        <Flex
          direction="column"
          alignItems="center"
          cursor="pointer"
          onClick={() => alert('Logout')}
          onMouseOver={() => setLogoutFocused(true)}
          onMouseLeave={() => setLogoutFocused(false)}
        >
          {!logoutFocused
            ? <DoorClosedIcon size={20} color='#fff' />
            : <DoorOpenIcon size={20} color='#fff' />
          }
          {/* <Image
            width="20px"
            height="16px"
            src={"/src/assets/images/icon-sair.svg"}
          /> */}
          <Text color="#fff" fontSize="14px">
            Sair
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}
