import { createContext, useState, useEffect } from "react";
import axios from "axios";
import jwtDecode from 'jwt-decode';
import { useNavigate, useLocation } from 'react-router-dom'
import baseURL from '../Constant/BaseURL'

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/dashboard"
    const [auth, setAuth] = useState({});
    let [authTokens, setAuthTokens] = useState(() => (localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null))
    let [loading, setLoading] = useState(true)
    const [error, setError] = useState('');
    
    let loginUser = async (e) => {
        e.preventDefault()
        const response = await fetch(`${baseURL}/api/token/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: e.target.username.value, password: e.target.password.value })
        });

        let data = await response.json();
        if (data.access) {
            const decoded = jwtDecode(data.access)
            // console.log(decoded.company)

            // let comp = 0;
            // if (!decoded.company){
            //     comp = 0
            // }else{
            //     comp = decoded.company
            // }
            setAuth({"role":`${decoded.role}`, "name":`${decoded.email}`, "authTokens":`${data}`});
            setAuthTokens(data)
            localStorage.setItem('authTokens', JSON.stringify(data));

            navigate(from, { replace: true });
        } else {
            if (data.detail){
                setError(data?.detail);
            }else{
                setError("Something went wrong while logging in the user!");
            }

        }
    }

    let logoutUser = () => {
        // e.preventDefault()
        localStorage.removeItem('authTokens')
        setAuthTokens(null)
        setAuth(null)
        navigate('/signin')
        //navigate(from, { replace: true });

    }

    const updateToken = async () => {
        const response = await fetch(`${baseURL}/api/token/refresh/`, {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body:JSON.stringify({refresh:authTokens?.refresh})
        })
       
        const data = await response.json()
        if (response.status === 200) {
            setAuthTokens(data)

            const decoded = jwtDecode(data.access)
            setAuth({"role":`${decoded.role}`, "name":`${decoded.email}`, "authTokens":`${data}`});
            // setUser(jwtDecode(data.access))
            localStorage.setItem('authTokens',JSON.stringify(data))
        } else {
            logoutUser()
        }

        if(loading){
            setLoading(false)
        }
    }
    let contextData = {
        auth:auth,
        setAuth:setAuth,
        loginUser:loginUser,
        error:error,
        logoutUser:logoutUser
    }
    useEffect(()=>{
        if(loading){
            updateToken()
        }

        const REFRESH_INTERVAL = 1000 * 60 * 4 // 4 minutes
        let interval = setInterval(()=>{
            if(authTokens){
                updateToken()
            }
        }, REFRESH_INTERVAL)
        return () => clearInterval(interval)

    },[authTokens, loading])
    return (
        <AuthContext.Provider value = {contextData}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider};