import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const csrfTokenInterceptor: HttpInterceptorFn = (req, next) => {



  const auth = inject(AuthService)

  const csrfToken = auth.getCsrfToken('XSRF-TOKEN');

  console.log("CSRF TOKEN FINAL FORM =>", csrfToken)

    if (csrfToken) {
      const clonedRequest = req.clone({
        setHeaders: {
          'X-XSRF-TOKEN': csrfToken,
        },
      });
      return next(clonedRequest);

    }
  return next(req);
};


