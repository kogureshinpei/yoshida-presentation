import Image from "next/image";
import Link from "next/link";
import Testimonials from "@/components/Testimonials";

const STORY_BLOCKS = [
  {
    audience: "学生・社会人へ",
    title: "週1日から、農業を体験しよう",
    body: "授業やお仕事の合間に、大地と向き合う時間を。収穫の達成感、農家さんとの対話、自分の手で育てる喜び——都会では得られない体験が、ここにあります。まずは週1日、気軽に始めてみませんか。",
    cta: { label: "農家のシフトを探す", href: "/for-students" },
    image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=800&q=80",
    imageAlt: "畑で作業する人",
    reverse: false,
  },
  {
    audience: "農家の方へ",
    title: "即戦力の農業仲間を見つけよう",
    body: "繁忙期の人手不足、もう悩まなくていい。シフトを登録するだけで、農業に興味ある学生・社会人があなたの農場に集まります。受け入れ実績を積み重ねて、信頼の農場ブランドを育てましょう。",
    cta: { label: "参加登録する", href: "/register" },
    image: "https://images.unsplash.com/photo-1592419044706-39796d40f98c?w=800&q=80",
    imageAlt: "農場での作業風景",
    reverse: true,
  },
  {
    audience: "企業の方へ",
    title: "農家と直接つながり、技術を試そう",
    body: "AI・IoT・バイオ・ドローン——最先端のAgTech技術を持つ企業と、現場の農家が直接つながれるプラットフォーム。課題を抱える農家へのアプローチを最短化し、共同開発・実証実験を加速させます。",
    cta: { label: "AgTech企業を見る", href: "/for-farmers" },
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
        {/* Background image */}
        <Image
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1920&q=80"
          alt="広大な農地の風景"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#2D6A4F]/80 to-[#1B4332]/60" />

        {/* Content */}
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          {/* Pill tag */}
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#74C69D]/30 border border-[#74C69D]/60 text-[#74C69D] text-sm font-medium tracking-wider mb-6">
            農業 × 人 × テクノロジー
          </span>

          {/* Main heading */}
          <h1 className="font-shippori text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight tracking-tight mb-6">
            大地とつながる、
            <br />
            新しい働き方
          </h1>

          {/* Subtitle */}
          <p className="text-white/90 text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-10">
            学生・社会人の農業体験から、農家の人手確保、AgTech企業と農家のマッチングまで。
            ミノリが農業に関わるすべての人をつなぎます。
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link
              href="/for-students"
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white text-[#2D6A4F] font-semibold text-sm hover:bg-[#F8F4EF] transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
            >
              農家のシフトを探す
            </Link>
            <Link
              href="/for-farmers"
              className="w-full sm:w-auto px-7 py-3.5 rounded-full border-2 border-white text-white font-semibold text-sm hover:bg-white/15 transition-all duration-200 hover:-translate-y-0.5"
            >
              企業技術を探す
            </Link>
            <Link
              href="/register"
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#74C69D] text-white font-semibold text-sm hover:bg-[#52B788] transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
            >
              参加登録
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
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
              {/* Text half */}
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

              {/* Image half */}
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
            学生も、農家も、企業も。ミノリはすべての参加者にとって価値ある出会いの場をつくります。
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/for-students"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white text-[#2D6A4F] font-semibold text-sm hover:bg-[#F8F4EF] transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
            >
              農家のシフトを探す
            </Link>
            <Link
              href="/register"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#74C69D] text-white font-semibold text-sm hover:bg-[#52B788] transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
            >
              参加登録
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
