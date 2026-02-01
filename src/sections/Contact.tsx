import { useEffect, useRef, useState } from 'react';
import { Mail, MessageCircle, Send, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    
    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const socialLinks = [
    {
      name: 'QQ',
      icon: MessageCircle,
      href: '#',
      color: 'hover:bg-[#12B7F5]',
    },
    {
      name: '微信',
      icon: MessageCircle,
      href: '#',
      color: 'hover:bg-[#07C160]',
    },
    {
      name: 'Behance',
      icon: () => (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14h-8.027c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988h-6.466v-14.967h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zm-3.466-8.988h3.584c2.508 0 2.906-3-.312-3h-3.272v3zm3.391 3h-3.391v3.016h3.341c3.055 0 2.868-3.016.05-3.016z"/>
        </svg>
      ),
      href: '#',
      color: 'hover:bg-[#1769FF]',
    },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 md:py-32 lg:py-40 gradient-bg"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <div
            className={`flex items-center justify-center gap-4 mb-6 transition-all duration-600 ease-out-expo ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="h-px w-12 bg-teal-500" />
            <span className="text-teal-500 text-sm font-medium tracking-wider uppercase">
              联系我
            </span>
            <div className="h-px w-12 bg-teal-500" />
          </div>

          <h2
            className={`text-3xl md:text-4xl lg:text-5xl font-semibold text-black mb-4 transition-all duration-700 ease-spring ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-12'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            让我们合作
          </h2>

          <p
            className={`text-gray-600 max-w-xl mx-auto transition-all duration-600 ease-smooth ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            有项目想法？让我们一起创造精彩。无论是商业合作还是创意交流，我都期待与您的对话。
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Column - Contact Info */}
          <div
            className={`transition-all duration-600 ease-out-expo ${
              isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-12'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            <div className="space-y-8">
              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">邮箱</h3>
                  <a
                    href="mailto:hello@horae.com"
                    className="text-lg font-medium text-black hover:text-teal-500 transition-colors duration-300"
                  >
                    hello@horae.com
                  </a>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-4">社交媒体</h3>
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={social.name}
                      href={social.href}
                      className={`w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-700 transition-all duration-300 ease-out-expo hover:text-white hover:border-transparent hover:scale-110 hover:shadow-medium ${social.color}`}
                      style={{
                        animationDelay: `${400 + index * 100}ms`,
                      }}
                      title={social.name}
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Additional Info */}
              <div className="pt-8 border-t border-gray-200">
                <p className="text-gray-600 leading-relaxed">
                  我通常在 24 小时内回复邮件。如果您有紧急事务，
                  欢迎通过微信直接联系我。
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div
            className={`transition-all duration-600 ease-out-expo ${
              isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-12'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div className="space-y-2">
                <Label
                  htmlFor="name"
                  className={`text-sm font-medium transition-all duration-300 ${
                    focusedField === 'name' || formData.name
                      ? 'text-teal-500'
                      : 'text-gray-500'
                  }`}
                >
                  姓名
                </Label>
                <div className="input-underline">
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="请输入您的姓名"
                    required
                    className="border-0 border-b border-gray-200 rounded-none px-0 py-3 bg-transparent focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-400"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className={`text-sm font-medium transition-all duration-300 ${
                    focusedField === 'email' || formData.email
                      ? 'text-teal-500'
                      : 'text-gray-500'
                  }`}
                >
                  邮箱
                </Label>
                <div className="input-underline">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="请输入您的邮箱"
                    required
                    className="border-0 border-b border-gray-200 rounded-none px-0 py-3 bg-transparent focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-400"
                  />
                </div>
              </div>

              {/* Message Field */}
              <div className="space-y-2">
                <Label
                  htmlFor="message"
                  className={`text-sm font-medium transition-all duration-300 ${
                    focusedField === 'message' || formData.message
                      ? 'text-teal-500'
                      : 'text-gray-500'
                  }`}
                >
                  留言
                </Label>
                <div className="input-underline">
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="请输入您的留言..."
                    required
                    rows={4}
                    className="border-0 border-b border-gray-200 rounded-none px-0 py-3 bg-transparent focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-400 resize-none"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  className={`w-full md:w-auto px-8 py-6 rounded-full font-medium transition-all duration-500 ease-spring ${
                    isSubmitted
                      ? 'bg-green-500 hover:bg-green-500'
                      : 'bg-black hover:bg-gray-800'
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg
                        className="animate-spin h-5 w-5"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      发送中...
                    </span>
                  ) : isSubmitted ? (
                    <span className="flex items-center gap-2">
                      <Check className="w-5 h-5" />
                      发送成功
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="w-5 h-5" />
                      发送消息
                    </span>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
