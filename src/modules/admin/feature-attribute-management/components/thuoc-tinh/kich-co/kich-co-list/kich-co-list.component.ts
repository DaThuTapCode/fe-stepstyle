import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { KichCoService } from '../../../../service/kich-co.service';
import { KichCoResponse } from '../../../../../../../models/kich-co/response/kich-co-response';

@Component({
  selector: 'app-kich-co-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './kich-co-list.component.html',
  styleUrl: './kich-co-list.component.scss',
})
export class KichCoListComponent implements OnInit {
  kichCos: KichCoResponse[] = [];

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
    maKichCo: '',
    giaTri: null,
    moTa: '',
    trangThai: 'ACTIVE', // Mặc định trạng thái là ACTIVE
  };

  /** Khởi tạo đối tượng kích cỡ add */
  kichCoUpdate: any = {
    idKichCo: null,
    maKichCo: '',
    giaTri: null,
    moTa: '',
    trangThai: 'ACTIVE', // Mặc định trạng thái là ACTIVE
  };

  /** Hàm bắt sự kiện xem chi tiết kích cỡ */
  handleDetailKichCo(idKichCo: number): void {
    this.router.navigate([`/admin/color/detail/${idKichCo}`]);
  }

  /** Hàm lấy dữ liệu cập nhật kích cỡ */
  handleUpdateKichCo(idKichCos: number): void {
    this.kichCos.forEach((kichCo) => {
      if (kichCo.idKichCo === idKichCos) {
        this.kichCoUpdate.idKichCo = kichCo.idKichCo;
        this.kichCoUpdate.maKichCo = kichCo.maKichCo;
        this.kichCoUpdate.giaTri = kichCo.giaTri;
        this.kichCoUpdate.moTa = kichCo.moTa;
        this.kichCoUpdate.trangThai = kichCo.trangThai;
        console.log(this.kichCoUpdate);
      }
    });
  }

  /** Hàm submit form thêm kích cỡ */
  submitAdd(): void {
    if (!this.kichCoAdd.maKichCo || !this.kichCoAdd.giaTri) {
      alert('Vui lòng nhập đầy đủ thông tin mã kích cỡ và giá trị kích cỡ.');
      return;
    }

    if (
      confirm(`Bạn có muốn thêm kích cỡ: ${this.kichCoAdd.maKichCo} không?`)
    ) {
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

  /** Hàm submit cập nhật kích cỡ */
  submitUpdate() {
    if (!this.kichCoUpdate || !this.kichCoUpdate.maKichCo) {
      alert('Xin vui lòng nhập mã kích cỡ');
      return;
    }

    let checkName: string = this.kichCoUpdate.maKichCo;
    if (checkName.length < 1) {
      alert('Xin vui lòng nhập mã kích cỡ');
      return;
    }

    let check: boolean = confirm(`Bạn có muốn cập nhật ${checkName} không?`);
    if (check) {
      // Kiểm tra xem CLDGUpdate đã có id kích cỡ hay chưa
      if (
        this.kichCoUpdate.idKichCo === null ||
        this.kichCoUpdate.idKichCo === undefined
      ) {
        alert('Không có ID kích cỡ đế giày để cập nhật.');
        return;
      }

      console.log(this.kichCoUpdate);
      this.kichCoService
        .putUpdateKichCo(this.kichCoUpdate)
        .subscribe({
          next: (value: any) => {
            alert('Cập nhật kích cỡ thành công.');
            this.resetForm();
            this.fetchDataKichCos(); // Tải lại danh sách sau khi cập nhật
            this.closeModal('closeModalUpdate');
          },
          error: (err) => {
            console.error('Lỗi khi cập nhật kích cỡ:', err);
            alert('Cập nhật kích cỡ không thành công.'); // Thông báo cho người dùng
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
    this.kichCoAdd = {
      idKichCo: null,
      maKichCo: '',
      giaTri: '',
      moTa: '',
      trangThai: 'ACTIVE', // Reset lại trạng thái mặc định
    };
  }
}
