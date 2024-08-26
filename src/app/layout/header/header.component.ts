import { Component } from '@angular/core';
import { TabMenuModule } from 'primeng/tabmenu';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';

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
  menuItemIndex: number = 0;

  router: string = '';

  activeItem: MenuItem = this.items[0];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      const index = params.get('menuItemIndex');
      this.menuItemIndex = index ? +index : 0; // Chuyển đổi thành số nếu không phải null
      this.activeItem = this.items[this.menuItemIndex];
    });
  }

  onActiveItemChange(event: MenuItem) {
    this.activeItem = event;
    if (this.activeItem.label === 'Home') {
      this.router = '';
    }
    if (this.activeItem.label === 'Cart') {
      this.router = 'shopping-cart';
    }
  }
}
