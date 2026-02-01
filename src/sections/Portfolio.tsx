import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  images: string[];
  offset: number;
}

const projects: Project[] = [
  {
    id: 'nature',
    title: '旷野遐想',
    subtitle: 'Nature Dreams',
    description: '走进自然的怀抱，捕捉山川湖海的壮丽与宁静，感受大地的呼吸。',
    images: [
      '/images/portfolio/nature/nature-1.jpg',
      '/images/portfolio/nature/nature-2.jpg',
      '/images/portfolio/nature/nature-3.jpg',
      '/images/portfolio/nature/nature-4.jpg',
      '/images/portfolio/nature/nature-5.jpg',
      '/images/portfolio/nature/nature-6.jpg',
    ],
    offset: 0,
  },
  {
    id: 'architecture',
    title: '建筑光影',
    subtitle: 'Light & Shadow',
    description: '用光影诠释建筑的艺术，在明暗交错中发现空间的美学。',
    images: [
      '/images/portfolio/architecture/arch-1.jpg',
      '/images/portfolio/architecture/arch-2.jpg',
      '/images/portfolio/architecture/arch-3.jpg',
      '/images/portfolio/architecture/arch-4.jpg',
      '/images/portfolio/architecture/arch-5.jpg',
      '/images/portfolio/architecture/arch-6.jpg',
    ],
    offset: 60,
  },
  {
    id: 'life',
    title: '生活碎片',
    subtitle: 'Life Moments',
    description: '记录日常生活中的温馨瞬间，在平凡中发现不平凡的美。',
    images: [
      '/images/portfolio/life/life-1.jpg',
      '/images/portfolio/life/life-2.jpg',
      '/images/portfolio/life/life-3.jpg',
      '/images/portfolio/life/life-4.jpg',
      '/images/portfolio/life/life-5.jpg',
      '/images/portfolio/life/life-6.jpg',
    ],
    offset: 120,
  },
];

const Portfolio = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
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

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="relative py-24 md:py-32 lg:py-40 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24">
          <div
            className={`flex items-center justify-center gap-4 mb-6 transition-all duration-600 ease-out-expo ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="h-px w-12 bg-teal-500" />
            <span className="text-teal-500 text-sm font-medium tracking-wider uppercase">
              我的作品
            </span>
            <div className="h-px w-12 bg-teal-500" />
          </div>

          <h2
            className={`text-3xl md:text-4xl lg:text-5xl font-semibold text-black transition-all duration-700 ease-spring ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-12'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            捕捉瞬间
          </h2>
        </div>

        {/* Portfolio Grid - Asymmetric Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`group relative transition-all duration-800 ease-spring ${
                isVisible
                  ? 'opacity-100 translate-y-0 rotate-0'
                  : 'opacity-0 translate-y-20 -rotate-y-15'
              }`}
              style={{
                transitionDelay: `${200 + index * 150}ms`,
                marginTop: `${project.offset}px`,
              }}
            >
              {/* Card */}
              <div
                className="relative aspect-[3/4] overflow-hidden rounded-lg cursor-pointer card-hover"
                onClick={() => setSelectedProject(project)}
              >
                {/* Cover Image */}
                <img
                  src={project.images[0]}
                  alt={project.title}
                  className="w-full h-full object-cover img-zoom"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  {/* Title - Always visible */}
                  <div className="transform transition-all duration-400 ease-out-expo">
                    <p className="text-white/60 text-xs font-light tracking-wider mb-1">
                      {project.subtitle}
                    </p>
                    <h3 className="text-white text-xl md:text-2xl font-semibold">
                      {project.title}
                    </h3>
                  </div>

                  {/* Description - Shows on hover */}
                  <div className="overflow-hidden max-h-0 group-hover:max-h-24 transition-all duration-500 ease-out-expo">
                    <p className="text-white/80 text-sm mt-3 line-clamp-2">
                      {project.description}
                    </p>
                  </div>

                  {/* View Button - Shows on hover */}
                  <div className="flex items-center gap-2 mt-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400 ease-out-expo">
                    <span className="text-white text-sm font-medium">查看全部</span>
                    <ArrowUpRight className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Detail Dialog */}
      <Dialog
        open={!!selectedProject}
        onOpenChange={() => setSelectedProject(null)}
      >
        <DialogContent className="max-w-6xl w-[95vw] max-h-[90vh] overflow-y-auto p-0">
          {selectedProject && (
            <>
              {/* Dialog Header */}
              <DialogHeader className="p-6 pb-0">
                <DialogTitle className="text-2xl md:text-3xl font-semibold">
                  {selectedProject.title}
                </DialogTitle>
                <p className="text-gray-500 text-sm mt-1">
                  {selectedProject.subtitle}
                </p>
                <p className="text-gray-600 mt-4 leading-relaxed">
                  {selectedProject.description}
                </p>
              </DialogHeader>

              {/* Image Grid */}
              <div className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {selectedProject.images.map((image, idx) => (
                    <div
                      key={idx}
                      className="aspect-[3/4] overflow-hidden rounded-lg cursor-pointer group"
                      onClick={() => setSelectedImage(image)}
                    >
                      <img
                        src={image}
                        alt={`${selectedProject.title} - ${idx + 1}`}
                        className="w-full h-full object-cover transition-transform duration-500 ease-out-expo group-hover:scale-110"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Image Lightbox */}
      <Dialog
        open={!!selectedImage}
        onOpenChange={() => setSelectedImage(null)}
      >
        <DialogContent className="max-w-5xl w-[95vw] p-0 bg-black/95 border-none">
          {selectedImage && (
            <div className="relative">
              <img
                src={selectedImage}
                alt="Lightbox"
                className="w-full h-auto max-h-[80vh] object-contain"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Portfolio;
