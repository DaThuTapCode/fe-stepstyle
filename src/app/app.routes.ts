import { Routes } from '@angular/router';
import { MainLayoutAdminComponent } from '../layouts/admin-layout/main-layout-admin/main-layout-admin.component';
import { DashboardComponent } from '../modules/admin/feature-dashboard-management/components/dashboard/dashboard.component';
import { ProductDetailComponent } from '../modules/admin/feature-product-management/components/san-pham/product-detail/product-detail.component';
import { InvoiceDetailComponent } from '../modules/admin/feature-invoice-management/components/hoa-don/invoice-detail/invoice-detail.component';
import { InvoiceUpdateComponent } from '../modules/admin/feature-invoice-management/components/hoa-don/invoice-update/invoice-update.component';
import { EmployeeListComponent } from '../modules/admin/feature-employee-management/components/employee-list/employee-list.component';
import { CustomerListComponent } from '../modules/admin/feature-customer-management/components/customer-list/customer-list.component';
import { CustomerUpdateComponent } from '../modules/admin/feature-customer-management/components/customer-update/customer-update.component';
import { CustomerAddComponent } from '../modules/admin/feature-customer-management/components/customer-add/customer-add.component';
import { AttributeListComponent } from '../modules/admin/feature-attribute-management/components/thuoc-tinh/mau-sac/color-list/attribute-list.component';
import { ChatLieuListComponent } from '../modules/admin/feature-attribute-management/components/thuoc-tinh/chat-lieu/chat-lieu-list/chat-lieu-list.component';
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
import { ScanQrComponent } from '../system/components/scan-qr/scan-qr.component';
import { NotfoundComponent } from '../system/components/notfound/notfound.component';
import { MainLayoutUserComponent } from '../layouts/user-layout/main-layout-user/main-layout-user.component';
import { HomeUserComponent } from '../modules/user/components/home-user/home-user.component';
import { DetailProductComponent } from '../modules/user/components/detail-product/detail-product.component';
import { PaymentComponent } from '../modules/user/components/payment/payment.component';
import { CartComponent } from '../modules/user/components/cart/cart.component';
import { LoginComponent } from '../modules/admin/feature-login/components/login/login.component';
import { LoginComponent as LoginCustommer } from '../modules/user/components/login/login.component';
import { ThuongHieuListComponent } from '../modules/admin/feature-attribute-management/components/thuoc-tinh/thuong-hieu/thuong-hieu-list/thuong-hieu-list.component';
import { DanhMucListComponent } from '../modules/admin/feature-attribute-management/components/thuoc-tinh/danh-muc/danh-muc-list/danh-muc-list.component';
import { authGuard } from '../core/guards/auth-guard';
import { PayMentHistoryComponent } from '../modules/user/components/pay-ment-history/pay-ment-history.component';

export const routes: Routes = [
    // { path: '', redirectTo: '/admin/dashboard', pathMatch: 'full' },
    { path: '404', component: NotfoundComponent },
    {
        path: 'admin',
        component: MainLayoutAdminComponent,
        data: { role: ['ADMIN', 'EMPLOYEE'] },
        canActivate: [authGuard],
        children: [
            { path: "dashboard", component: DashboardComponent, title: "Tổng quan", data: { role: ['ADMIN'] }, canActivate: [authGuard] },
            { path: "product", component: ProductListComponent, title: "Quản lý sản phẩm", canActivate: [authGuard]  },
            { path: "product-attribute", component: ProductListComponent, title: "Quản lý thuộc tính" , canActivate: [authGuard] },
            { path: "product/detail/:idProduct", component: ProductDetailComponent, title: "Chi tiết sản phẩm", canActivate: [authGuard] },
            { path: "product/create", component: ProductFormComponent, title: "Thêm sản phẩm", canActivate: [authGuard] },
            { path: 'attribute/list', component: AttributeListComponent, canActivate: [authGuard] },
            { path: 'chatLieu/list', component: ChatLieuListComponent, canActivate: [authGuard] },
            { path: 'kichCo/list', component: KichCoListComponent, canActivate: [authGuard] },
            { path: 'trongLuong/list', component: TrongLuongListComponent, canActivate: [authGuard] },
            { path: 'thuongHieu/list', component: ThuongHieuListComponent, canActivate: [authGuard] },
            { path: 'danhMuc/list', component: DanhMucListComponent },
            { path: "employee/list", component: EmployeeListComponent, title: "Quản lý nhân viên", canActivate: [authGuard]},
            { path: "employee/add", component: EmployeeAddComponent, title: "Thêm mới nhân viên", canActivate: [authGuard]},
            { path: "employee/update/:id", component: EmployeeUpdateComponent, title: "Cập nhật nhân viên", canActivate: [authGuard]},
            { path: "employee/detail/:id", component: EmployeeListComponent , canActivate: [authGuard]},
            { path: "customer/list", component: CustomerListComponent, title: "Quản lý khách hàng", canActivate: [authGuard]},
            { path: "customer/add", component: CustomerAddComponent, title: "Thêm mới khách hàng", canActivate: [authGuard]},
            { path: "customer/update/:id", component: CustomerUpdateComponent, title: "Cập nhật khách hàng", canActivate: [authGuard]},
            { path: "customer/detail/:id", component: CustomerListComponent, canActivate: [authGuard]},
            { path: "invoice", component: InvoiceListComponent, title: "Quản lý hóa đơn", canActivate: [authGuard] },
            { path: "invoice/detail/:id", component: InvoiceDetailComponent, title: "Chi tiết hóa đơn", canActivate: [authGuard] },
            { path: "invoice/update/:id", component: InvoiceUpdateComponent, title: "Cập nhật hóa đơn", canActivate: [authGuard] },
            { path: "coupons", component: CouponsListComponent, title: "Quản lý Phiếu Giảm Giá", canActivate: [authGuard] },
            { path: "coupons/create", component: CouponsCreateComponent, title: "Thêm Phiếu Giảm Giá", canActivate: [authGuard] },
            { path: "coupons/update/:id", component: CouponsUpdateComponent, title: "Update Phiếu Giảm Giá", canActivate: [authGuard] },
            { path: "counter-sales", component: CounterSalesComponent, title: "Bán hàng tại quầy", canActivate: [authGuard] },
            { path: "qr", component: ScanQrComponent, title: "QR", canActivate: [authGuard] },
        ],
    },

    {
        path: 'okconde',
        component: MainLayoutUserComponent,
        children: [
            {path: 'home', component: HomeUserComponent, title: 'Trang chủ'},
            {path: 'detail-product/:idProduct', component: DetailProductComponent, title: 'Chi tiết sản phẩm'},
            {path: 'payment/:idDetailProduct', component: PaymentComponent, title: 'Thanh toán'},
            {path: 'cart', component: CartComponent, title: 'Giỏ hàng'},
            {path: 'history', component: PayMentHistoryComponent, title: 'Lịch sử mua hàng'},
        ]
    },

    { path: "login", component: LoginComponent, title: "Đăng nhập admin" },
    { path: "okconde/login", component: LoginCustommer, title: "Đăng nhập" },

];
