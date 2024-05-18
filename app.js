const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/blogDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Schema and Model
const postSchema = {
    title: String,
    content: String
};
const Post = mongoose.model('Post', postSchema);

// Routes
app.get('/', (req, res) => {
    Post.find({}, (err, posts) => {
        res.render('index', { posts: posts });
    });
});

app.post('/add-post', (req, res) => {
    const newPost = new Post({
        title: req.body.title,
        content: req.body.content
    });
    newPost.save(err => {
        if (!err) {
            res.redirect('/');
        }
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
