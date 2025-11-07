import { Component, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentService } from '../../core/services/content.service';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { FadeInDirective } from '../../shared/directives/fade-in.directive';

@Component({
  selector: 'app-certifications',
  imports: [CommonModule, CardModule, TagModule, FadeInDirective],
  template: `
    <div class="certifications-container">
      <div class="section-header" appFadeIn>
        <h2 class="section-title">
          <i class="pi pi-certificate section-icon"></i>
          Certifications
        </h2>
        <p class="section-subtitle">Professional certifications and credentials</p>
      </div>
      
      @if (certifications().length > 0) {
        <div class="certifications-grid" appFadeIn>
          @for (cert of certifications(); track cert.id; let i = $index) {
            <p-card class="certification-card" [style.--cert-color]="getCertColor(i)">
              <ng-template pTemplate="header">
                <div class="card-header-gradient" [style.background]="getCertGradient(i)">
                  <div class="header-content">
                    <div class="cert-icon-wrapper">
                      <i [class]="cert.icon || 'pi pi-certificate'"></i>
                    </div>
                    <div class="cert-header-text">
                      <h3 class="cert-title">{{ cert.title }}</h3>
                    </div>
                  </div>
                </div>
              </ng-template>
              <div class="card-body">
                @if (cert.description) {
                  <p class="cert-description">{{ cert.description }}</p>
                }
                <div class="cert-meta">
                  @if (cert.date) {
                    <div class="cert-date">
                      <i class="pi pi-calendar"></i>
                      <span>{{ formatDate(cert.date) }}</span>
                    </div>
                  }
                </div>
              </div>
            </p-card>
          }
        </div>
      } @else {
        <div class="empty-state">
          <i class="pi pi-info-circle"></i>
          <p>No certifications data available.</p>
        </div>
      }
    </div>
  `,
  styles: [`
    .certifications-container {
      position: relative;
      width: 100%;
      padding: 4rem 2rem;
    }
    
    .section-header {
      text-align: center;
      margin-bottom: 4rem;
    }
    
    .section-title {
      font-size: 3.5rem;
      font-weight: 900;
      margin-bottom: 1rem;
      background: linear-gradient(135deg, #00f2fe, #4facfe);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
    }
    
    .section-icon {
      font-size: 3rem;
      color: #00f2fe;
      filter: drop-shadow(0 0 10px rgba(0, 242, 254, 0.5));
    }
    
    .section-subtitle {
      font-size: 1.25rem;
      color: rgba(255, 255, 255, 0.7);
      margin: 0;
    }
    
    .certifications-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
      gap: 2.5rem;
      max-width: 1400px;
      margin: 0 auto;
    }
    
    .certification-card {
      background: rgba(255, 255, 255, 0.05) !important;
      border: 1px solid rgba(255, 255, 255, 0.1) !important;
      border-radius: 1.5rem !important;
      overflow: hidden !important;
      backdrop-filter: blur(10px) !important;
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
      animation: card-float 9s ease-in-out infinite;
      
      &:hover {
        transform: translateY(-15px) scale(1.02) !important;
        box-shadow: 0 30px 60px rgba(0, 0, 0, 0.5) !important;
        border-color: var(--cert-color, #00f2fe) !important;
      }
    }
    
    @keyframes card-float {
      0%, 100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-10px);
      }
    }
    
    .card-header-gradient {
      padding: 2rem;
      position: relative;
      overflow: hidden;
      
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: inherit;
        opacity: 0.8;
        filter: blur(20px);
      }
    }
    
    .header-content {
      position: relative;
      z-index: 1;
      display: flex;
      align-items: center;
      gap: 1.5rem;
    }
    
    .cert-icon-wrapper {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 2rem;
      flex-shrink: 0;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    }
    
    .cert-header-text {
      flex: 1;
    }
    
    .cert-title {
      font-size: 1.75rem;
      font-weight: 700;
      color: white;
      margin: 0;
      text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    }
    
    .card-body {
      padding: 2rem;
    }
    
    .cert-description {
      color: rgba(255, 255, 255, 0.85);
      line-height: 1.8;
      margin-bottom: 1.5rem;
      font-size: 1.05rem;
    }
    
    .cert-meta {
      display: flex;
      flex-wrap: wrap;
      gap: 1.5rem;
      margin-top: 1.5rem;
      padding-top: 1.5rem;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .cert-date {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      color: rgba(255, 255, 255, 0.7);
      font-size: 0.95rem;
      
      i {
        color: #00f2fe;
        font-size: 1.25rem;
      }
    }
    
    .empty-state {
      text-align: center;
      padding: 4rem 2rem;
      color: rgba(255, 255, 255, 0.6);
      
      i {
        font-size: 4rem;
        margin-bottom: 1rem;
        color: rgba(255, 255, 255, 0.3);
      }
      
      p {
        font-size: 1.25rem;
        margin: 0;
      }
    }
    
    @media (max-width: 768px) {
      .section-title {
        font-size: 2.5rem;
        flex-direction: column;
      }
      
      .section-icon {
        font-size: 2.5rem;
      }
      
      .certifications-grid {
        grid-template-columns: 1fr;
        gap: 2rem;
      }
    }
  `]
})
export class CertificationsComponent implements OnInit {
  certifications = computed(() => {
    // For now, we'll use achievements as certifications
    // In a real app, you'd have a separate certifications field
    const content = this.contentService.portfolioContent();
    return content?.achievements || [];
  });

  constructor(public contentService: ContentService) {}

  ngOnInit(): void {
    if (!this.contentService.portfolioContent()) {
      this.contentService.loadPortfolioContent();
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  }

  getCertColor(index: number): string {
    const colors = ['#00f2fe', '#4facfe', '#667eea', '#764ba2', '#43e97b', '#38f9d7'];
    return colors[index % colors.length];
  }

  getCertGradient(index: number): string {
    const gradients = [
      'linear-gradient(135deg, #00f2fe, #4facfe)',
      'linear-gradient(135deg, #4facfe, #00f2fe)',
      'linear-gradient(135deg, #667eea, #764ba2)',
      'linear-gradient(135deg, #764ba2, #667eea)',
      'linear-gradient(135deg, #43e97b, #38f9d7)',
      'linear-gradient(135deg, #38f9d7, #43e97b)'
    ];
    return gradients[index % gradients.length];
  }
}
