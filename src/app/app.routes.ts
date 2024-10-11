import { Routes } from '@angular/router';
import { MainLayoutAdminComponent } from '../layouts/admin-layout/main-layout-admin/main-layout-admin.component';
import { ProductManagementPageComponent } from '../modules/admin/feature-product-management/pages/product-management-page/product-management-page.component';
import { DashboardComponent } from '../modules/admin/feature-dashboard-management/components/dashboard/dashboard.component';
import { ProductDetailComponent } from '../modules/admin/feature-product-management/components/san-pham/product-detail/product-detail.component';
import { AttributeListComponent } from '../modules/admin/feature-attribute-management/components/thuoc-tinh/mau-sac/color-list/attribute-list.component';
import { ColorDetailComponent } from '../modules/admin/feature-attribute-management/components/thuoc-tinh/mau-sac/color-detail/color-detail.component';
import { ChatLieuListComponent } from '../modules/admin/feature-attribute-management/components/thuoc-tinh/chat-lieu/chat-lieu-list/chat-lieu-list.component';
import { ChatLieuDeGiayListComponent } from '../modules/admin/feature-attribute-management/components/thuoc-tinh/CLDG/chat-lieu-de-giay-list/chat-lieu-de-giay-list.component';
import { KieuDeGiayListComponent } from '../modules/admin/feature-attribute-management/components/thuoc-tinh/kieu-de-giay/kieu-de-giay-list/kieu-de-giay-list.component';
import { KichCoListComponent } from '../modules/admin/feature-attribute-management/components/thuoc-tinh/kich-co/kich-co-list/kich-co-list.component';
import { TrongLuongListComponent } from '../modules/admin/feature-attribute-management/components/thuoc-tinh/trong-luong/trong-luong-list/trong-luong-list.component';
export const routes: Routes = [
  {
    path: 'admin',
    component: MainLayoutAdminComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'product', component: ProductManagementPageComponent },
      { path: 'product-attribute', component: ProductManagementPageComponent },
      { path: 'product/detail/:id', component: ProductDetailComponent },
      { path: 'color/detail/:id', component: ColorDetailComponent },
      { path: 'attribute/list', component: AttributeListComponent },
      { path: 'chatLieu/list', component: ChatLieuListComponent },
      { path: 'chatLieuDeGiay/list', component: ChatLieuDeGiayListComponent },
      { path: 'kieuDeGiay/list', component: KieuDeGiayListComponent },
      { path: 'kichCo/list', component: KichCoListComponent },
      { path: 'trongLuong/list', component: TrongLuongListComponent },
    ],
  },
];
