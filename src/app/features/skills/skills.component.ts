import { Component, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentService } from '../../core/services/content.service';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { FadeInDirective } from '../../shared/directives/fade-in.directive';

@Component({
  selector: 'app-skills',
  imports: [CommonModule, CardModule, TagModule, FadeInDirective],
  template: `
    <div class="skills-container">
      <div class="section-header" appFadeIn>
        <h2 class="section-title">
          <i class="pi pi-star section-icon"></i>
          Skills & Expertise
        </h2>
        <p class="section-subtitle">Technologies I work with</p>
      </div>
      
      @if (skills().length > 0) {
        <div class="skills-grid" appFadeIn>
          @for (skillGroup of skills(); track skillGroup.id) {
            <p-card class="skill-category-card" [style.--category-color]="getCategoryColor(skillGroup.color)">
              <ng-template pTemplate="header">
                <div class="card-header" [style.background]="getCategoryGradient(skillGroup.color)">
                  <div class="header-content">
                    <i [class]="skillGroup.icon || 'pi pi-tag'" class="category-icon"></i>
                    <h3 class="category-title">{{ skillGroup.category }}</h3>
                  </div>
                </div>
              </ng-template>
              <div class="card-body">
                @if (skillGroup.subdivisions && skillGroup.subdivisions.length > 0) {
                  @for (subdivision of skillGroup.subdivisions; track subdivision.title) {
                    <div class="subdivision-section">
                      <h4 class="subdivision-title">{{ subdivision.title }}</h4>
                      <div class="skills-list">
                        @for (skill of subdivision.items; track skill.key; let i = $index) {
                          <div class="skill-item" [style.animation-delay]="(i * 0.05) + 's'">
                            <div class="skill-content">
                              @if (skill.image) {
                                <img [src]="skill.image" [alt]="skill.name" class="skill-image" />
                              } @else if (skill.icon) {
                                <i [class]="skill.icon" class="skill-icon-class"></i>
                              } @else {
                                <span class="skill-icon">{{ getSkillIcon(skill.name) }}</span>
                              }
                              <span class="skill-name">{{ skill.name }}</span>
                              <p-tag 
                                [value]="skill.level" 
                                [severity]="getLevelSeverity(skill.level)"
                                [styleClass]="'skill-level-tag'"
                              ></p-tag>
                            </div>
                          </div>
                        }
                      </div>
                    </div>
                  }
                } @else if (skillGroup.items && skillGroup.items.length > 0) {
                  <div class="skills-list">
                    @for (skill of skillGroup.items; track skill.key; let i = $index) {
                      <div class="skill-item" [style.animation-delay]="(i * 0.05) + 's'">
                        <div class="skill-content">
                          @if (skill.image) {
                            <img [src]="skill.image" [alt]="skill.name" class="skill-image" />
                          } @else if (skill.icon) {
                            <i [class]="skill.icon" class="skill-icon-class"></i>
                          } @else {
                            <span class="skill-icon">{{ getSkillIcon(skill.name) }}</span>
                          }
                          <span class="skill-name">{{ skill.name }}</span>
                          <p-tag 
                            [value]="skill.level" 
                            [severity]="getLevelSeverity(skill.level)"
                            [styleClass]="'skill-level-tag'"
                          ></p-tag>
                        </div>
                      </div>
                    }
                  </div>
                }
              </div>
            </p-card>
          }
        </div>
      } @else {
        <div class="empty-state">
          <i class="pi pi-info-circle"></i>
          <p>No skills data available.</p>
        </div>
      }
    </div>
  `,
  styles: [`
    .skills-container {
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
      background: linear-gradient(135deg, #fa709a, #fee140);
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
      color: #fa709a;
      filter: drop-shadow(0 0 10px rgba(250, 112, 154, 0.5));
    }
    
    .section-subtitle {
      font-size: 1.25rem;
      color: rgba(255, 255, 255, 0.7);
      margin: 0;
    }
    
    .skills-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 2.5rem;
      max-width: 1400px;
      margin: 0 auto;
    }
    
    .skill-category-card {
      background: rgba(255, 255, 255, 0.05) !important;
      border: 1px solid rgba(255, 255, 255, 0.1) !important;
      border-radius: 1.5rem !important;
      overflow: hidden !important;
      backdrop-filter: blur(10px) !important;
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
      animation: card-float 6s ease-in-out infinite;
      position: relative;
      
      &:hover {
        animation-play-state: paused !important;
        transform: translateY(-15px) scale(1.02) !important;
        box-shadow: 0 30px 60px rgba(0, 0, 0, 0.5) !important;
        border-color: var(--category-color, #fa709a) !important;
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
    
    .card-header {
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
      gap: 1rem;
    }
    
    .category-icon {
      font-size: 2.5rem;
      color: white;
      filter: drop-shadow(0 2px 10px rgba(0, 0, 0, 0.3));
    }
    
    .category-title {
      font-size: 1.75rem;
      font-weight: 700;
      color: white;
      margin: 0;
      text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    }
    
    .card-body {
      padding: 2rem;
    }
    
    .subdivision-section {
      margin-bottom: 2rem;
      
      &:last-child {
        margin-bottom: 0;
      }
    }
    
    .subdivision-title {
      font-size: 1rem;
      font-weight: 600;
      color: rgba(255, 255, 255, 0.7);
      margin: 0 0 1rem 0;
      padding-bottom: 0.5rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    .skills-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    
    .skill-item {
      animation: slideInUp 0.6s ease-out both;
      position: relative;
      z-index: 1;
    }
    
    @keyframes slideInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .skill-content {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 0.75rem 1rem;
      background: rgba(255, 255, 255, 0.03);
      border-radius: 0.75rem;
      border: 1px solid rgba(255, 255, 255, 0.05);
      transition: all 0.3s ease;
      cursor: pointer;
      position: relative;
      z-index: 2;
      
      &:hover {
        background: rgba(255, 255, 255, 0.06);
        border-color: var(--category-color, #fa709a);
        transform: translateX(5px);
        z-index: 10;
      }
      
      &:active {
        transform: translateX(3px) scale(0.98);
      }
    }
    
    .skill-icon {
      font-size: 1.5rem;
      line-height: 1;
      flex-shrink: 0;
    }
    
    .skill-icon-class {
      font-size: 1.5rem;
      line-height: 1;
      flex-shrink: 0;
      color: rgba(255, 255, 255, 0.8);
    }
    
    .skill-image {
      width: 1.5rem;
      height: 1.5rem;
      object-fit: contain;
      flex-shrink: 0;
    }
    
    .skill-name {
      font-size: 1rem;
      font-weight: 500;
      color: rgba(255, 255, 255, 0.9);
      flex: 1;
    }
    
    ::ng-deep .skill-level-tag {
      font-weight: 600 !important;
      font-size: 0.75rem !important;
      padding: 0.35rem 0.75rem !important;
      border-radius: 1rem !important;
      text-transform: uppercase !important;
      letter-spacing: 0.5px !important;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2) !important;
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
      
      .skills-grid {
        grid-template-columns: 1fr;
        gap: 2rem;
      }
    }
  `]
})
export class SkillsComponent implements OnInit {
  skills = computed(() => {
    const content = this.contentService.portfolioContent();
    return content?.skills || [];
  });

