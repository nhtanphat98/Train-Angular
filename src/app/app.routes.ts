import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

export const routes: Routes = [
    {
        path: '',
        // loadChildren: () => import('./home/home.component').then(m => m.HomeComponent)
        component: HomeComponent,
    },
    {
        path: 'shopping-cart',
        component: ShoppingCartComponent,
    }

];
