import { Component, OnInit } from '@angular/core';
import { TrongLuong } from '../../../../../../../models/trong-luong/response/trong-luong';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TrongLuongService } from '../../../../service/trong-luong.service';

@Component({
  selector: 'app-trong-luong-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './trong-luong-list.component.html',
  styleUrl: './trong-luong-list.component.scss',
})
export class TrongLuongListComponent implements OnInit {
  trongLuongs: TrongLuong[] = [];

  constructor(
    private trongLuongService: TrongLuongService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchDataTrongLuongs();
  }

  /** Hàm tải dữ liệu danh sách trọng lượng */
  fetchDataTrongLuongs(): void {
    this.trongLuongService.getAllTrongLuong().subscribe({
      next: (response: any) => {
        this.trongLuongs = response.data;
        console.log('TrongLuongs', this.trongLuongs);
      },
      error: (err: any) => {
        console.error('Lỗi khi lấy danh sách trọng lượng: ', err);
      },
    });
  }

  // changePage(pageNew: number) {
  //   this.page = pageNew;
  //   this.fetchDataMauSacs1();
  // }

  /** Khởi tạo đối tượng trọng lượng add */
  trongLuongAdd: any = {
    idTrongLuong: null,
    giaTri: '',
    moTa: '',
    trangThai: 'ACTIVE', // Mặc định trạng thái là ACTIVE
  };

  /** Hàm bắt sự kiện xem chi tiết trọng lượng */
  handleDetailTrongLuong(idTrongLuong: number): void {
    this.router.navigate([`/admin/color/detail/${idTrongLuong}`]);
  }

  /** Hàm lấy dữ liệu cập nhật trọng lượng */
  handleUpdateTrongLuong(idTrongLuong: number): void {}

  /** Hàm submit form thêm trọng lượng */
  submitAdd(): void {
    if (!this.trongLuongAdd.giaTri) {
      alert('Vui lòng nhập đầy đủ thông tin giá trị trọng lượng.');
      return;
    }

    if (
      confirm(
        `Bạn có muốn thêm trọng lượng: ${this.trongLuongAdd.giaTri} không?`
      )
    ) {
      this.trongLuongService.postAddTrongLuong(this.trongLuongAdd).subscribe({
        next: () => {
          alert('Thêm trọng lượng thành công');
          this.resetForm();
          this.fetchDataTrongLuongs();
          this.closeModal('closeModalAdd');
        },
        error: (err) => console.error('Lỗi khi thêm trọng lượng:', err),
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
    this.trongLuongAdd = {
      idTrongLuong: null,
      giaTri: '',
      moTa: '',
      trangThai: 'ACTIVE', // Reset lại trạng thái mặc định
    };
  }
}
