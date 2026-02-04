// --- COMPONENTS ---
import Logo from "../common/Logo";
import FooterColumn from "./FooterColumn";
import Paragraph from "../common/Paragraph";

// --- CONSTANT ---
const GENRES = ['action', 'comedy', 'horror', 'history', 'romance', 'other'];

const BASE_CLASS = "text-secondary-light bg-primary-light py-6 px-4 border-t border-gray-dark flex flex-col items-center gap-6";

export default function FooterNavigation() {
  return (
    <footer className={BASE_CLASS}>
      <Logo />
      {/* --- FOOTER COLUMNS --- */}
      <div className="flex justify-center w-full gap-14 border-b border-secondary-light pb-6">
        <FooterColumn title="Movies" items={GENRES} />
        <FooterColumn title="TV Shows" items={GENRES} />
        <FooterColumn title="People" items={['popular']} />
      </div>

      {/* --- COPY RIGHT --- */}
      <div className="copy-right text-center">
        <Paragraph className="font-semibold text-base">
          Credit: Data provided by TMDB
        </Paragraph>
        <Paragraph>Copy right @2025 by Serista</Paragraph>
      </div>
    </footer>
  );
}