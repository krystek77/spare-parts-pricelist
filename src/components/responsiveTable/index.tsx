import React from 'react';
import {
  Container,
  Inner,
  DataList,
  DataItem,
  DataItemInner,
  DataItemName,
  DataItemValue,
  DataItemControls,
  DataItemControlButton,
  DataItemDeleteButton,
  DataItemEditButton,
  DataItemComment,
  DataItemDescription,
  AriaLabeledBy,
  Message,
} from './styles/responsiveTable';

const defaultValue = {
  isOpenDescription: false,
  setIsOpenDescription: () => {},
  isOpenComment: false,
  setIsOpenComment: () => {},
};
interface IResponsiveTableContext {
  isOpenDescription: boolean;
  setIsOpenDescription: (isOpenDescription: boolean) => void;
  isOpenComment: boolean;
  setIsOpenComment: (isOpenComment: boolean) => void;
}
const ResponsiveTableContext = React.createContext<IResponsiveTableContext>(
  defaultValue
);
const ResponsiveTableContextProvider: React.FC = ({ children }) => {
  const [isOpenDescription, setIsOpenDescription] = React.useState<boolean>(
    false
  );
  const [isOpenComment, setIsOpenComment] = React.useState<boolean>(false);

  return (
    <ResponsiveTableContext.Provider
      value={{
        isOpenDescription,
        isOpenComment,
        setIsOpenDescription,
        setIsOpenComment,
      }}
    >
      {children}
    </ResponsiveTableContext.Provider>
  );
};

interface IResponsiveTable {
  DataList: React.FC;
  DataItem: React.FC;
  DataItemInner: React.FC;
  DataItemName: React.FC;
  DataItemValue: React.FC;
  DataItemControls: React.FC;
  DataItemControlButton: React.FC<{
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
  DataItemDeleteButton: React.FC<{
    ['aria-label']?: string;
    ['aria-labelledby']?: string;
    type: 'button';
    title?: string;
    onClick?: () => void;
    onKeyDown?: () => void;
  }>;
  DataItemEditButton: React.FC<{
    ['aria-label']?: string;
    ['aria-labelledby']?: string;
    to:
      | string
      | { pathname: string; search: string }
      | { pathname: string; query: { sparePartID: string } };
    title?: string;
    onClick?: () => void;
  }>;
  DataItemComment: React.FC<{}>;
  DataItemDescription: React.FC<{}>;
  AriaLabeledBy: React.FC<{ id?: string }>;
  Message: React.FC<{}>;
}

export const ResponsiveTable: React.FC & IResponsiveTable = ({ children }) => {
  return (
    <Container>
      <Inner>{children}</Inner>
    </Container>
  );
};

ResponsiveTable.DataList = function ResponsiveTableDataList({
  children,
  ...restProps
}) {
  return <DataList {...restProps}>{children}</DataList>;
};

ResponsiveTable.DataItem = function ResponsiveTableDataItem({
  children,
  ...restProps
}) {
  return (
    <ResponsiveTableContextProvider>
      <DataItem {...restProps}>{children}</DataItem>
    </ResponsiveTableContextProvider>
  );
};
ResponsiveTable.DataItemInner = function ResponsiveTableDataItemInner({
  children,
  ...restProps
}) {
  return <DataItemInner {...restProps}>{children}</DataItemInner>;
};

ResponsiveTable.DataItemName = function ResponsiveTableDataItemName({
  children,
  ...restProps
}) {
  return <DataItemName {...restProps}>{children}</DataItemName>;
};

ResponsiveTable.DataItemValue = function ResponsiveTableDataItemValue({
  children,
  ...restProps
}) {
  return <DataItemValue {...restProps}>{children}</DataItemValue>;
};
ResponsiveTable.DataItemControls = function ResponsiveTableDataItemControls({
  children,
  ...restProps
}) {
  return <DataItemControls {...restProps}>{children}</DataItemControls>;
};
ResponsiveTable.DataItemControlButton = function ResponsiveTableDataItemControlButton({
  children,
  ...restProps
}) {
  const {
    isOpenDescription,
    setIsOpenDescription,
    isOpenComment,
    setIsOpenComment,
  } = React.useContext<IResponsiveTableContext>(ResponsiveTableContext);
  const { btn } = restProps;
  return (
    <DataItemControlButton
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
    </DataItemControlButton>
  );
};
ResponsiveTable.DataItemDeleteButton = function ResponsiveTableDataItemDeleteButton({
  children,
  ...restProps
}) {
  return <DataItemDeleteButton {...restProps}>{children}</DataItemDeleteButton>;
};
ResponsiveTable.DataItemEditButton = function ResponsiveTableDataItemEditButton({
  children,
  to,
  ...restProps
}) {
  return (
    <DataItemEditButton to={to} {...restProps}>
      {children}
    </DataItemEditButton>
  );
};
ResponsiveTable.DataItemDescription = function ResponsiveTableDataItemDescription({
  children,
  ...restProps
}) {
  const { isOpenDescription } = React.useContext<IResponsiveTableContext>(
    ResponsiveTableContext
  );
  return isOpenDescription ? (
    <DataItemDescription {...restProps}>{children}</DataItemDescription>
  ) : null;
};
ResponsiveTable.DataItemComment = function ResponsiveTableDataItemComment({
  children,
  ...restProps
}) {
  const { isOpenComment } = React.useContext<IResponsiveTableContext>(
    ResponsiveTableContext
  );
  return isOpenComment ? (
    <DataItemComment {...restProps}>{children}</DataItemComment>
  ) : null;
};
ResponsiveTable.Message = function ResponsiveTableMessage({
  children,
  ...restProps
}) {
  return <Message {...restProps}>{children}</Message>;
};
ResponsiveTable.AriaLabeledBy = function TableAriaLabeledBy({
  children,
  ...restProps
}) {
  return <AriaLabeledBy {...restProps}>{children}</AriaLabeledBy>;
};
export default ResponsiveTable;
