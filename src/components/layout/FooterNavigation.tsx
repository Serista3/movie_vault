import Logo from "../common/Logo";
import FooterColumn from "./FooterColumn";

const GENRES = ['action', 'comedy', 'horror', 'history', 'romance', 'other'];

export default function FooterNavigation() {
  return (
    <footer className="text-secondary-light bg-primary-light py-6 px-4 border-t border-gray-dark flex flex-col items-center gap-6">
      <Logo />
      <div className="flex justify-center w-full gap-14 border-b border-secondary-light pb-6">
        <FooterColumn title="Movies" items={GENRES} />
        <FooterColumn title="TV Shows" items={GENRES} />
        <FooterColumn title="People" items={['popular']} />
      </div>
      <div className="copy-right text-center">
        <p className="font-semibold">Credit: Data provided by TMDB</p>
        <p className="font-light text-sm">Copy right @2025 by Serista</p>
      </div>
    </footer>
  );
}
