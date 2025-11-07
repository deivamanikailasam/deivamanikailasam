import { Component, inject, OnInit, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DockModule } from 'primeng/dock';
import { TooltipModule } from 'primeng/tooltip';
import { MenuItem } from 'primeng/api';
import { ScrollSpyService } from '../../../core/services/scroll-spy.service';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-floating-dock',
  standalone: true,
  imports: [CommonModule, DockModule, TooltipModule],
  template: `
    <div class="dock-window">
      <p-dock [model]="items()" [position]="'bottom'">
        <ng-template pTemplate="item" let-item>
          <i 
            [class]="item.icon || ''" 
            [attr.data-label]="item.label"
            [pTooltip]="item.label" 
            tooltipPosition="top"
            (click)="handleItemClick(item)"
          ></i>
        </ng-template>
      </p-dock>
    </div>
  `,
  styles: [`
    :host {
      overflow: visible !important;
      position: relative;
      z-index: 1000;
    }
    
    :host ::ng-deep {
      .dock-window {
        position: fixed;
        bottom: 0.5rem;
        left: 50%;
        transform: translateX(-50%);
        z-index: 1000;
        overflow: visible !important;
        clip-path: none !important;
        pointer-events: none;
      }
      
      .p-dock {
        z-index: 1000;
        overflow: visible !important;
        clip-path: none !important;
        pointer-events: auto;

        a {
          text-decoration: none;
        }
      }
      
      .p-dock-list {
        overflow: visible !important;
        clip-path: none !important;
        position: relative;
      }
      
      .p-dock-item {
        position: relative !important;
        overflow: visible !important;
        clip-path: none !important;
        z-index: 1;
        pointer-events: auto;
        contain: none !important;
        isolation: auto !important;
      }
      
      .p-dock-item i {
        cursor: pointer;
        transition: transform 0.2s ease;
        display: block;
        position: relative;
        z-index: 1;
        pointer-events: auto;
        font-size: 2rem;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        filter: drop-shadow(0 0 8px rgba(102, 126, 234, 0.6));
      }

      /* Home icon - Blue to Cyan gradient */
      .p-dock-item i[data-label="Home"] {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        filter: drop-shadow(0 0 10px rgba(102, 126, 234, 0.8));
      }

      /* Education icon - Green to Teal gradient */
      .p-dock-item i[data-label="Education"] {
        background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        filter: drop-shadow(0 0 10px rgba(17, 153, 142, 0.8));
      }

      /* Experience icon - Orange to Red gradient */
      .p-dock-item i[data-label="Experience"] {
        background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        filter: drop-shadow(0 0 10px rgba(245, 87, 108, 0.8));
      }

      /* Skills icon - Yellow to Orange gradient */
      .p-dock-item i[data-label="Skills"] {
        background: linear-gradient(135deg, #fad961 0%, #f76b1c 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        filter: drop-shadow(0 0 10px rgba(247, 107, 28, 0.8));
      }

      /* Projects icon - Purple to Pink gradient */
      .p-dock-item i[data-label="Projects"] {
        background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        filter: drop-shadow(0 0 10px rgba(250, 112, 154, 0.8));
      }

      /* Achievements icon - Gold to Yellow gradient */
      .p-dock-item i[data-label="Achievements"] {
        background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        filter: drop-shadow(0 0 10px rgba(246, 211, 101, 0.8));
      }

      /* Certifications icon - Cyan to Blue gradient */
      .p-dock-item i[data-label="Certifications"] {
        background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        filter: drop-shadow(0 0 10px rgba(79, 172, 254, 0.8));
      }

      /* Contact icon - Indigo to Purple gradient */
      .p-dock-item i[data-label="Contact"] {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        filter: drop-shadow(0 0 10px rgba(118, 75, 162, 0.8));
      }

      /* Theme toggle icons - Dynamic gradient */
      .p-dock-item i.pi-sun {
        background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        filter: drop-shadow(0 0 10px rgba(246, 211, 101, 0.8));
      }

      .p-dock-item i.pi-moon {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        filter: drop-shadow(0 0 10px rgba(102, 126, 234, 0.8));
      }
      
      .p-dock-item:hover {
        z-index: 10000 !important;
        overflow: visible !important;
        clip-path: none !important;
        // transform: translateY(0) !important;
        position: relative !important;
        contain: none !important;
        isolation: auto !important;
      }
      
      .p-dock-item:hover i {
        position: absolute !important;
        left: 10px !important;
        bottom: 50% !important;
        transform: scale(2) !important;
        z-index: 10001 !important;
        pointer-events: auto !important;
        filter: drop-shadow(0 0 20px currentColor) !important;
      }
      
      /* Ensure all parent containers don't clip */
      .p-dock-list-container,
      .p-dock-list-wrapper,
      .p-dock-container {
        overflow: visible !important;
        clip-path: none !important;
        contain: none !important;
      }
      
      /* Prevent any clipping from PrimeNG internal containers */
      .p-dock-list-container *,
      .p-dock-list-wrapper *,
      .p-dock-container * {
        overflow: visible !important;
      }
      
      /* Make sure the image container allows overflow */
      .p-dock-item > * {
        overflow: visible !important;
      }
    }
    
    @media (max-width: 768px) {
      :host ::ng-deep {
        .dock-window {
          bottom: 1rem;
        }
      }
    }
  `]
})
export class FloatingDockComponent implements OnInit {
  private scrollSpyService = inject(ScrollSpyService);
  private themeService = inject(ThemeService);
  
