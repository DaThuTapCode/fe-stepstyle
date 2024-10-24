import { Routes } from '@angular/router';
import { MainLayoutAdminComponent } from '../layouts/admin-layout/main-layout-admin/main-layout-admin.component';
import { DashboardComponent } from '../modules/admin/feature-dashboard-management/components/dashboard/dashboard.component';
import { ProductDetailComponent } from '../modules/admin/feature-product-management/components/san-pham/product-detail/product-detail.component';
import { InvoiceManagementPageComponent } from '../modules/admin/feature-invoice-management/pages/invoice-management-page/invoice-management-page.component';
import { InvoiceDetailComponent } from '../modules/admin/feature-invoice-management/components/hoa-don/invoice-detail/invoice-detail.component';
import { InvoiceUpdateComponent } from '../modules/admin/feature-invoice-management/components/hoa-don/invoice-update/invoice-update.component';
import { EmployeeListComponent } from '../modules/admin/feature-employee-management/components/employee-list/employee-list.component';
import { CustomerListComponent } from '../modules/admin/feature-customer-management/components/customer-list/customer-list.component';
import { CustomerUpdateComponent } from '../modules/admin/feature-customer-management/components/customer-update/customer-update.component';
import { CustomerAddComponent } from '../modules/admin/feature-customer-management/components/customer-add/customer-add.component';
import { AttributeListComponent } from '../modules/admin/feature-attribute-management/components/thuoc-tinh/mau-sac/color-list/attribute-list.component';
import { ChatLieuListComponent } from '../modules/admin/feature-attribute-management/components/thuoc-tinh/chat-lieu/chat-lieu-list/chat-lieu-list.component';
import { ChatLieuDeGiayListComponent } from '../modules/admin/feature-attribute-management/components/thuoc-tinh/CLDG/chat-lieu-de-giay-list/chat-lieu-de-giay-list.component';
import { KieuDeGiayListComponent } from '../modules/admin/feature-attribute-management/components/thuoc-tinh/kieu-de-giay/kieu-de-giay-list/kieu-de-giay-list.component';
import { KichCoListComponent } from '../modules/admin/feature-attribute-management/components/thuoc-tinh/kich-co/kich-co-list/kich-co-list.component';
import { TrongLuongListComponent } from '../modules/admin/feature-attribute-management/components/thuoc-tinh/trong-luong/trong-luong-list/trong-luong-list.component';
import { ProductFormComponent } from '../modules/admin/feature-product-management/components/san-pham/product-form/product-form.component';
import { ProductListComponent } from '../modules/admin/feature-product-management/components/san-pham/product-list/product-list.component';
import { EmployeeUpdateComponent } from '../modules/admin/feature-employee-management/components/employee-update/employee-update.component';
import { EmployeeAddComponent } from '../modules/admin/feature-employee-management/components/employee-add/employee-add.component';
import { InvoiceListComponent } from '../modules/admin/feature-invoice-management/components/hoa-don/invoice-list/invoice-list.component';
import { CouponsListComponent } from '../modules/admin/feature-invoice-management/components/phieu-giam-gia/coupons-list/coupons-list.component';
import { CouponsCreateComponent } from '../modules/admin/feature-invoice-management/components/phieu-giam-gia/coupons-create/coupons-create.component';
import { CouponsUpdateComponent } from '../modules/admin/feature-invoice-management/components/phieu-giam-gia/coupons-update/coupons-update.component';
import {
  CounterSalesComponent
} from "../modules/admin/feature-counter-sales/components/counter-sales/counter-sales.component";

export const routes: Routes = [
    { path: '', redirectTo: '/admin/dashboard', pathMatch: 'full' },
    {
        path: 'admin',
        component: MainLayoutAdminComponent,
        children: [
            { path: "dashboard", component: DashboardComponent, title: "Tổng quan" },
            { path: "product", component: ProductListComponent, title: "Quản lý sản phẩm" },
            { path: "product-attribute", component: ProductListComponent, title: "Quản lý thuộc tính" },
            { path: "product/detail/:id", component: ProductDetailComponent },
            { path: "product/create", component: ProductFormComponent, title: "Thêm sản phẩm" },
            { path: 'attribute/list', component: AttributeListComponent },
            { path: 'chatLieu/list', component: ChatLieuListComponent },
            { path: 'chatLieuDeGiay/list', component: ChatLieuDeGiayListComponent },
            { path: 'kieuDeGiay/list', component: KieuDeGiayListComponent },
            { path: 'kichCo/list', component: KichCoListComponent },
            { path: 'trongLuong/list', component: TrongLuongListComponent },
            { path: "employee/list", component: EmployeeListComponent },
            { path: "employee/add", component: EmployeeAddComponent },
            { path: "employee/update/:id", component: EmployeeUpdateComponent },
            { path: "employee/detail/:id", component: EmployeeListComponent },
            { path: "customer/list", component: CustomerListComponent },
            { path: "customer/add", component: CustomerAddComponent },
            { path: "customer/update/:id", component: CustomerUpdateComponent },
            { path: "customer/detail/:id", component: CustomerListComponent },
            { path: "invoice", component: InvoiceListComponent, title: "Quản lý hóa đơn" },
            { path: "invoice/detail/:id", component: InvoiceDetailComponent, title: "Chi tiết hóa đơn" },
            { path: "invoice/update/:id", component: InvoiceUpdateComponent, title: "Cập nhật hóa đơn" },
            { path: "coupons", component: CouponsListComponent, title: "Quản lý Phiếu Giảm Giá" },
            { path: "coupons/create", component: CouponsCreateComponent, title: "Thêm Phiếu Giảm Giá" },
            { path: "coupons/update/:id", component: CouponsUpdateComponent, title: "Update Phiếu Giảm Giá" },
            { path: "counter-sales", component: CounterSalesComponent, title: "Bán hàng tại quầy" },
        ],
    },

];
