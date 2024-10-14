import { Routes } from '@angular/router';
import { MainLayoutAdminComponent } from '../layouts/admin-layout/main-layout-admin/main-layout-admin.component';
import { ProductManagementPageComponent } from '../modules/admin/feature-product-management/pages/product-management-page/product-management-page.component';
import { DashboardComponent } from '../modules/admin/feature-dashboard-management/components/dashboard/dashboard.component';
import { ProductDetailComponent } from '../modules/admin/feature-product-management/components/san-pham/product-detail/product-detail.component';
import { InvoiceManagementPageComponent } from '../modules/admin/feature-invoice-management/pages/invoice-management-page/invoice-management-page.component';
import { InvoiceDetailComponent } from '../modules/admin/feature-invoice-management/components/hoa-don/invoice-detail/invoice-detail.component';
import { InvoiceUpdateComponent } from '../modules/admin/feature-invoice-management/components/hoa-don/invoice-update/invoice-update.component';

export const routes: Routes = [

    {
        path: "admin",
        component: MainLayoutAdminComponent,
        children: [
            { path: "dashboard", component: DashboardComponent },
            { path: "product", component: ProductManagementPageComponent },
            { path: "product-attribute", component: ProductManagementPageComponent },
            { path: "product/detail/:id", component: ProductDetailComponent },
            { path: "invoice", component: InvoiceManagementPageComponent },
            { path: "invoice/detail/:id", component: InvoiceDetailComponent },
            { path: "invoice/update/:id", component: InvoiceUpdateComponent },
        
        ]
    }

];
