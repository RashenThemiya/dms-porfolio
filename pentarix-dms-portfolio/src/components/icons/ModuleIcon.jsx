function ModuleIcon({ name }) {
  const paths = {
    inventory: (
      <path d="M3 10h5v10H3V10Zm6-6h6v16H9V4Zm7 7h5v9h-5v-9ZM5 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm14 1a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
    ),
    sales: <path d="M4 18h16v2H2V4h2v14Zm2-3 4-5 3 2 5-7 2 1-6 9-3-2-3 4-2-2Z" />,
    catalog: (
      <path
        fillRule="evenodd"
        d="M3 5a2 2 0 0 1 2-2h7.2a2 2 0 0 1 1.4.6l7.8 7.8a2 2 0 0 1 0 2.8l-7.2 7.2a2 2 0 0 1-2.8 0l-7.8-7.8A2 2 0 0 1 3 12.2V5Zm5 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
        clipRule="evenodd"
      />
    ),
    store: (
      <path d="M4 4h16l2 6a3 3 0 0 1-5 2 3 3 0 0 1-5 0 3 3 0 0 1-5 0 3 3 0 0 1-5-2l2-6Zm1 10.8c.6.2 1.3.2 2 0V21h10v-6.2c.7.2 1.4.2 2 0V21h1v1H4v-1h1v-6.2ZM9 16h6v5H9v-5Z" />
    ),
    supplier: (
      <path d="M2 6h12v10H2V6Zm13 4h4l3 4v2h-1.2a3 3 0 0 0-5.6 0H15v-6ZM6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm12 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
    ),
    customers: (
      <path d="M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm7-1a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM2 20c0-4.4 3.1-7 7-7s7 2.6 7 7v1H2v-1Zm15-7c3 0 5 2 5 5v1h-4.1c-.2-2.3-1-4.2-2.4-5.5.5-.3 1-.5 1.5-.5Z" />
    ),
    orders: (
      <path d="M6 2h9l4 4v16H6V2Zm8 1.5V8h4.5L14 3.5ZM9 11v2h7v-2H9Zm0 4v2h7v-2H9Zm0 4v1h5v-1H9Z" />
    ),
    reports: (
      <path d="M11 2a9 9 0 1 0 5.7 16l3.6 3.6 1.4-1.4-3.6-3.6A9 9 0 0 0 11 2Zm-4 12V9h2v5H7Zm3 0V6h2v8h-2Zm3 0v-3h2v3h-2Z" />
    ),
    roles: (
      <path d="M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM2 21v-1c0-4.3 3-7 7-7 1.5 0 2.8.4 3.9 1.1a8 8 0 0 0-.9 3.7c0 1.2.3 2.3.7 3.2H2Zm16-8 4 1.5v3c0 2.6-1.7 5-4 5.5-2.3-.5-4-2.9-4-5.5v-3l4-1.5Zm-1 4.7 1 1 2-2-1-1-1 1-1-1-1 1 1 1Z" />
    ),
    alerts: (
      <path d="M12 2a2 2 0 0 1 2 2v.3A6 6 0 0 1 18 10v4l2 3v1H4v-1l2-3v-4a6 6 0 0 1 4-5.7V4a2 2 0 0 1 2-2Zm-3 18h6a3 3 0 0 1-6 0Z" />
    ),
    workflow: (
      <path d="M3 3h7v7H3V3Zm11 11h7v7h-7v-7Zm-3-8h4a4 4 0 0 1 4 4v2h-2v-2a2 2 0 0 0-2-2h-4V6ZM5 11h2v3a2 2 0 0 0 2 2h3v2H9a4 4 0 0 1-4-4v-3Z" />
    ),
    multiStore: (
      <path d="M3 3h11v18H3V3Zm3 3v2h2V6H6Zm4 0v2h2V6h-2Zm-4 4v2h2v-2H6Zm4 0v2h2v-2h-2Zm-2 6v5h3v-5H8Zm11-4 3 1v4c0 2.5-1.3 4.6-3 5-1.7-.4-3-2.5-3-5v-4l3-1Zm-1 4v2h2v-2h-2Z" />
    ),
  };

  return (
    <span
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-orange-500/15 bg-orange-500/10 text-dms-accent transition-colors duration-200 group-hover:border-orange-500/35 group-hover:bg-orange-500/15"
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        {paths[name]}
      </svg>
    </span>
  );
}

export default ModuleIcon;
