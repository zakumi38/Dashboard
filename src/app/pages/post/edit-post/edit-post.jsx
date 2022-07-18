import React, { useEffect, useState } from "react";
import {
  FormControl,
  TextField,
  Grid,
  Typography,
  Box,
  Button,
} from "@mui/material";
import App from "../../../../app.module.sass";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function EditPost() {

  const [title,setTitle]=useState("");
  const [img,setImg]=useState("");
  const [description,setDescription]=useState("");
  const [date,setDate]=useState("");
  const navigate=useNavigate();
  const {id} =useParams();
  
  const data={
      title:title,
      img:img,
      description:description,
      date:date
  }

  useEffect(()=>{
    axios.get(`http://localhost:3500/posts/${id}`)
    .then((res)=>{
      setTitle(res.data.title)
      setImg(res.data.img)
      setDescription(res.data.description)
      setDate(res.data.date)
    })
  },[])

  let Update = (e) => {
    e.preventDefault()
    axios.put(`http://localhost:3500/posts/${id}`,data)
    .then(
        navigate('/post-list')
    )

}

  const inputRef = React.useRef();
  const [selectionStart, setSelectionStart] = React.useState();
  const updateSelectionStart = () =>
    setSelectionStart(inputRef.current.selectionStart);
  return (
      <Box backgroundColor ='rgb(205, 220, 236)' padding="20px" minHeight="100vh" >
      <Grid
        container
        sx={{
          background: "#CDDCEC 80%",
          p: "40px 100px 40px 20px",
          alignItems: "center",
          borderRadius: "10px",
          m: "3rem 0",
        }}
      >
        <Grid item xs={12} sx={{ m: 2 }}>
          <Typography variant="h5" marginBottom="40px">
            Edit Post
          </Typography>
        </Grid>
        <Grid width="100%" paddingLeft="40px">
          <Grid item container spacing={4} marginBottom="40px" xs={12}>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <TextField
                  placeholder="Post Title"
                  aria-describedby="my-helper-text"
                  value={title}
                  onChange={(e)=>setTitle(e.target.value)}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6} align="right">
              <FormControl fullWidth>
                <TextField
                  placeholder="Date"
                  aria-describedby="my-helper-text"
                  value={date}
                  onChange={(e)=>setDate(e.target.value)}
                />
              </FormControl>
            </Grid>
          </Grid>
          <Grid item xs={12} marginBottom="40px">
            <FormControl fullWidth>
              <TextField
                placeholder="Post Image"
                aria-describedby="my-helper-text"
                onChange={(e)=>setImg(e.target.value)}
                value={img}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} marginBottom="40px">
            <FormControl fullWidth>
              <TextField
                onSelect={updateSelectionStart}
                inputRef={inputRef}
                placeholder="Post Description"
                aria-describedby="my-helper-text"
                multiline
                inputProps={{ style: { height: "200px", overflowY: "scroll" } }}
                value={description}
                onChange={(e)=>setDescription(e.target.value)}
              />
            </FormControl>
          </Grid>
        </Grid>

        <Grid item align="right" width="100%">
          <Button
            color="primary"
            variant="contained"
            sx={{
              width: { xs: "100%", sm: "25%", md: "18%", lg: "15%" },
              minHeight: "50px",
              minWidth: "100px",
            }}
            onClick={Update}
          >
            Update
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
