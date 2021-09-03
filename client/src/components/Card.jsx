import Axios from 'axios'

export const Card = ({
    review,
    setIsModalOn,
    setModalInfos
}) => {
    const userLocal = JSON.parse(window.localStorage.getItem('user'))

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
        Axios.delete(`http://localhost:3001/api/delete/${movieName}/${userLocal?.users_email}`)
        setTimeout(() => {
            window.location.reload()
        }, 100)
    }

    return (
        <div className="card" key={review.movie_name}>
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
    )
}