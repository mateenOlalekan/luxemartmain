import { JSX, useState } from "react";

interface InputProps {
  labelName: string;
  labelType: string;
  InputType: string;
  Icon: JSX.Element;
  type: string;
  placeholder: string;
  register: any;
  errors: any;
  name: string;
}

export default function InputComponent({
  labelName,
  Icon,
  type,
  placeholder,
  register,
  errors,
  name,
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const hasError = !!errors[name];

  return (
    <div className="relative w-full">
      {/* Input Wrapper */}
      <div
        className={`flex items-center gap-2 rounded-2xl border bg-white px-4 transition-all duration-300 ${
          hasError
            ? "border-red-500 focus-within:ring-red-500"
            : isFocused
            ? "border-emerald-500 ring-2 ring-emerald-200"
            : "border-neutral-300 hover:border-neutral-400"
        }`}
      >
        <span
          className={`transition-colors ${
            isFocused ? "text-emerald-600" : "text-neutral-500"
          }`}
        >
          {Icon}
        </span>

        <input
          id={name}
          type={type}
          {...register(name, { required: `${labelName} is required` })}
          className="peer w-full bg-transparent py-3 text-[15px] text-neutral-900 placeholder-transparent focus:outline-none"
          placeholder={placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        {/* Floating Label */}
        <label
          htmlFor={name}
          className={`absolute left-12 text-sm text-neutral-500 transition-all duration-300 
            peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-neutral-400 peer-placeholder-shown:text-[15px] 
            peer-focus:-top-2 peer-focus:text-xs peer-focus:text-emerald-600
            ${isFocused ? "text-emerald-600 -top-2 text-xs" : "top-3.5"}
          `}
        >
          {labelName}
        </label>
      </div>

      {/* Error Message */}
      {hasError && (
        <p
          role="alert"
          className="mt-1 text-sm text-red-600 animate-shake"
        >
          {errors[name]?.message}
        </p>
      )}
    </div>
  );
}
