import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appFadeIn]',
  standalone: true
})
export class FadeInDirective implements OnInit {
  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.renderer.setStyle(this.el.nativeElement, 'opacity', '0');
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'translateY(30px)');
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'opacity 0.6s ease, transform 0.6s ease');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.renderer.setStyle(this.el.nativeElement, 'opacity', '1');
            this.renderer.setStyle(this.el.nativeElement, 'transform', 'translateY(0)');
            observer.unobserve(this.el.nativeElement);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(this.el.nativeElement);
  }
}

