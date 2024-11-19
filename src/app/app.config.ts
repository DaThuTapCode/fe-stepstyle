import { ApplicationConfig, LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors} from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { registerLocaleData } from '@angular/common';
import localeVi from '@angular/common/locales/vi';
import { InterceptorOkeconde } from '../core/interceptors/interceptor';

registerLocaleData(localeVi);

export const appConfig: ApplicationConfig = {
  
  providers: [
    // provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideHttpClient(withInterceptors([InterceptorOkeconde])),
    provideAnimationsAsync(),
    { provide: LOCALE_ID, useValue: 'vi' } // Cấu hình locale tiếng Việt
  ]
};
