import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useState } from 'react';

export default function UploadButtons({action}) {

  const [file, setFile] = useState('');

  const handleChange = (e) =>{

    setFile(e.target.files[0])
    action(()=> e.target.files[0].name);
  }

  return (
    <Stack maxWidth={'24ch'} padding={'2ch'} spacing={2} mx={'auto'}>
      <Button variant="contained" component="label">
        Upload picture
        <input hidden id="uploadInput" accept="image/*" multiple type="file" formEncType="multipart/form-data" name="uploaded_file"
          onChange={handleChange}/>
      </Button>
    </Stack>
  );
}