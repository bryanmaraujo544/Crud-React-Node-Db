import { useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { useUsers } from '../hooks/useUsers'
import { NavBar } from '../components/NavBar'
import Axios from 'axios'
import '../styles/Profile.scss'
import { useEmailVerification } from '../hooks/useEmailVerification'
import { toast } from 'react-toastify'


export const Profile = () => {
    const history = useHistory()
    const userLocal = JSON.parse(window.localStorage.getItem('user'))

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [image, setImage] = useState(userLocal?.users_imageurl)

    const pastEmail = userLocal?.users_email

    const { users } = useUsers()
    const { isEmailUsed } = useEmailVerification(email)

    useEffect(() => {
        const newEmail = JSON.parse(window.localStorage?.getItem('userTemp')).users_email
        const [user] = users.filter(user => user.users_email === newEmail)
        console.log('user', user)

        // When user have already been catch and there isn't a record of user information, we do set to localStorage the new information.
        // I'm doing it because I need to set only one time and the user, in the first time the page render, will be undefined, because users array is been 
        // Uploaded by backend. And if for that this useEffect runs every time users array change.
        if (user !== undefined && userLocal === null){
            window.localStorage.setItem('user', JSON.stringify(user))
            window.location.reload()
        }
    }, [users])

    // Function for if the value of the image input is an empty string set to image state the value of the paste url of the user
    const handleImage = useCallback((e) => {
        if (e.target.value.length === 0){
            setImage(userLocal?.users_imageurl)
        } else {
            setImage(e.target.value)
        }
    }, [image])
    
    const dateToday = new Date()
    const strToday = dateToday.toISOString()

    const alterationDate = new Date(userLocal?.alterationDate)
    console.log('day', alterationDate)
    const strDate1 = alterationDate.toISOString()

    const msInDay = 1000 * 60 * 60  * 24

    // An variable to check the difference between the current day and the day of last modification
    const daysDifference = Math.floor((dateToday - alterationDate) / msInDay)
  
    // The days left to can modify again
    const daysLeft = 5 - daysDifference

    const [showError, setShowError] = useState(false)

    const handleUpdateInfos = useCallback((e) => {
        e.preventDefault()
        if (isEmailUsed){
            toast.error('Oops! This email is already been used :(')
        } else {
            if (userLocal.alterationDate === null){
                Axios.put('/api/createAlteration', {alterationDate: strToday, email: pastEmail})
            }

            if (daysDifference < 0){
                Axios.put('http://localhost:3001/api/updateUsers', { username, email, password, image, pastEmail, strToday })
                
                // Changing the email of the reviews wich was made by the pastEmail
                Axios.put('http://localhost:3001/api/updateEmailReview', { pastEmail, email })
                window.localStorage.removeItem('user')
        
                // This information is the current email before update it. I'm setting is to localStorage to even after the page loader this information is been readable
                // I made it because in the time I will set the new user informations to localStorage, I need the past email to catch the user in table of database and update it.
                window.localStorage.setItem('userTemp', JSON.stringify({users_email: email}))
                
                setTimeout(() => {
                    window.location.reload()
                }, 500)
            } else {
                setShowError(true)
            }
        }
    }, [username, email,password, image, isEmailUsed])

    return (
        <div className="profile-container">
            <NavBar
                isProfile
            />
            <div className="profile-grid">
                <form className="change-form" onSubmit={(e) => handleUpdateInfos(e)}>
                    <h2 className="change-title">Modify Infos</h2>
                    <input type="text" className="change-input" placeholder='New username' onChange={(e) => setUsername(e.target.value)} required />
                    <input type="text" className="change-input" placeholder='New email' onChange={(e) => setEmail(e.target.value)} required />
                    <input type="text" className="change-input" placeholder='New password' onChange={(e) => setPassword(e.target.value)} required />
                    <input type="text" className="change-input" placeholder='New Image URL' onChange={(e) => handleImage(e)} />
                    <button type="submit" className='change-btn'>Save Changes</button>
                    {
                        showError &&
                        <div className="timer-div">
                            <p>You altered the information { daysDifference } ago. come back { daysLeft } days later. </p>
                        </div>
                    }
                </form>
            </div>
        </div>
    )
}