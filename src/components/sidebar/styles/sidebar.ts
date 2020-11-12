import styled from 'styled-components/macro';
import { Link as ReactRouterLink } from 'react-router-dom';
export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  margin-top: 48px;
  width: 300px;
  background-color: ${({ theme }) => theme.colors.gray};
  color: ${({ theme }) => theme.colors.light};
  height: calc(100% - 48px);
  overflow-y: auto;
`;
export const Inner = styled.div`
  padding: 1rem;
`;
export const ButtonLink = styled(ReactRouterLink)`
  display: block;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.light};
  font-size: 0.8rem;
  font-weight: 200;
`;
