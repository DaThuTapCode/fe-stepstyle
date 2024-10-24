import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PhieuGiamGiaRequest } from '../../../../../../models/phieu-giam-gia/request/phieu-giam-gia-request';
import { CouponsService } from '../../../services/coupons.service';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'jquery';

@Component({
  selector: 'app-coupons-update',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './coupons-update.component.html',
  styleUrl: './coupons-update.component.scss'
})
export class CouponsUpdateComponent implements OnInit {

  // Trạng thái lỗi ngày bắt đầu > ngày kết thúc
  isDateInvalid: boolean = false;
  
  /** Biến hứng dữ liệu để chỉnh sửa */
  selectedCoupons: PhieuGiamGiaRequest = {
    idPhieuGiamGia: 0,
    maPhieuGiamGia: '',
    tenPhieuGiamGia: '',
    moTa: '',
    loaiGiam: '',
    giaTriGiamToiDa: 0,
    giaTriGiamToiThieu: 0,
    giaTriGiam: 0,
    trangThai: ''
  }

  /** Hàm khởi chạy các phụ thuộc */
  constructor(
    private couPonsService: CouponsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  /** Hàm quay lại danh sách phiếu giảm giá */
  handleBackToListCoupons() {
    this.router.navigate([`/admin/coupons`]);
  }

  /** hàm tải dữ liệu phiếu giảm giá theo idPhieuGiamGia  */
  fetchDataCouponsById(
    idPhieuGiamGia: number
  ) {
    this.couPonsService.getCouponsById(idPhieuGiamGia).subscribe({
      next: (response: any) => {
        this.selectedCoupons = response.data;
      },
      error: (err: any) => {
        console.error('Lỗi khi lấy phiếu giảm giá theo idPhieuGiamGia: ', err);
      }
    })
  }

  /** Hàm kiểm tra tính hợp lệ của các trường nhập */
  validateFields(): boolean {
    // Kiểm tra các trường không có ký tự đặt biệt
    const specialCharPattern = /^[\p{L}\p{N}\s]+$/u;

    // Kiểm tra tên phiếu giảm giá
    if (this.selectedCoupons.tenPhieuGiamGia.trim().length <= 0) {
      alert('Tên phiếu giảm giá không được để trống.');
      return false;
    }

    if (!specialCharPattern.test(this.selectedCoupons.tenPhieuGiamGia)) {
      alert('Tên phiếu giảm giá không được chứa ký tự đặc biệt.');
      return false;
    }

    // Kiểm tra giá trị giảm tối đa
    if (isNaN(Number(this.selectedCoupons.giaTriGiamToiDa)) || this.selectedCoupons.giaTriGiamToiDa <= 0) {
      alert('Giá trị giảm tối đa không hợp lệ. Vui lòng nhập lại!');
      return false;
    }

    // Kiểm tra giá trị giảm tối thiểu
    if (isNaN(Number(this.selectedCoupons.giaTriGiamToiThieu)) || this.selectedCoupons.giaTriGiamToiThieu <= 0) {
      alert('Giá trị giảm tối thiểu không hợp lệ. Vui lòng nhập lại!');
      return false;
    }

    // Kiểm tra giá trị giảm
    if (isNaN(Number(this.selectedCoupons.giaTriGiam)) || this.selectedCoupons.giaTriGiam <= 0) {
      alert('Giá trị giảm không hợp lệ. Vui lòng nhập lại!');
      return false;
    };

    // Tất cả các trường hợp lệ
    return true;

  }

  /** Hàm để gọi Update */
  submitUpdate() {
    if (this.validateFields()) {
      this.couPonsService.putCoupons(this.selectedCoupons.idPhieuGiamGia, this.selectedCoupons).subscribe({
        next: (response: any) => {
          alert('Cập nhật thành công');
          this.router.navigate([`/admin/coupons`])
        },
        error: (err: any) => {
          console.error('Lỗi khi cập nhật phiếu giảm giá', err);

        }
      });
    }
  }

  /** Hàm chạy khởi tạo các dữ liệu */
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idPhieuGiamGia = Number(params.get('id'));
      if (idPhieuGiamGia) {
        this.fetchDataCouponsById(idPhieuGiamGia);  // Lấy dữ liệu phiếu giảm giá
      }
    });
  }

}
