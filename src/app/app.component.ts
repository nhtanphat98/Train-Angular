import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { SlideBarComponent } from './layout/components/slide-bar/slide-bar.component';
import { Store } from '@ngrx/store';
import { loadCart } from './shopping-cart/cart-store/cart.actions';
import { loadCartFromLocalStorage } from './reducers/cart.reducers';
import { Product } from '../type';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        RouterOutlet,
        HomeComponent,
        HeaderComponent,
        FooterComponent,
        SlideBarComponent,
        CommonModule
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {
    title = 'tutorial';
    sidebarVisible2: boolean = false;
    cart: Product[] = [];
    isCartDetailPage = false;

    constructor(private router: Router) {
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.isCartDetailPage = event.url.includes('/shopping-cart');
        }
      });
    }

    private store = inject(Store);
    ngOnInit() {
        this.cart = loadCartFromLocalStorage();
        this.store.dispatch(loadCart({ cart: this.cart }));
        
    }
}
