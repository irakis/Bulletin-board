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
  const [value, setValue] = useState(dayjs().format('MM/DD/YYYY'));

  useEffect(()=>{
    setValue(data)
  },[data]);

  const handleChange = (newValue) =>{
    setValue(newValue)
  }
  
  useEffect(() => {
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
            inputFormat="MM/DD/YYYY"
            value={value}
            onChange={handleChange}
            renderInput={(data, text, action) => <TextField {...data} />}
          />
        </Stack>
      </LocalizationProvider>
    </Box>
  );
}