import {FormEvent, useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthProvider.tsx";

export default function Register() {
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [email, setEmail] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const [phoneNumber, setPhoneNumber] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [street, setStreet] = useState("");
    const [zipCode, setZipCode] = useState("");

    const navigate = useNavigate();
    const {user} = useAuth();

    useEffect(() => {
        if (user) {
            console.log(user);
            navigate("/");
        }
    }, [user]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        //password validation
        if (password !== repeatPassword) {
            setError(true);
            return;
        }
        try {
            const response = await axios.post("http://localhost:8000/api/v1/register/", {
                email,
                password,
                first_name: firstName,
                last_name: lastName,
                phone_number: phoneNumber,
                country,
                city,
                address: street,
                zip_code: zipCode,
            });
            console.log(response);
            navigate("/login");

        } catch (error) {
            setError(true);
        }
    };

    return (
        <div className={"flex justify-center items-center mt-14"}>
            <form onSubmit={handleSubmit} className={"w-1/3"}>
                <h1 className={"text-3xl font-bold mb-8"}>Register</h1>
                {error && <p className={"text-red-500 mb-4"}>Invalid credentials</p>}
                <div className={"flex flex-col mb-4"}>
                    <h2 className={"text-2xl font-bold mb-8"}>Account</h2>
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
                    <div className={"flex flex-col mb-4"}>
                        <label htmlFor={"repeatPassword"} className={"mb-2 font-semibold"}>Repeat Password</label>
                        <input
                            type="password"
                            name={"repeatPassword"}
                            id={"repeatPassword"}
                            placeholder={"Repeat Password"}
                            className={"border border-gray-500 p-2 rounded-md"}
                            value={repeatPassword}
                            onChange={(e) => setRepeatPassword(e.target.value)}
                        />
                    </div>
                </div>

                <div className={"flex flex-col mb-4"}>
                    <h2 className={"text-2xl font-bold mb-8"}>Personal Information</h2>
                    <div className={"flex flex-col mb-4"}>
                        <label htmlFor={"firstName"} className={"mb-2 font-semibold"}>First Name</label>
                        <input
                            type="text"
                            name={"firstName"}
                            id={"firstName"}
                            placeholder={"First Name"}
                            className={"border border-gray-500 p-2 rounded-md"}
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div className={"flex flex-col mb-4"}>
                        <label htmlFor={"lastName"} className={"mb-2 font-semibold"}>Last Name</label>
                        <input
                            type="text"
                            name={"lastName"}
                            id={"lastName"}
                            placeholder={"Last Name"}
                            className={"border border-gray-500 p-2 rounded-md"}
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                    <div className={"flex flex-col mb-4"}>
                        <label htmlFor={"phoneNumber"} className={"mb-2 font-semibold"}>Phone Number</label>
                        <input
                            type="text"
                            name={"phoneNumber"}
                            id={"phoneNumber"}
                            placeholder={"Phone Number"}
                            className={"border border-gray-500 p-2 rounded-md"}
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </div>
                    <div className={"flex flex-col mb-4"}>
                        <label htmlFor={"country"} className={"mb-2 font-semibold"}>Country</label>
                        <input
                            type="text"
                            name={"country"}
                            id={"country"}
                            placeholder={"Country"}
                            className={"border border-gray-500 p-2 rounded-md"}
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                        />
                    </div>
                    <div className={"flex flex-col mb-4"}>
                        <label htmlFor={"city"} className={"mb-2 font-semibold"}>City</label>
                        <input
                            type="text"
                            name={"city"}
                            id={"city"}
                            placeholder={"City"}
                            className={"border border-gray-500 p-2 rounded-md"}
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </div>
                    <div className={"flex flex-col mb-4"}>
                        <label htmlFor={"street"} className={"mb-2 font-semibold"}>Street</label>
                        <input
                            type="text"
                            name={"street"}
                            id={"street"}
                            placeholder={"Street"}
                            className={"border border-gray-500 p-2 rounded-md"}
                            value={street}
                            onChange={(e) => setStreet(e.target.value)}
                        />
                    </div>
                    <div className={"flex flex-col mb-4"}>
                        <label htmlFor={"zipCode"} className={"mb-2 font-semibold"}>Zip Code</label>
                        <input
                            type="text"
                            name={"zipCode"}
                            id={"zipCode"}
                            placeholder={"Zip Code"}
                            className={"border border-gray-500 p-2 rounded-md"}
                            value={zipCode}
                            onChange={(e) => setZipCode(e.target.value)}
                        />
                    </div>
                </div>

                <button
                    type={"submit"}
                    className={"bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300 w-full"}
                >
                    Register
                </button>
            </form>
        </div>
    );
}