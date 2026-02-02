import { NavLink, Link } from "react-router"

import { cn } from "../../utils/helperClassName";
import type { NavItem } from "../../types/nav";

const BASE_NAV_CLASS = `p-6 text-secondary-light`;
export const BASE_LINK_CLASS = `hover:text-secondary-dark transition-colors`;

const directionClasses = {
    column: 'flex flex-col gap-4',
    row: 'flex flex-row gap-8',
}

const activeNavLink = function ({ isActive }: { isActive: boolean }): string {
  return isActive ? BASE_LINK_CLASS + ' text-secondary-dark font-semibold' : BASE_LINK_CLASS;
};

interface NavigationProps {
    items: NavItem[];
    direction?: 'row' | 'column';
    isNavLink?: boolean;
    className?: string;
}

export default function Navigation({ 
    items, 
    isNavLink = true, 
    direction = 'column', 
    className 
}: NavigationProps){

    return (
        <nav className={cn(BASE_NAV_CLASS, className)}>
            <ul className={cn(directionClasses[direction])}>
                {items.map(link => {
                    return (
                        <li key={link.to}>
                            {isNavLink ? (
                                <NavLink to={link.to} end={link.end} className={activeNavLink}>
                                    {link.label}
                                </NavLink>
                            ) : (
                                <Link to={link.to} className={BASE_LINK_CLASS}>
                                    {link.label}
                                </Link>
                            )}
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}
