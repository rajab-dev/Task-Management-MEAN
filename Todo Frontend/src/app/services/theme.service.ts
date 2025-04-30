import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isDarkMode = new BehaviorSubject<boolean>(false);
  isDarkMode$ = this.isDarkMode.asObservable();

  toggleDarkMode() {
    this.isDarkMode.next(!this.isDarkMode.value);
  }

  theme = localStorage.getItem('theme');
  
  private themeSubject = new BehaviorSubject<string>(this.theme ? this.theme : '1.jpg'); // Initial theme
  themeChange$ = this.themeSubject.asObservable();

  setTheme(imageName: string) {
    // console.log("Theme Changed to:", imageName);
    this.themeSubject.next(imageName);
  }

}
