import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  private nonce: string | null = null;

  registerUser(data:any){
    console.log("from service", data)
    return this.http.post("http://localhost:5000/user/register", data, {
    });

  }

  loginUser(data:any){
    console.log("from service", data)
    return this.http.post("http://localhost:5000/user/login", data, {
    }); 
  }

  logoutUser(){
    return this.http.get("http://localhost:5000/user/logout");
  }

  // tknCookies(){
  //  const tkn =  this.cookie.get("token")
  //  console.log("token from frontend through cookies =>", tkn)
  //  return tkn
  // }

  
  isLoggedIn(){
    let token = localStorage.getItem("token");
    return token;
  };

  getRefreshToken(){
    return localStorage.getItem("refreshToken")
  }


  updateTokens(accessToken:string, refreshToken:string){
    localStorage.setItem("token",accessToken)
    localStorage.setItem("refreshToken",refreshToken)
  }


  // istokenExpired(){
  //   let token = localStorage.getItem("token");
  //   return this.jwtHelper.isTokenExpired(token)
  // }

  isLoggedBoolean(){
     let token = localStorage.getItem("token")
     if(token){
      return true
     }else{
      return false
     }
  }
  
  isAdmin(){
    console.log("from service")
    return this.http.get("http://localhost:5000/user/check-role")
  }


  getProfile(){
     console.log("from service")
     return this.http.get("http://localhost:5000/user/me")
  }


  refreshToken():Observable<string>   {
    return this.http.get<string>("http://localhost:5000/user/refresh-token")
  }

  getCsrfToken(name:any){
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      const cookieValue = parts.pop();
      console.log("Got CSRF TOKEN =>", cookieValue)

     return cookieValue 
      // return cookieValue ? cookieValue.split(';').shift() : null;
    }
    return null;
  }


  fetchNonce() {
    return this.http.get<string>('/', { observe: 'response' }).pipe(
        tap(response => {
            this.nonce = response.headers.get('X-Nonce');
            console.log("nonce from service =>", this.nonce)
        })
    );
}

getNonce(): string | null {
  return this.nonce;
}


}
