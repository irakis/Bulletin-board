import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Grid, Box, List } from '@mui/material';
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';
import { PropTypes } from 'prop-types';

const Component = ({posts}) => {
  
  return (
    <Box sx={{ my: 'auto', mx: 'auto', my: 'auto', height: '100%', display: 'grid' }}>
      
      <Grid container spacing={2}>
        
        <Grid item xs={12} md={6} mx='auto' my='16px' height="100%" sx={{ display: 'grid'}}>
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="grid">
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
};
Component.propTypes = {
  posts: PropTypes.object,
};
export {
  Component as SimpleList,
};