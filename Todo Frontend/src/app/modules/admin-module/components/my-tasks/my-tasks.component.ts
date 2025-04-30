import { Component } from '@angular/core';
import { TasksService } from '../../../../services/tasks.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../../services/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-my-tasks',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    MatButtonModule, 
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    MatCheckboxModule,
    FormsModule
  ],
  templateUrl: './my-tasks.component.html',
  styleUrl: './my-tasks.component.css'
})
export class MyTasksComponent {


  allTasksObj: any;
  allTasks: any[] = [];
  addedTask: any;
  response: any;
  readOnly: boolean = true;
  idx: number = 12345678900;
  loading:boolean = true;

  taskForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

  constructor(
    private tasks: TasksService,
    private toaster: ToastrService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {


    this.tasks.getAlltasks().subscribe((res) => {
      console.log('Response: ', res);
      this.allTasksObj = res;
      setTimeout(() => {
        this.loading = false;
      }, 300);
      
      this.allTasks = this.allTasksObj.tasks.reverse();
      console.log('All Tasks: ', this.allTasks);
      this.allTasks = this.allTasks.filter((task:any) => {
           return  task.isCompleted === false;
      })
    });
  }

  handleAddTask() {
    console.log(this.taskForm.value);
    this.tasks.addTask(this.taskForm.value).subscribe((res) => {
      console.log('Response: ', res);
      this.addedTask = res;
      if (this.addedTask.success === true) {
        this.allTasks.unshift(this.addedTask.newTask);
        this.addedTask = this.allTasks;
        this.taskForm.reset();
        this.toaster.success('Task added successfully!!!');
      } else if (this.addedTask.success === false) {
        this.toaster.error(this.addedTask.error);
      }
    });
  }

  handleDelete(id: any) {
    console.log('id:', id);

    this.tasks.deleteTask(id).subscribe((res) => {
      this.response = res;
      if (this.response.success === true) {
        this.allTasks = this.allTasks.filter((task) => {
          return task._id !== id;
        });

        this.toaster.success('Task deleted successfully');
      } else if (this.response.success === false) {
        this.toaster.error(this.response.error);
      }
    });
  }

  handleUpdate(id: any) {
    console.log('id', id);
    this.tasks.updateTask(id).subscribe((res) => {
      console.log('Response: ', res);
      this.response = res;
      if (this.response.success === true) {
           this.allTasks = this.allTasks.filter((task:any) => {
                return task._id !== id;
           })
        if (this.response.task.isCompleted === true) {
          this.toaster.success('Task is marked as Done!!!');
        } else if (this.response.task.isCompleted === false) {
          this.toaster.success('Task is marked as UnDone!!!');
        }
      }
    });
  }

  handleLogout() {
    this.auth.logoutUser().subscribe((res) => {
      this.response = res;
      if (this.response.success === true) {
        localStorage.removeItem('token');
        this.toaster.success('Logout Successfull');
        this.router.navigate(['/login']);
      } else if (this.response.success === false) {
        this.toaster.error(this.response.error);
      }
    });
  }

  toggleEdit(id: any, index: any) {
    console.log('id:', id);
    this.readOnly = !this.readOnly;
    this.idx = index;
    console.log('iseditable:', this.readOnly);
  }

  handleEditTask(id: any, formData: any) {
    this.readOnly = !this.readOnly;
    console.log('update triggrerd:', id);
    console.log('edit form value', formData);
    this.tasks.editTask(id, formData).subscribe((res) => {
      console.log('Response:', res);
      this.response = res;
      if (this.response.success === true) {
        this.toaster.success('Task edited successfully!!!');
      } else if (this.response.success === false) {
        this.toaster.error(this.response.error);
      }
    });
  }

  get titleValidator() {
    return this.taskForm.get('title');
  }

  get descriptionValidator() {
    return this.taskForm.get('description');
  }

}
