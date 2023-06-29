import {Navigate} from "react-router-dom";
import {useAuth} from "./AuthProvider.tsx";

const PrivateRoute = ({children}: any) => {
    const {user} = useAuth();


    return user ? children : <Navigate to="/login" replace />;
}

export default PrivateRoute;