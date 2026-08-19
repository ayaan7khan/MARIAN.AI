import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#050505] border-t border-[#242424] pt-20 pb-12 text-sm text-[#A8A29A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-12 pb-16 border-b border-[#242424]">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="inline-block focus:outline-none rounded">
              <span className="text-xl font-bold tracking-tight text-[#D4143D]">
                MARIAN.AI
              </span>
            </Link>
            <p className="text-sm text-[#A8A29A] max-w-xs leading-relaxed font-sans">
              Intelligence Redefined.
            </p>
          </div>

          {/* Column 1 */}
          <div>
            <h4 className="font-sans font-semibold text-xs text-[#F3E7CF] uppercase tracking-wider mb-5">Product</h4>
            <ul className="space-y-3">
              <li><Link href="#models" className="hover:text-[#D4143D] transition-colors text-xs">Models</Link></li>
              <li><Link href="#features" className="hover:text-[#D4143D] transition-colors text-xs">Features</Link></li>
              <li><Link href="#pricing" className="hover:text-[#D4143D] transition-colors text-xs">Pricing</Link></li>
              <li><Link href="/chat" className="hover:text-[#D4143D] transition-colors text-xs">API</Link></li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="font-sans font-semibold text-xs text-[#F3E7CF] uppercase tracking-wider mb-5">Resources</h4>
            <ul className="space-y-3">
              <li><Link href="#docs" className="hover:text-[#D4143D] transition-colors text-xs">Docs</Link></li>
              <li><Link href="#" className="hover:text-[#D4143D] transition-colors text-xs">Guides</Link></li>
              <li><Link href="#" className="hover:text-[#D4143D] transition-colors text-xs">Changelog</Link></li>
              <li><Link href="#" className="hover:text-[#D4143D] transition-colors text-xs">Blog</Link></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h4 className="font-sans font-semibold text-xs text-[#F3E7CF] uppercase tracking-wider mb-5">Company</h4>
            <ul className="space-y-3">
              <li><Link href="#about" className="hover:text-[#D4143D] transition-colors text-xs">About</Link></li>
              <li><Link href="#" className="hover:text-[#D4143D] transition-colors text-xs">Careers</Link></li>
              <li><Link href="#contact" className="hover:text-[#D4143D] transition-colors text-xs">Contact</Link></li>
              <li><Link href="#" className="hover:text-[#D4143D] transition-colors text-xs">Press</Link></li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h4 className="font-sans font-semibold text-xs text-[#F3E7CF] uppercase tracking-wider mb-5">Legal</h4>
            <ul className="space-y-3">
              <li><Link href="#" className="hover:text-[#D4143D] transition-colors text-xs">Privacy</Link></li>
              <li><Link href="#" className="hover:text-[#D4143D] transition-colors text-xs">Terms</Link></li>
              <li><Link href="#" className="hover:text-[#D4143D] transition-colors text-xs">Security</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A8A29A]">
          <p>© {new Date().getFullYear()} MARIAN.AI. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-[#F3E7CF] transition-colors">Twitter (X)</a>
            <a href="#" className="hover:text-[#F3E7CF] transition-colors">GitHub</a>
            <a href="#" className="hover:text-[#F3E7CF] transition-colors">Discord</a>
            <a href="#" className="hover:text-[#F3E7CF] transition-colors">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