  items = signal<MenuItem[]>([]);
  
  constructor() {
    // Update items when active section or theme changes
    effect(() => {
      this.scrollSpyService.activeSection();
      this.themeService.themeMode();
      this.updateItems();
    });
  }
  
  ngOnInit(): void {
    this.updateItems();
  }
  
  private updateItems(): void {
    const activeSection = this.scrollSpyService.activeSection();
    const isDark = this.themeService.themeMode() === 'dark';
    
    this.items.set([
      {
        label: 'Home',
        icon: 'pi pi-home',
        command: () => this.scrollToSection('profile')
      },
      {
        label: 'Education',
        icon: 'pi pi-book',
        command: () => this.scrollToSection('education')
      },
      {
        label: 'Experience',
        icon: 'pi pi-briefcase',
        command: () => this.scrollToSection('experience')
      },
      {
        label: 'Skills',
        icon: 'pi pi-star',
        command: () => this.scrollToSection('skills')
      },
      {
        label: 'Projects',
        icon: 'pi pi-folder',
        command: () => this.scrollToSection('projects')
      },
      {
        label: 'Achievements',
        icon: 'pi pi-trophy',
        command: () => this.scrollToSection('achievements')
      },
      {
        label: 'Certifications',
        icon: 'pi pi-id-card',
        command: () => this.scrollToSection('certifications')
      },
      {
        label: 'Contact',
        icon: 'pi pi-envelope',
        command: () => this.scrollToSection('contact')
      },
      {
        label: isDark ? 'Light Mode' : 'Dark Mode',
        icon: isDark ? 'pi pi-sun' : 'pi pi-moon',
        command: () => this.toggleTheme()
      }
    ]);
  }

  handleItemClick(item: MenuItem): void {
    if (item.command) {
      if (typeof item.command === 'function') {
        try {
          item.command({ item, originalEvent: new Event('click') } as any);
        } catch {
          (item.command as () => void)();
        }
      }
    }
  }

  scrollToSection(section: string): void {
    this.scrollSpyService.scrollToSection(section);
  }

  toggleTheme(): void {
    const currentTheme = this.themeService.themeMode();
    this.themeService.setTheme(currentTheme === 'dark' ? 'light' : 'dark');
    setTimeout(() => this.updateItems(), 100);
  }
}

