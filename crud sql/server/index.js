const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const cors= require('cors');
const mysql = require('mysql')

const db = mysql.createPool({
    host:'localhost',
    user: 'root',
    password: '1234',
    dataBase: 'CRUDDateBase'
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}))

// app.get('/', (req, res)=>{
// //     const sqlInsert=
// //   "INSERT INTO `CRUDDataBase`.`movie_reviews` (`movieName`, `movieReview`) VALUES ('inception', 'good');"
// //     db.query(sqlInsert, (err, result)=>{
// //         res.send('hello:)')
// //     });

// });

app.get('/api/get', (req, res)=>{
    const sqlSelect=
    "SELECT * FROM CRUDDataBase.movie_reviews;"
  db.query(sqlSelect, (err, result)=>{
res.send(result)
  });
})


app.delete('/api/delete/:movieName', (req, res)=>{
    
    const name = req.params.movieName;
    const sqlDelete=
    "DELETE FROM `CRUDDataBase`.`movie_reviews` WHERE movieName = ?;"
    db.query(sqlDelete, name, (err, result)=>{
        if (err) console.log(err);
    })
})


app.post('/api/insert', (req, res)=>{
  
const movieName=req.body.movieName;
const movieReview=req.body.movieReview;

    const sqlInsert=
      "INSERT INTO `CRUDDataBase`.`movie_reviews` (`movieName`, `movieReview`) VALUES (?,?);"
    db.query(sqlInsert, [movieName, movieReview], (err, result)=>{
console.log(result)
    });
})

app.put('/api/update', (req, res)=>{

    const name=req.body.movieName;
    const review=req.body.movieReview;
    console.log(name, review)
        const sqlUpdate=
        "UPDATE `CRUDDataBase`.`movie_reviews` SET `movieReview` = ? WHERE movieName = ?";
        db.query(sqlUpdate, [review, name], (err, result)=>{
            console.log('result', result)
            if (err) console.log(err);
        });
    });

app.listen(3001,() =>{
console.log('running on port 3001')
})