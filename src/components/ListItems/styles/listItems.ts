import styled from 'styled-components/macro';
import { Link as ReactRouterLink } from 'react-router-dom';
export const Container = styled.div<{ dropDown?: boolean }>`
  padding: 1rem 0.5rem;
  ${({ dropDown, theme }) =>
    dropDown &&
    `
      position:absolute;
      background-color:${theme.colors.secondary};
      top:100%;
      left:0;
      margin-top:0.4rem;
      border-radius:0.2rem;
      box-shadow:0px 0px 4px 0px rgba(0,0,0,0.6);
      z-index:100;

  `}
`;
export const Inner = styled.div``;
export const Title = styled.h2`
  margin-bottom: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.medium};
`;
export const List = styled.ul`
  list-style-type: none;
  padding-left: 0;
  margin-top: 0;
  margin-bottom: 0;
`;
export const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.2rem;
`;
export const ListButtonGroup = styled.div``;
export const ListItemButton = styled.button<{ active?: boolean }>`
  flex-grow: 1;
  text-align: left;
  padding: 0.5rem;
  cursor: pointer;
  border: none;
  font-weight: 300;
  outline: none;
  color: ${({ theme }) => theme.colors.medium};
  border-bottom: 1px solid ${({ theme }) => theme.colors.secondary_darker};
  background-color: ${({ theme }) => theme.colors.secondary_lighter};

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary_darker};
  }
  ${({ active, theme }) => active && `background-color:${theme.colors.primary}`}
`;

export const ListItemIconButton = styled.button<{ group?: boolean }>`
  padding: 0.5rem;
  cursor: pointer;
  text-align: center;
  border: none;
  font-weight: 400;
  outline: none;
  color: ${({ theme }) => theme.colors.medium};
  border-left: 1px solid ${({ theme }) => theme.colors.secondary_darker};
  border-bottom: 1px solid ${({ theme }) => theme.colors.secondary_darker};
  background-color: ${({ theme }) => theme.colors.secondary};
  ${(props) =>
    props.group
      ? `background-color: ${props.theme.colors.primary}`
      : `background-color: ${props.theme.colors.secondary}`};
  ${(props) =>
    props.group && `border:1px solid ${props.theme.colors.primary_darker}`};
  ${(props) =>
    props.group && `border-radius:0.2rem;font-size:0.8rem;padding:0.3rem`};

  &:hover {
    ${(props) =>
      props.group
        ? `background-color: ${props.theme.colors.primary_darker}}`
        : `background-color: ${props.theme.colors.secondary_darker}`};
  }
`;
export const ListItemButtonLink = styled(ReactRouterLink)`
  color: ${({ theme }) => theme.colors.secondary_lighter};
  margin-bottom: 0.2rem;
  &:hover {
    color: ${({ theme }) => theme.colors.medium};
  }
`;
