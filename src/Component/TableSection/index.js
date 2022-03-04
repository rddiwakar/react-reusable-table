import Table from './Table/index'
import React from 'react';
import useFetch from '../../costum - hooks/fetch-data';
import styled from 'styled-components'

const ErrorMessage = styled.div`
text-align: center;
font-size: 18px;
margin: 100px 0;
color: red;
`
const TableHeading = styled.h2`
  text-align: center;
  font-size: 1.8rem;
  margin: 100px 0 10px 0;
`
function TableSection({ Title }) {
    const columns = React.useMemo(
        () => {
            return (
                Title === 'transactions' ?
                    [
                        {
                            Header: 'Name',
                            accessor: 'name'
                        },
                        {
                            Header: 'Ticket Ref',
                            accessor: 'ticketref'
                        },
                        {
                            Header: 'Trade Date',
                            accessor: 'traded_on'
                        },
                        {
                            Header: 'Quantity',
                            accessor: 'quantity'
                        },
                        {
                            Header: 'Currency',
                            accessor: 'currency'
                        },
                        {
                            Header: 'SettledAmount',
                            accessor: 'settlement_amount'
                        },
                    ] : [
                        {
                            Header: 'Name',
                            accessor: 'name'
                        },
                        {
                            Header: 'Ticker',
                            accessor: 'ticker'
                        },
                        {
                            Header: 'Asset Class',
                            accessor: 'asset_class'
                        },
                        {
                            Header: 'Average Price',
                            accessor: 'avg_price'
                        },
                        {
                            Header: 'Market Price',
                            accessor: 'market_price'
                        },
                        {
                            Header: 'Change %',
                            accessor: 'latest_chg_pct'
                        },
                        {
                            Header: 'Base CCY',
                            accessor: 'market_value_ccy'
                        },
                    ]
            )

        },
        [Title]
    )
    const data = useFetch(Title)
    

    console.log("9540675534")
    return (
        <div>
            <TableHeading>Table with {Title} Data</TableHeading>
            {data.isLoading === true ? <div>Loading...</div> : <Table columns={columns} data={data[0].payload} />}
            {data.isError && <ErrorMessage>Something went wrong</ErrorMessage>}

        </div>
    )
}

export default TableSection;
