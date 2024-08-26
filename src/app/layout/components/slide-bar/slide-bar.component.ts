import { Component, inject, Input } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { Product } from '../../../../type';
import { CommonModule } from '@angular/common';
import { CartReviewComponent } from "../cart-review/cart-review.component";
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-slide-bar',
  standalone: true,
  imports: [SidebarModule, ButtonModule, CommonModule, CartReviewComponent, CartReviewComponent, ToastModule],
  templateUrl: './slide-bar.component.html',
  styleUrl: './slide-bar.component.scss',
  providers: [MessageService]
})
export class SlideBarComponent {
    sidebarVisible!: boolean;
    private store = inject(Store);
    cartItemCount!: number;
    cart$?: Observable<Product[]>;
    cart: Product[] = [];

    constructor(){
      this.cart$ = this.store.select('cart');
    }

    ngOnInit() {
      this.cart$?.subscribe((products) => {
          this.cart = products.map((product) => ({ ...product }));
      });
  }

    sidebarOnClick(){
      this.sidebarVisible = true;
      
    }
}
