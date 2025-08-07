const db = require('../db');

// create a new post
const createPost = (req, res) => {
  let { title, content, publish_time } = req.body;
  publish_time = new Date(publish_time).toISOString().slice(0, 19).replace('T', ' ');
  const query = 'INSERT INTO posts (title, content, publish_time) VALUES (?, ?, ?)';

  db.execute(query, [title, content, publish_time], (err, result) => {
    if (err) {
      console.error('Error scheduling post:', err);
      res.status(500).send({ message: 'Error scheduling post' });
    } else {
      res.status(200).send({ message: 'Post scheduled successfully' });
    }
  });
};

// get all posts
const getAllPosts = (req, res) => {
  const query = 'SELECT * FROM posts';

  db.execute(query, (err, results) => {
    if (err) {
      console.error('Error retrieving posts:', err);
      res.status(500).send({ message: 'Error retrieving posts' });
    } else {
      res.status(200).send(results);
    }
  });
};

// get single post by ID
const getPostDetails = (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM posts WHERE id = ?';

  db.execute(query, [id], (err, result) => {
    if (err) {
      console.error('Error retrieving post:', err);
      res.status(500).send({ message: 'Error retrieving post' });
    } else {
      if (result.length === 0) {
        res.status(404).send({ message: 'Post not found' });
      } else {
        res.status(200).send(result[0]);
      }
    }
  });
};

// update a post
const updatePost = (req, res) => {
  const { id } = req.params;
  let { title, content, publish_time } = req.body;
  publish_time = new Date(publish_time).toISOString().slice(0, 19).replace('T', ' ');

  const query = 'SELECT * FROM posts WHERE id = ?';

  db.execute(query, [id], (err, results) => {
    if (err) {
      return res.status(500).send({ message: 'Internal server error' });
    }

    if (results.length === 0) {
      return res.status(404).send({ message: 'The post you want to update was not found' });
    }

    const updateQuery = 'UPDATE posts SET title = ?, content = ?, publish_time = ? WHERE id = ?';

    db.execute(updateQuery, [title, content, publish_time, id], (err, result) => {
      if (err) {
        console.error('Error updating post:', err);
        res.status(500).send({ message: 'Error updating post' });
      } else {
        res.status(200).send({ message: 'Post updated successfully' });
      }
    });
  });
};

// delete a post
const deletePost = (req, res) => {
  const postId = req.params.id;
  const query = 'SELECT * FROM posts WHERE id = ?';

  db.execute(query, [postId], (err, results) => {
    if (err) {
      return res.status(500).send({ message: 'Internal server error' });
    }

    if (results.length === 0) {
      return res.status(404).send({ message: 'The post you want to delete was not found' });
    }

    const deleteQuery = 'DELETE FROM posts WHERE id = ?';
    db.execute(deleteQuery, [postId], (deleteErr) => {
      if (deleteErr) {
        return res.status(500).send({ message: 'Internal server error' });
      }

      res.status(200).send({ message: 'Post deleted successfully' });
    });
  });
};

module.exports = { createPost, getAllPosts, updatePost, deletePost, getPostDetails };