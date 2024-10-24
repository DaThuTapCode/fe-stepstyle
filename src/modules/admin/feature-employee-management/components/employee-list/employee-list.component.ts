import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NhanVienService } from '../../service/nhan-vien.service';
import { NhanVienResponse } from '../../../../../models/nhan-vien/response/nhan-vien-response';
import { FormsModule } from '@angular/forms';
import { ChucVuResponse } from '../../../../../models/chuc-vu/response/chuc-vu-response';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss'
})
export class EmployeeListComponent implements OnInit {

  // Biến hứng dữ liệu
  nhanViens: NhanVienResponse[] = [];

  selectedEmployee: NhanVienResponse = {
    idNhanVien: 0,
    maNhanVien: '',
    hoTen: '',
    ngaySinh: null,
    diaChi: '',
    gioiTinh: true,
    soDienThoai: '',
    email: '',
    ghiChu: '',
    anh: '',
    ngayTao: null,
    ngayChinhSua: null,
    trangThai: 'ACTIVE',
    chucVu: new ChucVuResponse
  }; // Dữ liệu khách hàng được chọn để xem hoặc chỉnh sửa

  // Các biến phân trang
  size: number = 5;
  page: number = 0;
  totalPages: number = 1;
  

  // Dữ liệu tìm kiếm
  dataSearch = {
    maNhanVien: '',
    tenNhanVien: '',
    soDienThoai: ''
  };

  changePage(pageNew: number) {
    this.page = pageNew;
    this.fetchDataNhanViens();
  }

  constructor(
    private nhanVienService: NhanVienService,
    private router: Router
  ) { }

  // /** Hàm tìm kiếm nhân viên */
  // searchEmployees() {
  //   this.page = 0; // Reset lại trang khi bắt đầu tìm kiếm
  //   this.fetchDataNhanViens();
  // }

   /** Hàm tải dữ liệu danh sách nhân viên */
   fetchDataNhanViens() {
    this.nhanVienService.getEmployeeByPage(this.dataSearch, this.page, this.size).subscribe({
      next: (response: any) => {
        this.nhanViens = response.data.content; // Cập nhật theo cấu trúc trả về của API
        this.nhanViens = this.nhanViens.sort((a, b) => b.idNhanVien - a.idNhanVien);
        this.totalPages = response.data.totalPages; // Cập nhật tổng số trang
        console.log('NhanViens', this.nhanViens);
      },
      error: (err: any) => {
        console.error('Lỗi khi lấy danh sách nhân viên: ', err);
      }
    });
  }

  // /** Hàm reset tìm kiếm */
  // resetSearch() {
  //   this.dataSearch = {
  //     maNhanVien: '',
  //     tenNhanVien: '',
  //     soDienThoai: ''
  //   };
  //   this.searchEmployees();
  // }

  /** Hàm bắt sự kiện update nhân viên */
  handleUpdateEmployee(nhanViens : any) {
    this.router.navigate(['/admin/employee/update/' + nhanViens.idNhanVien]);
  }

  /** Hàm bắt sự kiện xem chi tiết nhân viên */
  handleDetailEmployee(nhanViens : any) {
    this.selectedEmployee = nhanViens;
  }

  // Hàm điều hướng đến trang thêm nhân viên
navigateToAddEmployee(): void {
  this.router.navigate(['/admin/employee/add']);
}

  ngOnInit(): void {
    this.fetchDataNhanViens();
  }
}
