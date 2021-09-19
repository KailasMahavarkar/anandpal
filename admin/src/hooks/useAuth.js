import React, { useState, useContext } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { url } from "../helper";

const authContext = React.createContext();

const refresh = async (refreshToken) => {
	console.log("Refreshing token!");
	const newAccessToken = await axios.post(
		"http://localhost:1000/auth/refreshtoken",
		{ token: refreshToken }
	);
	Cookies.set("accessToken", newAccessToken);
};

const hasAccess = async (accessToken, refreshToken) => {
	if (!refreshToken) return null;

	if (accessToken === undefined) {
		accessToken = await refresh(refreshToken);
		return accessToken;
	}
	return accessToken;
};

const useAuth = () => {
	let [authed, setAuthed] = useState(false);

    const verifyAccess = async (accessToken) => {
        const loginResult = await axios.post(
            url("/auth/verify"), 
            {
                headers: {
                    'Authorization': "Bearer " + accessToken
                }
            }
        );

        if (loginResult.status === 200 && loginResult.data.msg === 'success') {
            console.log("success login", loginResult);
            Cookies.set("accessToken", loginResult.data.accessToken);
            Cookies.set("refreshToken", loginResult.data.refreshToken);
            return true
        }
        
        return false

    }

	const login = async () => {

		let accessToken = Cookies.get("accessToken");
		const accessResult = verifyAccess(accessToken);

        if (accessResult){
            setAuthed(true)
        }else{
            setAuthed(false)
        }

	};

	const logout = () => {
		return new Promise((res) => {
			setAuthed(false);
			res();
		});
	};

	return {
		authed,
		login,
		logout,
	};
};
const AuthProvider = ({ children }) => {
	const auth = useAuth();

	return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

const AuthConsumer = () => {
	return useContext(authContext);
};

export { useAuth, AuthProvider, AuthConsumer };
