import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CounterSalesService } from '../../service/counter-sales.service';
import { NotificationService } from '../../../../../shared/notification.service';
import { KhachHangResponse } from '../../../../../models/khach-hang/response/khach-hang-response';
import { FormsModule } from '@angular/forms';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-counter-sales',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './counter-sales.component.html',
  styleUrl: './counter-sales.component.scss'
})
export class CounterSalesComponent implements OnInit {

  /**Biến hứng dữ liệu cho danh sách hóa đơn chờ thanh toán */
  listPendingInvoice: any[] = [];

  /**Biến hứng dữ liệu cho danh sách sản phẩm chi tiết  */
  listProductDetail: any[] = [];

  /**Biến hứng dữ liệu cho danh sách hóa đơn chi tiết lấy theo id hóa đơn */
  listDetailInvoiceByIdInvoice: any[] = [];

  //Biến hứng dữ liệu khách hàng
  khachHangs: KhachHangResponse[] = [];

  selectedCustomer: KhachHangResponse = {
    idKhachHang: 0,
    maKhachHang: '',
    tenKhachHang: '',
    soDienThoai: '',
    email: '',
    ngaySinh: null,
    gioiTinh: true,
    ghiChu: '',
    ngayTao: null,
    ngayChinhSua: null,
    trangThai: 'ACTIVE',
    diaChiKhachHangs: []
  }; // Dữ liệu khách hàng được chọn để xem

  // Các biến phân trang
  /**Phân trang */
  size: number = 5;
  page: number = 0;
  totalPages: number = 1;  /**Bắt sự kiện thay đổi trang */

  // Dữ liệu tìm kiếm
  khachHangSearchRequest = {
    maKhachHang: '',
    tenKhachHang: '',
    soDienThoai: ''
  }

  changePage(pageNew: number) {
    this.page = pageNew;
    this.fetchDataListKhachHangs();
  }

  /**Constructor */
  constructor(
    private counterSalesService: CounterSalesService,
    private notiService: NotificationService,
    private router: Router
  ) { }

  /**Tải dữ liệu cho danh sách hóa đơn chờ thanh toán */
  fetchListPendingInvoice() {
    this.counterSalesService.callApiGetListPendingInvoiceCounterSales().subscribe({
      next: (response: any) => {
        this.listPendingInvoice = response.data;
      },
      error: (err: any) => {

      }
    })
  }

  /**Hàm bắt sự kiện tạo hóa đơn chờ mới */
  handleCreatePendingInvoice() {
    throw new Error('Method not implemented.');
  }

  /** Hàm tìm kiếm khách hàng */
  searchCustomers() {
    this.page = 0; // Reset lại trang khi bắt đầu tìm kiếm
    this.fetchDataListKhachHangs();
  }

  /**Hàm tải dữ liệu danh sách khách hàng */
  fetchDataListKhachHangs() {
    this.counterSalesService.callApigetCustomersByPage(this.khachHangSearchRequest, this.page, this.size).subscribe({
      next: (response: any) => {
        this.khachHangs = response.data.content;
        this.totalPages = response.data.totalPages;
        console.log('KhachHangs', this.khachHangs);
      },
      error: (err: any) => {
        console.error('Lỗi khi lấy danh sách khách hàng: ', err);
      }
    });
  }

  /** Hàm reset tìm kiếm */
  resetSearch() {
    this.khachHangSearchRequest = {
      maKhachHang: '',
      tenKhachHang: '',
      soDienThoai: ''
    };
    this.searchCustomers();
  }

  // Hàm chọn khách hàng
  selectCustomer(khachHang: any) {
    this.selectedCustomer = khachHang;
    this.closeModal('closeModalSelectedCustomer');
  }

  // Hàm điều hướng đến trang thêm khách hàng
  navigateToAddCustomer(): void {
    this.router.navigate(['/admin/customer/add']);
    this.closeModal('closeModalSelectedCustomer');
  }

  /** Closemodal để đóng modal khi chọn */
  closeModal(idBtn: string) {
    const closeModal = document.getElementById(idBtn);
    if (closeModal) {
      closeModal.click();
    }
  }


  /**Khởi tạo dữ liệu */
  ngOnInit(): void {
    this.fetchListPendingInvoice();
    this.fetchDataListKhachHangs();
  }
}
