import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SanPhamService } from '../../../services/san-pham.service';
import { SanPham } from '../../../../../../models/san-pham/response/san-pham';
import { Router } from '@angular/router';
import { SanPhamSearch } from '../../../../../../models/san-pham/request/san-pham-search';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {


  sanPhams: SanPham[] = []; //Biến hứng dữ liệu

  sanPhamSearch: SanPhamSearch = {//Biến gửi dữ liệu tìm kiếm
    tenSanPham: null,
    ngayTaoStart: null,
    ngayTaoEnd: null,
    idDanhMuc: null,
    idThuongHieu: null
  }; 

  /**Phân trang */
  size: number = 1;
  page: number = 0;
  totalPages: number = 1;

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

  /**Hàm tìm kiếm phân trang sản phẩm */
  fetchDataSearchSanPham() {
    this.sanPhamService.searchPageProduct(this.sanPhamSearch, this.page, this.size).subscribe({
      next: (response: any) => {
        this.sanPhams = response.data.content;
        this.totalPages = response.data.totalPages;
        console.log("SanPhamPage: ", response);
      }
    });
  }

  /**Bắt sự kiện thay đổi trang */
  changePage(pageNew: number) {
    this.page = pageNew;
    this.fetchDataSearchSanPham();
  }
  /**Hàm bắt sự kiện chuyển hướng thêm sản phẩm mới */
  handleRedirectCreateProduct() {
    this.router.navigate(['/admin/product/create']);
  }

  /**Hàm bắt sự kiện chuyển hướng update sản phẩm */
  handleUpdateProduct(idSanPham: number) {

  }

  /**Hàm bắt sự kiện chuyển hướng xem chi tiết sản phẩm */
  handleDetailProduct(idSanPham: number) {
    this.router.navigate([`/admin/product/detail/${idSanPham}`]);
  }

  /**Hàm bắt sự kiện xuất excel */
  handleExportExcel() {
    alert('Xuất excel')
  }

  ngOnInit(): void {
    this.fetchDataSearchSanPham();
    // this.fetchDataSanPhams();
  }
}
