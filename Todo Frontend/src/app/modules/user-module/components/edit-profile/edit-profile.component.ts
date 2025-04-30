import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../../services/user.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule,MatProgressSpinnerModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent {

  response:any;
  initialData:any;
  loading:boolean=true;
  constructor(private user:UserService, private toast:ToastrService) {}

  ngOnInit(): void {

    setTimeout(() => {
      this.loading = false
    }, 500);

     this.user.getProfile().subscribe((res) => {
         this.response = res;
         if(this.response.success===true){
            this.initialData = this.response.user;
            console.log("Response: ", this.initialData.username );
         }
     })

     
  }

  handleEditProfile(data:any){
      this.user.updateProfile(data).subscribe((res) => {
          this.response = res;
          if(this.response.success===true){
              this.toast.success("Profile Updated successfully!!!")
          }else if(this.response.success===false){
              this.toast.error(this.response.error)
          }
      })
  }
}
