import {createContext, FormEvent, useState, ReactNode, useContext, useEffect} from 'react';
import jwt_decode from "jwt-decode";
import axios from "axios";
import {useNavigate} from "react-router-dom";

//
// interface User {
//     email: string;
// }

interface AuthContextProps {
    loginUser: (e: FormEvent) => Promise<void>;
    user: any | null
    logoutUser: () => void;
    authTokens: Tokens | null
}

interface Tokens {
    access: string;
    refresh: string;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within a AuthProvider')
    }
    return context;
}

export const AuthProvider = ({children}: { children: ReactNode }) => {

    const storedTokens = localStorage.getItem("authTokens");
    const initialTokens = storedTokens ? JSON.parse(storedTokens) : null;
    const [authTokens, setAuthTokens] = useState<Tokens | null>(initialTokens);
    const [user, setUser] = useState<any | null>(() => authTokens ? jwt_decode(authTokens.access) : null);
    const [loading, setLoading] = useState<boolean>(true);

    const navigate = useNavigate();


    const loginUser = async (e: FormEvent) => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
            email: { value: string };
            password: { value: string };
        };
        const email = target.email.value;
        const password = target.password.value;
        try {
            const response = await axios.post("http://localhost:8000/api/v1/token/", {
                email: email,
                password: password,
            });
            setAuthTokens(response.data);
            setUser(jwt_decode(response.data.access));
            localStorage.setItem("authTokens", JSON.stringify(response.data));
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    const logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem("authTokens");
        navigate("/");
        setLoading(false);
    }

    const updateToken = async () => {
        if (!authTokens || !authTokens.refresh) {
            logoutUser()
            return;
        }
        try {
            const response = await axios.post("http://localhost:8000/api/v1/token/refresh/", {
                refresh: authTokens?.refresh,
            });

            const updatedToken = {
                access: response.data.access,
                refresh: authTokens.refresh,
            };

            setAuthTokens(updatedToken);
            setUser(jwt_decode(response.data.access));
            localStorage.setItem("authTokens", JSON.stringify(updatedToken));
        } catch (error) {
            logoutUser()
        }

        if(loading){
            setLoading(false)
        }
    }

    useEffect(() => {
        if(loading){
            updateToken();
        }

        const fourMinutes = 1000 * 60 * 4
        const interval = setInterval(() => {
            if(authTokens){
                updateToken()
            }
        },fourMinutes)
        return () => clearInterval(interval)
    }, [authTokens]);

    return (
        <AuthContext.Provider value={{
            loginUser: loginUser,
            user: user,
            logoutUser: logoutUser,
            authTokens: authTokens
        }}>
            {loading ? <p>Loading...</p> : children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;
