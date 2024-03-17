import React from 'react';
import { TextField, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

const InventoryOrder = () => {
  return (
    <div style={{ background: 'white', padding: 20 }}>
      <h2>Inventory Order</h2>
      <form>
        <div style={{ marginBottom: 16 }}>
          <TextField label="Order Id" variant="outlined" style={{ marginRight: 16 }} />
          <FormControl variant="outlined" style={{ marginRight: 16, minWidth: 120 }}>
            <InputLabel id="supplier-label">Supplier</InputLabel>
            <Select labelId="supplier-label" label="Supplier">
              {/* Map through your suppliers here */}
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {/* Example MenuItem */}
              <MenuItem value={10}>Ten</MenuItem>
            </Select>
          </FormControl>
          <TextField label="Delivery Address" variant="outlined" style={{ marginRight: 16 }} />
          <TextField label="Email" variant="outlined" style={{ marginRight: 16 }} />
          <TextField label="Contact Number" variant="outlined" style={{ marginRight: 16 }} />
          <TextField label="Items" variant="outlined" />
        </div>
        <Button variant="contained" color="primary" style={{ marginRight: 16 }}>
          Place Order
        </Button>
        <Button variant="outlined" color="secondary">
          Cancel
        </Button>
      </form>
    </div>
  );
};

export default InventoryOrder;
