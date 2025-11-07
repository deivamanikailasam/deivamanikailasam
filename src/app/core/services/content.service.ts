import { Injectable, signal, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { signal as ngSignal, computed } from '@angular/core';
import { PortfolioContent } from '../models/content-schema';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  // Update this to check if apiUrl is empty
  private get contentUrl(): string {
    return environment.apiUrl ? `${environment.apiUrl}/portfolio` : '/assets/data/db.json';
  }  
  // Signals for state management
  portfolioContent = ngSignal<PortfolioContent | null>(null);
  isLoading = ngSignal(false);
  error = ngSignal<string | null>(null);
  contentVersion = ngSignal<string>('1.0.0');

  // Computed signals for derived state
  hasContent = computed(() => this.portfolioContent() !== null);
  sections = computed(() => {
    const content = this.portfolioContent();
    return content ? {
      profile: content.profile,
      experience: content.experience,
      education: content.education,
      skills: content.skills,
      projects: content.projects,
      achievements: content.achievements,
      testimonials: content.testimonials,
      contact: content.contact
    } : null;
  });

  constructor(private http: HttpClient) {
    // Automatically update when content version changes
    effect(() => {
      const version = this.contentVersion();
      console.log(`Content version updated to: ${version}`);
    });
  }

  loadPortfolioContent(): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.http.get<PortfolioContent>(this.contentUrl).subscribe({
      next: (data) => {
        this.portfolioContent.set(data);
        this.contentVersion.set(data.version);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load portfolio content');
        this.isLoading.set(false);
        console.error('Content loading error:', err);
      }
    });
  }

  updateSection<K extends keyof PortfolioContent>(
    sectionKey: K,
    newData: PortfolioContent[K]
  ): void {
    const current = this.portfolioContent();
    if (current) {
      this.portfolioContent.set({
        ...current,
        [sectionKey]: newData
      });
    }
  }

  getSection<K extends keyof PortfolioContent>(sectionKey: K): PortfolioContent[K] | null {
    const content = this.portfolioContent();
    return content ? content[sectionKey] : null;
  }
}
