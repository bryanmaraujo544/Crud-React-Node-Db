import { CardContainer } from './styles'
import Axios from 'axios'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'
import { useAuth } from '../../hooks/useAuth'

export const Card = ({
    review,
    setIsModalOn,
    setModalInfos
}) => {
     const { user } = useAuth()
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
     // Function to delete review
     const handleDeleteReview = (movieName) => {
          Axios.delete(`http://localhost:3001/api/delete/${movieName}/${user.email}`)
          toast.success('Review deleted!', {
                    position: 'top-center',
                    autoClose: 800
          })
          setTimeout(() => {
               window.location.reload()
          }, 1300)
     }
     return (
          <CardContainer
               as={motion.div}
               key={review.movie_name}
               initial={{y: -100, opacity: 0}}
               animate={{y: 0, opacity: 1}}
          >
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
          </CardContainer>
     )
}