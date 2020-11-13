import styled from 'styled-components/macro';
import { ROLES } from '../../../helpers';
export const Container = styled.div`
  width: 100%;
  padding: 0 1rem;
  max-width: 900px;
  margin: 0 auto;
`;
export const Inner = styled.div<{ userList?: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: ${({ userList }) => userList && 'row'};
  justify-content: ${({ userList }) => userList && 'center'};
  padding-top: ${({ userList }) => userList && '1rem'};
  padding-bottom: ${({ userList }) => userList && '1rem'};
  border-top: ${({ userList, theme }) => userList && `1px solid #333333`};
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
export const Image = styled.img<{ userList?: boolean }>`
  display: block;
  max-width: 100%;
  min-width: 150px;
  min-height: auto;
  max-width: ${({ userList }) => userList && '150px'};
  max-height: ${({ userList }) => userList && 'auto'};
`;
export const Data = styled.div<{ role?: string }>`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  background-color: #333333;
  ${({ role, theme }) =>
    role === ROLES.ADMIN
      ? `border-bottom:1px solid ${theme.colors.secondary_darker};background-color: ${theme.colors.secondary_lighter};`
      : `border-bottom:none;background-color: #333333`};
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
export const ControlWrapper = styled.div`
  flex-basis: 100%;
  text-align: right;
`;
export const DeleteButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  border: 1px solid ${({ theme }) => theme.colors.primary_darker};
  border-radius: 0.2rem;
  color: ${({ theme }) => theme.colors.light};
  font-size: 0.9rem;
  padding: 0.4rem 0.8rem;
  outline: none;
  cursor: pointer;
  transition: all 0.3s ease-in;
  &:disabled {
    pointer-events: none;
    background-color: ${({ theme }) => theme.colors.dark};
    border: 1px solid ${({ theme }) => theme.colors.gray};
  }
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary_darker};
  }
`;
