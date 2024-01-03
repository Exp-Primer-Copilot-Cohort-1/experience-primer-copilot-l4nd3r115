// Create web server
// Create a route for GET /comments
// Create a route for POST /comments
// Create a route for GET /comments/:id

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const comments = require('./comments');

app.use(bodyParser.json());

app.get('/comments', (req, res) => {
  res.json(comments);
});

app.post('/comments', (req, res) => {
  const newComment = req.body;
  if (newComment.email && newComment.comment) {
    comments.push({
      id: Date.now(),
      ...newComment
    });
    res.json({ message: 'OK' });
  } else {
    res.status(400).json({ message: 'Missing required fields' });
  }
});

app.get('/comments/:id', (req, res) => {
  const comment = comments.find(comment => comment.id === Number(req.params.id));
  if (comment) {
    res.json(comment);
  } else {
    res.status(404).json({ message: 'Comment not found' });
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));