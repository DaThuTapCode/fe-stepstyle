import { Component } from '@angular/core';
import { InvoiceListComponent } from '../../components/hoa-don/invoice-list/invoice-list.component';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../../../../../shared/loading/loading.component';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-invoice-management-page',
  standalone: true,
  imports: [InvoiceListComponent, CommonModule, LoadingComponent],
  templateUrl: './invoice-management-page.component.html',
  styleUrl: './invoice-management-page.component.scss'
})
export class InvoiceManagementPageComponent {
    isLoading: boolean = false;

    constructor (private router: Router) {
      this.router.events.subscribe(event => {
        if(event instanceof NavigationStart) {
          this.isLoading = true;
        } else if (event instanceof NavigationEnd) {
          this.isLoading = false;
        }
      });
    }
}
