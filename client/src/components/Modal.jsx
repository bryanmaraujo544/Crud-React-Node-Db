import Axios from 'axios'
import { useState, useEffect, useCallback } from 'react'


export const Modal = ({
    isModalOn,
    modalInfos,
    setIsModalOn
}) => {
    const userLocal = JSON.parse(window.localStorage.getItem('user'))

    const [newReview, setNewReview] = useState('')
    console.log(modalInfos.movieName, newReview)
    console.log(userLocal)
    // Function to send the review updated to backend
    const handleUpdateReview = useCallback((movieName) => {
        Axios.put('http://localhost:3001/api/update', {movieName: modalInfos.movieName, movieReview: newReview, userEmail: userLocal?.users_email})
        setIsModalOn(false)
        setTimeout(() => {
            window.location.reload()
        }, 100)
    }, [newReview])



    return (
        <>
            {isModalOn && 
                <div className="modal"  onClick={() => isModalOn && setIsModalOn(false)}>
                    <div className="card">
                        <div className="text">
                            <h3 className="card-title">
                                {modalInfos.movieName}
                            </h3>
                            <input  placeholder="Type the new review for the movie..." type="text" className="review-input" onChange={(e) => setNewReview(e.target.value)} autoFocus/>
                        </div>
                        <div className="buttons">
                            <button type="button" onClick={() => handleUpdateReview(modalInfos.movieName)}> Update </button>
                            {/* I'm passingmodalInfos.movieName based on the card clicked. I'm receiving this informations by props of the home page */}
                        </div>
                    </div>
                </div>
            }
        </>
    )
}