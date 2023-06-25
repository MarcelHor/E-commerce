import {BrowserRouter, Route, Routes} from "react-router-dom";
import ProductDetail from "./components/ProductDetail.tsx";
import HomePage from "./components/HomePage.tsx";
import Header from "./components/Header.tsx";
import ProductList from "./components/ProductList.tsx";
import CartCheckout from "./components/CartCheckout.tsx";

export default function App() {
    return (
        <>
            <BrowserRouter>
                <Header/>
                <Routes>
                    <Route path="/" Component={HomePage}/>
                    <Route path="/products/:category/:slug" Component={ProductDetail}/>
                    <Route path="/products/:category" Component={ProductList}/>
                    <Route path="/cart" Component={CartCheckout}/>
                </Routes>
            </BrowserRouter>
        </>

    );
}
