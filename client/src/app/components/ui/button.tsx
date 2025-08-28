import React from "react";

type ButtonSize = "xsm" | "sm" | "md" | "lg" | "xl";
type ButtonVariant = "primary" | "secondary" | "outline";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  variant?: ButtonVariant;
}

const SIZE_CLASSES = {
  xsm: "px-2 py-1 text-xs",
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-5 py-2.5 text-lg",
  xl: "px-6 py-3 text-xl",
};

const VARIANT_CLASSES = {
  primary: "bg-black text-white hover:bg-gray-900",
  secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
  outline: "border border-gray-300 text-gray-800 hover:bg-gray-100",
};

export const Button: React.FC<ButtonProps> = ({
  size = "md",
  variant = "primary",
  className = "",
  children,
  ...props
}) => {
  const baseClasses = "rounded-md font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  const combinedClasses = `${baseClasses} ${SIZE_CLASSES[size]} ${VARIANT_CLASSES[variant]} ${className}`.trim();
  
  return (
    <button
      {...props}
      className={combinedClasses}
    >
      {children}
    </button>
  );
};