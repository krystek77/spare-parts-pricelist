import styled from 'styled-components/macro';
import { Link as ReactRouterLink } from 'react-router-dom';

export const Container = styled.div<{ bgColor?: boolean }>`
  width: 100%;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  height: ${(props) => (props.bgColor ? '48px' : '88px')};
  position: ${(props) => (props.bgColor ? 'fixed' : 'static')};
  top: ${(props) => (props.bgColor ? '0px' : 'auto')};
  left: ${(props) => (props.bgColor ? '0px' : 'auto')};
  z-index: ${(props) => (props.bgColor ? '100' : 'auto')};
  background-color: ${(props) =>
    props.bgColor ? props.theme.colors.primary : 'transparent'};
  color: ${(props) => props.theme.colors.light};
  border-bottom: ${(props) =>
    props.bgColor ? `1px solid ${props.theme.colors.primary_darker}` : 'none'};
  border-top: ${(props) =>
    props.bgColor ? `1px solid ${props.theme.colors.primary_darker}` : 'none'};
`;
export const Inner = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  max-width: 1100px;
  margin: 0 auto;
`;
export const Panel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const LogoLink = styled(ReactRouterLink)`
  color: ${(props) => props.theme.colors.light};
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const ButtonLink = styled(ReactRouterLink)`
  border-radius: 0.2rem;
  color: ${({ theme }) => theme.colors.light};
  font-size: 0.9rem;
  padding: 0.4rem 0.8rem;
  outline: none;
  margin: 0.2rem;
  text-decoration: none;
  width: fit-content;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  transition: all 0.3s ease-in;
  background-color: ${({ theme }) => theme.colors.primary};
  border: 1px solid ${({ theme }) => theme.colors.primary_lighter};
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
    border: 1px solid ${({ theme }) => theme.colors.secondary_lighter};
  }
`;
export const LogoIcon = styled.img`
  width: 24px;
  height: auto;
  display: block;
`;
export const LogoText = styled.span`
  color: ${(props) => props.theme.colors.lighter};
  margin-left: 0.5rem;
  font-size: 0.9rem;
`;
