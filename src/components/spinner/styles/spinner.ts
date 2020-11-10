import styled from 'styled-components/macro';
export const Container = styled.div`
  width: 100%;
`;
export const Inner = styled.div`
  max-width: 320px;
  font-size: 1rem;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.warnning};
`;
