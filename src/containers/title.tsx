import React from 'react';
import { ContentTitle } from '../components';

interface ITitlePageContainer {
  title?: string;
  subTitle?: string;
}
export const TitlePageContainer: React.FC<ITitlePageContainer> = React.memo(
  ({ title, subTitle }) => {
    return (
      <ContentTitle>
        <ContentTitle.BaseTitle>{title}</ContentTitle.BaseTitle>
        <ContentTitle.SubTitle>{subTitle}</ContentTitle.SubTitle>
      </ContentTitle>
    );
  }
);
export default TitlePageContainer;
