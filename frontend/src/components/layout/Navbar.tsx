'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');
  const navRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useGSAP(() => {
    if (!navRef.current) return;
    // We handle scroll transition via React state, and hover via CSS group-hover for maximum smoothness and to avoid promise rejection errors.
  }, { scope: navRef });

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Features', href: '#capabilities' },
    { label: 'Models', href: '#models' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Docs', href: '#docs' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out border-b ${
        isScrolled
          ? 'bg-[#050505]/90 backdrop-blur-md py-3 shadow-[0_4px_30px_rgba(0,0,0,0.5)] border-[#242424]'
          : 'bg-[#050505]/40 backdrop-blur-sm py-5 border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: Brand Identity */}
        <Link href="/" className="flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4143D] rounded group">
          <span className="text-2xl font-serif tracking-tight text-[#D4143D] group-hover:text-[#F3E7CF] transition-colors duration-300">
            MARIAN<span className="text-[#F3E7CF] group-hover:text-[#D4143D] transition-colors duration-300">.AI</span>
          </span>
        </Link>

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="group nav-link relative text-[13px] font-serif tracking-wide text-[#A8A29A] hover:text-[#F3E7CF] transition-colors duration-400 py-1.5 px-2"
              onClick={() => setActiveTab(link.label)}
            >
              {link.label}
              <span 
                className={`absolute bottom-0 left-0 h-[1.5px] bg-[#D4143D] transition-all duration-400 ease-out ${
                  activeTab === link.label ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
              ></span>
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/chat"
            className="group relative px-6 py-2.5 rounded-full bg-[#D4143D] text-[#F3E7CF] font-sans font-medium text-xs tracking-wide overflow-hidden focus:outline-none focus:ring-2 focus:ring-[#D4143D]"
          >
            <div className="absolute inset-0 bg-[#8F1028] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 shadow-[0_0_15px_rgba(212,20,61,0.4)] transition-opacity duration-300 pointer-events-none" />
            <span className="relative z-10 transform group-hover:-translate-y-[1px] block transition-transform duration-300">Launch App</span>
          </Link>
        </div>

        {/* Mobile Hamburger Trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#A8A29A] hover:text-[#F3E7CF] focus:outline-none transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#050505]/95 backdrop-blur-xl border-b border-[#242424] px-6 py-6 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => {
                setActiveTab(link.label);
                setMobileMenuOpen(false);
              }}
              className={`block text-lg font-serif tracking-wide transition-colors duration-400 ${activeTab === link.label ? 'text-[#D4143D]' : 'text-[#A8A29A] hover:text-[#F3E7CF]'}`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4 border-t border-[#242424]">
            <Link
              href="/chat"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full py-3 rounded-full bg-[#D4143D] text-white font-semibold text-center text-sm shadow-[0_0_15px_rgba(212,20,61,0.2)]"
            >
              Launch App
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
