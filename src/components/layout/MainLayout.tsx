// --- HOOKS & CUSTOM HOOKS ---
import { Outlet, redirect } from 'react-router';
import { usePageLoader } from '../../hooks/usePageLoader';

// --- SERVICES ---
import { getCurrentUser, createSession, deleteSession } from '../../services/auth.service';

// --- CONTEXT PROVIDERS ---
import ModalProvider from '../../store/ModalContext';
import GenresProvider from '../../store/GenresContext';
import ConfigProvider from '../../store/ConfigContext';

// --- COMPONENTS ---
import MainNavigation from './MainNavigation';
import FooterNavigation from './FooterNavigation';
import ProgressBar from '../common/ProgressBar';

export default function MainLayout() {
  const { progress } = usePageLoader();

  return (
    <ModalProvider>
      <GenresProvider>
        <ConfigProvider>
          {progress > 0 && (
            <ProgressBar 
              progress={progress} 
              progressBarClass="h-[3px] fixed top-0 left-0 z-70" 
              progressBarFillClass="bg-emerald-500 transition-all duration-300 ease-in" 
            />
          )}
          {/* --- MAIN NAVIGATION --- */}
          <MainNavigation />

          {/* --- MAIN CONTENT AREA --- */}
          <div className='main min-h-screen'>
            <Outlet />
          </div>

          {/* --- FOOTER NAVIGATION --- */}
          <FooterNavigation />
        </ConfigProvider>
      </GenresProvider>
    </ModalProvider>
  );
}

// --- LOADERS ---
export const loader = async function({ request }: { request: Request }) {
  const url = new URL(request.url);
  const approved = url.searchParams.get('approved');
  const requestToken = url.searchParams.get('request_token');

  // --- HANDLE AUTHENTICATION ---
  if (approved === 'true' && requestToken) {
    const session = await createSession(requestToken);
    if ('session_id' in session) {
      localStorage.setItem('session_id', session.session_id);
    }

    return redirect('/'); 
  }

  // --- CHECK FOR EXISTING SESSION ---
  const sessionId = localStorage.getItem('session_id');

  if(sessionId) {
    const userData = getCurrentUser(sessionId);
    return { sessionId, userData, isAuthenticated: true };
  }
  
  return { isAuthenticated: false };
}

// --- ACTION ---
export const action = async function({ request }: { request: Request}){
  const formData = await request.formData();
  const type = formData.get('type');

  // --- HANDLE LOGOUT ---
  const sessionId = localStorage.getItem('session_id');

  if(type === 'logout' && sessionId){
    deleteSession(sessionId);
    localStorage.removeItem('session_id');
  }
}