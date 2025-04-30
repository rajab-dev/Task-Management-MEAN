import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { AddTask, DeleteTask, EditTask, GetAdminDashboard, GetAllTasks, GetProfile, HandleDeleteUser, HandleUserRole, LogoutUser, SendMessage, UpdateTask } from "../actions/tasks.actions";
import { catchError, debounceTime, of, switchMap, tap, throwError } from "rxjs";
import { AuthService } from "../../services/auth.service";
import { AdminService } from "../../services/admin.service";
import { TasksService } from "../../services/tasks.service";
import { Router } from "@angular/router";
import { UserService } from "../../services/user.service";
import { ToastrService } from "ngx-toastr";
import { DexieService } from "../../services/dexie.service";



@State<any>({
  name:"tasks",
  defaults:{
    tasks:[],
    loading:true,
    profile:{},
    adminDashboard:[],
    totalTasks:0,
    completedTasks:0,
    userCompletedTasks:[],
    totalTaskCompletedByUser:[]
  }
})

@Injectable()
export class TasksState {


  response:any;
  inCompletedTasks:any[]=[]
  users:any;
  userCompletedTasks:any[]=[];
  totalTaskCompletedByUser:any[]=[];


  constructor(
    private admin:AdminService  ,private tasks:TasksService, private toast:ToastrService, private auth:AuthService, private router:Router, private user:UserService,
    private dexieDB:DexieService,
  ){}

  @Selector()
  static getTasks (state:any){
       return state.tasks
  }

