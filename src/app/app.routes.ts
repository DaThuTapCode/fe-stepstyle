import { Routes } from '@angular/router';
import { MainLayoutAdminComponent } from '../layouts/admin-layout/main-layout-admin/main-layout-admin.component';
import { DashboardComponent } from '../modules/admin/feature-dashboard-management/components/dashboard/dashboard.component';
import { ProductDetailComponent } from '../modules/admin/feature-product-management/components/san-pham/product-detail/product-detail.component';
import { AttributeListComponent } from '../modules/admin/feature-attribute-management/components/thuoc-tinh/mau-sac/color-list/attribute-list.component';
import { ColorDetailComponent } from '../modules/admin/feature-attribute-management/components/thuoc-tinh/mau-sac/color-detail/color-detail.component';
import { ChatLieuListComponent } from '../modules/admin/feature-attribute-management/components/thuoc-tinh/chat-lieu/chat-lieu-list/chat-lieu-list.component';
import { ChatLieuDeGiayListComponent } from '../modules/admin/feature-attribute-management/components/thuoc-tinh/CLDG/chat-lieu-de-giay-list/chat-lieu-de-giay-list.component';
import { KieuDeGiayListComponent } from '../modules/admin/feature-attribute-management/components/thuoc-tinh/kieu-de-giay/kieu-de-giay-list/kieu-de-giay-list.component';
import { KichCoListComponent } from '../modules/admin/feature-attribute-management/components/thuoc-tinh/kich-co/kich-co-list/kich-co-list.component';
import { TrongLuongListComponent } from '../modules/admin/feature-attribute-management/components/thuoc-tinh/trong-luong/trong-luong-list/trong-luong-list.component';
import { ProductFormComponent } from '../modules/admin/feature-product-management/components/san-pham/product-form/product-form.component';
import { ProductListComponent } from '../modules/admin/feature-product-management/components/san-pham/product-list/product-list.component';

export const routes: Routes = [
  {
    path: 'admin',
    component: MainLayoutAdminComponent,
    children: [
      { path: "dashboard", component: DashboardComponent, title: "Tổng quan" },
      { path: "product", component: ProductListComponent, title: "Quản lý sản phẩm" },
      { path: "product-attribute", component: ProductListComponent, title: "Quản lý thuộc tính" },
      { path: "product/detail/:id", component: ProductDetailComponent },
      { path: "product/create", component: ProductFormComponent,title:  "Thêm sản phẩm" },
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
