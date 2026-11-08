function FeatureMark({ children, dark = false }) {
  return (
    <span
      className={`feature-icon-tile flex h-14 w-14 items-center justify-center rounded-[18px] text-orange-500 ${dark ? 'bg-[#43251f]' : 'bg-orange-100'}`}
    >
      {children}
    </span>
  );
}

function RegisterIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-7 w-7"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 3h9l2 6H7L6 3Z" />
      <path d="M5 9h14a2 2 0 0 1 2 2v8H3v-8a2 2 0 0 1 2-2Z" />
      <path d="M7 13h2m2 0h2m2 0h2M7 16h10" />
    </svg>
  );
}

export { FeatureMark, RegisterIcon };
