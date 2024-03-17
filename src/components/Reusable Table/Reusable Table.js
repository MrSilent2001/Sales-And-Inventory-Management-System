// ReusableTable.js
import React from 'react';
import { Table, TableBody, TableRow, TableCell } from '@mui/material';

function ReusableTable({ data }) {
    return (
        <Table>
            <TableBody>
                {data.map((row, rowIndex) => (
                    <TableRow key={rowIndex}>
                        {Object.values(row).map((value, columnIndex) => (
                            <TableCell key={columnIndex} className={`column-${columnIndex}`}>{value}</TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

export default ReusableTable;