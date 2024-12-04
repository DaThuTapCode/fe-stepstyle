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
import { KichCoResponse } from '../../../../../models/kich-co/response/kich-co-response';
import { TrongLuongResponse } from '../../../../../models/trong-luong/response/trong-luong-response';
import { SanPhamChiTietSearchRequest } from '../../../../../models/san-pham-chi-tiet/request/san-pham-chi-tiet-search-request';
import { ThuongHieuResponse } from '../../../../../models/thuong-hieu/response/thuong-hieu-response';
import { DanhMucResponse } from '../../../../../models/danh-muc/response/danh-muc-response';
import { ThuongHieuService } from '../../../feature-product-management/services/thuong-hieu.service';
import { DanhMucService } from '../../../feature-product-management/services/danh-muc.service';
import { MauSacService } from '../../../feature-attribute-management/service/mau-sac.service';
import { TrongLuongService } from '../../../feature-attribute-management/service/trong-luong.service';
import { KichCoService } from '../../../feature-attribute-management/service/kich-co.service';
import { ChatLieuService } from '../../../feature-attribute-management/service/chat-lieu.service';
import { KhachHangResponse } from '../../../../../models/khach-hang/response/khach-hang-response';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { Pagination } from '../../../../../shared/type/pagination';
import { SttUtilsService } from '../../../../../shared/helper/stt-utils.service';
import { HoaDonResponse } from '../../../../../models/hoa-don/response/hoa-don-response';
import { HoaDonChiTietRequest } from '../../../../../models/hoa-don-chi-tiet/request/hoa-don-chi-tiet-request';
import { KhachHangRequest } from '../../../../../models/khach-hang/request/khach-hang-request';
import { DiaChiKhachHangRequest } from '../../../../../models/dia-chi-khach-hang/request/dia-chi-khach-hang-request';
import { DateUtilsService } from '../../../../../shared/helper/date-utils.service';
import { GiaoHangNhanhService } from '../../../../../shared/giaohangnhanh/giaohangnhanh.service';
import { KhachHangService } from '../../../feature-customer-management/service/khach-hang.service';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { CustomerAddComponent } from "../../../feature-customer-management/components/customer-add/customer-add.component";
import { PhieuGiamGiaResponse } from '../../../../../models/phieu-giam-gia/response/phieu-giam-gia-response';
import { StatusPGG } from '../../../../../shared/status-pgg';
import { CouponsService } from '../../../feature-invoice-management/services/coupons.service';
import { PhieuGiamGiaSearch } from '../../../../../models/phieu-giam-gia/request/phieu-giam-gia-search';
import { error } from 'jquery';
import { StatusPTTT } from '../../../../../shared/status-pttt';
import { StatusHD } from '../../../../../shared/status-hd';
import { StatusLoaiGiam } from '../../../../../shared/status-loaigiam';
import { LoadingComponent } from "../../../../../shared/loading/loading.component";


@Component({
  selector: 'app-counter-sales',
  standalone: true,
  imports: [CommonModule, FormsModule, NgMultiSelectDropDownModule, CustomerAddComponent, ReactiveFormsModule, LoadingComponent],
  templateUrl: './counter-sales.component.html',
  styleUrl: './counter-sales.component.scss'
})
export class CounterSalesComponent implements OnInit {

  // [x: string]: any;
  searchResults: any[] = []; // Biến lưu trữ kết quả tìm kiếm

  /** Biến hứng dữ liệu cho danh sách hóa đơn chờ thanh toán */
  listPendingInvoice: HoaDonResponse[] = [];

  /** Biến hứng dữ liệu cho danh sách sản phẩm chi tiết */
  listProductDetail: any[] = [];

  /** Biến hứng dữ liệu cho danh sách hóa đơn chi tiết lấy theo id hóa đơn */
  listDetailInvoiceByIdInvoice: any[] = [];

  //Biến hứng dữ liệu khách hàng
  khachHangs: KhachHangResponse[] = [];

