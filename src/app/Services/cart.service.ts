import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from './product.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  private cart = new BehaviorSubject<{ product: Product; quantity: number }[]>(
    []
  );
  cart$ = this.cart.asObservable();

  
  addToCart(product: Product): void {
    const currentCart = this.cart.getValue();
    const existingItem = currentCart.find((item) => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      currentCart.push({ product, quantity: 1 });
    }

    this.cart.next([...currentCart]);
  }

  removeFromCart(productId: number): void {
    const currentCart = this.cart.getValue();
    const updatedCart = currentCart.filter((item) =>
      item.product.id === productId && item.quantity > 1
        ? (item.quantity--, true)
        : item.product.id !== productId
    );
    this.cart.next([...updatedCart]);
  }

  getTotal(): number {
    return this.cart
      .getValue()
      .reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }
  clearCart() {
    this.cart.next([]); // Vaciar el carrito
  }
}
