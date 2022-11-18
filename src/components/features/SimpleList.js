import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Grid, Box, List } from '@mui/material';
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';
import { styled } from '@mui/material/styles';


const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

const Component = ({posts}) => {
  
  return (
    <Box sx={{ flexGrow: 1, maxWidth: 752, mx: 'auto' }}>
      
      <Grid container spacing={2}>
        
        <Grid item xs={12} md={6} mx='auto'>
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            List of titles:
          </Typography>
          <Demo>
            <List>
              {posts.map(post => (
                <ListItem key={post}>
                  <ListItemIcon>
                    <FolderIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={`${post.title}`}
                  />
                </ListItem>
               ),
              )}
            </List>
          </Demo>
        </Grid>
      </Grid>
    </Box>
  );
}
export {
    Component as SimpleList
}