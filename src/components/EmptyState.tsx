"use client";

type Props = {
  message: string;
  onReset: () => void;
};

function FarmIllustration() {
  return (
    <svg
      width="120"
      height="96"
      viewBox="0 0 120 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Sun */}
      <circle cx="90" cy="22" r="12" fill="#74C69D" opacity="0.8" />
      {/* Sun rays */}
      <line x1="90" y1="5" x2="90" y2="1" stroke="#74C69D" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
      <line x1="90" y1="43" x2="90" y2="39" stroke="#74C69D" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
      <line x1="73" y1="22" x2="69" y2="22" stroke="#74C69D" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
      <line x1="111" y1="22" x2="107" y2="22" stroke="#74C69D" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
      <line x1="78" y1="9" x2="75" y2="6" stroke="#74C69D" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
      <line x1="105" y1="36" x2="102" y2="33" stroke="#74C69D" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
      <line x1="78" y1="35" x2="75" y2="38" stroke="#74C69D" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
      <line x1="105" y1="9" x2="102" y2="6" stroke="#74C69D" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />

      {/* Ground */}
      <rect x="10" y="70" width="100" height="8" rx="4" fill="#74C69D" opacity="0.25" />
      <rect x="0" y="78" width="120" height="18" rx="4" fill="#74C69D" opacity="0.15" />

      {/* Main sprout stem */}
      <path
        d="M60 70 C60 58 60 50 60 42"
        stroke="#2D6A4F"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Left leaf */}
      <path
        d="M60 54 C52 46 42 48 40 52 C38 56 48 60 60 54Z"
        fill="#74C69D"
        opacity="0.9"
      />
      {/* Right leaf */}
      <path
        d="M60 48 C68 40 78 42 80 46 C82 50 72 56 60 48Z"
        fill="#2D6A4F"
        opacity="0.8"
      />
      {/* Sprout tip */}
      <circle cx="60" cy="40" r="4" fill="#74C69D" />

      {/* Small side sprout left */}
      <path
        d="M38 70 C38 64 38 60 38 56"
        stroke="#74C69D"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.6"
      />
      <path
        d="M38 62 C33 57 27 59 27 62 C27 65 34 66 38 62Z"
        fill="#74C69D"
        opacity="0.5"
      />

      {/* Small side sprout right */}
      <path
        d="M82 70 C82 64 82 60 82 56"
        stroke="#74C69D"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.6"
      />
      <path
        d="M82 62 C87 57 93 59 93 62 C93 65 86 66 82 62Z"
        fill="#74C69D"
        opacity="0.5"
      />
    </svg>
  );
}

export default function EmptyState({ message, onReset }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      {/* Illustration */}
      <div className="mb-6">
        <FarmIllustration />
      </div>

      {/* Message */}
      <p className="text-gray-500 text-base max-w-xs leading-relaxed mb-6">
        {message}
      </p>

      {/* Reset button */}
      <button
        type="button"
        onClick={onReset}
        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border-2 border-[#2D6A4F] text-[#2D6A4F] text-sm font-medium hover:bg-[#2D6A4F] hover:text-white transition-all duration-200"
      >
        フィルターをリセット
      </button>
    </div>
  );
}
