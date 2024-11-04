import { CommonModule } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { CounterSalesService } from '../../service/counter-sales.service';
import { NotificationService } from '../../../../../shared/notification.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SanPhamChiTietResponse } from '../../../../../models/san-pham-chi-tiet/response/san-pham-chi-tiet-response';
import { MauSacResponse } from '../../../../../models/mau-sac/response/mau-sac-response';
import { ChatLieuResponse } from '../../../../../models/chat-lieu/response/chat-lieu-response';
import { ChatLieuDeGiayResponse } from '../../../../../models/chat-lieu-de-giay/response/chat-lieu-de-giay-response';
import { KieuDeGiayResponse } from '../../../../../models/kieu-de-giay/response/kieu-de-giay-response';
import { KichCoResponse } from '../../../../../models/kich-co/response/kich-co-response';
import { TrongLuongResponse } from '../../../../../models/trong-luong/response/trong-luong-response';
import { SanPhamChiTietSearchRequest } from '../../../../../models/san-pham-chi-tiet/request/san-pham-chi-tiet-search-request';
import { ThuongHieuResponse } from '../../../../../models/thuong-hieu/response/thuong-hieu-response';
import { DanhMucResponse } from '../../../../../models/danh-muc/response/danh-muc-response';
import { ThuongHieuService } from '../../../feature-product-management/services/thuong-hieu.service';
import { DanhMucService } from '../../../feature-product-management/services/danh-muc.service';
import { MauSacService } from '../../../feature-attribute-management/service/mau-sac.service';
import { TrongLuongService } from '../../../feature-attribute-management/service/trong-luong.service';
import { KieuDeGiayService } from '../../../feature-attribute-management/service/kieu-de-giay.service';
import { ChatLieuDeGiayService } from '../../../feature-attribute-management/service/chat-lieu-de-giay.service';
import { KichCoService } from '../../../feature-attribute-management/service/kich-co.service';
import { ChatLieuService } from '../../../feature-attribute-management/service/chat-lieu.service';
import { KhachHangResponse } from '../../../../../models/khach-hang/response/khach-hang-response';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { KhachHangRequest } from '../../../../../models/khach-hang/request/khach-hang-request';
import { DiaChiKhachHangRequest } from '../../../../../models/dia-chi-khach-hang/request/dia-chi-khach-hang-request';
import { DateUtilsService } from '../../../../../shared/helper/date-utils.service';
import { GiaoHangNhanhService } from '../../../../../shared/giaohangnhanh/giaohangnhanh.service';
import { KhachHangService } from '../../../feature-customer-management/service/khach-hang.service';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { CustomerAddComponent } from "../../../feature-customer-management/components/customer-add/customer-add.component";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';


export enum StatusHD {
  PENDING = 'PENDING',
  PAID = 'PAID',
  CANCELLED = 'CANCELLED',
  REFUNDED = 'REFUNDED',
  OVERDUE = 'OVERDUE'
}

@Component({
  selector: 'app-counter-sales',
  standalone: true,
  imports: [CommonModule, FormsModule, NgMultiSelectDropDownModule, CustomerAddComponent, ReactiveFormsModule],
  templateUrl: './counter-sales.component.html',
  styleUrl: './counter-sales.component.scss'
})
export class CounterSalesComponent implements OnInit {
  form!: FormGroup; //Biến form
  searchResults: any[] = []; // Biến lưu trữ kết quả tìm kiếm

  /** Biến hứng dữ liệu cho danh sách hóa đơn chờ thanh toán */
  listPendingInvoice: any[] = [];

  /** Biến hứng dữ liệu cho danh sách sản phẩm chi tiết */
  listProductDetail: any[] = [];

  /** Biến hứng dữ liệu cho danh sách hóa đơn chi tiết lấy theo id hóa đơn */
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

  /**Dữ liệu khi confirm hủy hóa đơn*/
  hoaDonHuy = {
    idHoaDon: null
  }
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

  /**Biến tạo hóa đơn chi tiết mới */
  newDetailInvoie: any = {

  }

  /** Biến hứng dữ liệu cho danh sách thuộc tính SPCT */
  spcts: SanPhamChiTietResponse[] = [];

