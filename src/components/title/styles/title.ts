import styled from 'styled-components/macro';
export const Container = styled.div`
  padding: 0 1rem;
`;
export const Inner = styled.div`
  text-align: center;
`;
export const BaseTitle = styled.h3`
  font-weight: 600;
  margin-bottom: 0.2rem;
  text-transform: uppercase;
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.light};
`;
export const SubTitle = styled.h4`
  font-weight: 400;
  font-style: italic;
  margin-bottom: 0.5rem;
  text-transform: capitalize;
`;
