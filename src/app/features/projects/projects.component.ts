import { Component, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentService } from '../../core/services/content.service';
import { CarouselModule } from 'primeng/carousel';
import { CardModule } from 'primeng/card';
import { ChipModule } from 'primeng/chip';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { Project } from '../../core/models/portfolio.interface';

@Component({
  selector: 'app-projects',
  imports: [
    CommonModule, 
    CarouselModule, 
    CardModule, 
    ChipModule, 
    ButtonModule, 
    DialogModule,
    TagModule
  ],
  template: `
    <div class="projects-container">
      <div class="section-header">
        <h2 class="section-title">
          <i class="pi pi-folder section-icon"></i>
          Featured Projects
        </h2>
        <p class="section-subtitle">Some of my recent work</p>
      </div>
      
      @if (projects().length > 0) {
        <div class="projects-grid">
          @for (project of projects(); track project.id) {
            <p-card class="project-card" [style.--project-color]="getProjectColor($index)">
              <ng-template pTemplate="header">
                <div class="project-image-container">
                  @if (project.image) {
                    <img 
                      [src]="project.image" 
                      [alt]="project.title"
                      class="project-image"
                    />
                  } @else {
                    <div class="project-image-placeholder" [style.background]="getProjectGradient($index)">
                      <i class="pi pi-image"></i>
                    </div>
                  }
                  <div class="project-overlay">
                    <div class="overlay-content">
                      <p-button
                        icon="pi pi-eye"
                        label="View Details"
                        [styleClass]="'p-button-rounded p-button-lg overlay-btn'"
                        (onClick)="openProjectModal(project)"
                      ></p-button>
                    </div>
                  </div>
                  @if (project.featured) {
                    <p-tag value="Featured" severity="success" class="featured-badge"></p-tag>
                  }
                </div>
              </ng-template>
              <div class="card-body">
                <h3 class="project-title">{{ project.title }}</h3>
                <p class="project-description">{{ project.description }}</p>
                @if (project.technologies && project.technologies.length > 0) {
                  <div class="project-tech">
                    @for (tech of project.technologies.slice(0, 4); track tech) {
                      <p-chip [label]="tech" styleClass="tech-chip"></p-chip>
                    }
                    @if (project.technologies.length > 4) {
                      <p-chip [label]="'+' + (project.technologies.length - 4)" styleClass="tech-chip-more"></p-chip>
                    }
                  </div>
                }
                <div class="project-actions">
                  @if (project.link) {
                    <p-button
                      icon="pi pi-external-link"
                      label="Live Demo"
                      [styleClass]="'p-button-rounded p-button-outlined action-btn'"
                      (onClick)="openLink(project.link!)"
                    ></p-button>
                  }
                  @if (project.github) {
                    <p-button
                      icon="pi pi-github"
                      label="GitHub"
                      [styleClass]="'p-button-rounded p-button-outlined action-btn'"
                      (onClick)="openLink(project.github!)"
                    ></p-button>
                  }
                </div>
              </div>
            </p-card>
          }
        </div>
      } @else {
        <div class="empty-state">
          <i class="pi pi-info-circle"></i>
          <p>No projects available.</p>
        </div>
      }
      
      <!-- Project Modal -->
      <p-dialog 
        [visible]="isModalVisible()" 
        [modal]="true" 
        [style]="{width: '90vw', maxWidth: '900px'}"
        [styleClass]="'project-modal'"
        [draggable]="false"
        [resizable]="false"
      >
        <ng-template pTemplate="header">
          <div class="modal-header">
            <h3 class="modal-title">{{ selectedProject()?.title }}</h3>
            @if (selectedProject()?.featured) {
              <p-tag value="Featured" severity="success"></p-tag>
            }
          </div>
        </ng-template>
        @if (selectedProject(); as project) {
          <div class="modal-content">
            @if (project.image) {
              <div class="modal-image">
                <img [src]="project.image" [alt]="project.title" />
              </div>
            }
            <div class="modal-body">
              <p class="modal-description">{{ project.description }}</p>
              @if (project.technologies && project.technologies.length > 0) {
                <div class="modal-tech">
                  <h4>Technologies Used:</h4>
                  <div class="tech-list">
                    @for (tech of project.technologies; track tech) {
                      <p-chip [label]="tech" styleClass="tech-chip"></p-chip>
                    }
                  </div>
                </div>
              }
              <div class="modal-actions">
                @if (project.link) {
                  <p-button
                    icon="pi pi-external-link"
                    label="View Live Demo"
                    [styleClass]="'p-button-lg modal-action-btn'"
                    (onClick)="openLink(project.link!)"
                  ></p-button>
                }
                @if (project.github) {
                  <p-button
                    icon="pi pi-github"
                    label="View on GitHub"
                    [styleClass]="'p-button-lg p-button-outlined modal-action-btn'"
                    (onClick)="openLink(project.github!)"
                  ></p-button>
                }
              </div>
            </div>
          </div>
        }
      </p-dialog>
    </div>
  `,
  styles: [`
    .projects-container {
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
      background: linear-gradient(135deg, #764ba2, #667eea);
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
      color: #764ba2;
      filter: drop-shadow(0 0 10px rgba(118, 75, 162, 0.5));
    }
    
    .section-subtitle {
      font-size: 1.25rem;
      color: rgba(255, 255, 255, 0.7);
      margin: 0;
    }
    
    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
      gap: 2.5rem;
      max-width: 1400px;
      margin: 0 auto;
    }
    
    .project-card {
      background: rgba(255, 255, 255, 0.05) !important;
      border: 1px solid rgba(255, 255, 255, 0.1) !important;
      border-radius: 1.5rem !important;
      overflow: hidden !important;
      backdrop-filter: blur(10px) !important;
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
      animation: card-float 8s ease-in-out infinite;
      
      &:hover {
        transform: translateY(-20px) scale(1.03) !important;
        box-shadow: 0 35px 70px rgba(0, 0, 0, 0.5) !important;
        border-color: var(--project-color, #764ba2) !important;
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
    
    .project-image-container {
      position: relative;
      width: 100%;
      height: 250px;
      overflow: hidden;
      background: linear-gradient(135deg, rgba(118, 75, 162, 0.2), rgba(102, 126, 234, 0.2));
    }
    
    .project-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    
    .project-card:hover .project-image {
      transform: scale(1.2) rotate(2deg);
    }
    
    .project-image-placeholder {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: rgba(255, 255, 255, 0.5);
      font-size: 5rem;
    }
    
    .project-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(118, 75, 162, 0.95), rgba(102, 126, 234, 0.95));
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.3s ease;
      backdrop-filter: blur(5px);
    }
    
    .project-card:hover .project-overlay {
      opacity: 1;
    }
    
    .overlay-content {
      display: flex;
      gap: 1rem;
    }
    
    ::ng-deep .overlay-btn {
      background: rgba(255, 255, 255, 0.2) !important;
      border-color: white !important;
      color: white !important;
      
      &:hover {
        background: white !important;
        color: #764ba2 !important;
        transform: scale(1.1) !important;
      }
    }
    
    ::ng-deep .featured-badge {
      position: absolute !important;
      top: 1.5rem !important;
      right: 1.5rem !important;
      z-index: 2 !important;
      font-weight: 700 !important;
      padding: 0.5rem 1rem !important;
      border-radius: 1rem !important;
      box-shadow: 0 4px 15px rgba(67, 233, 123, 0.4) !important;
      animation: pulse-badge 2s ease-in-out infinite !important;
    }
    
    @keyframes pulse-badge {
      0%, 100% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.1);
      }
    }
    
    .card-body {
      padding: 2rem;
    }
    
    .project-title {
      font-size: 1.75rem;
      font-weight: 700;
      background: linear-gradient(135deg, #764ba2, #667eea);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 1rem;
    }
    
    .project-description {
      color: rgba(255, 255, 255, 0.85);
      line-height: 1.8;
      margin-bottom: 1.5rem;
      font-size: 1.05rem;
    }
    
    .project-tech {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
      margin-bottom: 1.5rem;
    }
    
    ::ng-deep .tech-chip {
      background: linear-gradient(135deg, rgba(118, 75, 162, 0.2), rgba(102, 126, 234, 0.2)) !important;
      color: inherit !important;
      border: 1px solid rgba(118, 75, 162, 0.3) !important;
      font-weight: 500 !important;
      transition: all 0.3s ease !important;
      
      &:hover {
        background: linear-gradient(135deg, #764ba2, #667eea) !important;
        color: white !important;
        transform: translateY(-3px) !important;
        box-shadow: 0 5px 15px rgba(118, 75, 162, 0.4) !important;
      }
    }
    
    ::ng-deep .tech-chip-more {
      background: rgba(255, 255, 255, 0.1) !important;
      color: rgba(255, 255, 255, 0.7) !important;
      border: 1px solid rgba(255, 255, 255, 0.2) !important;
    }
    
    .project-actions {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }
    
    ::ng-deep .action-btn {
      background: transparent !important;
      border: 2px solid rgba(255, 255, 255, 0.3) !important;
      color: white !important;
      padding: 0.75rem 1.5rem !important;
      transition: all 0.3s ease !important;
      
      &:hover {
        background: rgba(255, 255, 255, 0.1) !important;
        border-color: rgba(255, 255, 255, 0.5) !important;
        transform: translateY(-3px) !important;
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
    
    ::ng-deep .project-modal {
      .p-dialog-header {
        background: rgba(255, 255, 255, 0.05) !important;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
        padding: 2rem !important;
      }
      
      .p-dialog-content {
        background: rgba(255, 255, 255, 0.03) !important;
        padding: 0 !important;
      }
    }
    
    .modal-header {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    
    .modal-title {
      font-size: 2rem;
      font-weight: 700;
      color: white;
      margin: 0;
    }
    
    .modal-content {
      padding: 2rem;
    }
    
    .modal-image {
      width: 100%;
      height: 300px;
      overflow: hidden;
      border-radius: 1rem;
      margin-bottom: 2rem;
      
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    
    .modal-body {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }
    
    .modal-description {
      color: rgba(255, 255, 255, 0.85);
      line-height: 1.8;
      font-size: 1.1rem;
    }
    
    .modal-tech {
      h4 {
        color: white;
        margin-bottom: 1rem;
        font-size: 1.25rem;
      }
    }
    
    .tech-list {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
    }
    
    .modal-actions {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }
    
    ::ng-deep .modal-action-btn {
      padding: 1rem 2rem !important;
      font-size: 1.1rem !important;
      font-weight: 600 !important;
    }
    
    // Responsive Design
    @media (max-width: 1199.98px) {
      .projects-container {
        padding: 3rem 1.5rem;
      }
      
      .projects-grid {
        gap: 2rem;
      }
    }
    
    @media (max-width: 991.98px) {
      .section-title {
        font-size: clamp(2rem, 5vw, 3.5rem);
        flex-direction: column;
        gap: 0.75rem;
      }
      
      .section-icon {
        font-size: clamp(2rem, 5vw, 3rem);
      }
      
      .section-subtitle {
        font-size: clamp(1rem, 2.5vw, 1.25rem);
      }
      
      .projects-grid {
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 2rem;
      }
      
      .project-image-container {
        height: clamp(200px, 30vw, 250px);
      }
    }
    
    @media (max-width: 767.98px) {
      .projects-container {
        padding: 2rem 1rem;
      }
      
      .section-header {
        margin-bottom: 3rem;
      }
      
      .section-title {
        font-size: clamp(1.75rem, 6vw, 2.5rem);
      }
      
      .section-icon {
        font-size: clamp(1.75rem, 5vw, 2.5rem);
      }
      
      .projects-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }
      
      .project-image-container {
        height: clamp(180px, 40vw, 220px);
      }
      
      .card-body {
        padding: 1.5rem;
      }
      
      .project-title {
        font-size: clamp(1.25rem, 3.5vw, 1.5rem);
      }
      
      .project-description {
        font-size: clamp(0.95rem, 2.8vw, 1.05rem);
        line-height: 1.7;
      }
      
      .project-tech {
        gap: 0.625rem;
      }
      
      .project-actions {
        flex-direction: column;
        width: 100%;
        gap: 0.75rem;
      }
      
      ::ng-deep .action-btn {
        width: 100% !important;
        padding: 0.75rem 1.25rem !important;
        font-size: 0.95rem !important;
      }
      
      ::ng-deep .project-modal {
        .p-dialog {
          width: 95vw !important;
          max-width: 100% !important;
        }
      }
      
      .modal-content {
        padding: 1.5rem;
      }
      
      .modal-image {
        height: clamp(200px, 50vw, 300px);
      }
      
      .modal-title {
        font-size: clamp(1.5rem, 4vw, 2rem);
      }
      
      .modal-description {
        font-size: clamp(1rem, 2.8vw, 1.1rem);
      }
      
      .modal-actions {
        flex-direction: column;
        width: 100%;
        gap: 0.75rem;
      }
      
      ::ng-deep .modal-action-btn {
        width: 100% !important;
        padding: 0.875rem 1.5rem !important;
        font-size: 1rem !important;
      }
    }
    
    @media (max-width: 575.98px) {
      .projects-container {
        padding: 1.5rem 0.75rem;
      }
      
      .section-header {
        margin-bottom: 2rem;
      }
      
      .section-title {
        font-size: clamp(1.5rem, 7vw, 2rem);
      }
      
      .section-icon {
        font-size: clamp(1.5rem, 6vw, 2rem);
      }
      
      .projects-grid {
        gap: 1.25rem;
      }
      
      .project-image-container {
        height: clamp(160px, 45vw, 200px);
      }
      
      .card-body {
        padding: 1.25rem;
      }
      
      .project-title {
        font-size: clamp(1.1rem, 4vw, 1.35rem);
      }
      
      .project-description {
        font-size: clamp(0.875rem, 3vw, 0.95rem);
      }
      
      .modal-content {
        padding: 1.25rem;
      }
      
      .modal-image {
        height: clamp(180px, 55vw, 250px);
        margin-bottom: 1.5rem;
      }
      
      .modal-title {
        font-size: clamp(1.25rem, 4.5vw, 1.75rem);
      }
      
      .modal-description {
        font-size: clamp(0.95rem, 3vw, 1.05rem);
      }
    }
    
    // Landscape orientation
    @media (max-width: 991.98px) and (orientation: landscape) {
      .projects-container {
        padding: 2rem 1rem;
      }
      
      .section-header {
        margin-bottom: 2rem;
      }
      
      .project-image-container {
        height: clamp(150px, 30vh, 200px);
      }
    }
  `]
})
export class ProjectsComponent implements OnInit {
  projects = computed(() => {
    const content = this.contentService.portfolioContent();
    return content?.projects || [];
  });

  isModalVisible = signal(false);
  selectedProject = signal<Project | null>(null);

  constructor(public contentService: ContentService) {}

  ngOnInit(): void {
    if (!this.contentService.portfolioContent()) {
      this.contentService.loadPortfolioContent();
    }
  }

  openLink(url: string): void {
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  openProjectModal(project: Project): void {
    this.selectedProject.set(project);
    this.isModalVisible.set(true);
  }

  getProjectColor(index: number): string {
    const colors = ['#764ba2', '#667eea', '#f093fb', '#f5576c', '#43e97b', '#4facfe'];
    return colors[index % colors.length];
  }

  getProjectGradient(index: number): string {
    const gradients = [
      'linear-gradient(135deg, #764ba2, #667eea)',
      'linear-gradient(135deg, #667eea, #764ba2)',
      'linear-gradient(135deg, #f093fb, #f5576c)',
      'linear-gradient(135deg, #f5576c, #f093fb)',
      'linear-gradient(135deg, #43e97b, #38f9d7)',
      'linear-gradient(135deg, #4facfe, #00f2fe)'
    ];
    return gradients[index % gradients.length];
  }
}
