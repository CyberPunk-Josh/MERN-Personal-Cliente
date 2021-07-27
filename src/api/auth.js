import { basePath, apiVersion} from './config';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../utils/constants';
import jwt_decode from "jwt-decode";

export function getAcessToken(){
    
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    
    if(!accessToken || accessToken === "null"){
        return null;
    }

    return willExpireToken(accessToken) ? null : accessToken;
}

export function getRefreshToken(){
    
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    
    if(!refreshToken || refreshToken === "null"){
        return null;
    }

    return willExpireToken(refreshToken) ? null : refreshToken;
}

export function refreshAccessToekn(refreshToken) {
    const url = `${basePath}/${apiVersion}/refresh-access-token`;
    const bodyObj = {
        refreshToken: refreshToken
    };

    const params = {
        method: 'POST',
        body: JSON.stringify(bodyObj),
        headers: {
            "Content-Type": "application/json"
        }
    };

    fetch(url, params).then(response => {
        if(response.status !== 200){
            return null;
        }
        return response.json();
    })
    .then(result => {
        if(!result){
            //log out user
            logout();
        } else{
            const {accessToken, refreshToken} = result;
            localStorage.setItem(ACCESS_TOKEN, accessToken);
            localStorage.setItem(REFRESH_TOKEN, refreshToken);
        }
    })
}

export function logout(){
    // remove tokens from localStorage
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
}

// funtion to veify token expiration
function willExpireToken(token){

    const seconds = 60;
    const metaToken = jwt_decode(token);
    const { exp } = metaToken;
    const now = ( Date.now() + seconds ) / 1000;
    // false if token is valid, true if token is expired
    return now > exp;
}