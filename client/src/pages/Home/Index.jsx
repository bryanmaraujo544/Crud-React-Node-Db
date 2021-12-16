import { HomeContainer } from './styles'
import { useEffect, useState, useRef, useContext } from 'react'
import { parseCookies } from 'nookies'
import Axios from 'axios'
import { toast } from 'react-toastify'
import { useHistory } from 'react-router'
import { NavBar } from '../../components/NavBar'
import { Modal } from '../../components/Modal/index'
import { Card } from '../../components/Card/index'
import { Form } from '../../components/Form/index'
import { useAuth } from '../../hooks/useAuth'
import { ThemeContext } from '../../contexts/ThemeContext';



export const Home = () => {
     const { isAuthenticated, user } = useAuth()
     const history = useHistory()
     
     const [reviewList, setReviewList] = useState([])
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

     return (
          <HomeContainer>
               <NavBar
                    imgUrl={user?.imageUrl}
                    username={user?.username}
               />
               <div className="main">
                    <h1> Crud Application </h1>
                    <Form 
                         reviewList={reviewList}
                         setReviewList={setReviewList}
                    />
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
          </HomeContainer>
     )
}