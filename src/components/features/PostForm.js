import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DataPicker from '../common/DataPicker';
import Options from '../common/Options';
import UploadButton from '../common/UploadButton';
import { useDispatch } from 'react-redux';
import { addPost } from '../../redux/postsRedux';
import { Redirect } from "react-router-dom";


export default function MultilineTextFields() {

  const [title, setTitle] = React.useState('');
  const [published, setPublished] = React.useState('');
  const [img, setImg] = React.useState('');
  const [content, setContent] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [revised, setRevised] = React.useState('');
  const [status, setStatus] = React.useState('');

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(addPost({title: title, published: published, content: content, 
      location: location, price: price, revised: revised, status: status, img: img}));
    console.log('after action:', img);
    return (
      <Redirect to="/" replace={true} />
    )
  }

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
          title={location}
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