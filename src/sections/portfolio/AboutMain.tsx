'use client';
import React from 'react';
import AboutSectionSlides from './AboutSectionSlides';
import TimelineSection from './TimelineSection';
import './style.css';
import { Header } from './header';
import Footer from './Footer';
import AnimatedQuoteSection from './view/AnimatedQuoteSection';

export default function AboutMain() {
  return (
    <main>
      <Header />

      <AboutSectionSlides />
      <TimelineSection />
      {/* <AnimatedQuoteSection /> */}

      <Footer />

    </main>
  );
}
