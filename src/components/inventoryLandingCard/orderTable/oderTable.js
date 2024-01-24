// import * as React from 'react';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';

// function OrderTable(id, name, amount, gap, buttons) {
//   return { id, name, amount, gap, buttons };
// }

// const rows = [
//   OrderTable('OID001', 'WAP Saman Perera', 'Rs 100,000',1 ,1 ),
//   OrderTable('OID002', 'WAP Saman Perera', 'Rs 100,000',1 , 2),
//   OrderTable('OID003', 'WAP Saman Perera', 'Rs 100,000', 1, 2),
//   OrderTable('OID004', 'WAP Saman Perera', 'Rs 100,000',1 , 2),
//   OrderTable('OID005', 'WAP Saman Perera', 'Rs 100,000',1 , 2),
//   OrderTable('OID006', 'WAP Saman Perera', 'Rs 100,000',1 , 2),
//   OrderTable('OID007', 'WAP Saman Perera', 'Rs 100,000', 1, 2),
  
  
// ];

// export default function BasicTable() {
//   return (
//     <TableContainer component={Paper}>
//       <Table sx={{ minWidth: 650 }} aria-label="simple table">
//         <TableBody>
//           {rows.map((row) => (
//             <TableRow
//               key={row.name}
//               sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//             >
//               <TableCell component="th" scope="row">
//                 {row.name}
//               </TableCell>
//               <TableCell align="right">{row.calories}</TableCell>
//               <TableCell align="right">{row.fat}</TableCell>
//               <TableCell align="right">{row.carbs}</TableCell>
//               <TableCell align="right">{row.protein}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// }

import * as React from 'react';
import {styled} from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';

const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#273031",
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({theme}) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const columns = [
    {id: 'id', label: 'Id', minWidth: 170, align: 'center'},
    {id: 'name', label: 'Customer Name', minWidth: 170, align: 'center'},
    {
        id: 'amount',
        label: 'Amount(\u20A8.)',
        minWidth: 170,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'accept',
        label: '',
        minWidth: 100,
        align: 'center',
        format: () => (
          <Button/>
        ),
    },
    {
        id: 'reject',
        label: '',
        minWidth: 100,
        align: 'center',
        format: () => (
            <Button/>
        ),
    }
];

const handleButtonClick = () => {
    console.log('Button clicked for row:');
};

function createData(id, name, amount, accept, reject) {

    return {
        id,
        name,
        amount,
        accept,
        reject


    };
}

const rows = [
    createData('OID001', 'WAP Saman Perera', 100000, <Button variant="contained" onClick={() => handleButtonClick()}>Accept</Button> , <Button variant="contained" color = "error" onClick={() => handleButtonClick()}>Reject</Button>),
    createData('OID002', 'WAP Saman Perera', 100000, <Button variant="contained" onClick={() => handleButtonClick()}>Accept</Button> , <Button variant="contained"  color = "error" onClick={() => handleButtonClick()}>Reject</Button>),
    createData('OID004', 'WAP Saman Perera', 100000, <Button variant="contained" onClick={() => handleButtonClick()}>Accept</Button> , <Button variant="contained"  color = "error" onClick={() => handleButtonClick()}>Reject</Button>),
    createData('OID005', 'WAP Saman Perera', 100000, <Button variant="contained" onClick={() => handleButtonClick()}>Accept</Button> , <Button variant="contained"  color = "error" onClick={() => handleButtonClick()}>Reject</Button>),
    createData('OID006', 'WAP Saman Perera', 100000, <Button variant="contained" onClick={() => handleButtonClick()}>Accept</Button> , <Button variant="contained"  color = "error" onClick={() => handleButtonClick()}>Reject</Button>),
    createData('OID007', 'WAP Saman Perera', 100000, <Button variant="contained" onClick={() => handleButtonClick()}>Accept</Button> , <Button variant="contained"  color = "error" onClick={() => handleButtonClick()}>Reject</Button>),
    createData('OID008', 'WAP Saman Perera', 100000, <Button variant="contained" onClick={() => handleButtonClick()}>Accept</Button> , <Button variant="contained"  color = "error" onClick={() => handleButtonClick()}>Reject</Button>),
    createData('OID009', 'WAP Saman Perera', 100000, <Button variant="contained" onClick={() => handleButtonClick()}>Accept</Button> , <Button variant="contained"  color = "error" onClick={() => handleButtonClick()}>Reject</Button>),
    createData('OID010', 'WAP Saman Perera', 100000, <Button variant="contained" onClick={() => handleButtonClick()}>Accept</Button> , <Button variant="contained"  color = "error" onClick={() => handleButtonClick()}>Reject</Button>),
   ];

function OrderTable() {

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return(
            
                <Paper sx={{width: '90%', overflow: 'hidden'}}>
                    <TableContainer sx={{maxHeight: 440}}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <StyledTableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{minWidth: column.minWidth}}
                                        >
                                            {column.label}
                                        </StyledTableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => {
                                        return (
                                            <StyledTableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                                {columns.map((column) => {
                                                    const value = row[column.id];
                                                    return (
                                                        <StyledTableCell key={column.id} align={column.align}>
                                                            {column.format && typeof value === 'number'
                                                                ? column.format(value)
                                                                : value}
                                                        </StyledTableCell>
                                                    );
                                                })}
                                            </StyledTableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
              
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
        
            
                
    );
}

export default OrderTable;