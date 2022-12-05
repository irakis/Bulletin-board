import * as React from 'react';
import { useEffect } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';
import { getAll, getOnePost } from '../../redux/postsRedux';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPublished, fetchSinglePost } from '../../redux/postsRedux';
import { store } from '../../redux/store';

export default function RecipeReviewCard() {

  const { id } = useParams();
  console.log('id params:', id);
  
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(fetchPublished());
    dispatch(fetchSinglePost(id))//<===========================ta ancja nie startuje. Dalczego?
  }, [dispatch]);

  const post = useSelector(getOnePost(id));//<===================== tu zwraca undefined. W Homepage działa i zwraca dobry obiekt
  const post1 = useEffect(getAll);
  console.log('post in POST:', post, post1);


  return (
    <Card sx={{ margin: 3, width: '75%', mx: 'auto', maxHeight: 800}}>
      <CardHeader
        title={post.title}
        subheader={post.published + ' , ' + post.author.email}
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
          phone: { post.author.phone }
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