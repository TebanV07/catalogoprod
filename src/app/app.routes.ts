import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CartComponent } from './cart/cart.component'

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Ruta principal
  { path: 'cart', component: CartComponent }, // Ruta para el carrito
  { path: 'product/:id', component: ProductDetailComponent }, // Ruta dinámica para detalles del producto
  { path: '**', component: NotFoundComponent } // Ruta de error para páginas no encontradas
];
