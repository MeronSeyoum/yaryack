// src/components/ui/Input.tsx
import React from 'react';

interface BaseInputProps {
  label?: string;
  error?: string;
  className?: string;
}

interface SingleLineInputProps extends BaseInputProps, React.InputHTMLAttributes<HTMLInputElement> {
  multiline?: false;
  rows?: never;
}

interface MultiLineInputProps extends BaseInputProps, React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  multiline: true;
  rows?: number;
}

type InputProps = SingleLineInputProps | MultiLineInputProps;

export const Input: React.FC<InputProps> = ({
  label,
  error,
  multiline = false,
  rows = 4,
  className = '',
  ...props
}) => {
  const inputClasses = `ds-input ds-input-md ${error ? 'border-red-500' : ''} ${className}`;
  
  return (
    <div className="w-full">
      {label && (
        <label className="block ds-body-sm mb-2 font-medium ds-text-secondary">
          {label}
        </label>
      )}
      {multiline ? (
        <textarea
          rows={rows}
          className={`${inputClasses} resize-none`}
          {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          className={inputClasses}
          {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
        />
      )}
      {error && (
        <p className="mt-1 ds-body-sm text-red-500">{error}</p>
      )}
    </div>
  );
};