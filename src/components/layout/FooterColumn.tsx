// --- ROUTER ---
import { Link } from "react-router";

// --- HELPERS ---
import { formatUppercaseFirstLetter } from "../../utils/formatters";

// --- COMPONENTS ---
import Heading from "../common/Heading";

// --- TYPES FOR FOOTER COLUMN PROPS ---
interface FooterColumnProps {
  title: string;
  items: string[];
}

export default function FooterColumn({ title, items }: FooterColumnProps){
  return (
    <div>
      <Heading level={3} className="mb-3">{title}</Heading>
      {/* --- FOOTER COLUMN ITEMS --- */}
      <ul className="flex flex-col">
        {items.map(item => {
          return (
            <li key={item}>
              <Link to={`search?genre=${item}`}>
                {formatUppercaseFirstLetter(item)}
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}