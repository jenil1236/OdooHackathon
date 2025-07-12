export function Avatar({ src, alt, fallback, className = "" }) {
  return (
    <div className={`rounded-full bg-gray-700 text-white flex items-center justify-center ${className}`}>
      {src ? (
        <img src={src} alt={alt} className="rounded-full w-full h-full object-cover" />
      ) : (
        <span>{fallback}</span>
      )}
    </div>
  );
}
