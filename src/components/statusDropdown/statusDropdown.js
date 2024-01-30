import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


export default function StatusDropdown() {
  const [status, setStatus] = React.useState('');

  const handleChange = (event) => {
    
    setStatus(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        {status ? null : (<InputLabel id="demo-simple-select-label" 
        sx ={{color :'white'}}>Status</InputLabel>)}
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={status}
          label="Status" 
          onChange={handleChange}

          style={{
            
            backgroundColor: '#646FD4',
            color:'white'
          }}
        >
          <MenuItem value={1}>Accepted</MenuItem>
          <MenuItem value={2}>In Processing</MenuItem>
          <MenuItem value={3}>Departed</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
