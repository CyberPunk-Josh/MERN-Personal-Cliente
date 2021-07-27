import  { basePath, apiVersion } from './config';

// create a user
export function signUpApi(data){
    const url = `${basePath}/${apiVersion}/sign-up`;
    const params = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    };
    
    return fetch(url, params).then((response) => {
        return response.json();
    }).then(result => {
        // console.log(result);
        // si el resultado es correcto:
        if (result.message === 'User created successfully'){
            return {
                ok: true,
                message: 'User has been created successfully!'
            }
        } else{
            return{
                ok: false,
                message: result.message
            }
        }
    })
    .catch((error) => {
        return {
            ok: false,
            message: error.message
        }
    })
}

// login
export function singInApi(data){
    const url = `${basePath}/${apiVersion}/sign-in`;

    const params = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    };
     return fetch(url, params).then(response => {
         return response.json();
     })
     .then(result => {
         return result
     })
     .catch(err => {
         return err.message
     })
}

// get all users
export function getUsersApi(token){
    const url = `${basePath}/${apiVersion}/users`;

    const params = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
        }
    };

    return fetch(url, params)
        .then(response => {
            return response.json();
        })
        .then(result => {
            return result;
        })
        .catch(err => {
            return err.message;
        });
}

// get active users
export function getActiveUsersApi(token, status){
    const url = `${basePath}/${apiVersion}/users-active?active=${status}`;

    const params = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
        }
    };

    return fetch(url, params)
        .then(response => {
            return response.json();
        })
        .then(result => {
            return result;
        })
        .catch(err => {
            return err.message;
        });
}

// upload avatar
export function uploadAvatarApi(token, avatar, userId){
    const url = `${basePath}/${apiVersion}/upload-avatar/${userId}`;

    const formData = new FormData();
    formData.append("avatar", avatar, avatar.name);

    const params = {
        method: "POST",
        body: formData,
        headers: {
            Authorization: token,
        }
    };

    return fetch(url, params)
        .then(response => {
            return response.json();
        })
        .then(result => {
            return result
        })
        .catch(err => {
            return err.message;
        })

}

// get avatar, returns the url of the image
export function getAvatarApi(avatarName){
    const url = `${basePath}/${apiVersion}/get-avatar/${avatarName}`;

    return fetch(url)
        .then(response => {
            return response.url;
        })
        .catch(err =>{
            return err.message;
        })
}

// update user
export function updateUser(token, user, userId) {
    const url = `${basePath}/${apiVersion}/update-user/${userId}`;

    const params = {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        },
        body: JSON.stringify(user)
    }

    return fetch(url, params).then(response => {
        return response.json();
    }).then(resutl => {
        return resutl;
    }).catch(err => {
        return err.message;
    })
}