import useStyles from "./styles.js";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from "@material-ui/core";

import React from "react";
import moment from "moment";
import { useDispatch} from "react-redux";

import { likePost, deletePost } from "../../../actions/posts.js";

//styles and css setup


const Post = ({post, setCurrentId}) => {
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem("profile"));
    
    const dispatch = useDispatch();

    const likeBtn = () => {
      dispatch(likePost(post._id));
    }

    const Likes = () => {
      if(post.likes.length > 0) {
        return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id)) ? (
          <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? "s" : ""}`}</>
        ) : (
          <><ThumbUpAltOutlined  fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? "Like" : "Likes"}</>
        );
      }
      return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
    };

    const deleteBtn = () => {
      dispatch(deletePost(post._id));
    }

    return (
      <Card className={classes.card}>
        <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />

        <div className={classes.overlay}>
          <Typography variant="h6">{post.name}</Typography>
          <Typography variant="body2"> {moment(post.createAt).fromNow()} </Typography>
        </div>

        {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
        <div className={classes.overlay2}>
          <Button style={{ color: "white" }} size="small" onClick={() => setCurrentId(post._id) }> <MoreHorizIcon fontSize="medium" /> </Button>
        </div>
        )}
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary"> {post.tags.map((tag) => `#${tag} `)} </Typography>
        </div>

        <Typography className={classes.title} variant="h5" gutterBottom> {post.title} </Typography>
        
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p"> {post.message} </Typography>
        </CardContent>

        <CardActions className={classes.cardActions}>
          <Button size="small" color="primary" disabled={!user?.result} onClick={likeBtn}> 
            <Likes />
          </Button>

          {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
            <Button size="small" color="primary" onClick={deleteBtn}> <DeleteIcon fontSize="small" /> &nbsp; Delete </Button>
          )}

        </CardActions>

      </Card>
    );
}

export default Post;
