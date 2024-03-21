import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from "@mui/material/Button";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor:'#646FD4',
        color: theme.palette.common.white,
        fontSize: '0.75em',
        fontWeight: 500,
        textAlign: 'center'
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: '0.625em',
        textAlign: 'center'
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function createData(inventoryId, itemDescription, itemCategory, Quantity, inventoryStatus) {
    return { inventoryId, itemDescription, itemCategory, Quantity, inventoryStatus };
}

const rows = [
    createData('I0001', 'Tokyo Super Cement', 'Cement', 24, 'In Stock'),
    createData('I0001', 'Tokyo Super Cement', 'Cement', 37, 'In Stock'),
    createData('I0001', 'Tokyo Super Cement', 'Cement', 24, 'In Stock'),
    createData('I0001', 'Tokyo Super Cement', 'Cement', 67, 'In Stock'),
    createData('I0001', 'Tokyo Super Cement', 'Cement', 49, 'In Stock'),
];

const ViewItemButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText('#242F9B'),
    backgroundColor: '#242F9B',
    '&:hover': {
        backgroundColor: '#2d3ed2' // You can adjust the darken value as needed
    },
    '&.MuiButton-root': {
        width: '11.625em',
        height: '2.75em'
    },
    fontSize: '0.625em',
    fontFamily: 'inter',
    padding: '1.75em 0.625em'
}));

export default function CustomizedTables() {
    return (
        <TableContainer component={Paper} sx={{ width: '1100px', maxHeight: '20.625em', overflowY: 'auto', position: 'relative'}}>
            <style>
                {`
                
                    table {
                        position: relative;
                    }

                    thead {
                        position: sticky;
                        top: 0;
                        background-color: #f1f1f1; 
                        z-index: 1; 
                    }

                    ::-webkit-scrollbar {
                        width: 11px;
                    }

                    ::-webkit-scrollbar-track {
                        background: #f1f1f1;
                    }

                    ::-webkit-scrollbar-thumb {
                        background: #555;
                        border-radius: 6px;
                    }

                    ::-webkit-scrollbar-thumb:hover {
                        background: #3B444B;
                    }
                `}
            </style>
            <Table sx={{ minWidth: '25em'}} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Inventory ID</StyledTableCell>
                        <StyledTableCell>Item Description</StyledTableCell>
                        <StyledTableCell>Item Category</StyledTableCell>
                        <StyledTableCell>Quantity</StyledTableCell>
                        <StyledTableCell>Inventory Status</StyledTableCell>
                        <StyledTableCell></StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <StyledTableRow key={row.name}>
                            <StyledTableCell component="th" scope="row" sx={{ height: '1.25em' }}>
                                {row.inventoryId}
                            </StyledTableCell>
                            <StyledTableCell align="right">{row.itemDescription}</StyledTableCell>
                            <StyledTableCell align="right">{row.itemCategory}</StyledTableCell>
                            <StyledTableCell align="right">{row.Quantity}</StyledTableCell>
                            <StyledTableCell align="right">{row.inventoryStatus}</StyledTableCell>
                            <StyledTableCell><ViewItemButton>View</ViewItemButton></StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}