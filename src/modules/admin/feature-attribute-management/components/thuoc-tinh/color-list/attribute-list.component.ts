import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MauSac } from '../../../../../../models/mau-sac/response/mau-sac';
import { MauSacService } from '../../../service/mau-sac.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-attribute-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './attribute-list.component.html',
  styleUrls: ['./attribute-list.component.scss']
})
export class AttributeListComponent implements OnInit {
  mauSacs: MauSac[] = [];

  mauSacAdd: any = {
    idMauSac: null,
    tenMau: '',
    giaTri: '',
    moTa: '',
    trangThai: 'ACTIVE' // Mặc định trạng thái là ACTIVE
  }
  constructor(
    private mauSacService: MauSacService,
    private router: Router
  ) {}

  /** Hàm tải dữ liệu danh sách màu sắc */
  fetchDataMauSacs(): void {
    this.mauSacService.getAllMauSac().subscribe({
      next: (response: any) => {
        this.mauSacs = response.data;
        console.log('MauSacs', this.mauSacs);
      },
      error: (err: any) => {
        console.error('Lỗi khi lấy danh sách màu sắc: ', err);
      }
    });
  }

  /** Hàm bắt sự kiện update sản phẩm */
  handleUpdateMauSac(idMauSac: number): void {
    // Logic for updating mauSac can be added here
  }

  /** Hàm bắt sự kiện xem chi tiết sản phẩm */
  handleDetailMauSac(idMauSac: number): void {
    this.router.navigate([`/admin/product/detail/${idMauSac}`]);
  }

  /** Hàm submit form thêm màu sắc */
  submitADD(): void {
    if (!this.mauSacAdd.tenMau || !this.mauSacAdd.giaTri) {
      alert('Vui lòng nhập đầy đủ thông tin tên màu sắc và giá trị màu sắc.');
      return;
    }

    let check = confirm(`Bạn có muốn thêm màu sắc: ${this.mauSacAdd.tenMau} không?`);
    if (check) {
      this.mauSacService.postAddMauSac(this.mauSacAdd).subscribe({
        next: () => {
          alert('Thêm màu sắc thành công');
          this.resetForm(); // Reset form sau khi thêm thành công
          this.fetchDataMauSacs(); // Cập nhật lại danh sách
        },
        error: (err: any) => {
          console.error('Lỗi khi thêm màu sắc:', err);
        }
      });
    }
  }

  /** Hàm reset form sau khi thêm thành công */
  resetForm(): void {
    this.mauSacAdd = {
      idMauSac: null,
      tenMau: '',
      giaTri: '',
      moTa: '',
      trangThai: 'ACTIVE' // Reset lại trạng thái mặc định
    };
  }


  ngOnInit(): void {
    this.fetchDataMauSacs();
  }
}
