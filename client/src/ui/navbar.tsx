"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ROUTES, SOCIAL_LINKS } from "@/lib/navigation";

// ============================================================================
// NAVBAR COMPONENT
// ============================================================================

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const mainNavLinks = [
    { label: "THE PLAY", href: ROUTES.THE_PLAY },
    { label: "DRIP ROOM", href: ROUTES.DRIP_ROOM },
    { label: "LOCKER", href: ROUTES.LOCKER },
  ];

  const playerCardLink = { label: "PLAYER CARD", href: ROUTES.PLAYER_CARD };

  return (
    <nav
      className="fixed top-0 z-50 w-full bg-night"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="mx-auto px-4 md:px-8 lg:px-16">
        <div className="flex items-center justify-between py-6">
          {/* Logo - Left */}
          <Link
            href={SOCIAL_LINKS.DEVELOPERS}
            className="font-falsenine text-2xl font-normal uppercase tracking-wider text-white transition-opacity hover:opacity-80"
            aria-label="KAIROS Home"
          >
            KAIROS
          </Link>

          {/* Navigation Links - Center (Desktop/Tablet) */}
          <div className="absolute left-1/2 hidden -translate-x-1/2 transform items-center gap-8 md:flex">
            {mainNavLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`smooth-hover font-montserrat text-sm uppercase tracking-wider ${
                    isActive ? "text-white" : "text-white/80 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Player Card - Right (Desktop/Tablet) */}
          <Link
            href={playerCardLink.href}
            className={`smooth-hover font-montserrat hidden text-sm uppercase tracking-wider md:block ${
              pathname === playerCardLink.href
                ? "text-white"
                : "text-white/80 hover:text-white"
            }`}
          >
            {playerCardLink.label}
          </Link>

          {/* Mobile Menu Button - Right (Mobile) */}
          <button
            className="smooth-hover md:hidden"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <svg
                className="h-6 w-6 text-white"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                className="h-6 w-6 text-white"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="pb-4 md:hidden">
            <div className="flex flex-col space-y-4">
              {mainNavLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`smooth-hover font-montserrat text-sm uppercase tracking-wider ${
                      isActive ? "text-white" : "text-white/80 hover:text-white"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <Link
                href={playerCardLink.href}
                className={`smooth-hover font-montserrat text-sm uppercase tracking-wider ${
                  pathname === playerCardLink.href
                    ? "text-white"
                    : "text-white/80 hover:text-white"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {playerCardLink.label}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
