import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  getProfile(){
    console.log("from service")
    return this.http.get("https://task-management-lcvq.onrender.com/user/me")
 }

  updateProfile(data:any){
     return this.http.put("https://task-management-lcvq.onrender.com/user/update-profile", data)
  }

  changePassword(data:any){
    return this.http.put("https://task-management-lcvq.onrender.com/user/change-password", data)
  }

  sendMessage(data:any){
    return this.http.post("https://task-management-lcvq.onrender.com/user/send-message", data)
  }


}

