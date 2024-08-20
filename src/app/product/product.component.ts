import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    Output,
    ViewChild,
} from '@angular/core';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ProductsService } from '../services/products.service';
import { CommonModule } from '@angular/common';
import { Product } from '../../type';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { ProductDetailComponent } from '../layout/components/product-detail/product-detail.component';
import { PaginatorModule } from 'primeng/paginator';

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
    ],
    templateUrl: './product.component.html',
    styleUrl: './product.component.scss',
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

    constructor(private productsService: ProductsService) {}

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
            .getProducts(this.pageNumber, this.pageSize)
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
    @ViewChild('productContainer') productContainer!: ElementRef;

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
}
