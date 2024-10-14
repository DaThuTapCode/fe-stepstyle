import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { KieuDeGiayService } from '../../../../service/kieu-de-giay.service';
import { KieuDeGiayResponse } from '../../../../../../../models/kieu-de-giay/response/kieu-de-giay-response';

@Component({
  selector: 'app-kieu-de-giay-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './kieu-de-giay-list.component.html',
  styleUrl: './kieu-de-giay-list.component.scss',
})
export class KieuDeGiayListComponent implements OnInit {
  kieuDeGiays: KieuDeGiayResponse[] = [];

  constructor(
    private kieuDeGiayService: KieuDeGiayService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchDataKieuDeGiays();
  }

  /** Hàm tải dữ liệu danh sách kiểu đế giày */
  fetchDataKieuDeGiays(): void {
    this.kieuDeGiayService.getAllKieuDeGiay().subscribe({
      next: (response: any) => {
        this.kieuDeGiays = response.data;
        console.log('KieuDeGiays', this.kieuDeGiays);
      },
      error: (err: any) => {
        console.error('Lỗi khi lấy danh sách kiểu đế giày: ', err);
      },
    });
  }

  /** Khởi tạo đối tượng kiểu đế giày add */
  kieuDeGiayAdd: any = {
    idKieuDeGiay: null,
    maKieuDeGiay: '',
    tenKieuDeGiay: '',
    giaTri: '',
    moTa: '',
    trangThai: 'ACTIVE', // Mặc định trạng thái là ACTIVE
  };

  /** Khởi tạo đối tượng kiểu đế giày add */
  kieuDeGiayUpdate: any = {
    idKieuDeGiay: null,
    maKieuDeGiay: '',
    tenKieuDeGiay: '',
    giaTri: '',
    moTa: '',
    trangThai: 'ACTIVE', // Mặc định trạng thái là ACTIVE
  };

  /** Hàm bắt sự kiện xem chi tiết kiểu đế giày */
  handleDetailKieuDeGiay(idKieuDeGiay: number): void {
    this.router.navigate([`/admin/color/detail/${idKieuDeGiay}`]);
  }

  /** Hàm lấy dữ liệu cập nhật kiểu đế giày */
  handleUpdateKieuDeGiay(idKieuDeGiays: number): void {
    this.kieuDeGiays.forEach((kieuDeGiay) => {
      if (kieuDeGiay.idKieuDeGiay === idKieuDeGiays) {
        this.kieuDeGiayUpdate.idKieuDeGiay = kieuDeGiay.idKieuDeGiay;
        this.kieuDeGiayUpdate.maKieuDeGiay = kieuDeGiay.maKieuDeGiay;
        this.kieuDeGiayUpdate.tenKieuDeGiay = kieuDeGiay.tenKieuDeGiay;
        this.kieuDeGiayUpdate.giaTri = kieuDeGiay.giaTri;
        this.kieuDeGiayUpdate.moTa = kieuDeGiay.moTa;
        this.kieuDeGiayUpdate.trangThai = kieuDeGiay.trangThai;
        console.log(this.kieuDeGiayUpdate);
      }
    });
  }

  /** Hàm submit form thêm kiểu đế giày */
  submitAdd(): void {
    if (!this.kieuDeGiayAdd.maKieuDeGiay || !this.kieuDeGiayAdd.tenKieuDeGiay) {
      alert('Vui lòng nhập đầy đủ thông tin mã kiểu đế giày và tên kiểu đế giày.');
      return;
    }

    if (
      confirm(
        `Bạn có muốn thêm kiểu đế giày: ${this.kieuDeGiayAdd.maKieuDeGiay} không?`
      )
    ) {
      this.kieuDeGiayService.postAddKieuDeGiay(this.kieuDeGiayAdd).subscribe({
        next: () => {
          alert('Thêm kiểu đế giày thành công');
          this.resetForm();
          this.fetchDataKieuDeGiays();
          this.closeModal('closeModalAdd');
        },
        error: (err) => console.error('Lỗi khi thêm kiểu đế giày:', err),
      });
    }
  }

  /** Hàm submit cập nhật kiểu đế giày */
  submitUpdate() {
    if (!this.kieuDeGiayUpdate || !this.kieuDeGiayUpdate.maKieuDeGiay) {
      alert('Xin vui lòng nhập mã kiểu đế giày');
      return;
    }

    let checkName: string = this.kieuDeGiayUpdate.maKieuDeGiay;
    if (checkName.length < 1) {
      alert('Xin vui lòng nhập mã kiểu đế giày');
      return;
    }

    let check: boolean = confirm(`Bạn có muốn cập nhật ${checkName} không?`);
    if (check) {
      // Kiểm tra xem kieuDeGiayUpdate đã có id kiểu đế giày hay chưa
      if (
        this.kieuDeGiayUpdate.idKieuDeGiay === null ||
        this.kieuDeGiayUpdate.idKieuDeGiay === undefined
      ) {
        alert('Không có ID kiểu đế giày để cập nhật.');
        return;
      }

      console.log(this.kieuDeGiayUpdate);
      this.kieuDeGiayService.putUpdateKieuDeGiay(this.kieuDeGiayUpdate).subscribe({
        next: (value: any) => {
          alert('Cập nhật kiểu đế giày thành công.');
          this.resetForm();
          this.fetchDataKieuDeGiays(); // Tải lại danh sách sau khi cập nhật
          this.closeModal('closeModalUpdate');
        },
        error: (err) => {
          console.error('Lỗi khi cập nhật kiểu đế giày:', err);
          alert('Cập nhật kiểu đế giày không thành công.'); // Thông báo cho người dùng
        },
      });
    }
  }

  closeModal(idBtn: string) {
    const closeModalUpdate = document.getElementById(idBtn);
    if (closeModalUpdate) {
      closeModalUpdate.click();
    }
  }

  /** Hàm reset form sau khi add hoặc update thành công */
  resetForm(): void {
    this.kieuDeGiayAdd = {
      idKieuDeGiay: null,
      maKieuDeGiay: '',
      tenKieuDeGiay: '',
      giaTri: '',
      moTa: '',
      trangThai: 'ACTIVE', // Reset lại trạng thái mặc định
    };
  }
}
