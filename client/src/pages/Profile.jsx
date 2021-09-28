import { useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { NavBar } from '../components/NavBar'
import Axios from 'axios'
import '../styles/Profile.scss'
import { toast } from 'react-toastify'
import { FiAlertCircle } from "react-icons/fi";
import { useAuth } from '../hooks/useAuth'
import { setCookie } from 'nookies'



export const Profile = () => {
    const { user } = useAuth()

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [image, setImage] = useState(user.imageUrl)
    const pastEmail = user.email

    useEffect(() => {
        setImage(user.imageUrl)
    }, [user])

    // Function for if the value of the image input is an empty string set to image state the value of the paste url of the user
    const handleImage = useCallback((e) => {
        if (e.target.value.length === 0){
            setImage(user.imageUrl)
        } else {
            setImage(e.target.value)
        }
    }, [image])
    
    const msInDay = 1000 * 60 * 60  * 24
    const dateToday = new Date()
    const strToday = dateToday.toISOString()
    const alterationDate = new Date(user.alterationDate)
    // An variable to check the difference between the current day and the day of last modification
    const daysDifference = Math.floor((dateToday - alterationDate) / msInDay)
    // The days left to can modify again
    const daysLeft = 5 - daysDifference

    // State to control the alteration message div
    const [showError, setShowError] = useState(false)
    const handleUpdateInfos = useCallback((e) => {
        e.preventDefault()
        
        if (daysDifference < 0 || user.alterationDate == null){
            console.log('OK')
            Axios.post('http://localhost:3001/api/updateUsers', { username, email, password, image, pastEmail, strToday }).then(res => {
                if (res.data.message === 'Email is Already Been Used') {
                    toast.error(`Oops! ${res.data.message}`)
                } else {
                    toast.success('Yeeah! User updated');
                    // Changing the email of the reviews wich was made by the pastEmail
                    Axios.put('http://localhost:3001/api/updateEmailReview', { pastEmail, email })
                    
                    // Setting a new cookie with the accessToken made in backend and received by back-end
                    setCookie(null, 'access-token', res.data.accessToken, {
                        maxAge: 30 * 24 * 60 * 60,
                        path: '/',
                    })
                    window.location.reload();
                }
            })
        } else {
            setShowError(true)
        }
        
    }, [username, email, password, image])

    return (
        <div className="profile-container">
            <NavBar
                isProfile
                imgUrl={user.imageUrl}
                username={user.username}
            />
            <div className="profile-grid">
                <form className="change-form" onSubmit={(e) => handleUpdateInfos(e)}>
                    <h2 className="change-title">Modify Infos</h2>
                    <input type="text" className="change-input" placeholder='New username' onChange={(e) => setUsername(e.target.value)} required />
                    <input type="email" className="change-input" placeholder='New email' onChange={(e) => setEmail(e.target.value)} required />
                    <input type="password" className="change-input" placeholder='New password' onChange={(e) => setPassword(e.target.value)} required />
                    <input type="text" className="change-input" placeholder='New Image URL' onChange={(e) => handleImage(e)} />
                    <button type="submit" className='change-btn'>Save Changes</button>
                    {
                        showError &&
                        <div className="timer-div">
                            <FiAlertCircle className="alert-icon"/>
                            <p>You altered the information { daysDifference } days ago. Come back { daysLeft } days later. </p>
                        </div>
                    }
                </form>
            </div>
        </div>
    )
}