import { useEffect, useState, useRef } from 'react'
import Axios from 'axios'
import { NavBar } from '../components/NavBar'
import '../styles/Home.scss'
import { useAuth } from '../hooks/useAuth'
import { useHistory } from 'react-router'
import { Modal } from '../components/Modal'

export const Home = () => {
    const history = useHistory()
    // Getting the infos of the user wich was storaged in the login part
    const userLocal = JSON.parse(window.localStorage.getItem('user'))
    if (userLocal === null){
      history.push('/')
    }
    
    useEffect(() => {
      // Getting the information of the database based on the email of the user
        Axios.get(`http://localhost:3001/api/get/${userLocal?.users_email}`)
        .then((response) => {
            setReviewList(response.data)
        })

    }, [])



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

    // Function to submit our review to database
    const submitReview = () => {
        if (movieName !== '' && movieReview !== ''){
            // Here I check if the movie name have alredy been used
            const alreadyUsed = reviewList.some((movie) => movie.movie_name === movieName)
            
            if (alreadyUsed){
            window.alert('This movie have already been reviewed. Thanks!')
            } else {
            // Here I am making a post request, and sending two variables to our backend
            Axios.post('http://localhost:3001/api/insert', {
                movieName: movieName,
                movieReview: movieReview,
                userEmail: userLocal.users_email
            })
            // Setting manually the state for I do not need reload the page
            setReviewList([...reviewList, {movie_name: movieName, movie_review: movieReview}])

            // Cleaning inputs of the form
            movieNameRef.current.value = ''
            movieReviewRef.current.value = ''
            }
        } else {
            window.alert('Empty values. Write something!')
        }
    }

    // Function to delete review
    const handleDeleteReview = (movieName) => {
        Axios.delete(`http://localhost:3001/api/delete/${movieName}/${userLocal?.users_email}`)
        setTimeout(() => {
            window.location.reload()
        }, 100)
    }

    // Function to get the informations of the card clicked and show an modal
    const handleReviewModal = (movieName, movieReview) => {
        // Making the modal appear
        setIsModalOn(true)
        
        // Setting theinformations for modal use
        setModalInfos({
            movieName: movieName,
            movieReview: movieReview,
        })
    }
    // const [newReview, setNewReview] = useState('')

    // // Function to send the review updated to backend
    // const handleUpdateReview = (movieName) => {
    //     Axios.put('http://localhost:3001/api/update', {movieName: movieName, movieReview: newReview, userEmail: userLocal?.users_email})
    //     setIsModalOn(false)
    //     setTimeout(() => {
    //         window.location.reload()
    //     }, 100)
    // }

    // const handleCloseModal = () => {
    //   if (isModalOn){
    //     setIsModalOn(false)
    //   }
    // }

    return (
        <>
        <NavBar
          imgUrl={userLocal?.users_imageurl}
          username={userLocal?.users_username}
        />
        <div className="main">
          <h1> Crud Application </h1>
          <div className="form">
            <div className="input-div">
              {/* <label htmlFor="movie-name">Movie name:</label> */}
              <input ref={movieNameRef} placeholder="Movie Name..." type="text" id="movie-name" onChange={(e) => setMovieName(e.target.value)} autoFocus/>
            </div>
            <div className="input-div">
              {/* <label htmlFor="review">Review</label> */}
              <input ref={movieReviewRef} placeholder="Movie Review..." type="text" id="review" onChange={(e) => setMovieReview(e.target.value)} />
            </div>

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
        <Modal 
          isModalOn={isModalOn} 
          modalInfos={modalInfos}
          setIsModalOn={setIsModalOn}
        />
        </>
    )
}