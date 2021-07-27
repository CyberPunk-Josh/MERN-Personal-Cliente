import React, {useState, useEffect, createContext } from 'react';
import {getAcessToken, getRefreshToken, refreshAccessToekn, logout} from '../api/auth';
import jwt_decode from "jwt-decode";


export const AuthContext = createContext();

export default function AuthProvider(props){

    const { children } = props;
    const [user, setUser] = useState({
        user: null,
        isLoading: true,
    });

    useEffect(() => {
        checkUserLogin(setUser);
    }, []);

    return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
}

function checkUserLogin(setUser){
    const accessToken = getAcessToken();

    if(!accessToken){
        const refreshToken = getRefreshToken();

        if(!refreshToken){
            logout();
            setUser({
                user: null,
                isLoading: false,
            });
        } else {
            refreshAccessToekn(refreshToken);
        }
    } else {
        setUser({
            isLoading: false,
            user: jwt_decode(accessToken)
        })
    }
}
