import React from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@mui/material';
import {tableCellClasses} from "@mui/material/TableCell";
import {styled} from "@mui/material/styles";

function CustomizedTable({columns, rows, style}) {

    const StyledTableCell = styled(TableCell)(({theme}) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor : 'black',
            color: theme.palette.common.white,
            fontSize: '0.75em',
            fontWeight: 500,
            textAlign: 'center'
        },

        [`&.${tableCellClasses.body}`]: {
            fontSize: '0.70em',
            textAlign: 'center',
            color:'black'
        }
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },

        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    return (
        <Paper sx={{ overflow: 'auto',maxHeight: '400px', ...style}}>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <StyledTableCell
                                    key={column.columnId}
                                    align={column.align}
                                    style={{minWidth: column.minWidth, backgroundColor: 'black', color: 'white'}}
                                >
                                    {column.label}
                                </StyledTableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <StyledTableRow
                                key={row.id}
                                style={{
                                    cursor: 'pointer',
                                    backgroundColor:  'inherit'
                                }}
                            >
                                {columns.map((column) => {
                                    const value = row[column.columnId];
                                    return (
                                        <StyledTableCell key={`${row.id}-${column.columnId}`} align={column.align}>
                                            {column.format && typeof value === 'number' ? column.format(value) : value}
                                        </StyledTableCell>
                                    );
                                })}
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}

export default CustomizedTable;