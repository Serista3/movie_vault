import { Link } from "react-router";

interface MediaSectionProps {
    className?: string;
    title: string;
    path?: string;
    children: React.ReactNode;
}

export default function MediaSection({ title, path, children, className = '' }: MediaSectionProps) {
    return (
        <div className={`px-4 flex flex-col w-full ${className}`}>
            <h2 className="font-semibold text-xl mb-4">{title}</h2>
            {children}
            {path && <Link to={path} className="text-base text-right text-main-light hover:underline mt-4 inline-block">See All</Link>}
        </div>
    )
}
