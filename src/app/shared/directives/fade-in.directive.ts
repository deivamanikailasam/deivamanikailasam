import { Directive, ElementRef, OnInit, Renderer2, PLATFORM_ID, inject, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appFadeIn]',
  standalone: true
})
export class FadeInDirective implements OnInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private fallbackTimeout?: ReturnType<typeof setTimeout>;
  private observer?: IntersectionObserver;
  private resizeListener?: () => void;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      // Server-side: make visible immediately
      this.renderer.setStyle(this.el.nativeElement, 'opacity', '1');
      this.renderer.setStyle(this.el.nativeElement, 'transform', 'translateY(0)');
      return;
    }

    this.initializeAnimation();
    
    // Listen for resize to handle orientation changes
    this.resizeListener = () => this.handleResize();
    window.addEventListener('resize', this.resizeListener);
  }

  ngOnDestroy(): void {
    if (this.fallbackTimeout) {
      clearTimeout(this.fallbackTimeout);
    }
    if (this.observer) {
      this.observer.disconnect();
    }
    if (this.resizeListener && isPlatformBrowser(this.platformId)) {
      window.removeEventListener('resize', this.resizeListener);
    }
  }

  private initializeAnimation(): void {
    // Check if device is very small (mobile)
    const isSmallDevice = window.innerWidth <= 575.98;
    
    if (isSmallDevice) {
      // On very small devices, make visible immediately with minimal animation
      this.renderer.setStyle(this.el.nativeElement, 'opacity', '1');
      this.renderer.setStyle(this.el.nativeElement, 'transform', 'translateY(0)');
      this.renderer.setStyle(this.el.nativeElement, 'transition', 'opacity 0.3s ease, transform 0.3s ease');
      
      // Still set up observer for smooth experience, but with immediate fallback
      this.setupObserver(true);
      
      // Aggressive fallback: make visible after 100ms if still hidden
      this.fallbackTimeout = setTimeout(() => {
        const currentOpacity = window.getComputedStyle(this.el.nativeElement).opacity;
        if (currentOpacity === '0' || parseFloat(currentOpacity) < 0.1) {
          this.renderer.setStyle(this.el.nativeElement, 'opacity', '1');
          this.renderer.setStyle(this.el.nativeElement, 'transform', 'translateY(0)');
        }
      }, 100);
    } else {
      // On larger devices, use normal animation
      this.renderer.setStyle(this.el.nativeElement, 'opacity', '0');
      this.renderer.setStyle(this.el.nativeElement, 'transform', 'translateY(30px)');
      this.renderer.setStyle(this.el.nativeElement, 'transition', 'opacity 0.6s ease, transform 0.6s ease');
      this.setupObserver(false);
    }
  }

  private setupObserver(isSmallDevice: boolean): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.renderer.setStyle(this.el.nativeElement, 'opacity', '1');
            this.renderer.setStyle(this.el.nativeElement, 'transform', 'translateY(0)');
            if (this.observer) {
              this.observer.unobserve(this.el.nativeElement);
            }
            
            // Clear fallback timeout if observer triggered
            if (this.fallbackTimeout) {
              clearTimeout(this.fallbackTimeout);
            }
          }
        });
      },
      { 
        threshold: isSmallDevice ? 0.01 : 0.1,
        rootMargin: isSmallDevice ? '100px' : '0px'
      }
    );

    this.observer.observe(this.el.nativeElement);
  }

  private handleResize(): void {
    // Re-initialize if device size changes significantly
    const isSmallDevice = window.innerWidth <= 575.98;
    const currentOpacity = window.getComputedStyle(this.el.nativeElement).opacity;
    
    if (isSmallDevice && (currentOpacity === '0' || parseFloat(currentOpacity) < 0.1)) {
      // If resized to small device and still hidden, make visible
      this.renderer.setStyle(this.el.nativeElement, 'opacity', '1');
      this.renderer.setStyle(this.el.nativeElement, 'transform', 'translateY(0)');
    }
  }
}

