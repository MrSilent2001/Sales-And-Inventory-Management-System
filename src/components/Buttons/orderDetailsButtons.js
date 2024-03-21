
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function BasicButtons() {
    return (
        <Stack spacing={2} direction="row">

            <Button variant="contained" >Cancel</Button>

            <Button variant="contained" onClick={() =>{alert("Order Details Successfully Updated")}}>Update</Button>


        </Stack>
    );
}