import { Routes } from '@angular/router';
import { MainLayoutAdminComponent } from '../layouts/admin-layout/main-layout-admin/main-layout-admin.component';
import { DashboardComponent } from '../modules/admin/feature-dashboard-management/components/dashboard/dashboard.component';
import { ProductDetailComponent } from '../modules/admin/feature-product-management/components/san-pham/product-detail/product-detail.component';
import { ProductFormComponent } from '../modules/admin/feature-product-management/components/san-pham/product-form/product-form.component';
import { ProductListComponent } from '../modules/admin/feature-product-management/components/san-pham/product-list/product-list.component';

export const routes: Routes = [
    { path: "", redirectTo: "/admin", pathMatch: "full" },
    {
        path: "admin",
        component: MainLayoutAdminComponent,
        children: [
            { path: "dashboard", component: DashboardComponent, title: "Tổng quan" },
            { path: "product", component: ProductListComponent, title: "Quản lý sản phẩm" },
            { path: "product-attribute", component: ProductListComponent, title: "Quản lý thuộc tính" },
            { path: "product/detail/:id", component: ProductDetailComponent },
            { path: "product/create", component: ProductFormComponent,title:  "Thêm sản phẩm" },
        ]
    }

];
