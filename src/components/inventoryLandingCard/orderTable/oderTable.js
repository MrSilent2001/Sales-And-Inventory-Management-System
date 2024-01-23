import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function OrderTable(id, name, amount, gap, buttons) {
  return { id, name, amount, gap, buttons };
}

const rows = [
  OrderTable('OID001', 'WAP Saman Perera', 'Rs 100,000',1 ,1 ),
  OrderTable('OID002', 'WAP Saman Perera', 'Rs 100,000',1 , 2),
  OrderTable('OID003', 'WAP Saman Perera', 'Rs 100,000', 1, 2),
  OrderTable('OID004', 'WAP Saman Perera', 'Rs 100,000',1 , 2),
  OrderTable('OID005', 'WAP Saman Perera', 'Rs 100,000',1 , 2),
  OrderTable('OID006', 'WAP Saman Perera', 'Rs 100,000',1 , 2),
  OrderTable('OID007', 'WAP Saman Perera', 'Rs 100,000', 1, 2),
  
  
];

export default function BasicTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
