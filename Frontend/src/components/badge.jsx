export function Badge({ children, className = "" }) {
  return (
    <span
      className={`inline-block px-2 py-1 rounded text-sm font-semibold text-white ${className}`}
    >
      {children}
    </span>
  );
}
