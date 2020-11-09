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
} from './styles/table';
interface ITable {
  BaseTable: React.FC;
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
    type: 'button';
    onClick?: () => void;
    onKeyDown?: () => void;
    title?: string;
    btn?: string;
  }>;
}
export const Table: React.FC & ITable = ({ children }) => {
  return (
    <Container>
      <Inner>{children}</Inner>
    </Container>
  );
};
Table.Controls = function TableControls({ children, ...restProps }) {
  return <Controls {...restProps}>{children}</Controls>;
};
Table.ControlButton = function TableControlButton({ children, ...restProps }) {
  return <ControlButton {...restProps}>{children}</ControlButton>;
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

Table.DescriptionContentColTable = function TableDescriptionContentColTable({
  children,
  ...restProps
}) {
  return (
    <DescriptionContentColTable {...restProps}>
      {children}
    </DescriptionContentColTable>
  );
};

Table.CommentsContentsColTable = function TableCommentsContentsColTable({
  children,
  ...restProps
}) {
  return (
    <CommentsContentsColTable {...restProps}>
      {children}
    </CommentsContentsColTable>
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
