import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Pagination } from '../../../../../../shared/type/pagination';
import { SttUtilsService } from '../../../../../../shared/helper/stt-utils.service';
import { SanPhamResponse } from '../../../../../../models/san-pham/response/san-pham-response';
import { SanPhamService } from '../../../services/san-pham.service';
import { error } from 'jquery';
import { NotificationService } from '../../../../../../shared/notification.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {

  /**Hứng sản phẩm được lấy theo id */
  sanPhamById: SanPhamResponse = new SanPhamResponse;

  /**id san pham */
  idSanPham!: number;

  constructor(
    private route: ActivatedRoute,
    private sttService: SttUtilsService,
    private sanPhamService: SanPhamService,
    private notiService: NotificationService
  ) {

  }
  //Phân trang modal sản phẩm chi tiết
  paginatinonOfModalSPCT: Pagination = {
    size: 10,
    page: 0,
    totalElements: 0,
    totalPages: 0,
    first: false,
    last: false
  }

  /**Hàm bắt sự kiện đổi trang trong modal spct */
  handlePageSPCTChange(type: string) {
    if (type === 'pre') {
      this.paginatinonOfModalSPCT.page -= 1;
    } else if (type === 'next') {
      this.paginatinonOfModalSPCT.page += 1;
    }
  }

  /**Tính stt */
  tinhSTT(page: number, size: number, current: number): number {
    return this.sttService.tinhSTT(page, size, current);
  }

  /** Tải dữ liệu sản phẩm theo id */
  fetchSanPhamById(){
    this.sanPhamService.callApiGetProductById(this.idSanPham).subscribe({
      next: (response: any) => {
        this.sanPhamById = response.data;
      },
      error: (error: any) => {
        this.notiService.showError(error.error.message);
        console.error('Lỗi khi lấy sản phẩm với id', error);
      }
    })
  }


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.idSanPham = Number(params.get('idProduct'));
      this.fetchSanPhamById();
    });
  }



}
