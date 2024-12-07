import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, CanDeactivate, Router } from '@angular/router';
import { NotificationService } from '../../../../shared/notification.service';
import { CartService } from '../../service/cart.service';
import { SanPhamChiTietResponse } from '../../../../models/san-pham-chi-tiet/response/san-pham-chi-tiet-response';
import { FormsModule } from '@angular/forms';
import { SessionloginService } from '../../../../core/auth/sessionlogin.service';
import { HoaDonChiTietBanOnlineRequest } from '../../../../models/hoa-don-chi-tiet/request/hoa-don-chi-tiet-ban-online-request';
import { KhachHangService } from '../../../admin/feature-customer-management/service/khach-hang.service';
import { KhachHangResponse } from '../../../../models/khach-hang/response/khach-hang-response';
import { HoaDonBanOnlineRequest } from '../../../../models/hoa-don/request/hoa-don-ban-online-request';
import { SanPhamChiTietRequest } from '../../../../models/san-pham-chi-tiet/request/san-pham-chi-tiet-request';
import { PhieuGiamGiaResponse } from '../../../../models/phieu-giam-gia/response/phieu-giam-gia-response';
import { Observable } from 'rxjs';
import { PaymentService } from '../../service/payment.service';
import { GiaoHangNhanhService } from '../../../../shared/giaohangnhanh/giaohangnhanh.service';
import { DiaChiKhachHangResponse } from '../../../../models/dia-chi-khach-hang/response/dia-chi-khach-hang-response';
import { HamDungChung } from '../../../../shared/helper/ham-dung-chung';
import { DiaChiKhachHangRequest } from '../../../../models/dia-chi-khach-hang/request/dia-chi-khach-hang-request';
import { StatusLoaiGiam } from '../../../../shared/status-loaigiam';
import { PhieuGiamGiaRequest } from '../../../../models/phieu-giam-gia/request/phieu-giam-gia-request';
import { ThanhToanRequest } from '../../../../models/thanh-toan/request/thanh-toan-request';
import { StatusPTTT } from '../../../../shared/status-pttt';
import { LoadingComponent } from "../../../../shared/loading/loading.component";
import { DetailProductService } from '../../service/detail-product.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingComponent],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  handleBoChonPhieuGiamGia() {
    if(!confirm('Bạn có muốn bỏ chọn phiếu giảm giá này?')) {
      return;
    }
    this.hoaDonRequest.phieuGiamGia = new PhieuGiamGiaRequest();
    console.log(this.hoaDonRequest.phieuGiamGia)
    this.calculateTotalAmount();
    this.notiService.showSuccess('Phiếu giảm giá đã được bỏ chọn!')
  }


  // @HostListener('window:beforeunload', ['$event'])
  // beforeUnloadHandler(event: BeforeUnloadEvent) {
  //   // Hiển thị thông báo hỏi người dùng
  //   event.preventDefault();
  //   event.returnValue = ''; // Một chuỗi trống là cần thiết để trình duyệt hiển thị cảnh báo
  // }

  /**Chế độ component */
  componentMode: 'cart' | 'checkout' = 'cart';

  /** Biến hứng danh sách phiếu giảm giá */
  phieuGiamGias: PhieuGiamGiaResponse[] = [];

  /** Biến hứng dữ liệu SPCT by list id */
  SPCTByListId: (SanPhamChiTietResponse & { selected: boolean, soLuongMua: number })[] = [];

  /**Biến hứng dữ liệu tìm khách hàng theo id*/
  khachHangById: KhachHangResponse = new KhachHangResponse();

  /** Biến hứng địa chỉ khách hàng đnag được chọn */
  diaChiKhachHangIsSelected: DiaChiKhachHangResponse = new DiaChiKhachHangResponse();

  /**BIến fake hóa đơn */
  hoaDonRequest: HoaDonBanOnlineRequest = new HoaDonBanOnlineRequest();

  loading: boolean = false;

  // Biến dữ liệu cho các combobox
  tinhThanhs: any[] = [];
  quanHuyens: any[] = [];
  phuongXas: any[] = [];

  selectedTinhThanh: any = null;

  selectedQuanHuyen: any = null;

  selectedPhuongXa: any = null;

  diaChiKhachHang: DiaChiKhachHangRequest = {
    idDiaChiKhachHang: 0,
    maDiaChiKhachHang: '',
    idTinh: '',
    tenTinh: '',
    idQuanHuyen: '',
    tenQuanHuyen: '',
    maPhuongXa: '',
    tenPhuongXa: '',
    diaChiChiTiet: '',
    trangThai: 'ACTIVE'
  };


  bodyParamsOfQuanHuyen: any = {};

  bodyParamsOfPhuongXa: any = {};

  constructor(
    private route: ActivatedRoute,
    private notiService: NotificationService,
    private router: Router,
    private cartService: CartService,
    private khachHangService: KhachHangService,
    private sessionLogin: SessionloginService,
    private paymentService: PaymentService,
    private ghnService: GiaoHangNhanhService,
    public hamDungChung: HamDungChung,
    private detailService: DetailProductService,
  ) { }

  /** Hàm hiển thị dữ liệu sản phẩm chi tiết */
  fetchDataSPCTByListId() {
    this.cartService.callApiGetSPCTByListId().subscribe({
      next: (response: any) => {
        this.SPCTByListId = response.data.map((spct: SanPhamChiTietResponse) => ({
          ...spct,
          selected: false,
          soLuongMua: this.cartService.getSoLuongMuaByIdSPCT(spct),
        }));
      },
      error: (err: any) => {
        this.notiService.showError(err.error.message);
      }
    });
  }


  /**Tài dữ liệu khách hàng theo id */
  fetchKhachHangById(idKhachHang: number): void {
    this.khachHangService.getCustomerById(idKhachHang).subscribe({
      next: (response: any) => {
        this.khachHangById = response.data;
      },
      error: (err: any) => {
        this.notiService.showError('Bạn chưa đăng nhập với tài khoản khách hàng!')
      }
    })
  }

  /**Tải dữ liệu cho danh sách phiếu giảm giá */
  fetchPhieuGiamGiaHoatDong(): void {
    this.paymentService.callApiLayDanhSachPGGDangHoatDong().subscribe({
      next: (response: any) => {
        this.phieuGiamGias = response.data;
      },
      error: (err: any) => {
        console.log('Lỗi trong tải dữ liệu phiếu giảm giá: ', err);
        this.notiService.showError(err.error.message);
      }
    })
  }

  /** Hàm tải dữ liệu cho hóa đơn fake */
  setHoaDonBanOnlineRequest(): void {

  };

  /** Hàm xóa sản phẩm */
  removeItem(spct: SanPhamChiTietResponse) {
    if (!confirm('Bạn có chắc muốn xóa ' + spct.sanPham.tenSanPham + 'ra khỏi giỏ hàng?')) {
      return;
    }
    this.cartService.removeSP(spct);

    // Xóa sản phẩm chi tiết khỏi danh sách hóa đơn chi tiết khi bị bỏ chọn
    this.hoaDonRequest.hoaDonChiTiets = this.hoaDonRequest.hoaDonChiTiets.filter(
      hdct => hdct.sanPhamChiTiet.idSpct !== spct.idSpct
    );

    this.fetchDataSPCTByListId();
    this.calculateTotalAmount();
  }

  /** Hàm bắt sự kiện thanh toán */
  handleCartToPayment() {
    this.router.navigate(['/okconde/payment']);
  }

  /** BIến hứng checkall */
  isSelectedAll: boolean = false;
  handleChonTatCaSanPhamTrongGioHang(event: Event): void {
    const inputElement = event.target as HTMLInputElement; // Ép kiểu target thành HTMLInputElement
    const isChecked = inputElement.checked; // Lấy trạng thái của checkbox
    this.isSelectedAll = isChecked;
    this.hoaDonRequest.hoaDonChiTiets = [];
    this.SPCTByListId.forEach(spct => {
      spct.selected = this.isSelectedAll;
      this.handleChangeSPCTIsSelected(event, spct.idSpct);
    });
    this.calculateTotalAmount();
  }

  /**Hàm bắt sự kiện chọn sản phẩm cần thanh toán */
  handleChangeSPCTIsSelected(event: Event, idSpct: number) {
    const inputElement = event.target as HTMLInputElement;
    const isChecked = inputElement.checked;
    // Cập nhật trạng thái `selected` của SPCT tương ứng
    this.SPCTByListId.forEach(spct => {
      if (spct.idSpct === idSpct) {
        spct.selected = isChecked;
        if (spct.selected === true) {
          // Thêm vào hóa đơn chi tiết khi được chọn
          const hoaDonChiTiet = new HoaDonChiTietBanOnlineRequest();
          hoaDonChiTiet.sanPhamChiTiet = new SanPhamChiTietResponse(spct);
          hoaDonChiTiet.soLuong = spct.soLuongMua;
          hoaDonChiTiet.donGia = spct.gia;
          this.hoaDonRequest.hoaDonChiTiets.push(hoaDonChiTiet);
        } else {
          // Xóa sản phẩm chi tiết khỏi danh sách hóa đơn chi tiết khi bị bỏ chọn
          this.hoaDonRequest.hoaDonChiTiets = this.hoaDonRequest.hoaDonChiTiets.filter(
            hdct => hdct.sanPhamChiTiet.idSpct !== spct.idSpct
          );
        }
      }
      this.calculateTotalAmount();
    });
    // Kiểm tra nếu tất cả các SPCT đều được chọn
    const countSelected = this.SPCTByListId.filter(spct => spct.selected).length;
    this.isSelectedAll = (countSelected === this.SPCTByListId.length);
  }

  /**Giảm số lượng sản phẩm trong giỏ hàng */
  decreaseQuantity(spct: any): void {
    if (spct.soLuongMua > 1) {
      spct.soLuongMua--;
    }
    this.updateQuantity(spct);
  }

  /** Tăng số lượng sản phẩm trong giỏ hnàg */
  increaseQuantity(spct: any): void {

    this.detailService.callApiGetDetailProductById(spct.idSpct).subscribe({
      next: (response: any) => {
        if (spct.soLuongMua < response.data.soLuong) {
          spct.soLuongMua++;
        }
        this.updateQuantity(spct);
      },
      error: (error: any) => {
        console.error('Lỗi khi lấy sản phẩm với id', error);
        this.notiService.showError(error.error.message);
      },
    });

  }

  /** Check validate số lượng sản phẩm trong giỏ hàng */
  validateQuantity(spct: any): void {
    if (spct.soLuongMua < 1) {
      spct.soLuongMua = 1;
    } else if (spct.soLuongMua > spct.soLuong) {
      spct.soLuongMua = spct.soLuongTon;
    }
    this.updateQuantity(spct);
  }

  /** CHỉnh sửa số lượng cần mua cho spct giỏ hàng */
  updateQuantity(spct: any): void {
    this.cartService.updateSoLuongSPCTTrongGioHang(spct.idSpct, spct.soLuongMua);
    this.updateQuantityForHDCT(spct);
    this.calculateTotalAmount();
  }

  /**Chỉnh sửa lại số lượng mua cho hóa đơn chi tiết */
  updateQuantityForHDCT(spct: any): void {
    this.hoaDonRequest.hoaDonChiTiets.forEach(hdct => {
      if (hdct.sanPhamChiTiet.idSpct === spct.idSpct) {
        hdct.soLuong = spct.soLuongMua;
      }
    })
  }

  /** Thay đổi chế độ component */
  changeComponentMode() {
    if (this.hoaDonRequest.hoaDonChiTiets.length > 0) {
      this.paymentService.callApiCheckSoLuongTruocKhiChuyenTrang(this.hoaDonRequest).subscribe({
        next: (response: any) => {
          this.componentMode = 'checkout';
          this.fetchPhieuGiamGiaHoatDong();
        },
        error: (err: any) => {
          this.notiService.showError(err.error.message);
        }
      })

    } else {
      this.notiService.showWarning('Chọn sản phẩm cần mua')
    }
  }

  /** Băt sự kiện quay lại giỏ hàng */
  handleBackToCart() {
    this.componentMode = 'cart';
  }


  /**Hàm bắt sự kiện chọn địa chỉ giao hàng */
  handleSelectDiaChiKhachHang(diaChiKhachHang: DiaChiKhachHangResponse) {
    this.diaChiKhachHangIsSelected = diaChiKhachHang;
    this.hamDungChung.closeModal('closeModalChonDiaChiKhachHang');
    this.notiService.showSuccess('Chọn địa chỉ giao hàng thành công');
    this.getListServiceFee();

  }



  /**Tính tổng tiền của hóa đơn */
  calculateTotalAmount() {
    this.hoaDonRequest.tongTien = this.hoaDonRequest.hoaDonChiTiets
      .reduce((total, hdct) => total + hdct.soLuong * hdct.sanPhamChiTiet.gia, 0); // Tính tổng tiền
    this.hoaDonRequest.tongTienSauGiam = this.hoaDonRequest.tongTien;
  }

  /**Tính tổng tiền của hóa đơn sau giảm giá  */
  tinhTongTienCuaHoaDonSauGiamGia() {
    if (this.hoaDonRequest.phieuGiamGia.loaiGiam === StatusLoaiGiam.MONEY) {

      if (this.hoaDonRequest.phieuGiamGia.giaTriGiam >= this.hoaDonRequest.tongTien) {
        this.hoaDonRequest.tongTienSauGiam = 0;
        return;
      }

      this.hoaDonRequest.tongTienSauGiam = this.hoaDonRequest.tongTien - this.hoaDonRequest.phieuGiamGia.giaTriGiam;

    } else if (this.hoaDonRequest.phieuGiamGia.loaiGiam === StatusLoaiGiam.PERCENT) {
      const soTienGiam = (this.hoaDonRequest.tongTien / 100) * this.hoaDonRequest.phieuGiamGia.giaTriGiam;

      if (soTienGiam >= this.hoaDonRequest.phieuGiamGia.giaTriGiamToiDa) {
        this.hoaDonRequest.tongTienSauGiam = this.hoaDonRequest.tongTien - this.hoaDonRequest.phieuGiamGia.giaTriGiamToiDa;
        return;
      }
      this.hoaDonRequest.tongTienSauGiam = this.hoaDonRequest.tongTien - soTienGiam;
    }
  }


  /** Bắt sự kiện thanh toán */
  handleCreateInvoice() {

    if (!confirm('Bạn có chắc chăn muốn tạo đơn hàng này?')) {
      return;
    }
    this.hoaDonRequest.diaChiGiaoHang = `${this.diaChiKhachHangIsSelected.diaChiChiTiet}. ${this.diaChiKhachHangIsSelected.tenPhuongXa}, ${this.diaChiKhachHangIsSelected.tenQuanHuyen}, ${this.diaChiKhachHangIsSelected.tenTinh}`
    this.hoaDonRequest.soDienThoaiKhachHang = this.khachHangById.soDienThoai;
    this.hoaDonRequest.thanhToan = StatusPTTT.COD;
    this.hoaDonRequest.khachHang = this.khachHangById;
    this.hoaDonRequest.tenKhachHang = this.khachHangById.tenKhachHang;
    if (this.diaChiKhachHangIsSelected.idDiaChiKhachHang <= 0) {
      this.notiService.showError('Vui lòng chọn địa chỉ giao hàng trước khi tạo đơn hàng');
      return;
    }
    this.loading = true;
    this.paymentService.callApiTaoDonHangOnline(this.hoaDonRequest).subscribe({
      next: (response: any) => {
        this.hoaDonRequest.hoaDonChiTiets.forEach(hdct => {
          this.cartService.removeSP(hdct.sanPhamChiTiet);
        })
        this.notiService.showSuccess(response.message);
        this.router.navigate(['/okconde/history'])
      },
      error: (err: any) => {
        this.loading = false;
        console.log('Có lỗi trong quá trình tạo đơn hàng: ', err);
        this.notiService.showError(err.error.message);
      }
    })
  }

  /** Bắt sự kiện chọn phiếu giảm giá */
  handleChonPhieuGiamGia(pgg: PhieuGiamGiaResponse) {
    if (pgg.giaTriHoaDonToiThieu > this.hoaDonRequest.tongTien) {
      this.notiService.showError('Giá trị hóa đơn không đủ điều kiện sử dụng phiếu giảm giá');
      return;
    }
    this.hoaDonRequest.phieuGiamGia = pgg;
    this.tinhTongTienCuaHoaDonSauGiamGia();
    this.notiService.showSuccess('Chọn phiếu giảm giá thành công!');
    this.hamDungChung.closeModal('closeModalChonPhieuGiamGia');
  }

  fetchDataTinhThanhs() {
    this.ghnService.getTinhThanhs().subscribe({
      next: (response: any) => {
        this.tinhThanhs = response.data;
      }
    });
  }
  /** Hàm kiểm tra tính hợp lệ của địa chỉ */
  validateAddress(): boolean {

    // Kiểm tra các trường không được có ký tự đặc biệt và không được khoảng trống
    const specialCharPattern = /^[\p{L}\p{N}\s]+$/u;

    if (!this.selectedTinhThanh) {
      this.notiService.showError('Vui lòng chọn tỉnh thành.');
      return false;
    }

    if (!this.selectedQuanHuyen) {
      this.notiService.showError('Vui lòng chọn huyện.');
      return false;
    }

    if (!this.selectedPhuongXa) {
      this.notiService.showError('Vui lòng chọn xã.');
      return false;
    }

    // Kiểm tra địa chỉ chi tiết
    if (this.diaChiKhachHang.diaChiChiTiet.trim().length <= 0) {
      this.notiService.showError('Địa chỉ chi tiết không được để trống.');
      return false;
    }

    if (this.diaChiKhachHang.diaChiChiTiet.trim().length < 6 || this.diaChiKhachHang.diaChiChiTiet.trim().length > 255) {
      this.notiService.showError('Địa chỉ chi tiết phải lớn hơn 6 và nhỏ hơn 255 ký tự.');
      return false;
    }

    if (!specialCharPattern.test(this.diaChiKhachHang.diaChiChiTiet)) {
      this.notiService.showError('Địa chỉ chi tiết không được chứa ký tự đặc biệt.');
      return false;
    }

    return true;
  }
  /** Lấy danh sách huyện khi người dùng chọn tỉnh thành */
  onTinhThanhSelect() {
    this.bodyParamsOfQuanHuyen.province_id = parseInt(this.selectedTinhThanh.ProvinceID);
    this.ghnService.getQuanHuyen(this.bodyParamsOfQuanHuyen).subscribe({
      next: (response: any) => {
        this.quanHuyens = response.data;
        this.phuongXas = []; // Xóa xã khi thay đổi huyện
        this.selectedPhuongXa = null;
        this.selectedQuanHuyen = null;
      }
    });
  }

  /** Lấy danh sách xã khi người dùng chọn huyện */
  onQuanHuyenSelect() {
    this.bodyParamsOfPhuongXa.district_id = this.selectedQuanHuyen.DistrictID;
    this.ghnService.getPhuongXa(this.bodyParamsOfPhuongXa).subscribe({
      next: (response: any) => {
        this.phuongXas = response.data;
        this.selectedPhuongXa = null;
      }
    });
  }


  resetForm() {
    // Đặt lại thông tin địa chỉ khách hàng
    this.selectedTinhThanh = null;
    this.selectedQuanHuyen = null;
    this.selectedPhuongXa = null;
    this.diaChiKhachHang.diaChiChiTiet = '';
  }


  /**Thêm địa chỉ mới cho khách hàng */
  addNewAddress() {
    if (this.validateAddress()) {
      this.diaChiKhachHang.tenTinh = this.selectedTinhThanh.ProvinceName;
      this.diaChiKhachHang.tenQuanHuyen = this.selectedQuanHuyen.DistrictName;
      this.diaChiKhachHang.tenPhuongXa = this.selectedPhuongXa.WardName;
      this.diaChiKhachHang.idTinh = this.selectedTinhThanh.ProvinceID;
      this.diaChiKhachHang.idQuanHuyen = this.selectedQuanHuyen.DistrictID;
      this.diaChiKhachHang.maPhuongXa = this.selectedPhuongXa.WardCode;
      this.khachHangService.addDCKHByIdKH(this.khachHangById.idKhachHang, this.diaChiKhachHang).subscribe({
        next: (response: any) => {
          this.notiService.showSuccess(response.message);
          this.resetForm();
          this.hamDungChung.closeModal('closeModalAddDCKH');
          this.fetchKhachHangById(this.khachHangById.idKhachHang);
        },
        error: (err: any) => {
          console.error('Lỗi khi thêm địa chỉ khách hàng: ', err);
          this.notiService.showError(err.error.message);
        }
      });
    }
  }


































































  listServiceFee: any[] = [];
  /**Lấy danh sách dịch vụ */
  getListServiceFee() {
    this.ghnService.getGoiDichVu(this.diaChiKhachHangIsSelected.idQuanHuyen).subscribe({
      next: (response: any) => {
        this.listServiceFee = response.data;
        const tongKhoiLuong = this.hoaDonRequest.hoaDonChiTiets.reduce((tong, hdct) => {
          const trongLuong = Number(hdct.sanPhamChiTiet.sanPham.trongLuong?.giaTri) * hdct.soLuong || 0;
          return tong += trongLuong;
        }, 0);
        this.ghnService.getPhiShip(
          this.listServiceFee[0].service_type_id,
          Number(this.diaChiKhachHangIsSelected.idQuanHuyen),
          this.diaChiKhachHangIsSelected.maPhuongXa,
          this.hoaDonRequest.tongTien,
          tongKhoiLuong
        ).subscribe({
          next: (repsonse: any) => {
            this.hoaDonRequest.phiVanChuyen = repsonse.data.total;
          },
          error: (err: any) => {
            this.notiService.showError(err.error.message);
          }
        })
      },
      error: (err: any) => {
        this.notiService.showError(err.error.message);
        console.error('Lỗi khi lấy gói dịch vụ: ', err);

      }
    })
  }


  /**Khỏi tạo dữ liệu */
  ngOnInit(): void {
    this.fetchKhachHangById(this.sessionLogin.getUser().id);
    this.fetchDataSPCTByListId();
    this.fetchDataTinhThanhs();
  }
}

