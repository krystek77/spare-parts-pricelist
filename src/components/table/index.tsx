import React from 'react';
import {
  Container,
  Inner,
  BaseTable,
  CommentsContentsColTable,
  ContentColTable,
  DescriptionContentColTable,
  HeaderColTable,
  HeaderContentColTable,
  HeaderContentFieldColTable,
  HeaderRowTable,
  OrdinaryNumberColTable,
  RowTable,
  HeaderContentRowTable,
  Controls,
  ControlButton,
  ControlButtonDelete,
  EditLink,
  BodyTable,
  Message,
  AriaLabeledBy,
} from './styles/table';
interface ITable {
  BaseTable: React.FC;
  BodyTable: React.FC;
  CommentsContentsColTable: React.FC;
  ContentColTable: React.FC;
  DescriptionContentColTable: React.FC;
  HeaderColTable: React.FC;
  HeaderContentColTable: React.FC;
  HeaderContentFieldColTable: React.FC;
  HeaderRowTable: React.FC;
  OrdinaryNumberColTable: React.FC;
  RowTable: React.FC;
  HeaderContentRowTable: React.FC;
  Controls: React.FC;
  ControlButton: React.FC<{
    ['aria-label']?: string;
    ['aria-labelledby']?: string;
    disabled?: boolean;
    id?: string;
    type: 'button';
    onClick?: () => void;
    onKeyDown?: () => void;
    title?: string;
    btn?: string;
  }>;
  ControlButtonDelete: React.FC<{
    ['aria-label']?: string;
    ['aria-labelledby']?: string;
    type: 'button';
    title?: string;
    onClick?: () => void;
    onKeyDown?: () => void;
  }>;
  EditLink: React.FC<{
    ['aria-label']?: string;
    ['aria-labelledby']?: string;
    to:
      | string
      | { pathname: string; search: string }
      | { pathname: string; query: { sparePartID: string } };
    title?: string;
    onClick?: () => void;
  }>;
  Message: React.FC;
  AriaLabeledBy: React.FC<{ id?: string }>;
}
const defaultValue = {
  isOpenDescription: false,
  setIsOpenDescription: () => {},
  isOpenComment: false,
  setIsOpenComment: () => {},
};
interface ITabelContext {
  isOpenDescription: boolean;
  setIsOpenDescription: (isOpenDescription: boolean) => void;
  isOpenComment: boolean;
  setIsOpenComment: (isOpenComment: boolean) => void;
}
const TableContext = React.createContext<ITabelContext>(defaultValue);
const TableContextProvider: React.FC = ({ children }) => {
  const [isOpenDescription, setIsOpenDescription] = React.useState<boolean>(
    false
  );
  const [isOpenComment, setIsOpenComment] = React.useState<boolean>(false);

  return (
    <TableContext.Provider
      value={{
        isOpenDescription,
        isOpenComment,
        setIsOpenDescription,
        setIsOpenComment,
      }}
    >
      {children}
    </TableContext.Provider>
  );
};

export const Table: React.FC & ITable = ({ children }) => {
  return (
    <Container>
      <Inner>{children}</Inner>
    </Container>
  );
};

Table.BaseTable = function TableBaseTable({ children, ...restProps }) {
  return <BaseTable {...restProps}>{children}</BaseTable>;
};
Table.HeaderRowTable = function TableHeaderRowTable({
  children,
  ...restProps
}) {
  return <HeaderRowTable {...restProps}>{children}</HeaderRowTable>;
};
Table.HeaderColTable = function TableHeaderColTable({
  children,
  ...restProps
}) {
  return <HeaderColTable {...restProps}>{children}</HeaderColTable>;
};
Table.RowTable = function TableRowTable({ children, ...restProps }) {
  return <RowTable {...restProps}>{children}</RowTable>;
};

Table.OrdinaryNumberColTable = function TableOrdinaryNumberColTable({
  children,
  ...restProps
}) {
  return (
    <OrdinaryNumberColTable {...restProps}>{children}</OrdinaryNumberColTable>
  );
};
Table.ContentColTable = function TableContentColTable({
  children,
  ...restProps
}) {
  return <ContentColTable {...restProps}>{children}</ContentColTable>;
};

Table.HeaderContentColTable = function TableHeaderContentColTable({
  children,
  ...restProps
}) {
  return (
    <HeaderContentColTable {...restProps}>{children}</HeaderContentColTable>
  );
};
Table.HeaderContentFieldColTable = function TableHeaderContentFieldColTable({
  children,
  ...restProps
}) {
  return (
    <HeaderContentFieldColTable {...restProps}>
      {children}
    </HeaderContentFieldColTable>
  );
};

Table.BodyTable = function TableBodyTable({ children, ...restProps }) {
  return (
    <TableContextProvider>
      <BodyTable {...restProps}>{children}</BodyTable>
    </TableContextProvider>
  );
};

Table.DescriptionContentColTable = function TableDescriptionContentColTable({
  children,
  ...restProps
}) {
  const { isOpenDescription } = React.useContext<ITabelContext>(TableContext);
  return isOpenDescription ? (
    <DescriptionContentColTable {...restProps}>
      {children}
    </DescriptionContentColTable>
  ) : null;
};

Table.CommentsContentsColTable = function TableCommentsContentsColTable({
  children,
  ...restProps
}) {
  const { isOpenComment } = React.useContext<ITabelContext>(TableContext);
  return isOpenComment ? (
    <CommentsContentsColTable {...restProps}>
      {children}
    </CommentsContentsColTable>
  ) : null;
};

Table.Controls = function TableControls({ children, ...restProps }) {
  return <Controls {...restProps}>{children}</Controls>;
};
Table.ControlButton = function TableControlButton({ children, ...restProps }) {
  const {
    isOpenDescription,
    setIsOpenDescription,
    isOpenComment,
    setIsOpenComment,
  } = React.useContext<ITabelContext>(TableContext);
  const { btn } = restProps;
  return (
    <ControlButton
      {...restProps}
      onClick={() => {
        switch (btn) {
          case 'DESCRIPTION':
            setIsOpenDescription(!isOpenDescription);
            break;
          case 'COMMENT':
            setIsOpenComment(!isOpenComment);
            break;
          default:
            break;
        }
      }}
    >
      {children}
    </ControlButton>
  );
};

Table.ControlButtonDelete = function TableControlButtonDelete({
  children,
  ...restProps
}) {
  return <ControlButtonDelete {...restProps}>{children}</ControlButtonDelete>;
};

Table.EditLink = function TableEditLink({ children, to, ...restProps }) {
  return (
    <EditLink to={to} {...restProps}>
      {children}
    </EditLink>
  );
};

Table.HeaderContentRowTable = function TableHeaderContentRowTable({
  children,
  ...restProps
}) {
  return (
    <HeaderContentRowTable {...restProps}>{children}</HeaderContentRowTable>
  );
};

Table.Message = function TableMessage({ children, ...restProps }) {
  return <Message {...restProps}>{children}</Message>;
};
Table.AriaLabeledBy = function TableAriaLabeledBy({ children, ...restProps }) {
  return <AriaLabeledBy {...restProps}>{children}</AriaLabeledBy>;
};
