import { API_READ_ACCESS_TOKEN } from "./endpoints";
import { type User, type RequestToken, type CreateSession, type DeleteSession } from "../types/auth";

export const fetchCurrentUser = async function(sessionId: string){
  try {
    const res = await fetch(`https://api.themoviedb.org/3/account/22551364?session_id=${sessionId}`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + API_READ_ACCESS_TOKEN
      }
    })

    if(!res.ok)
      throw new Error('Failed to fetch current user');

    const data: User = await res.json();
    return data;

  } catch (error){
    return { isError: true, message: (error as Error).message }
  }
}

export const fetchCreateRequestToken = async function(){
  try {
    const res = await fetch(`https://api.themoviedb.org/3/authentication/token/new`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + API_READ_ACCESS_TOKEN
      }
    })
    if(!res.ok)
      throw new Error('Failed to fetch request token');

    const data: RequestToken = await res.json();
    return data;
  } catch (error) {
    return { isError: true, message: (error as Error).message }
  }
}

export const fetchCreateSession = async function(requestToken: string){
  try {
    const res = await fetch(`https://api.themoviedb.org/3/authentication/session/new`, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        Authorization: 'Bearer ' + API_READ_ACCESS_TOKEN
      },
      body: JSON.stringify({
        "request_token": requestToken
      })
    })

    if(!res.ok)
      throw new Error('Failed to create session');

    const data: CreateSession = await res.json();
    return data;

  } catch (error){
    return { isError: true, message: (error as Error).message }
  }
}

export const fetchDeleteSession = async function(session_id: string){
  try {
    const res = await fetch('https://api.themoviedb.org/3/authentication/session', {
      method: 'DELETE',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        Authorization: 'Bearer ' + API_READ_ACCESS_TOKEN
      },
      body: JSON.stringify({
        session_id: session_id
      })
    })

    if(!res.ok)
      throw new Error('Failed to delete session');

    const data: DeleteSession = await res.json();
    return data;

  } catch (error){
    return { isError: true, message: (error as Error).message }
  }
}
