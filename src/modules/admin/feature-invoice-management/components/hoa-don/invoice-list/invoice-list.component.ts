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

export enum StatusHD {
  PENDING = 'PENDING',
  SHIPPING = 'SHIPPING',
  PAID = 'PAID',
  CANCELLED = 'CANCELLED',
  REFUNDED = 'REFUNDED',
  OVERDUE = 'OVERDUE'
}


@Component({
  selector: 'app-invoice-list',
  standalone: true,
  imports: [CommonModule, FormsModule, MatTabsModule, ReactiveFormsModule],
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
    soDienThoai: null
  };

  /** Form tạo mới hóa đơn */
  form!: FormGroup;

  loading: boolean = true;

  /** Biến số lượng hóa đơn */
  invoiceCount: number = 0;
  invoicePendingCount: number = 0;
  invoicePaidCount: number = 0;
  invoiceCancelledCount: number = 0;
  invoiceRefundedCount: number = 0;
  invoiceOverdueCount: number = 0;

  /** Biến enum Hóa Đơn để sử dụng trong template */
  StatusHD = StatusHD;  // Khai báo enum StatusHD

  // Chuyển đổi enum thành mảng
  statusList: string[] = Object.values(StatusHD);

  /** Biến cho trạng thái lọc */
  selectedStatus: string | null = null; // Biến để lưu trạng thái đã chọnF
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
    private notificationService: NotificationService,
    private el: ElementRef,
    private fb: FormBuilder,
    private dateUtilsService: DateUtilsService
  ) { }

  /** Hàm bắt dữ liệu trạng thái của hóa đơn */
  getInvoiceStatus(status: string): string {
    switch (status) {
      case StatusHD.PENDING:
        return 'Đang chờ xử lý';
      case StatusHD.SHIPPING:
        return 'Đang vận chuyển';
      case StatusHD.PAID:
        return 'Đã thanh toán';
      case StatusHD.CANCELLED:
        return 'Đã hủy';
      case StatusHD.REFUNDED:
        return 'Đã hoàn tiền';
      case StatusHD.OVERDUE:
        return 'Quá hạn';
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
      soDienThoai: null
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

  /** Hàm tìm kiếm phân trang Hóa Đơn */
  fetchDataSearchHoaDon() {
    this.inVoiceService.searchPageInvoice(this.inVoiceSearch, this.paginatinonOfSP.page, this.paginatinonOfSP.size).subscribe({
      next: (response: any) => {
        this.hoaDons = response.data.content;
        this.invoiceCount = this.hoaDons.length;
        this.paginatinonOfSP.totalPages = response.data.totalPages;
        this.paginatinonOfSP.totalElements = response.data.totalElements;
        this.paginatinonOfSP.page = response.data.pageable.pageNumber;
        this.paginatinonOfSP.first = response.data.first;
        this.paginatinonOfSP.last = response.data.last;
        this.getInvoiceCountByStatus(); // Gọi để lấy số lượng hóa đơn theo trạng thái
      }
    })
  }

  /** Khởi tạo form với các giá trị ban đầu là null */
  initializeForm() {
    this.form = this.fb.group({
      maHoaDon: ['', Validators.required],
      ngayTaoDon: ['', Validators.required],
      phiVanChuyen: ['', [Validators.required, Validators.min(0)]],
      tongTien: ['', [Validators.required, Validators.min(0)]],
      tongTienSauGiam: ['', [Validators.required, Validators.min(0)]],
      loaiHoaDon: ['', Validators.required],
      diaChiGiaoHang: ['', Validators.required],
      khachHang: [null, Validators.required],
      nhanVien: [null, Validators.required],
      thanhToan: [null, Validators.required],
      phieuGiamGia: [null, Validators.required],
      ghiChu: ['']
    });
  }


  /** Hàm tải dữ liệu cho danh sách khách hàng */
  fetchKhachHangs() {
    this.khachHangService.getAllCustomer().subscribe({
      next: (response: any) => {
        this.khachHangs = response.data;
      },
      error: err => {
        console.error('Lỗi khi tải danh sách khách hàng: ', err);

      }
    })
  }


  /** Hàm lấy số lượng hóa đơn theo trạng thái */
  getInvoiceCountByStatus() {
    this.inVoiceService.getInvoiceCountByStatus().subscribe({
      next: (response: any) => {
        this.invoicePendingCount = response.PENDING || 0;
        this.invoicePaidCount = response.PAID || 0;
        this.invoiceCancelledCount = response.CANCELLED || 0;
      },
      error: (err: any) => {
        console.error('Lỗi khi hiển thị số lượng hóa đơn theo trạng thái', err);
      }
    });
  }

  /** Hàm submit thêm hóa đơn mới */
  handleSubmitFormInvoice() {
    // Chỉ được thêm tối đa 5 hóa đơn
    if (this.invoiceCount >= 5) {
      this.notificationService.showError('Bạn chỉ được tạo tối đa 5 hóa đơn');
      return;
    }

    // Kiểm tra tính hợp lệ của form
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.notificationService.showError('Vui lòng nhập đầy đủ các thông tin cần thiết');
      return;
    }

    // Chuyển đổi định dạng ngày tháng trước khi gửi lên backend
    const formattedDate = this.dateUtilsService.convertToCustomFormat(this.form.value.ngayTaoDon);
    this.form.patchValue({ ngayTaoDon: formattedDate });


    // Form hợp lệ thì gửi lệnh request thêm mới sản phẩm
    this.inVoiceService.postCreateInvoice(this.form.value).subscribe({
      next: (response: any) => {
        this.invoiceCount++;
        this.fetchDataSearchHoaDon();
        this.notificationService.showSuccess('Thêm hóa đơn mới thành công');
        this.closeModal('btnCloseModalAdd');
        this.clearFormData();
      },
      error: (err) => {
        this.notificationService.showError('Thêm hóa đơn thất bại');
        console.error('Lỗi khi thêm hóa đơn:', err);
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

  /**Clear dữ liệu trên form */
  clearFormData() {
    this.form.reset();
  }

  ngOnInit(): void {
    this.fetchDataSearchHoaDon();
    this.getInvoiceCountByStatus();
    this.fetchKhachHangs();
    this.initializeForm();
    this.loading = false;
  }

}
