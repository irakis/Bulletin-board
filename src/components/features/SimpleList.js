import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Grid, Box, List } from '@mui/material';
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';

const Component = ({posts}) => {
  
  return (
    <Box sx={{ my: 'auto', mx: 'auto', height: '100%'}}>
      
      <Grid container spacing={2}>
        
        <Grid item xs={12} md={6} mx='auto' height="100%">
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            List of titles:
          </Typography>
            <List sx={{m: 'auto'}}>
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
        </Grid>
      </Grid>
    </Box>
  );
}
export {
    Component as SimpleList
}