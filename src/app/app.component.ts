import { Component, OnInit } from '@angular/core';
import { CartService } from './cart.service';
import { Product } from './product.service';
import { RouterOutlet } from '@angular/router';
import { NgFor } from '@angular/common';


@Component({
  selector: 'app-root',
  imports:[RouterOutlet, NgFor],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  cart: { product: Product, quantity: number }[] = [];
  total: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe((cart: { product: Product, quantity: number }[]) => {
      this.cart = cart;
      this.total = this.cartService.getTotal(); // Actualiza el total
    });
  }
}