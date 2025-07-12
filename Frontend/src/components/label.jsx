export function Label({ children, className = "", ...props }) {
  return (
    <label className={`block text-white font-medium mb-1 ${className}`} {...props}>
      {children}
    </label>
  );
}
