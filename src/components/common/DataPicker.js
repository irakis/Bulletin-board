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
  console.log(data, dayjs().format('DD/MM/YYYY'));
  const [value, setValue] = useState(data ? data : dayjs().format('DD/MM/YYYY'));
  console.log(value);
  // eslint-disable-next-line    

  useEffect(() => {
    console.log('useEffect runs in data picker!')
    action(dayjs(value).format('DD/MM/YYYY'))},[value]
  );
  
  return (
    <Box sx={{
      '& .MuiTextField-root': { m: 3, width: '25ch', margin: 'auto' },
    }}
    enctype="multipart/form-data"
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack spacing={3}>
          <DesktopDatePicker
            disableFuture={true}
            label={text}
            inputFormat="DD/MM/YYYY"
            value={value}
            onChange={setValue}
            renderInput={(data, text, action) => <TextField {...data} />}
          />
        </Stack>
      </LocalizationProvider>
    </Box>
  );
}