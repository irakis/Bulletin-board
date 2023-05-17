import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { Pagination, Box } from '@mui/material';
import Button from '@mui/material/Button';
import { useState } from 'react';

export default function TitlebarBelowImageList({ posts }) {

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(4);
  const indexOfLastPage = currentPage * postsPerPage;
  const indexOfFirstPage = indexOfLastPage - postsPerPage;
  const currentPostsOnPage = posts?.slice(indexOfFirstPage, indexOfLastPage);
  const paginationCount = Math.ceil(posts.length/postsPerPage);

  const handleChange =(event, value)=> {
    setCurrentPage(value);
  }

  return (
    <>
      <ImageList sx={{ margin: 4 }}>
        {currentPostsOnPage.map((item) => (
          <ImageListItem key={item.title} sx={{ margin: 2}}>
            <img
              src={`${item.img}?w=248&fit=crop&auto=format`}
              srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={item.title}
              loading="lazy"
            />
            <ImageListItemBar
              title={item.title}
              subtitle={<span>author: {item.author}, price: {item.price}</span>}
              position="below"
            />
            <Button variant="contained" href={`/posts/${item._id}`}>See more</Button>
          </ImageListItem>
        ))}
      </ImageList>
      <Box sx={{ justifyContent: 'center', display: 'flex' }}>
        <Pagination count={paginationCount} page={currentPage} boundaryCount={1} color="secondary" onChange={handleChange}/>
      </Box>
    </>
  );
}