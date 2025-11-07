import { Component, signal, inject, computed, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ThemeService } from './core/services/theme.service';
import { ContentService } from './core/services/content.service';
import { ScrollSpyService } from './core/services/scroll-spy.service';
import { FloatingDockComponent } from './shared/components/floating-dock/floating-dock.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, FloatingDockComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('deivamanikailasam');
  protected readonly themeService = inject(ThemeService);
  protected readonly contentService = inject(ContentService);
  protected readonly scrollSpyService = inject(ScrollSpyService);
  protected readonly currentYear = new Date().getFullYear();
  
  ngOnInit(): void {
    if (!this.contentService.portfolioContent()) {
      this.contentService.loadPortfolioContent();
    }
    
    // Set dark theme by default
    this.themeService.setTheme('dark');
  }
}
