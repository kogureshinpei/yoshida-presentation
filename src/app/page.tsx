import Image from "next/image";
import Link from "next/link";
import Testimonials from "@/components/Testimonials";

const STORY_BLOCKS = [
  {
    audience: "農家の方へ",
    title: "自分のやり方を継いでくれる人と、出会う場所",
    body: "農業技術は数年かけて積み上げてきたもの。シフトを登録するだけで、本気で農業を志す就農希望者があなたの農場に集まります。一緒に汗をかきながら、農業の哲学を次の世代に伝えていきましょう。",
    cta: { label: "農家として登録する", href: "/register?tab=farmer" },
    image: "https://images.unsplash.com/photo-1592419044706-39796d40f98c?w=800&q=80",
    imageAlt: "農場での作業風景",
    reverse: false,
  },
  {
    audience: "就農希望者へ",
    title: "農業を生業にしたい人へ。本物の現場で、技術と覚悟を磨こう",
    body: "農業は「体験」ではなく、人生を賭けた仕事です。全国の農家のもとで実際に手を動かし、土を知り、農家の哲学に触れる。就農への最短距離は、現場にあります。",
    cta: { label: "就農希望者として登録する", href: "/register?tab=student" },
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80",
    imageAlt: "畑で作業する人",
    reverse: true,
  },
  {
    audience: "企業の方へ",
    title: "農家と直接つながり、技術を試そう",
    body: "AI・IoT・バイオ・ドローン——最先端のAgTech技術を持つ企業と、現場の農家が直接つながれるプラットフォーム。課題を抱える農家へのアプローチを最短化し、共同開発・実証実験を加速させます。",
    cta: { label: "企業として登録する", href: "/register?tab=company" },
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    imageAlt: "農業テクノロジー",
    reverse: false,
  },
] as const;

export default function HomePage() {
  return (
    <main>
      {/* ── Hero ── */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1920&q=80"
          alt="広大な農地の風景"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-[#2D6A4F]/80 to-[#1B4332]/60" />

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#74C69D]/30 border border-[#74C69D]/60 text-[#74C69D] text-sm font-medium tracking-wider mb-6">
            農家のためのプラットフォーム
          </span>

          <h1 className="font-shippori text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight tracking-tight mb-6">
            自分のやり方を継いでくれる人と、
            <br />
            出会う場所
          </h1>

          <p className="text-white/90 text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-10">
            農家と就農希望者をつなぎ、農業の技術・哲学・誇りを次の世代へ。
            Go Go ふぁーまーは、農業の後継者育成を支えるプラットフォームです。
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link
              href="/register?tab=farmer"
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white text-[#2D6A4F] font-semibold text-sm hover:bg-[#F8F4EF] transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
            >
              農家として登録する
            </Link>
            <Link
              href="/register?tab=student"
              className="w-full sm:w-auto px-7 py-3.5 rounded-full border-2 border-white text-white font-semibold text-sm hover:bg-white/15 transition-all duration-200 hover:-translate-y-0.5"
            >
              就農希望者として登録する
            </Link>
            <Link
              href="/register?tab=company"
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#74C69D] text-white font-semibold text-sm hover:bg-[#52B788] transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
            >
              企業として登録する
            </Link>
          </div>
          <p className="mt-5 text-white/60 text-xs">
            既にアカウントをお持ちの方は{" "}
            <Link href="/login" className="text-white/90 underline hover:text-white transition-colors">
              こちらからログイン
            </Link>
          </p>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5">
          <span className="text-white/60 text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-8 bg-white/40 animate-pulse" />
        </div>
      </section>

      {/* ── Story Blocks ── */}
      <section className="py-16 md:py-24 px-4 max-w-6xl mx-auto">
        <div className="space-y-20 md:space-y-28">
          {STORY_BLOCKS.map((block) => (
            <div
              key={block.audience}
              className={`flex flex-col gap-8 md:gap-16 md:items-center ${
                block.reverse ? "md:flex-row-reverse" : "md:flex-row"
              }`}
            >
              <div className="flex-1">
                <span className="inline-block text-[#74C69D] text-sm font-semibold tracking-wide uppercase mb-3">
                  {block.audience}
                </span>
                <h2 className="font-shippori text-2xl md:text-3xl font-bold text-[#2D6A4F] leading-snug mb-4">
                  {block.title}
                </h2>
                <p className="text-gray-600 leading-relaxed text-base mb-6 max-w-md">
                  {block.body}
                </p>
                <Link
                  href={block.cta.href}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#2D6A4F] text-white text-sm font-medium hover:bg-[#1f5038] transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
                >
                  {block.cta.label}
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>

              <div className="flex-1">
                <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src={block.image}
                    alt={block.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Testimonials ── */}
      <Testimonials />

      {/* ── Final CTA ── */}
      <section className="bg-[#2D6A4F] py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-shippori text-3xl md:text-4xl font-bold text-white mb-4 leading-snug">
            農業の未来を、一緒に作ろう
          </h2>
          <p className="text-white/80 text-base leading-relaxed mb-10 max-w-xl mx-auto">
            農家も、就農希望者も、企業も。Go Go ふぁーまーはすべての参加者にとって価値ある出会いの場をつくります。
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/register"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white text-[#2D6A4F] font-semibold text-sm hover:bg-[#F8F4EF] transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
            >
              参加登録
            </Link>
            <Link
              href="/login"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#74C69D] text-white font-semibold text-sm hover:bg-[#52B788] transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
            >
              ログイン
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
