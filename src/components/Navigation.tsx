"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Plant, House, Buildings, NotePencil, Slideshow } from "@phosphor-icons/react";

const NAV_LINKS = [
  { href: "/for-farmers", label: "農家の方へ" },
  { href: "/for-students", label: "就農希望者へ" },
  { href: "/for-farmers#companies", label: "企業の方へ" },
  { href: "/presentation", label: "発表用" },
] as const;

const MOBILE_TABS = [
  { href: "/for-farmers", label: "農家", Icon: House },
  { href: "/for-students", label: "就農希望者", Icon: Plant },
  { href: "/for-farmers#companies", label: "企業", Icon: Buildings },
  { href: "/register", label: "登録", Icon: NotePencil },
  { href: "/presentation", label: "発表用", Icon: Slideshow },
] as const;

export default function Navigation() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    const path = href.split("#")[0];
    return pathname === path || pathname.startsWith(path + "/");
  };

  return (
    <>
      {/* Desktop top navigation */}
      <header className="hidden md:block fixed top-0 left-0 right-0 z-50 bg-[#F8F4EF]/95 backdrop-blur-sm border-b border-[#2D6A4F]/10">
        <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold text-[#2D6A4F] tracking-wide hover:opacity-80 transition-opacity duration-200"
            style={{ fontFamily: "'Shippori Mincho', serif" }}
          >
            Go Go ふぁーまー
          </Link>

          {/* Nav links + CTA */}
          <div className="flex items-center gap-7">
            {NAV_LINKS.map(({ href, label }) => {
              const active = isActive(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={[
                    "text-sm font-medium pb-0.5 transition-colors duration-200",
                    active
                      ? "text-[#2D6A4F] border-b-2 border-[#C0392B]"
                      : "text-gray-600 hover:text-[#2D6A4F]",
                  ].join(" ")}
                >
                  {label}
                </Link>
              );
            })}
            <Link
              href="/register"
              className="px-5 py-2 rounded-full bg-[#2D6A4F] text-white text-sm font-medium hover:bg-[#1f5038] transition-all duration-200 hover:shadow-md"
            >
              参加登録
            </Link>
          </div>
        </nav>
      </header>

      {/* Mobile bottom tab bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 safe-area-inset-bottom">
        <div className="grid grid-cols-5 h-16">
          {MOBILE_TABS.map(({ href, label, Icon }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                className={[
                  "relative flex flex-col items-center justify-center gap-0.5 transition-colors duration-200",
                  active ? "text-[#2D6A4F]" : "text-gray-400 hover:text-[#74C69D]",
                ].join(" ")}
              >
                {/* Red active indicator bar */}
                {active && (
                  <span className="absolute top-0 left-2 right-2 h-[2px] rounded-b-full bg-[#C0392B]" />
                )}
                <Icon size={20} weight={active ? "fill" : "regular"} />
                <span className="text-[9px] font-medium leading-none">{label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Spacer for desktop fixed header */}
      <div className="hidden md:block h-16" />
    </>
  );
}
