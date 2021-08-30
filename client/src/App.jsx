import './App.scss';
import { useEffect, useState, useRef } from 'react'
import Axios from 'axios'

function App() {
  useEffect(() => {
    Axios.get('http://localhost:3001/api/get')
    .then((response) => {
      setReviewList(response.data)
    })

  }, [])

  // Ref of the input
  const newReviewRef = useRef('')

  const [movieName, setMovieName] = useState('')
  const [movieReview, setMovieReview] = useState('')
  const [reviewList, setReviewList] = useState([])
  console.log(reviewList)

  // Creating the modal informations
  const [modalInfos, setModalInfos] = useState({movieName: '', movieReview: ''})
  const [isModalOn, setIsModalOn] = useState(false)

  
  
  // inpust referencies to controls the values of them
  const movieNameRef = useRef(null)
  const movieReviewRef = useRef(null)
  
  const submitReview = () => {
    if (movieName !== '' && movieReview !== ''){
      const alreadyUsed = reviewList.some((movie) => movie.movie_name === movieName)
      
      if (alreadyUsed){
        window.alert('This movie have already been reviewed. Thanks!')
      } else {
        Axios.post('http://localhost:3001/api/insert', {
          movieName: movieName,
          movieReview: movieReview
        })
        // Here I am making a post request, and sending two variables to our backend
        setReviewList([...reviewList, {movie_name: movieName, movie_review: movieReview}])

        // Cleaning inputs of the form
        movieNameRef.current.value = ''
        movieReviewRef.current.value = ''
      }
    } else {
      window.alert('Empty values. Write something!')
    }
    
  }

  const handleDeleteReview = (movieName) => {
    Axios.delete(`http://localhost:3001/api/delete/${movieName}`)
    setTimeout(() => {
      window.location.reload()
    }, 100)
  }

  useEffect(() => {
    console.log(newReviewRef.current)
  })


  // Function to get the informations of the card clicked and show an modal
  const handleReviewModal = (movieName, movieReview) => {
    // Making the modal appear
    setIsModalOn(true)
    
    setModalInfos({
      movieName: movieName,
      movieReview: movieReview,
    })
    console.log(modalInfos)
  
    
    // Axios.put('http://localhost:3001/api/update', {movieName: movieName, movieReview: movieReview})
  }
  


  const [newReview, setNewReview] = useState('')
  // Function to send the review updated to backend
  const handleUpdateReview = (movieName) => {
    Axios.put('http://localhost:3001/api/update', {movieName: movieName, movieReview: newReview})
    setIsModalOn(false)
    setTimeout(() => {
      window.location.reload()
    }, 100)

  }
  return (
    <>
    <div className="App">
      <h1> Crud Application </h1>
      <div className="form">
        <label htmlFor="movie-name">Movie name:</label>
        <input ref={movieNameRef} placeholder="Type movie name..." type="text" id="movie-name" onChange={(e) => setMovieName(e.target.value)}/>
        <label htmlFor="review">Review</label>
        <input ref={movieReviewRef} placeholder="Type movie review..." type="text" id="review" onChange={(e) => setMovieReview(e.target.value)} autoFocus/>
        <button onClick={() => submitReview()}>Submit</button>
      </div>
        <div className="reviews">
          {reviewList.map(review => (
            <div className="card" key={review?.id}>
              <div className="text">
                <h3 className="card-title">
                  {review.movie_name}
                </h3>
                <p className="review-text">
                  {review.movie_review}
                </p>
              </div>
                <div className="buttons">
                  <button type="button" className="card-button" onClick={() => handleReviewModal(review.movie_name, review.movie_review)}> Update </button>
                  <button type="button" className="card-button" onClick={() => handleDeleteReview(review.movie_name)}> Delete </button>
                </div>
            </div>
          ))}
        </div>
    </div>
    {isModalOn && 
      <div className="modal">
        <div className="card">
          <div className="text">
            <h3 className="card-title">
              {modalInfos.movieName}
            </h3>
            <input ref={newReviewRef}  placeholder="Type the new review for the movie..." type="text" className="review-input" onChange={(e) => setNewReview(e.target.value)} autoFocus/>
          </div>
            <div className="buttons">
              <button type="button" onClick={() => handleUpdateReview(modalInfos.movieName)}> Update </button>
            </div>
        </div>
      </div>
    }
    </>
  );
}

export default App;