  /**Các biến hứng dữ liệu cho các combobox*/
  thuongHieus: ThuongHieuResponse[] = []; // Thương hiệu
  danhMucs: DanhMucResponse[] = []; // Danh mục
  mauSacs: MauSacResponse[] = []; // Màu sắc
  trongLuongs: TrongLuongResponse[] = []; // Trọng lượng
  kieuDeGiays: KieuDeGiayResponse[] = []; // Kiểu đế giày
  chatLieuDeGiays: ChatLieuDeGiayResponse[] = []; // Chất liệu đế giày
  kichCos: KichCoResponse[] = []; // Kích cỡ
  chatLieus: ChatLieuResponse[] = []; // Chất liệu

  /**Mảng chứa kết quả tìm kiếm*/
  filteredSpcts: any[] = [];

  /** Biến hứng dữ liệu cho danh sách thuộc tính SPCT */
  sanPhamChiTietSearchs: SanPhamChiTietSearchRequest = {
    maSpct: null,
    idChatLieu: null,
    idKieuDeGiay: null,
    idChatLieuDeGiay: null,
    idTrongLuong: null,
    idMauSac: null,
    idKichCo: null,
  };

  /** Biến điều khiển modal */
  isConfirmModalVisible = false;
  isCustomerSelectModalVisible = false;


  /** Constructor */
  constructor(
    private counterSalesService: CounterSalesService,
    private notiService: NotificationService,
    private route: ActivatedRoute,
    private router: Router,
    private thuongHieuService: ThuongHieuService,
    private danhMucService: DanhMucService,
    private mauSacSerVice: MauSacService,
    private trongLuongService: TrongLuongService,
    private kieuDeGiayService: KieuDeGiayService,
    private chatLieuDeGiayService: ChatLieuDeGiayService,
    private kichCoService: KichCoService,
    private chatLieuService: ChatLieuService,
    private fb: FormBuilder,
    private khachHangService: KhachHangService,
    private dateUtilsService: DateUtilsService,
    private notificationService: NotificationService,
    private GHNService: GiaoHangNhanhService
  ) {}

