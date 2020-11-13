import styled from 'styled-components/macro';
export const Container = styled.div`
  width: 100%;
  padding: 0 1rem;
`;
export const Inner = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const ImageWrapper = styled.div``;
export const DataWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  min-width: 280px;
  max-width: 480px;
`;
export const Image = styled.img`
  display: block;
  max-width: 100%;
`;
export const Data = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  background-color: #333333;
  margin-bottom: 0.3rem;
  color: #b7b7b7;
  &:nth-child(2) {
    div:last-child {
      font-weight: 600;
      color: ${({ theme }) => theme.colors.green};
    }
  }
`;
export const DataLabel = styled.div`
  margin-right: 0.5rem;
  min-width: 100px;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  font-weight: 300;
  font-size: 0.8rem;
`;
export const DataValue = styled.div`
  flex-grow: 1;
  font-weight: 300;
  font-size: 1rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
`;
