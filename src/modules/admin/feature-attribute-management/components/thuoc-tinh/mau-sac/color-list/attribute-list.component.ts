import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MauSac } from '../../../../../../../models/mau-sac/response/mau-sac';
import { MauSacService } from '../../../../service/mau-sac.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-attribute-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './attribute-list.component.html',
  styleUrls: ['./attribute-list.component.scss'],
})
export class AttributeListComponent implements OnInit {
  [x: string]: any;
  mauSacs: MauSac[] = [];
  page: number = 1; // Giá trị mặc định của trang là 1
  size: number = 10; // Kích thước mặc định là 10 phần tử trên mỗi trang
  dataSearch: string = '';
  totalPages: number = 0;
  // mauSacAdd: MauSac = this.initMauSac();
  // mauSacUpdate: MauSac = this.initMauSac();

  constructor(private mauSacService: MauSacService, private router: Router) {}

  ngOnInit(): void {
    this.fetchDataMauSacs();
  }

  /** Hàm tải dữ liệu danh sách màu sắc */
  // fetchDataMauSacs1(): void {
  //   this.mauSacService.getCustomersByPage(this.dataSearch,this.page, this.size).subscribe({
  //     next: (response: any) => {
  //       this.mauSacs = response.data;
  //       this.totalPages = response.data.totalPages;
  //       console.log('MauSacs', this.mauSacs);
  //     },
  //     error: (err: any) => {
  //       console.error('Lỗi khi lấy danh sách màu sắc: ', err);
  //     },
  //   });
  // }
  /** Hàm tải dữ liệu danh sách màu sắc */
  fetchDataMauSacs(): void {
    this.mauSacService.getAllMauSac().subscribe({
      next: (response: any) => {
        this.mauSacs = response.data;
        console.log('MauSacs', this.mauSacs);
      },
      error: (err: any) => {
        console.error('Lỗi khi lấy danh sách màu sắc: ', err);
      },
    });
  }

  // changePage(pageNew: number) {
  //   this.page = pageNew;
  //   this.fetchDataMauSacs1();
  // }

  /** Khởi tạo đối tượng màu sắc add */
  mauSacAdd: any = {
    idMauSac: null,
    tenMau: '',
    giaTri: '',
    moTa: '',
    trangThai: 'ACTIVE', // Mặc định trạng thái là ACTIVE
  };

  /** Khởi tạo đối tượng màu sắc update */
  mauSacUpdate: any = {
    idMauSac: null,
    tenMau: '',
    giaTri: '',
    moTa: '',
    trangThai: 'ACTIVE', // Mặc định trạng thái là ACTIVE
  };

  /** Khởi tạo đối tượng màu sắc update */
  mauSacDetail: any = {
    idMauSac: null,
    tenMau: '',
    giaTri: '',
    moTa: '',
    trangThai: 'ACTIVE', // Mặc định trạng thái là ACTIVE
  };

  /** Hàm bắt sự kiện xem chi tiết màu sắc */
  handleDetailMauSac(idMauSacs: number): void {
    this.mauSacs.forEach((mauSac) => {
      if (mauSac.idMauSac === idMauSacs) {
        this.mauSacDetail.idMauSac = mauSac.idMauSac;
        this.mauSacDetail.tenMau = mauSac.tenMau;
        this.mauSacDetail.giaTri = mauSac.giaTri;
        this.mauSacDetail.moTa = mauSac.moTa;
        this.mauSacDetail.trangThai = mauSac.trangThai;
        console.log(this.mauSacDetail);
      }
    });
  }

  /** Hàm lấy dữ liệu cập nhật màu sắc */
  handleUpdateMauSac(idMauSacs: number): void {
    this.mauSacs.forEach((mauSac) => {
      if (mauSac.idMauSac === idMauSacs) {
        this.mauSacUpdate.idMauSac = mauSac.idMauSac;
        this.mauSacUpdate.tenMau = mauSac.tenMau;
        this.mauSacUpdate.giaTri = mauSac.giaTri;
        this.mauSacUpdate.moTa = mauSac.moTa;
        this.mauSacUpdate.trangThai = mauSac.trangThai;
        console.log(this.mauSacUpdate);
      }
    });
  }

  /** Hàm submit form thêm màu sắc */
  submitAdd(): void {
    if (!this.mauSacAdd.tenMau || !this.mauSacAdd.giaTri) {
      alert('Vui lòng nhập đầy đủ thông tin tên màu sắc và giá trị màu sắc.');
      return;
    }

    if (confirm(`Bạn có muốn thêm màu sắc: ${this.mauSacAdd.tenMau} không?`)) {
      this.mauSacService.postAddMauSac(this.mauSacAdd).subscribe({
        next: () => {
          alert('Thêm màu sắc thành công');
          this.resetForm();
          this.fetchDataMauSacs();
          this.closeModal('closeModalAdd');
        },
        error: (err) => console.error('Lỗi khi thêm màu sắc:', err),
      });
    }
  }

  /** Hàm submit cập nhật màu sắc */
  submitUpdate() {
    let checkName: string = this.mauSacUpdate.tenMau;
    if (checkName.length < 1) {
      alert('Nhập tên vào');
      return;
    }

    let check: boolean = confirm(`Bạn có muốn cập nhật ${checkName} không?`);
    if (check) {
      // Kiểm tra xem mauSacUpdate đã có idMauSac hay chưa
      if (this.mauSacUpdate.idMauSac === null) {
        alert('Không có ID màu sắc để cập nhật.');
        return;
      }

      console.log(this.mauSacUpdate);
      this.mauSacService.putUpdateMauSac(this.mauSacUpdate).subscribe({
        next: (value: any) => {
          //alert('Cập nhật màu sắc thành công.');
          this.resetForm();
          this.fetchDataMauSacs(); // Tải lại danh sách sau khi cập nhật
          this.closeModal('closeModalUpdate');
        },
        error: (err) => {
          console.error('Lỗi khi cập nhật màu sắc:', err);
          alert('Cập nhật màu sắc không thành công.'); // Thông báo cho người dùng
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
    this.mauSacAdd = {
      idMauSac: null,
      tenMau: '',
      giaTri: '',
      moTa: '',
      trangThai: 'ACTIVE', // Reset lại trạng thái mặc định
    };
  }
}
