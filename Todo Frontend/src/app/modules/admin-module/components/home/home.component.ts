import { Component } from '@angular/core';
import { GetAdminDashboard } from '../../../../store/actions/tasks.actions';
import { Select, Store } from '@ngxs/store';
import { TasksState } from '../../../../store/state/tasks.state';
import { Observable } from 'rxjs';
import { AdminService } from '../../../../services/admin.service';
import { ToastrService } from 'ngx-toastr';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatButtonModule, CommonModule, MatProgressSpinnerModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  response:any;
  users:any;
  loading: boolean = true;
  completedTasks : any[] = [];
  totalTaskCompleted : number[] = [];

  @Select(TasksState.getAdminDashboard) user$!:Observable<any>
  @Select(TasksState.getUserCompletedTasks) completedTasks$!:Observable<any>
  @Select(TasksState.getTotalTasksCompletedByUser) totalTaskCompleted$!:Observable<any>
  @Select(TasksState.loadingState) loading$!:Observable<any>

  selectRole!:string;

  constructor(private store:Store ,private admin:AdminService, private toaster:ToastrService){}

ngOnInit(): void {

this.loading$.subscribe(res =>{
    this.loading = res
})

 this.user$.subscribe(res =>{
     if(res.length === 0){
       this.store.dispatch(new GetAdminDashboard())
     }
     this.users = res
 })

 this.totalTaskCompleted$.subscribe(res =>{
    this.totalTaskCompleted = res
    console.log("total::", res)
 })

 this.completedTasks$.subscribe(res =>{
    this.completedTasks = res
 })

}


handleChangeRole(role:any, id:any){

        console.log("current role is: ", role)
    console.log("current id is: ", id)
    this.admin.changeRole({role, id}).subscribe((res) => {
      this.response=res;
      if(this.response.success===true){
          this.toaster.success(`${this.response.user.username}'s role is updated to ${this.response.user.role}`)
      }else if(this.response.success===false){
             this.toaster.error(this.response.error)
      }
    })   
}



handleDeleteUser(id:any){
     console.log("id:" , id)
     this.admin.deleteUser(id).subscribe((res) => {
         this.response = res;
         if(this.response.success===true){

          this.users = this.users.filter((user:any) => {
            return user._id !== id
            })
            this.toaster.success("user deleted!!!")

         }else if(this.response.success===false){

             this.toaster.error(this.response.error)
             
         }
     })
     
}


}
