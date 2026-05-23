import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle, Quotes } from "@phosphor-icons/react/dist/ssr";
import companiesData from "@/data/companies.json";
import companyDetailsData from "@/data/companyDetails.json";
import type { Company, CompanyDetail } from "@/types";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return companiesData.map((c) => ({ id: c.id }));
}

export default async function CompanyDetailPage({ params }: Props) {
  const { id } = await params;
  const company = (companiesData as Company[]).find((c) => c.id === id);
  const detail = (companyDetailsData as CompanyDetail[]).find((d) => d.id === id);

  if (!company || !detail) notFound();

  const initials = company.name.replace(/株式会社|合同会社|有限会社/g, "").slice(0, 2);

  return (
    <main className="min-h-screen bg-[#F8F4EF]">
      {/* Hero */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <Image
          src={detail.heroImage}
          alt={company.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/70" />

        {/* Back link */}
        <div className="absolute top-4 left-4">
          <Link
            href="/for-farmers"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/20 backdrop-blur-sm text-white text-sm font-medium hover:bg-white/30 transition-colors"
          >
            <ArrowLeft weight="bold" className="w-4 h-4" />
            企業一覧へ
          </Link>
        </div>

        {/* Hero content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <div className="max-w-4xl mx-auto flex items-end gap-4">
            <div
              className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center text-white font-bold text-lg md:text-2xl flex-shrink-0 shadow-lg select-none"
              style={{ backgroundColor: company.logoColor }}
            >
              {initials}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-semibold">
                  {company.category}
                </span>
                <span className="text-white/70 text-xs">設立 {company.established}年</span>
              </div>
              <h1 className="font-shippori text-2xl md:text-3xl font-bold text-white leading-snug">
                {company.name}
              </h1>
              <p className="text-white/85 text-sm md:text-base mt-0.5">{company.tagline}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-10">

        {/* Stats bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {detail.stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-2xl p-4 text-center shadow-sm border border-green-50"
            >
              <div className="text-2xl md:text-3xl font-bold text-[#2D6A4F] leading-none mb-1">
                {stat.value}
              </div>
              <div className="text-xs font-semibold text-gray-700 mb-0.5">{stat.label}</div>
              <div className="text-[10px] text-gray-400">{stat.note}</div>
            </div>
          ))}
        </div>

        {/* Vision */}
        <div className="bg-[#1B4332] rounded-2xl px-6 py-5 flex items-start gap-3">
          <Quotes weight="fill" className="w-6 h-6 text-[#74C69D] flex-shrink-0 mt-0.5" />
          <p className="text-white/90 text-sm md:text-base leading-relaxed font-medium italic">
            {detail.vision}
          </p>
        </div>

        {/* About */}
        <section>
          <h2 className="font-shippori text-xl font-bold text-gray-900 mb-3">企業紹介</h2>
          <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm">
            <p className="text-gray-700 text-sm md:text-base leading-relaxed">{detail.about}</p>
          </div>
        </section>

        {/* Products */}
        <section>
          <h2 className="font-shippori text-xl font-bold text-gray-900 mb-4">製品・サービス</h2>
          <div className="space-y-4">
            {detail.products.map((product) => (
              <div key={product.name} className="bg-white rounded-2xl p-5 md:p-6 shadow-sm">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <span
                      className="inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full mb-2"
                      style={{ backgroundColor: `${company.logoColor}20`, color: company.logoColor }}
                    >
                      {product.badge}
                    </span>
                    <h3 className="font-bold text-gray-900 text-base md:text-lg">{product.name}</h3>
                  </div>
                  <span className="text-xs text-gray-500 text-right flex-shrink-0 bg-gray-50 px-3 py-1.5 rounded-lg">
                    {product.price}
                  </span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{product.description}</p>
                <ul className="space-y-1.5">
                  {product.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle
                        weight="fill"
                        className="w-4 h-4 flex-shrink-0 mt-0.5"
                        style={{ color: company.logoColor }}
                      />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Case study */}
        <section>
          <h2 className="font-shippori text-xl font-bold text-gray-900 mb-4">導入事例</h2>
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
            <div className="px-5 md:px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <div>
                <p className="font-semibold text-gray-900 text-sm md:text-base">{detail.caseStudy.title}</p>
                <p className="text-xs text-gray-400 mt-0.5">{detail.caseStudy.area}</p>
              </div>
            </div>
            <div className="px-5 md:px-6 py-5">
              <p className="text-gray-700 text-sm leading-relaxed mb-5 italic">
                {detail.caseStudy.body}
              </p>
              <div className="rounded-xl p-4" style={{ backgroundColor: `${company.logoColor}10` }}>
                <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: company.logoColor }}>
                  導入効果
                </p>
                <p className="text-sm font-semibold text-gray-800">{detail.caseStudy.result}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Technologies & Target crops */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <section className="bg-white rounded-2xl p-5 shadow-sm">
            <h2 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wide">提供技術</h2>
            <div className="flex flex-wrap gap-2">
              {company.technologies.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center px-3 py-1.5 rounded-full text-sm bg-gray-100 text-gray-700 font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>
          <section className="bg-white rounded-2xl p-5 shadow-sm">
            <h2 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wide">対象作物</h2>
            <div className="flex flex-wrap gap-2">
              {company.targetCrops.map((crop) => (
                <span
                  key={crop}
                  className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium"
                  style={{ backgroundColor: `${company.logoColor}18`, color: company.logoColor }}
                >
                  {crop}
                </span>
              ))}
            </div>
          </section>
        </div>

        {/* CTA */}
        <div className="bg-[#2D6A4F] rounded-2xl px-6 py-8 text-center">
          <h2 className="font-shippori text-xl font-bold text-white mb-2">
            {company.name}に問い合わせる
          </h2>
          <p className="text-white/75 text-sm mb-5">
            導入のご相談・デモのご依頼はこちらから
          </p>
          <Link
            href="/register"
            className="inline-block px-8 py-3 rounded-xl bg-white text-[#2D6A4F] font-bold text-sm hover:bg-green-50 transition-colors duration-200"
          >
            お問い合わせフォームへ
          </Link>
        </div>
      </div>
    </main>
  );
}
