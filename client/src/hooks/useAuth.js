import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../contexts/AuthContext"
import { parseCookies } from 'nookies'
import axios from 'axios'

export const useAuth = () => {
     const value = useContext(AuthContext);
     return value;
}