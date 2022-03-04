import React from 'react';
import {
  useTable,
  useSortBy,
  usePagination,
  useFlexLayout,
  useResizeColumns,
  useColumnOrder
} from "react-table";

import DndColumn from "./DndColumn";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styled from 'styled-components';

const TableWrapper = styled.div`
  font-size: 1.3rem;
  overflow-x: auto;
  max-width: 100rem;
  margin: 0 auto;
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.75);
`
const TableMain = styled.table`
  margin: 0 auto;
  min-width: 600px;
  width: 100rem;
  max-width: 100rem;
  border-collapse: collapse;
  tr {
    word-break: break-all;
    background: #fff;
    text-align: center;
    height: 60px;
    border-bottom: 1px solid rgb(179, 179, 179);
    th {
      padding: 5px;
      border-left: 1px solid rgba(255, 255, 255, 0.4);
      border-right: 1px solid rgba(255, 255, 255, 0.4);
      position: relative;
    }
    td {
      padding: 5px;
      border-right: 1px solid rgb(179, 179, 179);
    }
  }
  thead{
    tr{
      background: #7180bf;
      color: #fff;
      font-weight: 400;
      height: 70px;
      
    }
  }
`

export default function Table({ data, columns }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,

    previousPage,
    nextPage,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    visibleColumns,
    setColumnOrder,
    state: { pageIndex }
  } = useTable(
    { columns, data, initialState: { pageIndex: 0 } },
    useSortBy,
    usePagination,
    useFlexLayout,
    useResizeColumns,
    useColumnOrder
  );

  const formatCellValue = cell => {
    const cellValue = cell.render("Cell").props.value;
      return cellValue;
   
   };

  const moveColumn = (dragIndex, dropIndex) => {
    const newColumnOrder = [...visibleColumns];

    [newColumnOrder[dragIndex], newColumnOrder[dropIndex]] = [
      newColumnOrder[dropIndex],
      newColumnOrder[dragIndex]
    ];

    console.log(visibleColumns);
    setColumnOrder(newColumnOrder.map(col => col.id));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <TableWrapper>
        <TableMain {...getTableProps()}>
          <thead className="thead">
            <tr className="tr" {...headerGroups[0].getHeaderGroupProps()}>
              {headerGroups[0].headers.map((column, idx) => (
                <DndColumn
                  key={column.id}
                  column={column}
                  index={idx}
                  moveColumn={moveColumn}
                />
              ))}
            </tr>
          </thead>

          <tbody className="tbody" {...getTableBodyProps()}>
            {page.map(row => {
              prepareRow(row);
              return (
                <tr className="tr" {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return (
                      <td className="td" {...cell.getCellProps()}>
                        {formatCellValue(cell)}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </TableMain>

        <div className="table__pagination">
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            &#x21d0; Back
          </button>
          {Array.from(Array(pageCount).keys()).map(page => {
            return (
              <button
                key={page}
                onClick={() => gotoPage(page)}
                style={{
                  background: `${pageIndex === page ? "#7180bf" : ""}`,
                  color: `${pageIndex === page ? "#fff" : ""}`
                }}
              >
                {page + 1}
              </button>
            );
          })}
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            Next &#x21d2;
          </button>
        </div>
      </TableWrapper>
    </DndProvider>
  );
}
