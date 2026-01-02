import { Outlet, redirect } from 'react-router';
import { usePageLoader } from '../../hooks/usePageLoader';

import { getCurrentUser, createSession, deleteSession } from '../../services/auth.service';

import ModalProvider from '../../store/ModalContext';
import MainNavigation from './MainNavigation';
import FooterNavigation from './FooterNavigation';
import ProgressBar from '../common/progressbar';

export default function MainLayout() {
  const { progress } = usePageLoader();

  return (
    <ModalProvider>
      {progress > 0 && (
        <ProgressBar 
          progress={progress} 
          progressBarClass="h-[3px] fixed top-0 left-0 z-70" 
          progressBarFillClass="bg-emerald-500 transition-all duration-300" 
        />
      )}
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
