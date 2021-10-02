import { useState, useContext } from "react"
import Axios from 'axios'
import { useHistory } from "react-router"
import { toast } from 'react-toastify'
import { AuthContainer } from '../styles/Commons'
import { AuthContext } from '../contexts/AuthContext'



Axios.defaults.withCredentials = true;

export const Login = () => {
    // const userLocal = JSON.parse(window.localStorage.getItem('user'))
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setIsAuthenticated } = useContext(AuthContext);

    const handleSignIn = (e) => {
        e.preventDefault();
        // Sending the information the login to backend and if this user exists the backend is setting a cookie
        // and sending a message.
        Axios.post('http://localhost:3001/api/login', { email, password }).then(res => {
            if (res.data.message === "Logged In") {
                console.log('Login', res.data.message);
                history.push('/home');
                setIsAuthenticated(true);
            } else {
                toast.error('Oops! Something is wrong :(');
            }
        })
    }

    return (
        <AuthContainer>
            <div className="box">
                <h1> Welcome! Sign In </h1>
                <span className="subtitle"> Don't have an account? <a href="/register"> Sign up </a> </span>
                <form className="form" onSubmit={(e) => handleSignIn(e)}>
                    <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
                    <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
                    <button type="submit"> Sign In </button>
                </form>
            </div>
        </AuthContainer>
    )
}