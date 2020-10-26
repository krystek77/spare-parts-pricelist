import styled from 'styled-components/macro';

export const TabGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 1.5rem;
  @media (min-width: 1000px) {
    flex-direction: row;
    justify-content: center;
  }
`;
export const Tab = styled.span`
  border-bottom: 1px solid ${({ theme }) => theme.colors.dark};
  text-align: center;
  width: 100%;
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.light};
  }
  @media (min-width: 960px) {
    border-bottom: none;
    width: auto;
  }

  button {
    width: 100%;
    background-color: transparent;
    border: none;
    color: #e2e2e2;
    padding: 1rem;
    cursor: pointer;
    outline: none;
    h2 {
      font-size: 1rem;
      font-weight: normal;
      text-transform: uppercase;
      @media (min-width: 1000px) {
        font-size: 0.8rem;
      }
    }
    &.active {
      background-color: ${({ theme }) => theme.colors.primary};
    }
  }
`;
export const PanelGroup = styled.div`
  max-width: 640px;
  margin: 0 auto;
`;
export const Panel = styled.article`
  padding: 1rem 1.5rem;
  font-size: 2rem;
  font-weight: 200;
  text-align: center;
  line-height: 1.4;
`;
export const Container = styled.div`
  width: 100%;
  border-bottom: 2px solid #393838;
`;
export const Inner = styled.div`
  margin: 0 auto;
  max-width: 1100px;
  width: 100%;
  padding: 4rem 1.5rem;
  @media (min-width: 960px) {
    padding: 10rem 1.5rem 10rem;
  }
`;
