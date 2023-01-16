const express =require('express');
const app= express();
const cors= require('cors');
require('dotenv').config();

app.use(cors());
app.use(express.json());

const db= require('./models');

//Routers
const PostRouter = require('./routes/Posts');
app.use('/posts', PostRouter);

const CommentsRouter = require('./routes/Comments');
app.use('/comments', CommentsRouter);

const UsersRouter = require('./routes/Users');
app.use('/auth', UsersRouter);

const LikesRouter = require('./routes/Likes');
app.use('/likes', LikesRouter);


db.sequelize
.sync()
.then(()=>{
    app.listen(process.env.PORT || 3001, ()=>{
        console.log('server is running on port 3001')
    });
})
.catch((err)=>{
    console.log(err);
})
;















