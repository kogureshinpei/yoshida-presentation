import { Quotes } from "@phosphor-icons/react/dist/ssr";

type TestimonialData = {
  id: string;
  role: "student" | "farmer" | "company";
  name: string;
  affiliation: string;
  comment: string;
  avatarColor: string;
  avatarInitial: string;
};

const TESTIMONIALS: TestimonialData[] = [
  {
    id: "1",
    role: "student",
    name: "田中 優花",
    affiliation: "大学3年生",
    comment:
      "農家さんの温かさに感動。シフト申込から当日まですべてスムーズでした。収穫の達成感は都会では絶対に味わえない体験です。",
    avatarColor: "#74C69D",
    avatarInitial: "田",
  },
  {
    id: "2",
    role: "farmer",
    name: "佐藤 健一",
    affiliation: "佐藤農園",
    comment:
      "若い世代と一緒に働くことで農業に新しい風が入ってきました。学生の視点が私たちにとっても大きな刺激になっています。",
    avatarColor: "#2D6A4F",
    avatarInitial: "佐",
  },
  {
    id: "3",
    role: "company",
    name: "鈴木 部長",
    affiliation: "AgriAI株式会社",
    comment:
      "ミノリ経由で導入農家数が3倍に。農家との対話が深まり、製品改善サイクルが大幅に短縮されました。",
    avatarColor: "#1B4332",
    avatarInitial: "鈴",
  },
];

const ROLE_LABEL: Record<TestimonialData["role"], string> = {
  student: "学生",
  farmer: "農家",
  company: "企業",
};

const ROLE_BADGE_STYLE: Record<
  TestimonialData["role"],
  { bg: string; text: string }
> = {
  student: { bg: "bg-[#74C69D]/20", text: "text-[#2D6A4F]" },
  farmer: { bg: "bg-[#2D6A4F]/10", text: "text-[#2D6A4F]" },
  company: { bg: "bg-amber-100", text: "text-amber-700" },
};

export default function Testimonials() {
  return (
    <section className="py-20 px-4 bg-[#F8F4EF]">
      <div className="max-w-5xl mx-auto">
        {/* Section heading */}
        <div className="text-center mb-12">
          <h2
            className="text-3xl md:text-4xl font-bold text-[#2D6A4F] mb-3"
            style={{ fontFamily: "'Shippori Mincho', serif" }}
          >
            ミノリで農業が変わった
          </h2>
          <p className="text-gray-500 text-base">
            学生・農家・企業、三者それぞれの声
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => {
            const badge = ROLE_BADGE_STYLE[t.role];
            return (
              <div
                key={t.id}
                className="bg-white rounded-2xl p-6 flex flex-col gap-4 border border-gray-100 hover:shadow-md transition-shadow duration-200"
              >
                {/* Quote icon */}
                <Quotes
                  size={28}
                  weight="fill"
                  className="text-[#74C69D] opacity-60"
                />

                {/* Role badge */}
                <span
                  className={[
                    "self-start text-xs font-semibold px-2.5 py-0.5 rounded-full",
                    badge.bg,
                    badge.text,
                  ].join(" ")}
                >
                  {ROLE_LABEL[t.role]}
                </span>

                {/* Comment */}
                <p className="text-gray-700 text-sm leading-relaxed flex-1">
                  {t.comment}
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                  {/* Avatar circle */}
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 select-none"
                    style={{ backgroundColor: t.avatarColor }}
                    aria-hidden="true"
                  >
                    {t.avatarInitial}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-sm text-gray-900 leading-snug">
                      {t.name}
                    </p>
                    <p className="text-xs text-gray-400 leading-snug truncate">
                      {t.affiliation}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
