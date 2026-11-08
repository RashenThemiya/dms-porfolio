function Container({ children, className = '', as: Component = 'div' }) {
  return (
    <Component
      className={`site-container mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-10 ${className}`}
    >
      {children}
    </Component>
  );
}

export default Container;
