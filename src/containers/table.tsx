import React from 'react';
import { FaTrashAlt, FaEdit, FaCommentAlt } from 'react-icons/fa';
import { MdDescription } from 'react-icons/md';
import { Table, Spinner } from '../components';
import { ROLES } from '../helpers';

interface ITableContainer {
  list?: any[];
  handleDelete?: (item: string) => void;
  message?: string;
  isLoading?: boolean;
  role?: string;
}

export const TableContainer: React.FC<ITableContainer> = ({ ...restProps }) => {
  const { list, handleDelete, message, isLoading, role } = restProps;

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
                      {`${item.sellingPrice.toFixed(2)} zł`}
                    </Table.HeaderContentFieldColTable>
                    <Table.HeaderContentFieldColTable>
                      {`${(item.sellingPrice * 1.23).toFixed(2)} zł`}
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
              {role === ROLES.ADMIN && (
                <Table.Controls>
                  <Table.ControlButton
                    btn='DESCRIPTION'
                    type='button'
                    title='Show description'
                  >
                    <MdDescription />
                  </Table.ControlButton>
                  <Table.ControlButton
                    btn='COMMENT'
                    type='button'
                    title='Show comment'
                  >
                    <FaCommentAlt />
                  </Table.ControlButton>
                  <Table.ControlButtonDelete
                    type='button'
                    title='Delete'
                    onClick={() =>
                      handleDelete && handleDelete(item.sparePartID)
                    }
                  >
                    <FaTrashAlt />
                  </Table.ControlButtonDelete>
                  <Table.EditLink
                    to={`/admin/edit/${item.sparePartID}`}
                    title='Edit'
                  >
                    <FaEdit />
                  </Table.EditLink>
                </Table.Controls>
              )}
            </Table.BodyTable>
          );
        })}
      </Table.BaseTable>
    </Table>
  ) : null;
  return content;
};
