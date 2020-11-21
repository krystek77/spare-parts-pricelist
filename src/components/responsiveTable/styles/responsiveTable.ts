import styled from 'styled-components/macro';
import { Link as ReactRouterLink } from 'react-router-dom';
export const Container = styled.div`
  width: 100%;
`;
export const Inner = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;
export const DataList = styled.ul`
  list-style: none;
  padding-left: 0;
  margin-top: 0;
`;
export const DataItem = styled.li`
  &:first-child {
    display: none;
    visibility: hidden;
    @media (min-width: 960px) {
      visibility: visible;
      display: block;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      background-color: ${({ theme }) => theme.colors.secondary_darker};
      div:first-child {
        span {
          display: block;
          /* color: red; */
          width: 40px;
          text-align: center;
        }
      }
      div:not(:first-child) {
        /* flex-wrap: wrap; */
        span {
          display: block;
          /* color: pink; */
          width: 100px;
          text-align: center;
        }
      }
    }
  }
  &:not(:first-child) {
    flex-wrap: wrap;
    align-items: center;
    @media (min-width: 960px) {
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      &:nth-child(even) {
        background-color: ${({ theme }) => theme.colors.gray_lighter};
      }
      &:nth-child(odd) {
        background-color: ${({ theme }) => theme.colors.gray};
      }
      div:first-child {
        span {
          display: none;
        }
        div {
          /* color: red; */
          width: 40px;
          text-align: center;
        }
      }
      div:not(:first-child) {
        span {
          display: none;
        }
        div {
          /* color: green; */
          text-align: center;
          font-size: 1rem;
          width: 100px;
        }
      }
    }
  }
  margin-bottom: 0.5rem;
  @media (min-width: 960px) {
    display: flex;
    flex-wrap: wrap;
  }
`;
export const DataItemInner = styled.div`
  display: flex;
  margin-bottom: 0.1rem;

  span {
    font-weight: 300;
  }
  &:nth-child(odd) {
    background-color: ${({ theme }) => theme.colors.gray};
    @media (min-width: 960px) {
      background-color: transparent;
    }
  }
  &:nth-child(even) {
    background-color: ${({ theme }) => theme.colors.gray_lighter};
    @media (min-width: 960px) {
      background-color: transparent;
    }
  }
  &:nth-child(3) {
    div {
      color: ${({ theme }) => theme.colors.light};
      font-weight: 600;
      font-size: 1rem;
    }
  }
  &:nth-child(7) {
    div {
      color: ${({ theme }) => theme.colors.warnning};
      font-weight: 400;
      font-size: 1.3rem;
    }
  }
  @media (min-width: 960px) {
    flex-wrap: nowrap;
  }
`;
export const DataItemName = styled.span`
  width: 120px;
  padding: 0.5rem;
  border-right: 2px solid ${({ theme }) => theme.colors.dark};
  @media (min-width: 960px) {
    border-right: none;
    display: block;
    width: auto;
  }
`;
export const DataItemValue = styled.div`
  padding: 0.5rem;
  @media (min-width: 960px) {
  }
`;
export const DataItemControls = styled.div`
  text-align: right;
  margin-top: 0.5rem;
  padding: 0.2rem 0.5rem;
  border-top: 1px solid ${({ theme }) => theme.colors.gray};
  /* background-color: ${({ theme }) => theme.colors.warnning}; */
  @media (min-width: 960px) {
    width: 100%;
    margin-top: 0;
    border-top: 1px solid ${({ theme }) => theme.colors.dark};
  }
`;
export const DataItemControlButton = styled.button<{ btn?: string }>`
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
  &:disabled {
    pointer-events: none;
    background-color: ${({ theme }) => theme.colors.gray};
    color: ${({ theme }) => theme.colors.medium};
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary_darker};
    color: ${({ theme }) => theme.colors.light};
  }
  &:focus {
    outline: auto;
  }
`;
export const DataItemDeleteButton = styled.button`
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
  &:focus {
    outline: auto;
  }
`;
export const DataItemEditButton = styled(ReactRouterLink)`
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
  &:focus {
    outline: auto;
  }
`;
export const DataItemDescription = styled.p`
  padding: 0.5rem;
  /* border-bottom: 1px solid ${({ theme }) => theme.colors.secondary}; */
  @media (min-width: 960px) {
    width: 100%;
    background-color: ${({ theme }) => theme.colors.medium};
    color: ${({ theme }) => theme.colors.dark};
  }
`;
export const DataItemComment = styled.p`
  padding: 0.5rem;
  @media (min-width: 960px) {
    width: 100%;
    background-color: ${({ theme }) => theme.colors.medium};
    color: ${({ theme }) => theme.colors.dark};
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
export const AriaLabeledBy = styled.span<{ id?: string }>`
  display: none;
  visibility: hidden;
`;
