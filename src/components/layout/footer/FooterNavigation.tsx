// --- IMPORTS ---
import { useGenres } from "@/store";
import { Logo, Paragraph } from "@/components/common";
import { FooterColumn } from "@/components/layout";

// --- CONSTANTS ---
const BASE_CLASS = "text-secondary-light bg-primary-light py-6 px-4 border-t border-gray-dark flex flex-col items-center gap-6";

export default function FooterNavigation() {
  const { tvGenres, movieGenres } = useGenres();

  return (
    <footer className={BASE_CLASS}>
      <Logo />
      {/* --- FOOTER COLUMNS --- */}
      <div className="flex justify-center w-full gap-8 border-b border-secondary-light pb-6">
        <FooterColumn title="Movies" mediaType="movie" items={movieGenres.slice(0, 6)} />
        <FooterColumn title="TV Shows" mediaType="tv" items={tvGenres.slice(0, 6)} />
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