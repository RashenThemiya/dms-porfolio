const variants = {
  primary:
    'bg-orange-500 text-white shadow-sm hover:bg-orange-600 focus-visible:outline-orange-500',
  secondary:
    'border border-slate-300 bg-white text-slate-900 shadow-sm hover:border-slate-400 hover:bg-slate-50 focus-visible:outline-slate-500',
};

function Button({
  children,
  className = '',
  onClick,
  variant = 'primary',
  as: Component = 'button',
  ...props
}) {
  return (
    <Component
      className={`inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold transition duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 ${variants[variant]} ${className}`}
      onClick={onClick}
      {...(Component === 'button' ? { type: 'button' } : {})}
      {...props}
    >
      {children}
    </Component>
  );
}

export default Button;
