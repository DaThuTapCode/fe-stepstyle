import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { KieuDeGiay } from '../../../../../../../models/kieu-de-giay/response/kieu-de-giay';
import { KieuDeGiayService } from '../../../../service/kieu-de-giay.service';

@Component({
  selector: 'app-kieu-de-giay-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './kieu-de-giay-list.component.html',
  styleUrl: './kieu-de-giay-list.component.scss',
})
export class KieuDeGiayListComponent implements OnInit {
  kieuDeGiays: KieuDeGiay[] = [];

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
  handleUpdateKieuDeGiay(idKieuDeGiay: number): void {}

  /** Hàm submit form thêm chất liệu đế giày */
  submitAdd(): void {
    if (!this.kieuDeGiayAdd.tenKieuDeGiay || !this.kieuDeGiayAdd.giaTri) {
      alert(
        'Vui lòng nhập đầy đủ thông tin tên kiểu đế giày và giá trị kiểu đế giày.'
      );
      return;
    }

    if (
      confirm(
        `Bạn có muốn thêm kiểu đế giày: ${this.kieuDeGiayAdd.tenKieuDeGiay} không?`
      )
    ) {
      this.kieuDeGiayAdd.postAddKieuDeGiay(this.kieuDeGiayAdd).subscribe({
        next: () => {
          alert('Thêm kiểu đế giày thành công');
          this.resetForm();
          this.fetchDataKieuDeGiays();
          this.closeModal('closeModalAdd');
        },
        error: (err: any) => {
          return console.error('Lỗi khi thêm kiểu đế giày:', err);
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
      tenKieuDeGiay: '',
      giaTri: '',
      moTa: '',
      trangThai: 'ACTIVE', // Reset lại trạng thái mặc định
    };
  }
}
