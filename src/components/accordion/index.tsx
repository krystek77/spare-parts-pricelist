import React from 'react';
import {
  Container,
  Inner,
  Title,
  List,
  ListItem,
  Header,
  Body,
} from './style/accordion';

const defaultAccordionContext = {
  isOpen: false,
  setIsOpen: () => {},
};
interface IAccordionContext {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}
const AccordionContext = React.createContext<IAccordionContext>(
  defaultAccordionContext
);

const AccordionContextProvider: React.FC = (props) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  return (
    <AccordionContext.Provider value={{ isOpen, setIsOpen }}>
      {props.children}
    </AccordionContext.Provider>
  );
};

interface IAccordionComposition {
  Container: React.FC<{ someProps: string }>;
  Title: React.FC<{}>;
  List: React.FC<{}>;
  ListItem: React.FC<{}>;
  Header: React.FC<{}>;
  Body: React.FC<{}>;
}

export const Accordion: React.FC & IAccordionComposition = ({
  children,
  ...restProps
}) => {
  return <Inner {...restProps}>{children}</Inner>;
};

Accordion.Container = function AccordionContainer({ children, ...restProps }) {
  return <Container {...restProps}>{children}</Container>;
};
Accordion.Title = function AccordionTitle({ children, ...restProps }) {
  return <Title {...restProps}>{children}</Title>;
};
Accordion.List = function AccordionList({ children, ...restProps }) {
  return <List {...restProps}>{children}</List>;
};
Accordion.ListItem = function AccordionListItem({ children, ...restProps }) {
  return (
    <AccordionContextProvider>
      <ListItem {...restProps}>{children}</ListItem>
    </AccordionContextProvider>
  );
};
Accordion.Header = function AccordionHeader({ children, ...restProps }) {
  const { isOpen, setIsOpen } = React.useContext<IAccordionContext>(
    AccordionContext
  );
  return (
    <Header {...restProps} onClick={() => setIsOpen(!isOpen)} active={isOpen}>
      <span>{children}</span>
      {isOpen ? (
        <span className='close'>X</span>
      ) : (
        <span className='open'>+</span>
      )}
    </Header>
  );
};
Accordion.Body = function AccordionBody({ children, ...restProps }) {
  const { isOpen } = React.useContext<IAccordionContext>(AccordionContext);
  return isOpen ? <Body {...restProps}>{children}</Body> : null;
};
