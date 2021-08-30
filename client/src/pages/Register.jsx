import { useState } from 'react'
import { useHistory } from 'react-router'
import '../styles/Register.scss'

export const Register = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [imageUrl, setImageUrl] = useState('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png')

    const handleSignUp = () => {
        if (username !== '' && email !== '' && password !== ''){
            if (email.includes('@')){
                window.alert('inclui')
            } else {
                window.alert('Enter a valid email')
            }
            
            console.log(username, email, password)
        } else {
            window.alert("Empty values. Enter something!")
        }
    }

    return (
        <main>
            <div className="box">
                <h1>Create Account</h1>
                <span className="subtitle"> Already have an account? <a href=""> Sign In </a> </span>

                <div className="form">
                    <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
                    <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
                    <input type="text" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                    <input type="text" placeholder="Profile image url" onChange={(e) => setImageUrl(e.target.value)}/>
                    <button onClick={() => handleSignUp()}> Sign Up </button>
                </div>
            </div>
        </main>
    )
}