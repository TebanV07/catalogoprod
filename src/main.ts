import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes'; // Importa las rutas

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes), // Provee las rutas al enrutador
  ],
}).catch(err => console.error(err));
