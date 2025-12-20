export const BASE_URL: string = import.meta.env.VITE_API_BASE_URL;
export const API_KEY: string = import.meta.env.VITE_API_KEY;
export const API_READ_ACCESS_TOKEN: string = import.meta.env.VITE_API_READ_ACCESS_TOKEN;

export const optionMethodGet = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + API_READ_ACCESS_TOKEN
    }
}

export const optionMethodPost = {
    method: 'POST',
    headers: {
        accept: 'application/json', 
        'content-type': 'application/json',
        Authorization: 'Bearer ' + API_READ_ACCESS_TOKEN
    }
}
