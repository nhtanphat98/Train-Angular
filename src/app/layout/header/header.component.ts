import { Component } from '@angular/core';
import { TabMenuModule } from 'primeng/tabmenu';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TabMenuModule, ButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  items: MenuItem[] = [
    { label: 'Home', icon: 'pi pi-home' },
    { label: 'Cart', icon: 'pi pi-shopping-cart' },
  ];

  route: string = '';

  activeItem: MenuItem = this.items[0];

  onActiveItemChange(event: MenuItem) {
    this.activeItem = event;
    console.log(this.activeItem);
    if(this.activeItem.label === 'Home'){
      this.route = '';
    }
    if(this.activeItem.label === 'Cart'){
      this.route = 'shopping-cart';
    }
  }
}
