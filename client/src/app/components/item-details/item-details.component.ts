import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Product } from 'src/app/interfaces/product.interface';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss'],
})
export class ItemDetailsComponent implements OnInit {
  productId: string = '';
  product = {} as Product;
  quantity: number = 0;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    const param = this.route.snapshot.paramMap.get('productId');
    if (param) this.productId = param;
    this.getProduct();
  }

  getProduct(): void {
    this.productService.getProductById(this.productId).subscribe({
      next: (data) => (this.product = data),
      error: (error) => console.log(error),
    });
  }

  incrementQuantity() {
    this.quantity += 1;
  }

  decrementQuantity() {
    if (this.quantity > 0) {
      this.quantity -= 1;
    }
  }

  addToCart() {
    const body = {
      productId: this.productId,
      quantity: this.quantity,
    };
    this.cartService.addToCart(body).subscribe();
    this.quantity = 0;
  }
}
