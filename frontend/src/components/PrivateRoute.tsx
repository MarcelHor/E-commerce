import {Navigate} from "react-router-dom";

const PrivateRoute = ({children}: any) => {
    const isAuthenticated = true;

    return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default PrivateRoute;