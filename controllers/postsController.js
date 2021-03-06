import PostMessage from "../models/postMessage.js";
import mongoose from "mongoose";

const getPosts = async (req, res, next) => {
  try {
    const postMessages = await PostMessage.find();
    console.log("getPosts");
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createPost = async (req, res, next) => {
  const post = req.body;
  const newPost = new PostMessage({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });
  try {
    await newPost.save();
    console.log("create post");
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const updatePost = async (req, res, next) => {
  const { id } = req.params;
  const { title, message, creator, selectedFile, tags } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send(`No Post with that ${id}`);
  }
  console.log("updated post");
  const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

  await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true }).then(
    () => {
      res.json(updatedPost);
    }
  );
};

const deletePost = async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send(`No Post with that ${id}`);
  }

  await PostMessage.findByIdAndRemove(id);
  res.json({
    message: "Post Deleted Successfully",
  });
};

const likePost = async (req, res, next) => {
  const { id } = req.params;

  if (!req.userId) {
    return res.json({ message: "Unauthenticated" });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send(`No Post with that ${id}`);
  }
  const post = await PostMessage.findById(id);

  const index = post.likes.findIndex((id) => id === String(req.userId));

  if (index === -1) {
    // like the post
    post.likes.push(req.userId);
  } else {
    // dislike a post
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }

  try {
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
      new: true,
    });
    res.json(updatedPost);
  } catch (error) {
    console.log(error);
    res.status(409).json({ message: error.message });
  }
};

const postsController = {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
};

export default postsController;
