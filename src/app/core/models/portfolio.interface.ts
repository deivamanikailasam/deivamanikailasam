/**
 * Portfolio-specific interfaces
 * These interfaces define the structure of portfolio data
 */

export interface Profile {
  name: string;
  title: string;
  bio: string;
  email: string;
  phone?: string;
  location?: string;
  avatar?: string;
  backgroundImage?: string;
  socials?: Social[];
}

export interface Social {
  platform: string;
  url: string;
  icon: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string | string[];
  technologies?: string[];
  companyLogo?: string;
  backgroundImage?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  image?: string;
  link?: string;
  github?: string;
  featured: boolean;
}

export interface SkillItem {
  key: string;
  name: string;
  image?: string;
  icon?: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface SkillSubdivision {
  title: string;
  key: string;
  items: SkillItem[];
}

export interface Skill {
  id: string;
  category: string;
  key: string;
  subdivisions?: SkillSubdivision[];
  items?: SkillItem[]; // Keep for backward compatibility
  icon?: string;
  color?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  icon?: string;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  content: string;
  image?: string;
}

export interface ContactInfo {
  email: string;
  phone?: string;
  location?: string;
  socials?: Social[];
}

export interface PortfolioContent {
  version: string; // Semantic versioning (e.g., "1.0.0")
  profile: Profile;
  experience: Experience[];
  education: Experience[];
  skills: Skill[];
  projects: Project[];
  achievements: Achievement[];
  testimonials: Testimonial[];
  contact: ContactInfo;
}

