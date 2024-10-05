import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SanPhamService } from '../../../services/san-pham.service';
import { SanPham } from '../../../../../../models/san-pham/response/san-pham';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {

  //Biến hứng dữ liệu
  sanPhams: SanPham[] = [];

  constructor(
    private sanPhamService: SanPhamService,
    private router: Router
  ) { }

  /**Hàm tải dữ liệu danh sách sản phẩm */
  fetchDataSanPhams() {
    this.sanPhamService.getAllProduct().subscribe({
      next: (response: any) => {
        this.sanPhams = response.data;
        console.log('SanPhams', this.sanPhams);
      },
      error: (err: any) => {
        console.error('Lỗi khi lấy danh sách sản phẩm: ', err);
      }
    });
  }

  /**Hàm bắt sự kiện update sản phẩm */
  handleUpdateProduct(idSanPham: number) {

  }

  /**Hàm bắt sự kiệu xem chi tiết sản phẩm */
  handleDetailProduct(idSanPham: number) {
    this.router.navigate([`/admin/product/detail/${idSanPham}`]);
  }

  ngOnInit(): void {
    this.fetchDataSanPhams();
  }
}
