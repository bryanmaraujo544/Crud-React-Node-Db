import '../styles/Register.scss'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import { useEmailVerification } from '../hooks/useEmailVerification'
import Axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'

export const Register = () => {
    const history = useHistory()
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [imageUrl, setImageUrl] = useState('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png')

    const [users, setUsers] = useState([])
    useEffect(() => {
        Axios.get('http://localhost:3001/api/get/users')
            .then(response => {
                setUsers(response.data)
            })
    }, [])

    const { isEmailUsed } = useEmailVerification(email)

    const handleSignUp = async (e) => {
        e.preventDefault()
        if (username !== '' && email !== '' && password !== ''){
            if (email.includes('@')){
                // Verification to check if the email the user wrote is being used for some other
                console.log('isEmailUsed', isEmailUsed)
                if (isEmailUsed){ 
                    window.alert('This email is already been used')
                } else {
                    const req = Axios.post('http://localhost:3001/api/insert/users', {
                        username,
                        email,
                        password,
                        imageUrl,
                    })
                    const prom = new Promise(resolve => setTimeout(resolve, 1000))
                    
                    toast.promise(
                        prom,
                        {
                            pending: 'Creating user...',
                            success: 'User created!',
                            error: "User don't created",
                        }, 
                        {
                            autoClose: 1000
                        }
                    ).then(() => {
                        setTimeout(() => {
                            history.push('/')
                            window.location.reload()
                        }, 1500)
                    })
                }             
            } else {
                toast.warn('Enter a valid email!')
            }
        } else {
            toast.warn('Empty values!')
        }
    }

    return (
        <>
        <main>
            <div className="box">
                <h1>Create Account</h1>
                <span className="subtitle"> Already have an account? <a href="/"> Sign In </a> </span>
                <form className="form" onSubmit={(e) => handleSignUp(e)}>
                    <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                    <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    <input type="text" placeholder="Profile image url" onChange={(e) => setImageUrl(e.target.value)} />
                    <button type="submit"> Sign Up </button>
                </form>
            </div>
        </main>
        </>
    )
}