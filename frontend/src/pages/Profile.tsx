import useAxios from "../utils/useAxios.tsx";
import {useEffect} from "react";

export default function Profile() {
    const api = useAxios();

    const getProfile = async () => {
        try {
            const response = await api.get("/profile/");
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getProfile();
    }, []);

    return (
        <div>
            <h1>Profile</h1>
        </div>
    )

}