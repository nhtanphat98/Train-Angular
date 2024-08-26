import { Component, inject, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from '../../../../type';
import { CommonModule } from '@angular/common';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { removeFromCart, updateQuantity } from '../../../shopping-cart/cart-store/cart.actions';
import { Router, RouterModule } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
    selector: 'app-cart-review',
    standalone: true,
    imports: [
        CommonModule,
        InputNumberModule,
        FormsModule,
        ConfirmDialogModule,
        RouterModule,
        ToastModule,
    ],
    templateUrl: './cart-review.component.html',
    styleUrl: './cart-review.component.scss',
    providers: [MessageService, ConfirmationService]
})
export class CartReviewComponent {
    private store = inject(Store);
    cart$?: Observable<Product[]>;
    cart: Product[] = [];
    totalPrice: number = 0;
    quantity: number = 0;
    key: string = '';
    active: string ='';

    constructor(private messageService: MessageService,
        private router: Router
    ) {
        this.cart$ = this.store.select('cart');
    }

    ngOnInit() {
        this.cart$?.subscribe((products) => {
            this.cart = products.map((product) => ({ ...product }));
        });
        let total = 0;
        this.cart.forEach(function (item, index, cart) {
            total += item.price * item.quantity;
        });
        this.totalPrice = total;
    }

    

    onQuantityChange(productId: number, newQuantity: number) {
        const product = this.cart.find((p) => p.id === productId);
        if (product) {
            console.log(product);

            product.quantity = newQuantity;

            this.store.dispatch(
                updateQuantity({ productId: productId, quantity: newQuantity })
            );
            this.showSuccess('Success update quantity');
        }
        if(newQuantity === 0){
            this.store.dispatch(removeFromCart({productId}));
        }
        this.totalPrice = 0;
        this.cart.forEach(item => {
            this.totalPrice += item.price * item.quantity;
        });
        
    }

    navigateToCartDetail() {
        this.router.navigate(['/shopping-cart'],{
            queryParams: { menuItemIndex: 1}
        });
    }

    showSuccess(message: string) {
        this.messageService.add({
            key: 'br',
            severity: 'success',
            summary: 'Success',
            detail: message,
        });
    }

    showError(message: string) {
        this.messageService.add({
            key: 'br',
            severity: 'error',
            summary: 'Error',
            detail: message,
        });
    }
}
