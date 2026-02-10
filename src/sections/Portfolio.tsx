import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface ProjectImage {
  src: string;
  caption?: string;
}

type ProjectImageInput = string | ProjectImage;

interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  images: ProjectImageInput[];
  offset?: number;
}

const normalizeImage = (img: ProjectImageInput): ProjectImage => {
  return typeof img === 'string' ? { src: img } : img;
};

const Portfolio = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedImage, setSelectedImage] = useState<ProjectImage | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const projects = useMemo(() => {
    const modules = import.meta.glob('../../content/portfolio/*.json', { eager: true }) as Record<
      string,
      { default: Project }
    >;

    return Object.values(modules)
      .map(m => m.default)
      .sort((a, b) => (a.offset ?? 0) - (b.offset ?? 0));
  }, []);

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

  return (
    <section id="portfolio" ref={sectionRef} className="relative py-24 md:py-32 lg:py-40 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16 md:mb-24">
          <div
            className={`flex items-center justify-center gap-4 mb-6 transition-all duration-600 ease-out-expo ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="h-px w-12 bg-teal-500" />
            <span className="text-teal-500 text-sm font-medium tracking-wider uppercase">我的作品</span>
            <div className="h-px w-12 bg-teal-500" />
          </div>

          <h2
            className={`text-3xl md:text-4xl lg:text-5xl font-semibold text-black transition-all duration-700 ease-spring ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            捕捉瞬间
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, index) => {
            const cover = project.images?.length ? normalizeImage(project.images[0]) : null;

            return (
              <div
                key={project.id}
                className={`group relative transition-all duration-800 ease-spring ${
                  isVisible ? 'opacity-100 translate-y-0 rotate-0' : 'opacity-0 translate-y-20 -rotate-y-15'
                }`}
                style={{
                  transitionDelay: `${200 + index * 150}ms`,
                  marginTop: `${project.offset ?? 0}px`,
                }}
              >
                <div
                  className="relative aspect-[3/4] overflow-hidden rounded-lg cursor-pointer card-hover"
                  onClick={() => {
                    setSelectedProject(project);
                    setSelectedImage(null);
                  }}
                >
                  {cover && (
                    <img
                      src={cover.src}
                      alt={project.title}
                      className="w-full h-full object-cover img-zoom"
                      loading={index < 3 ? 'eager' : 'lazy'}
                      decoding="async"
                      fetchPriority={index === 0 ? 'high' : 'low'}
                    />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <div className="transform transition-all duration-400 ease-out-expo">
                      <p className="text-white/60 text-xs font-light tracking-wider mb-1">{project.subtitle}</p>
                      <h3 className="text-white text-xl md:text-2xl font-semibold">{project.title}</h3>
                    </div>

                    <div className="overflow-hidden max-h-0 group-hover:max-h-24 transition-all duration-500 ease-out-expo">
                      <p className="text-white/80 text-sm mt-3 line-clamp-2">{project.description}</p>
                    </div>

                    <div className="flex items-center gap-2 mt-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400 ease-out-expo">
                      <span className="text-white text-sm font-medium">查看全部</span>
                      <ArrowUpRight className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 项目弹窗 */}
      <Dialog
        open={!!selectedProject}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedProject(null);
            setSelectedImage(null);
          }
        }}
      >
        <DialogContent className="max-w-6xl w-[95vw] max-h-[90vh] overflow-y-auto p-0">
          {selectedProject && (
            <>
              <DialogHeader className="p-6 pb-0">
                <DialogTitle className="text-2xl md:text-3xl font-semibold">{selectedProject.title}</DialogTitle>
                <p className="text-gray-500 text-sm mt-1">{selectedProject.subtitle}</p>
                <p className="text-gray-600 mt-4 leading-relaxed">{selectedProject.description}</p>
              </DialogHeader>

              <div className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {selectedProject.images.map((imgRaw, idx) => {
                    const img = normalizeImage(imgRaw);
                    return (
                      <div
                        key={idx}
                        className="aspect-[3/4] overflow-hidden rounded-lg cursor-pointer group"
                        onClick={() => setSelectedImage(img)}
                        title={img.caption || ''}
                      >
                        <img
                          src={img.src}
                          alt={`${selectedProject.title} - ${idx + 1}`}
                          className="w-full h-full object-cover transition-transform duration-500 ease-out-expo group-hover:scale-110"
                          loading="lazy"
                          decoding="async"
                          fetchPriority="low"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* 单图弹窗（带描述） */}
      <Dialog
        open={!!selectedImage}
        onOpenChange={(open) => {
          if (!open) setSelectedImage(null);
        }}
      >
        <DialogContent className="max-w-5xl w-[95vw] p-0 bg-black/95 border-none">
          {selectedImage && (
            <div className="relative">
              <img
                src={selectedImage.src}
                alt="Lightbox"
                className="w-full h-auto max-h-[80vh] object-contain"
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />

              {selectedImage.caption && (
                <div className="absolute left-0 right-0 bottom-0 p-4 bg-black/60">
                  <p className="text-white/90 text-sm leading-relaxed">{selectedImage.caption}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Portfolio;
