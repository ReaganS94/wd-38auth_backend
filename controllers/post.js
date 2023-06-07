const Post = require("../schemas/Post");

const getAllPosts = async (req, res) => {
  try {
    const user_id = req.user._id;
    const posts = await Post.find({ user_id });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createPost = async (req, res) => {
  // console.log("FIRING UP");
  const { title, text } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }

  if (!text) {
    emptyFields.push("text");
  }

  if (emptyFields.length > 0) {
    return res.status(400).json({ error: "Please fill all fields" });
  }

  try {
    const user_id = req.user._id;
    const post = await Post.create({ title, text, user_id });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllPosts, createPost };
