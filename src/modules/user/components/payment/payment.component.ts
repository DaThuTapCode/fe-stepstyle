import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { DiaChiKhachHangRequest } from '../../../../models/dia-chi-khach-hang/request/dia-chi-khach-hang-request';
import { GiaoHangNhanhService } from '../../../../shared/giaohangnhanh/giaohangnhanh.service';
import { NotificationService } from '../../../../shared/notification.service';
import { SanPhamChiTietResponse } from '../../../../models/san-pham-chi-tiet/response/san-pham-chi-tiet-response';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from '../../service/payment.service';
import { HoaDonBanOnlineRequest } from '../../../../models/hoa-don/request/hoa-don-ban-online-request';
import { HoaDonChiTietBanOnlineRequest } from '../../../../models/hoa-don-chi-tiet/request/hoa-don-chi-tiet-ban-online-request';
import { SanPhamChiTietRequest } from '../../../../models/san-pham-chi-tiet/request/san-pham-chi-tiet-request';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, FormsModule, NgMultiSelectDropDownModule, MatSelectModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

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

  hoaDonBanOnlineRequest: HoaDonBanOnlineRequest = new HoaDonBanOnlineRequest;

  // Biến dữ liệu cho các combobox
  tinhThanh: any[] = [];
  quanHuyen: any[] = [];
  phuongXa: any[] = [];

  bodyParamsOfQuanHuyen: any = {};
  bodyParamsOfPhuongXa: any = {};

  selectedTinhThanh: any = {};
  selectedQuanHuyen: any = {};
  selectedPhuongXa: any = {};

  /** Cài đặt các thuộc tính cho combobox tỉnh thành */
  dropdownSettingForTinhThanhs = {
    singleSelection: true,
    idField: 'ProvinceID',
    textField: 'ProvinceName',
    selectAllText: 'Chọn tất cả',
    unSelectAllText: 'Bỏ chọn tất cả',
    itemsShowLimit: 300,
    allowSearchFilter: true,
    closeDropDownOnSelection: true // Đóng khi chọn xong
  };

  /** Cài đặt các thuộc tính cho combobox huyện */
  dropdownSettingForHuyens = {
    singleSelection: true,
    idField: 'DistrictID',
    textField: 'DistrictName',
    selectAllText: 'Chọn tất cả',
    unSelectAllText: 'Bỏ chọn tất cả',
    itemsShowLimit: 300,
    allowSearchFilter: true,
    closeDropDownOnSelection: true // Đóng khi chọn xong
  };

  /** Cài đặt các thuộc tính cho combobox xã */
  dropdownSettingForXas = {
    singleSelection: true,
    idField: 'WardCode',
    textField: 'WardName',
    selectAllText: 'Chọn tất cả',
    unSelectAllText: 'Bỏ chọn tất cả',
    itemsShowLimit: 300,
    allowSearchFilter: true,
    closeDropDownOnSelection: true // Đóng khi chọn xong
  };

  /**Hứng sản phẩm được lấy theo id */
  sanPhamChiTietById: SanPhamChiTietResponse = new SanPhamChiTietResponse;

  /**id sản phẩm chi tiết*/
  idSanPhamChiTiet!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private GHNService: GiaoHangNhanhService,
    private notificationService: NotificationService,
    private paymentService: PaymentService
  ) { }

  /** Lấy danh sách tỉnh thành */
  fetchDataTinhThanhs() {
    this.GHNService.getTinhThanhs().subscribe({
      next: (response: any) => {
        this.tinhThanh = response.data;
      }
    });
  }

  /** Lấy danh sách huyện khi người dùng chọn tỉnh thành */
  onTinhThanhSelect(event: any) {
    this.bodyParamsOfQuanHuyen.province_id = this.selectedTinhThanh[0].ProvinceID;
    this.GHNService.getQuanHuyen(this.bodyParamsOfQuanHuyen).subscribe({
      next: (response: any) => {
        this.quanHuyen = response.data;
        this.phuongXa = []; // Xóa xã khi thay đổi huyện
        this.selectedQuanHuyen = null;
      }
    });
  }

  /** Lấy danh sách xã khi người dùng chọn huyện */
  onQuanHuyenSelect(event: any) {
    this.bodyParamsOfPhuongXa.district_id = this.selectedQuanHuyen[0].DistrictID;
    this.GHNService.getPhuongXa(this.bodyParamsOfPhuongXa).subscribe({
      next: (response: any) => {
        this.phuongXa = response.data;
        this.selectedPhuongXa = null;
      }
    });
  }

  /** Lưu trữ xã đã chọn */
  onPhuongXaSelect(event: any) {
    // Handle Phuong Xa selection logic here if needed
  }

  /** Hàm xử lý lưu trữ địa chỉ */
  saveAddress() {
    if (this.validateAddress()) {
      this.diaChiKhachHang.tenTinh = this.selectedTinhThanh[0]?.ProvinceName;
      this.diaChiKhachHang.tenQuanHuyen = this.selectedQuanHuyen[0]?.DistrictName;
      this.diaChiKhachHang.tenPhuongXa = this.selectedPhuongXa[0]?.WardName;
      this.diaChiKhachHang.idTinh = this.selectedTinhThanh[0]?.ProvinceID;
      this.diaChiKhachHang.idQuanHuyen = this.selectedQuanHuyen[0]?.DistrictID;
      this.diaChiKhachHang.maPhuongXa = this.selectedPhuongXa[0]?.WardCode;
      // You can now save the address or process it as needed
      console.log('Address saved: ', this.diaChiKhachHang);
    }
  }

  /** Hàm kiểm tra tính hợp lệ của địa chỉ */
  validateAddress(): boolean {
    if (!this.selectedTinhThanh || !this.selectedTinhThanh.length) {
      this.notificationService.showError('Vui lòng chọn tỉnh thành.');
      return false;
    }

    if (!this.selectedQuanHuyen || !this.selectedQuanHuyen.length) {
      this.notificationService.showError('Vui lòng chọn huyện.');
      return false;
    }

    if (!this.selectedPhuongXa || !this.selectedPhuongXa.length) {
      this.notificationService.showError('Vui lòng chọn xã.');
      return false;
    }

    return true;
  }

  /* Tải dữ liệu sản phẩm chi tiết theo id */
  fetchSanPhamChiTietById() {
    this.paymentService.callApiGetDetailProductById(this.idSanPhamChiTiet).subscribe({
      next: (response: any) => {
        this.sanPhamChiTietById = response.data;
        //Gán spct cho hdct
        let hdct = new HoaDonChiTietBanOnlineRequest;
        hdct.soLuong = 1;
        hdct.sanPhamChiTiet = {
          idSpct: this.sanPhamChiTietById.idSpct,
          mauSac: this.sanPhamChiTietById.mauSac,
          kichCo: this.sanPhamChiTietById.kichCo,
        } as SanPhamChiTietRequest;
        
        this.hoaDonBanOnlineRequest.hoaDonChiTiets.push(hdct);
      },
      error: (error: any) => {
         console.error('Lỗi khi lấy sản phẩm chi tiết với id', error);
         this.notificationService.showError(error.error.message);
         this.router.navigate(['/okconde/home']);
      }
    });
  }

  onHoanTatDonHang() {
    if (!this.validateAddress()) {
      return; // Nếu địa chỉ không hợp lệ, dừng xử lý
    }
          var tenTinh = this.selectedTinhThanh[0]?.ProvinceName;
          var tenQuanHuyen = this.selectedQuanHuyen[0]?.DistrictName;
          var tenPhuongXa = this.selectedPhuongXa[0]?.WardName;
          this.hoaDonBanOnlineRequest.diaChiGiaoHang += ', ' + tenPhuongXa + ', ' + tenQuanHuyen + ', ' + tenTinh;
        
    // Gọi API để lưu hóa đơn
    this.paymentService.callApiTaoDonHangOnlineChoMotSanPham(this.hoaDonBanOnlineRequest).subscribe({
      next: (response) => {
        this.notificationService.showSuccess('Đơn hàng đã được tạo thành công!');
        this.router.navigate(['/okconde/history']); // Chuyển đến trang thành công
      },
      error: (error) => {
        console.error('Lỗi khi tạo hóa đơn', error);
        this.notificationService.showError(error.error.message);
      }
    });
  }
  
  increaseQuantity(hdct: any): void {
    const maxQuantity = this.sanPhamChiTietById.soLuong;
    if (hdct.soLuong < maxQuantity) {
      hdct.soLuong++;
    }
  }
  
  decreaseQuantity(hdct: any): void {
    if (hdct.soLuong > 1) {
      hdct.soLuong--;
    }
  }
  
  
  
  
  // Hàm tính tiền giảm giá (tùy chỉnh)
  tinhTienGiam(): number {
    return 0; // Ví dụ: không giảm giá
  }
  

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.idSanPhamChiTiet = Number(params.get('idDetailProduct'));
      this.fetchSanPhamChiTietById();
    });
    this.fetchDataTinhThanhs();
  }

}
