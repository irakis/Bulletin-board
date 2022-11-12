import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Button from '@mui/material/Button';

export default function TitlebarBelowImageList({posts}) {

  return (
    <ImageList sx={{ margin: 4 }}>
      {posts.map((item) => (
        <ImageListItem key={item.title} sx={{ margin: 2}}>
          <img
            src={`${item.img}?w=248&fit=crop&auto=format`}
            srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={item.title}
            loading="lazy"
          />
          <ImageListItemBar
            title={item.title}
            subtitle={<span>author: {item.author.email}, price: {item.price}</span>}
            position="below"
          />
          <Button variant="contained" href={`/post/${item.id}`}>See more</Button>
        </ImageListItem>
      ))}
    </ImageList>
  );
}