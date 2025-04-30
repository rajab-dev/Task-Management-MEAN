import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { ThemeService } from '../../../../services/theme.service';
import { map, Observable, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-user-container',
  standalone: true,
  imports: [RouterModule, HeaderComponent, CommonModule],
  templateUrl: './user-container.component.html',
  styleUrl: './user-container.component.css'
})
export class UserContainerComponent {
theme$: Observable<string>;
theme:string | null = null
videoInitialized=false
currentTheme: string = '';
@ViewChild('bgVideo') bgVideo!: ElementRef<HTMLVideoElement>;
constructor(private themeService:ThemeService, private cdRef: ChangeDetectorRef){; 
  this.theme$ = this.themeService.themeChange$; // Directly assign observable
}

// image=""
// theme=""
// private themeSubscription!: Subscription;
ngOnInit(): void {  
  this.themeService.themeChange$.subscribe((theme) => {
    this.currentTheme = theme;
    // Delay to ensure <video> is rendered before trying to load
    setTimeout(() => {
      if (this.isVideo(this.currentTheme) && this.bgVideo?.nativeElement) {
        this.bgVideo.nativeElement.load();
      }
    }, 100);
  });
  // this.theme$ = this.themeService.themeChange$;
  // image = "";
  // theme = "";

  // constructor(private themeService: ThemeService, private cdRef: ChangeDetectorRef) {}
  // this.themeSubscription = this.themeService.themeChange$.subscribe((imageName) => { 
  //     console.log("event triggered ", imageName);
  //     this.image = imageName;
  //     this.theme="../../../../../assets/"
  //     console.log("event triggered ", imageName);
  //     this.theme = `${this.theme}${imageName}`;
      
  //     // ✅ Force Angular to detect changes after async update
  //     // this.cdRef.detectChanges();
  //     setTimeout(() => this.cdRef.detectChanges(), 0);
  //   });
}


ngAfterViewInit(): void {
  this.videoInitialized = true;
  this.handleVideoReload();
}
ngOnDestroy(): void {
  // if (this.themeSubscription) {
  //   this.themeSubscription.unsubscribe();
  //   console.log("Theme subscription unsubscribed.");
  // }
}

getThemePath(imageName: string | null): string {
  // alert( `get theme path ${imageName ? `../../../../../assets/${imageName}` : ''}`)
  this.theme = imageName
  return imageName ? `../../../../../assets/${imageName}` : '';
}
 
isVideo(theme: string | null): boolean {
  // alert( `is video ${theme ? theme.endsWith('.mp4') : false}`)
  return theme ? theme.endsWith('.mp4') : false;
}


handleVideoReload() {
  // Only reload video if it's a video type and video element is initialized
  setTimeout(() => {
    if (
      this.videoInitialized &&
      this.isVideo(this.currentTheme) &&
      this.bgVideo?.nativeElement
    ) {
      const videoEl = this.bgVideo.nativeElement;
      videoEl.load(); // Reset video source
      videoEl.play().catch((err) => {
        console.warn('Autoplay failed:', err);
      });
    }
  }, 100);
}
}
