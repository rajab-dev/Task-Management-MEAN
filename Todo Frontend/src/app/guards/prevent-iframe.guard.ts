
import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


export const preventIframeGuard: CanActivateFn = (route, state) => {
  const toaster = inject(ToastrService)
  if(window.top !== window.self){
    toaster.error("Iframe dected!!!")
    return false
  }
  return true;
};
