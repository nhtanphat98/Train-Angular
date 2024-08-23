import { Component } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { Product } from '../../../../type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-slide-bar',
  standalone: true,
  imports: [SidebarModule, ButtonModule, CommonModule],
  templateUrl: './slide-bar.component.html',
  styleUrl: './slide-bar.component.scss'
})
export class SlideBarComponent {
    sidebarVisible!: boolean;
    cart: Product[] = [];
    cartItemCount!: number;

    sidebarOnClick(){
      this.sidebarVisible = true;
      
    }
}
