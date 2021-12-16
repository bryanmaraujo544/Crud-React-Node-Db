import { ModalContainer } from './styles';
import Axios from 'axios'
import { useState, useEffect, useCallback } from 'react'
import { AiFillCloseCircle } from "react-icons/ai";
import { motion, useAnimation } from 'framer-motion'
import { useAuth } from '../../hooks/useAuth';

export const Modal = ({
    isModalOn,
    modalInfos,
    setIsModalOn
}) => {
     const { user } = useAuth()
     const [newReview, setNewReview] = useState('')

     // Function to send the review updated to backend
     const handleUpdateReview = useCallback((movieName) => {
          Axios.put('http://localhost:3001/api/update-review', {movieName: modalInfos.movieName, movieReview: newReview, userEmail: user.email})
          setIsModalOn(false)
          setTimeout(() => {
               window.location.reload()
          }, 100)
     }, [newReview])

     // ============= TRANSITIONS FRAMER ============= //
     const modalBgControls = useAnimation();
     const modalControls = useAnimation();

     const modalVariants = {
          open: { opacity: 1, y: 0 },
          close: { opacity: 0, y: -200 }
     }

     const modalBgVariants = {
          open: { opacity: 1, display: 'flex' },
          close: { opacity: 0, display: 'none' }
     }

     const sequence = async () => {
          // When the modal is true, and this happens when the user click on update button, the background animation occurs first.
          if (isModalOn){
               await modalBgControls.start(isModalOn ? "open" : "close")
               return await modalControls.start(isModalOn ? "open" : "close")
          } else {
               await modalControls.start(isModalOn ? "open" : "close")
               return await modalBgControls.start(isModalOn ? "open" : "close")
          }
     }

     useEffect(() => {
          sequence()
     }, [isModalOn])

     return (
          <>
               <ModalContainer
                    as={motion.div}
                    initial={{display: 'none', opacity: 0}} 
                    variants={modalBgVariants} 
                    animate={modalBgControls}
               >
                    <motion.div 
                         className="card" 
                         initial={{opacity: 0, y: 300}} 
                         variants={modalVariants} 
                         animate={modalControls}
                    >
                         <AiFillCloseCircle 
                         className="close-icon"
                         size="32px"
                         onClick={() => isModalOn && setIsModalOn(false)}
                         />

                         <div className="text">
                         <h3 className="card-title">
                              {modalInfos.movieName}
                         </h3>
                         <input  
                              placeholder="Type the new review for the movie..." 
                              type="text" className="review-input" 
                              onChange={(e) => setNewReview(e.target.value)} 
                              autoFocus
                         />
                         </div>
                         <div className="buttons">
                         <button 
                              type="button" 
                              onClick={() => handleUpdateReview(modalInfos.movieName)}
                         >
                              Update 
                         </button>
                         {/* I'm passing modalInfos.movieName based on the card clicked. I'm receiving this informations by props of the home page */}
                         </div>
                    </motion.div>
               </ModalContainer>
               
          </>
     )
}