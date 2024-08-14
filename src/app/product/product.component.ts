import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../type';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RatingModule, FormsModule, CardModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
    @Input() product!: Product;
    @Output() productOutput: EventEmitter<Product> = new EventEmitter<Product>();

    ngOnInit() {
        this.productOutput.emit(this.product);
    }
}
