import styled from 'styled-components/macro';
export const Container = styled.div`
  width: 100%;
`;
export const Inner = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;
export const BaseTable = styled.ul`
  list-style-type: none;
  padding-left: 0;
  margin-bottom: 0;
  margin-top: 0;
  background-color: ${({ theme }) => theme.colors.secondary_lighter};
`;
export const HeaderRowTable = styled.li`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  /* flex-wrap: nowrap; */
  background-color: black;
  margin-bottom: 0.4rem;
  /* border-bottom: 1px solid ${({ theme }) => theme.colors.secondary}; */
`;
export const HeaderContentRowTable = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  /* border-bottom: 1px solid ${({ theme }) => theme.colors.secondary}; */
  flex-grow: 1;
`;
export const HeaderColTable = styled.span`
  flex-shrink: 1;
  font-weight: 300;
  font-size: 0.9rem;
  padding: 0.5rem;
  text-align: center;
  width: 115px;
`;
export const RowTable = styled.li`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 0.4rem;
  background-color: ${({ theme }) => theme.colors.light};
  color: ${({ theme }) => theme.colors.dark};
  font-size: 0.9rem;
  font-weight: 300;
  /* border-bottom: 1px solid ${({ theme }) => theme.colors.secondary}; */
`;
export const OrdinaryNumberColTable = styled.span`
  padding: 0.5rem;
  font-weight: 600;
  font-size: 0.9rem;
  flex-shrink: 0;
  width: 50px;
  display: block;
  text-align: center;
`;
export const ContentColTable = styled.div`
  flex-grow: 1;
  border-left: 1px solid ${({ theme }) => theme.colors.secondary};
`;
export const HeaderContentColTable = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  /* border-bottom: 1px solid ${({ theme }) => theme.colors.secondary};  */
`;
export const HeaderContentFieldColTable = styled.span`
  flex-shrink: 1;
  font-weight: 300;
  font-size: 0.9rem;
  padding: 0.5rem;
  text-align: center;
  width: 115px;
  &:first-child {
    font-weight: 600;
    text-align: left;
  }
  &:last-child {
    font-weight: 600;
    text-align: right;
    color: ${({ theme }) => theme.colors.secondary};
  }
  &:nth-child(2) {
    font-style: italic;
    font-size: 1rem;
  }
`;
export const DescriptionContentColTable = styled.p`
  padding: 0.5rem;
  border-top: 1px solid ${({ theme }) => theme.colors.secondary};
`;
export const CommentsContentsColTable = styled.p`
  padding: 0.5rem;
  border-top: 1px solid ${({ theme }) => theme.colors.secondary};
`;
