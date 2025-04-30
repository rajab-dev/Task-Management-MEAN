import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ ReactiveFormsModule, RouterModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

  response:any

  constructor(private auth:AuthService, private toaster:ToastrService, private router:Router){}

  signupForm = new FormGroup({
    username: new FormControl("",[Validators.required]),
    email: new FormControl("",[Validators.required, Validators.email]),
    password: new FormControl("",[Validators.required, Validators.minLength(8)]),
  })

handleSignUp(){
  console.log("on submit:", this.signupForm.value)
  this.auth.registerUser(this.signupForm.value).subscribe((res)=>{
       console.log("Response:",res)
       this.response=res;

       if(this.response.success===true){

        localStorage.setItem("token",this.response.token)   
        this.toaster.success(`Registration Successfull!!!` )
        this.router.navigate(["/user/home"]) 
        // console.log("registered user is =>", this.response);
        
       }else if(this.response.success===false){
            this.toaster.error(this.response.error)
       }
  })

}

get usernameValidator(){
 return this.signupForm.get("username")
}

get emailValidator(){
 return this.signupForm.get("email")
}

get passwordValidator(){
 return this.signupForm.get("password")
}

}
