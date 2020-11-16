import styled from 'styled-components/macro';

export const Container = styled.div`
  padding: 0 1.5rem;
`;
export const Inner = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 2rem 0;
  max-width: 360px;
  margin: 0 auto;
`;
export const Input = styled.input`
  padding: 0.5rem;
  outline: none;
  font-size: 1.4rem;
  font-weight: 300;
  border: 1px solid ${({ theme }) => theme.colors.dark};
  border-top-left-radius: 0.2rem;
  border-bottom-left-radius: 0.2rem;
  &::placeholder {
    font-weight: 300;
    font-size: 1.4rem;
  }
`;
export const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.light};
  padding-left: 1rem;
  padding-right: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.primary_darker};
  border-top-right-radius: 0.2rem;
  border-bottom-right-radius: 0.2rem;
  outline: none;
  cursor: pointer;
  transition: all 0.3s ease-in;
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
    border: 1px solid ${({ theme }) => theme.colors.secondary_lighter};
  }
  &:focus {
    outline: auto;
  }
`;
export const Text = styled.h2`
  width: 100%;
  text-align: center;
  font-size: 1.1rem;
  font-weight: 400;
`;
export const Break = styled.div`
  flex-basis: 100%;
  height: 0.5rem;
`;
export const AriaLabeledBy = styled.span<{ id?: string }>`
  display: none;
  visibility: hidden;
`;
export const Label = styled.label`
  /* display: none;
  visibility: hidden; */
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: 1rem;
  background-color: ${({ theme }) => theme.colors.light};
  padding: 0.3rem 0.8rem;
  border-radius: 0.2rem;
`;
