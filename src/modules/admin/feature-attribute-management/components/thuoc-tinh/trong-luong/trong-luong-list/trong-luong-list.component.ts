import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TrongLuongService } from '../../../../service/trong-luong.service';
import { TrongLuongResponse } from '../../../../../../../models/trong-luong/response/trong-luong-response';

@Component({
  selector: 'app-trong-luong-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './trong-luong-list.component.html',
  styleUrl: './trong-luong-list.component.scss',
})
export class TrongLuongListComponent implements OnInit {
  trongLuongs: TrongLuongResponse[] = [];

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


  /** Khởi tạo đối tượng trọng lượng add */
  trongLuongAdd: any = {
    idTrongLuong: null,
    maTrongLuong: '',
    giaTri: '',
    moTa: '',
    trangThai: 'ACTIVE', // Mặc định trạng thái là ACTIVE
  };

  trongLuongUpdate: any = {
    idTrongLuong: null,
    maTrongLuong: '',
    giaTri: '',
    moTa: '',
    trangThai: 'ACTIVE', // Mặc định trạng thái là ACTIVE
  };

  trongLuongDetail: any = {
    idTrongLuong: null,
    maTrongLuong: '',
    giaTri: '',
    moTa: '',
    trangThai: 'ACTIVE', // Mặc định trạng thái là ACTIVE
  };

  /** Hàm bắt sự kiện xem chi tiết trọng lượng */
  handleDetailTrongLuong(idTrongLuongs: number): void {
    this.trongLuongs.forEach((trongLuong) => {
      if (trongLuong.idTrongLuong === idTrongLuongs) {
        this.trongLuongDetail.idTrongLuong = trongLuong.idTrongLuong;
        this.trongLuongDetail.maTrongLuong = trongLuong.maTrongLuong;
        this.trongLuongDetail.giaTri = trongLuong.giaTri;
        this.trongLuongDetail.moTa = trongLuong.moTa;
        this.trongLuongDetail.trangThai = trongLuong.trangThai;
        console.log(this.trongLuongDetail);
      }
    });
  }

  /** Hàm lấy dữ liệu cập nhật trọng lượng */
  handleUpdateTrongLuong(idTrongLuongs: number): void {
    this.trongLuongs.forEach((trongLuong) => {
      if (trongLuong.idTrongLuong === idTrongLuongs) {
        this.trongLuongUpdate.idTrongLuong = trongLuong.idTrongLuong;
        this.trongLuongUpdate.maTrongLuong = trongLuong.maTrongLuong;
        this.trongLuongUpdate.giaTri = trongLuong.giaTri;
        this.trongLuongUpdate.moTa = trongLuong.moTa;
        this.trongLuongUpdate.trangThai = trongLuong.trangThai;
        console.log(this.trongLuongUpdate);
      }
    });
  }

  /** Hàm submit form thêm trọng lượng */
  submitAdd(): void {
    if (!this.trongLuongAdd.maTrongLuong || !this.trongLuongAdd.giaTri) {
      alert(
        'Vui lòng nhập đầy đủ thông tin mã trọng lượng và giá trị trọng lượng.'
      );
      return;
    }

    if (
      confirm(
        `Bạn có muốn thêm trọng lượng: ${this.trongLuongAdd.maTrongLuong} không?`
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

  /** Hàm submit cập nhật trọng lượng */
  submitUpdate() {
    if (!this.trongLuongUpdate || !this.trongLuongUpdate.maTrongLuong) {
      alert('Xin vui lòng nhập mã trọng lượng');
      return;
    }

    let checkName: string = this.trongLuongUpdate.maTrongLuong;
    if (checkName.length < 1) {
      alert('Xin vui lòng nhập mã trọng lượng');
      return;
    }

    let check: boolean = confirm(`Bạn có muốn cập nhật ${checkName} không?`);
    if (check) {
      // Kiểm tra xem trongLuongUpdate đã có id trọng lượng hay chưa
      if (
        this.trongLuongUpdate.idTrongLuong === null ||
        this.trongLuongUpdate.idTrongLuong === undefined
      ) {
        alert('Không có ID trọng lượng để cập nhật.');
        return;
      }

      console.log(this.trongLuongUpdate);
      this.trongLuongService.putUpdateTrongLuong(this.trongLuongUpdate).subscribe({
        next: (value: any) => {
          alert('Cập nhật trọng lượng thành công.');
          this.resetForm();
          this.fetchDataTrongLuongs(); // Tải lại danh sách sau khi cập nhật
          this.closeModal('closeModalUpdate');
        },
        error: (err) => {
          console.error('Lỗi khi cập nhật trọng lượng:', err);
          alert('Cập nhật trọng lượng không thành công.'); // Thông báo cho người dùng
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
    this.trongLuongAdd = {
      idTrongLuong: null,
      maTrongLuong: '',
      giaTri: '',
      moTa: '',
      trangThai: 'ACTIVE', // Reset lại trạng thái mặc định
    };
  }
}
