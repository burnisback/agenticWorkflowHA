import React from 'react';

export interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ title, children, className }) => {
  return (
    <div className={`p-4 rounded shadow bg-white dark:bg-gray-800 ${className ?? ''}`}>
      {title && <h2 className="text-lg font-semibold mb-2">{title}</h2>}
      {children}
    </div>
  );
};