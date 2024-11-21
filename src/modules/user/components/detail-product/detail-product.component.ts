import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DetailProductService } from '../../service/detail-product.service';
import { NotificationService } from '../../../../shared/notification.service';
import { SanPhamResponse } from '../../../../models/san-pham/response/san-pham-response';
import { CommonModule } from '@angular/common';
import { SanPhamChiTietResponse } from '../../../../models/san-pham-chi-tiet/response/san-pham-chi-tiet-response';
import { MauSacResponse } from '../../../../models/mau-sac/response/mau-sac-response';
import { KichCoResponse } from '../../../../models/kich-co/response/kich-co-response';
import { MauSacService } from '../../../admin/feature-attribute-management/service/mau-sac.service';
import { KichCoService } from '../../../admin/feature-attribute-management/service/kich-co.service';
import { CartService } from '../../service/cart.service';

@Component({
  selector: 'app-detail-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss'],
})
export class DetailProductComponent implements OnInit {
  sanPhamById: SanPhamResponse = new SanPhamResponse;
  idSanPham!: number;

  // Thuộc tính để lưu kích cỡ và màu sắc được chọn

  selectedProductDetail: SanPhamChiTietResponse | undefined = new SanPhamChiTietResponse;

  uniqueColors: any[] = []; // Màu sắc duy nhất
  uniqueSizes: any[] = []; // Kích cỡ duy nhất

  selectedColor: MauSacResponse = new MauSacResponse; // Màu đã chọn
  selectedSize: KichCoResponse = new KichCoResponse; // Kích cỡ đã chọn

  selectedProduct: any = null; // Sản phẩm chi tiết đã chọn
  mauSacs: MauSacResponse[] = []; // Màu sắc
  kichCos: KichCoResponse[] = []; // Kích cỡ

  constructor(
    private route: ActivatedRoute,
    private detailProductService: DetailProductService,
    private notiService: NotificationService,
    private router: Router,
    private mauSacSerVice: MauSacService,
    private kichCoService: KichCoService,
    private cartService: CartService,
  ) {}

  fetchSanPhamById() {
    this.detailProductService.callApiGetProductById(this.idSanPham).subscribe({
      next: (response: any) => {
        this.sanPhamById = response.data;
        console.log('dcv', this.sanPhamById)
        this.extractUniqueAttributes();
        this.selectedProductDetail = this.sanPhamById.sanPhamChiTiets[0];
        this.selectedColor = this.selectedProductDetail.mauSac;
        this.selectedSize = this.selectedProductDetail.kichCo;
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


  extractUniqueAttributes() {
    const details = this.sanPhamById?.sanPhamChiTiets;

    if (!details || !Array.isArray(details)) {
      this.uniqueColors = [];
      this.uniqueSizes = [];
      return;
    }

    this.uniqueColors = Array.from(
      new Set(details.map((d: any) => d.mauSac?.idMauSac))
    )
      .filter((id: any) => id !== undefined)
      .map((id: any) => details.find((d: any) => d.mauSac?.idMauSac === id)?.mauSac);

    this.uniqueSizes = Array.from(
      new Set(details.map((d: any) => d.kichCo?.idKichCo))
    )
      .filter((id: any) => id !== undefined)
      .map((id: any) => details.find((d: any) => d.kichCo?.idKichCo === id)?.kichCo);
  }



   // Xử lý chọn màu sắc
   selectColor(color: any) {
    this.selectedColor = color;
    this.filterProduct();
  }

  // Xử lý chọn kích cỡ
  selectSize(size: any) {
    this.selectedSize = size;
    this.filterProduct();
  }

  // Tìm sản phẩm chi tiết phù hợp
  filterProduct() {
    this.selectedProductDetail = this.sanPhamById.sanPhamChiTiets.find(
      (d: any) =>
        (!this.selectedColor || d.mauSac.idMauSac === this.selectedColor.idMauSac) &&
        (!this.selectedSize || d.kichCo.idKichCo === this.selectedSize.idKichCo)
    );
  }
  /** Hàm bắt sự kiện ghi dữ liệu giỏ hàng */
  handlecart(spct: any) {
    this.cartService.addToCart(spct);
  }

  /** Hàm bắt sự kiện chuyển hướng sang thanh toán */
  buyNow(id: number) {
    this.router.navigate([`/okconde/payment/${id}`]);
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
