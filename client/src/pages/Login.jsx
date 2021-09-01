import { useEffect, useState } from "react"
import Axios from 'axios'
import { useHistory } from "react-router"
import { useAuth } from "../hooks/useAuth"

export const Login = () => {
    const history = useHistory()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [users, setUsers] = useState([])
    console.log(users)

   
    useEffect(() => {
        try {
            Axios.get('http://localhost:3001/api/getUsers')
                .then(response => {
                    console.log(response)
                    setUsers(response.data)
                })
        } catch (error) {
            console.log(error)
        }

        }, [])

    const handleSignIn = (e) => {
        e.preventDefault()
        console.log('allusers', users)
        const [ loginUser ] = users.filter(user => user.users_email === email && user.users_password === password)
        console.log('login-user', loginUser)

        if (loginUser !== undefined){
            window.localStorage.setItem('user', JSON.stringify(loginUser))
            history.push('/home')

        } else {
            window.alert('wrong values')
        }
    }

    return (
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
    )
}