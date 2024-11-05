import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NhanVienService } from '../../service/nhan-vien.service';
import { NhanVienResponse } from '../../../../../models/nhan-vien/response/nhan-vien-response';
import { FormsModule } from '@angular/forms';
import { ChucVuResponse } from '../../../../../models/chuc-vu/response/chuc-vu-response';
import { Pagination } from '../../../../../shared/type/pagination';
import { SttUtilsService } from '../../../../../shared/helper/stt-utils.service';

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

  //Phân trang 
  paginatinonOfEmployee: Pagination = {
    size: 10,
    page: 0,
    totalElements: 0,
    totalPages: 0,
    first: false,
    last: false
  }
  

  // Dữ liệu tìm kiếm
  nhanVienSearchRequest = {
    maNhanVien: '',
    hoTen: '',
    soDienThoai: ''
  };

  constructor(
    private nhanVienService: NhanVienService,
    private router: Router,
    private sttUtilsService: SttUtilsService
  ) { }

  /** Hàm tìm kiếm nhân viên */
  searchEmployees() {
    this.paginatinonOfEmployee.page = 0; // Reset lại trang khi bắt đầu tìm kiếm
    this.fetchDataNhanViens();
  }

   /** Hàm tải dữ liệu danh sách nhân viên */
   fetchDataNhanViens() {
    this.nhanVienService.getEmployeeByPage(this.nhanVienSearchRequest, this.paginatinonOfEmployee.page, this.paginatinonOfEmployee.size).subscribe({
      next: (response: any) => {
        this.nhanViens = response.data.content; // Cập nhật theo cấu trúc trả về của API
        this.paginatinonOfEmployee.totalPages = response.data.totalPages;
        this.paginatinonOfEmployee.totalElements = response.data.totalElements;
        this.paginatinonOfEmployee.page = response.data.pageable.pageNumber;
        this.paginatinonOfEmployee.first = response.data.first;
        this.paginatinonOfEmployee.last = response.data.last;
        console.log('NhanViens', this.nhanViens);
      },
      error: (err: any) => {
        console.error('Lỗi khi lấy danh sách nhân viên: ', err);
      }
    });
  }

  /**Tính stt */
  tinhSTT(page: number, size: number, current: number): number {
    return this.sttUtilsService.tinhSTT(page, size, current);
  }
  /**Hàm bắt sự kiện đổi trang bảng sản phẩm */
  handlePageEmployeeChange(type: string) {
    if (type === 'pre') {
      this.paginatinonOfEmployee.page -= 1;
    } else if (type === 'next') {
      this.paginatinonOfEmployee.page += 1;
    }
    this.fetchDataNhanViens();
  }

  /** Hàm reset tìm kiếm */
  resetSearch() {
    this.nhanVienSearchRequest = {
      maNhanVien: '',
      hoTen: '',
      soDienThoai: ''
    };
    this.searchEmployees();
  }

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
