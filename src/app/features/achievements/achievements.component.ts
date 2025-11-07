import { Component, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentService } from '../../core/services/content.service';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { FadeInDirective } from '../../shared/directives/fade-in.directive';

@Component({
  selector: 'app-achievements',
  imports: [CommonModule, CardModule, TagModule, FadeInDirective],
  template: `
    <div class="achievements-container">
      <div class="section-header" appFadeIn>
        <h2 class="section-title">
          <i class="pi pi-trophy section-icon"></i>
          Achievements
        </h2>
        <p class="section-subtitle">Milestones and accomplishments</p>
      </div>
      
      @if (achievements().length > 0) {
        <div class="achievements-grid" appFadeIn>
          @for (achievement of achievements(); track achievement.id; let i = $index) {
            <p-card class="achievement-card" [style.--achievement-color]="getAchievementColor(i)">
              <div class="card-content">
                <div class="achievement-icon-wrapper" [style.background]="getAchievementGradient(i)">
                  <i [class]="achievement.icon || 'pi pi-trophy'"></i>
                </div>
                <div class="achievement-body">
                  <h3 class="achievement-title">{{ achievement.title }}</h3>
                  <p class="achievement-description">{{ achievement.description }}</p>
                  <div class="achievement-date">
                    <i class="pi pi-calendar"></i>
                    <span>{{ formatDate(achievement.date) }}</span>
                  </div>
                </div>
              </div>
            </p-card>
          }
        </div>
      } @else {
        <div class="empty-state">
          <i class="pi pi-info-circle"></i>
          <p>No achievements data available.</p>
        </div>
      }
    </div>
  `,
  styles: [`
    .achievements-container {
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
      background: linear-gradient(135deg, #ffc107, #ff9800);
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
      color: #ffc107;
      filter: drop-shadow(0 0 10px rgba(255, 193, 7, 0.5));
    }
    
    .section-subtitle {
      font-size: 1.25rem;
      color: rgba(255, 255, 255, 0.7);
      margin: 0;
    }
    
    .achievements-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 2.5rem;
      max-width: 1400px;
      margin: 0 auto;
    }
    
    .achievement-card {
      background: rgba(255, 255, 255, 0.05) !important;
      border: 1px solid rgba(255, 255, 255, 0.1) !important;
      border-radius: 1.5rem !important;
      overflow: hidden !important;
      backdrop-filter: blur(10px) !important;
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
      animation: card-float 8s ease-in-out infinite;
      
      &:hover {
        transform: translateY(-20px) scale(1.05) !important;
        box-shadow: 0 35px 70px rgba(0, 0, 0, 0.5) !important;
        border-color: var(--achievement-color, #ffc107) !important;
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
    
    .card-content {
      padding: 2.5rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }
    
    .achievement-icon-wrapper {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 3rem;
      margin-bottom: 2rem;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
      animation: icon-pulse 2s ease-in-out infinite;
    }
    
    @keyframes icon-pulse {
      0%, 100% {
        transform: scale(1);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
      }
      50% {
        transform: scale(1.1);
        box-shadow: 0 15px 40px rgba(255, 193, 7, 0.5);
      }
    }
    
    .achievement-body {
      flex: 1;
      width: 100%;
    }
    
    .achievement-title {
      font-size: 1.75rem;
      font-weight: 700;
      color: white;
      margin-bottom: 1rem;
      background: linear-gradient(135deg, #ffc107, #ff9800);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    .achievement-description {
      color: rgba(255, 255, 255, 0.85);
      line-height: 1.8;
      margin-bottom: 1.5rem;
      font-size: 1.05rem;
    }
    
    .achievement-date {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.75rem;
      color: rgba(255, 255, 255, 0.7);
      font-size: 0.95rem;
      
      i {
        color: #ffc107;
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
      
      .achievements-grid {
        grid-template-columns: 1fr;
        gap: 2rem;
      }
    }
  `]
})
export class AchievementsComponent implements OnInit {
  achievements = computed(() => {
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

  getAchievementColor(index: number): string {
    const colors = ['#ffc107', '#ff9800', '#f5576c', '#f093fb', '#43e97b', '#4facfe'];
    return colors[index % colors.length];
  }

  getAchievementGradient(index: number): string {
    const gradients = [
      'linear-gradient(135deg, #ffc107, #ff9800)',
      'linear-gradient(135deg, #ff9800, #ffc107)',
      'linear-gradient(135deg, #f5576c, #f093fb)',
      'linear-gradient(135deg, #f093fb, #f5576c)',
      'linear-gradient(135deg, #43e97b, #38f9d7)',
      'linear-gradient(135deg, #4facfe, #00f2fe)'
    ];
    return gradients[index % gradients.length];
  }
}
