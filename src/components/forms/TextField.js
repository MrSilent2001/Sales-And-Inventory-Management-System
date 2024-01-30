import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function BasicTextFields() {
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '30em' },
        marginLeft:'2em',
       
        
      }}

      
      noValidate
      autoComplete="off"
    >
      
      <TextField id="filled-basic" size = "small" variant="outlined"
      
      sx={{
        backgroundColor : '#CCCCFF',
        borderRadius:'0.2em',  
      }}>


      </TextField>
      
    </Box>
  );
}
