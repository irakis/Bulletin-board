import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DataPicker from '../common/DataPicker';
import Options from '../common/Options';
import UploadButton from '../common/UploadButton';
import { useDispatch } from 'react-redux';
import { addPost, editPost } from '../../redux/postsRedux';
import { Redirect } from "react-router-dom";


export default function MultilineTextFields({data}) {

  const [title, setTitle] = React.useState(data ? data.title : '');
  const [published, setPublished] = React.useState(data ? data.published : '');
  const [img, setImg] = React.useState(data ? data.img : '');
  const [content, setContent] = React.useState(data ? data.content : '');
  const [location, setLocation] = React.useState(data ? data.author.location : '');
  const [price, setPrice] = React.useState(data ? data.price : '');
  const [revised, setRevised] = React.useState(data ? data.revised : '');
  const [status, setStatus] = React.useState(data ? data.status : '');

  const dispatch = useDispatch();

  
  const handleClick = () => {
    if (!data) {
      dispatch(addPost({title: title, published: published, content: content, 
        location: location, price: price, revised: revised, status: status, img: img}));
    } else {
    dispatch(editPost({title: title, published: published, content: content, 
      location: location, price: price, revised: revised, status: status, img: img}, data.id));
    }

  return (
    <Redirect to="/" replace={true} />
  )};

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '80ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div sx={{flexDiretion: 'column'}}>
        <TextField
          id="outlined-multiline-flexible1"
          label="Title"
          multiline
          maxRows={8}
          value={title}
          onChange={e =>{setTitle(e.target.value)}}
        />

        <DataPicker action={setPublished} data={published}/>

        <UploadButton sx={{ my: 'auto', py: 'auto'}} action={setImg}/>
        
        <TextField
          id="outlined-multiline-flexible2"
          label="Location"
          multiline
          maxRows={4}
          value={location}
          onChange={e => {setLocation(e.target.value)}}
        />
        <TextField
          id="outlined-multiline-flexible3"
          label="Price"
          multiline
          maxRows={4}
          value={price}
          onChange={e => {setPrice(e.target.value)}}
        />

        <DataPicker action={setRevised} data={revised}/>

        <Options action={setStatus}/>

        <TextField
          id="outlined-textarea"
          label="Content"
          placeholder="Announcement content"
          value={content}
          onChange={e => {setContent(e.target.value)}}
          multiline
        />
      </div> 
      <Button onClick={handleClick} variant="outlined">save changes</Button>
    </Box>
  );
}