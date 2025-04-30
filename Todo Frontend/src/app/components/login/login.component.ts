import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { RecaptchaModule } from 'ng-recaptcha';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    RecaptchaModule,
    // ToastrModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  response: any;
  // captchaResolved:boolean=false;
  // SITE_KEY="6LezylUqAAAAAGE8fpHFnI4Rbj-mgr7_Lsnpzg3f"

  constructor(
    private auth: AuthService,
    private router: Router,
    private toaster: ToastrService
  ) {}
  loginForm = new FormGroup({
    username: new FormControl<string | null>(null, [Validators.required]),
    password: new FormControl<string | null>(null, [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  get usernameValidator() {
    return this.loginForm.get('username');
  }

  get passwordValidator() {
    return this.loginForm.get('password');
  }

  handleLogin() {
    console.log('login data: ', this.loginForm.value);

    this.toaster.success('got data');

    this.auth.loginUser(this.loginForm.value).subscribe((res) => {
      console.log('Response: ', res);
      this.response = res;
      if (this.response.success === true) {
        localStorage.setItem('token', this.response.token);
        localStorage.setItem('refreshToken', this.response.refreshToken);
        this.toaster.success(`welcome back ${this.response.user.username}`);
        if (this.response.user.role === 'admin') {
          this.router.navigate(['/admin/home']);
          // console.log("you are admin")
        } else if (this.response.user.role === 'user') {
          this.router.navigate(['/user/home']);
          // console.log("you are user")
        }
      } else if (this.response.success === false) {
        this.toaster.error(this.response.error);
      }
    });
  }

  // onCaptchaResolved(captchaResponse:any) {
  //   this.captchaResolved = captchaResponse ? true : false;
  // }
}
