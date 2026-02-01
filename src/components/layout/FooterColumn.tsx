import { Link } from "react-router";

import { formatUppercaseFirstLetter } from "../../utils/formatters";
import Heading from "../common/Heading";

interface FooterColumnProps {
  title: string;
  items: string[];
}

export default function FooterColumn({ title, items }: FooterColumnProps){
  return (
    <div>
      <Heading level={3} className="mb-3">{title}</Heading>
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
