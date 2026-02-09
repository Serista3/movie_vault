// --- IMPORTS ---
import { Link } from "react-router";
import { formatUppercaseFirstLetter } from "@/utils/formatters";
import { Heading } from "@/components/common";
import type { MediaGenre, MediaType } from "@/@types";

// --- TYPE DEFINATIONS ---
interface FooterColumnProps {
  title: string;
  items: MediaGenre[];
  mediaType: MediaType;
}

export default function FooterColumn({ title, items, mediaType }: FooterColumnProps){
  return (
    <div>
      <Heading level={3} className="mb-3">{title}</Heading>
      {/* --- FOOTER COLUMN ITEMS --- */}
      <ul className="flex flex-col">
        {items.map(item => {
          return (
            <li key={`${item.id}-${item.name}`}>
              <Link to={`${mediaType}?with_genres=${item.id}`}>
                {formatUppercaseFirstLetter(item.name)}
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}