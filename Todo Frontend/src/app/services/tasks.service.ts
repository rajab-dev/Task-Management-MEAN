import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http:HttpClient) { }

  addTask(data:any){
    console.log("from service", data)
    return this.http.post("https://task-management-lcvq.onrender.com/task/new", data,{
      withCredentials:true,
    });

  }

  getAlltasks(){
    return this.http.get("https://task-management-lcvq.onrender.com/task/all-tasks",);
 }

 getUserTasks(data:any){
  return this.http.post("https://task-management-lcvq.onrender.com/task/getUserTasks", data);
}


  deleteTask(id:any){
    return this.http.delete(`https://task-management-lcvq.onrender.com/task/delete/${id}`,{
    })
 }


  updateTask(id:any){
    console.log("from service", id)
      
    return this.http.put(`https://task-management-lcvq.onrender.com/task/update/${id}`, {
    })
}




editTask(id:any, data:any){
    console.log("from service", id)

    return this.http.put(`https://task-management-lcvq.onrender.com/task/edit/${id}`, data)
} 

}
