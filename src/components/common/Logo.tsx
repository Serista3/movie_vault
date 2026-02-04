// --- HOOKS ---
import { Link } from "react-router";

// --- HELPERS ---
import { cn } from "../../utils/helperClassName";

// --- COMPONENTS ---
import Heading from "./Heading";

export default function Logo({ className }: { className?: string }) {
  // --- COMPUTED CLASS NAMES ---
  const logoClass = cn("text-secondary-light", className);

  return (
    <Link to="/">
      <Heading level={1} className={logoClass}>
        MovieVault
      </Heading>
    </Link>
  );
}