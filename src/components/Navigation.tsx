"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Plant, House, Buildings, NotePencil } from "@phosphor-icons/react";

const NAV_LINKS = [
  { href: "/for-students", label: "学生の方へ" },
  { href: "/for-farmers", label: "農家の方へ" },
  { href: "/for-farmers#companies", label: "企業の方へ" },
] as const;

const MOBILE_TABS = [
  { href: "/for-students", label: "学生", Icon: Plant },
  { href: "/for-farmers", label: "農家", Icon: House },
  { href: "/for-farmers#companies", label: "企業", Icon: Buildings },
  { href: "/register", label: "登録", Icon: NotePencil },
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
            ミノリ
          </Link>

          {/* Nav links + CTA */}
          <div className="flex items-center gap-8">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={[
                  "text-sm font-medium transition-colors duration-200",
                  isActive(href)
                    ? "text-[#2D6A4F] border-b-2 border-[#2D6A4F] pb-0.5"
                    : "text-gray-600 hover:text-[#2D6A4F]",
                ].join(" ")}
              >
                {label}
              </Link>
            ))}
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
        <div className="grid grid-cols-4 h-16">
          {MOBILE_TABS.map(({ href, label, Icon }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                className={[
                  "flex flex-col items-center justify-center gap-1 transition-colors duration-200",
                  active ? "text-[#2D6A4F]" : "text-gray-400 hover:text-[#74C69D]",
                ].join(" ")}
              >
                <Icon
                  size={22}
                  weight={active ? "fill" : "regular"}
                />
                <span className="text-[10px] font-medium leading-none">{label}</span>
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
