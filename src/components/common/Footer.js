import * as React from 'react';
import Box from '@mui/material/Box';
import Icon from '@mdi/react';
import { mdiEmailOutline } from '@mdi/js';
import { Stack } from '@mui/material';

export default function Footer() {

  return (
    <Stack direction='row' sx={{
        position: 'relative',
        width: '100%',
        backgroundColor: 'primary.dark',
        color: 'white',
        justifyContent: 'space-between',
        mt: 2
      }} >
      <Box sx={{
        textAlign: 'center',
        m: 'auto'
      }}>        
        <p>&copy; IreneuszWyszomirski 2023</p>
      </Box>
      <Box sx={{
        m: 'auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        justifyItems: 'end',
        alignItems: 'center',
        textAlign: 'center'
      }}>
        <p><Icon path={mdiEmailOutline} size={1} sx={{ mr: 2 }}/></p>
        <p> : ireneuszwyszomirski44@gmail.com</p>
      </Box>
    </Stack>
  );
}