import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/interfaces/cart.interface';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cart = {} as Cart;
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.getCart();
  }

  getCart(): void {
    this.cartService.getCart().subscribe({
      next: (data) => (this.cart = data),
      error: (error) => console.log(error),
    });
  }

  checkoutCart(): void {
    this.cartService.checkoutCart().subscribe(() => this.getCart());
  }
}
