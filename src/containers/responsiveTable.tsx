import React from 'react';
import { FaTrashAlt, FaEdit, FaCommentAlt } from 'react-icons/fa';
import { MdDescription } from 'react-icons/md';
import { ResponsiveTable, Spinner, ListItems } from '../components';
import {
  ROLES,
  calculateSellingPriceFromEuro,
  CURRENCY,
  roundToDecimals,
} from '../helpers';
import * as ROUTES from '../constants/routes';

interface IResponsiveTableContainer {
  list?: any[];
  handleDelete?: (item: string) => void;
  message?: string;
  isLoading?: boolean;
  role?: string;
  browse?: boolean;
  course: number | null;
}

export const ResponsiveTableContainer: React.FC<IResponsiveTableContainer> = ({
  ...restProps
}) => {
  const {
    list,
    handleDelete,
    message,
    isLoading,
    role,
    browse,
    course,
  } = restProps;

  const content = isLoading ? (
    <Spinner>Loading data ...</Spinner>
  ) : list && list.length > 0 ? (
    <ResponsiveTable>
      {message && <ResponsiveTable.Message>{message}</ResponsiveTable.Message>}
      <ResponsiveTable.DataList>
        {/** header */}
        <ResponsiveTable.DataItem>
          <ResponsiveTable.DataItemInner>
            <ResponsiveTable.DataItemName>Lp.</ResponsiveTable.DataItemName>
          </ResponsiveTable.DataItemInner>
          <ResponsiveTable.DataItemInner>
            <ResponsiveTable.DataItemName>Name</ResponsiveTable.DataItemName>
          </ResponsiveTable.DataItemInner>
          <ResponsiveTable.DataItemInner>
            <ResponsiveTable.DataItemName>Model</ResponsiveTable.DataItemName>
          </ResponsiveTable.DataItemInner>
          <ResponsiveTable.DataItemInner>
            <ResponsiveTable.DataItemName>From</ResponsiveTable.DataItemName>
          </ResponsiveTable.DataItemInner>
          <ResponsiveTable.DataItemInner>
            <ResponsiveTable.DataItemName>To</ResponsiveTable.DataItemName>
          </ResponsiveTable.DataItemInner>
          <ResponsiveTable.DataItemInner>
            <ResponsiveTable.DataItemName>
              Purchase netto
            </ResponsiveTable.DataItemName>
          </ResponsiveTable.DataItemInner>
          <ResponsiveTable.DataItemInner>
            <ResponsiveTable.DataItemName>
              Selling netto
            </ResponsiveTable.DataItemName>
          </ResponsiveTable.DataItemInner>
          <ResponsiveTable.DataItemInner>
            <ResponsiveTable.DataItemName>Gross</ResponsiveTable.DataItemName>
          </ResponsiveTable.DataItemInner>
        </ResponsiveTable.DataItem>
        {/** header */}
        {list.map((item, index) => {
          const calculatedSellingPrice =
            item.currency === CURRENCY.EUR && item.sellingPrice === 0
              ? calculateSellingPriceFromEuro(item.purchasePrice, course)
              : item.sellingPrice;
          return (
            <ResponsiveTable.DataItem key={item.sparePartID}>
              <ResponsiveTable.DataItemInner>
                <ResponsiveTable.DataItemName>Lp.</ResponsiveTable.DataItemName>
                <ResponsiveTable.DataItemValue>
                  {`${index + 1}.`}
                </ResponsiveTable.DataItemValue>
              </ResponsiveTable.DataItemInner>
              <ResponsiveTable.DataItemInner>
                <ResponsiveTable.DataItemName>
                  Name
                </ResponsiveTable.DataItemName>
                <ResponsiveTable.DataItemValue>
                  {item.name}
                </ResponsiveTable.DataItemValue>
              </ResponsiveTable.DataItemInner>
              <ResponsiveTable.DataItemInner>
                <ResponsiveTable.DataItemName>
                  Model
                </ResponsiveTable.DataItemName>
                <ResponsiveTable.DataItemValue>
                  {item.model}
                </ResponsiveTable.DataItemValue>
              </ResponsiveTable.DataItemInner>
              <ResponsiveTable.DataItemInner>
                <ResponsiveTable.DataItemName>
                  From
                </ResponsiveTable.DataItemName>
                <ResponsiveTable.DataItemValue>
                  {item.from}
                </ResponsiveTable.DataItemValue>
              </ResponsiveTable.DataItemInner>
              <ResponsiveTable.DataItemInner>
                <ResponsiveTable.DataItemName>To</ResponsiveTable.DataItemName>
                <ResponsiveTable.DataItemValue>
                  {item.to}
                </ResponsiveTable.DataItemValue>
              </ResponsiveTable.DataItemInner>
              <ResponsiveTable.DataItemInner>
                <ResponsiveTable.DataItemName>
                  Purchase netto
                </ResponsiveTable.DataItemName>
                <ResponsiveTable.DataItemValue>
                  {item.purchasePrice === 0
                    ? '-'
                    : `${item.purchasePrice.toFixed(2)} ${item.currency}`}
                </ResponsiveTable.DataItemValue>
              </ResponsiveTable.DataItemInner>
              <ResponsiveTable.DataItemInner>
                <ResponsiveTable.DataItemName>
                  Selling netto:
                </ResponsiveTable.DataItemName>
                <ResponsiveTable.DataItemValue>
                  {`${calculatedSellingPrice} zł`}
                </ResponsiveTable.DataItemValue>
              </ResponsiveTable.DataItemInner>
              <ResponsiveTable.DataItemInner>
                <ResponsiveTable.DataItemName>
                  Gross
                </ResponsiveTable.DataItemName>
                <ResponsiveTable.DataItemValue>
                  {`${roundToDecimals(calculatedSellingPrice * 1.23).toFixed(
                    2
                  )} zł`}
                </ResponsiveTable.DataItemValue>
              </ResponsiveTable.DataItemInner>
              {/** description */}
              {item.description && (
                <ResponsiveTable.DataItemDescription>
                  {`DESC: ${item.description}`}
                </ResponsiveTable.DataItemDescription>
              )}

              {/** comment */}
              {item.comments && (
                <ResponsiveTable.DataItemComment>
                  {`COMMENT: ${item.comments}`}
                </ResponsiveTable.DataItemComment>
              )}
              {/** controls */}
              <ResponsiveTable.DataItemControls>
                <ResponsiveTable.AriaLabeledBy
                  id={`showDescription_${item.sparePartID}`}
                >
                  Show description
                </ResponsiveTable.AriaLabeledBy>
                <ResponsiveTable.DataItemControlButton
                  aria-label='Show description'
                  aria-labelledby={`showDescription_${item.sparePartID}`}
                  btn='DESCRIPTION'
                  type='button'
                  title='Show description'
                  disabled={item.description === '' ? true : false}
                >
                  <MdDescription />
                </ResponsiveTable.DataItemControlButton>
                <ResponsiveTable.AriaLabeledBy
                  id={`showComment_${item.sparePartID}`}
                >
                  Show comment
                </ResponsiveTable.AriaLabeledBy>
                <ResponsiveTable.DataItemControlButton
                  aria-label='Show comment'
                  aria-labelledby={`showComment_${item.sparePartID}`}
                  btn='COMMENT'
                  type='button'
                  title='Show comment'
                  disabled={item.comments === '' ? true : false}
                >
                  <FaCommentAlt />
                </ResponsiveTable.DataItemControlButton>
                {role === ROLES.ADMIN && !browse ? (
                  <React.Fragment>
                    <ResponsiveTable.AriaLabeledBy
                      id={`deleteSparePart_${item.sparePartID}`}
                    >
                      Delete spare part
                    </ResponsiveTable.AriaLabeledBy>
                    <ResponsiveTable.DataItemDeleteButton
                      aria-label='Delete spare part'
                      aria-labelledby={`deleteSparePart_${item.sparePartID}`}
                      type='button'
                      title='Delete'
                      onClick={() => {
                        handleDelete && handleDelete(item.sparePartID);
                      }}
                    >
                      <FaTrashAlt />
                    </ResponsiveTable.DataItemDeleteButton>
                    <ResponsiveTable.AriaLabeledBy
                      id={`editSparePart_${item.sparePartID}`}
                    >
                      Edit spare part
                    </ResponsiveTable.AriaLabeledBy>

                    <ResponsiveTable.DataItemEditButton
                      aria-label='Edit spare part'
                      aria-labelledby={`editSparePart_${item.sparePartID}`}
                      to={`${ROUTES.EDIT_SPARE_PART}/${item.sparePartID}`}
                      title='Edit'
                    >
                      <FaEdit />
                    </ResponsiveTable.DataItemEditButton>
                  </React.Fragment>
                ) : null}
              </ResponsiveTable.DataItemControls>
            </ResponsiveTable.DataItem>
          );
        })}
      </ResponsiveTable.DataList>
      {role === ROLES.ADMIN && !browse ? (
        <ListItems.ListItemButtonLink to={ROUTES.ADD_SPARE_PART}>
          Add spare part
        </ListItems.ListItemButtonLink>
      ) : null}
    </ResponsiveTable>
  ) : (
    <React.Fragment>
      <Spinner>You did not any spare parts to that pricelist</Spinner>
      {role === ROLES.ADMIN && !browse ? (
        <ListItems.ListItemButtonLink to={ROUTES.ADD_SPARE_PART}>
          Add spare part now
        </ListItems.ListItemButtonLink>
      ) : null}
    </React.Fragment>
  );
  return content;
};

export default ResponsiveTableContainer;
