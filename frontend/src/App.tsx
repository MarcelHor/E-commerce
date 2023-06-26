import {BrowserRouter, Route, Routes} from "react-router-dom";
import ProductDetail from "./components/ProductDetail.tsx";
import HomePage from "./components/HomePage.tsx";
import Header from "./components/Header.tsx";
import ProductList from "./components/ProductList.tsx";
import CartCheckout from "./components/CartCheckout.tsx";
import CartProvider from "./components/CartProvider.tsx";
import SignUp from "./components/SignUp.tsx";
import Login from "./components/Login.tsx";

export default function App() {
    return (
        <>
            <CartProvider>
                <BrowserRouter>
                    <Header/>
                    <Routes>
                        <Route path="/" Component={HomePage}/>
                        <Route path="/products/:category/:slug" Component={ProductDetail}/>
                        <Route path="/products/:category" Component={ProductList}/>
                        <Route path="/cart" Component={CartCheckout}/>
                        <Route path="/sign-up" Component={SignUp}/>
                        <Route path="*" element={<h1>Not Found</h1>}/>
                        <Route path={"/login"} Component={Login}/>
                    </Routes>
                </BrowserRouter>
            </CartProvider>

        </>

    );
}
