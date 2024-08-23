import { Component, inject } from '@angular/core';
import { Store, StoreModule } from '@ngrx/store';


@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [StoreModule],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss'
})
export class ShoppingCartComponent {

}
