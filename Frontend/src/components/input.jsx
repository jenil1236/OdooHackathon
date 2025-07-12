export function Input({ className = "", ...props }) {
  return (
    <input
      className={`bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      {...props}
    />
  );
}
