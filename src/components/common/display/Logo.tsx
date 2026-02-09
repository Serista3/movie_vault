// --- IMPORTS ---
import { cn } from "@/utils/helper";
import { Heading } from "@/components/common/";
import { Link } from "react-router";

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