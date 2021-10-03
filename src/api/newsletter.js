import {basePath, apiVersion} from './config';

// create a newsletter
export function suscribreNewsletter(email){
    const url = `${basePath}/${apiVersion}/suscribe-newsletter`;
    const params ={
        method: 'POST',
        headers: {
            "Content-Type": 'application/json',
        },
        body: JSON.stringify(email),
    };

    return fetch(url, params).then((response) => {
        return response.json();
    })
    .then(result => {
        return result
    })
    .catch(error => {
        return error;
    })
}