import { Component, output } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product } from '../../type';
import { ProductComponent } from "../product/product.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
    constructor(private productService: ProductsService){}
    products: Product[] = [];

    onProductOutput(product: Product){
        console.log(product, 'Output');
    }

    ngOnInit() {
        this.productService.getProducts('http://localhost:3000/clothes', {page: 0, perPage: 15})
        .subscribe(products => {
            this.products = products.items;
        });
    }
}
