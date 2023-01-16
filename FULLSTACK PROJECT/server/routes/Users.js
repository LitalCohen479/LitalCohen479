const express= require('express');
const router = express.Router()
const {Users} = require('../models')
const bcrypt= require('bcryptjs')
const {sign}= require('jsonwebtoken')
const {validateToken}=require('../middlewares/AuthMiddleware')



router.post('/',  async(req, res)=>{
const {username, password} = req.body;
bcrypt.hash(password, 10).then((hash)=>{
Users.create({username:username, password:hash})
res.json('new user success')
})

});

router.post('/login',  async(req, res)=>{
    const {username, password} = req.body;
   const user = await Users.findOne({ where: {username:username} });
   if (!user) res.json({error:'user doesnt exist'});
   bcrypt.compare(password, user.password).then((match)=>{
if(!match)res.json({error:'wrong password'});

const accessToken = sign({username:username, id:user.id}, 'importantSecret');
res.json({token: accessToken, username: username, id: user.id})
   })
    
    });

    router.get('/auth',validateToken, (req, res)=>{
res.json(req.user)
    })

    router.get('/basicInfo/:id', async (req, res)=>{
const id=req.params.id;

 const basicInfo = await Users.findByPk(id, {attributes: {exclude:["password"]},
});
res.json(basicInfo)
 })

 router.put("/changePassword", validateToken, async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const user = await Users.findOne({ where: { username: req.user.username } });
  
    bcrypt.compare(oldPassword, user.password).then(async (match) => {
      if (!match) res.json({ error: "Wrong Password Entered!" });
  
      bcrypt.hash(newPassword, 10).then((hash) => {
        Users.update(
          { password: hash },
          { where: { username: req.user.username } }
        );
        res.json("SUCCESS");
      });
    });
  });
 
 

module.exports=router;