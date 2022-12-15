import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

const statuses = [
  {
    value: 'draft',
    label: 'draft',
  },
  {
    value: 'closed',
    label: 'closed',
  },
  {
    value: 'published',
    label: 'published',
  } 
];

export default function SelectTextFields({action}, statusData) {
  const [status, setOptionStatus] = React.useState('draft');
  React.useEffect(()=>{
    setOptionStatus(statusData);
  },[statusData, action])

  action(status);

  const handleChange = (event) => {
    event.preventDefault();
    setOptionStatus(event.target.value);
  };

  return (
    <Box
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
          helperText="Select announcement state"
        >
          {statuses.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>
    </Box>
  );
}