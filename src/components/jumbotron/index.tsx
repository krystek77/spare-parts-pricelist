import React from 'react';
import {
  Inner,
  Container,
  Title,
  SubTitle,
  Pane,
  Image,
  Divider,
} from './styles/jumbotron';

interface Props {
  children: React.ReactNode;
  direction?: string;
}

interface ImageProps {
  src: string;
  alt: string;
}

interface JumbotronComposition {
  Container: React.FC<Props>;
  Title: React.FC<Props>;
  SubTitle: React.FC<Props>;
  Pane: React.FC<Props>;
  Image: React.FC<ImageProps>;
  Divider: React.FC<Props>;
}

export const Jumbotron: React.FC<Props> & JumbotronComposition = ({
  children,
  ...restProps
}): JSX.Element => {
  return (
    <Divider>
      <Inner {...restProps}>{children}</Inner>
    </Divider>
  );
};

Jumbotron.Container = ({ children, ...restProps }) => {
  return <Container {...restProps}>{children}</Container>;
};
Jumbotron.Title = ({ children, ...restProps }) => {
  return <Title {...restProps}>{children}</Title>;
};
Jumbotron.SubTitle = ({ children, ...restProps }) => {
  return <SubTitle {...restProps}>{children}</SubTitle>;
};
Jumbotron.Pane = ({ children, ...restProps }) => {
  return <Pane {...restProps}>{children}</Pane>;
};
Jumbotron.Image = ({ ...restProps }) => {
  return <Image {...restProps} />;
};
Jumbotron.Divider = ({ children }) => <Divider>{children}</Divider>;
