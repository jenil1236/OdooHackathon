// components/select.js
import React, { useState, useRef, useEffect } from "react";

export function Select({ value, onValueChange, children }) {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen((o) => !o);
  const close = () => setOpen(false);

  // You can add keyboard navigation, click outside to close, etc.

  return (
    <div className="relative inline-block w-full" tabIndex={0} onBlur={close}>
      {React.Children.map(children, (child) => {
        if (child.type.displayName === "SelectTrigger") {
          return React.cloneElement(child, { onClick: toggleOpen, open });
        }
        if (child.type.displayName === "SelectContent") {
          return open ? React.cloneElement(child, { value, onValueChange, close }) : null;
        }
        return child;
      })}
    </div>
  );
}

export function SelectTrigger({ children, onClick, className, open }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full px-3 py-2 rounded-md focus:outline-none focus:ring ${className}`}
      aria-haspopup="listbox"
      aria-expanded={open}
    >
      {children}
    </button>
  );
}
SelectTrigger.displayName = "SelectTrigger";

export function SelectValue({ children, placeholder }) {
  return <span>{children || placeholder}</span>;
}
SelectValue.displayName = "SelectValue";

export function SelectContent({ children, className, value, onValueChange, close }) {
  // close = function to close dropdown after selection

  const handleSelect = (val) => {
    onValueChange(val);
    close();
  };

  // Render children, inject onClick to SelectItem

  return (
    <ul
      role="listbox"
      className={`absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm ${className}`}
    >
      {React.Children.map(children, (child) => {
        if (child.type.displayName === "SelectItem") {
          return React.cloneElement(child, {
            onSelect: handleSelect,
            selected: child.props.value === value,
          });
        }
        return child;
      })}
    </ul>
  );
}
SelectContent.displayName = "SelectContent";

export function SelectItem({ children, value, onSelect, selected, className }) {
  return (
    <li
      role="option"
      aria-selected={selected}
      className={`cursor-pointer select-none px-4 py-2 ${
        selected ? "bg-blue-600 text-white" : "text-gray-900"
      } ${className}`}
      onClick={() => onSelect(value)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onSelect(value);
        }
      }}
      tabIndex={0}
    >
      {children}
    </li>
  );
}
SelectItem.displayName = "SelectItem";
