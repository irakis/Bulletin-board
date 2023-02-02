import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DataPicker from '../common/DataPicker';
import Options from '../common/Options';
import UploadButton from '../common/UploadButton';
import { useDispatch } from 'react-redux';
import { editPostRequest, addPostRequest } from '../../redux/postsRedux';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';

export default function MultilineTextFields({data}) {

  const { id } = useParams();
  
  console.log('to jest id posta:', id);
  console.log('data przychodzące z postEdit do PostForm:', data)
  const navigate = useNavigate();  
  
  const [author, setAuthor] = useState(!data ? id: '');//<======if !data id is author else id = post._id
  const [title, setTitle] = useState('');
  const [published, setPublished] = useState('');
  const [img, setImg] = useState('');
  const [content, setContent] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [revised, setRevised] = useState('');
  const [status, setStatus] = useState('');
  const [_id, set_id] = useState(data?._id);

  React.useEffect(()=>{
    setTitle(data?.title);
    setPublished(data?.published);
    setImg(data?.img);
    setContent(data?.content);
    setLocation(data?.location);
    setPrice(data?.price);
    setRevised(data?.revised);
    setStatus(data?.status);
    setAuthor(data?.author);
    set_id(data? data._id: '')
  },[data])
  console.log('status is an object??:', status);
  const dispatch = useDispatch();

  const handleCancel = (e) => {
    navigate('/posts/' + data?._id)
  }
  
  const handleClick = (e) => {
   
    if(data) {
      
      const formData = new FormData();

      formData.append('title', title);
      formData.append('published', published);
      formData.append('content', content);
      formData.append('location', location);
      formData.append('price', price);
      formData.append('revised', revised);
      formData.append('status', status);
      formData.append('author', author);
      formData.append('_id', _id);
      formData.append('img', img);

      console.log('form data w form:', formData);
      fetch('https://httpbin.org/post',{
        method: 'POST',
        body: formData
      })
        .then(res => res.json())
        .then(res =>console.log(res));
      
      console.log('do edit przekauzjemy formData', formData, FormData);
      dispatch(editPostRequest(formData, id))

    } else {

      const formData = new FormData();

      formData.append('title', title);
      formData.append('published', published);
      formData.append('content', content);
      formData.append('location', location);
      formData.append('price', price);
      formData.append('revised', revised);
      formData.append('status', status);
      formData.append('author', id);//<====if no data use params returns author
      formData.append('img', img);

      dispatch(addPostRequest(formData));
    }
    navigate('/login/author/' + id)
  };
 
  return (
    <Box
      encType='multipart/form-data'
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '80vh' },
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

        <DataPicker action={setPublished} data={data?.published} text={'Published'}/>

        <UploadButton sx={{my: 'auto', py: 'auto'}} action={setImg}/>
        
        <TextField
          sx={{ maxWidth: '150px' }}
          id="outlined-multiline-flexible2"
          label="Location"
          multiline
          maxRows={4}
          value={location}
          onChange={e => {setLocation(e.target.value)}}
        />
        <TextField
          sx={{ maxWidth: '150px' }}
          id="outlined-multiline-flexible3"
          label="Price $"
          multiline
          maxRows={4}
          value={price}
          onChange={e => {setPrice(e.target.value)}}
        />

        <DataPicker action={setRevised} data={data?.revised} text={'Revised'}/>

        <Options action={setStatus} statusData={status}/>

        <TextField
          id="outlined-textarea"
          label="Content"
          placeholder="Announcement content"
          value={content}
          onChange={e => {setContent(e.target.value)}}
          multiline
        />
      </div> 
      <Button onClick={handleClick} variant="outlined"sx={{mb:2}}>save changes</Button>
      <Button onClick={handleCancel} variant="outlined" color="error" sx={{ml:2, mb:2}}>cancel</Button>
    </Box>
  )
}