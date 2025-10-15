import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideErrorTailorConfig } from '@ngneat/error-tailor';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { MaterialErrorComponent } from './components/material-error/material-error.component';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
    provideErrorTailorConfig({
      errors: {
        useValue: {
          required: () => 'Campo obrigatório',
          maxlength: ({ requiredLength, actualLength }) =>
            `Máximo ${requiredLength} caracteres (${actualLength} usados)`,
          invalidAddress: (error) => `Address isn't valid`,
        },
      },
      controlErrorComponent: MaterialErrorComponent
    }),
  ],
};
