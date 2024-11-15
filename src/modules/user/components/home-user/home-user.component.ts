import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SanPhamResponse } from '../../../../models/san-pham/response/san-pham-response';
import { CommonModule } from '@angular/common';
import { DetailProductService } from '../../service/detail-product.service';
import { CartService } from '../../service/cart.service';

@Component({
  selector: 'app-home-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-user.component.html',
  styleUrl: './home-user.component.scss'
})
export class HomeUserComponent{

  sanPhamById: SanPhamResponse = new SanPhamResponse;
  sanPhams: SanPhamResponse[] = []; //Biến hứng dữ liệu

  /**id san pham */
  idSanPham!: number;

  constructor(
    private router: Router,
    private cartService: CartService
  ){}

   /** Hàm bắt sự kiện chuyển hướng xem chi tiết sản phẩm */
  navigate(idSanPham: number) {
    this.router.navigate([`/okconde/detail-product/${2}`]);
  }

hhe() {
  this.router.navigate(['/okconde/payment']);
}

  /** Hàm bắt sự kiện giỏ hàng */
fetchCart() {
  this.router.navigate([`/okconde/cart`])
}

/** Hàm bắt sự kiện ghi dữ liệu giỏ hàng */
handlecart(idSpct: number) {
  this.cartService.addToCart(idSpct)
}



}