  @Selector()
  static loadingState (state:any){
    return state.loading
}




@Action(GetAllTasks)

getTasks({getState, setState}:StateContext<any>){
    console.log("State Action!!!")
   return this.tasks.getAlltasks().pipe(
    tap(res => {
          this.response = res;
          if(this.response.success === true){
              this.response.tasks.reverse();
              this.inCompletedTasks = this.response.tasks.filter((task:any)=>{
                   return task.isCompleted === false;
              });

               this.dexieDB.addTasks(this.inCompletedTasks)
               .then(()=>{
                    console.log("from state tasks added in index db")
               }).catch((error) =>{
                    console.log("error while adding tasks", error)
               })

              const totalTasks = this.response.tasks?.length
              const completedTasks = totalTasks - this.inCompletedTasks?.length
             
              const state = getState();
              setState({
                ...state,
                tasks:this.inCompletedTasks,
                loading:false,
                totalTasks:totalTasks,
                completedTasks: completedTasks,
              })
              this.toast.success("Got All Tasks!!!")
          }else{
             throw new Error(this.response.error)
          }
    }),
    catchError((error)=>{
      this.toast.error(error.message || "something went wrong")
      const state = getState();
      setState({
        ...state,
        loading:false
      })
      return throwError(error);
    })
  )
}


@Action(AddTask)

addTask({getState, patchState}:StateContext<any>, {payload}:AddTask){
  
  console.log("Add Task Value", payload)
return  this.tasks.addTask(payload).pipe(
  tap(()=>console.log("task being added....")),
  switchMap((res:any)=>{
      this.response = res;
      if(this.response.success === true){

        this.dexieDB.addTask(this.response.newTask).then(()=>{
            console.log("from state task added to index db")
        }).catch((error)=>{
             console.log("error while adding single task",error)
        })
          const state = getState();
          patchState({
          tasks:[this.response.newTask, ...state.tasks ],
          totalTasks:state.totalTasks +1 
        })
       this.toast.success("Task Added successfully")
      }else{
        throw new Error(this.response.error)
      }
      return of(this.response)
  }),
  catchError((error)=>{
      this.toast.error(error.message || "Task addition failed" )
      return throwError(error)
  })

)
}


@Action(DeleteTask)

DeleteTask({getState, setState}:StateContext<any>, {id}:DeleteTask){

  return this.tasks.deleteTask(id).pipe(tap(res => {
          this.response = res;
          if(this.response.success === true){
            const state = getState()

            this.dexieDB.deleteTask(id).then(() =>{
                console.log("from state task deleted")
            }).catch((error)=>{
               console.log("error while deleting single task",error)
          })
            state.tasks = state.tasks.filter((task:any)=>{
                 return task._id !== id;
            })
       
            setState({
              ...state,
              tasks:state.tasks,
              totalTasks:state.totalTasks -1,
            })
            this.toast.success("Task Deleted Successfull")
          }else if(this.response.success === false){
              this.toast.error(this.response.error)
          }
  }))

}

@Action(UpdateTask)
updateTask({getState, setState}:StateContext<any>, {id}:UpdateTask){
  
  return this.tasks.updateTask(id).pipe(
    debounceTime(300),
    tap(() => console.log("Task updating...")),
    switchMap((res:any) =>{
       this.response = res;
       if(this.response.success === true){
            const state = getState();
            state.tasks = state.tasks.filter((task:any) => {
              return task._id !== id;
          });

              this.dexieDB.deleteTask(id).then(() =>{
                console.log("from state task updated")
            }).catch((error)=>{
               console.log("error while updating single task",error)
          })
              setState({
                ...state,
                tasks: state.tasks,
                completedTasks:state.completedTasks +1
            });
        
            this.toast.success("Task Updated Successfull")
             return of(this.response)
        }else{
            throw new Error(this.response.error)
        }
    }),
    catchError((error)=>{
       this.toast.error(error.message || "Task update failed")
       return throwError(error);
    }),

)
}

@Action(EditTask)

editTask({getState, setState}:StateContext<any>, {id, payload}:EditTask ){

    return this.tasks.editTask(id, payload).pipe(tap(res => {
        this.response = res;
        if(this.response.success === true){

          this.dexieDB.updateTask(id,this.response.task).then(() =>{
            console.log("from state task edited")
        }).catch((error:any)=>{
           console.log("error while edit task",error)
      })
          const state = getState();

          state.tasks = state.tasks.map((task:any)=>{
               if(task._id === id){
                task.title = this.response.task.title;
                task.description = this.response.task.description;
               }

               return task
          })

          console.log("edited state tasks", state.tasks)

          setState({
            ...state,
            tasks:state.tasks
          })
            this.toast.success("task edited Successfull")
        }else if(this.response.success === false){
              this.toast.error(this.response.error)
        }  
    }))      
}

@Selector()

static getProfile (state:any){
    return state.profile
}

@Action(GetProfile)

getProfile({getState, setState}:StateContext<any>){
    return this.auth.getProfile().pipe(tap(res => {
      this.response = res;
      if(this.response.success === true){
        const state = getState();
        setState({
          ...state,
          profile:this.response.user,
          loading:false,
        })
      }
      //  console.log("User Profile from State: ", res) 
    }))
}

@Selector()

static getTolalTaskLength(state:any){
     return state.totalTasks;
}

@Selector()

static getCompletedTaskLength(state:any){
     return state.completedTasks;
}

@Selector()

static getAdminDashboard(state:any){
   return state.adminDashboard;
}

@Selector()
static getTotalTasksCompletedByUser(state:any){
    return state.totalTaskCompletedByUser
}

@Selector()
static getUserCompletedTasks(state:any){
    return state.userCompletedTasks
}

@Action(GetAdminDashboard)

getAdminDashboard({getState, setState}:StateContext<any>){
   return this.admin.adminDashboard().pipe(
    switchMap((res:any)=>{
      this.response = res;
      if(this.response.success === true){
          this.users = this.response.filteredUsers
          this.users.forEach((user:any) => {
            // console.log("for Each: ",user.tasks)
           this.userCompletedTasks = user.tasks.filter((task:any) => {
                 
                    return task.isCompleted === true
              })

              console.log("isCompleted: ", this.userCompletedTasks)
              this.totalTaskCompletedByUser.push(this.userCompletedTasks?.length) 
        });

        const state = getState()

        setState({
          ...state,
          loading:false,
          adminDashboard:this.users,
          totalTaskCompletedByUser:this.totalTaskCompletedByUser,
          userCompletedTasks:this.userCompletedTasks,
        })

      }else{
        this.toast.error(this.response.error)
      }
        return of(this.response)
    })
   )
}


@Action(HandleUserRole)
handleUserRole({getState, setState}:StateContext<any>, {role, id}:HandleUserRole){
   return this.admin.changeRole({role, id}).pipe(
      tap(()=> console.log("role action dispatched!!!")),
      tap((res:any)=>{
        console.log("res from role::",res)
          this.response = res;
          if(this.response.success === true){
            const state = getState()
            console.log("state of admin", state.adminDashboard)
           const newData = state.adminDashboard.map((user:any)=>{
              if(user._id === this.response.user._id){
                console.log("Current role before update:", user.role);
            
                user.role = (user.role === "admin") ? "user" : "admin";
                
                console.log("Updated role:", user.role);

              }
              return user
            })
            console.log("new data::", newData)
            setState({
              ...state,
              adminDashboard:newData
            })
            this.toast.success(`${this.response.user.username}'s role is updated to ${this.response.user.role}`)
          }else{
              // this.toast.error(this.response.error)
          }
      })
    )
}

@Action(HandleDeleteUser)

handleDeleteUser({getState, setState}:StateContext<any>,{ id }:HandleDeleteUser){
  return this.admin.deleteUser(id).pipe(
    switchMap((res:any)=>{
      this.response = res;
      if(this.response.success === true){
          const state = getState()
          state.adminDashboard = state.adminDashboard.filter((user:any)=>{
              return user._id !== id
          })

          setState({
             ...state,
             adminDashboard:state.adminDashboard
          })
          this.toast.success("user deleted!!!")
      }
      return of(this.response)
    })
  )
}

@Action(LogoutUser)
logoutUser({getState, setState}:StateContext<any>){
  return this.auth.logoutUser().pipe(
     tap((res)=>{
       this.response = res;
          console.log("in logout")  
       if(this.response.success === true){
        console.log("in logout ladder")
      // const tkn = localStorage.getItem("refreshToken")
      // console.log("tkn = ", tkn)
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      // this.indexedDBService.clearIndexedDB()
      this.router.navigate(['/login']); 
        const state = getState();
        setState({
          ...state,
          tasks:[],
          loading:false,
          profile:{},
          adminDashboard:[],
          totalTasks:0,
          completedTasks:0,
          userCompletedTasks:[],
          totalTaskCompletedByUser:[]
        })
        this.toast.success('Logout Successfull');
         
       }else{
          this.toast.error(this.response.error)
       }
     })
  )
}

@Action(SendMessage)

sendMessage({getState, setState}:StateContext<any>, {payload}:SendMessage){
      return this.user.sendMessage(payload).pipe(
         tap((res)=>{
             this.response = res
             console.log("got response from backend for send messsage =>", this.response)
             if(this.response.success === true){
                this.toast.success("message sent successfull")
             }else{
                 this.toast.error(this.response.error)
             }
         })
      )
}



}