  /** Hàm bắt dữ liệu trạng thái của hóa đơn */
  getInvoiceStatus(status: string): string {
    switch (status) {
      case StatusHD.PENDING:
        return 'Đang chờ';
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
  /**Hàm gọi API lấy danh sách hóa đơn chi tiết theo ID hóa đơn */
  fecthListDetailInvoiceById(idHoaDon: number) {
    this.counterSalesService.callApiGetListDetailInvoice(idHoaDon).subscribe({
      next: (response: any) => {
        this.listDetailInvoiceByIdInvoice = response.data;
      },
      error: (err: any) => {
        this.notiService.showError('Không thể tải danh sách hóa đơn chi tiết');
      }
    })
  }
  /** Tải dữ liệu cho danh sách thuộc tính sản phẩm chi tiết */
  fetchListThuocTinh() {
    this.counterSalesService
      .callApiGetListThuocTinh(this.sanPhamChiTietSearchs, this.page, this.size)
      .subscribe({
        next: (res: any) => {
          this.spcts = res.data.content;
          this.totalPages = res.data.totalPages;
          console.log('Danh sách sản phẩm chi tiết:', this.spcts); // Kiểm tra dữ liệu
        },
        error: (err: any) => {
          console.error('Lỗi khi tìm dữ liệu sản phẩm chi tiết:', err);
          this.notiService.showError(
            'Lỗi khi tải danh sách thuộc tính sản phẩm chi tiết.'
          );
        },
      });
  }

  /**Hàm tải dữ liệu cho danh sách thương hiệu*/
  fetchThuongHieus() {
    this.thuongHieuService.getAllThuongHieu().subscribe({
      next: (res: any) => {
        this.thuongHieus = res.data;
      },
      error: err => {
        console.log('Lỗi khi tải dữ liệu danh sách thương hiệu: ', err);
      }
    })
  }

  /**Hàm tải dữ liệu cho danh sách danh mục*/
  fetchDanhMuc() {
    this.danhMucService.getAllDanhMuc().subscribe({
      next: (res: any) => {
        this.danhMucs = res.data;
      },
      error: err => {
        console.log('Lỗi khi tải dữ liệu danh sách danh mục: ', err);
      }
    })
  }

  /**Hàm tải dữ liệu cho danh sách màu sắc*/
  fetchMauSacs() {
    this.mauSacSerVice.getAllMauSac().subscribe({
      next: (res: any) => {
        this.mauSacs = res.data;
      },
      error: err => {
        console.log('Lỗi khi tải dữ liệu danh sách màu sắc: ', err);
      }
    })
  }

  /**Hàm tải dữ liệu cho danh sách trọng lượngt*/
  fetchTrongLuongs() {
    this.trongLuongService.getAllTrongLuong().subscribe({
      next: (res: any) => {
        this.trongLuongs = res.data;
      },
      error: err => {
        console.log('Lỗi khi tải dữ liệu danh sách trọng lượng: ', err);
      }
    })
  }

  /**Hàm tải dữ liệu cho danh sách kiểu đế giày*/
  fetchKieuDeGiays() {
    this.kieuDeGiayService.getAllKieuDeGiay().subscribe({
      next: (res: any) => {
        this.kieuDeGiays = res.data;
      },
      error: err => {
        console.log('Lỗi khi tải dữ liệu danh sách kiểu đế giày: ', err);
      }
    })
  }

  /**Hàm tải dữ liệu cho danh sách chất liệu đế giày*/
  fetchChatLieuDeGiays() {
    this.chatLieuDeGiayService.getAllCLDG().subscribe({
      next: (res: any) => {
        this.chatLieuDeGiays = res.data;
      },
      error: err => {
        console.log('Lỗi khi tải dữ liệu danh sách chất liệu đế giày: ', err);
      }
    })
  };

  /**Hàm tải dữ liệu cho danh sách kích cỡ*/
  fetchKichCos() {
    this.kichCoService.getAllKichCo().subscribe({
      next: (res: any) => {
        this.kichCos = res.data;
      },
      error: err => {
        console.log('Lỗi khi tải dữ liệu danh sách kích cỡ: ', err);
      }
    })
  }

  /**Hàm tải dữ liệu cho danh sách chất liệu*/
  fetchChatLieus() {
    this.chatLieuService.getAllChatLieu().subscribe({
      next: (res: any) => {
        this.chatLieus = res.data;
      },
      error: err => {
        console.log('Lỗi khi tải dữ liệu danh sách chất liệu: ', err);
      }
    })
  }

  /** Hàm tìm kiếm thuộc tính */
  submitSearch() {
    // Lấy dữ liệu từ form
    this.sanPhamChiTietSearchs.maSpct;
    this.page = 0; // Reset lại trang khi bắt đầu tìm kiếm
    this.fetchListThuocTinh();
    this.closeModal('closeModalUpdate');
  }
  /**Hàm bắt sự kiện tạo hóa đơn chờ mới */
  handleCreatePendingInvoice() {
    this.counterSalesService.callApiCreateNewPendingInvoice().subscribe({
      next: (response: any) => {
        if(response.status === 200){
          this.fetchListPendingInvoice();
          this.notiService.showSuccess(response.message);
          this.activeTab = this.listPendingInvoice.length;
        }
      },
      error: (err: any) => {
        this.notiService.showError(err.error.message);
      }
    })
  };

  /**Hàm bắt sự kiện xem chi tiết hóa đơn chờ  */
  handleViewDetailPendingInvoice(idHoaDon: number) {
    this.fetchListPendingInvoice();
  };

  bills = [
    { id: 1, name: "Hóa đơn 1", details: "Chi tiết hóa đơn 1" },
    { id: 2, name: "Hóa đơn 2", details: "Chi tiết hóa đơn 2" },
    { id: 3, name: "Hóa đơn 3", details: "Chi tiết hóa đơn 3" },
    // thêm hóa đơn khác nếu cần
  ];
  activeTab = 0; // Tab mặc định

  /**Phương thức hủy hóa đơn chờ theo ID */
  cancelPendingInvoice(id: number) {
    this.counterSalesService.callApiCancelInvoiceById(id).subscribe({
      next: (value: any) => {
        this.notiService.showSuccess(value[0]); // Thông báo khi hủy thành công
        this.fetchListPendingInvoice(); // Tải lại danh sách hóa đơn chờ
      },
      error: (err: any) => {
        console.error(err);
        this.notiService.showError(
          'Hủy hóa đơn không thành công: ' + err.message
        );
      },
    });
  }

  /** reset form khi chọn lại tìm kiếm */
  resetForm() {
    this.sanPhamChiTietSearchs = {
      maSpct: null,
      idChatLieu: null,
      idKieuDeGiay: null,
      idChatLieuDeGiay: null,
      idTrongLuong: null,
      idMauSac: null,
      idKichCo: null,
    };
  }

  /** Closemodal để đống modal khi submitSearch */
  closeModal(idBtn: string) {
    const closeModalUpdate = document.getElementById(idBtn);
    if (closeModalUpdate) {
      closeModalUpdate.click();
    }
  }

  /** Khởi tạo dữ liệu */
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
    let idHoaDon = this.listPendingInvoice[this.activeTab].idHoaDon;
    this.counterSalesService.callApiUpdateCustomerToInvoiceCounterSales(idHoaDon, khachHang.idKhachHang).subscribe({
      next:(response: any) => {
        this.closeModal('closeModalSelectedCustomer');
        this.fetchListPendingInvoice();
      }
    })
    this.selectedCustomer = khachHang;
  }

  // Hàm điều hướng đến trang thêm khách hàng
  navigateToAddCustomer(): void {
    this.router.navigate(['/admin/customer/add']);
    this.closeModal('closeModalSelectedCustomer');
  }

  /** Hàm xác nhận thanh tóan */
  openConfirmModalPay() {
    this.isConfirmModalVisible = true;
  }

  /** Hàm hủy xác nhận thanh toán */
  cancelPay() {
    this.isConfirmModalVisible = false;
  }

  /** Hàm kiểm tra và thanh toán */
  confirmPayment() {
    const hd = this.listPendingInvoice[this.activeTab];
    if (!hd.hoaDonChiTiet || hd.hoaDonChiTiet.length === 0) {
      this.notiService.showError('Thêm sản phẩm vào hóa đơn');
      return;
    }

    /** Lấy giá trị của radio button */
    const paymentMethod = document.querySelector('input[name="flexRadioDefault"]:checked') as HTMLInputElement;

    /** Kiểm tra xem người dùng đã chọn phương thức thanh toán chưa */
    if (!paymentMethod) {
      this.notiService.showError('Vui lòng chọn phương thức thanh toán');
      return;
    }

    /**Gọi Api để xác nhận thanh toán */
    this.counterSalesService.callApiPayInvoice(hd.idHoaDon).subscribe({
      next: (response: any) => {
        if (response.status === 200) {
          // Cập nhật trạng thái hóa đơn sau khi thanh toán thành công
          hd.trangThai = StatusHD.PAID; // Sử dụng enum để cập nhật trạng thái
          this.notiService.showSuccess('Thanh toán thành công!');

          // Cập nhật lại thông tin trạng thái hiển thị
          hd.trangThaiHienThi = this.getInvoiceStatus(hd.trangThai); // Cập nhật trạng thái hiển thị
          this.fetchListPendingInvoice(); // Tải lại danh sách hóa đơn chờ
        } else {
          this.notiService.showError('Có lỗi xảy ra khi thanh toán: ' + response.message);
        }
      },
      error: (err: any) => {
        this.notiService.showError('Thanh toán không thành công: ' + err.message);
      }
    });

    console.log('Tiến hành thanh toán');
    this.isConfirmModalVisible = false;
  }

  /**Hàm gọi check hóa đơn có chưa sản phảm không */


  /**Khởi tạo dữ liệu */
  /** Hàm chạy khởi tạo các dữ liệu */
  ngOnInit(): void {
    /**Lấy id Hóa đơn từ đương dẫn */
    this.fetchListPendingInvoice();
    this.route.paramMap.subscribe(params => {
      const idHoaDon = Number(params.get('id'));
      if (idHoaDon) {
        this.fecthListDetailInvoiceById(idHoaDon);  // Lấy dữ liệu khách hàng
      }
    });
  }
}
