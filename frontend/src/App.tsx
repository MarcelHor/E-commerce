import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import ProductDetail from "./components/ProductDetail.tsx";
import HomePage from "./pages/HomePage.tsx";
import Header from "./components/Header.tsx";
import ProductList from "./components/ProductList.tsx";
import CartCheckout from "./pages/CartCheckout.tsx";
import CartProvider from "./context/CartProvider.tsx";
import SignUp from "./pages/SignUp.tsx";
import Login from "./pages/Login.tsx";
import PrivateRoute from "./components/PrivateRoute.tsx";
import AuthProvider from "./context/AuthProvider.tsx";

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
                            <Route path="/sign-up" element={<SignUp/>}/>
                            <Route path="*" element={<h1>Not Found</h1>}/>
                            <Route path={"/login"} element={<Login/>}/>
                            <Route path={"/private"} element={<PrivateRoute><h1>Private</h1></PrivateRoute>}/>
                        </Routes>
                    </CartProvider>
                </AuthProvider>
            </Router>
        </>

    );
}
