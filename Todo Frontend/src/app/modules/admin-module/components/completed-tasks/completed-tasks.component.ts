import { Component } from '@angular/core';
import { AdminService } from '../../../../services/admin.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-completed-tasks',
  standalone: true,
  imports: [    
    ReactiveFormsModule, 
    MatButtonModule, 
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    MatCheckboxModule,
    FormsModule],
  templateUrl: './completed-tasks.component.html',
  styleUrl: './completed-tasks.component.css'
})
export class CompletedTasksComponent {
  response:any;
  allTasks:any[]=[];
  loading : boolean = true;
  
  constructor( private admin:AdminService ){}

  ngOnInit(): void {
     this.admin.getAllUserTasks().subscribe((res) => {
         this.response = res;

         setTimeout(() => {
            this.loading = false;
         }, 500);

         if(this.response.success === true){

            this.allTasks = this.response.tasks;
            console.log("All TAsks:", this.allTasks)
            this.allTasks = this.allTasks.filter((task:any) => {
                return task.isCompleted === true;
            })
            this.allTasks.reverse();
         }

         console.log("All Task Frontend:", this.allTasks)
     })
  }
}
