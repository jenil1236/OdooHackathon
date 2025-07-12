export function Card({ children, className = "" }) {
  return (
    <div className={`bg-gray-800 border border-gray-700 rounded-md ${className}`}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className = "" }) {
  return (
    <div className={`border-b border-gray-700 p-4 ${className}`}>
      {children}
    </div>
  );
}

export function CardContent({ children, className = "" }) {
  return <div className={`p-4 ${className}`}>{children}</div>;
}

export function CardTitle({ children, className = "" }) {
  return <h2 className={`text-white font-bold text-xl ${className}`}>{children}</h2>;
}
