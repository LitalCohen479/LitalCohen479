import React, {useState, useEffect} from 'react'
import './App.css';
import Axios from 'axios';
import Register from './Register';

<Register />


function App() {



const [movieName, setMovieName] = useState('');
const [review, setReview] = useState('');
const [moviewReviewList, setMovieReviewList] =useState([])
const [newReview, setNewReview] = useState('')

useEffect(()=>{
Axios.get('http://localhost:3001/api/get').then((response)=>{
  // console.log(response.data)
  setMovieReviewList(response.data)
})
},[]);


const submitReview=()=>{

Axios.post('http://localhost:3001/api/insert', {movieName:movieName, movieReview:review}).then(()=>{
});

setMovieReviewList([
  ...moviewReviewList,
  {movieName:movieName, movieReview:review}
])
};
const deleteReview = (movie)=>{
  Axios.delete(`http://localhost:3001/api/delete/${movie}`)
  window.location.reload();

};
const updateReview = (movie)=>{
  Axios.put("http://localhost:3001/api/update",{movieName:movie, movieReview:newReview});
  setNewReview("")
  window.location.reload();

};
  return (

    <div className="App">
<h1>CRUD APP</h1>
<div className='form'>
  <label>Movie Name:</label>
<input type="text" name='movieName' onChange={(e)=>{
setMovieName(e.target.value)
}}/>
<label>Review:</label>
<input type="review" name='review' onChange={(e)=>{
  setReview(e.target.value)
}}/>
<button onClick={submitReview}>Submit</button>

{moviewReviewList.map((val)=>{
return <div className='movie_card'>
  <h1>{val.movieName}</h1> 
<p>{val.movieReview}</p>
<button onClick={()=> {deleteReview(val.movieName)}}>Delete</button>
<input type="text" id='update_input' onChange={(e)=>{
  setNewReview(e.target.value)
}}/>
<button onClick={()=> {updateReview(val.movieName)}}>Update</button>
</div>
})}


</div>

    </div>
  );
}

export default App;