  //Biến hứng dữ liệu phiếu giảm giá
  phieuGiamGias: PhieuGiamGiaResponse[] = [];

  /**Khai báo biến để lưu thanh toán */
  paymentMethod!: StatusPTTT;

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

  /**Dữ liệu PGG được chọn để xem */
  selectedCoupons: PhieuGiamGiaResponse = {
    idPhieuGiamGia: 0,
    maPhieuGiamGia: '',
    tenPhieuGiamGia: '',
    moTa: '',
    loaiGiam: StatusLoaiGiam.MONEY,
    giaTriGiamToiDa: 0,
    giaTriHoaDonToiThieu: 0,
    giaTriGiam: 0,
    trangThai: StatusPGG.ACTIVE,
    ngayBatDau: null,
    ngayKetThuc: null
  }

  // Các biến phân trang
  /**Phân trang */
  size: number = 5;
  page: number = 0;
  totalPages: number = 1;  /**Bắt sự kiện thay đổi trang */


  //Phân trang modal sản phẩm chi tiết
  paginatinonOfModalSPCT: Pagination = {
    size: 10,
    page: 0,
    totalElements: 0,
    totalPages: 0,
    first: false,
    last: false
  }

  //Phân trang modal chọn khách hàng
  paginatinonOfModalSelectCustomer: Pagination = {
    size: 10,
    page: 0,
    totalElements: 0,
    totalPages: 0,
    first: false,
    last: false
  }

  //Phân trang modal chọn khách hàng
  paginatinonOfModalSelectCoupons: Pagination = {
    size: 10,
    page: 0,
    totalElements: 0,
    totalPages: 0,
    first: false,
    last: false
  }


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

  /** Biến gửi dữ liệu tìm kiếm */
  phieuGiamGiaSearch: PhieuGiamGiaSearch = {
    maPhieuGiamGia: null,
    tenPhieuGiamGia: null,
    ngayBatDau: null,
    ngayKetThuc: null,
    loaiGiam: null,
    trangThai: null
  }

  /** Biến hứng số lượng sản phẩm thay đổi khi cập nhật số lượng trong hdct */
  soLuongSanPhamThayDoi!: number;

  /**Biến hứng số lượng sản phẩm muốn thêm vào hóa đơn chi tiết */
  soLuongMuonThem: number = 1;

  /** Biến hứng dữ liệu cho sản phẩm chi tiết đang được chọn */
  spctInToInvoiceDetailIsSelected: SanPhamChiTietResponse = new SanPhamChiTietResponse();

  /** Biến hứng dữ liệu cho mã giao dịch */
  maGiaoDich: string = '';

  changePage(pageNew: number) {
    this.page = pageNew;
    this.fetchDataListPhieuGiamGias();
    this.fetchDataListKhachHangs();
  }

  /** Biến hứng dữ liệu cho danh sách thuộc tính SPCT */
  spcts: SanPhamChiTietResponse[] = [];

  /**Các biến hứng dữ liệu cho các combobox*/
  thuongHieus: ThuongHieuResponse[] = []; // Thương hiệu
  danhMucs: DanhMucResponse[] = []; // Danh mục
  mauSacs: MauSacResponse[] = []; // Màu sắc
  trongLuongs: TrongLuongResponse[] = []; // Trọng lượng
  kichCos: KichCoResponse[] = []; // Kích cỡ
  chatLieus: ChatLieuResponse[] = []; // Chất liệu

  /**Mảng chứa kết quả tìm kiếm*/
  filteredSpcts: any[] = [];

  /**Biến lưu trữ Url của QR */
  qrCodeUrl: string | null = null;

  /** Biến hứng dữ liệu cho danh sách thuộc tính SPCT */
  sanPhamChiTietSearchs: SanPhamChiTietSearchRequest = {
    tenSanPham: null,
    maSpct: null,
    idMauSac: null,
    idKichCo: null,
    maSanPham: null,
    idThuongHieu: null,
    idChatLieu: null,
    idTrongLuong: null,
    idDanhMuc: null
  };

