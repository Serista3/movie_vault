import { Outlet, redirect, useNavigation } from 'react-router';
import { fetchCurrentUser, fetchCreateSession, fetchDeleteSession } from '../../services/authApi';

import MainNavigation from './MainNavigation';
import FooterNavigation from './FooterNavigation';

export default function MainLayout() {
  const navigation = useNavigation();
  const isNavigation = Boolean(navigation.location);

  return (
    <>
      <MainNavigation />
      {isNavigation && <div className='loading-indicator'>Loading...</div>}
      <div className='main min-h-screen'>
        <Outlet />
      </div>
      <FooterNavigation />
    </>
  );
}

export const loader = async function({ request }: { request: Request }) {
  const url = new URL(request.url);
  const approved = url.searchParams.get('approved');
  const requestToken = url.searchParams.get('request_token');

  if (approved === 'true' && requestToken) {
    const session = await fetchCreateSession(requestToken);
    if ('session_id' in session) {
      localStorage.setItem('session_id', session.session_id);
    }

    return redirect('/'); 
  }

  const sessionId = localStorage.getItem('session_id');

  if(sessionId) {
    const userData = await fetchCurrentUser(sessionId);
    return { sessionId, userData, isAuthenticated: true };
  }
  
  return null;
}

export const action = async function({ request }: { request: Request}){
  const formData = await request.formData();
  const type = formData.get('type');
  const sessionId = localStorage.getItem('session_id');

  if(type === 'logout' && sessionId){
    fetchDeleteSession(sessionId);
    localStorage.removeItem('session_id');
  }
}
