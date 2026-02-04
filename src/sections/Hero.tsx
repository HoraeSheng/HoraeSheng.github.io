import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import heroData from '../../content/hero.json';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const scrollY = window.scrollY;
      const heroHeight = heroRef.current.offsetHeight;

      const bgElement = heroRef.current.querySelector('.hero-bg') as HTMLElement;
      const contentElement = heroRef.current.querySelector('.hero-content') as HTMLElement;

      if (bgElement && scrollY < heroHeight) {
        bgElement.style.transform = `translateY(${scrollY * 0.3}px) scale(${1 + scrollY * 0.0002})`;
      }

      if (contentElement && scrollY < heroHeight) {
        contentElement.style.transform = `translateY(${-scrollY * 0.2}px)`;
        contentElement.style.opacity = `${1 - scrollY / (heroHeight * 0.6)}`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToPortfolio = () => {
    const element = document.getElementById('portfolio');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" ref={heroRef} className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div
        className={`hero-bg absolute inset-0 w-full h-full transition-all duration-1200 ease-out-expo ${
          isLoaded ? 'scale-100 opacity-100' : 'scale-110 opacity-0'
        }`}
      >
        <img
          src={heroData.backgroundImage}
          alt="Hero background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="hero-content relative z-10 h-full flex flex-col justify-end pb-24 md:pb-32 px-6 lg:px-16">
        <div className="max-w-4xl">
          {/* Greeting */}
          <p
            className={`text-white/80 text-sm md:text-base font-light tracking-wider mb-4 transition-all duration-600 ease-out-expo ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            {heroData.greeting}
          </p>

          {/* Name */}
          <h1
            className={`text-white text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight mb-4 transition-all duration-800 ease-spring ${
              isLoaded ? 'opacity-100 translate-y-0 rotate-0' : 'opacity-0 translate-y-12 -rotate-x-90'
            }`}
            style={{ transitionDelay: '600ms' }}
          >
            {heroData.name}
          </h1>

          {/* Subtitle */}
          <p
            className={`text-white text-xl md:text-2xl lg:text-3xl font-light mb-3 transition-all duration-700 ease-out-expo ${
              isLoaded ? 'opacity-100 translate-x-0 blur-0' : 'opacity-0 -translate-x-16 blur-sm'
            }`}
            style={{ transitionDelay: '800ms' }}
          >
            {heroData.subtitle}
          </p>

          {/* Description */}
          <p
            className={`text-white/70 text-base md:text-lg font-light mb-10 transition-all duration-600 ease-smooth ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '1000ms' }}
          >
            {heroData.description}
          </p>

          {/* CTA Button */}
          <button
            onClick={scrollToPortfolio}
            className={`group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-black text-sm font-medium rounded-full overflow-hidden transition-all duration-500 ease-spring hover:shadow-large ${
              isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
            }`}
            style={{ transitionDelay: '1200ms' }}
          >
            <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
              {heroData.ctaText}
            </span>
            <span className="absolute inset-0 bg-black transform -translate-x-full transition-transform duration-300 ease-out-expo group-hover:translate-x-0" />
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-10 transition-all duration-600 ease-spring ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
        }`}
        style={{ transitionDelay: '1500ms' }}
      >
        <button
          onClick={scrollToPortfolio}
          className="flex flex-col items-center text-white/60 hover:text-white transition-colors duration-300"
          aria-label="Scroll down"
        >
          <span className="text-xs font-light tracking-wider mb-2">向下滚动</span>
          <ChevronDown className="w-5 h-5 animate-bounce-slow" />
        </button>
      </div>
    </section>
  );
};

export default Hero;