  activeTab = 0; // Tab mặc định

  /**Biến chứa phương thức thanh toán đang được chọn */
  phuongThucThanhToanDangChon: StatusPTTT = StatusPTTT.CASH;

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
    private kichCoService: KichCoService,
    private chatLieuService: ChatLieuService,
    private sttService: SttUtilsService,
    private fb: FormBuilder,
    private khachHangService: KhachHangService,
    private dateUtilsService: DateUtilsService,
    private notificationService: NotificationService,
    private GHNService: GiaoHangNhanhService,
    private couPonsService: CouponsService
  ) { }

  /** Hàm bắt dữ liệu trạng thái của hóa đơn */
  getInvoiceStatus(status: string): string {
    switch (status) {
      case StatusHD.PENDING:
        return 'Đang chờ';
      case StatusHD.PAID:
        return 'Đã thanh toán';
      case StatusHD.CANCELLED:
        return 'Đã hủy';
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
  fetchListSPCT() {
    this.counterSalesService
      .callApiGetListSPCT(this.sanPhamChiTietSearchs, this.paginatinonOfModalSPCT.page, this.paginatinonOfModalSPCT.size)
      .subscribe({
        next: (res: any) => {
          this.spcts = res.data.content;
          this.paginatinonOfModalSPCT.totalPages = res.data.totalPages;
          this.paginatinonOfModalSPCT.page = res.data.pageable.pageNumber;
          this.paginatinonOfModalSPCT.first = res.data.first;
          this.paginatinonOfModalSPCT.last = res.data.last;
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

  submitSearch() {
    // Lấy dữ liệu từ form
    this.paginatinonOfModalSPCT.page = 0;
    this.fetchListSPCT();
    this.closeModal('closeModalUpdate');
  }



  /** Hàm bắt sự kiện chọn sản phẩm chi tiết cho tạo hóa đơn chi tiết mới */
  handleSelectSpctInToInvoiceDetail(spct: SanPhamChiTietResponse ) {
    this.spctInToInvoiceDetailIsSelected = spct;
  }

  /**Hàm bắt sự kiện tạo hóa đơn chờ mới */
  handleCreatePendingInvoice() {
    this.counterSalesService.callApiCreateNewPendingInvoice().subscribe({
      next: (response: any) => {
        if (response.status === 200) {
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

  /**Phương thức hủy hóa đơn chờ theo ID */
  cancelPendingInvoice(id: number) {
    if (confirm(`Bạn có muốn hủy hóa đơn không?`)) {
      this.counterSalesService.callApiCancelInvoiceById(id).subscribe({
        next: (value: any) => {
          this.notiService.showSuccess(value.message); // Thông báo khi hủy thành công
          this.fetchListPendingInvoice(); // Tải lại danh sách hóa đơn chờ
        },
        error: (err: any) => {
          console.error(err);
          this.notiService.showError(err.error.message);
        },
      });
    }
  }

  /** reset form khi chọn lại tìm kiếm */
  resetForm() {
    this.sanPhamChiTietSearchs = {
      tenSanPham: null,
      maSpct: null,
      idMauSac: null,
      idKichCo: null,
      maSanPham: null,
      idThuongHieu: null,
      idChatLieu: null,
      idTrongLuong: null,
      idDanhMuc: null
    };
    this.fetchListSPCT();
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
    this.fetchDataListPhieuGiamGias();
    this.paginatinonOfModalSelectCustomer.page = 0;
    this.fetchDataListKhachHangs();
  }

  /**Hàm tải dữ liệu danh sách khách hàng */
  fetchDataListKhachHangs() {
    this.counterSalesService.
      callApigetCustomersByPage(this.khachHangSearchRequest, this.paginatinonOfModalSelectCustomer.page, this.paginatinonOfModalSelectCustomer.size).subscribe({
        next: (response: any) => {
          // Lọc ra những khách hàng có trạng thái khác 'INACTIVE'
          this.khachHangs = response.data.content.filter((khachHang: KhachHangResponse) => khachHang.trangThai !== 'INACTIVE');
          this.paginatinonOfModalSelectCustomer.totalPages = response.data.totalPages;
          this.paginatinonOfModalSelectCustomer.page = response.data.pageable.pageNumber;
          this.paginatinonOfModalSelectCustomer.first = response.data.first;
          this.paginatinonOfModalSelectCustomer.last = response.data.last;
          console.log('KhachHangs', this.khachHangs);
        },
        error: (err: any) => {
          console.error('Lỗi khi lấy danh sách khách hàng: ', err);
        }
      });
  }

  /** Hàm phân trang Phiếu Giảm Giá */
  fetchDataListPhieuGiamGias() {
    this.phieuGiamGiaSearch.trangThai = StatusPGG.ACTIVE;
    this.counterSalesService.searchPageCoupons(this.phieuGiamGiaSearch, this.paginatinonOfModalSelectCoupons.page, this.paginatinonOfModalSelectCoupons.size).subscribe({
      next: (response: any) => {
        this.phieuGiamGias = response.data.content;
        this.paginatinonOfModalSelectCoupons.totalPages = response.data.totalPages;
        this.paginatinonOfModalSelectCoupons.page = response.data.pageable.pageNumber;
        this.paginatinonOfModalSelectCoupons.first = response.data.first;
        this.paginatinonOfModalSelectCoupons.last = response.data.last;
        console.log('PGG', this.phieuGiamGias);
      },
      error: (err: any) => {
        console.error('Lỗi khi tìm kiếm Phiếu giảm giá', err);

      }
    })
  }
  /** Hàm reset tìm kiếm */
  resetSearch() {
    this.khachHangSearchRequest = {
      maKhachHang: '',
      tenKhachHang: '',
      soDienThoai: ''
    };

    this.phieuGiamGiaSearch = {
      maPhieuGiamGia: null,
      tenPhieuGiamGia: null,
      ngayBatDau: null,
      ngayKetThuc: null,
      loaiGiam: null,
      trangThai: null
    };

    this.searchCustomers();
  }

  // Hàm chọn khách hàng
  selectCustomer(khachHang: any) {
    if (!confirm(`Bạn có muốn chọn khách hàng ${khachHang.tenKhachHang} cho hóa đơn này không`)) {
      return;
    }
    let idHoaDon = this.listPendingInvoice[this.activeTab].idHoaDon;
    this.counterSalesService.callApiUpdateCustomerToInvoiceCounterSales(idHoaDon, khachHang.idKhachHang).subscribe({
      next: (response: any) => {
        this.notificationService.showSuccess(response.message);
        this.closeModal('closeModalSelectedCustomer');
        this.fetchListPendingInvoice();
      }
    })
    this.selectedCustomer = khachHang;
  }

  // Hàm chọn phiếu giảm giá
  selectCoupons(phieuGiamGia: any) {
    if (!confirm('Bạn có muốn dùng phiếu giảm giá: ' + phieuGiamGia.tenPhieuGiamGia)) {
      return;
    }
    let idHoaDon = this.listPendingInvoice[this.activeTab].idHoaDon;
    this.counterSalesService.callApiCouponsToInvoiceCounterSales(idHoaDon, phieuGiamGia.idPhieuGiamGia).subscribe({
      next: (response: any) => {
        this.closeModal('closeModalSelectedCoupons');
        this.fetchListPendingInvoice();
      },
      error: (err: any) => {
        this.notiService.showError(err.error.message);
      }
    })
    this.selectedCoupons = phieuGiamGia;
    console.log('Select', this.selectedCoupons);

  }

  /** Bắt sự kiện tải ảnh qr */
  handleVnpayBankTransfer() {
    const hd = this.listPendingInvoice[this.activeTab];
    this.paymentMethod = StatusPTTT.VNPAY;

    this.counterSalesService.callApiVnpayBankTransfer(hd.idHoaDon).subscribe({
      next: (response: Blob) => {
        // Chuyển Blob thành URL và gán vào `qrCodeUrl`
        console.log
        const objectURL = URL.createObjectURL(response);
        this.qrCodeUrl = objectURL;
      },
      error: (err: any) => {
        this.notiService.showError(err.message);
      }
    });
  }


  /** Hàm xác nhận thanh toán */
  confirmPayment() {
    const hd = this.listPendingInvoice[this.activeTab];
    if (this.phuongThucThanhToanDangChon === StatusPTTT.VNPAY && this.maGiaoDich.trim().length < 1) {
      this.notiService.showError('Vui lòng nhập mã giao dịch!')
      return;
    }

    // Thực hiện thanh toán
    this.counterSalesService.callApiPayInvoice(hd.idHoaDon, this.phuongThucThanhToanDangChon, this.maGiaoDich).subscribe({
      next: (response: any) => {
        this.getInvoiceStatus(hd.trangThai);
        this.closeModal('closeModalPayment');
        this.fetchListPendingInvoice();
        this.notiService.showSuccess(response.message);
      },
      error: (err: any) => {
        this.notiService.showError(err.error.message);
      }
    });
  }


  /**Hàm bắt sự kiện thêm hóa đơn chi tiết mới */
  handleSelectProductDetailInToDetailInvoice() {
    //Lấy id hóa đơn từ hóa đơn đang chọn
    let idHoaDon = this.listPendingInvoice[this.activeTab].idHoaDon;
    //Thiết lập các tham số ban đầu cho hoaDonChiTietRequest
    const hoaDonChiTietRequest: HoaDonChiTietRequest = {
      idHoaDonChiTiet: null,
      idHoaDon: idHoaDon,
      idSpct: this.spctInToInvoiceDetailIsSelected.idSpct,
      maHoaDonChiTiet: '',
      soLuong: this.soLuongMuonThem,
      donGia: 0,
      tongTien: 0,
      trangThai: 'ACTIVE'
    }

    //Gọi api thêm hóa đơn chi tiết mới
    this.counterSalesService.callApiCreateNewDetailInvoice(hoaDonChiTietRequest).subscribe({
      next: (response: any) => {
        this.notiService.showSuccess(response.message);
        this.fetchListPendingInvoice();
        this.fetchListSPCT();
        this.closeModal('closeSoLuongSpctMuonThemModal');
        this.soLuongMuonThem = 1;
      },
      error: (err: any) => {
        this.notiService.showError(err.error.message);
      }
    });

  }
  /** Hàm bắt sự kiện gỡ sản phẩm khỏi hóa đơn chi tiết */
  handleDeleteProductDetailFromDetailInvoice(idHdct: number) {

    if (!confirm('Bạn có muốn gỡ sản phẩm ra khỏi hóa đơn này?')) {
      return;
    }

    this.counterSalesService.callApiDeleteDetailInvoice(idHdct).subscribe({
      next: (response: any) => {
        this.fetchListPendingInvoice();
        this.fetchListSPCT();
        this.notiService.showSuccess(response.message);
      },
      error: (err: any) => {
        this.notiService.showError(err.error.message);
      }
    })
  }

  /** Hàm bắt sự kiện hủy phiếu giảm giá */
  handleCancelCoupons() {
    const hd = this.listPendingInvoice[this.activeTab];
    this.counterSalesService.callApiCancelCoupons(hd.idHoaDon).subscribe({
      next: (response: any) => {
        this.fetchListPendingInvoice();
        this.fetchDataListPhieuGiamGias();
        this.closeModal('closeModalCancelCoupon');
        this.notiService.showSuccess(response.message);
      },
      error: (err: any) => {
        this.notiService.showError(err.error.message);
      }
    })
  }

  /**Hàm bắt sự kiện đổi trang trong modal spct */
  handlePageSPCTChange(type: string) {
    if (type === 'pre') {
      this.paginatinonOfModalSPCT.page -= 1;
    } else if (type === 'next') {
      this.paginatinonOfModalSPCT.page += 1;
    }
    this.fetchListSPCT();
  }
  /**Tính stt */
  tinhSTT(page: number, size: number, current: number): number {
    return this.sttService.tinhSTT(page, size, current);
  }

  /**Hàm bắt sự kiện đổi trang trong modal selectcustomer */
  handlePageSelectCustomerChange(type: string) {
    if (type === 'pre') {
      this.paginatinonOfModalSPCT.page -= 1;
    } else if (type === 'next') {
      this.paginatinonOfModalSPCT.page += 1;
    }
    this.fetchDataListKhachHangs();
  }

  /**Hàm bắt sự kiện đổi trang trong modal selectcoupons */
  handlePageSelectCouponsChange(type: string) {
    if (type === 'pre') {
      this.paginatinonOfModalSelectCoupons.page -= 1;
    } else if (type === 'next') {
      this.paginatinonOfModalSelectCoupons.page += 1;
    }
    this.fetchDataListPhieuGiamGias();
  }

  receiveDataFromChild(data: string) {
    console.log('Dữ liệu nhận từ component con:', data);
    // Xử lý dữ liệu nhận từ component con ở đây
    this.closeModal('closeModalAddCustomer');
  }


  idHDCTIsUPdateQuantity!: number;
  /** Hàm bắt sự kiện gán idHDCT để lấy id HDCT cần sửa số lượng */
  handleHDCTDangCanSua(idHDCTIsUPdateQuantity: number, soLuongBanDau: number) {
    this.idHDCTIsUPdateQuantity = idHDCTIsUPdateQuantity;
    this.soLuongSanPhamThayDoi = soLuongBanDau;
  }

  /** Hàm bắt sự kiện cập nhật số lượng sản phẩm trong hđct */
  handleSuaSoLuongSanPhamTrongHDCT() {
    if (this.idHDCTIsUPdateQuantity === undefined || this.idHDCTIsUPdateQuantity === null) {
      return;
    }
    if (this.soLuongSanPhamThayDoi === undefined || this.soLuongSanPhamThayDoi === null) {
      return;
    }
    if (this.soLuongSanPhamThayDoi <= 0) {
      return;
    }

    this.counterSalesService.callApiSuaSoLuongSanPhamTrongHDCT(this.idHDCTIsUPdateQuantity, this.soLuongSanPhamThayDoi).subscribe({
      next: (response: any) => {
        this.fetchListPendingInvoice();
        this.notiService.showSuccess(response.message);
        this.closeModal('closeUpdateQuantityModal');
      },
      error: (err: any) => {
        this.notiService.showError(err.error.message);
      }
    })
  }

  /**Bắt sự kiện nút thanh toán */
  handleThanhToan() {
    if (this.phuongThucThanhToanDangChon === 'CASH') {

    } else {
      this.qrCodeUrl = null;
      this.handleVnpayBankTransfer();
    }
  }

  /**
* Định dạng giá trị giảm giá dựa vào loại giảm giá
*/
  formatGiaTriGiam(pgg: any): string {
    // Kiểm tra nếu đối tượng phieuGiamGia hoặc giá trị giảm giaTriGiam bị null hoặc undefined
    if (!pgg || !pgg.giaTriGiam) {
      return "N/A";
    }

    if (pgg.loaiGiam === 'MONEY') {
      return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(pgg.giaTriGiam);
    } else if (pgg.loaiGiam === 'PERCENT') {
      return pgg.giaTriGiam + '%';
    }


    return pgg.giaTriGiam;
  }

  /**Khởi tạo dữ liệu */
  ngOnInit(): void {
    this.fetchListPendingInvoice();
    this.fetchThuongHieus();
    this.fetchDanhMuc();
    this.fetchMauSacs();
    this.fetchTrongLuongs();
    this.fetchKichCos();
    this.fetchChatLieus();

  }
}
