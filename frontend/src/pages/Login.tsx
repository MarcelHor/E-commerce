import {FormEvent, useEffect, useState} from "react";
import {useAuth} from "../context/AuthProvider.tsx";
import {useNavigate} from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    const navigate = useNavigate();
    const {loginUser} = useAuth();
    const {user} = useAuth();

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            await loginUser(e);
            setError(false);
        } catch (error) {
            setError(true);
        }
    };

    return (
        <div className="flex justify-center items-center mt-24 bg-white text-black">
            <form onSubmit={handleSubmit} className="bg-white w-96 shadow-lg rounded-lg p-8">
                <h1 className="text-3xl font-bold text-black mb-6">Login</h1>
                {error &&
                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
                        <p className="font-bold">Error</p>
                        <p>Invalid credentials</p>
                    </div>
                }
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-semibold mb-2">Email:</label>
                    <input
                        type="email"
                        id="email"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block text-sm font-semibold mb-2">Password:</label>
                    <input
                        type="password"
                        id="password"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Sign In
                    </button>
                </div>
            </form>
        </div>
    );
}
