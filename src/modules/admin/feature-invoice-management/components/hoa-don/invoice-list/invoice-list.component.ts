import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit } from '@angular/core';
import { InvoiceService } from '../../../services/invoice.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HoaDonResponse } from "../../../../../../models/hoa-don/response/hoa-don-response";
import { HoaDonSearch } from '../../../../../../models/hoa-don/request/hoa-don-search';
import { MatTabsModule } from '@angular/material/tabs';
import { NotificationService } from '../../../../../../shared/notification.service';
import { KhachHangResponse } from '../../../../../../models/khach-hang/response/khach-hang-response';
import { KhachHangService } from '../../../../feature-customer-management/service/khach-hang.service';
import { NhanVienResponse } from '../../../../../../models/nhan-vien/response/nhan-vien-response';
import { NhanVienService } from '../../../../feature-employee-management/service/nhan-vien.service';
import { PaymentService } from '../../../services/payment.service';
import { CouponsService } from '../../../services/coupons.service';
import { ThanhToanResponse } from '../../../../../../models/thanh-toan/response/thanh-toan-response';
import { PhieuGiamGiaResponse } from '../../../../../../models/phieu-giam-gia/response/phieu-giam-gia-response';
import { DateUtilsService } from '../../../../../../shared/helper/date-utils.service';
import { Pagination } from '../../../../../../shared/type/pagination';
import { SttUtilsService } from '../../../../../../shared/helper/stt-utils.service';
import { LoadingComponent } from "../../../../../../shared/loading/loading.component";

export enum StatusHD {
  TOTAL = 'TOTAL',
  PENDING = 'PENDING',
  PENDINGPROCESSING = 'PENDINGPROCESSING',
  SHIPPING = 'SHIPPING',
  PAID = 'PAID',
  CANCELLED = 'CANCELLED'
}

export enum LoaiHoaDon {
  COUNTERSALES = 'COUNTERSALES',
  ONLINESALES = 'ONLINESALES'
}



@Component({
  selector: 'app-invoice-list',
  standalone: true,
  imports: [CommonModule, FormsModule, MatTabsModule, ReactiveFormsModule, LoadingComponent],
  templateUrl: './invoice-list.component.html',
  styleUrl: './invoice-list.component.scss'
})

export class InvoiceListComponent implements OnInit {

  /** Biến hứng dữ liệu */
  hoaDons: HoaDonResponse[] = [];
  khachHangs: KhachHangResponse[] = [];
  nhanViens: NhanVienResponse[] = [];
  thanhToans: ThanhToanResponse[] = [];
  phieuGiamGias: PhieuGiamGiaResponse[] = [];

  /** Biến gửi dữ liệu tìm kiếm */
  inVoiceSearch: HoaDonSearch = {
    maHoaDon: null,
    ngayTaoStart: null,
    ngayTaoEnd: null,
    trangThai: null,
    tenKhachHang: null,
    soDienThoai: null,
    loaiHoaDon: null
  };

  loading: boolean = true;

  /** Biến số lượng hóa đơn */
  invoiceCount: number = 0;
  invoiceTotalCount: number = 0;
  invoicePendingCount: number = 0;
  invoicePendingProcessingCount: number = 0;
  invoiceShippingCount: number = 0;
  invoicePaidCount: number = 0;
  invoiceCancelledCount: number = 0;
  invoiceRefundedCount: number = 0;
  invoiceOverdueCount: number = 0;

  /** Biến enum Hóa Đơn để sử dụng trong template */
  StatusHD = StatusHD;  // Khai báo enum StatusHD

  // Chuyển đổi enum thành mảng
  statusList: string[] = Object.values(StatusHD);
  statusInvoieType: string[] = Object.values(LoaiHoaDon);

  /** Biến cho trạng thái lọc */
  selectedStatus: string | null = null;
  selectedInvoiceType: string | null = null;
  selectedKhachHang: number | null = null;


  //Phân trang
  paginatinonOfSP: Pagination = {
    size: 10,
    page: 0,
    totalElements: 0,
    totalPages: 0,
    first: false,
    last: false
  }


  constructor(
    private inVoiceService: InvoiceService,
    private khachHangService: KhachHangService,
    private nhanVienService: NhanVienService,
    private thanhToanService: PaymentService,
    private phieuGiamGiaService: CouponsService,
    private router: Router,
    private sttService: SttUtilsService,
    private notificationService: NotificationService,
    private el: ElementRef,
    private fb: FormBuilder,
    private dateUtilsService: DateUtilsService
  ) { }

  /** Hàm bắt dữ liệu trạng thái của hóa đơn */
  getInvoiceStatus(status: string): string {
    switch (status) {
      case StatusHD.PENDING:
        return 'Đang chờ thanh toán';
      case StatusHD.PENDINGPROCESSING:
        return 'Đang chờ xử lý';
      case StatusHD.SHIPPING:
        return 'Đang vận chuyển';
      case StatusHD.PAID:
        return 'Đã thanh toán';
      case StatusHD.CANCELLED:
        return 'Đã hủy';
      default:
        return 'Không xác định';
    }
  }

  /** Hàm bắt dữ liệu loại hóa đơn */
  getInvoiceType(statusInvoieType: string): string {
    switch (statusInvoieType) {
      case LoaiHoaDon.COUNTERSALES:
        return 'Bán hàng tại quầy';
      case LoaiHoaDon.ONLINESALES:
        return 'Bán hàng trực tuyến';
      default:
        return 'Không xác định';
    }
  }

