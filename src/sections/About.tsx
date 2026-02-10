import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import aboutData from '../../content/about.json';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2, rootMargin: '-50px' }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const bioParagraphs = useMemo(() => {
    // CMS 的 bio 里是用 \n\n 分段
    return (aboutData.bio || '')
      .split('\n\n')
      .map(s => s.trim())
      .filter(Boolean);
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 md:py-32 lg:py-40 gradient-bg overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Column */}
          <div
            className={`relative transition-all duration-1000 ease-out-expo ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
            }`}
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg shadow-large group">
              <img
                src={aboutData.avatar}
                alt={`${aboutData.name} - Photographer`}
                className="w-full h-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
                loading="lazy"
                decoding="async"
                fetchPriority="low"
              />
              <div className="absolute inset-4 border border-white/30 rounded pointer-events-none" />
            </div>

            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-teal-100 rounded-full -z-10" />
            <div className="absolute -top-4 -left-4 w-20 h-20 bg-teal-50 rounded-full -z-10" />
          </div>

          {/* Content Column */}
          <div className="lg:pl-8">
            {/* Section Label */}
            <div
              className={`flex items-center gap-4 mb-6 transition-all duration-600 ease-out-expo ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              <span className="text-teal-500 text-sm font-medium tracking-wider uppercase">
                关于我
              </span>
              <div className="h-px w-12 bg-teal-500" />
            </div>

            {/* Title */}
            <h2
              className={`text-3xl md:text-4xl lg:text-5xl font-semibold text-black mb-8 leading-tight transition-all duration-700 ease-spring ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              {aboutData.tagline}
            </h2>

            {/* Description */}
            <div
              className={`space-y-4 text-gray-600 leading-relaxed transition-all duration-600 ease-smooth ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '600ms' }}
            >
              {bioParagraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Stats */}
            <div
              className={`grid grid-cols-3 gap-8 mt-10 mb-10 transition-all duration-600 ease-out-expo ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '700ms' }}
            >
              {aboutData.stats.map((s, idx) => (
                <div key={idx}>
                  <div className="text-3xl md:text-4xl font-semibold text-black mb-1">{s.value}</div>
                  <div className="text-sm text-gray-500">{s.label}</div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <button
              className={`group inline-flex items-center gap-3 text-black font-medium transition-all duration-500 ease-spring ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '800ms' }}
              onClick={() => {
                const element = document.getElementById('contact');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span className="relative">
                联系我
                <span className="absolute bottom-0 left-0 w-full h-px bg-black transform origin-left transition-transform duration-300 ease-out-expo group-hover:scale-x-0" />
              </span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
