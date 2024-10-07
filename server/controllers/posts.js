import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

//handle the logic, direct interact with 

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


export const createPost = async (req, res) => {
  const post = req.body;

  const newPost = new PostMessage({...post, creator: req.userId, createdAt: new Date().toISOString()});
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error });
  }
};

export const updatePost = async (req, res) => {
  //get id from req params and rename it to _id
  const { id:_id } = req.params;
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) { return res.status(404).send('No post with that id'); }

  const updatePost = await PostMessage.findByIdAndUpdate(_id, {...post, _id}, { new: true });

  res.json(updatePost);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) { return res.status(404).send('No post with that id'); }

  await PostMessage.findByIdAndDelete(id);

  res.json({ message: 'Post deleted successfully' });
};

export const likePost = async (req, res) => {

  const { id } = req.params;

  //check if user is authenticated
  if (!req.userId) { return res.json({ message: "Unauthenticated" }); }

  if (!mongoose.Types.ObjectId.isValid(id)) { return res.status(404).send("No post with that id"); }

  const post = await PostMessage.findById(id)

  const index = post.likes.findIndex((id) => id === String(req.userId));

  //if user already liked the post, then unlike it
  if (index === -1) {
    post.likes.push(req.userId);
  } else {
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }

  //update the post with the like count increment by 1
  const updatePost = await PostMessage.findByIdAndUpdate(id, post, { new: true })

  res.json(updatePost);
}