import { useState } from "react";

export function Tabs({ defaultValue, children, className = "" }) {
  const [activeTab, setActiveTab] = useState(defaultValue);

  // Clone children and pass activeTab and setActiveTab as props
  return (
    <div className={className}>
      {children.map(child => 
        React.cloneElement(child, { activeTab, setActiveTab })
      )}
    </div>
  );
}

export function TabsList({ children, className = "", activeTab, setActiveTab }) {
  return (
    <div className={`flex space-x-2 ${className}`}>
      {children.map(child =>
        React.cloneElement(child, { activeTab, setActiveTab })
      )}
    </div>
  );
}

export function TabsTrigger({ value, children, className = "", activeTab, setActiveTab }) {
  const isActive = activeTab === value;
  return (
    <button
      className={`${className} px-4 py-2 rounded-t ${isActive ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-400"}`}
      onClick={() => setActiveTab(value)}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, children, className = "", activeTab }) {
  if (activeTab !== value) return null;
  return <div className={`${className} p-4 bg-gray-800 rounded-b`}>{children}</div>;
}
