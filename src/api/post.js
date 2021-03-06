import { basePath, apiVersion} from './config';

export function getPostApi(limit, page) {
    const url = `${basePath}/${apiVersion}/get-post?limit=${limit}&page=${page}`;

    return fetch(url)
        .then(response => {
            return response.json();
        })
        .then(result => {
            return result
        })
        .catch(err => {
            return err
        })
}

export function deletePostApi(token, id) {
    const url = `${basePath}/${apiVersion}/delete-post/${id}`;

    const params = {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        }
    };

    return fetch(url, params)
        .then(reponse => {
            return reponse.json();
        })
        .then(result => {
            return result;
        })
        .catch(err => {
            return err;
        })
}