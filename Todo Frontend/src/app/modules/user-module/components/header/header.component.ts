import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CustomDialogFormDirective } from '../../../../directive/custom-dialog-form.directive';
import { DialogDirective } from '../../../../directive/dialog.directive';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ThemeService } from '../../../../services/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule, CustomDialogFormDirective, DialogDirective, MatSelectModule, MatFormFieldModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private themeService:ThemeService){}
  fields=[
    {name:"title", placeholder:"Enter title", value:""},
    {name:"message", placeholder:"Enter message", value:""},
  ]

  field_add_task=[
    {name:"title", placeholder:"Enter title", value:""},
    {name:"description", placeholder:"Enter description", value:""},
  ]


  imagesFolderPath = '../../../../../assets/';
  imageNames = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg','6.jpg','7.jpg', '8.jpg', '9.jpg', '10.jpg', '11.jpg','12.jpg','13.jpg', '14.jpg', '15.jpg', '16.jpg','17.jpg', '18.jpeg', '19.jpg','20.jpg','21.jpg', '22.jpg', '23.jpg', '24.jpg', '25.jpg', '26.jpg','27.jpg', '28.jpg', '29.jpg','30.jpg','31.jpg', '32.png','33.png','34.png','35.png','36.png','37.png',]; // Image files

  selectedImage: string = '1.jpg';
  theme = ""
  // getImagePath(imageName: string): string {
  //   this.selectedImage = imageName
  //   this.themeService.setTheme(imageName);
  //   return `${this.imagesFolderPath}${imageName}`;
  // }
  onThemeChange(selectedImage: string) {
    // alert("Theme changed to: " + selectedImage);
    this.theme = selectedImage
    localStorage.setItem('theme', selectedImage);
    this.themeService.setTheme(selectedImage);
  }

  getThemePath(imageName: string | null): string {
    // alert( `get theme path ${imageName ? `../../../../../assets/${imageName}` : ''}`)
    return imageName ? `../../../../../assets/${imageName}` : '';
  }

  isVideo(theme: string | null): boolean {
    // alert( `is video ${theme ? theme.endsWith('.mp4') : false}`)
    return theme ? theme.endsWith('.mp4') : false;
  }
}
