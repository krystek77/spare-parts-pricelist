import styled from 'styled-components/macro';

export const Container = styled.div<{ bgColor?: boolean; size?: string }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  margin-top: ${({ size }) => size && '1rem'};
  margin-bottom: ${({ size }) => size && '1rem'};
  ${(props) =>
    props.bgColor ? 'background-color: rgba(0, 0, 0, 0.6)' : 'transparent'};
`;
export const Inner = styled.div<{ size?: string }>`
  width: 100%;
  max-width: 640px;
  ${({ size }) =>
    size === 'addPriceList'
      ? `max-width:252px`
      : size === 'signin'
      ? `max-width:320px`
      : `min-width:320px`};
  background-color: #131313;
  border: 1px solid black;
  padding: 1rem;
  border-radius: 0.4rem;
  position: relative;
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
  &:focus {
    background-color: ${({ theme }) => theme.colors.green};
    color: ${({ theme }) => theme.colors.dark};
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
export const ClearButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  margin-top: 0.5rem;
  margin-right: 0.5rem;
  cursor: pointer;
  outline: none;
  border: 1px solid ${({ theme }) => theme.colors.dark};
  border-radius: 0.2rem;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary_darker};
    color: ${({ theme }) => theme.colors.light};
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
  position: relative;
  flex-grow: 1;
`;
export const RadioInput = styled.input``;
export const CheckBoxInput = styled.input``;
export const InputLabel = styled.label`
  font-size: 0.8rem;
  font-weight: 300;
  padding: 0.3rem;
  min-width: 100px;
  cursor: pointer;
`;
export const IconButton = styled.button`
  /* position: relative; */
  padding: 0.5rem;
  /* margin-left: auto; */
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
  display: flex;
  justify-content: center;
  span {
    font-size: 0.8rem;
    font-weight: 300;
    margin-left: 0.5rem;
  }
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary_darker};
  }
`;

export const TextAreaInput = styled.textarea`
  resize: none;
  flex-grow: 1;
  padding: 0.7rem;
  font-size: 1rem;
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
    font-size: 0.8rem;
  }
`;

export const CustomButton = styled.button<{ btn?: string }>`
  background-color: ${({ theme }) => theme.colors.dark};
  background-color: ${({ btn, theme }) =>
    btn === 'ADD' ? theme.colors.secondary : theme.colors.primary};
  border: 1px solid ${({ theme }) => theme.colors.gray};
  border: 1px solid
    ${({ btn, theme }) =>
      btn === 'ADD'
        ? theme.colors.secondary_darker
        : theme.colors.primary_darker};
  border-radius: 0.2rem;
  color: ${({ theme }) => theme.colors.light};
  font-size: 0.9rem;
  padding: 0.4rem 0.8rem;
  outline: none;
  margin-right: 0.2rem;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  transition: all 0.3s ease-in;

  &:hover {
    background-color: ${({ theme }) => theme.colors.light};
    color: ${({ theme }) => theme.colors.dark};
    background-color: ${({ btn, theme }) =>
      btn === 'ADD'
        ? theme.colors.secondary_darker
        : theme.colors.primary_darker};
    color: ${({ btn, theme }) =>
      (btn === 'ADD' || btn === 'CANCEL') && theme.colors.light};
  }
  :disabled {
    background-color: ${({ theme }) => theme.colors.dark};
    color: ${({ theme }) => theme.colors.light};
    border-color: ${({ theme }) => theme.colors.gray};
    pointer-events: none;
  }
`;
export const AriaLabeledBy = styled.span<{ id?: string }>`
  display: none;
  visibility: hidden;
`;
