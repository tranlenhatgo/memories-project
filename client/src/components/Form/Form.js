import useStyles from "./styles.js";
import { TextField, Button, Typography, Paper } from "@material-ui/core";

import React, { useState, useEffect } from "react";
import FireBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/posts.js";

const Form = ({currentId, setCurrentId}) => {

  //material ui styles
  const classes = useStyles();

  //using for updating post
  //get post with current id from posts state
  const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null);

  //form data on submit or screen
  const [postData, setPostData] = useState({ title: "", message: "", tags: "", selectedFile: "", });

  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));

  // useEffect for update post
  useEffect(() => {
    //if post is not null, set post data to populate the form
    if(post) setPostData(post);
  }, [post]);

  const handleSubmit = (e) => {
    //prevent default form submission
    e.preventDefault();
    if(currentId) {
      dispatch(updatePost(currentId, {...postData, name: user?.result?.name}));
    } else {
      dispatch(createPost({ ...postData, name: user?.result?.name }));
    }
    clear();
  };

  const clear = () => {
    setCurrentId(null);
    setPostData({ title: "", message: "", tags: "", selectedFile: "", });
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">Please Sign In to create your own memories and like other's memories.</Typography>
      </Paper>
    );
  }
  
  return (
    <Paper className={classes.paper}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit} >

        <Typography variant="h6">{currentId ? 'Editing' : 'Creating'} a Memory</Typography>
        {/* creater text field */}
        
        {/* title text field */}
        <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />

        {/* message text field */}
        <TextField name="message" variant="outlined" label="Message" fullWidth value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value }) } />

        {/* tags text field */}
        <TextField name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />

        {/* file input */}
        <div className={classes.fileInput}> <FireBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 }) } /> </div>

        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth > Submit </Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth > Clear </Button>
      </form>
    </Paper>
  );
};

export default Form;
