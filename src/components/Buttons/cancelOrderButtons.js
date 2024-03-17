
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function BasicButtons1() {
    return (
        <Stack spacing={2} direction="row">

            <Button variant="contained">Go Back</Button>
            <Button variant="contained" onClick={() =>{alert("Order has been Cancelled")}}>Cancel</Button>




        </Stack>
    );
}
