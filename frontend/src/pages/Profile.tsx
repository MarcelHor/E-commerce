import useAxios from "../utils/useAxios";
import {useEffect, useState, ChangeEvent} from "react";

interface Profile {
    email: string;
    first_name: string;
    last_name: string;
    address: string;
    phone_number: string;
    zip_code: string;
    city: string;
    country: string;
    [key: string]: string;
}

export default function Profile() {
    const api = useAxios();
    const [profile, setProfile] = useState<Profile | null>(null);
    const [editProfile, setEditProfile] = useState<Profile | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [message, setMessage] = useState<string | null>(null); // Add this line

    const getProfile = async () => {
        try {
            const response = await api.get("/profile/");
            setProfile(response.data);
            setEditProfile(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const updateProfile = async () => {
        try {
            const response = await api.put("/profile/", editProfile);
            console.log(response.data);
            setIsEditing(false);
            setProfile(editProfile);
            setMessage("User updated successfully");
            setTimeout(() => {
                setMessage(null);
            }, 2000);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getProfile();
    }, []);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditProfile(prevProfile => prevProfile ? { ...prevProfile, [name]: value } : null);
    }

    const editableFields = ["address", "phone_number", "zip_code", "city", "country"];

    return (
        <div className="w-full max-w-xs mx-auto mt-10">
            <h1 className="font-bold text-3xl mb-5">Profile</h1>
            {message && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">{message}</strong>
                </div>
            )}
            {profile && (
                isEditing ? (
                    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        {Object.entries(profile).map(([key]) => (
                            editableFields.includes(key) && (
                                <div className="mb-4" key={key}>
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={key}>{key}</label>
                                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                           id={key}
                                           type="text"
                                           placeholder={key}
                                           name={key}
                                           value={editProfile ? editProfile[key] : ''}
                                           onChange={handleInputChange}
                                    />
                                </div>
                            )
                        ))}
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="button"
                                onClick={updateProfile}
                        >
                            Save
                        </button>
    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="button"
                                onClick={() => setIsEditing(false)}
                        >
                            Cancel
                        </button>
                    </div>
                ) : (
                    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        {Object.entries(profile).map(([key, value]) => (
                            <div className="mb-4" key={key}>
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={key}>{key}</label>
                                <p className="text-gray-700 text-base">{value}</p>
                            </div>
                        ))}
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="button"
                                onClick={() => setIsEditing(true)}
                        >
                            Edit
                        </button>
                    </div>
                )
            )}
        </div>
    );
}
