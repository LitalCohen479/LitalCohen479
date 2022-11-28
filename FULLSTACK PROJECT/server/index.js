const express =require('express');
const app= express();
const cors= require('cors');

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



db.sequelize.sync().then(()=>{
    app.listen(3001, ()=>{
        console.log('server is running on port 3001')
    });
});















