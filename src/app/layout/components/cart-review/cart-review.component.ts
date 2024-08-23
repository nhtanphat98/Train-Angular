import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from '../../../../type';
import { initialState } from '../../../reducers/cart.reducers';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart-review',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-review.component.html',
  styleUrl: './cart-review.component.scss'
})
export class CartReviewComponent {
  private store = inject(Store);
  cart$?: Observable<Product[]>;
  constructor(){
    this.cart$ = this.store.select('cart');
  }

  cart = initialState;
}
