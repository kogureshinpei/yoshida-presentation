import Link from "next/link";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#F8F4EF]">
      <div className="bg-[#2D6A4F] pt-10 pb-12 px-4">
        <div className="max-w-3xl mx-auto">
          <span className="inline-block text-[#74C69D] text-sm font-semibold tracking-widest uppercase mb-2">
            Legal
          </span>
          <h1 className="font-shippori text-3xl font-bold text-white mb-2">利用規約</h1>
          <p className="text-white/70 text-sm">最終更新日：2026年5月1日</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-10">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 md:p-12 space-y-8 text-gray-700 text-sm leading-relaxed">

          <section>
            <h2 className="font-shippori text-xl font-bold text-gray-900 mb-3">第1条（適用）</h2>
            <p>本利用規約（以下「本規約」）は、Go Go ふぁーまー運営事務局（以下「当社」）が提供する農業マッチングプラットフォーム「Go Go ふぁーまー」（以下「本サービス」）の利用に関して、本サービスを利用する全ての方（以下「利用者」）に適用されます。</p>
          </section>

          <section>
            <h2 className="font-shippori text-xl font-bold text-gray-900 mb-3">第2条（利用登録）</h2>
            <p>登録を希望する方は、本規約に同意の上、当社の定める方法によって利用登録を申請します。当社が登録を承認した場合に、利用登録が完了するものとします。</p>
            <p className="mt-2">当社は、利用登録の申請者に以下のいずれかの事由があると判断した場合、利用登録の申請を承認しないことがあります。</p>
            <ul className="mt-2 list-disc list-inside space-y-1 pl-2">
              <li>虚偽の事項を届け出た場合</li>
              <li>本規約に違反したことがある者からの申請である場合</li>
              <li>その他、当社が利用登録を相当でないと判断した場合</li>
            </ul>
          </section>

          <section>
            <h2 className="font-shippori text-xl font-bold text-gray-900 mb-3">第3条（禁止事項）</h2>
            <p>利用者は、本サービスの利用にあたり、以下の行為をしてはなりません。</p>
            <ul className="mt-2 list-disc list-inside space-y-1 pl-2">
              <li>法令または公序良俗に違反する行為</li>
              <li>犯罪行為に関連する行為</li>
              <li>当社または第三者のサーバーやネットワークの機能を破壊したり、妨害する行為</li>
              <li>当社のサービス運営を妨害するおそれのある行為</li>
              <li>他の利用者に関する個人情報等を収集または蓄積する行為</li>
              <li>他の利用者に成りすます行為</li>
              <li>反社会的勢力等への利益供与その他の協力をする行為</li>
              <li>当社または第三者の知的財産権、肖像権、プライバシー、名誉その他の権利または利益を侵害する行為</li>
              <li>過度に暴力的な表現、露骨な性的表現、差別的表現等を投稿する行為</li>
              <li>商業的な宣伝、広告、勧誘、または営業行為（当社が許可したものを除く）</li>
              <li>その他、当社が不適切と判断する行為</li>
            </ul>
          </section>

          <section>
            <h2 className="font-shippori text-xl font-bold text-gray-900 mb-3">第4条（本サービスの提供の停止等）</h2>
            <p>当社は、以下のいずれかの事由があると判断した場合、利用者に事前に通知することなく本サービスの全部または一部の提供を停止または中断することができるものとします。</p>
            <ul className="mt-2 list-disc list-inside space-y-1 pl-2">
              <li>本サービスにかかるコンピュータシステムの保守点検または更新を行う場合</li>
              <li>地震、落雷、火災、停電または天災などの不可抗力により、本サービスの提供が困難となった場合</li>
              <li>コンピュータまたは通信回線等が事故により停止した場合</li>
              <li>その他、当社が本サービスの提供が困難と判断した場合</li>
            </ul>
          </section>

          <section>
            <h2 className="font-shippori text-xl font-bold text-gray-900 mb-3">第5条（保証の否認および免責事項）</h2>
            <p>当社は、本サービスに事実上または法律上の瑕疵（安全性、信頼性、正確性、完全性、有効性、特定の目的への適合性、セキュリティなどに関する欠陥、エラーやバグ、権利侵害などを含みます）がないことを明示的にも黙示的にも保証しておりません。</p>
            <p className="mt-2">当社は、本サービスに起因して利用者に生じたあらゆる損害について一切の責任を負いません。ただし、本サービスに関する当社と利用者との間の契約（本規約を含みます）が消費者契約法に定める消費者契約となる場合、この免責規定は適用されません。</p>
          </section>

          <section>
            <h2 className="font-shippori text-xl font-bold text-gray-900 mb-3">第6条（サービス内容の変更等）</h2>
            <p>当社は、利用者に通知することなく、本サービスの内容を変更しまたは本サービスの提供を中止することができるものとし、これによって利用者に生じた損害について一切の責任を負いません。</p>
          </section>

          <section>
            <h2 className="font-shippori text-xl font-bold text-gray-900 mb-3">第7条（利用規約の変更）</h2>
            <p>当社は必要と判断した場合には、利用者に通知することなくいつでも本規約を変更することができるものとします。なお、本規約の変更後、本サービスの利用を開始した場合には、当該利用者は変更後の規約に同意したものとみなします。</p>
          </section>

          <section>
            <h2 className="font-shippori text-xl font-bold text-gray-900 mb-3">第8条（個人情報の取り扱い）</h2>
            <p>当社は、本サービスの利用によって取得する個人情報については、当社「プライバシーポリシー」に従い適切に取り扱うものとします。</p>
          </section>

          <section>
            <h2 className="font-shippori text-xl font-bold text-gray-900 mb-3">第9条（準拠法・裁判管轄）</h2>
            <p>本規約の解釈にあたっては、日本法を準拠法とします。本サービスに関して紛争が生じた場合には、当社の本店所在地を管轄する裁判所を専属的合意管轄とします。</p>
          </section>

          <div className="pt-4 border-t border-gray-100 text-xs text-gray-400 text-right">
            以上
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/register"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#2D6A4F] text-white text-sm font-semibold hover:bg-[#1f5038] transition-colors duration-200"
          >
            登録ページに戻る
          </Link>
        </div>
      </div>
    </main>
  );
}
