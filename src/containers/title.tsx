import React from 'react';
import { ContentTitle } from '../components';

interface ITitlePageContainer {
  title?: string;
}
export const TitlePageContainer: React.FC<ITitlePageContainer> = React.memo(
  ({ title }) => {
    return (
      <ContentTitle>
        <ContentTitle.BaseTitle>PRICE LIST</ContentTitle.BaseTitle>
        <ContentTitle.SubTitle>{title}</ContentTitle.SubTitle>
      </ContentTitle>
    );
  }
);
