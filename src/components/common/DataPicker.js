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

  const [value, setValue] = useState(data ? data : dayjs().format('DD/MM/YYYY'));
  console.log('data piscker now:',dayjs().format('ddd, DD/MM/YYYY'));
  console.log('data picker what is in data:',data);


  // eslint-disable-next-line
  //useEffect(()=>action(value), []);
    
  const handleChange = (newValue) => {

    setValue(newValue);
    action(value); 
  };
  
  return (
    <Box sx={{
      '& .MuiTextField-root': { m: 3, width: '25ch', margin: 'auto' },
    }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack spacing={3}>
          <DesktopDatePicker
            disableFuture={true}
            label={text}
            inputFormat="DD/MM/YYYY"
            value={value}
            onChange={handleChange}
            renderInput={(data) => <TextField {...data} />}
          />
        </Stack>
      </LocalizationProvider>
    </Box>
  );
}