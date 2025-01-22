import { Component, OnInit } from '@angular/core';
import { CartService } from './Services/cart.service';
import { Product } from './Services/product.service';
import { RouterOutlet } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CurtainService } from './Services/curtain.service';  // Asegúrate de importar el servicio CurtainService

@Component({
  selector: 'app-root',
  imports:[RouterOutlet, NgFor, NgIf, IonicModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  cart: { product: Product, quantity: number }[] = [];
  total: number = 0;
  showCurtain = true;

  constructor(
    private cartService: CartService,
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

    // Manejar actualizaciones del carrito
    this.cartService.cart$.subscribe((cart: { product: Product, quantity: number }[]) => {
      this.cart = cart;
      this.total = this.cartService.getTotal(); // Actualiza el total
    });
  }
}
