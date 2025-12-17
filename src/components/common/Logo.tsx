import { Link } from "react-router";

export default function Logo({ className }: { className?: string }) {
  return (
    <Link to="/">
      <h1 className={`text-3xl font-semibold text-back-light ${ className ?? '' }`}>MovieVault</h1>
    </Link>
  );
}
