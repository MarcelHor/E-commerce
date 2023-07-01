import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import ProductDetail from "./pages/ProductDetail.tsx";
import HomePage from "./pages/HomePage.tsx";
import Header from "./components/Header.tsx";
import ProductList from "./pages/ProductList.tsx";
import CartCheckout from "./pages/CartCheckout.tsx";
import CartProvider from "./context/CartProvider.tsx";
import Register from "./pages/Register.tsx";
import Login from "./pages/Login.tsx";
import PrivateRoute from "./utils/PrivateRoute.tsx";
import AuthProvider from "./context/AuthProvider.tsx";
import Profile from "./pages/Profile.tsx";

export default function App() {
    return (
        <>
            <Router>
                <AuthProvider>
                    <CartProvider>
                        <Header/>
                        <Routes>
                            <Route path="/" element={<HomePage/>}/>
                            <Route path="/products/:category/:slug" element={<ProductDetail/>}/>
                            <Route path="/products/:category" element={<ProductList/>}/>
                            <Route path="/cart" element={<CartCheckout/>}/>
                            <Route path="/register" element={<Register/>}/>
                            <Route path="*" element={<h1>Not Found</h1>}/>
                            <Route path={"/login"} element={<Login/>}/>
                            <Route path={"/profile"} element={<PrivateRoute><Profile/></PrivateRoute>}/>
                        </Routes>
                    </CartProvider>
                </AuthProvider>
            </Router>
        </>

    );
}
