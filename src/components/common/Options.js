import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { PropTypes } from 'prop-types';

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
  }, 
];

export default function SelectTextFields({action, statusData}) {

  const [status, setOptionStatus] = React.useState(statusData ? statusData : 'draft');

  React.useEffect(()=>{
    action(status);
  },[status]);

  return (
    <Box
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
      enctype="multipart/form-data"
    >
      <div>
        <TextField
          id="outlined-select-currency"
          select
          label="Select"
          value={statusData ? statusData : status}
          onChange={event=>setOptionStatus(event.target.value)}
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
SelectTextFields.propTypes = {
  action: PropTypes.func,
  statusData: PropTypes.string,
};