import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { TasksState } from '../../../../store/state/tasks.state';
import { Observable } from 'rxjs';
import { GetProfile } from '../../../../store/actions/tasks.actions';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner"
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatProgressSpinnerModule, CommonModule, RouterModule, RouterOutlet],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  response:any;
  userProfile:any;
  completedTasks:any;
  pendingTasks:any;
  totalTasks:any;
  loading: boolean = true;


  @Select(TasksState.getProfile) userProfile$!:Observable<any>;
  @Select(TasksState.loadingState) loading$!:Observable<any>;
  @Select(TasksState.getCompletedTaskLength) completedTasks$!:Observable<any>;
  @Select(TasksState.getTolalTaskLength) totalTasks$!:Observable<any>;
  @Select(TasksState.getTasks) isStateLoaded$!:Observable<any>;

  constructor(private store:Store ) {}


  ngOnInit(): void {

   

    this.completedTasks$.subscribe(res => {
         console.log("Completed tasks", res)
    })
   

   this.userProfile$.subscribe(res => {
    console.log('ProfileResponse', res)
      this.response = res
    if(Object.keys(res).length===0){
      console.log("in ladder ")
      this.store.dispatch(new GetProfile())
      this.userProfile = res
      setTimeout(() => {
      this.loading = false
      }, 500);

  }else{
    
    this.userProfile = res
    this.loading = false
  }
      
      
   })
   

   this.isStateLoaded$.subscribe(res => {
       console.log("Is State loaded: ", res)
       if(res.length === 0){
               this.userProfile$.subscribe(res => {
            console.log("profile: ", res)
            this.response = res;
            let completedTaskss = this.response.tasks?.filter((task:any) => {
                   return task.isCompleted === true;
              })
              this.totalTasks = this.response.tasks?.length;
              this.completedTasks = completedTaskss?.length
              this.pendingTasks = this.totalTasks - this.completedTasks

       })
          
       }else{
           this.totalTasks$.subscribe(res =>{
            console.log("totallllll: ", res)
               this.totalTasks = res
               this.completedTasks$.subscribe(res =>{
                    this.completedTasks = res
                      this.pendingTasks = this.totalTasks - this.completedTasks
               })
           })

       }


   })
  }


}
