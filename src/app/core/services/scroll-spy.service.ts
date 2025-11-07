import { Injectable, signal, effect } from '@angular/core';
import { fromEvent } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ScrollSpyService {
  activeSection = signal<string>('profile');
  private sections: string[] = ['profile', 'education', 'experience', 'skills', 'projects', 'achievements', 'certifications', 'contact'];
  private scrollSubscription?: any;

  constructor() {
    this.setupScrollListener();
    
    effect(() => {
      const active = this.activeSection();
      // Update URL without navigation
      if (typeof window !== 'undefined' && window.history) {
        window.history.replaceState(null, '', `#${active}`);
      }
    });
  }

  private setupScrollListener(): void {
    if (typeof window === 'undefined') return;

    // Try to find the infinite scroll container first
    const scrollContainer = document.querySelector('.infinite-scroll-container') as HTMLElement;
    
    if (scrollContainer) {
      this.scrollSubscription = fromEvent(scrollContainer, 'scroll')
        .pipe(throttleTime(100))
        .subscribe(() => {
          this.updateActiveSection(scrollContainer);
        });
    } else {
      // Fallback to window scroll
      this.scrollSubscription = fromEvent(window, 'scroll')
        .pipe(throttleTime(100))
        .subscribe(() => {
          this.updateActiveSection();
        });
    }

    // Initial check after a delay to ensure DOM is ready
    setTimeout(() => {
      const container = document.querySelector('.infinite-scroll-container') as HTMLElement;
      if (container) {
        this.updateActiveSection(container);
      } else {
        this.updateActiveSection();
      }
    }, 500);
  }

  private updateActiveSection(scrollContainer?: HTMLElement): void {
    const scrollPosition = scrollContainer 
      ? scrollContainer.scrollTop + 200
      : window.scrollY + 200; // Offset for better detection
    let currentSection = 'profile';

    for (const section of this.sections) {
      const element = document.getElementById(section);
      if (element) {
        const container = scrollContainer || document.documentElement;
        const containerRect = container.getBoundingClientRect();
        const elementRect = element.getBoundingClientRect();
        
        // Calculate relative position within the scroll container
        const relativeTop = scrollContainer 
          ? element.offsetTop
          : elementRect.top + (window.pageYOffset || document.documentElement.scrollTop);
        
        const relativeBottom = relativeTop + element.offsetHeight;
        
        if (scrollPosition >= relativeTop && scrollPosition < relativeBottom) {
          currentSection = section;
          break;
        }
      }
    }

    // Check if we're at the top
    const currentScroll = scrollContainer ? scrollContainer.scrollTop : window.scrollY;
    if (currentScroll < 100) {
      currentSection = 'profile';
    }

    // Check if we're at the bottom
    const lastSection = this.sections[this.sections.length - 1];
    const lastElement = document.getElementById(lastSection);
    if (lastElement) {
      const container = scrollContainer || document.documentElement;
      const containerHeight = scrollContainer ? scrollContainer.scrollHeight : document.documentElement.scrollHeight;
      const viewportHeight = scrollContainer ? scrollContainer.clientHeight : window.innerHeight;
      const scrollTop = scrollContainer ? scrollContainer.scrollTop : window.scrollY;
      
      if (scrollTop + viewportHeight >= containerHeight - 100) {
        currentSection = lastSection;
      }
    }

    if (this.activeSection() !== currentSection) {
      this.activeSection.set(currentSection);
    }
  }

  scrollToSection(section: string): void {
    const element = document.getElementById(section);
    const scrollContainer = document.querySelector('.infinite-scroll-container') as HTMLElement;
    
    if (element) {
      if (scrollContainer) {
        // Scroll within the container
        const offset = 100;
        const containerRect = scrollContainer.getBoundingClientRect();
        const elementRect = element.getBoundingClientRect();
        const scrollTop = scrollContainer.scrollTop;
        const elementTop = elementRect.top - containerRect.top + scrollTop;
        
        scrollContainer.scrollTo({
          top: elementTop - offset,
          behavior: 'smooth'
        });
      } else {
        // Fallback to window scroll
        const offset = 100;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  }

  ngOnDestroy(): void {
    if (this.scrollSubscription) {
      this.scrollSubscription.unsubscribe();
    }
  }
}

