import { FormContainer } from './styles';
import { useRef } from 'react';
import Axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../../hooks/useAuth';

export const Form = ({
    reviewList,
    setReviewList
}) => {
     const { user } = useAuth()

     // inpust referencies to controls the values of them
     const movieNameRef = useRef(null);
     const movieReviewRef = useRef(null);

     // Function to submit our review to database
     const submitReview = (e) => {
          e.preventDefault();
          const movieName = movieNameRef.current?.value;
          const movieReview = movieReviewRef.current?.value;

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
          <FormContainer onSubmit={(e) => submitReview(e)}>
               <div className="input-div">
                    {/* <label htmlFor="movie-name">Movie name:</label> */}
                    <input ref={movieNameRef} placeholder="Movie Name..." type="text" id="movie-name" autoFocus/>
               </div>
               <div className="input-div">
                    {/* <label htmlFor="review">Review</label> */}
                    <input ref={movieReviewRef} placeholder="Movie Review..." type="text" id="review" />
               </div>
               <button type="submit">Submit</button>
          </FormContainer>
     )
}