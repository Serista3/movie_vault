import { NavLink, Link } from "react-router"
import type { NavItem } from "../../types/nav";
import { cn } from "../../utils/helperClassName";

const BASE_NAV_CLASS = `p-6 bg-secondary-dark text-tertiary-light`;
const BASE_LINK_CLASS = `font-light hover:text-primary-light transition-colors`;
const activeNavLinkClass = BASE_LINK_CLASS + ' text-primary-light';

const directionClasses = {
    column: 'flex flex-col gap-4',
    row: 'flex flex-row gap-8',
}

const activeNavLink = function ({ isActive }: { isActive: boolean }): string {
  return isActive ? activeNavLinkClass : BASE_LINK_CLASS;
};

interface NavigationProps {
    items: NavItem[];
    isNavLink?: boolean;
    direction?: 'row' | 'column';
    className?: string;
}

export default function Navigation({ items, isNavLink = true, direction = 'column', className }: NavigationProps){
    return (
        <nav className={cn(BASE_NAV_CLASS, className)}>
            <ul className={cn(directionClasses[direction], "border-t border-gray-dark pt-8")}>
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
