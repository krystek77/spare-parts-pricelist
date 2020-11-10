import styled from 'styled-components/macro';
import { Link as ReactRouterLink } from 'react-router-dom';
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
  &:nth-child(6) {
    color: ${({ theme }) => theme.colors.dark};
    font-weight: 600;
    font-size: 0.9rem;
    text-align: right;
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
export const Controls = styled.div`
  background-color: ${({ theme }) => theme.colors.secondary_light};
  /* padding: 0.1rem 0.1rem; */
  text-align: right;
`;
export const ControlButton = styled.button<{ btn?: string }>`
  border: 1px solid ${({ theme }) => theme.colors.dark};
  border-radius: 0.2rem;
  margin: 0.2rem;
  font-size: 0.7rem;
  font-weight: 300;
  text-transform: lowercase;
  background-color: ${({ theme }) => theme.colors.warnning};
  color: ${({ theme }) => theme.colors.dark};
  padding: 0.2rem;
  cursor: pointer;
  transition: all 0.3s ease-in;
  outline: none;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary_darker};
    color: ${({ theme }) => theme.colors.light};
  }
`;
export const BodyTable = styled.div``;
export const ControlButtonDelete = styled.button`
  background-color: ${({ theme }) => theme.colors.primary_darker};
  border: 1px solid ${({ theme }) => theme.colors.dark};
  border-radius: 0.2rem;
  margin: 0.2rem;
  font-size: 0.7rem;
  font-weight: 300;
  text-transform: lowercase;
  color: ${({ theme }) => theme.colors.light};
  padding: 0.2rem;
  cursor: pointer;
  transition: all 0.3s ease-in;
  outline: none;
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary_darker};
  }
`;
export const EditLink = styled(ReactRouterLink)`
  display: inline-block;
  background-color: ${({ theme }) => theme.colors.green};
  border: 1px solid ${({ theme }) => theme.colors.dark};
  border-radius: 0.2rem;
  margin: 0.2rem;
  font-size: 0.7rem;
  font-weight: 300;
  text-transform: lowercase;
  color: ${({ theme }) => theme.colors.light};
  padding: 0.2rem;
  cursor: pointer;
  transition: all 0.3s ease-in;
  outline: none;
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary_darker};
  }
`;
export const Message = styled.div`
  background-color: ${({ theme }) => theme.colors.warnning};
  color: ${({ theme }) => theme.colors.dark};
  padding: 1rem;
  border-radius: 0.2rem;
  font-weight: 400;
  max-width: 320px;
  margin: 0 auto 0.5rem;
  text-align: center;
`;
