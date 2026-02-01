import { NavLink, Link } from "react-router"

import { cn } from "../../utils/helperClassName";
import type { NavItem } from "../../types/nav";

const BASE_NAV_CLASS = `p-6 bg-secondary-dark text-tertiary-light`;
const BASE_LINK_CLASS = `hover:text-primary-light transition-colors`;

const variantClasses = {
    primary: 'text-tertiary-light hover:text-primary-light',
    secondary: 'text-secondary-light hover:text-secondary-dark',
}

const directionClasses = {
    column: 'flex flex-col gap-4',
    row: 'flex flex-row gap-8',
}

const activeNavLink = function ({ isActive }: { isActive: boolean }): string {
  return isActive ? BASE_LINK_CLASS + ' text-primary-light' : BASE_LINK_CLASS;
};

interface NavigationProps {
    items: NavItem[];
    variant?: 'primary' | 'secondary';
    direction?: 'row' | 'column';
    isNavLink?: boolean;
    className?: string;
}

export default function Navigation({ 
    items, 
    variant = 'primary', 
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
                                <Link to={link.to} className={variantClasses[variant]}>
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
