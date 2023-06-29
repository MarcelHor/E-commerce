import {FormEvent, useState} from "react";
import axios from "axios";

export default function SignUp() {
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [email, setEmail] = useState("");

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8000/api/v1/users/", {
                email,
                password,
            });
            console.log(response);
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
                    className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"}
                >
                    Login
                </button>
            </form>
        </div>
    );
}