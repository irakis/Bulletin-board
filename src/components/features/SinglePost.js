import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function RecipeReviewCard({post}) {
  console.log('to jest post w singlePost:', post);

  return (
    <Card sx={{ margin: 3, width: '75%', mx: 'auto', maxHeight: 800}}>
      <CardHeader
        title={post.title}
        subheader={post.published + ' , ' + post.author}
      />
      <CardMedia
        component="img"
        height="440"
        image= {post.img}
        alt="annoucement picture"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          { post.content}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          location: { post.location }
        </Typography>
        <Typography variant="body2" color="text.secondary">
          phone: { post.phone }
        </Typography>
        <Typography variant="body2" color="text.secondary">
          price: { post.price }
        </Typography>
        <Typography variant="body2" color="text.secondary">
          revised: { post.revised } 
        </Typography>
        <Typography variant="body2" color="text.secondary">
          status: { post.status } 
        </Typography>
      </CardContent>    
    </Card>
  );
}