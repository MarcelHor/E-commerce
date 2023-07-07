import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import ProductDetail from "./pages/ProductDetail.tsx";
import HomePage from "./pages/HomePage.tsx";
import Header from "./components/Header.tsx";
import ProductList from "./pages/ProductList.tsx";
import CartCheckout from "./pages/CartCheckout.tsx";
import CartContext from "./context/CartContext.tsx";
import Footer from "./components/Footer.tsx";


export default function App() {
    return (
        <>
            <Router>
                <CartContext>
                    <div className="flex flex-col min-h-screen">
                        <Header/>
                            <main className="flex-grow">
                                <Routes>
                                    <Route path="/" element={<HomePage/>}/>
                                    <Route path="/products/:category/:subcategory/product/:slug" element={<ProductDetail/>}/>
                                    <Route path="/products/:category/product/:slug" element={<ProductDetail/>}/>
                                    <Route path="/products/:category/:subcategory" element={<ProductList/>}/>
                                    <Route path="/products/:category" element={<ProductList/>}/>
                                    <Route path="/cart" element={<CartCheckout/>}/>
                                    <Route path="*" element={<h1>Not Found</h1>}/>
                                </Routes>
                            </main>
                        <Footer/>
                    </div>
                </CartContext>
            </Router>
        </>
    );
}