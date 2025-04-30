import { CommonModule } from '@angular/common';
import { Component, ElementRef, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner"
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { select, Select, Store } from '@ngxs/store';
import { catchError, Observable, startWith, Subscription } from 'rxjs';
import { TasksState } from '../../../../store/state/tasks.state';
import { AddTask, DeleteTask, GetAllTasks } from '../../../../store/actions/tasks.actions';
import { DialogDirective } from '../../../../directive/dialog.directive';
import { CustomDialogFormDirective } from '../../../../directive/custom-dialog-form.directive';
import { SearchControlComponent } from '../search-criteria/search-control.component';
// import { CommonModule } from '@angular/common';
// import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
// import { MatCardModule } from '@angular/material/card';
// import { MatToolbarModule } from '@angular/material/toolbar';
// import { MatIconModule } from '@angular/material/icon';
// import { MatInputModule } from '@angular/material/input';
// import { MatButtonModule } from '@angular/material/button';
// import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
// import { HandlerService } from 'src/app/core/user-management/services/handler.service';
// import { MaterialModule } from './components/material/material.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTreeModule } from '@angular/material/tree';
import { MatMenuModule } from '@angular/material/menu';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker'; 
import { TasksService } from '../../../../services/tasks.service';
import { ToastrService } from 'ngx-toastr';
import { ChangeDetectorRef } from '@angular/core';
import { ThemeService } from '../../../../services/theme.service';
import { TaskEventService } from '../../../../services/task-event.service';
@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [
    MatProgressSpinnerModule, 
    CommonModule, 
    ReactiveFormsModule, 
    FormsModule,
    MatCardModule,
    MatToolbarModule,
    // MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule, 
    DialogDirective,
    MatIconModule,
    // MatAuto
    CustomDialogFormDirective,
    SearchControlComponent,

        CommonModule,
        FormsModule,
        // MatIconModule,
        MatFormFieldModule,
        MatFormFieldModule,
        MatCheckboxModule,
        MatDialogModule,
        MatTableModule,
        MatToolbarModule,
        MatDatepickerModule,
        MatPaginatorModule,
        MatSelectModule,
      //  MaterialModule,
      //  RouterModule,
       MatNativeDateModule,
        ReactiveFormsModule,
        MatProgressSpinnerModule,
        NgxMatTimepickerModule,
        MatProgressBarModule,
        MatTooltipModule,
        MatBadgeModule,
        MatTreeModule,
        MatMenuModule,
        MatAutocompleteModule
  ],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class AddTaskComponent {
  totalTasks = 0;
  pageSize = 6;
  currentPage = 0;
  data:any;
  expandedTaskId: string | null = null;
  isOPtionsOpen=false
  specificTaskID:string | null = null;
  isDarkMode = false;

@ViewChild('description') descriptionField!: ElementRef;
@ViewChild('taskCard') taskCard!: ElementRef;

constructor(private store:Store, private task: TasksService, private toaster:ToastrService, private cdr: ChangeDetectorRef, private taskEventService:TaskEventService){ }
adjustTextareaHeight(textarea: any): void {
  // const textarea = this.descriptionField?.nativeElement;
  // console.log("textarea: ", textarea)
  if (textarea) {
    textarea.style.height = 50; // Reset height to recalculate
    console.log("scroll height ",textarea.scrollHeight);
    console.log("style height ",textarea.style.height);
    if(!textarea.style.height < textarea.scrollHeight){
      textarea.style.height = textarea.scrollHeight + 'px'; // Set to content height
    }
  }
}

  toggleDescription(taskId: string) {
    this.expandedTaskId = this.expandedTaskId === taskId ? null : taskId;
  }

  // expandedTaskId: string | null = null;

  togglePanel(taskId: string) {
    this.expandedTaskId = this.expandedTaskId === taskId ? null : taskId;
    this.resizeTextArea(this.descriptionField)
  }

resizeTextArea(textarea: any) {
  console.log("data from text ", textarea)
  this.adjustTextareaHeight(textarea)
}

  getDefaultValues(task:any){
    return [
   {name:"title", placeholder:"Enter Title", value:task.title},
   {name:"description", placeholder:"Enter Description", value:task.description},
 ]
 }



  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode
  }
  @Select(TasksState.getTasks) allTasks$!:Observable<any>
  @Select(TasksState.loadingState) loading$!:Observable<any>
 
  taskSubscribe!:Subscription 

  taskForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });
  allTasks:any[]=[]

   count=0;
   loading:boolean=false;


  ngOnInit(){

    this.loading = false;
     this.taskEventService.taskAdded$.subscribe(
      (res) => {
      console.log("Received Added task:", res);
      // Handle the updated task here
      if(res.success === true){
        this.toaster.success("Task Added Successfully")
        this.allTasks.unshift(res.newTask)
        this.taskForm.reset();
      }else{
        this.toaster.error(res.error)
      }
    },
    (error) => {
      this.toaster.error(error.message)
    }
    );
  }

  

  handleAddTask(){
    // this.store.dispatch(new AddTask(this.taskForm.value))
    // this.taskForm.reset();
    // this.allTasks.unshift(this.taskForm.value)
    this.task.addTask(this.taskForm.value).subscribe(
      (res:any) => {
        if(res.success === true){
          this.toaster.success("Task Added Successfully")
          this.allTasks.unshift(res.newTask)
          this.taskForm.reset();
        }else{
          this.toaster.error(res.error)
        }
      },
      (error) => {
        this.toaster.error(error.message)
      }

    )
  }

  handleDelete(id:string){
    this.store.dispatch(new DeleteTask(id))
     
  }

  handleUpdate(id:string){
     this.task.updateTask(id).subscribe( 
      (res:any) => {
      this.loading=false
  },
  (error) => {
    this.toaster.error(error.message)
    this.loading=false
  }
)
}

