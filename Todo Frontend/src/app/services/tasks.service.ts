import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http:HttpClient) { }

  addTask(data:any){
    console.log("from service", data)
    return this.http.post("http://localhost:5000/task/new", data,{
      withCredentials:true,
    });

  }

  getAlltasks(){
    return this.http.get("http://localhost:5000/task/all-tasks",);
 }

 getUserTasks(data:any){
  return this.http.post("http://localhost:5000/task/getUserTasks", data);
}


  deleteTask(id:any){
    return this.http.delete(`http://localhost:5000/task/delete/${id}`,{
    })
 }


  updateTask(id:any){
    console.log("from service", id)
      
    return this.http.put(`http://localhost:5000/task/update/${id}`, {
    })
}




editTask(id:any, data:any){
    console.log("from service", id)

    return this.http.put(`http://localhost:5000/task/edit/${id}`, data)
} 

}
