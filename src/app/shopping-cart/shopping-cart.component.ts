import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Store, StoreModule } from '@ngrx/store';
import { DataViewModule } from 'primeng/dataview';
import { ConfirmDialogComponent } from '../layout/components/confirm-dialog/confirm-dialog.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { Observable } from 'rxjs';
import { CreateOrderDetailDto, CreateOrderDto, Product } from '../../type';
import { clearCart, removeFromCart, updateQuantity } from './cart-store/cart.actions';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { Router, RouterModule } from '@angular/router';
import { OrderService } from '../services/order.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';


@Component({
    selector: 'app-shopping-cart',
    standalone: true,
    imports: [
        StoreModule,
        CommonModule,
        DataViewModule,
        ConfirmDialogComponent,
        InputNumberModule,
        FormsModule,
        ToastModule,
        RouterModule,
        ButtonModule,
        ConfirmDialogModule
    ],
    templateUrl: './shopping-cart.component.html',
    styleUrl: './shopping-cart.component.scss',
    providers: [MessageService, ConfirmationService],
})
export class ShoppingCartComponent {
    private store = inject(Store);
    cart$?: Observable<Product[]>;
    cart: Product[] = [];
    totalPrice: number = 0;
    quantity: number = 0;

    constructor(
        private router: Router,
        private confirmationService: ConfirmationService,
        private orderService: OrderService,
        private messageService: MessageService
    ) {
        this.cart$ = this.store.select('cart');
    }

    createOrder() {
        const createOrderDto: CreateOrderDto = {
            user_id: 1,
        };

        let createOrderDetailDto: CreateOrderDetailDto[] = [];
        this.cart.forEach((item) => {
            createOrderDetailDto.push({
                product_id: item.id,
                order_id: 0,
                quantity: item.quantity,
            });
        });
        this.orderService
            .postOrder(createOrderDto, createOrderDetailDto)
            .subscribe(
                (response) => {
                    this.showSuccess('Order Success');
                    this.store.dispatch(clearCart());
                },
                (error) => {
                    this.showError();
                }
            );
    }

    confirm(productId: number, event: Event) {
        this.confirmationService.confirm({
            target: event.target!,
            header: 'Confirmation',
            message: 'Are you sure you want to delete?',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.removeProductFromCart(productId);
                this.messageService.add({
                    key: 'confirmed',
                    severity: 'success',
                    summary: 'Confirmed',
                    detail: 'You have accepted',
                });
            },
            reject: () => {
                
                this.messageService.add({
                    key: 'rejected',
                    severity: 'error',
                    summary: 'Rejected',
                    detail: 'You have rejected',
                });
            },
        });
    }

    navigateToCart() {
        this.router.navigate(['']);
    }

    navigateToHistory(user_id: number) {
        this.router.navigate(['/history-cart'],{
            queryParams: { userId:  user_id}
        });
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
            product.quantity = newQuantity;
            if (newQuantity === 0) {
                this.confirmationService.confirm({
                    header: 'Confirmation',
                    message: 'Are you sure you want to delete?',
                    icon: 'pi pi-exclamation-triangle',
                    accept: () => {
                        this.store.dispatch(removeFromCart({ productId }));
                        this.totalPrice = 0;
                        this.cart.forEach((item) => {
                            console.log(item);
                            this.totalPrice += item.price * item.quantity;
                        });
                        this.messageService.add({
                            key: 'confirmed',
                            severity: 'success',
                            summary: 'Confirmed',
                            detail: 'You have accepted',
                        });
                    },
                    reject: () => {

                        this.cart$?.subscribe((products) => {
                            this.cart = products.map((product) => ({ ...product }));
                        });
                        this.totalPrice = 0;
                        this.cart.forEach((item) => {
                            console.log(item);
                            this.totalPrice += item.price * item.quantity;
                        });
                        this.cart.forEach(item => {
                            console.log(item);
                        });
                        this.messageService.add({
                            key: 'rejected',
                            severity: 'error',
                            summary: 'Rejected',
                            detail: 'You have rejected',
                        });
                    },
                });
            } else {
                this.store.dispatch(
                    updateQuantity({ productId: productId, quantity: newQuantity })
                );
                this.showSuccess('Update Quantity Success');
                this.totalPrice = 0;
                this.cart.forEach((item) => {
                    console.log(item);
                    this.totalPrice += item.price * item.quantity;
                });
            }
        }
    }

    showSuccess(message: string) {
        this.messageService.add({
            key: 'br',
            severity: 'success',
            summary: 'Success',
            detail: message,
        });
    }

    showError() {
        this.messageService.add({
            key: 'br',
            severity: 'error',
            summary: 'Error',
            detail: 'Create Fail',
        });

    }

    removeProductFromCart(productId: number) {
        this.store.dispatch(removeFromCart({ productId }));
    }

}
