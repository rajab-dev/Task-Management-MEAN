import { Component } from '@angular/core';
import { AdminService } from '../../../../services/admin.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [    
    ReactiveFormsModule, 
    MatButtonModule, 
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    MatCheckboxModule,
    FormsModule
  ],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent {
  response:any;
  messages:any;
  loading:boolean = true;


    constructor(private admin:AdminService){}

    ngOnInit(){
       this.admin.getAllMessages().subscribe(res => {
           this.response = res;
           this.loading = false
           if(this.response.success === true){
               this.messages = this.response.allMessages

           }
            console.log("all messages from admin =>", res )
       })
    }
}
