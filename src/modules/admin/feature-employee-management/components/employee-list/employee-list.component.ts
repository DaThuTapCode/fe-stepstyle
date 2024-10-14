import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NhanVienService } from '../../service/nhan-vien.service';
import { NhanVienResponse } from '../../../../../models/nhan-vien/response/nhan-vien-response';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss'
})
export class EmployeeListComponent implements OnInit{

  //Biến hứng dữ liệu
  nhanViens: NhanVienResponse[] = [];

  constructor(
    private nhanVienService: NhanVienService,
    private router: Router
  ) { }

  /**Hàm tải dữ liệu danh sách nhân viên */
  fetchDataNhanViens() {
    this.nhanVienService.getAllEmployee().subscribe({
      next: (response: any) => {
        this.nhanViens = response.data;
        console.log('NhanViens', this.nhanViens);
      },
      error: (err: any) => {
        console.error('Lỗi khi lấy danh sách nhân viên: ', err);
      }
    });
  }

  /**Hàm bắt sự kiện update nhân viên */
  handleUpdateEmployee(idNhanVien: number) {

  }

  /**Hàm bắt sự kiệu xem chi tiết nhân viên */
  handleDetailEmployee(idNhanVien: number) {
    this.router.navigate([`/admin/employee/detail/${idNhanVien}`]);
  }

  ngOnInit(): void {
    this.fetchDataNhanViens();
  }
}
