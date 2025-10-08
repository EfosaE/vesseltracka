"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type NavLinkProps = React.PropsWithChildren<{
  href: string;
  exact?: boolean;
  className?: string;
  onClick?: () => void;
}>;

export default function NavLink({ href, exact, className = "", onClick, children }: NavLinkProps) {
  const pathname = usePathname() || "/";

  // normalize function to remove trailing slashes (except for root)
  const normalize = (p: string) => {
    if (!p) return "/";
    if (p === "/") return "/";
    return p.endsWith("/") ? p.slice(0, -1) : p;
  };

  const current = normalize(pathname);
  const target = normalize(href);

  let isActive = false;
  if (exact) {
    isActive = current === target;
  } else {
    if (target === "/") {
      // only active when at root exactly
      isActive = current === "/";
    } else {
      isActive = current === target || current.startsWith(target + "/");
    }
  }

  const activeCls = isActive ? "bg-white/10 font-semibold" : "hover:bg-primary-light";

  return (
    <Link
      href={href}
      className={`${className} ${activeCls}`}
      aria-current={isActive ? "page" : undefined}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
