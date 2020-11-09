import React from 'react';
import { Table } from '../components';

interface ITableContainer {
  list?: any[];
}

export const TableContainer: React.FC<ITableContainer> = ({ ...restProps }) => {
  const { list } = restProps;

  return (
    <Table>
      <Table.BaseTable>
        {list && list.length > 0 && (
          <>
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
                <Table.RowTable key={item.sparePartID}>
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
                        {item.description}
                      </Table.DescriptionContentColTable>
                    )}
                    {item.comments && (
                      <Table.CommentsContentsColTable>
                        {item.comments}
                      </Table.CommentsContentsColTable>
                    )}
                  </Table.ContentColTable>
                </Table.RowTable>
              );
            })}
          </>
        )}
      </Table.BaseTable>
    </Table>
  );
};
