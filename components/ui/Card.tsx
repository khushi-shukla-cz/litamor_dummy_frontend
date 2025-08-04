import React from 'react';
import { View, ViewProps } from 'react-native';

interface CardProps extends ViewProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated';
}

export function Card({ 
  children, 
  variant = 'default', 
  className = '',
  ...props 
}: CardProps) {
  const baseClasses = 'rounded-2xl p-4';
  
  const variantClasses = {
    default: 'bg-white dark:bg-gray-800',
    elevated: 'bg-white dark:bg-gray-800 shadow-lg'
  };

  return (
    <View
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </View>
  );
} 