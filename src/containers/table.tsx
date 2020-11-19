import React from 'react';
// import { useSelectedSparePartContext } from '../context';
import { FaTrashAlt, FaEdit, FaCommentAlt } from 'react-icons/fa';
import { MdDescription } from 'react-icons/md';
import { Table, Spinner, ListItems } from '../components';
import {
  ROLES,
  calculateSellingPriceFromEuro,
  CURRENCY,
  roundToDecimals,
} from '../helpers';
import * as ROUTES from '../constants/routes';

interface ITableContainer {
  list?: any[];
  handleDelete?: (item: string) => void;
  message?: string;
  isLoading?: boolean;
  role?: string;
  browse?: boolean;
  course: number | null;
}

export const TableContainer: React.FC<ITableContainer> = ({ ...restProps }) => {
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
    <Table>
      {message && <Table.Message>{message}</Table.Message>}
      <Table.BaseTable>
        <Table.HeaderRowTable>
          <Table.OrdinaryNumberColTable>Lp.</Table.OrdinaryNumberColTable>
          <Table.HeaderContentRowTable>
            <Table.HeaderColTable>Name</Table.HeaderColTable>
            <Table.HeaderColTable>Model</Table.HeaderColTable>
            <Table.HeaderColTable>From</Table.HeaderColTable>
            <Table.HeaderColTable>To</Table.HeaderColTable>
            <Table.HeaderColTable>Purchase netto</Table.HeaderColTable>
            <Table.HeaderColTable>Selling netto</Table.HeaderColTable>
            <Table.HeaderColTable>GROSS</Table.HeaderColTable>
          </Table.HeaderContentRowTable>
        </Table.HeaderRowTable>
        {list.map((item, index) => {
          // console.log('Purchase Price:', item.purchasePrice.toFixed(2));
          // console.log('Selling Price', item.sellingPrice.toFixed(2));
          // console.log('Course', course);
          const calculatedSellingPrice =
            item.currency === CURRENCY.EUR && item.sellingPrice === 0
              ? calculateSellingPriceFromEuro(item.purchasePrice, course)
              : item.sellingPrice;
          return (
            <Table.BodyTable key={item.sparePartID}>
              <Table.RowTable>
                <Table.OrdinaryNumberColTable>
                  {index + 1}
                </Table.OrdinaryNumberColTable>
                <Table.ContentColTable>
                  <Table.HeaderContentColTable>
                    <Table.HeaderContentFieldColTable>
                      {item.name}
                    </Table.HeaderContentFieldColTable>
                    <Table.HeaderContentFieldColTable>
                      {item.model}
                    </Table.HeaderContentFieldColTable>
                    <Table.HeaderContentFieldColTable>
                      {item.from}
                    </Table.HeaderContentFieldColTable>
                    <Table.HeaderContentFieldColTable>
                      {item.to}
                    </Table.HeaderContentFieldColTable>
                    <Table.HeaderContentFieldColTable>
                      {item.purchasePrice === 0
                        ? '-'
                        : `${item.purchasePrice.toFixed(2)} ${item.currency}`}
                    </Table.HeaderContentFieldColTable>
                    <Table.HeaderContentFieldColTable>
                      {`${calculatedSellingPrice} zł`}
                    </Table.HeaderContentFieldColTable>
                    <Table.HeaderContentFieldColTable>
                      {`${roundToDecimals(calculatedSellingPrice * 1.23)} zł`}
                    </Table.HeaderContentFieldColTable>
                  </Table.HeaderContentColTable>
                  {item.description && (
                    <Table.DescriptionContentColTable>
                      {`DESC: ${item.description}`}
                    </Table.DescriptionContentColTable>
                  )}
                  {item.comments && (
                    <Table.CommentsContentsColTable>
                      {`COMMENT: ${item.comments}`}
                    </Table.CommentsContentsColTable>
                  )}
                </Table.ContentColTable>
              </Table.RowTable>

              <Table.Controls>
                <Table.AriaLabeledBy id={`showDescription_${item.sparePartID}`}>
                  Show description
                </Table.AriaLabeledBy>
                <Table.ControlButton
                  aria-label='Show description'
                  aria-labelledby={`showDescription_${item.sparePartID}`}
                  btn='DESCRIPTION'
                  type='button'
                  title='Show description'
                  disabled={item.description === '' ? true : false}
                >
                  <MdDescription />
                </Table.ControlButton>
                <Table.AriaLabeledBy id={`showComment_${item.sparePartID}`}>
                  Show comment
                </Table.AriaLabeledBy>
                <Table.ControlButton
                  aria-label='Show comment'
                  aria-labelledby={`showComment_${item.sparePartID}`}
                  btn='COMMENT'
                  type='button'
                  title='Show comment'
                  disabled={item.comments === '' ? true : false}
                >
                  <FaCommentAlt />
                </Table.ControlButton>
                {role === ROLES.ADMIN && !browse ? (
                  <React.Fragment>
                    <Table.AriaLabeledBy
                      id={`deleteSparePart_${item.sparePartID}`}
                    >
                      Delete spare part
                    </Table.AriaLabeledBy>
                    <Table.ControlButtonDelete
                      aria-label='Delete spare part'
                      aria-labelledby={`deleteSparePart_${item.sparePartID}`}
                      type='button'
                      title='Delete'
                      onClick={() => {
                        handleDelete && handleDelete(item.sparePartID);
                      }}
                    >
                      <FaTrashAlt />
                    </Table.ControlButtonDelete>
                    <Table.AriaLabeledBy
                      id={`editSparePart_${item.sparePartID}`}
                    >
                      Edit spare part
                    </Table.AriaLabeledBy>

                    <Table.EditLink
                      aria-label='Edit spare part'
                      aria-labelledby={`editSparePart_${item.sparePartID}`}
                      to={`${ROUTES.EDIT_SPARE_PART}/${item.sparePartID}`}
                      // to={`${ROUTES.EDIT_SPARE_PART}/${item.slug}?sparePartID=${item.sparePartID}`}
                      // to={{
                      //   pathname: `${ROUTES.EDIT_SPARE_PART}/${item.slug}`,
                      //   search: `?sparePartID=${item.sparePartID}`,
                      // }}
                      // to={{
                      //   pathname: `${ROUTES.EDIT_SPARE_PART}/${item.slug}`,
                      //   query: { sparePartID: item.sparePartID },
                      // }}
                      title='Edit'
                      // onClick={() => setSelectedSparePart(item.sparePartID)}
                    >
                      <FaEdit />
                    </Table.EditLink>
                  </React.Fragment>
                ) : null}
              </Table.Controls>
            </Table.BodyTable>
          );
        })}
      </Table.BaseTable>
      {role === ROLES.ADMIN && !browse ? (
        <ListItems.ListItemButtonLink to={ROUTES.ADD_SPARE_PART}>
          Add spare part
        </ListItems.ListItemButtonLink>
      ) : null}
    </Table>
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

export default TableContainer;
