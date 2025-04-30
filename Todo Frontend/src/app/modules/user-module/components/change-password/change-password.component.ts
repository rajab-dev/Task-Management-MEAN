import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {

  response:any;
  hide = true;

  constructor(private user:UserService, private toast:ToastrService, private router:Router){}


  loginForm = new FormGroup({
    oldPassword: new FormControl("",[Validators.required, Validators.minLength(8)]),
    newPassword: new FormControl("",[Validators.required, Validators.minLength(8)]),
    repeatPassword: new FormControl("",[Validators.required, Validators.minLength(8)]),
  })

get oldPassValidator(){
  return this.loginForm.get("oldPassword")
}

get newPassValidator(){
  return this.loginForm.get("newPassword")
}

get repeatPassValidator(){
  return this.loginForm.get("repeatPassword")
}


handleChangePassword(){
   console.log("Password data:", this.loginForm.value);  
   this.user.changePassword(this.loginForm.value).subscribe((res) => {
      this.response = res;
      if(this.response.success===true){
           this.loginForm.reset();
           this.toast.success("Password updated!!!")
           this.router.navigate(["/user/profile"]);
      }else if(this.response.success===false){
           this.toast.error(this.response.error);
      }

   })
}
}
