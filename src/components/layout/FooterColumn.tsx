import { Link } from "react-router";

import { formatUppercaseFirstLetter } from "../../utils/formatters";

interface FooterColumnProps {
  title: string;
  items: string[];
}

export default function FooterColumn({ title, items }: FooterColumnProps){
  return (
    <div>
      <h3 className="text-base font-semibold mb-3">{title}</h3>
      <ul className="flex flex-col">
        {items.map(item => {
          return (
            <li key={item}>
              <Link to={`search?genre=${item}`}>{formatUppercaseFirstLetter(item)}</Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
