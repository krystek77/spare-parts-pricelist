import styled from 'styled-components/macro';
export const Container = styled.div`
  padding: 1rem 0.5rem;
`;
export const Inner = styled.div``;
export const Title = styled.h2`
  margin-bottom: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.medium};
`;
export const Content = styled.div<{ type?: string }>`
  color: ${({ theme }) => theme.colors.dark};
  background-color: ${({ theme }) => theme.colors.warnning};
  padding: 0.2rem 0.5rem;
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.2rem;
  &:last-child {
    border-bottom-left-radius: 0.2rem;
    border-bottom-right-radius: 0.2rem;
  }
  ${({ type, theme }) =>
    type === 'CURRENCY' ? 'font-size:2rem' : 'font-size: 1rem;'}
`;
export const Label = styled.span`
  font-size: 0.8rem;
`;
export const Body = styled.span`
  font-weight: 600;
`;
