import { Component, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContentService } from '../../core/services/content.service';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { CardModule } from 'primeng/card';
import { FieldsetModule } from 'primeng/fieldset';
import { DividerModule } from 'primeng/divider';
import { ChipModule } from 'primeng/chip';
import { FadeInDirective } from '../../shared/directives/fade-in.directive';

@Component({
  selector: 'app-contact',
  imports: [
    CommonModule, 
    FormsModule, 
    InputTextModule, 
    TextareaModule,
    ButtonModule,
    MessageModule,
    CardModule,
    FieldsetModule,
    DividerModule,
    ChipModule,
    FadeInDirective
  ],
  template: `
    <div class="contact-container">
      <div class="section-header" appFadeIn>
        <h2 class="section-title">
          <i class="pi pi-envelope section-icon"></i>
          Get In Touch
        </h2>
        <p class="section-subtitle">Let's connect and discuss opportunities</p>
      </div>
      
      @if (contentService.isLoading()) {
        <div class="loading-state">
          <i class="pi pi-spin pi-spinner"></i>
          <p>Loading contact information...</p>
        </div>
      } @else if (contentService.error()) {
        <p-message severity="error" [text]="contentService.error() || 'An error occurred'"></p-message>
      } @else {
        <div class="contact-content" appFadeIn>
          <div class="contact-info-section">
            <p-card class="contact-info-card">
              <ng-template pTemplate="header">
                <div class="card-header-gradient">
                  <div class="card-header-content">
                    <h3 class="card-title">Contact Information</h3>
                    <p class="card-subtitle">Feel free to reach out</p>
                  </div>
                </div>
              </ng-template>
              
              <div class="contact-info-body">
                @if (contactData(); as data) {
                  <div class="contact-details-section">
                    <h4 class="section-heading">
                      <i class="pi pi-info-circle"></i>
                      Contact Details
                    </h4>
                    @if (data.email) {
                      <div class="contact-info-item">
                        <div class="info-icon-wrapper">
                          <i class="pi pi-envelope info-icon"></i>
                        </div>
                        <div class="info-content">
                          <label class="info-label">Email</label>
                          <a [href]="'mailto:' + data.email" class="info-value">
                            {{ data.email }}
                          </a>
                        </div>
                      </div>
                    }
                    
                    @if (data.phone) {
                      <div class="contact-info-item">
                        <div class="info-icon-wrapper">
                          <i class="pi pi-phone info-icon"></i>
                        </div>
                        <div class="info-content">
                          <label class="info-label">Phone</label>
                          <a [href]="'tel:' + data.phone" class="info-value">
                            {{ data.phone }}
                          </a>
                        </div>
                      </div>
                    }
                    
                    @if (data.location) {
                      <div class="contact-info-item">
                        <div class="info-icon-wrapper">
                          <i class="pi pi-map-marker info-icon"></i>
                        </div>
                        <div class="info-content">
                          <label class="info-label">Location</label>
                          <span class="info-value">{{ data.location }}</span>
                        </div>
                      </div>
                    }
                  </div>
                  
                  @if (data.socials && data.socials.length > 0) {
                    <p-divider></p-divider>
                    <div class="social-media-section">
                      <h4 class="section-heading">
                        <i class="pi pi-share-alt"></i>
                        Social Media
                      </h4>
                      <div class="social-links">
                        @for (social of data.socials; track social.platform) {
                          <a 
                            [href]="social.url" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            class="social-link"
                            [attr.aria-label]="social.platform"
                          >
                            <p-chip [label]="social.platform" [icon]="social.icon" styleClass="social-chip"></p-chip>
                          </a>
                        }
                      </div>
                    </div>
                  }
                } @else {
                  <div class="no-data-message">
                    <i class="pi pi-info-circle"></i>
                    <p>Contact information is being loaded...</p>
                  </div>
                }
              </div>
            </p-card>
          </div>
          
          <div class="contact-form-section">
            <p-card class="contact-form-card">
              <ng-template pTemplate="header">
                <div class="card-header-gradient">
                  <div class="card-header-content">
                    <h3 class="card-title">Send a Message</h3>
                    <p class="card-subtitle">I'll get back to you soon</p>
                  </div>
                </div>
              </ng-template>
              
              <form (ngSubmit)="onSubmit()" #contactForm="ngForm" class="contact-form">
                <div class="form-group">
                  <label for="name" class="form-label">
                    Name <span class="required">*</span>
                  </label>
                  <input 
                    type="text" 
                    pInputText
                    id="name"
                    [(ngModel)]="formData.name"
                    name="name"
                    class="form-control"
                    required
                    placeholder="Your name"
                  />
                </div>
                
                <div class="form-group">
                  <label for="email" class="form-label">
                    Email <span class="required">*</span>
                  </label>
                  <input 
                    type="email" 
                    pInputText
                    id="email"
                    [(ngModel)]="formData.email"
                    name="email"
                    class="form-control"
                    required
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div class="form-group">
                  <label for="message" class="form-label">
                    Message <span class="required">*</span>
                  </label>
                  <textarea 
                    pTextarea
                    id="message"
                    rows="6"
                    [(ngModel)]="formData.message"
                    name="message"
                    class="form-control"
                    required
                    placeholder="Your message here..."
                  ></textarea>
                </div>
                
                @if (submitMessage()) {
                  <p-message 
                    [severity]="submitSuccess() ? 'success' : 'error'"
                    class="form-message"
                  >
                    {{ submitMessage() }}
                  </p-message>
                }
                
                <div class="form-actions">
                  <p-button
                    type="submit"
                    label="Send Message"
                    icon="pi pi-send"
                    [disabled]="!contactForm.valid || isSubmitting()"
                    [loading]="isSubmitting()"
                    styleClass="send-button"
                  ></p-button>
                </div>
              </form>
            </p-card>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .contact-container {
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
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.7));
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
      color: rgba(255, 255, 255, 0.8);
      filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.2));
    }
    
    .section-subtitle {
      font-size: 1.25rem;
      color: rgba(255, 255, 255, 0.7);
      margin: 0;
    }
    
    .loading-state {
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
    
    .contact-content {
      display: grid;
      grid-template-columns: 1fr 1.5fr;
      gap: 2rem;
      max-width: 1400px;
      margin: 0 auto;
    }
    
    .contact-info-card,
    .contact-form-card {
      background: rgba(255, 255, 255, 0.03) !important;
      border: 1px solid rgba(255, 255, 255, 0.08) !important;
      border-radius: 1.5rem !important;
      overflow: hidden !important;
      backdrop-filter: blur(10px) !important;
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
      height: 100%;
      
      &:hover {
        transform: translateY(-5px) scale(1.01) !important;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5) !important;
        border-color: rgba(255, 255, 255, 0.15) !important;
        background: rgba(255, 255, 255, 0.05) !important;
      }
    }
    
    .card-header-gradient {
      padding: 2rem;
      background: linear-gradient(135deg, rgba(102, 126, 234, 0.15), rgba(118, 75, 162, 0.15));
      position: relative;
      overflow: hidden;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
        opacity: 0.5;
        filter: blur(20px);
      }
    }
    
    .card-header-content {
      position: relative;
      z-index: 1;
    }
    
    .card-title {
      font-size: 1.75rem;
      font-weight: 700;
      color: rgba(255, 255, 255, 0.95);
      margin: 0 0 0.5rem 0;
      text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    }
    
    .card-subtitle {
      font-size: 1rem;
      color: rgba(255, 255, 255, 0.7);
      margin: 0;
    }
    
    .contact-info-body {
      padding: 2rem;
    }
    
    .no-data-message {
      text-align: center;
      padding: 2rem;
      color: rgba(255, 255, 255, 0.6);
      
      i {
        font-size: 2rem;
        margin-bottom: 1rem;
        color: rgba(255, 255, 255, 0.4);
      }
      
      p {
        font-size: 1rem;
        margin: 0;
      }
    }
    
    .contact-details-section,
    .social-media-section {
      margin-bottom: 2rem;
      
      &:last-child {
        margin-bottom: 0;
      }
    }
    
    .section-heading {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-size: 1.25rem;
      font-weight: 600;
      color: rgba(255, 255, 255, 0.85);
      margin-bottom: 1.5rem;
      padding-bottom: 1rem;
      border-bottom: 2px solid rgba(255, 255, 255, 0.1);
      
      i {
        color: rgba(255, 255, 255, 0.7);
        font-size: 1.5rem;
      }
    }
    
    .contact-info-item {
      display: flex;
      align-items: flex-start;
      gap: 1.5rem;
      padding: 1.5rem;
      background: rgba(255, 255, 255, 0.02);
      border-radius: 0.75rem;
      margin-bottom: 1rem;
      transition: all 0.3s ease;
      border-left: 3px solid transparent;
      
      &:hover {
        background: rgba(255, 255, 255, 0.04);
        border-left-color: rgba(255, 255, 255, 0.3);
        transform: translateX(5px);
      }
      
      &:last-child {
        margin-bottom: 0;
      }
    }
    
    .info-icon-wrapper {
      flex-shrink: 0;
      width: 50px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 50%;
      border: 2px solid rgba(255, 255, 255, 0.1);
    }
    
    .info-icon {
      font-size: 1.5rem;
      color: rgba(255, 255, 255, 0.7);
    }
    
    .info-content {
      flex: 1;
    }
    
    .info-label {
      display: block;
      font-size: 0.9rem;
      font-weight: 600;
      color: rgba(255, 255, 255, 0.7);
      margin-bottom: 0.5rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    .info-value {
      display: block;
      font-size: 1.1rem;
      color: rgba(255, 255, 255, 0.85);
      text-decoration: none;
      transition: color 0.3s ease;
      
      &:hover {
        color: rgba(255, 255, 255, 0.95);
      }
    }
    
    .social-links {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
    }
    
    .social-link {
      text-decoration: none;
      transition: transform 0.3s ease;
      
      &:hover {
        transform: translateY(-3px);
      }
    }
    
    ::ng-deep .social-chip {
      background: rgba(255, 255, 255, 0.05) !important;
      color: rgba(255, 255, 255, 0.85) !important;
      border: 1px solid rgba(255, 255, 255, 0.1) !important;
      font-weight: 500 !important;
      padding: 0.75rem 1.25rem !important;
      transition: all 0.3s ease !important;
      
      &:hover {
        background: rgba(255, 255, 255, 0.1) !important;
        color: rgba(255, 255, 255, 0.95) !important;
        border-color: rgba(255, 255, 255, 0.2) !important;
        transform: translateY(-3px) !important;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3) !important;
      }
    }
    
    .contact-form {
      padding: 2rem;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    
    .form-group {
      display: flex;
      flex-direction: column;
    }
    
    .form-label {
      font-weight: 600;
      color: rgba(255, 255, 255, 0.9);
      margin-bottom: 0.75rem;
      font-size: 1rem;
    }
    
    .required {
      color: #f5576c;
      margin-left: 0.25rem;
    }
    
    .form-control {
      width: 100%;
      padding: 0.75rem 1rem;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 0.5rem;
      color: rgba(255, 255, 255, 0.9);
      font-size: 1rem;
      transition: all 0.3s ease;
      
      &:focus {
        outline: none;
        border-color: rgba(255, 255, 255, 0.2);
        background: rgba(255, 255, 255, 0.05);
        box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.05);
      }
      
      &::placeholder {
        color: rgba(255, 255, 255, 0.4);
      }
    }
    
    .form-message {
      margin-top: 0.5rem;
    }
    
    .form-actions {
      margin-top: 1rem;
    }
    
    ::ng-deep .send-button {
      background: rgba(255, 255, 255, 0.1) !important;
      color: rgba(255, 255, 255, 0.95) !important;
      border: 1px solid rgba(255, 255, 255, 0.15) !important;
      padding: 0.75rem 2rem !important;
      font-size: 1rem !important;
      font-weight: 600 !important;
      border-radius: 0.5rem !important;
      transition: all 0.3s ease !important;
      
      &:hover:not(:disabled) {
        background: rgba(255, 255, 255, 0.15) !important;
        border-color: rgba(255, 255, 255, 0.25) !important;
        transform: translateY(-2px) !important;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3) !important;
      }
      
      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }
    
    // Responsive Design
    @media (max-width: 1199.98px) {
      .contact-container {
        padding: 3rem 1.5rem;
      }
      
      .contact-content {
        gap: 2rem;
      }
    }
    
    @media (max-width: 991.98px) {
      .contact-container {
        padding: 2rem 1rem;
      }
      
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
      
      .contact-content {
        grid-template-columns: 1fr;
        gap: 2rem;
      }
      
      .card-header-gradient {
        padding: 1.5rem;
      }
      
      .card-title {
        font-size: clamp(1.5rem, 3vw, 1.75rem);
      }
      
      .card-subtitle {
        font-size: clamp(0.9rem, 2.2vw, 1rem);
      }
      
      .contact-info-body {
        padding: 1.5rem;
      }
      
      .contact-form {
        padding: 1.5rem;
      }
    }
    
    @media (max-width: 767.98px) {
      .contact-container {
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
      
      .card-header-gradient {
        padding: 1.25rem;
      }
      
      .contact-info-body {
        padding: 1.25rem;
      }
      
      .contact-form {
        padding: 1.25rem;
        gap: 1.25rem;
      }
      
      .contact-info-item {
        padding: 1.25rem;
        gap: 1rem;
        flex-direction: column;
        align-items: flex-start;
      }
      
      .info-icon-wrapper {
        width: clamp(45px, 12vw, 50px);
        height: clamp(45px, 12vw, 50px);
      }
      
      .info-icon {
        font-size: clamp(1.25rem, 3.5vw, 1.5rem);
      }
      
      .info-label {
        font-size: clamp(0.85rem, 2.2vw, 0.9rem);
      }
      
      .info-value {
        font-size: clamp(1rem, 2.8vw, 1.1rem);
      }
      
      .form-label {
        font-size: clamp(0.95rem, 2.5vw, 1rem);
      }
      
      .form-control {
        font-size: clamp(0.95rem, 2.5vw, 1rem);
        padding: clamp(0.625rem, 1.8vw, 0.75rem) clamp(0.875rem, 2.2vw, 1rem);
      }
      
      .social-links {
        gap: 0.75rem;
      }
    }
    
    @media (max-width: 575.98px) {
      .contact-container {
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
      
      .card-header-gradient {
        padding: 1rem;
      }
      
      .contact-info-body {
        padding: 1rem;
      }
      
      .contact-form {
        padding: 1rem;
        gap: 1rem;
      }
      
      .contact-info-item {
        padding: 1rem;
      }
      
      .section-heading {
        font-size: clamp(1.1rem, 3.5vw, 1.25rem);
      }
      
      ::ng-deep .send-button {
        width: 100% !important;
        padding: 0.875rem 1.5rem !important;
        font-size: 0.95rem !important;
      }
    }
    
    // Landscape orientation
    @media (max-width: 991.98px) and (orientation: landscape) {
      .contact-container {
        padding: 2rem 1rem;
      }
      
      .section-header {
        margin-bottom: 2rem;
      }
    }
  `]
})
export class ContactComponent implements OnInit {
  contact = computed(() => {
    const content = this.contentService.portfolioContent();
    return content?.contact || null;
  });

