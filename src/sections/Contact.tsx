import { useEffect, useRef, useState } from "react";
import { Mail } from "lucide-react";
import contactData from "../../content/contact.json";

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "-50px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 md:py-32 lg:py-40 gradient-bg"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* 布局保持原样：两列 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* 左侧：只保留邮箱 */}
          <div
            className={`transition-all duration-600 ease-out-expo ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-12"
            }`}
            style={{ transitionDelay: "300ms" }}
          >
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">
                    邮箱
                  </h3>
                  <a
                    href={`mailto:${contactData.email}`}
                    className="text-lg font-medium text-black hover:text-teal-500 transition-colors duration-300"
                  >
                    {contactData.email}
                  </a>
                </div>
              </div>

              <div className="pt-8 border-t border-gray-200">
                <p className="text-gray-600 leading-relaxed">
                  我通常在 48 小时内回复邮件。
                </p>
              </div>
            </div>
          </div>

          {/* 右侧：占位，保持原两列布局但不展示内容 */}
          <div aria-hidden="true" />
        </div>
      </div>
    </section>
  );
};

export default Contact;
