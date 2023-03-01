import styled from 'styled-components';
import { Accordion } from '@chakra-ui/react';

export const Container = styled(Accordion)<{ opened: boolean }>`
  background: #ffffff;
  height: calc(100vh - 52px);
  width: 250px;
  overflow: hidden;
  box-shadow: 0px 3.34328px 3.34328px rgba(0, 0, 0, 0.25);
`;
