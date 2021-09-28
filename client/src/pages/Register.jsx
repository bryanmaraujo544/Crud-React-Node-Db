import '../styles/Register.scss'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import Axios from 'axios'
import { toast } from 'react-toastify'

export const Register = () => {
    const history = useHistory()
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [imageUrl, setImageUrl] = useState('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png')

    const handleSignUp = async (e) => {
        e.preventDefault()
        if (username !== '' && email !== '' && password !== ''){
            // Verification to check if the email the user wrote is being used for some other
            const req = Axios.post('http://localhost:3001/api/register', {
                username,
                email,
                password,
                imageUrl,
            })
            const { data: { message } } = await req
            const res = await req
            if (message === "User created"){
                toast.promise(
                    req,
                    {
                        pending: 'Creating user...',
                        success: 'User created!',
                        error: "User don't created",
                    }, 
                    {
                        position: "top-center",
                        autoClose: 1000
                    }
                ).then(() => {
                    history.push('/')
                    window.location.reload()
                })
            } else {
                toast.error("This email is already been used", {
                    position: "top-center"
                })
            }            
        } else {
            toast.warn('Empty values!', {
                position: "top-center"
            })
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