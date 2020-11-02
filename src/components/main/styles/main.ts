import styled from 'styled-components/macro';
export const Container = styled.div`
  position: relative;
  top: 0;
  left: 0;
  margin-left: 300px;
  padding-top: 48px;
  min-height: calc(100%);
  background-color: ${({ theme }) => theme.colors.dark};
  color: ${({ theme }) => theme.colors.light};
`;
export const Inner = styled.div`
  padding: 1rem;
`;
