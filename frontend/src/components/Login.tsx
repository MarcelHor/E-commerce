import {FormEvent, useState} from "react";
import {useAuth} from "./AuthProvider.tsx";


export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    const {loginUser} = useAuth();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            await loginUser(e);
        } catch (error) {
            setError(true);
        }
    };


    return (
        <div className={"flex justify-center items-center mt-14"}>
            <form onSubmit={handleSubmit} className={"w-1/3"}>
                <h1 className={"text-3xl font-bold mb-8"}>Login</h1>
                {error && <p className={"text-red-500 mb-4"}>Invalid credentials</p>}
                <div className={"flex flex-col mb-4"}>
                    <div className={"flex flex-col mb-4"}>
                        <label htmlFor={"email"} className={"mb-2 font-semibold"}>Email</label>
                        <input
                            type="email"
                            name={"email"}
                            id={"email"}
                            placeholder={"Email"}
                            className={"border border-gray-500 p-2 rounded-md"}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </div>
                <div className={"flex flex-col mb-4"}>
                    <label htmlFor={"password"} className={"mb-2 font-semibold"}>Password</label>
                    <input
                        type="password"
                        name={"password"}
                        id={"password"}
                        placeholder={"Password"}
                        className={"border border-gray-500 p-2 rounded-md"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button
                    type={"submit"}
                    className={"bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"}
                >
                    Login
                </button>
            </form>
        </div>
    );
}