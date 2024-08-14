import { Component } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-slide-bar',
  standalone: true,
  imports: [SidebarModule, ButtonModule],
  templateUrl: './slide-bar.component.html',
  styleUrl: './slide-bar.component.scss'
})
export class SlideBarComponent {
    sidebarVisible!: boolean;
}
