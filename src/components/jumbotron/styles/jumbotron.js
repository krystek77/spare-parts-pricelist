import styled from 'styled-components/macro';

export const Container = styled.section`
  width: 100%;
`;
export const Inner = styled.div`
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 1100px;
  margin: 0 auto;
  @media (min-width: 960px) {
    flex-direction: ${({ direction }) => direction};
    justify-content: space-between;
  }
`;
export const Pane = styled.div`
  @media (min-width: 960px) {
    width: 50%;
    padding: 1rem;
  }
`;
export const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  text-transform: capitalize;
`;
export const SubTitle = styled.p`
  font-weight: 200;
  font-size: 1.5rem;
  line-height: 1.4;
  margin-bottom: 1.5rem;
`;
export const Image = styled.img`
  display: block;
  max-width: 100%;
`;
export const Divider = styled.div`
  border-bottom: 2px solid ${({ theme }) => theme.colors.dark};
`;
