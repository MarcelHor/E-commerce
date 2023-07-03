import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import ProductDetail from "./pages/ProductDetail.tsx";
import HomePage from "./pages/HomePage.tsx";
import Header from "./components/Header.tsx";
import ProductList from "./pages/ProductList.tsx";
import CartCheckout from "./pages/CartCheckout.tsx";
import CartProvider from "./context/CartProvider.tsx";


export default function App() {
    return (
        <>
            <Router>
                    <CartProvider>
                        <Header/>
                        <Routes>
                            <Route path="/" element={<HomePage/>}/>
                            <Route path="/products/:category/:slug" element={<ProductDetail/>}/>
                            <Route path="/products/:category" element={<ProductList/>}/>
                            <Route path="/cart" element={<CartCheckout/>}/>
                            <Route path="*" element={<h1>Not Found</h1>}/>
                        </Routes>
                    </CartProvider>
            </Router>
        </>

    );
}
