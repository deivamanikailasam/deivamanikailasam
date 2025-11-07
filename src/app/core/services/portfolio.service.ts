import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PortfolioContent, Profile, Experience, Project, Skill, Achievement, Testimonial } from '../models/portfolio.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private apiUrl = `${environment.apiUrl}/portfolio`;
  
  // Signals for portfolio data
  private portfolioData = signal<PortfolioContent | null>(null);
  isLoading = signal(false);
  error = signal<string | null>(null);

  // Computed signals for easy access
  profile = computed(() => this.portfolioData()?.profile || null);
  experience = computed(() => this.portfolioData()?.experience || []);
  education = computed(() => this.portfolioData()?.education || []);
  skills = computed(() => this.portfolioData()?.skills || []);
  projects = computed(() => this.portfolioData()?.projects || []);
  achievements = computed(() => this.portfolioData()?.achievements || []);
  testimonials = computed(() => this.portfolioData()?.testimonials || []);

  constructor(private http: HttpClient) {}

  /**
   * Load portfolio data from API
   */
  loadPortfolio(): Observable<PortfolioContent> {
    this.isLoading.set(true);
    this.error.set(null);

    return new Observable(observer => {
      this.http.get<PortfolioContent>(this.apiUrl).subscribe({
        next: (data) => {
          this.portfolioData.set(data);
          this.isLoading.set(false);
          observer.next(data);
          observer.complete();
        },
        error: (err) => {
          this.error.set('Failed to load portfolio data');
          this.isLoading.set(false);
          console.error('Portfolio loading error:', err);
          observer.error(err);
        }
      });
    });
  }

  /**
   * Get full portfolio data
   */
  getPortfolio(): PortfolioContent | null {
    return this.portfolioData();
  }

  /**
   * Update profile information
   */
  updateProfile(profile: Profile): void {
    const current = this.portfolioData();
    if (current) {
      this.portfolioData.set({
        ...current,
        profile
      });
    }
  }

  /**
   * Add new experience entry
   */
  addExperience(experience: Experience): void {
    const current = this.portfolioData();
    if (current) {
      this.portfolioData.set({
        ...current,
        experience: [...current.experience, experience]
      });
    }
  }

  /**
   * Add new project
   */
  addProject(project: Project): void {
    const current = this.portfolioData();
    if (current) {
      this.portfolioData.set({
        ...current,
        projects: [...current.projects, project]
      });
    }
  }

  /**
   * Get featured projects
   */
  getFeaturedProjects(): Project[] {
    return this.projects().filter(p => p.featured);
  }

  /**
   * Get current experience (where current: true)
   */
  getCurrentExperience(): Experience | null {
    return this.experience().find(exp => exp.current) || null;
  }
}

