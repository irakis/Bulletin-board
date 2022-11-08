import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import shortid from 'shortid';

const statuses = [
  {
    value: 'Draft',
    label: 'Draft',
  },
  {
    value: 'Closed',
    label: 'Closed',
  },
  {
    value: 'Published',
    label: 'Published',
  } 
];

export default function SelectTextFields() {
  const [status, setStatus] = React.useState('Draft');

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id="outlined-select-currency"
          select
          label="Select"
          value={status}
          onChange={handleChange}
          helperText="Select annoncement state"
        >
          {statuses.map((option) => (
            <MenuItem key={shortid} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>
    </Box>
  );
}