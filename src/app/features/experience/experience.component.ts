import { Component, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentService } from '../../core/services/content.service';
import { CardModule } from 'primeng/card';
import { ChipModule } from 'primeng/chip';
import { TimelineModule } from 'primeng/timeline';
import { FadeInDirective } from '../../shared/directives/fade-in.directive';

@Component({
  selector: 'app-experience',
  imports: [CommonModule, CardModule, ChipModule, TimelineModule, FadeInDirective],
  template: `
    <div class="experience-container">
      <div class="section-header" appFadeIn>
        <h2 class="section-title">
          <i class="pi pi-briefcase section-icon"></i>
          Professional Experience
        </h2>
        <p class="section-subtitle">My journey through the tech industry</p>
      </div>
      
      @if (experience().length > 0) {
        <div class="timeline-wrapper" appFadeIn>
          <p-timeline [value]="timelineEvents()" align="alternate" styleClass="custom-timeline">
            <ng-template pTemplate="content" let-event>
              <p-card class="timeline-card">
                <ng-template pTemplate="header">
                  <div class="card-header-gradient" [style.background]="getGradientForIndex(event.index)">
                    <div class="card-header-content">
                      <h3 class="position-title">{{ event.position }}</h3>
                      <span class="company-name">{{ event.company }}</span>
                    </div>
                  </div>
                </ng-template>
                <div class="card-body">
                  <div class="date-range">
                    <i class="pi pi-calendar"></i>
                    <span>
                      {{ formatDate(event.startDate) }} - 
                      @if (event.current) {
                        <span class="badge-current">Present</span>
                      } @else if (event.endDate) {
                        {{ formatDate(event.endDate) }}
                      }
                    </span>
                  </div>
                  <p class="description">{{ event.description }}</p>
                  @if (event.technologies && event.technologies.length > 0) {
                    <div class="technologies">
                      <div class="tech-label">
                        <i class="pi pi-code"></i>
                        Technologies:
                      </div>
                      <div class="tech-chips">
                        @for (tech of event.technologies; track tech) {
                          <p-chip [label]="tech" styleClass="tech-chip"></p-chip>
                        }
                      </div>
                    </div>
                  }
                </div>
              </p-card>
            </ng-template>
            <ng-template pTemplate="marker" let-event>
              <div class="timeline-marker" [style.background]="getGradientForIndex(event.index)">
                <i class="pi pi-briefcase"></i>
              </div>
            </ng-template>
          </p-timeline>
        </div>
      } @else {
        <div class="empty-state">
          <i class="pi pi-info-circle"></i>
          <p>No experience data available.</p>
        </div>
      }
    </div>
  `,
  styles: [`
    .experience-container {
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
      background: linear-gradient(135deg, #4facfe, #00f2fe);
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
      color: #4facfe;
      filter: drop-shadow(0 0 10px rgba(79, 172, 254, 0.5));
    }
    
    .section-subtitle {
      font-size: 1.25rem;
      color: rgba(255, 255, 255, 0.7);
      margin: 0;
    }
    
    .timeline-wrapper {
      position: relative;
      max-width: 1200px;
      margin: 0 auto;
    }
    
    ::ng-deep .custom-timeline {
      .p-timeline-event {
        padding: 2rem 0;
      }
      
      .p-timeline-event-content {
        padding: 0 2rem;
      }
      
      .p-timeline-event:nth-child(even) .p-timeline-event-content {
        text-align: left;

        .date-range, .tech-label, .description, .card-header-content {
          justify-content: flex-start;
          text-align: left;
        }
      }
    }
    
    .timeline-card {
      background: rgba(255, 255, 255, 0.05) !important;
      border: 1px solid rgba(255, 255, 255, 0.1) !important;
      border-radius: 1.5rem !important;
      overflow: hidden !important;
      backdrop-filter: blur(10px) !important;
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
      
      &:hover {
        transform: translateY(-10px) scale(1.02) !important;
        box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4) !important;
        border-color: rgba(79, 172, 254, 0.5) !important;
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
    
    .card-header-content {
      position: relative;
      z-index: 1;
    }
    
    .position-title {
      font-size: 1.75rem;
      font-weight: 700;
      color: white;
      margin: 0 0 0.5rem 0;
      text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    }
    
    .company-name {
      font-size: 1.25rem;
      color: rgba(255, 255, 255, 0.9);
      font-weight: 500;
    }
    
    .card-body {
      padding: 2rem;
    }
    
    .date-range {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      color: rgba(255, 255, 255, 0.7);
      margin-bottom: 1.5rem;
      font-size: 1rem;

      &:nth-child(even) {
        justify-content: flex-end;
      }
      
      i {
        color: #4facfe;
        font-size: 1.25rem;
      }
    }
    
    .badge-current {
      background: linear-gradient(135deg, #43e97b, #38f9d7);
      color: #1a1a1a;
      padding: 0.35rem 1rem;
      border-radius: 1rem;
      font-weight: 700;
      font-size: 0.9rem;
      margin-left: 0.5rem;
      box-shadow: 0 4px 15px rgba(67, 233, 123, 0.4);
    }
    
    .description {
      color: rgba(255, 255, 255, 0.85);
      line-height: 1.8;
      margin-bottom: 1.5rem;
      font-size: 1.05rem;
    }
    
    .technologies {
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
        color: #4facfe;
      }
    }
    
    .tech-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
    }
    
    ::ng-deep .tech-chip {
      background: linear-gradient(135deg, rgba(79, 172, 254, 0.2), rgba(0, 242, 254, 0.2)) !important;
      color: inherit !important;
      border: 1px solid rgba(79, 172, 254, 0.3) !important;
      font-weight: 500 !important;
      padding: 0.5rem 1rem !important;
      transition: all 0.3s ease !important;
      
      &:hover {
        background: linear-gradient(135deg, #4facfe, #00f2fe) !important;
        color: white !important;
        transform: translateY(-3px) !important;
        box-shadow: 0 5px 15px rgba(79, 172, 254, 0.4) !important;
      }
    }
    
    .timeline-marker {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 1.5rem;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
      border: 4px solid rgba(255, 255, 255, 0.1);
      animation: marker-pulse 2s ease-in-out infinite;
    }
    
    @keyframes marker-pulse {
      0%, 100% {
        transform: scale(1);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
      }
      50% {
        transform: scale(1.1);
        box-shadow: 0 15px 40px rgba(79, 172, 254, 0.6);
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
      
      .timeline-card {
        margin: 0 1rem !important;
      }
      
      ::ng-deep .custom-timeline {
        .p-timeline-event-content {
          padding: 0 1rem;
        }
      }
    }
  `]
})
export class ExperienceComponent implements OnInit {
  experience = computed(() => {
    const content = this.contentService.portfolioContent();
    return content?.experience || [];
  });

  timelineEvents = computed(() => {
    return this.experience().map((exp, index) => ({
      ...exp,
      index
    }));
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

  getGradientForIndex(index: number): string {
    const gradients = [
      'linear-gradient(135deg, #4facfe, #00f2fe)',
      'linear-gradient(135deg, #667eea, #764ba2)',
      'linear-gradient(135deg, #f093fb, #f5576c)',
      'linear-gradient(135deg, #43e97b, #38f9d7)',
      'linear-gradient(135deg, #fa709a, #fee140)',
      'linear-gradient(135deg, #ffc107, #ff9800)'
    ];
    return gradients[index % gradients.length];
  }
}
