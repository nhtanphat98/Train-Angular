import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { HeaderComponent } from "./layout/header/header.component";
import { FooterComponent } from "./layout/footer/footer.component";
import { SlideBarComponent } from "./layout/components/slide-bar/slide-bar.component";
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent, HeaderComponent, FooterComponent, SlideBarComponent, ButtonModule, SidebarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'tutorial';
  sidebarVisible2: boolean = false;
}
