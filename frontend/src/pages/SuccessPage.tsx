import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle} from "@fortawesome/free-solid-svg-icons";


const SuccessPage = () => {
    return (
        <div className="flex flex-col items-center justify-center p-6">
            <div className="flex flex-col items-center text-center bg-white shadow-md w-full md:w-4/5 lg:w-3/5 rounded-lg p-8">
                <h2 className="text-2xl font-bold mb-6">Thank you for your order!</h2>
                <FontAwesomeIcon icon={faCheckCircle} size="10x" className="text-green-500 mb-6"/>
                <p className="text-lg mb-6">Your order has been placed successfully.</p>
                <p className="text-lg mb-6">You will receive an email confirmation shortly.</p>
                <Link to="/">
                    <button className="bg-green-500 text-white font-bold w-40 h-10 hover:bg-green-700 rounded-lg">
                        Continue Shopping
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default SuccessPage;