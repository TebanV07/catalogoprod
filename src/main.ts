import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { provideIonicAngular } from '@ionic/angular/standalone'; // Importa las rutas

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes), provideIonicAngular({}), // Provee las rutas al enrutador
  ],
}).catch(err => console.error(err));
