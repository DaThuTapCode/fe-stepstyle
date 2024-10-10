import { Routes } from '@angular/router';
import { MainLayoutAdminComponent } from '../layouts/admin-layout/main-layout-admin/main-layout-admin.component';
import { ProductManagementPageComponent } from '../modules/admin/feature-product-management/pages/product-management-page/product-management-page.component';
import { DashboardComponent } from '../modules/admin/feature-dashboard-management/components/dashboard/dashboard.component';
import { ProductDetailComponent } from '../modules/admin/feature-product-management/components/san-pham/product-detail/product-detail.component';
import { AttributeListComponent } from '../modules/admin/feature-attribute-management/components/thuoc-tinh/color-list/attribute-list.component';
import { ColorDetailComponent } from '../modules/admin/feature-attribute-management/components/thuoc-tinh/color-detail/color-detail.component';
export const routes: Routes = [

    {
        path: "admin",
        component: MainLayoutAdminComponent,
        children: [
            { path: "dashboard", component: DashboardComponent },
            { path: "product", component: ProductManagementPageComponent },
            { path: "product-attribute", component: ProductManagementPageComponent },
            { path: "product/detail/:id", component: ProductDetailComponent },
            { path: "color/detail/:id", component: ColorDetailComponent },
            { path: "attribute/list", component: AttributeListComponent },
        ]
    }

];
