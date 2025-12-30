import { Link } from "react-router";

export default function Logo({ className = '' }: { className?: string }) {
  return (
    <Link to="/">
      <h1 className={`logo font-semibold text-3xl text-back-light ${className}`}>MovieVault</h1>
    </Link>
  );
}
