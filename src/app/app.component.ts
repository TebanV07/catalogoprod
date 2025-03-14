import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CurtainService } from './Services/curtain.service';  // Asegúrate de importar el servicio CurtainService
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, IonicModule, NgIf, RouterLink],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title(title: any) {
    throw new Error('Method not implemented.');
  }


  showCurtain = true;

  constructor(

    private curtainService: CurtainService  // Inyectamos CurtainService en el constructor
  ) {}

  ngOnInit(): void {
    // Recuperamos el estado del telón desde el servicio
    this.showCurtain = this.curtainService.getCurtainState();

    if (this.showCurtain) {
      // Ocultar el telón después de 3 segundos
      setTimeout(() => {
        this.showCurtain = false;
        this.curtainService.setCurtainState(false); // Actualizamos el estado del telón
      }, 3000);
    }

  }
}
