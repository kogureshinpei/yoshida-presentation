"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Plant, House, Buildings, NotePencil, MapTrifold, UserCircle } from "@phosphor-icons/react";
import { ProfilePanel, type PanelType } from "./ProfilePanel";

type NavLink = {
  href: string;
  label: string;
  profileType?: PanelType;
};

const NAV_LINKS: NavLink[] = [
  { href: "/top", label: "Top" },
  { href: "/for-farmers", label: "農家の方へ", profileType: "farmer" },
  { href: "/for-students", label: "就農希望者へ", profileType: "student" },
  { href: "/companies", label: "企業一覧" },
];

const MOBILE_TABS = [
  { href: "/top", label: "Top", Icon: MapTrifold },
  { href: "/for-farmers", label: "農家", Icon: House, profileType: "farmer" as PanelType },
  { href: "/for-students", label: "就農希望者", Icon: Plant, profileType: "student" as PanelType },
  { href: "/companies", label: "企業一覧", Icon: Buildings },
  { href: "/register", label: "登録", Icon: NotePencil },
] as const;

export default function Navigation() {
  const pathname = usePathname();
  const [openPanel, setOpenPanel] = useState<PanelType | null>(null);

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
          <div className="flex items-center gap-6">
            {NAV_LINKS.map(({ href, label, profileType }) => {
              const active = isActive(href);
              return (
                <span key={href} className="flex items-center gap-1">
                  <Link
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
                  {profileType && (
                    <button
                      type="button"
                      onClick={() => setOpenPanel(profileType)}
                      className="text-gray-400 hover:text-[#2D6A4F] transition-colors rounded-full hover:bg-[#2D6A4F]/8 p-0.5"
                      aria-label={`${label}プロフィール`}
                      title="プロフィール・メッセージ"
                    >
                      <UserCircle size={17} weight="fill" />
                    </button>
                  )}
                </span>
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
          {MOBILE_TABS.map(({ href, label, Icon, ...rest }) => {
            const profileType = (rest as { profileType?: PanelType }).profileType;
            const active = isActive(href);
            return (
              <div key={href} className="relative flex flex-col items-center justify-center">
                <Link
                  href={href}
                  className={[
                    "relative flex flex-col items-center justify-center gap-0.5 w-full h-full transition-colors duration-200",
                    active ? "text-[#2D6A4F]" : "text-gray-400 hover:text-[#74C69D]",
                  ].join(" ")}
                >
                  {active && (
                    <span className="absolute top-0 left-2 right-2 h-[2px] rounded-b-full bg-[#C0392B]" />
                  )}
                  <Icon size={20} weight={active ? "fill" : "regular"} />
                  <span className="text-[9px] font-medium leading-none">{label}</span>
                </Link>
                {profileType && (
                  <button
                    type="button"
                    onClick={() => setOpenPanel(profileType)}
                    className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#2D6A4F]/15 flex items-center justify-center"
                    aria-label="プロフィール"
                  >
                    <UserCircle size={10} weight="fill" className="text-[#2D6A4F]" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </nav>

      {/* Spacer for desktop fixed header */}
      <div className="hidden md:block h-16" />

      {/* Profile panel */}
      {openPanel && (
        <ProfilePanel type={openPanel} onClose={() => setOpenPanel(null)} />
      )}
    </>
  );
}
