import { useEffect, useRef, useState } from 'react';
import { ArrowUp, MessageCircle } from 'lucide-react';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { id: 'home', label: '首页' },
    { id: 'portfolio', label: '作品集' },
    { id: 'about', label: '关于我' },
    { id: 'contact', label: '联系方式' },
  ];

  const socialLinks = [
    { name: 'QQ', href: '#' },
    { name: '微信', href: '#' },
    { name: 'Behance', href: '#' },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      ref={footerRef}
      className="relative bg-black text-white py-16 md:py-20"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Brand Column */}
          <div
            className={`transition-all duration-600 ease-out-expo ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <h3 className="text-2xl font-semibold mb-4">Horae</h3>
            <p className="text-gray-400 leading-relaxed max-w-sm">
              用热情和专注捕捉生活中的美好瞬间，
              让每一帧画面都成为永恒的记忆。
            </p>
          </div>

          {/* Navigation Column */}
          <div
            className={`transition-all duration-600 ease-out-expo ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-6">
              导航
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link, index) => (
                <li
                  key={link.id}
                  style={{ transitionDelay: `${200 + index * 80}ms` }}
                >
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-gray-300 hover:text-teal-400 transition-colors duration-300 link-underline"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Column */}
          <div
            className={`transition-all duration-600 ease-out-expo ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-6">
              社交媒体
            </h4>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:border-teal-400 hover:bg-teal-400/10 transition-all duration-300 ease-out-expo"
                  style={{ transitionDelay: `${300 + index * 100}ms` }}
                  title={social.name}
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          className={`my-12 h-px bg-gray-800 transition-all duration-800 ease-out-expo ${
            isVisible ? 'w-full' : 'w-0'
          }`}
          style={{ transitionDelay: '400ms' }}
        />

        {/* Bottom Bar */}
        <div
          className={`flex flex-col md:flex-row items-center justify-between gap-4 transition-all duration-600 ease-smooth ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: '500ms' }}
        >
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Horae. 保留所有权利。
          </p>

          {/* Back to Top Button */}
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300"
            aria-label="Back to top"
          >
            <span className="text-sm">返回顶部</span>
            <div className="w-8 h-8 rounded-full border border-gray-700 flex items-center justify-center group-hover:border-teal-400 group-hover:bg-teal-400/10 transition-all duration-300">
              <ArrowUp className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
