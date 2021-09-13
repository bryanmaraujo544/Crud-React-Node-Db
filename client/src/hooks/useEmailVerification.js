import { useState, useEffect } from "react"
import Axios from 'axios'
import { useUsers } from "./useUsers"

export const useEmailVerification = (email) => {
    console.log('email', email)
    const { users } = useUsers()
    console.log('users', users)

    // Verification to check if the email the user wrote is being used for some other
    const isEmailUsed = users.some(user => user.users_email === email)
    
    return { isEmailUsed }
}