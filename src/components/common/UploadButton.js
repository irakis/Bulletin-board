import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { PropTypes } from 'prop-types';

export default function UploadButtons({action}) {

  const handleChange = (e) =>{
    action(()=> e.target.files[0]);
  };

  return (
    <Stack maxWidth={'24ch'} padding={'2ch'} spacing={2} mx={'auto'}>
      <Button variant="contained" component="label">
        Upload picture
        <input hidden id="uploadInput" accept="image/*" type="file" name="uploaded_file"
          onChange={handleChange}/>
      </Button>
    </Stack>
  );
}
UploadButtons.propTypes = {
  action: PropTypes.func,
};