import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailProductService } from '../../service/detail-product.service';
import { NotificationService } from '../../../../shared/notification.service';
import { SanPhamResponse } from '../../../../models/san-pham/response/san-pham-response';
import { CommonModule } from '@angular/common';
import { SanPhamChiTietResponse } from '../../../../models/san-pham-chi-tiet/response/san-pham-chi-tiet-response';
import { MauSacResponse } from '../../../../models/mau-sac/response/mau-sac-response';
import { KichCoResponse } from '../../../../models/kich-co/response/kich-co-response';
import { MauSacService } from '../../../admin/feature-attribute-management/service/mau-sac.service';
import { KichCoService } from '../../../admin/feature-attribute-management/service/kich-co.service';

@Component({
  selector: 'app-detail-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss'],
})
export class DetailProductComponent implements OnInit {
  sanPhamById: SanPhamResponse = new SanPhamResponse();
  idSanPham!: number;

  // Thuộc tính để lưu kích cỡ và màu sắc được chọn
  selectedSize?: number;
  selectedColor?: string;
  selectedProductDetail?: SanPhamChiTietResponse;

  mauSacs: MauSacResponse[] = []; // Màu sắc
  kichCos: KichCoResponse[] = []; // Kích cỡ

  constructor(
    private route: ActivatedRoute,
    private detailProductService: DetailProductService,
    private notiService: NotificationService,
    private mauSacSerVice: MauSacService,
    private kichCoService: KichCoService
  ) {}

  fetchSanPhamById() {
    this.detailProductService.callApiGetProductById(this.idSanPham).subscribe({
      next: (response: any) => {
        this.sanPhamById = response.data;

        // Tự động chọn sản phẩm chi tiết đầu tiên (nếu có)
        if (
          this.sanPhamById.sanPhamChiTiets &&
          this.sanPhamById.sanPhamChiTiets.length > 0
        ) {
          const firstDetail = this.sanPhamById.sanPhamChiTiets[0];
          this.selectedSize = firstDetail.kichCo.giaTri;
          this.selectedColor = firstDetail.mauSac.tenMau;
          this.selectedProductDetail = firstDetail;
        } else {
          this.selectedProductDetail = undefined; // Không có sản phẩm chi tiết nào
        }
      },
      error: (error: any) => {
        console.error('Lỗi khi lấy sản phẩm với id', error);
        this.notiService.showError(error.error.message);
      },
    });
  }

  /**Hàm tải dữ liệu cho danh sách kích cỡ*/
  fetchKichCos() {
    this.kichCoService.getAllKichCo().subscribe({
      next: (res: any) => {
        this.kichCos = res.data;
      },
      error: (err) => {
        console.log('Lỗi khi tải dữ liệu danh sách kích cỡ: ', err);
      },
    });
  }

  /**Hàm tải dữ liệu cho danh sách màu sắc*/
  fetchMauSacs() {
    this.mauSacSerVice.getAllMauSac().subscribe({
      next: (res: any) => {
        this.mauSacs = res.data;
      },
      error: (err) => {
        console.log('Lỗi khi tải dữ liệu danh sách màu sắc: ', err);
      },
    });
  }

  // Xử lý khi chọn kích cỡ
  onSelectSize(size: number) {
    this.selectedSize = size;
    this.updateSelectedProductDetail();
  }

  // Xử lý khi chọn màu sắc
  onSelectColor(color: string) {
    this.selectedColor = color;
    this.updateSelectedProductDetail();
  }

  // Cập nhật `selectedProductDetail` dựa trên màu sắc và kích cỡ
  updateSelectedProductDetail() {
    if (this.sanPhamById.sanPhamChiTiets) {
      this.selectedProductDetail = this.sanPhamById.sanPhamChiTiets.find(
        (spct) =>
          spct.kichCo.giaTri === this.selectedSize &&
          spct.mauSac.tenMau === this.selectedColor
      );

      // Nếu không tìm thấy sản phẩm chi tiết phù hợp
      if (!this.selectedProductDetail) {
        this.notiService.showWarning(
          'Sản phẩm không tồn tại cho màu sắc và kích cỡ đã chọn'
        );
      }
    } else {
      // Nếu không có cả màu sắc và kích cỡ được chọn
      this.selectedProductDetail = undefined;
      this.notiService.showWarning('Chưa chọn màu sắc hoặc kích cỡ');
    }
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.idSanPham = Number(params.get('idProduct'));
      this.fetchSanPhamById();
      this.fetchMauSacs();
      this.fetchKichCos();
    });
  }
}
