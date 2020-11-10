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
  font-weight: 600;
  font-style: normal;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  text-transform: capitalize;
  font-family: 'Oswald';
  color: ${({ theme }) => theme.colors.green};
`;
