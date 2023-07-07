import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import ProductDetailPage from "./pages/ProductDetailPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import Header from "./Components/Header.tsx";
import ProductListPage from "./pages/ProductListPage.tsx";
import CartCheckoutPage from "./pages/CartCheckoutPage.tsx";
import CartContext from "./context/CartContext.tsx";
import Footer from "./Components/Footer.tsx";


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
                                    <Route path="/products/:category/:subcategory/product/:slug" element={<ProductDetailPage/>}/>
                                    <Route path="/products/:category/product/:slug" element={<ProductDetailPage/>}/>
                                    <Route path="/products/:category/:subcategory" element={<ProductListPage/>}/>
                                    <Route path="/products/:category" element={<ProductListPage/>}/>
                                    <Route path="/cart" element={<CartCheckoutPage/>}/>
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