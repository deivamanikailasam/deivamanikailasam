import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SkillDataService {
  private readonly skillDetailsLocalStorageKey = 'skill-details-data';
  private readonly experienceDetailsLocalStorageKey = 'experience-details-data';
  private readonly skillDetailsPath = 'src/assets/data/skill-details.json';
  private readonly experienceDetailsPath = 'src/assets/data/experience-details.json';

  constructor(private http: HttpClient) {}

  /**
   * Save skill details to local storage and file system
   * @param skillDetails The skill details object to save
   */
  async saveSkillDetails(skillDetails: any): Promise<void> {
    // Save to localStorage for local persistence
    this.saveToLocalStorage(skillDetails, this.skillDetailsLocalStorageKey);

    // Save to file system
    await this.saveToFileSystem(skillDetails, this.skillDetailsPath);
  }

  /**
   * Save experience details to local storage and file system
   * @param experienceDetails The experience details object to save
   */
  async saveExperienceDetails(experienceDetails: any): Promise<void> {
    // Save to localStorage for local persistence
    this.saveToLocalStorage(experienceDetails, this.experienceDetailsLocalStorageKey);

    // Save to file system
    await this.saveToFileSystem(experienceDetails, this.experienceDetailsPath);
  }

  /**
   * Save to localStorage
   */
  private saveToLocalStorage(data: any, key: string): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      console.log(`✅ Data saved to localStorage (${key})`);
    } catch (error) {
      console.error('❌ Error saving to localStorage:', error);
      throw error;
    }
  }

  /**
   * Load from localStorage
   */
  loadFromLocalStorage(key: string): any | null {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('❌ Error loading from localStorage:', error);
      return null;
    }
  }

  /**
   * Save to file system using the File System Access API
   */
  private async saveToFileSystem(data: any, filePath: string): Promise<void> {
    try {
      const jsonString = JSON.stringify(data, null, 2);
      
      // Call the file server running on port 3001
      const fileServerUrl = 'http://localhost:3001/api/save-file';
      
      console.log(`📤 Sending save request to: ${fileServerUrl}`);
      
      const response = await fetch(fileServerUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          path: filePath,
          content: jsonString
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to save file: ${response.statusText} - ${errorText}`);
      }

      const result = await response.json();
      console.log(`✅ File saved successfully: ${filePath}`);
      console.log(`📁 Saved to: ${result.path}`);
    } catch (error) {
      console.error('❌ Error saving to file system:', error);
      console.log('💡 Make sure the file server is running on port 3001');
      console.log('💡 Start it with: npm run file-server');
      throw error;
    }
  }

  /**
   * Clear local storage
   */
  clearLocalStorage(): void {
    localStorage.removeItem(this.skillDetailsLocalStorageKey);
    localStorage.removeItem(this.experienceDetailsLocalStorageKey);
    console.log('🗑️ Local storage cleared');
  }
}

