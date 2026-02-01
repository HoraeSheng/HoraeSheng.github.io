import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
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
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-16'
            }`}
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg shadow-large group">
              <img
                src="/images/about/profile.jpg"
                alt="Horae - Photographer"
                className="w-full h-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
              />
              {/* Decorative frame */}
              <div className="absolute inset-4 border border-white/30 rounded pointer-events-none" />
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-teal-100 rounded-full -z-10" />
            <div className="absolute -top-4 -left-4 w-20 h-20 bg-teal-50 rounded-full -z-10" />
          </div>

          {/* Content Column */}
          <div className="lg:pl-8">
            {/* Section Label */}
            <div
              className={`flex items-center gap-4 mb-6 transition-all duration-600 ease-out-expo ${
                isVisible
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 -translate-x-10'
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
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-16'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              记录这个世界的美
            </h2>

            {/* Description */}
            <div
              className={`space-y-4 text-gray-600 leading-relaxed transition-all duration-600 ease-smooth ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '600ms' }}
            >
              <p>
                我是一名充满热情的摄影师，致力于捕捉日常生活中的美好瞬间。带着相机在手，
                我不断寻找那些讲述独特故事的画面。无论是城市的喧嚣、自然的宁静，
                还是人与人之间的温情，我都希望通过镜头将它们永恒定格。
              </p>
              <p>
                摄影对我而言，不仅仅是一种技艺，更是一种观察世界的方式。
                我相信每一个瞬间都有其独特的意义，每一束光线都蕴含着情感的表达。
                通过我的作品，我希望能够传递出生活中那些被忽视的美好，
                让观者在繁忙的生活中停下脚步，感受世界的温柔。
              </p>
              <p>
                多年来，我走过了许多地方，记录了无数动人的画面。
                从繁华都市的霓虹灯火到偏远山村的晨曦微光，
                从建筑的线条美学到自然的壮丽景观，
                每一次按下快门，都是我与这个世界的一次对话。
              </p>
            </div>

            {/* Stats */}
            <div
              className={`grid grid-cols-3 gap-8 mt-10 mb-10 transition-all duration-600 ease-out-expo ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '700ms' }}
            >
              <div>
                <div className="text-3xl md:text-4xl font-semibold text-black mb-1">5+</div>
                <div className="text-sm text-gray-500">年摄影经验</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-semibold text-black mb-1">1000+</div>
                <div className="text-sm text-gray-500">作品收录</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-semibold text-black mb-1">50+</div>
                <div className="text-sm text-gray-500">获奖作品</div>
              </div>
            </div>

            {/* CTA Button */}
            <button
              className={`group inline-flex items-center gap-3 text-black font-medium transition-all duration-500 ease-spring ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
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
