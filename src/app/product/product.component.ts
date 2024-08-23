import {
    Component,
    ElementRef,
    EventEmitter,
    inject,
    Input,
    Output,
    ViewChild,
} from '@angular/core';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ProductsService } from '../services/products.service';
import { CommonModule } from '@angular/common';
import { Product, SearchFilter } from '../../type';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { ProductDetailComponent } from '../layout/components/product-detail/product-detail.component';
import { PaginatorModule } from 'primeng/paginator';
import { FilterSearchComponent } from '../layout/components/filter-search/filter-search.component';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { addToCart, clearCart, removeFromCart, updateQuantity } from '../shopping-cart/cart-store/cart.actions';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';


@Component({
    selector: 'app-product',
    standalone: true,
    imports: [
        RatingModule,
        FormsModule,
        CardModule,
        CommonModule,
        IconFieldModule,
        InputIconModule,
        InputTextModule,
        ProductDetailComponent,
        PaginatorModule,
        FilterSearchComponent,
        ToastModule
    ],
    templateUrl: './product.component.html',
    styleUrl: './product.component.scss',
    providers: [MessageService]
})
export class ProductComponent {
    products: Product[] = [];
    pageNumber = 1;
    pageSize = 10;
    total = 0;
    totalPages = 0;
    value!: string;
    productHovered!: Product;
    first = 0;
    rows = 10;
    messageContent!: string;
    searchFilter: SearchFilter = {
        rangePrice: [0, 10000],
        name: '',
        rating: 0,
        status: '',
        category_id: 0,
    }
    
    private store = inject(Store);
    cart$?: Observable<Product[]>;

    constructor(private productsService: ProductsService, private messageService: MessageService,
    ) {
        this.cart$ = this.store.select('cart');
    }

    ngOnInit() {
        this.loadProducts();
    }

    onPageChange(value: any) {
        this.pageNumber = value.page + 1;
        console.log(value);
        this.loadProducts();

    }

    loadProducts() {
        this.productsService
            .getProducts(this.pageNumber, this.pageSize, this.searchFilter)
            .subscribe((response) => {
                this.products = response.data;
                this.total = response.total;
                this.totalPages = response.totalPages;
                this.pageNumber = response.pageNumber;
                this.pageSize = response.pageSize;
            });
    }

    isPopupVisible = false;
    popupPosition = { x: 0, y: 0 };

    showPopup(event: MouseEvent, product: Product) {
        this.isPopupVisible = true;
        this.updatePopupPosition(event);
        this.productHovered = product;
    }

    updatePopupPosition(event: MouseEvent) {
        this.popupPosition.x = event.clientX;
        this.popupPosition.y = event.clientY;
    }

    hidePopup() {
        this.isPopupVisible = false;
    }

    getFilterSearch(searchFilter: SearchFilter) {
        this.searchFilter = searchFilter;
        this.loadProducts();
    }

    addProductToCart(product: Product) {
        this.store.dispatch(addToCart({ product }));
    }

    showSuccess() {
        this.messageService.add({ key: 'br', severity: 'success', summary: 'Success', detail: this.messageContent });
    }

    showError() {
        this.messageService.add({ key: 'br', severity: 'error', summary: 'Error', detail: this.messageContent });
    }

    removeProductFromCart(productId: number) {
        this.store.dispatch(removeFromCart({ productId }));
    }

    updateQuantity(productId: number, quantity: number) {
        this.store.dispatch(updateQuantity({ productId, quantity }));
    }

    clearCart() {
        this.store.dispatch(clearCart());
    }
}
