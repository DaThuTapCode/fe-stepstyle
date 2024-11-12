import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailProductService } from '../../service/detail-product.service';
import { NotificationService } from '../../../../shared/notification.service';
import { SanPhamResponse } from '../../../../models/san-pham/response/san-pham-response';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss']
})
export class DetailProductComponent implements OnInit{

   /**Hứng sản phẩm được lấy theo id */
   sanPhamById: SanPhamResponse = new SanPhamResponse;

   /**id san pham */
   idSanPham!: number;

   constructor(
     private route: ActivatedRoute,
     private detailProductService: DetailProductService,
     private notiService: NotificationService
   ) {}

   /* Tải dữ liệu sản phẩm theo id */
   fetchSanPhamById() {
     this.detailProductService.callApiGetProductById(this.idSanPham).subscribe({
       next: (response: any) => {
         this.sanPhamById = response.data;
       },
       error: (error: any) => {
          console.error('Lỗi khi lấy sản phẩm với id', error);
          this.notiService.showError(error.error.message);
       }
     });
   }

   ngOnInit(): void {
     this.route.paramMap.subscribe(params => {
       this.idSanPham = Number(params.get('idProduct'));
       this.fetchSanPhamById();
     });
   }
}
