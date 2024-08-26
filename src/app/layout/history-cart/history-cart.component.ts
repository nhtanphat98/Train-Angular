import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Order } from '../../../type';
import { OrderService } from '../../services/order.service';
import { ActivatedRoute } from '@angular/router';
import { TableModule } from 'primeng/table';



@Component({
  selector: 'app-history-cart',
  standalone: true,
  imports: [CommonModule, TableModule],
  templateUrl: './history-cart.component.html',
  styleUrl: './history-cart.component.scss'
})
export class HistoryCartComponent {
  ordersHistory: Order[] = [];
  
  user_id: number = 0;
  

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
  ) { 
    this.route.queryParams.subscribe(params => {
      const data = params['userId'];
      this.user_id = data;
      this.ordersHistory[0].created_at
      console.log(this.user_id);
  });
  }

  ngOnInit(){
    this.loadOrdersHistory();
  }

  loadOrdersHistory() {
    this.orderService.getOrdersHistoryByUserId(this.user_id)
      .subscribe((response) => {
        this.ordersHistory = response;
      });
  }
}