slideIn(actionPanel: HTMLElement, taskId:string) {
  this.specificTaskID = this.specificTaskID === taskId ? null : taskId;
  console.log("slide in hit...")
  // actionPanel.style.display = 'flex';
  // actionPanel.style.width = '150px';
  // actionPanel.style.opacity = '1';

  actionPanel.style.display = 'flex';
  actionPanel.style.transition = 'all 0.5s ease-in-out'; // Smoother easing
  actionPanel.style.width = '150px';
  actionPanel.style.opacity = '1';
  actionPanel.style.transform = 'translateX(0)'; // Slide in from the right
  this.isOPtionsOpen=true;
}

slideOut(actionPanel: HTMLElement) {

  this.specificTaskID =null
  // this.specificTaskID = this.specificTaskID === taskId ? null : taskId;
  console.log("slide out hit...")

  // actionPanel.style.width = '0';
  // actionPanel.style.display = 'none';
  // actionPanel.style.opacity = '0';

  actionPanel.style.transition = 'all 0.5s ease-in-out'; // Smoother easing
  actionPanel.style.width = '0';
  actionPanel.style.opacity = '0';
  actionPanel.style.transform = 'translateX(20px)'; // Slide out to the right
  setTimeout(() => {
    actionPanel.style.display = 'none';
  }, 500); // Hide after transition completes
  this.isOPtionsOpen=false;
}
// slideIn(actionPanel: HTMLElement) {
//   actionPanel.style.transform = 'translateX(0)';
//   actionPanel.style.opacity = '1';
// }

// slideOut(actionPanel: HTMLElement) {
//   actionPanel.style.transform = 'translateX(100%)';
//   actionPanel.style.opacity = '0';
// }
onFormSubmit(res: any, actionPanel: HTMLElement) {
  console.log('EDIT FORM SUBMITTED: ', res);
  
  if (res.success === true) {
    let index = this.allTasks.findIndex((task: any) => task._id === res.task._id);
    this.allTasks.splice(index, 1, res.task);
  }

  // Hide the action panel after form submission
  this.slideOut(actionPanel);
}


  doSearch(model: any) {
    // alert("form submitted!!!")
    console.log("here is model for Do search ", model)
    this.allTasks = [];
    this.loading = true
     model.pageSize = this.pageSize;
     model.page = this.currentPage;
     this.data = model;
     this.task.getUserTasks(model).subscribe(
      (res:any) => {
          this.allTasks = res.tasks;
          // console.log("resp ", res);
          this.loading=false
          this.totalTasks = res.total

          if(res.tasks.length === 0){
            this.toaster.error("No tasks found")
          }
          
          // setTimeout(() => {
          //   this.adjustTextareaHeight();
          //   // console.log("here is textarea ",document.querySelector('textarea'));
          // }, 200);
          
      },
      (error) => {
        this.toaster.error(error.message)
        this.loading=false
      }

     )
    // this.taskSubscribe = this.allTasks$.subscribe(res => {
     
    //   // if(res.length === 0 && this.count === 0){
    //       this.store.dispatch(new GetAllTasks())
    //       this.allTasks = res;
    //       this.count ++ 
    //        this.loading = false
    //         // setTimeout(() => {
    //         //    this.loading = false
    //         //  }, 500);
    //   // }else{
    //   //  this.allTasks = res;
    //   //  this.loading = false
    //   // }
// }
// )
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;

    this.data.page = this.currentPage+1;
    this.data.pageSize = this.pageSize;
    this.doSearch(this.data)
  }

  copyToClipboard(e:MouseEvent, text: string) {
    e.stopPropagation();
    e.preventDefault();


    if (!text) return; // If there's no text, don't do anything
  
    navigator.clipboard.writeText(text).then(() => {
      this.toaster.show("Text copied to clipboard");
    }).catch(err => {
      // console.error("Failed to copy: ", err);
      this.toaster.error("Failed to copy: " + err);

    });
  }
}
