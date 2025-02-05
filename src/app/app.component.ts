import { Component, OnInit } from '@angular/core';
import { CartService } from './Services/cart.service';
import { Product } from './Services/product.service';
import { RouterOutlet } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CurtainService } from './Services/curtain.service';  // Asegúrate de importar el servicio CurtainService

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgFor, NgIf, IonicModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
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

  // Función para aumentar la cantidad de un item
  increaseQuantity(item: { product: Product, quantity: number }) {
    item.quantity++;
    this.updateTotal();
  }

  // Función para disminuir la cantidad de un item
  decreaseQuantity(item: { product: Product, quantity: number }) {
    if (item.quantity > 1) {
      item.quantity--;
      this.updateTotal();
    }
  }

  // Actualizar el total del carrito
  updateTotal() {
    this.total = this.cartService.getTotal();  // Recalcula el total con el servicio
  }
  clearCart() {
    this.cartService.clearCart(); // Llama al servicio para vaciar el carrito
    this.updateTotal(); // Actualiza el total después de vaciar
  }
}
