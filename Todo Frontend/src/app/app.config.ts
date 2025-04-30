import { ApplicationConfig, CSP_NONCE, importProvidersFrom, inject } from '@angular/core';
import { RouterModule } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HttpClient, provideHttpClient, withInterceptors, } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { authInterceptor } from './interceptors/auth.interceptor';
import { encryptionInterceptor } from './interceptors/encryption.interceptor';
import { decryptionInterceptor } from './interceptors/decryption.interceptor';
import { NgxsReduxDevtoolsPluginModule, withNgxsReduxDevtoolsPlugin } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule, withNgxsLoggerPlugin } from '@ngxs/logger-plugin';
import { NgxsModule, provideStore } from '@ngxs/store';
import { TasksState } from './store/state/tasks.state';
import { csrfTokenInterceptor } from './interceptors/csrf-token.interceptor';
import { AuthService } from './services/auth.service';
import { catchError, of } from 'rxjs';




export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
    ToastrModule.forRoot({
      timeOut: 4000,
      positionClass: 'toast-top-right',
      // preventDuplicates: true,
    }),
    RouterModule.forRoot(routes),
    NgxsLoggerPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),

  ),
  provideAnimations(),
    provideHttpClient(
      withInterceptors([
       authInterceptor,
       csrfTokenInterceptor,
       encryptionInterceptor,
       decryptionInterceptor,
    ])), 
    provideStore(
      [TasksState],
      withNgxsReduxDevtoolsPlugin(),
      withNgxsLoggerPlugin()
    ),

  ]
};

// function generateRandomNonce(): string {
//   return Math.random().toString(36).substr(2); // Random string generation
// }