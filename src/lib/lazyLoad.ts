// Lazy loading optimisé pour les performances mobiles

export class LazyLoadManager {
  private observer: IntersectionObserver | null = null;
  private static instance: LazyLoadManager;

  private constructor() {
    if ('IntersectionObserver' in window) {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const element = entry.target as HTMLElement;
              this.loadElement(element);
              this.observer?.unobserve(element);
            }
          });
        },
        {
          rootMargin: '50px',
          threshold: 0.01,
        }
      );
    }
  }

  static getInstance(): LazyLoadManager {
    if (!LazyLoadManager.instance) {
      LazyLoadManager.instance = new LazyLoadManager();
    }
    return LazyLoadManager.instance;
  }

  observe(element: HTMLElement): void {
    if (this.observer) {
      this.observer.observe(element);
    } else {
      this.loadElement(element);
    }
  }

  private loadElement(element: HTMLElement): void {
    if (element.tagName === 'IMG') {
      const img = element as HTMLImageElement;
      const src = img.dataset.src;
      if (src) {
        img.src = src;
        img.removeAttribute('data-src');
        img.classList.add('loaded');
      }
    } else if (element.dataset.bg) {
      element.style.backgroundImage = `url(${element.dataset.bg})`;
      element.removeAttribute('data-bg');
    }
  }

  disconnect(): void {
    this.observer?.disconnect();
  }
}

// Fonction utilitaire pour détecter si on est sur mobile
export const isMobile = (): boolean => {
  return window.innerWidth <= 768;
};

// Fonction pour obtenir l'URL d'image optimisée selon l'appareil
export const getOptimizedImageUrl = (baseUrl: string, isMobile: boolean): string => {
  // Pour l'instant, retourne l'URL de base
  // Peut être étendu pour servir des versions WebP ou des tailles différentes
  return baseUrl;
};

// Précharge les images critiques
export const preloadCriticalImages = (urls: string[]): void => {
  urls.forEach((url) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = url;
    document.head.appendChild(link);
  });
};
