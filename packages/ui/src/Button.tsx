import React from 'react';
import clsx from 'clsx';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', className, children, ...props }) => {
  const base = 'px-4 py-2 rounded focus:outline-none focus:ring';
  const styles = variant === 'primary'
    ? 'bg-blue-600 text-white hover:bg-blue-700'
    : 'bg-gray-200 text-gray-800 hover:bg-gray-300';
  return (
    <button className={clsx(base, styles, className)} {...props}>
      {children}
    </button>
  );
};