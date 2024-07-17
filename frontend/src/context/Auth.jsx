

import {createContext, useState} from 'react';


export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isLoggedIn , setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState(null);
    const [name , setName] = useState("");
    const [message, setMessage] = useState("");

    const login = (userId, name) => {
        localStorage.setItem("token", userId);
        setIsLoggedIn(true);
        setUserId(userId);
        setName(name);
    }

    const logout = () => {
        setIsLoggedIn(false);
        setUserId(null);
        setName("");
    }


    return(
        <AuthContext.Provider value={{name, userId,isLoggedIn, setIsLoggedIn, login, logout, message, setMessage}} >
            {children}
        </AuthContext.Provider>
    );
}