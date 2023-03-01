import { Flex, Slide, useDisclosure } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import { MainContainer, MainContent } from './components/common';
import { Drawer } from './components/Drawer';
import { Header } from './components/Header';

export function App() {
  const {
    isOpen: isDrawerOpen,
    onToggle: onToggleDrawer,
    onClose: onDrawerClose
  } = useDisclosure();

  return (
    <MainContainer>
      <Header onToggleDrawer={onToggleDrawer} isDrawerOpen={isDrawerOpen} />
      <Flex direction="row" justifyContent="center" minHeight='100%'>
        <Slide style={{ top: '52px' }} direction="left" in={isDrawerOpen}>
          <Drawer onClose={onDrawerClose}/>
        </Slide>
        <MainContent>
          <Outlet />
        </MainContent>
      </Flex>
    </MainContainer>
  );
}
