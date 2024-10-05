import { Component } from '@angular/core';
import { ProductListComponent } from "../../components/san-pham/product-list/product-list.component";
import { CommonModule } from '@angular/common';
import { LoadingComponent } from "../../../../../shared/loading/loading.component";
import { NavigationEnd, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-product-management-page',
  standalone: true,
  imports: [ProductListComponent, CommonModule, LoadingComponent],
  templateUrl: './product-management-page.component.html',
  styleUrl: './product-management-page.component.scss'
})
export class ProductManagementPageComponent {
  isLoading: boolean = false;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.isLoading = true;
      } else if (event instanceof NavigationEnd) {
        this.isLoading = false;
      }
    });
  }
}
