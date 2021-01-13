const express = require('express')
const app = express()
const path = require('path')
const Post = require('./models/Post')
const postRouter = require('./routes/posts')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/blog', {
        useNewUrlParser: true,
        useUnifiedTopology: true
        // useCreateIndex: true
    }).then(() => console.log('Now connected to MongoDB!'))
    .catch(err => console.error('Something went wrong', err))

// app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))

app.use(express.static(path.join(__dirname, 'public')))

app.set('view engine', 'ejs')


// ROUTES
//Index
app.get('/', (req, res) => {
    res.render('index')
})

// Blog Route - pass in the object to the route as an object that can be rendered out at the view at this route
app.get('/blog', async (req, res) => {
    
    const posts = await Post.find().sort({createdAt: 'desc'})

    res.render('blog', { posts: posts })
})

app.use('/posts/', postRouter)

app.listen(5000)

