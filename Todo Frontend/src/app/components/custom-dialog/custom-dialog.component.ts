import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from "@angular/material/dialog";
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-custom-dialog',
  standalone: true,
  imports: [MatButtonModule, MatIconModule,MatDialogModule, CommonModule],
  templateUrl: './custom-dialog.component.html',
  styleUrl: './custom-dialog.component.css'
})
export class CustomDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<CustomDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; description: string; icon?: string; color:string; titleColor:string; type:string, btnColor:string }
  ) {}

  onCancel(): void {
    this.dialogRef.close(null); 
  }

  onConfirm(): void {
    this.dialogRef.close("ok"); 
  }
}
