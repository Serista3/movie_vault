// --- IMPORTS ---
import { Outlet, redirect } from 'react-router';
import { usePageLoader } from '@/hooks';
import { getCurrentUser, createSession, deleteSession } from '@/services';
import { ModalProvider, GenresProvider, ConfigProvider }from '@/store';
import { MainNavigation, FooterNavigation } from '@/components/layout';
import { Progressbar } from '@/components/common';

export default function MainLayout() {
  const { progress } = usePageLoader();

  return (
    <ModalProvider>
      <GenresProvider>
        <ConfigProvider>
          {progress > 0 && (
            <Progressbar 
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