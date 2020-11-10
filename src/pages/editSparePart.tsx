import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
interface IRoutesProps {
  /**
   * routes props
   */
  sparePartID: string;
}
interface IEditSparePartPage extends RouteComponentProps<IRoutesProps> {
  /**
   * regular props
   */
}

const EditPage: React.FC<IEditSparePartPage> = (props) => {
  return <div>EDIT SPARE PART PAGE</div>;
};

export const EditSparePartPage = withRouter(EditPage);
