import styled from 'styled-components/macro';
export const Container = styled.div`
  width: 100%;
  padding: 4rem 1.5rem;
  border-bottom: 2px solid ${({ theme }) => theme.colors.gray};
`;
export const Inner = styled.div`
  max-width: 640px;
  margin: 0 auto;
`;
export const Title = styled.h2`
  margin-bottom: 1.5rem;
`;
export const List = styled.ul`
  list-style-type: none;
  margin-top: 0;
  margin-bottom: 0;
  padding-left: 0;
`;
export const ListItem = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-bottom: 0.5rem;
`;

interface IHeaderProps {
  readonly active: boolean;
}

export const Header = styled.h3<IHeaderProps>`
  cursor: pointer;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme, active }) =>
    active ? theme.colors.primary : theme.colors.dark};
  padding: 0.5rem 1rem;
  margin-bottom: 0.5rem;
  span.close,
  span.open {
    color: ${({ theme }) => theme.colors.light};
    font-size: 1rem;
  }
  span.close {
    font-size: 0.8rem;
  }
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;
export const Body = styled.p`
  padding: 0.5rem 1rem;
  background-color: ${({ theme }) => theme.colors.dark};
  line-height: 1.4;
  font-size: 1.3rem;
  font-weight: 200;
`;
