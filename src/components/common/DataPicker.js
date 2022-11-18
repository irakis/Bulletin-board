import * as React from 'react';
import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { Box } from '@mui/material';
import { useState, useEffect } from 'react';

export default function MaterialUIPickers({data, text, action}) {
  console.log('data datePicker: ', action)

  const [value, setValue] = useState(dayjs(data ? data : (new Date())));

  // eslint-disable-next-line
  useEffect(()=>action(value), []);
  
  const handleChange = (newValue) => {
    setValue(newValue); 
  };

  return (
    <Box sx={{
      '& .MuiTextField-root': { m: 3, width: '25ch', margin: 'auto' },
    }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack spacing={3}>
          <DesktopDatePicker
            label={text}
            inputFormat="MM/DD/YYYY"
            value={value}
            onChange={handleChange}
            renderInput={(data) => <TextField {...data} />}
          />
        </Stack>
      </LocalizationProvider>
    </Box>
  );
}