import { Outlet, redirect } from 'react-router';
import { getCurrentUser, createSession, deleteSession } from '../../services/auth.service';

import ModalProvider from '../../store/ModalContext';
import MainNavigation from './MainNavigation';
import FooterNavigation from './FooterNavigation';

export default function MainLayout() {
  return (
    <ModalProvider>
      <MainNavigation />
      <div className='main min-h-screen'>
        <Outlet />
      </div>
      <FooterNavigation />
    </ModalProvider>
  );
}

export const loader = async function({ request }: { request: Request }) {
  const url = new URL(request.url);
  const approved = url.searchParams.get('approved');
  const requestToken = url.searchParams.get('request_token');

  if (approved === 'true' && requestToken) {
    const session = await createSession(requestToken);
    if ('session_id' in session) {
      localStorage.setItem('session_id', session.session_id);
    }

    return redirect('/'); 
  }

  const sessionId = localStorage.getItem('session_id');

  if(sessionId) {
    const userData = getCurrentUser(sessionId);
    return { sessionId, userData, isAuthenticated: true };
  }
  
  return { isAuthenticated: false };
}

export const action = async function({ request }: { request: Request}){
  const formData = await request.formData();
  const type = formData.get('type');
  const sessionId = localStorage.getItem('session_id');

  if(type === 'logout' && sessionId){
    deleteSession(sessionId);
    localStorage.removeItem('session_id');
  }
}
