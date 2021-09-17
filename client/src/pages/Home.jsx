import { useEffect, useState, useRef } from 'react'
import Axios from 'axios'
import { NavBar } from '../components/NavBar'
import '../styles/Home.scss'
import { useHistory } from 'react-router'
import { Modal } from '../components/Modal'
import { Card } from '../components/Card'
import { toast } from 'react-toastify'

export const Home = () => {
    const history = useHistory()
    // Getting the infos of the user wich was storaged in the login part
    const userLocal = JSON.parse(window.localStorage.getItem('user'))
    useEffect(() => {
      if (userLocal === null){
        history.push('/')
      }
    }, [userLocal])
    
    useEffect(() => {
      // Getting the information of the database based on the email of the user
        Axios.get(`http://localhost:3001/api/get/${userLocal?.users_email}`)
        .then((response) => {
            setReviewList(response.data)
        })

    }, [userLocal?.users_email])

    const [movieName, setMovieName] = useState('')
    const [movieReview, setMovieReview] = useState('')
    const [reviewList, setReviewList] = useState([])

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
              toast.error('This movie have already been reviewed. Thanks!')
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
              toast.success('Review done!', {
                position: 'top-center'
              })
            }
        } else {
            toast.error('Empty values. Write something!')

        }
    }

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
                <Card 
                  review={review}
                  setIsModalOn={setIsModalOn}
                  setModalInfos={setModalInfos}
                />
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