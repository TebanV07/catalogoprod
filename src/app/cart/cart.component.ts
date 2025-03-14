import { Component, OnInit } from '@angular/core';
import { CartService } from '../Services/cart.service';
import { NgFor} from '@angular/common';
import { Product } from '../Services/product.service';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgFor],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CartComponent  implements OnInit {
  cart: { product: Product, quantity: number }[] = [];
  total: number = 0;
  private route = inject(Router);
  constructor(
    private cartService: CartService,
  ) {}

  ngOnInit() {
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
        gotoHome(): void {
          this.route.navigate(['']);
        }
        }

 

