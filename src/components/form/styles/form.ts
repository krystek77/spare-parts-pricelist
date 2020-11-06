import styled from 'styled-components/macro';

export const Container = styled.div<{ bgColor?: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  ${(props) =>
    props.bgColor ? 'background-color: rgba(0, 0, 0, 0.6)' : 'transparent'};
`;
export const Inner = styled.div`
  width: 100%;
  max-width: 640px;
  min-width: 320px;
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
  width: 100%;
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
export const InputsGroup = styled.div`
  display: flex;
  align-items: center;

  flex-grow: 1;
`;
export const RadioInput = styled.input``;
export const InputLabel = styled.label`
  font-size: 0.8rem;
  font-weight: 300;
  padding: 0.3rem;
  cursor: pointer;
`;
export const IconButton = styled.button`
  padding: 0.5rem;
  margin-left: auto;
  cursor: pointer;
  text-align: center;
  border: none;
  border-radius: 0.2rem;
  font-weight: 400;
  outline: none;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.medium};
  border-left: 1px solid ${({ theme }) => theme.colors.secondary_darker};
  border-bottom: 1px solid ${({ theme }) => theme.colors.secondary_darker};
  background-color: ${({ theme }) => theme.colors.secondary};

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary_darker};
  }
`;
