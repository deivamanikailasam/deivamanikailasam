import { Component, OnInit, OnDestroy, computed, signal, PLATFORM_ID, inject, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ContentService } from '../../core/services/content.service';
import { CardModule } from 'primeng/card';
import { TimelineModule } from 'primeng/timeline';
import { AccordionModule } from 'primeng/accordion';
import { FadeInDirective } from '../../shared/directives/fade-in.directive';

@Component({
  selector: 'app-experience',
  imports: [CommonModule, CardModule, TimelineModule, AccordionModule, FadeInDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
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
        <!-- Desktop Timeline View -->
        <div class="timeline-wrapper desktop-view">
          <p-timeline [value]="timelineEvents()" [align]="timelineAlign()" layout="vertical" styleClass="custom-timeline">
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
                    <i class="pi pi-calendar" [style.color]="getGradientColorForIcon(event.index)"></i>
                    <span>
                      {{ formatDate(event.startDate) }} - 
                      @if (event.current) {
                        <span class="badge-current">Present</span>
                      } @else if (event.endDate) {
                        {{ formatDate(event.endDate) }}
                      }
                    </span>
                  </div>
                  @if (isArray(event.description)) {
                    <div class="description-list">
                      @for (desc of event.description; track $index) {
                        <div class="description-item">
                          <i class="pi pi-check-circle description-icon" [style.color]="getGradientColorForIcon(event.index)"></i>
                          <span class="description-text">{{ desc }}</span>
                        </div>
                      }
                    </div>
                  } @else {
                    <p class="description">{{ event.description }}</p>
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
        
        <!-- Mobile Accordion View -->
        <div class="mobile-accordion-wrapper mobile-view">
          <p-accordion [multiple]="false" styleClass="experience-accordion">
            @for (event of timelineEvents(); track event.id) {
              <p-accordionPanel>
                <p-accordionHeader>
                  <div class="accordion-header-wrapper">
                    <div class="accordion-header">
                      <div class="accordion-icon" [style.background]="getGradientForIndex(event.index)">
                        <i class="pi pi-briefcase"></i>
                      </div>
                      <div class="accordion-header-content">
                        <h3 class="accordion-position-title">{{ event.position }}</h3>
                        <span class="accordion-company-name">{{ event.company }}</span>
                      </div>
                    </div>
                  </div>
                </p-accordionHeader>
                <p-accordionContent>
                  <div class="accordion-content">
                    <div class="date-range">
                      <i class="pi pi-calendar" [style.color]="getGradientColorForIcon(event.index)"></i>
                      <span>
                        {{ formatDate(event.startDate) }} - 
                        @if (event.current) {
                          <span class="badge-current">Present</span>
                        } @else if (event.endDate) {
                          {{ formatDate(event.endDate) }}
                        }
                      </span>
                    </div>
                    @if (isArray(event.description)) {
                      <div class="description-list">
                        @for (desc of event.description; track $index) {
                          <div class="description-item">
                            <i class="pi pi-check-circle description-icon" [style.color]="getGradientColorForIcon(event.index)"></i>
                            <span class="description-text">{{ desc }}</span>
                          </div>
                        }
                      </div>
                    } @else {
                      <p class="description">{{ event.description }}</p>
                    }
                  </div>
                </p-accordionContent>
              </p-accordionPanel>
            }
          </p-accordion>
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
      margin: 0 auto;
      width: 100%;
      padding: 0;
    }
    
    .desktop-view {
      display: block;
    }
    
    .mobile-view {
      display: none;
    }
    
    // PrimeNG Timeline Customization
    ::ng-deep .custom-timeline {
      .p-timeline {
        position: relative;
      }
      
      .p-timeline-event {
        padding: 2rem 0;
        min-height: 200px;
      }
      
      // Ensure connector line is visible and full height
      .p-timeline-event-connector {
        width: 2px;
        background-color: rgba(79, 172, 254, 0.4);
        flex-grow: 1;
        min-height: 100px;
      }
      
      // Marker styling
      .p-timeline-event-marker {
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1;
      }
      
      // Content area styling
      .p-timeline-event-content {
        padding: 0 0 0 2rem;
        flex: 1;
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
      }
      
      // Opposite side styling for alternate layout - must be visible
      .p-timeline-event-opposite {
        padding: 0 2rem;
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: flex-end;
      }
      
      // Ensure separator (marker + connector) is properly positioned
      .p-timeline-event-separator {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex: 0 0 auto;
        padding: 0 1rem;
      }
    }
    
    .timeline-card {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 1.5rem;
      overflow: hidden;
      backdrop-filter: blur(10px);
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      width: 100%;
      
      &:hover {
        transform: translateY(-10px) scale(1.02);
        box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4);
        border-color: rgba(79, 172, 254, 0.5);
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
      text-align: left;
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
      
      i {
        font-size: 1.25rem;
        flex-shrink: 0;
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
    
    .description-list {
      margin-bottom: 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    
    .description-item {
      display: flex;
      align-items: flex-start;
      gap: 1rem;
      padding: 1rem;
      background: rgba(255, 255, 255, 0.03);
      border-radius: 0.75rem;
      border-left: 3px solid transparent;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
      
      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 3px;
        background: linear-gradient(135deg, #4facfe, #00f2fe);
        opacity: 0;
        transition: opacity 0.3s ease;
      }
      
      &:hover {
        background: rgba(255, 255, 255, 0.05);
        transform: translateX(5px);
        
        &::before {
          opacity: 1;
        }
        
        .description-icon {
          transform: scale(1.2);
        }
      }
    }
    
    .description-icon {
      font-size: 1.25rem;
      margin-top: 0.35rem;
      flex-shrink: 0;
      transition: all 0.3s ease;
    }
    
    .description-text {
      color: rgba(255, 255, 255, 0.85);
      line-height: 1.7;
      font-size: 1rem;
      flex: 1;
      text-align: left;
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
    
    // Mobile Cards Layout
    .mobile-cards-wrapper {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      width: 100%;
      max-width: 100%;
    }
    
    .experience-card {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 1.5rem;
      overflow: hidden;
      backdrop-filter: blur(10px);
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      width: 100%;
      
      &:hover {
        transform: translateY(-5px) scale(1.01);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
        border-color: rgba(79, 172, 254, 0.5);
      }
    }
    
    .mobile-marker {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 1.25rem;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
      border: 3px solid rgba(255, 255, 255, 0.2);
      flex-shrink: 0;
      margin-right: 1rem;
    }
    
    .header-text {
      flex: 1;
    }
    
    // Responsive Design
    @media (max-width: 1199.98px) {
      .experience-container {
        padding: 3rem 1.5rem;
      }
    }
    
    // Tablet styles - single-sided timeline
    @media (min-width: 768px) and (max-width: 991.98px) {
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
      
      .desktop-view {
        display: block;
      }
      
      .mobile-view {
        display: none;
      }
      
      .timeline-wrapper {
        max-width: 100%;
      }
      
      ::ng-deep .custom-timeline {
        .p-timeline-event-opposite {
          display: none;
        }
        
        .p-timeline-event-content {
          padding: 0 0 0 1.5rem;
        }
      }
      
      .timeline-card {
        width: 100%;
      }
      
      .card-header-gradient {
        padding: 1.5rem;
      }
      
      .card-body {
        padding: 1.5rem;
      }
      
      .position-title {
        font-size: clamp(1.5rem, 3vw, 1.75rem);
      }
      
      .company-name {
        font-size: clamp(1.1rem, 2.5vw, 1.25rem);
      }
    }
    
    // Mobile Accordion Styles
    .mobile-accordion-wrapper {
      width: 100%;
      max-width: 100%;
      padding: 0.5rem 0;
    }
    
    ::ng-deep .experience-accordion {
      .p-accordion-panel {
        margin-bottom: 1.5rem;
        border-radius: 1.25rem;
        overflow: hidden;
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        
        &:hover {
          border-color: rgba(79, 172, 254, 0.4);
          box-shadow: 0 8px 30px rgba(79, 172, 254, 0.2);
          transform: translateY(-2px);
        }
        
        &[data-p-active="true"] {
          border-color: rgba(79, 172, 254, 0.6);
          box-shadow: 0 8px 35px rgba(79, 172, 254, 0.3);
        }
      }
      
      p-accordion-header,
      .p-accordion-header {
        padding: 0;
        cursor: pointer;
        background: linear-gradient(135deg, rgba(79, 172, 254, 0.1), rgba(0, 242, 254, 0.1));
        border-bottom: 2px solid rgba(79, 172, 254, 0.2);
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
        
        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
          transition: left 0.5s ease;
        }
        
        &:hover {
          background: linear-gradient(135deg, rgba(79, 172, 254, 0.15), rgba(0, 242, 254, 0.15));
          border-bottom-color: rgba(79, 172, 254, 0.4);
          
          &::before {
            left: 100%;
          }
        }
        
        &[data-p-active="true"] {
          background: linear-gradient(135deg, rgba(79, 172, 254, 0.2), rgba(0, 242, 254, 0.2));
          border-bottom-color: rgba(79, 172, 254, 0.5);
        }
        
        // Ensure all content inside header is visible
        .accordion-header-wrapper {
          display: block !important;
          visibility: visible !important;
          opacity: 1 !important;
          width: 100%;
          padding: 1.5rem;
          position: relative;
          z-index: 1;
        }
        
        .accordion-header {
          display: flex !important;
          align-items: center;
          gap: 1.25rem;
          width: 100%;
          flex: 1;
          visibility: visible !important;
          opacity: 1 !important;
        }
        
        .accordion-header-content {
          display: flex !important;
          flex-direction: column;
          flex: 1;
          min-width: 0;
          visibility: visible !important;
          opacity: 1 !important;
          gap: 0.5rem;
        }
        
        .accordion-position-title {
          display: block !important;
          visibility: visible !important;
          opacity: 1 !important;
          color: white !important;
          font-size: 1.25rem !important;
          font-weight: 700 !important;
          margin: 0 !important;
          line-height: 1.4;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        }
        
        .accordion-company-name {
          display: block !important;
          visibility: visible !important;
          opacity: 1 !important;
          color: rgba(255, 255, 255, 0.85) !important;
          font-size: 1rem !important;
          font-weight: 500 !important;
          margin: 0 !important;
        }
        
        .accordion-icon {
          display: flex !important;
          visibility: visible !important;
          opacity: 1 !important;
        }
      }
      
      p-accordion-content,
      .p-accordion-content {
        padding: 0;
        background: transparent;
        border: none;
      }
    }
    
    .accordion-header {
      display: flex !important;
      align-items: center;
      gap: 1.25rem;
      width: 100%;
      flex: 1;
      visibility: visible !important;
      opacity: 1 !important;
    }
    
    .accordion-icon {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      display: flex !important;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 1.5rem;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3), inset 0 2px 10px rgba(255, 255, 255, 0.1);
      border: 3px solid rgba(255, 255, 255, 0.25);
      flex-shrink: 0;
      visibility: visible !important;
      opacity: 1 !important;
      transition: all 0.3s ease;
      
      &:hover {
        transform: scale(1.05);
        box-shadow: 0 6px 20px rgba(79, 172, 254, 0.4), inset 0 2px 10px rgba(255, 255, 255, 0.15);
      }
    }
    
    .accordion-header-content {
      flex: 1;
      min-width: 0;
      display: flex !important;
      flex-direction: column;
      visibility: visible !important;
      opacity: 1 !important;
      gap: 0.5rem;
    }
    
    .accordion-position-title {
      font-size: 1.25rem;
      font-weight: 700;
      color: white !important;
      margin: 0 !important;
      text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
      line-height: 1.4;
      display: block !important;
      visibility: visible !important;
      opacity: 1 !important;
      letter-spacing: 0.02em;
    }
    
    .accordion-company-name {
      font-size: 1rem;
      color: rgba(255, 255, 255, 0.85) !important;
      font-weight: 500;
      display: block !important;
      visibility: visible !important;
      opacity: 1 !important;
      margin: 0 !important;
      letter-spacing: 0.01em;
    }
    
    .accordion-content {
      padding: 1.5rem;
      background: rgba(255, 255, 255, 0.02);
    }
    
    // Show mobile accordion on mobile devices
    @media (max-width: 767.98px) {
      .experience-container {
        display: block;
        padding: 2rem 1rem;
      }
      
      .section-header {
        margin-bottom: 2rem;
      }
      
      .section-title {
        font-size: clamp(2rem, 8vw, 3rem);
        flex-direction: column;
        gap: 0.5rem;
      }
      
      .section-icon {
        font-size: clamp(1.5rem, 6vw, 2.5rem);
      }
      
      .section-subtitle {
        font-size: clamp(0.9rem, 3vw, 1.1rem);
      }
      
      .desktop-view {
        display: none !important;
      }
      
      .mobile-view {
        display: block !important;
      }
      
      // Ensure accordion header is visible on mobile
      ::ng-deep .experience-accordion {
        p-accordion-header,
        .p-accordion-header {
          .accordion-header-wrapper,
          .accordion-header,
          .accordion-header-content,
          .accordion-position-title,
          .accordion-company-name,
          .accordion-icon {
            display: flex !important;
            visibility: visible !important;
            opacity: 1 !important;
          }
          
          .accordion-header-wrapper {
            display: block !important;
            width: 100%;
          }
          
          .accordion-header {
            display: flex !important;
            align-items: center;
            gap: 1rem;
            width: 100%;
          }
          
          .accordion-header-content {
            display: flex !important;
            flex-direction: column;
            flex: 1;
          }
          
          .accordion-position-title {
            display: block !important;
            color: white !important;
            font-size: 1.25rem !important;
            font-weight: 700 !important;
            margin: 0 0 0.25rem 0 !important;
          }
          
          .accordion-company-name {
            display: block !important;
            color: rgba(255, 255, 255, 0.8) !important;
            font-size: 1rem !important;
            font-weight: 500 !important;
          }
        }
      }
      
      .accordion-content {
        padding: 1.25rem !important;
        
        .date-range {
          font-size: 0.9rem;
          margin-bottom: 1.25rem;
          padding: 0.75rem;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 0.5rem;
          border-left: 3px solid rgba(79, 172, 254, 0.5);
        }
        
        .description-text {
          font-size: 0.9rem;
          line-height: 1.7;
        }
        
        .description-item {
          padding: 0.875rem;
          gap: 0.875rem;
          margin-bottom: 0.75rem;
          border-radius: 0.5rem;
          
          &:last-child {
            margin-bottom: 0;
          }
        }
        
        .description-list {
          gap: 0.75rem;
        }
      }
    }
    
    // Desktop styles - ensure alternate alignment works
    @media (min-width: 992px) {
      .desktop-view {
        display: block;
      }
      
      .mobile-view {
        display: none;
      }
      
      ::ng-deep .custom-timeline {
        // Ensure opposite side is visible for alternate layout
        .p-timeline-event-opposite {
          display: flex;
          flex: 1;
          padding: 0 2rem;
          align-items: center;
          justify-content: flex-end;
        }
        
        // Ensure content area doesn't expand card
        .p-timeline-event-content {
          display: flex;
          align-items: flex-start;
          justify-content: flex-start;
          padding-right: 0;
        }
        
        // Ensure connector line is full height and visible
        .p-timeline-event-connector {
          width: 2px;
          background-color: rgba(79, 172, 254, 0.4);
          flex-grow: 1;
          min-height: 150px;
        }
      }
    }
    
    // Landscape orientation
    @media (max-width: 991.98px) and (orientation: landscape) {
      .experience-container {
        padding: 2rem 1rem;
      }
      
      .section-header {
        margin-bottom: 2rem;
      }
    }
  `]
})
export class ExperienceComponent implements OnInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private isMobile = signal(false);
  private isTablet = signal(false);
  private resizeListener?: () => void;
  
  experience = computed(() => {
    const content = this.contentService.portfolioContent();
    return content?.experience || [];
  });

  timelineEvents = computed(() => {
    return this.experience().map((exp, index) => ({
      ...exp,
      index,
      description: exp.description
    }));
  });

  timelineAlign = computed(() => {
    // Use default (left) alignment for tablets, alternate for desktop
    if (this.isTablet()) {
      return 'left'; // Default alignment for tablets
    }
    return 'alternate'; // Alternate alignment for desktop
  });

  constructor(public contentService: ContentService) {
    if (isPlatformBrowser(this.platformId)) {
      this.checkDeviceSize();
      this.resizeListener = () => this.checkDeviceSize();
      window.addEventListener('resize', this.resizeListener);
    }
  }
  
  private checkDeviceSize(): void {
    if (isPlatformBrowser(this.platformId)) {
      const width = window.innerWidth;
      this.isMobile.set(width < 768);
      this.isTablet.set(width >= 768 && width < 992);
    }
  }
  
  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId) && this.resizeListener) {
      window.removeEventListener('resize', this.resizeListener);
    }
  }

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

  getGradientColorForIcon(index: number): string {
    const colors = [
      '#4facfe',
      '#667eea',
      '#f093fb',
      '#43e97b',
      '#fa709a',
      '#ffc107'
    ];
    return colors[index % colors.length];
  }

  isArray(value: any): boolean {
    return Array.isArray(value);
  }
}
