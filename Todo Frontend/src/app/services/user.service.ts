import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  getProfile(){
    console.log("from service")
    return this.http.get("http://localhost:5000/user/me")
 }

  updateProfile(data:any){
     return this.http.put("http://localhost:5000/user/update-profile", data)
  }

  changePassword(data:any){
    return this.http.put("http://localhost:5000/user/change-password", data)
  }

  sendMessage(data:any){
    return this.http.post("http://localhost:5000/user/send-message", data)
  }


}

