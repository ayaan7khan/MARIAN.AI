'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { NeuralVisualizer } from '@/components/landing/NeuralVisualizer';
import { Button } from '@/components/ui/Button';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Brain, Zap, ShieldCheck, Code2 } from 'lucide-react';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export default function LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Hero Entrance Animation
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Navbar reveal
    tl.fromTo(
      '.hero-nav-reveal',
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.1 }
    );

    // Headline text reveal line by line
    tl.fromTo(
      '.hero-title-line',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.15 },
      '-=0.6'
    );

    // Supporting text fade up
    tl.fromTo(
      '.hero-text',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 },
      '-=0.6'
    );

    // Buttons reveal
    tl.fromTo(
      '.hero-btn',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 },
      '-=0.6'
    );

    // Visualizer reveal
    tl.fromTo(
      '.hero-visual',
      { scale: 0.95, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.5, ease: 'power2.out' },
      '-=0.8'
    );

    // Scroll Animations
    
    // Feature cards stagger
    gsap.fromTo(
      '.feature-card',
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.features-grid',
          start: 'top 80%',
        },
      }
    );

    // Stats reveal
    gsap.fromTo(
      '.stat-item',
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.stats-grid',
          start: 'top 85%',
        },
      }
    );

    // Final CTA reveal
    gsap.fromTo(
      '.final-cta',
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.final-cta-section',
          start: 'top 75%',
        },
      }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className={`min-h-screen bg-[#050505] text-[#F3E7CF] selection:bg-[#D4143D] selection:text-[#050505] font-sans`}>
      {/* Sticky Navbar */}
      <div className="hero-nav-reveal">
        <Navbar />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-28 overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#D4143D]/10 blur-[160px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-12 relative z-10">
          <div className="flex-1 space-y-8 text-left md:pr-12">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif tracking-tight leading-[1.05]">
              <div className="hero-title-line overflow-hidden text-[#F3E7CF]">Intelligence</div>
              <div className="hero-title-line overflow-hidden text-[#D4143D]">Redefined.</div>
            </h1>

            <p className="hero-text text-base sm:text-lg text-[#A8A29A] max-w-lg leading-relaxed font-normal">
              MARIAN.AI is your all-in-one AI companion built to empower ideas, accelerate work, and unlock intelligent workflows.
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-4 pt-4">
              <Link href="/chat" className="hero-btn group relative inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-[#D4143D] text-white font-semibold text-sm transition-all overflow-hidden focus:outline-none focus:ring-2 focus:ring-[#D4143D] focus:ring-offset-2 focus:ring-offset-[#050505]">
                <div className="absolute inset-0 bg-[#8F1028] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 shadow-[0_0_20px_rgba(212,20,61,0.5)] transition-opacity duration-300 pointer-events-none" />
                <span className="relative flex items-center gap-2 transform group-hover:-translate-y-[1px] transition-transform duration-300">
                  Start Building <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
              
              <a href="#capabilities" className="hero-btn group inline-flex items-center justify-center px-8 py-3.5 rounded-full border border-[#242424] hover:border-[#D4143D]/50 text-[#F3E7CF] hover:text-white font-semibold text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#D4143D]">
                <span className="transform group-hover:-translate-y-[1px] transition-transform duration-300">Explore Models</span>
              </a>
            </div>
            
            <div className="pt-8 hero-btn">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#A8A29A] mb-4">SCROLL TO DISCOVER</p>
              <div className="w-[1px] h-12 bg-gradient-to-b from-[#A8A29A]/50 to-transparent"></div>
            </div>
          </div>

          <div className="flex-1 w-full max-w-lg mx-auto md:max-w-none hero-visual">
            <NeuralVisualizer />
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-12 border-y border-[#242424] bg-[#080808]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-8 opacity-60">
          <p className="text-[10px] uppercase tracking-[0.15em] text-[#A8A29A] font-semibold">Trusted by innovators at</p>
          <div className="flex items-center gap-8 md:gap-16 grayscale hover:grayscale-0 transition-all duration-700">
            <span className="text-[#A8A29A] font-serif italic text-lg tracking-wide hover:text-white transition-colors">Google</span>
            <span className="text-[#A8A29A] font-sans font-bold text-lg tracking-tight hover:text-white transition-colors">Microsoft</span>
            <span className="text-[#A8A29A] font-sans font-medium text-lg hover:text-white transition-colors">Notion</span>
            <span className="text-[#A8A29A] font-sans font-bold text-lg tracking-tighter hover:text-white transition-colors">Vercel</span>
            <span className="text-[#A8A29A] font-sans font-bold text-lg hover:text-white transition-colors">stripe</span>
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section id="capabilities" className="py-24 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl space-y-4 mb-16 features-grid">
            <span className="text-[10px] font-sans font-semibold text-[#D4143D] uppercase tracking-[0.2em]">
              Powerful by design
            </span>
            <h2 className="text-4xl md:text-5xl font-serif tracking-tight text-[#F3E7CF] leading-tight">
              Everything you need,<br />
              <span className="italic text-[#A8A29A]">built in</span> <span className="text-[#D4143D]">one place.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 features-grid">
            {[
              {
                icon: <Brain className="w-5 h-5 text-[#D4143D]" />,
                title: 'Advanced Models',
                desc: 'Access frontier models and fine-tuned versions.',
              },
              {
                icon: <Zap className="w-5 h-5 text-[#D4143D]" />,
                title: 'Lightning Fast',
                desc: 'Built for speed, optimized for real-time results.',
              },
              {
                icon: <ShieldCheck className="w-5 h-5 text-[#D4143D]" />,
                title: 'Secure by Design',
                desc: 'Enterprise-grade security and data privacy.',
              },
              {
                icon: <Code2 className="w-5 h-5 text-[#D4143D]" />,
                title: 'Developer Ready',
                desc: 'Robust APIs, SDKs, and extensive documentation.',
              },
            ].map((cap, idx) => (
              <div
                key={idx}
                className="feature-card group p-6 rounded-2xl bg-[#0D0D0D] border border-[#242424] space-y-4 hover:border-[#D4143D]/30 transition-all duration-500 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#D4143D]/0 to-[#D4143D]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="p-2.5 rounded-lg bg-[#050505] border border-[#242424] w-fit group-hover:border-[#D4143D]/50 transition-colors duration-500">
                  {cap.icon}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#F3E7CF] mb-1.5">{cap.title}</h3>
                  <p className="text-xs text-[#A8A29A] leading-relaxed group-hover:text-[#F3E7CF] transition-colors duration-500">{cap.desc}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 features-grid">
            <a href="#" className="group inline-flex items-center text-sm text-[#E8C684] hover:text-[#F3E7CF] transition-colors gap-2 relative">
              Explore All Features <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#F3E7CF] group-hover:w-full transition-all duration-300"></span>
            </a>
          </div>
        </div>
      </section>

      {/* Built for Builder Section */}
      <section className="py-24 bg-[#080808] border-t border-[#242424]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-16 items-center stats-grid">
          <div className="space-y-6 stat-item">
             <span className="text-[10px] font-sans font-semibold text-[#D4143D] uppercase tracking-[0.2em]">
              Built for every builder
            </span>
            <h2 className="text-4xl md:text-5xl font-serif tracking-tight text-[#F3E7CF] leading-[1.1]">
              From solo creators to<br />global enterprises.
            </h2>
            <p className="text-sm md:text-base text-[#A8A29A] leading-relaxed max-w-md">
              MARIAN.AI adapts to your needs with flexible plans, powerful APIs and enterprise-grade reliability.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-8 md:gap-12">
             <div className="space-y-2 stat-item">
               <div className="text-3xl md:text-4xl font-serif text-[#E8C684]">99.99%</div>
               <div className="text-xs text-[#A8A29A] uppercase tracking-wider font-semibold">Uptime SLA</div>
             </div>
             <div className="space-y-2 stat-item">
               <div className="text-3xl md:text-4xl font-serif text-[#E8C684]">300K+</div>
               <div className="text-xs text-[#A8A29A] uppercase tracking-wider font-semibold">Developers</div>
             </div>
             <div className="space-y-2 stat-item">
               <div className="text-3xl md:text-4xl font-serif text-[#E8C684]">2.5B+</div>
               <div className="text-xs text-[#A8A29A] uppercase tracking-wider font-semibold">API Requests / Month</div>
             </div>
             <div className="space-y-2 stat-item">
               <div className="text-3xl md:text-4xl font-serif text-[#E8C684]">120+</div>
               <div className="text-xs text-[#A8A29A] uppercase tracking-wider font-semibold">Countries</div>
             </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 bg-[#050505] relative overflow-hidden border-t border-[#242424] final-cta-section">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#D4143D]/5 blur-[160px] rounded-full pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10 space-y-8 final-cta">
           <h2 className="text-5xl md:text-6xl font-serif text-[#F3E7CF]">
             Let's build the future,<br />
             <span className="text-[#D4143D] italic">together.</span>
           </h2>
           <div className="pt-4 flex justify-center">
             <Link href="/chat" className="group relative inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-[#D4143D] text-white font-semibold text-sm transition-all overflow-hidden focus:outline-none focus:ring-2 focus:ring-[#D4143D]">
                <div className="absolute inset-0 bg-[#8F1028] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 shadow-[0_0_30px_rgba(212,20,61,0.6)] transition-opacity duration-300 pointer-events-none" />
                <span className="relative flex items-center gap-2 transform group-hover:-translate-y-[1px] transition-transform duration-300">
                  Start Building <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
           </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
