import { Routes } from '@angular/router';
import { MainLayoutAdminComponent } from '../layouts/admin-layout/main-layout-admin/main-layout-admin.component';
import { ProductManagementPageComponent } from '../modules/admin/feature-product-management/pages/product-management-page/product-management-page.component';
import { DashboardComponent } from '../modules/admin/feature-dashboard-management/components/dashboard/dashboard.component';
import { ProductDetailComponent } from '../modules/admin/feature-product-management/components/san-pham/product-detail/product-detail.component';
import { EmployeeListComponent } from '../modules/admin/feature-employee-management/components/employee-list/employee-list.component';
import { CustomerListComponent } from '../modules/admin/feature-customer-management/components/customer-list/customer-list.component';
import { CustomerUpdateComponent } from '../modules/admin/feature-customer-management/components/customer-update/customer-update.component';
import { CustomerAddComponent } from '../modules/admin/feature-customer-management/components/customer-add/customer-add.component';

export const routes: Routes = [

    {
        path: "admin",
        component: MainLayoutAdminComponent,
        children: [
            { path: "dashboard", component: DashboardComponent },
            { path: "product", component: ProductManagementPageComponent },
            { path: "product-attribute", component: ProductManagementPageComponent },
            { path: "product/detail/:id", component: ProductDetailComponent },
            { path: "employee/list", component: EmployeeListComponent },
            { path: "customer/list", component: CustomerListComponent },
            { path: "customer/update/:id", component: CustomerUpdateComponent },
            { path: "customer/add", component: CustomerAddComponent },
            { path: "customer/detail/:id", component: CustomerListComponent },
        ]
    }

];
