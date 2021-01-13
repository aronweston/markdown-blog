const express = require('express')
const router = express.Router()
const Post = require('../models/Post')

//New Post Route
router.get('/new', (req, res) => {
    res.render('posts/new', {post: new Post()})
})

// Post ID Route 
router.get('/:id', async (req, res) => {
    const post = await Post.findById(req.params.id)
    // Push to home if wrong ID
    if (post == null) {
        res.redirect('/')
    }
    res.render('posts/show', {post: post})

})


//Create a post request and submit data to database
router.post('/', async (req, res) => {
    let post = new Post({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown
    }) 
    
    console.log(post);
    try {
        post = await post.save()
        //Redirecting the user to the Post Id router
        res.redirect(`/posts/${post.id}`)
    } catch (error) {
        res.render('posts/new', {post: post})
        console.log(error);
    }
    
})



//Export the router
module.exports = router;