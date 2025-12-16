// app.config.ts
import { ApplicationConfig, APP_INITIALIZER, inject } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';

import { authInterceptorFn } from './auth/auth-interceptor.fn';
import { AuthService } from './services/Auth/auth.service';

function initAuth() {
  const auth = inject(AuthService);
  return () => auth.loadMe().subscribe();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptorFn])),
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: initAuth,
    },
  ],
};
