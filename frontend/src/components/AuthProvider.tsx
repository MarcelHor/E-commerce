import {createContext, FormEvent, useState, ReactNode, useContext} from 'react';
import axios from "axios";

interface User {
    // Define the properties of a User here
    // e.g., name, email, etc.
}

interface AuthContextProps {
    loginUser: (e: FormEvent) => Promise<void>;
    user: User | null
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);


export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within a AuthProvider')
    }
    return context;
}

export const AuthProvider = ({children}: {children: ReactNode}) => {
    const [authToken, setAuthToken] = useState<string | null>( null );
    const [user, setUser] = useState<User | null>( null );

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
            console.log(response);
            setAuthToken(response.data.access);
            console.log(authToken);
            setUser(response.data.user);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <AuthContext.Provider value={{
            loginUser: loginUser,
            user: user
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;
