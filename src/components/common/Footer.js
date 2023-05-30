import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid'
import Icon from '@mdi/react';
import { mdiEmailOutline } from '@mdi/js';
import { Stack } from '@mui/material';
import './Footer.module.scss';

export default function Footer() {

  return (
    <Stack direction='row' sx={{
        position: 'relative',
        width: '100%',
        backgroundColor: '#2B4C6F',
        color: 'white',
        justifyContent: 'space-around',
        mt: 2
      }} sm={{ direction: 'column'}} >
      <Grid container sx={{
        height: '160px',
        width: '100%',
        m: 0,
        display: { xs: 'grid', sm: 'flex'},
        alignItems: 'center',
        }}>
        
          <Grid item xs={6}>
              &copy; IreneuszWyszomirski 2023
          </Grid>
          <Grid item xs={2} sx={{ textAlign: 'end'}}>
              <Icon path={mdiEmailOutline} size={1} sx={{ pr: 2 }}/>
          </Grid>
          <Grid item xs={4}>
              : ireneuszwyszomirski44@gmail.com
          </Grid>
        
      </Grid>
    </Stack>
  );
}