import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, Observable } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {

  const auth = inject(AuthService);
  const router = inject(Router);

     return auth.isAdmin().pipe(
       map((res:any) =>{
          const role = res.user.role;
           if(role !== "admin"){
           router.navigate(["user/home"])
           return false
           }
           return true
        })
      )
};
