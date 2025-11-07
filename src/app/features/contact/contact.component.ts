import { Component, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContentService } from '../../core/services/content.service';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-contact',
  imports: [
    CommonModule, 
    FormsModule, 
    InputTextModule, 
    TextareaModule,
    ButtonModule,
    MessageModule
  ],
  template: `
    <section id="contact" class="contact-section">
      @if (contentService.isLoading()) {
        <div class="text-center py-5">
          <i class="pi pi-spin pi-spinner" style="font-size: 3rem;"></i>
        </div>
      } @else if (contentService.error()) {
        <div class="alert alert-danger" role="alert">
          {{ contentService.error() }}
        </div>
      } @else {
        <h2 class="section-title-main mb-5">Contact</h2>
        
        <div class="contact-wrapper">
          @if (contact(); as contactData) {
            <div class="contact-info-sidebar">
              @if (contactData.email) {
                <div class="contact-info-item">
                  <i class="pi pi-envelope contact-icon"></i>
                  <div>
                    <strong>Email</strong>
                    <p class="mb-0">
                      <a [href]="'mailto:' + contactData.email">{{ contactData.email }}</a>
                    </p>
                  </div>
                </div>
              }
              
              @if (contactData.phone) {
                <div class="contact-info-item">
                  <i class="pi pi-phone contact-icon"></i>
                  <div>
                    <strong>Phone</strong>
                    <p class="mb-0">
                      <a [href]="'tel:' + contactData.phone">{{ contactData.phone }}</a>
                    </p>
                  </div>
                </div>
              }
              
              @if (contactData.location) {
                <div class="contact-info-item">
                  <i class="pi pi-map-marker contact-icon"></i>
                  <div>
                    <strong>Location</strong>
                    <p class="mb-0">{{ contactData.location }}</p>
                  </div>
                </div>
              }
              
              @if (contactData.socials && contactData.socials.length > 0) {
                <div class="social-links-section">
                  <strong class="d-block mb-3">Connect with me:</strong>
                  <div class="social-buttons">
                    @for (social of contactData.socials; track social.platform) {
                      <a 
                        [href]="social.url" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        class="social-button"
                        [attr.aria-label]="social.platform"
                      >
                        <i [class]="social.icon"></i>
                        <span>{{ social.platform }}</span>
                      </a>
                    }
                  </div>
                </div>
              }
            </div>
          }
          
          <div class="contact-form-container">
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
                  class="form-control-custom"
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
                  class="form-control-custom"
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
                  class="form-control-custom"
                  required
                  placeholder="Your message here..."
                ></textarea>
              </div>
              
              @if (submitMessage()) {
                <p-message 
                  [severity]="submitSuccess() ? 'success' : 'error'"
                  class="mb-3"
                >
                  {{ submitMessage() }}
                </p-message>
              }
              
              <div class="form-actions">
                <p-button
                  type="submit"
                  label="Send"
                  icon="pi pi-send"
                  [disabled]="!contactForm.valid || isSubmitting()"
                  [loading]="isSubmitting()"
                  styleClass="send-button"
                ></p-button>
              </div>
            </form>
          </div>
        </div>
      }
    </section>
  `,
  styles: [`
    .contact-section {
      padding: 0;
      animation: fadeInUp 0.6s ease-out;
    }
    
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .section-title-main {
      font-size: 2rem;
      font-weight: 700;
      color: inherit;
      margin-bottom: 2rem;
      padding-bottom: 1rem;
      border-bottom: 3px solid var(--accent-color, #ffc107);
    }
    
    .contact-wrapper {
      display: grid;
      grid-template-columns: 1fr 2fr;
      gap: 3rem;
      align-items: start;
    }
    
    .contact-info-sidebar {
      background: rgba(255, 255, 255, 0.03);
      padding: 2rem;
      border-radius: 0.75rem;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .contact-info-item {
      display: flex;
      align-items: flex-start;
      gap: 1rem;
      margin-bottom: 2rem;
      
      &:last-child {
        margin-bottom: 0;
      }
    }
    
    .contact-icon {
      font-size: 1.5rem;
      color: var(--accent-color, #ffc107);
      margin-top: 0.25rem;
    }
    
    .contact-info-item strong {
      display: block;
      color: var(--accent-color, #ffc107);
      margin-bottom: 0.5rem;
    }
    
    .contact-info-item p {
      color: rgba(255, 255, 255, 0.8);
      margin: 0;
    }
    
    .contact-info-item a {
      color: inherit;
      text-decoration: none;
      transition: color 0.3s ease;
      
      &:hover {
        color: var(--accent-color, #ffc107);
      }
    }
    
    .social-links-section {
      margin-top: 2rem;
      padding-top: 2rem;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .social-buttons {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
    
    .social-button {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem 1rem;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 0.5rem;
      color: inherit;
      text-decoration: none;
      transition: all 0.3s ease;
      
      &:hover {
        background: rgba(255, 255, 255, 0.1);
        border-color: var(--accent-color, #ffc107);
        transform: translateX(5px);
        color: var(--accent-color, #ffc107);
      }
      
      i {
        font-size: 1.25rem;
      }
    }
    
    .contact-form-container {
      background: rgba(255, 255, 255, 0.03);
      padding: 2rem;
      border-radius: 0.75rem;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .contact-form {
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
      color: inherit;
      margin-bottom: 0.5rem;
      font-size: 1rem;
    }
    
    .required {
      color: var(--accent-color, #ffc107);
    }
    
    .form-control-custom {
      width: 100%;
      padding: 0.75rem 1rem;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 0.5rem;
      color: inherit;
      font-size: 1rem;
      transition: all 0.3s ease;
      
      &:focus {
        outline: none;
        border-color: var(--accent-color, #ffc107);
        background: rgba(255, 255, 255, 0.08);
        box-shadow: 0 0 0 3px rgba(255, 193, 7, 0.1);
      }
      
      &::placeholder {
        color: rgba(255, 255, 255, 0.4);
      }
    }
    
    .form-actions {
      margin-top: 1rem;
    }
    
    ::ng-deep .send-button {
      background: var(--accent-color, #ffc107) !important;
      color: #1a1a1a !important;
      border: none !important;
      padding: 0.75rem 2rem !important;
      font-size: 1rem !important;
      font-weight: 600 !important;
      border-radius: 0.5rem !important;
      transition: all 0.3s ease !important;
      
      &:hover:not(:disabled) {
        background: rgba(255, 193, 7, 0.8) !important;
        transform: translateY(-2px) !important;
        box-shadow: 0 4px 12px rgba(255, 193, 7, 0.3) !important;
      }
      
      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
    }
    
    @media (max-width: 991.98px) {
      .contact-wrapper {
        grid-template-columns: 1fr;
        gap: 2rem;
      }
    }
  `]
})
export class ContactComponent implements OnInit {
  contact = computed(() => {
    const content = this.contentService.portfolioContent();
    return content?.contact || null;
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
