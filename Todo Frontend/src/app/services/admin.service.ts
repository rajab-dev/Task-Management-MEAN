import { Injectable } from '@angular/core';

import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }

adminDashboard(){
 return this.http.get("https://task-management-lcvq.onrender.com/admin/dashboard")
}

changeRole(data:any){
   return this.http.post("https://task-management-lcvq.onrender.com/admin/change-role", data)
}

deleteUser(id:any){
  return this.http.delete(`https://task-management-lcvq.onrender.com/admin/delete-user/${id}`)
}


getAllUserTasks(){
  return this.http.get("https://task-management-lcvq.onrender.com/admin/get-users-tasks")
}

getAllMessages(){
    return this.http.get("https://task-management-lcvq.onrender.com/admin/get-messages")
}

getAllUsers(){
  return this.http.get("https://task-management-lcvq.onrender.com/admin/get-users")
}
   
}
