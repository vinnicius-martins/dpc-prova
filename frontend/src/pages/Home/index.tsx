import { Flex, Image, Text, VStack } from '@chakra-ui/react';

export function Home() {
  return (
    <Flex
      marginTop="100px"
      justifyContent="space-between"
      alignItems="center"
      paddingInline="100px"
      userSelect='none'
    >
      <VStack align="start" gap="5px">
        <Text
          fontFamily="Source Sans Pro"
          fontSize="2xl"
          lineHeight="100%"
          color="#2c2c2cab"
        >
          Portal do Cliente
        </Text>
        <Text
          fontFamily="Source Sans Pro"
          fontSize="7xl"
          lineHeight="100%"
          fontWeight="semibold"
          color="#333333ef"
        >
          Bem-vindo(a)
        </Text>
      </VStack>
      <Image
        width="200px"
        height="200px"
        src="/src/assets/images/logo-sm.png"
      />
    </Flex>
  );
}
