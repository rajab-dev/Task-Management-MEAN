import { HttpEvent, HttpHandler, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs';



export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const auth = inject(AuthService)
  const router = inject(Router)

  console.log("auth interceptor got token from local => ")


  if (auth.isLoggedIn()) {
    console.log("auth interceptor got token from local => ")
    req = req.clone({
      headers: req.headers
        .set('auth', `${auth.isLoggedIn()}`)
        .set('refresh-token', `${auth.getRefreshToken()}`),
        withCredentials:true
    });
  } else {
    console.log("auth interceptor no token found!!! => ")
    req=req.clone({
     withCredentials:true
    })
    router.navigate(['/login']);
  }
  

  return next(req).pipe(
    tap(event => {
      if (event instanceof HttpResponse) {
          console.log("got response for auth =>")
        const newAuthToken = event.headers.get('new-auth-token');
        const newRefreshToken = event.headers.get('new-refresh-token');
        console.log("Got accessToken from backend", newAuthToken)
        console.log("Got refresh Token from backend", newRefreshToken)

        if (newAuthToken && newRefreshToken) {
          console.log("Saving tokens in local storage")
          auth.updateTokens(newAuthToken, newRefreshToken);
        }
      }
    })
  );

};
