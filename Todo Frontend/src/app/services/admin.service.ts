import { Injectable } from '@angular/core';

import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }

adminDashboard(){
 return this.http.get("http://localhost:5000/admin/dashboard")
}

changeRole(data:any){
   return this.http.post("http://localhost:5000/admin/change-role", data)
}

deleteUser(id:any){
  return this.http.delete(`http://localhost:5000/admin/delete-user/${id}`)
}


getAllUserTasks(){
  return this.http.get("http://localhost:5000/admin/get-users-tasks")
}

getAllMessages(){
    return this.http.get("http://localhost:5000/admin/get-messages")
}

getAllUsers(){
  return this.http.get("http://localhost:5000/admin/get-users")
}
   
}
