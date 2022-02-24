import { useTable, usePagination, useSortBy } from "react-table";
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import {HTML5Backend }from 'react-dnd-html5-backend'
import update from 'immutability-helper'
import React from 'react';
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

function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI

  const [records, setRecords] = React.useState(data)

  const getRowId = React.useCallback(row => {
    return row.id
  }, [])
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    // Row,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },

  } = useTable({
    columns,
    data: records,
    getRowId,
    initialState: { pageIndex: 0 },
  }, useSortBy, usePagination)

  const moveRow = (dragIndex, hoverIndex) => {
    const dragRecord = records[dragIndex]
    setRecords(
      update(records, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragRecord],
        ],
      })
    )
  }
  // Render the UI for your table
  return (
    <DndProvider backend={HTML5Backend}>
      <TableWrapper>
        <TableMain {...getTableProps()}>
          <thead className="thead">
            {headerGroups.map(headerGroup => (
              <tr className="tr" {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render('Header')}
                    <span>{
                      column.isSorted
                        ? column.isSortedDesc
                          ? <> &#x21d3; </>
                          : <> &#x21d1; </>
                        : <> &#x21d5; </>
                    }
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="tbody" {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row)
              return (
                <tr className="tr" {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return <td className="td" {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  })}
                </tr>
              )
            })}
          </tbody>
        </TableMain>
        <div className="pagination">
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {'First <<'}
          </button>{' '}
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            {'Prev <'}
          </button>{' '}
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            {'Next >'}
          </button>{' '}
          <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
            {'Last >>'}
          </button>{' '}
          <span>
            Page{' '}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{' '}
          </span>
          <span>
            | Go to page:{' '}
            <input
              type="number"
              defaultValue={pageIndex + 1}
              onChange={e => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0
                gotoPage(page)
              }}
              style={{ width: '100px' }}
            />
          </span>{' '}
          <select
            value={pageSize}
            onChange={e => {
              setPageSize(Number(e.target.value))
            }}
          >
            {[5, 10, 20, 30, 40, 50].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      </TableWrapper>
    </DndProvider>
  )
}
export default Table