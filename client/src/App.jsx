import './App.css';
import { useState } from 'react'
import Axios from 'axios'

function App() {
  const [movieName, setMovieName] = useState('')
  const [movieReview, setMovieReview] = useState('')
  
  const submitReview = () => {
    Axios.post('http://localhost:3001/api/insert', {
      movieName: movieName,
      movieReview: movieReview
    }).then(() => {
      alert("runned")
    })
    // Here I am making a post request, and sending two variables to our backend
  }
  return (
    <div className="App">
      <h1> CRUD APPLICATION </h1>
      <div className="form">
        <label htmlFor="movie-name">Movie name:</label>
        <input type="text" id="movie-name" onChange={(e) => setMovieName(e.target.value)}/>
        <label htmlFor="review">Review</label>
        <input type="text" id="review" onChange={(e) => setMovieReview(e.target.value)}/>
        <button onClick={() => submitReview()}>Submit</button>
      </div>
    </div>
  );
}

export default App;
