import { Link } from "react-router";

interface MediaRowProps {
    title: string;
    children: React.ReactNode;
}

export default function MediaRow({ title, children }: MediaRowProps) {
    return (
        <div className="px-4 flex flex-col flex-none w-full max-w-300 mx-auto mb-8">
            <h2 className="font-semibold text-xl mb-4 text-white-light">{title}</h2>
            {children}
            <Link to="#" className="text-base text-right text-main-light hover:underline mt-4 inline-block">See All</Link>
        </div>
    )
}
