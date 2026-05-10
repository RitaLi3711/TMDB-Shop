import type { ReactNode } from 'react';
import { matchPath, NavLink, useLocation } from 'react-router-dom';

type LinkProps = {
  children: ReactNode;
  to: string;
  match?: string[];
  replace?: boolean;
};

export const Link = ({ children, to, match = [], replace = false }: LinkProps) => {
  const { pathname } = useLocation();

  const matched = match.some((pattern) =>
    matchPath({ path: pattern, end: false }, pathname)
  );

  return (
    <NavLink
      to={to}
      replace={replace}
      className={({ isActive }) =>
        `px-4 py-2 rounded-md transition-all duration-200 border ${
          isActive || matched
            ? 'bg-[#e6aace] text-[#0d1821] border-[#e6aace] shadow-lg scale-105'
            : 'bg-[#344966] text-[#f0f4ef] border-[#344966] hover:bg-[#2a3b52] hover:text-[#f0f4ef] hover:border-[#bfcc94]'
        }`
      }
      end
    >
      {children}
    </NavLink>
  );
};