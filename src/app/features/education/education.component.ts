import { Component, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentService } from '../../core/services/content.service';
import { CardModule } from 'primeng/card';
import { ChipModule } from 'primeng/chip';
import { FadeInDirective } from '../../shared/directives/fade-in.directive';

@Component({
  selector: 'app-education',
  imports: [CommonModule, CardModule, ChipModule, FadeInDirective],
  template: `
    <div class="education-container">
      <div class="section-header" appFadeIn>
        <h2 class="section-title">
          <i class="pi pi-book section-icon"></i>
          Education
        </h2>
        <p class="section-subtitle">My academic journey</p>
      </div>
      
      @if (education().length > 0) {
        <div class="education-grid" appFadeIn>
          @for (edu of education(); track edu.id; let i = $index) {
            <p-card class="education-card" [style.--card-color]="getCardColor(i)">
              <ng-template pTemplate="header">
                <div class="card-header-gradient" [style.background]="getCardGradient(i)">
                  <div class="header-content">
                    <div class="education-icon-wrapper">
                      <i class="pi pi-graduation-cap"></i>
                    </div>
                    <div class="education-header-text">
                      <h3 class="degree-title">{{ edu.position }}</h3>
                      <p class="institution-name">{{ edu.company }}</p>
                    </div>
                  </div>
                </div>
              </ng-template>
              <div class="card-body">
                <div class="education-period">
                  <i class="pi pi-calendar"></i>
                  <span>
                    {{ formatDate(edu.startDate) }} - 
                    @if (edu.endDate) {
                      {{ formatDate(edu.endDate) }}
                    } @else {
                      <span class="badge-ongoing">Ongoing</span>
                    }
                  </span>
                </div>
                @if (edu.description) {
                  <p class="education-description">{{ edu.description }}</p>
                }
                @if (edu.technologies && edu.technologies.length > 0) {
                  <div class="education-tech">
                    <div class="tech-label">
                      <i class="pi pi-code"></i>
                      Related Technologies:
                    </div>
                    <div class="tech-chips">
                      @for (tech of edu.technologies; track tech) {
                        <p-chip [label]="tech" styleClass="tech-chip"></p-chip>
                      }
                    </div>
                  </div>
                }
              </div>
            </p-card>
          }
        </div>
      } @else {
        <div class="empty-state">
          <i class="pi pi-info-circle"></i>
          <p>No education data available.</p>
        </div>
      }
    </div>
  `,
  styles: [`
    .education-container {
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
      background: linear-gradient(135deg, #43e97b, #38f9d7);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
    }
    
    .section-icon {
      font-size: 4rem;
    }
    
    .section-subtitle {
      font-size: 1.25rem;
      color: rgba(255, 255, 255, 0.7);
      margin: 0;
      text-align: center;
    }
    
    .education-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 2.5rem;
      max-width: 1400px;
      margin: 0 auto;
    }
    
    .education-card {
      background: rgba(255, 255, 255, 0.05) !important;
      border: 1px solid rgba(255, 255, 255, 0.1) !important;
      border-radius: 1.5rem !important;
      overflow: hidden !important;
      backdrop-filter: blur(10px) !important;
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
      animation: card-float 7s ease-in-out infinite;
      
      &:hover {
        transform: translateY(-15px) scale(1.02) !important;
        box-shadow: 0 30px 60px rgba(0, 0, 0, 0.5) !important;
        border-color: var(--card-color, #43e97b) !important;
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
    
    .education-icon-wrapper {
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

      .pi {
        font-size: 2.5rem;
      }
    }
    
    .education-header-text {
      flex: 1;
    }
    
    .degree-title {
      font-size: 1.75rem;
      font-weight: 700;
      color: white;
      margin: 0 0 0.5rem 0;
      text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    }
    
    .institution-name {
      font-size: 1.25rem;
      color: rgba(255, 255, 255, 0.9);
      margin: 0;
      font-weight: 500;
    }
    
    .card-body {
      padding: 2rem;
    }
    
    .education-period {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      color: rgba(255, 255, 255, 0.7);
      margin-bottom: 1.5rem;
      font-size: 1rem;
      
      i {
        color: #43e97b;
        font-size: 1.25rem;
      }
    }
    
    .badge-ongoing {
      background: linear-gradient(135deg, #43e97b, #38f9d7);
      color: #1a1a1a;
      padding: 0.35rem 1rem;
      border-radius: 1rem;
      font-weight: 700;
      font-size: 0.9rem;
      margin-left: 0.5rem;
      box-shadow: 0 4px 15px rgba(67, 233, 123, 0.4);
    }
    
    .education-description {
      color: rgba(255, 255, 255, 0.85);
      line-height: 1.8;
      margin-bottom: 1.5rem;
      font-size: 1.05rem;
    }
    
    .education-tech {
      margin-top: 1.5rem;
      padding-top: 1.5rem;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .tech-label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: rgba(255, 255, 255, 0.7);
      margin-bottom: 1rem;
      font-size: 0.95rem;
      font-weight: 600;
      
      i {
        color: #43e97b;
      }
    }
    
    .tech-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
    }
    
    ::ng-deep .tech-chip {
      background: linear-gradient(135deg, rgba(67, 233, 123, 0.2), rgba(56, 249, 215, 0.2)) !important;
      color: inherit !important;
      border: 1px solid rgba(67, 233, 123, 0.3) !important;
      font-weight: 500 !important;
      transition: all 0.3s ease !important;
      
      &:hover {
        background: linear-gradient(135deg, #43e97b, #38f9d7) !important;
        color: #1a1a1a !important;
        transform: translateY(-3px) !important;
        box-shadow: 0 5px 15px rgba(67, 233, 123, 0.4) !important;
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
      
      .education-grid {
        grid-template-columns: 1fr;
        gap: 2rem;
      }
    }
  `]
})
export class EducationComponent implements OnInit {
  education = computed(() => {
    const content = this.contentService.portfolioContent();
    return content?.education || [];
  });

  constructor(public contentService: ContentService) {}

  ngOnInit(): void {
    if (!this.contentService.portfolioContent()) {
      this.contentService.loadPortfolioContent();
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  }

  getCardColor(index: number): string {
    const colors = ['#43e97b', '#38f9d7', '#4facfe', '#00f2fe', '#667eea', '#764ba2'];
    return colors[index % colors.length];
  }

  getCardGradient(index: number): string {
    const gradients = [
      'linear-gradient(135deg, #43e97b, #38f9d7)',
      'linear-gradient(135deg, #38f9d7, #43e97b)',
      'linear-gradient(135deg, #4facfe, #00f2fe)',
      'linear-gradient(135deg, #00f2fe, #4facfe)',
      'linear-gradient(135deg, #667eea, #764ba2)',
      'linear-gradient(135deg, #764ba2, #667eea)'
    ];
    return gradients[index % gradients.length];
  }
}
