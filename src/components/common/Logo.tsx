import { Link } from "react-router";
import { cn } from "../../utils/helperClassName";

import Heading from "./Heading";

export default function Logo({ className }: { className?: string }) {
  return (
    <Link to="/">
      <Heading level={1} className={cn("text-secondary-light", className)}>
        MovieVault
      </Heading>
    </Link>
  );
}
