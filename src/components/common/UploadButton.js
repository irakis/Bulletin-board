import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export default function UploadButtons({action}) {
  
  return (
    <Stack maxWidth={'24ch'} padding={'2ch'} spacing={2} mx={'auto'}>
      <Button variant="contained" component="label">
        Upload picture
        <input hidden id="uploadInput" accept="image/*" multiple type="file" 
          onChange={(e)=> action(()=> e.target.files[0].name)}/>
      </Button>
    </Stack>
  );
}