import { Component, computed, effect, inject, OnInit, signal } from "@angular/core";
import { ActivatedRoute, Router, Params } from "@angular/router";
import { CommonModule } from "@angular/common";
import { ContentService } from "../../../core/services/content.service";
import { FormsModule } from "@angular/forms";
import { SelectButtonModule } from "primeng/selectbutton";
import { SafeHtmlPipe } from "../../../core/pipes/safe-html.pipe";
import { InputTextModule } from "primeng/inputtext";

@Component({
    selector: 'app-skill-details',
    standalone: true,
    templateUrl: './skill-details.component.html',
    styleUrls: ['./skill-details.component.scss'],
    imports: [CommonModule, FormsModule, SelectButtonModule, SafeHtmlPipe, InputTextModule]
})
export class SkillDetailsComponent implements OnInit {
    skillKey = signal<string>('');
    categoryKey = signal<string>('');
    divisionKey = signal<string>('');
    options = signal<{label: string, value: string}[]>([
        {label: 'Skills', value: 'skills'},
        {label: 'Experience', value: 'experience'}
    ]);

    selectedOption = signal<string>('skills');
    searchValue = signal<string>('');

    protected readonly contentService = inject(ContentService);
    protected readonly route = inject(ActivatedRoute);
    protected readonly router = inject(Router);

     // Make category a computed signal
     category = computed(() => {
        const content = this.contentService.portfolioContent();
        const catKey = this.categoryKey();
        
        if (!content || !catKey) {
            return null;
        }
        
        return content.skills.find(skill => skill.key === catKey) ?? null;
    });

    // Make division a computed signal
    division = computed(() => {
        const category = this.category();
        const divKey = this.divisionKey();
        
        if (!category || !divKey) {
            return null;
        }
        
        return category.subdivisions?.find(subdivision => subdivision.key === divKey) ?? null;
    });

    // Now skill computed can use the other computed signals
    skill = computed(() => {
        const division = this.division();
        const skKey = this.skillKey();
        
        if (!division || !skKey) {
            return null;
        }

        return division.items?.find(item => item.key === skKey) ?? null;
    });

    skillDetails = computed(() => {
        if (this.contentService.skillDetails()) {
            return this.contentService.skillDetails()[this.skillKey()];
        }
        return [];
    });

    experienceDetails = computed(() => {
        if (this.contentService.experienceDetails()) {
            return this.contentService.experienceDetails()[this.skillKey()];
        }
        return [];
    });

    // Filtered skill details based on search value
    filteredSkillDetails = computed(() => {
        const details = this.skillDetails();
        const search = this.searchValue().toLowerCase().trim();
        
        if (!search) {
            return details;
        }
        
        return details.filter((detail: string) => 
            detail.toLowerCase().includes(search)
        );
    });

    // Filtered experience details based on search value
    filteredExperienceDetails = computed(() => {
        const details = this.experienceDetails();
        const search = this.searchValue().toLowerCase().trim();
        
        if (!search) {
            return details;
        }
        
        return details.filter((detail: string) => 
            detail.toLowerCase().includes(search)
        );
    });

    constructor() {
        effect(() => {
            if (!this.contentService.skillDetails()) {
                this.getDetails();
            }
        });
    }
    
    ngOnInit(): void {
        // Subscribe to route params
        this.route.params.subscribe(params => {
            this.categoryKey.set(params['category'] || '');
            this.divisionKey.set(params['division'] || '');
            this.skillKey.set(params['key'] || '');
        });
    }

    getDetails(): void {
        const skill = this.skill();
        if (skill) {
            this.contentService.loadSkillDetails();
            this.contentService.loadExperienceDetails();
        }
    }

    onToggleChange(): void {
        this.searchValue.set('');
    }

    goBack(): void {
        this.router.navigate(['/home']);
    }

}