  /** Hàm tìm kiếm hóa đơn */
  searchInvoice() {
    this.inVoiceSearch.tenKhachHang;
    this.inVoiceSearch.soDienThoai;
    this.inVoiceSearch.maHoaDon;
    this.paginatinonOfSP.page = 0;
    this.fetchDataSearchHoaDon();
  }

  /** Hàm lọc trạng thái, nhân viên, khách hàng, phiếu giảm giá, thanh toán */
  filterInvoice() {
    // Chuyển đổi ngày tạo bắt đầu và kết thúc sang định dạng backend (HH:mm:ss dd-MM-yyyy)
    // this.inVoiceSearch.ngayTaoStart = this.inVoiceSearch.ngayTaoStart
    //   ? this.dateUtilsService.convertToBackendFormat(this.inVoiceSearch.ngayTaoStart + '')
    //   : null;

    // this.inVoiceSearch.ngayTaoEnd = this.inVoiceSearch.ngayTaoEnd
    //   ? this.dateUtilsService.convertToBackendFormat(this.inVoiceSearch.ngayTaoEnd + '')
    //   : null;

    this.inVoiceSearch.trangThai = this.selectedStatus || null;
    this.inVoiceSearch.loaiHoaDon = this.selectedInvoiceType || null;
    this.fetchDataSearchHoaDon();
  }

  /** Hàm reset tìm kiếm */
  resetSearch() {
    this.inVoiceSearch = {
      maHoaDon: null,
      ngayTaoStart: null,
      ngayTaoEnd: null,
      trangThai: null,
      tenKhachHang: null,
      soDienThoai: null,
      loaiHoaDon: null,
    };
    this.paginatinonOfSP.page = 0;
    this.fetchDataSearchHoaDon();
  }


  /** Hàm tải dữ liệu danh sách các hóa đơn */
  fetchDataHoaDons() {
    this.inVoiceService.getAllInvoice().subscribe({
      next: (response: any) => {
        this.hoaDons = response.data;
        console.log('HoaDons', this.hoaDons);
      },
      error: (err: any) => {
        console.error('Lỗi khi lấy danh sách hóa đơn: ', err);
      }
    })
  }

  /**Tính stt */
  tinhSTT(page: number, size: number, current: number): number {
    return this.sttService.tinhSTT(page, size, current);
  }

  /** Hàm tìm kiếm phân trang Hóa Đơn */
  fetchDataSearchHoaDon() {
    this.inVoiceService.searchPageInvoice(this.inVoiceSearch, this.paginatinonOfSP.page, this.paginatinonOfSP.size).subscribe({
      next: (response: any) => {
        this.hoaDons = response.data.content;
        this.paginatinonOfSP.totalPages = response.data.totalPages;
        this.paginatinonOfSP.totalElements = response.data.totalElements;
        this.paginatinonOfSP.page = response.data.pageable.pageNumber;
        this.paginatinonOfSP.first = response.data.first;
        this.paginatinonOfSP.last = response.data.last;
        this.getInvoiceCountByStatus(); // Gọi để lấy số lượng hóa đơn theo trạng thái
      }
    })
  }



  // /** Hàm tải dữ liệu cho danh sách khách hàng */
  // fetchKhachHangs() {
  //   this.khachHangService.getAllCustomer().subscribe({
  //     next: (response: any) => {
  //       this.khachHangs = response.data;
  //     },
  //     error: err => {
  //       console.error('Lỗi khi tải danh sách khách hàng: ', err);

  //     }
  //   })
  // }


  /** Hàm lấy số lượng hóa đơn theo trạng thái */
  getInvoiceCountByStatus() {
    this.inVoiceService.getInvoiceCountByStatus().subscribe({
      next: (response: any) => {
        this.invoiceTotalCount = response.TOTAL || 0;
        this.invoicePendingCount = response.PENDING || 0;
        this.invoicePendingProcessingCount = response.PENDINGPROCESSING || 0;
        this.invoiceShippingCount = response.SHIPPING || 0;
        this.invoicePaidCount = response.PAID || 0;
        this.invoiceCancelledCount = response.CANCELLED || 0;
      },
      error: (err: any) => {
        console.error('Lỗi khi hiển thị số lượng hóa đơn theo trạng thái', err);
      }
    });
  }


  /** Hàm bắt sự kiện thay đổi trang cho tất cả hóa đơn */
  changePage(pageNew: number) {
    this.paginatinonOfSP.page = pageNew;
    this.fetchDataSearchHoaDon();
  }

  /** Hàm bắt sự kiện xem chi tiết hóa đơn */
  handleDetailInvoice(idHoaDon: number) {
    this.router.navigate([`/admin/invoice/detail/${idHoaDon}`]);
  }

  /** Hàm bắt sự kiện cập nhật hóa đơn */
  handleUpdateInvoice(idHoaDon: number) {
    this.router.navigate([`/admin/invoice/update/${idHoaDon}`]);
  }

  /**Hàm bắt sự kiện đổi trang bảng hóa đơn */
  handlePageSPCTChange(type: string) {
    if (type === 'pre') {
      this.paginatinonOfSP.page -= 1;
    } else if (type === 'next') {
      this.paginatinonOfSP.page += 1;
    }
    this.fetchDataSearchHoaDon();
  }

  /** Closemodal để đống modal khi submitAdd */
  closeModal(idBtn: string) {
    const btn = document.getElementById(idBtn);
    if (btn) {
      btn.click();
    }
  }



  ngOnInit(): void {
    this.fetchDataSearchHoaDon();
    this.getInvoiceCountByStatus();
    this.loading = false;
  }

}