  constructor(public contentService: ContentService) {}

  ngOnInit(): void {
    if (!this.contentService.portfolioContent()) {
      this.contentService.loadPortfolioContent();
    }
  }

  getSkillIcon(skill: string): string {
    const skillIcons: Record<string, string> = {
      'HTML': '🌐', 'html': '🌐', 'HTML5': '🌐',
      'CSS': '🎨', 'css': '🎨', 'CSS3': '🎨',
      'JavaScript': '⚡', 'javascript': '⚡', 'JS': '⚡',
      'TypeScript': '📘', 'typescript': '📘', 'TS': '📘',
      'Angular': '🅰️', 'angular': '🅰️',
      'React': '⚛️', 'react': '⚛️',
      'Vue': '💚', 'vue': '💚',
      'Node.js': '🟢', 'node': '🟢', 'Node': '🟢',
      'Python': '🐍', 'python': '🐍',
      'Java': '☕', 'java': '☕',
      'C++': '⚙️', 'C#': '🔷',
      'Git': '📦', 'git': '📦',
      'Docker': '🐳', 'docker': '🐳',
      'AWS': '☁️', 'aws': '☁️',
      'RxJS': '⚡', 'rxjs': '⚡',
      'SCSS': '🎨', 'scss': '🎨', 'SASS': '🎨',
      'PostgreSQL': '🐘', 'postgresql': '🐘',
      'MongoDB': '🍃', 'mongodb': '🍃',
      'Express': '🚂', 'express': '🚂',
      'Firebase': '🔥', 'firebase': '🔥',
      'Jest': '🧪', 'jest': '🧪',
      'Karma': '⚡', 'karma': '⚡',
      'Webpack': '📦', 'webpack': '📦'
    };
    
    return skillIcons[skill] || '💼';
  }

  getLevelSeverity(level: string): "success" | "secondary" | "info" | "warn" | "danger" | "contrast" | null | undefined {
    switch (level) {
      case 'Advanced':
        return 'success';
      case 'Intermediate':
        return 'warn';
      case 'Beginner':
        return 'info';
      default:
        return 'secondary';
    }
  }

  getCategoryColor(color?: string): string {
    const colors: Record<string, string> = {
      '#e74c3c': '#e74c3c',
      '#3498db': '#3498db',
      '#2ecc71': '#2ecc71',
      '#f39c12': '#f39c12',
      '#9b59b6': '#9b59b6',
      '#1abc9c': '#1abc9c'
    };
    
    return colors[color || '#fa709a'] || '#fa709a';
  }

  getCategoryGradient(color?: string): string {
    const gradients: Record<string, string> = {
      '#e74c3c': 'linear-gradient(135deg, #e74c3c, #c0392b)',
      '#3498db': 'linear-gradient(135deg, #3498db, #2980b9)',
      '#2ecc71': 'linear-gradient(135deg, #2ecc71, #27ae60)',
      '#f39c12': 'linear-gradient(135deg, #f39c12, #e67e22)',
      '#9b59b6': 'linear-gradient(135deg, #9b59b6, #8e44ad)',
      '#1abc9c': 'linear-gradient(135deg, #1abc9c, #16a085)'
    };
    
    return gradients[color || '#fa709a'] || 'linear-gradient(135deg, #fa709a, #fee140)';
  }
}
