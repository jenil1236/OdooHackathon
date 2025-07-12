export function Button({ children, onClick, variant = "default", size = "md", className = "", ...props }) {
  let base = "rounded font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 ";

  const variants = {
    default: "bg-blue-600 hover:bg-blue-700 text-white",
    outline: "bg-transparent border border-gray-600 text-gray-300 hover:bg-gray-700",
  };

  const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
  };

  return (
    <button
      onClick={onClick}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
