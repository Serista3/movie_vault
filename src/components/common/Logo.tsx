import { Link } from "react-router";
import { cn } from "../../utils/helperClassName";

export default function Logo({ className }: { className?: string }) {
  return (
    <Link to="/">
      <h1 className={cn("logo font-semibold text-3xl text-secondary-light", className)}>MovieVault</h1>
    </Link>
  );
}
