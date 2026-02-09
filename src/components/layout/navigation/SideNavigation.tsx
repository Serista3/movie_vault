// --- IMPORTS ---
import { cn } from '@/utils/helper';
import { useCloseOnNavigate } from '@/hooks';
import { LINKS } from './MainNavigation';
import { Auth }from '@/features/auth';
import { Navigation } from '@/components/layout';

// --- TYPE DEFINATIONS ---
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