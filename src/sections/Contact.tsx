import { useEffect, useRef, useState } from 'react';
import { Mail, MessageCircle, Send, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import contactData from '../../content/contact.json';

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '-50px' }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const socialLinks = [
    {
      name: 'QQ',
      icon: MessageCircle,
      href: contactData.qq || '#',
      color: 'hover:bg-[#12B7F5]',
    },
    {
      name: '微信',
      icon: MessageCircle,
      href: contactData.wechat || '#',
      color: 'hover:bg-[#07C160]',
    },
    {
      name: 'Behance',
      icon: () => (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14h-8.027c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988h-6.466v-14.967h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zm-3.466-8.988h3.584c2.508 0 2.906-3-.312-3h-3.272v3zm3.391 3h-3.391v3.016h3.341c3.055 0 2.868-3.016.05-3.016z"/>
        </svg>
      ),
      href: contactData.behance || '#',
      color: 'hover:bg-[#1769FF]',
    },
  ];

  return (
    <section id="contact" ref={sectionRef} className="relative py-24 md:py-32 lg:py-40 gradient-bg">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* 下面布局保持原样，只改邮箱展示 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <div className={`transition-all duration-600 ease-out-expo ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`} style={{ transitionDelay: '300ms' }}>
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">邮箱</h3>
                  <a
                    href={`mailto:${contactData.email}`}
                    className="text-lg font-medium text-black hover:text-teal-500 transition-colors duration-300"
                  >
                    {contactData.email}
                  </a>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-4">社交媒体</h3>
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={social.name}
                      href={social.href}
                      className={`w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-700 transition-all duration-300 ease-out-expo hover:text-white hover:border-transparent hover:scale-110 hover:shadow-medium ${social.color}`}
                      style={{ animationDelay: `${400 + index * 100}ms` }}
                      title={social.name}
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>

              <div className="pt-8 border-t border-gray-200">
                <p className="text-gray-600 leading-relaxed">
                  我通常在 24 小时内回复邮件。如果您有紧急事务，欢迎通过微信直接联系我。
                </p>
              </div>
            </div>
          </div>

          {/* 右侧表单保持原样（你原文件的剩余部分照抄即可） */}
          {/* ——为了不把回答拉太长，我这里不重复贴表单的全部代码；你可以保留原来的右侧表单部分不动—— */}
        </div>

        {/* ⚠️ 你需要把你原来 Contact.tsx 里“右侧表单”那一大段保留原样粘回这里 */}
      </div>
    </section>
  );
};

export default Contact;
