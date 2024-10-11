import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { KichCo } from '../../../../../../../models/kich-co/response/kich-co';
import { KichCoService } from '../../../../service/kich-co.service';

@Component({
  selector: 'app-kich-co-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './kich-co-list.component.html',
  styleUrl: './kich-co-list.component.scss',
})
export class KichCoListComponent implements OnInit {
  kichCos: KichCo[] = [];

  constructor(private kichCoService: KichCoService, private router: Router) {}

  ngOnInit(): void {
    this.fetchDataKichCos();
  }

  /** Hàm tải dữ liệu danh sách kích cỡ */
  fetchDataKichCos(): void {
    this.kichCoService.getAllKichCo().subscribe({
      next: (response: any) => {
        this.kichCos = response.data;
        console.log('KichCos', this.kichCos);
      },
      error: (err: any) => {
        console.error('Lỗi khi lấy danh sách kích cỡ: ', err);
      },
    });
  }

  /** Khởi tạo đối tượng kích cỡ add */
  kichCoAdd: any = {
    idKichCo: null,
    giaTri: null,
    moTa: '',
    trangThai: 'ACTIVE', // Mặc định trạng thái là ACTIVE
  };

  /** Hàm bắt sự kiện xem chi tiết kích cỡ */
  handleDetailKichCo(idKichCo: number): void {
    this.router.navigate([`/admin/color/detail/${idKichCo}`]);
  }

  /** Hàm lấy dữ liệu cập nhật kích cỡ */
  handleUpdateKichCo(idKichCo: number): void {}

  /** Hàm submit form thêm kích cỡ */
  submitAdd(): void {
    let checkGiaTri: string = this.kichCoAdd.giaTri;
    if (checkGiaTri.length < 1) {
      alert('Nhập giá trị vào');
      return;
    }

    if (confirm(`Bạn có muốn thêm kích cỡ: ${this.kichCoAdd.giaTri} không?`)) {
      this.kichCoService.postAddKichCo(this.kichCoAdd).subscribe({
        next: () => {
          alert('Thêm kích cỡ thành công');
          this.resetForm();
          this.fetchDataKichCos();
          this.closeModal('closeModalAdd');
        },
        error: (err) => console.error('Lỗi khi thêm kích cỡ:', err),
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
    this.kichCoAdd = {
      idKichCo: null,
      giaTri: '',
      moTa: '',
      trangThai: 'ACTIVE', // Reset lại trạng thái mặc định
    };
  }
}
