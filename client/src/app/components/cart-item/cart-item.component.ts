import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CartItem } from 'src/app/interfaces/cart.interface';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
})
export class CartItemComponent implements OnInit {
  @Input() item = {} as CartItem;
  @Output() updateCart = new EventEmitter();

  constructor(private cartService: CartService) {}

  ngOnInit(): void {}

  incrementQuantity() {
    const body = {
      productId: this.item.productId,
      quantity: this.item.quantity + 1,
    };
    this.cartService.updateCart(body).subscribe(() => this.updateCart.emit());
  }

  decrementQuantity() {
    const body = {
      productId: this.item.productId,
      quantity: this.item.quantity - 1,
    };
    this.cartService.updateCart(body).subscribe(() => this.updateCart.emit());
  }

  deleteFromCart() {
    this.cartService
      .deleteFromCart(this.item.productId)
      .subscribe(() => this.updateCart.emit());
  }
}
