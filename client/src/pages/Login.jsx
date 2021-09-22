import { useEffect, useState } from "react"
import Axios from 'axios'
import { useHistory } from "react-router"
import { useUsers } from "../hooks/useUsers"
import { toast, ToastContainer } from 'react-toastify'




export const Login = () => {
    // const userLocal = JSON.parse(window.localStorage.getItem('user'))
    const history = useHistory()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    // const { loginUser } = useUsers(email, password)
    // console.log('loginUser', loginUser)

    
    const handleSignIn = (e) => {
        e.preventDefault()
        Axios.post('http://localhost:3001/login', { email, password }).then(res => {
            
        })


        // if (loginUser !== undefined){
        //     window.localStorage.setItem('user', JSON.stringify(loginUser))
        //     history.push('/home')

        // } else {
        //     toast.error('Oops! wrong values :(');
        // }
    }

    return (
        <>

            <main>
                <div className="box">
                    <h1> Welcome! Sign In </h1>
                    <span className="subtitle"> Don't have an account? <a href="/register"> Sign up </a> </span>
                    <form className="form" onSubmit={(e) => handleSignIn(e)}>
                        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
                        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
                        <button type="submit"> Sign In </button>
                    </form>
                </div>
            </main>
        </>
    )
}