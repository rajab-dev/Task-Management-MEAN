import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { authGuard } from './guards/auth.guard';
import { preventIframeGuard } from './guards/prevent-iframe.guard';

export const routes: Routes = [
  {
    path:"",
    // canActivate:[preventIframeGuard],
    component:LoginComponent,
  },
  {
    path:"login",
    // canActivate:[preventIframeGuard],
    component:LoginComponent,
  },
  {
    path:"register",
    canActivate:[preventIframeGuard],
    component:SignUpComponent,
  },

  {
    path: 'user',
    // canActivate:[preventIframeGuard],
    loadChildren: () => import('./modules/user-module/user.routes').then(m => m.userRoutes),
  },

  {
     path:"admin",
     canActivate:[authGuard],
     loadChildren:() => import("./modules/admin-module/admin.routes").then(m =>m.adminRoutes)
  },

  {
    path:"**",
    redirectTo:"/login"
},

];
