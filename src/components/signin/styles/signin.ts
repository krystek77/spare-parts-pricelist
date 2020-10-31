import styled from 'styled-components/macro';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  background-color: rgba(0, 0, 0, 0.6);
`;
export const Inner = styled.div`
  width: 100%;
  max-width: 320px;
  background-color: #131313;
  border: 1px solid black;
  padding: 1rem;
  border-radius: 0.4rem;
`;
export const ErrorServer = styled.p`
  background-color: ${({ theme }) => theme.colors.warnning};
  color: ${({ theme }) => theme.colors.dark};
  padding: 1rem;
  border-radius: 0.2rem;
  margin-bottom: 0.5rem;
  font-weight: 400;
`;
export const Error = styled.p`
  color: ${({ theme }) => theme.colors.warnning};
  padding-left: 1rem;
  margin-bottom: 0.5rem;
  font-size: 0.8rem;
  font-weight: 300;
`;
export const BaseForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
export const Title = styled.h2`
  font-size: 1rem;
  margin-bottom: 1rem;
`;
export const Input = styled.input`
  padding: 0.7rem;
  font-size: 0.8rem;
  margin-bottom: 0.5rem;
  border: none;
  border-radius: 0.2rem;
  background-color: ${({ theme }) => theme.colors.gray};
  outline: none;
  font-weight: 200;
  color: ${({ theme }) => theme.colors.light};
  &::placeholder {
    color: ${({ theme }) => theme.colors.light};
    font-weight: 200;
  }
`;
export const Break = styled.div`
  width: 100%;
  flex-basis: 1rem;
`;
export const SubmitButton = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.primary_darker};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.light};
  border-radius: 0.2rem;
  padding: 0.5rem;
  outline: none;
  cursor: pointer;
  transition: all 0.3s ease-in;
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
    border: 1px solid ${({ theme }) => theme.colors.secondary_lighter};
  }
  &:disabled {
    pointer-events: none;
    background-color: ${({ theme }) => theme.colors.gray};
    border-color: ${({ theme }) => theme.colors.gray};
  }
`;
export const TextSmall = styled.p`
  font-size: 0.8rem;
  font-weight: 200;
  padding: 0.5rem;
`;
