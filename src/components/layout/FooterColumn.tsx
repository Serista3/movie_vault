// --- ROUTER ---
import { Link } from "react-router";

// --- HELPERS ---
import { formatUppercaseFirstLetter } from "../../utils/formatters";

// --- COMPONENTS ---
import Heading from "../common/Heading";

// --- TYPES ---
import type { MediaGenre, MediaType } from "../../types";

// --- TYPES FOR FOOTER COLUMN PROPS ---
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