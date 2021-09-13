import { useState, useEffect } from 'react'
import Axios from 'axios'

export const useUsers = (email, password) => {
    const [users, setUsers] = useState([])

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

    const [ loginUser ] = users.filter(user => user.users_email === email && user.users_password === password)


    return { loginUser, users }
}