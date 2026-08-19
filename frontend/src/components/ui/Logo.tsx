import React from 'react';
import Link from 'next/link';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  href?: string;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
  href = '/',
}) => {
  const sizeMap = {
    sm: { box: 'w-7 h-7', icon: 'w-4 h-4', text: 'text-lg' },
    md: { box: 'w-9 h-9', icon: 'w-5 h-5', text: 'text-xl' },
    lg: { box: 'w-11 h-11', icon: 'w-6 h-6', text: 'text-2xl' },
  };

  const currentSize = sizeMap[size];

  const content = (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      {showText && (
        <span className={`${currentSize.text} font-serif tracking-tight text-[#D4143D] group-hover:text-[#F3E7CF] transition-colors duration-300`}>
          MARIAN<span className="text-[#F3E7CF] group-hover:text-[#D4143D] transition-colors duration-300">.AI</span>
        </span>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4143D] rounded-xl flex items-center">
        {content}
      </Link>
    );
  }

  return <div className="group flex items-center">{content}</div>;
};

export default Logo;
