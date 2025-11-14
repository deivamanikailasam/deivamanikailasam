import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { SkillDetailsComponent } from './features/skills/skill-details/skill-details.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'skills/:category/:division/:key',
    component: SkillDetailsComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/home',
  }
];
