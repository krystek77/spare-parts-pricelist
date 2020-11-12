import styled from 'styled-components/macro';

export const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.dark};
  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-radius: 0.2rem;
  color: ${({ theme }) => theme.colors.light};
  font-size: 0.9rem;
  padding: 0.4rem 0.8rem;
  outline: none;
  margin-top: 0.2rem;
  margin-left: auto;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  transition: all 0.3s ease-in;
  &:hover {
    background-color: ${({ theme }) => theme.colors.light};
    color: ${({ theme }) => theme.colors.dark};
  }
`;
export const AddButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.primary};
  border: 1px solid ${({ theme }) => theme.colors.primary_darker};
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary_darker};
    color: ${({ theme }) => theme.colors.light};
  }
`;
export const CancelButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.secondary};
  border: 1px solid ${({ theme }) => theme.colors.secondary_darker};
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary_darker};
    color: ${({ theme }) => theme.colors.light};
  }
`;

export const TransparentButton = styled(Button)`
  background-color: transparent;
  border: 1px solid transparent;
  &:hover {
    background-color: transparent;
  }
`;

export const Label = styled.span`
  margin: 0 0.5rem;
`;
export const Icon = styled.span``;

/** EXAMPLE BUTTONS COMPOSITIONS */

// <CustomButton btn={'CANCEL'}>CANCEL</CustomButton>
// <CustomButton btn={'ADD'}>ADD</CustomButton>
// <CustomButton>DEFAULT</CustomButton>

// <CustomButton btn={'ADD'}>
//    <CustomButton.Icon>+</CustomButton.Icon>
//    <CustomButton.Label>ADD</CustomButton.Label>
// </CustomButton>

// <CustomButton btn={'CANCEL'}>
//    <CustomButton.Label>CANCEL</CustomButton.Label>
//    <CustomButton.Icon>-</CustomButton.Icon>
// </CustomButton>
//
// <CustomButton>
//      <CustomButton.Icon>-</CustomButton.Icon>
// </CustomButton>
//
// <CustomButton btn={'ADD'}>
//   <CustomButton.Icon>+</CustomButton.Icon>
// </CustomButton>
