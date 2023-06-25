import {BrowserRouter, Route, Routes} from "react-router-dom";
import ProductDetail from "./components/ProductDetail.tsx";
import HomePage from "./components/HomePage.tsx";

export default function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/products/:category/:slug" Component={ProductDetail}/>
                </Routes>
            </BrowserRouter>
        </>

    );
}