  profile = computed(() => {
    const content = this.contentService.portfolioContent();
    return content?.profile || null;
  });

  contactData = computed(() => {
    const contactData = this.contact();
    
    // Use contact data from db.json
    if (contactData) {
      return {
        email: contactData.email,
        phone: contactData.phone,
        location: contactData.location,
        socials: contactData.socials || []
      };
    }
    
    return null;
  });

  formData = {
    name: '',
    email: '',
    message: ''
  };

  isSubmitting = signal(false);
  submitMessage = signal<string | null>(null);
  submitSuccess = signal(false);

  constructor(public contentService: ContentService) {}

  ngOnInit(): void {
    if (!this.contentService.portfolioContent()) {
      this.contentService.loadPortfolioContent();
    }
  }

  onSubmit(): void {
    this.isSubmitting.set(true);
    this.submitMessage.set(null);
    
    setTimeout(() => {
      console.log('Form submitted:', this.formData);
      this.submitSuccess.set(true);
      this.submitMessage.set('Thank you for your message! I will get back to you soon.');
      this.isSubmitting.set(false);
      
      this.formData = {
        name: '',
        email: '',
        message: ''
      };
      
      setTimeout(() => {
        this.submitMessage.set(null);
      }, 5000);
    }, 1000);
  }
}

