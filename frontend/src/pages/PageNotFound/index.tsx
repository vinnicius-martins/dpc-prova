import { Flex, Image, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export function PageNotFound() {
  const navigate = useNavigate();

  return (
    <Flex
      marginTop="50px"
      alignItems="center"
      justifyContent="center"
      gap="35px"
      direction="column"
    >
      <Image
        src="/src/assets/images/logo-sm.png"
        w="200px"
        h="200px"
        onClick={() => navigate('/')}
        cursor="pointer"
      />
      <Text fontSize="32px" color="#333333ef" fontWeight="medium">
        Oops...
      </Text>
      <Text fontSize="20px" color="#2c2c2cab">
        Não encontramos nada por aqui
      </Text>
    </Flex>
  );
}
