// --- HELPERS ---
import { cn } from '../../utils/helperClassName';

// --- HOOKS & CUSTOM HOOKS ---
import { useCloseOnNavigate } from '../../hooks/useCloseOnNavigate';

// --- CONSTANTS ---
import { LINKS } from './MainNavigation';

// --- COMPONENTS ---
import Auth from '../Auth';
import Navigation from './Navigation';

// --- TYPES FOR SIDE NAVIGATION PROPS ---
interface SideNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SideNavigation({ isOpen, onClose }: SideNavigationProps) {
  useCloseOnNavigate(onClose);

  // --- CLICK HANDLER TO CLOSE SIDE NAV WHEN CLICKING OUTSIDE ---
  const handleClick = function(e: React.MouseEvent<HTMLDivElement> ): void {
    if(!(e.target === e.currentTarget)) return;

    onClose();
  }

  // --- COMPUTED CLASS NAMES ---
  const overlayClass = cn(
    "fixed bg-[rgba(0,0,0,0.75)] h-screen w-full z-20",
    isOpen ? "visible" : "invisible"
  );

  const asideClass = cn(
    "w-3/4 bg-primary-light h-screen fixed z-25 transition-all",
    isOpen ? "translate-x-0" : "-translate-x-full"
  );

  return (
    <div className={overlayClass} onClick={handleClick}>
      {/* --- SIDE NAVIGATION --- */}
      <aside className={asideClass}>
        <Auth className='border-b border-gray-dark pb-6' />
        <Navigation items={LINKS} />
      </aside>
    </div>
  );
};