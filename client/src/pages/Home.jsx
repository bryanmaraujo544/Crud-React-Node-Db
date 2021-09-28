import { useEffect, useState, useRef } from 'react'
import Axios from 'axios'
import { NavBar } from '../components/NavBar'
import '../styles/Home.scss'
import { useHistory } from 'react-router'
import { Modal } from '../components/Modal/Modal'
import { Card } from '../components/Card'
import { toast } from 'react-toastify'
import { useAuth } from '../hooks/useAuth'
import { parseCookies } from 'nookies'

export const Home = () => {
    const { isAuthenticated, user } = useAuth()
    console.log(user.imageUrl)
    
    const history = useHistory()
    // Getting the infos of the user wich was storaged in the login part
    const cookies = parseCookies()
    const accessToken = cookies['access-token'];

    const [movieName, setMovieName] = useState('')
    const [movieReview, setMovieReview] = useState('')
    const [reviewList, setReviewList] = useState([])

    useEffect(() => {
      if (!isAuthenticated){
        history.push('/')
      }
    }, [isAuthenticated])
    
    useEffect(() => {
      // Getting the information of the database based on the email of the user
        Axios.get(`http://localhost:3001/api/get-reviews/${user?.email}`)
        .then((response) => {
            setReviewList(response.data)
        })

    }, [user?.email])

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
              // Here I am making a post request, and sending the informations of the review for our backend
              Axios.post('http://localhost:3001/api/insert-review', {
                  movieName: movieName,
                  movieReview: movieReview,
                  userEmail: user?.email
              })

              // Setting manually the state for I do not need reload the page
              setReviewList([...reviewList, {movie_name: movieName, movie_review: movieReview}])

              // Cleaning inputs of the form
              movieNameRef.current.value = ''
              movieReviewRef.current.value = ''

              toast.success('Review done!', {
                position: 'top-center',
                autoClose: 1000,
              })
            }
        } else {
            toast.error('Empty values. Write something!')
        }
    }

    return (
        <>
        <NavBar
          imgUrl={user?.imageUrl}
          username={user?.username}
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