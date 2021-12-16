import { createContext, useState, useEffect } from 'react'
import { parseCookies } from 'nookies'
import axios from 'axios'

export const AuthContext = createContext({})

export const AuthContextProvider = (props) => {
     const cookies = parseCookies()
     const [isAuthenticated, setIsAuthenticated] = useState();
     const [loading, setLoading] = useState(true);
     const accessToken = cookies['access-token']
     useEffect(() => {
          if (accessToken){
               axios.get(`http://localhost:3001/api/auth/${accessToken}`).then(res => {
                    console.log('RESPOSTA', res.data)
                    const authenticated = res.data.authenticated
                    setIsAuthenticated(authenticated ? true : false)
               })
          }

          // When the request ends it will set Loading to false. If wouldn't did it, before the request ends the provider is render. 
          // But I need to wait this, and for that I putted the return component with one element.
          setLoading(false);
     }, [])
     useEffect(() => {
          if (isAuthenticated){
               axios.get(`http://localhost:3001/api/get-user/${accessToken}`).then(res => {
                    setUser(res.data)
               })
          }
     }, [isAuthenticated])
     
     const [user, setUser] = useState({})

     if (loading){
          return <h1>Loading...</h1>
     }
     
     return (
          <AuthContext.Provider value={{isAuthenticated, user, setIsAuthenticated}}>
               {props.children}
          </AuthContext.Provider>
     )
}