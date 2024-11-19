import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  /**Đường dẫn tới ảnh logo */
  logoBrandUrl: string = '/LogoStepStyle.png';

  /**Biến lưu trữ menu đang được xổ xuống*/
  expandedMenu: number | null = null;

  /**Biến lưu trữ menu cha nào đang được active */
  activeButton: number | null = null;

  /**Biến lưu trữ menu con nào đang dược active */
  activeSubmenu: number | null = null;

  /**Constructor */
  constructor(private router: Router) { }
  isActive(buttonNumber: number): boolean {
    return this.activeButton === buttonNumber;
  }

  /**Hàm gán chỉ số menu con đang được chọn */
  isSubmenuActive(subMenuNumber: number): boolean {
    return this.activeSubmenu === subMenuNumber;
  }

  /**Hàm để xổ xuống menu con*/
  toggleMenu(menuNumber: number): void {
    this.activeButton = menuNumber;
    this.expandedMenu = this.expandedMenu === menuNumber ? null : menuNumber;
    if (menuNumber === 1) {
      this.router.navigate(["/admin/dashboard"]);
    } else if (menuNumber === 2) {
      this.router.navigate(["/admin/counter-sales"]);
    } else if (menuNumber === 3) {
      this.router.navigate(["/admin/product"]);
    } else if (menuNumber === 4) {
      this.router.navigate(["/admin/invoice"]);
    } else if (menuNumber === 5) {
      this.router.navigate(["/admin/coupons"]);
    }
  }

  /**Hàm bắt sự kiện chuyển route khi bấm vào các menu */
  handleClickSubmenu(subMenuNumber: number) {
    this.activeSubmenu = subMenuNumber;
    if (subMenuNumber === 32) {
      this.router.navigate(['/admin/product-attribute']);
    } else if (subMenuNumber === 71) {
      this.router.navigate(['/admin/attribute/list']);
    } else if (subMenuNumber === 72) {
      this.router.navigate(['/admin/chatLieu/list']);
    } else if (subMenuNumber === 73) {
      this.router.navigate(['/admin/chatLieuDeGiay/list']);
    } else if (subMenuNumber === 75) {
      this.router.navigate(['/admin/kichCo/list']);
    } else if (subMenuNumber === 76) {
      this.router.navigate(['/admin/trongLuong/list']);
    } else if (subMenuNumber === 74) {
      this.router.navigate(['/admin/kieuDeGiay/list']);
    } else if (subMenuNumber === 61) {
      this.router.navigate(["/admin/employee/list"]);
    } else if (subMenuNumber === 62) {
      this.router.navigate(["/admin/customer/list"]);
    } else if (subMenuNumber === 41) {
      this.router.navigate(["/admin/invoice"]);
    } else if (subMenuNumber === 51) {
      this.router.navigate(["/admin/coupons"]);
    } else if (subMenuNumber === 77) {
      this.router.navigate(["/admin/thuongHieu/list"]);
    }

  }


  isExpanded(menuNumber: number): boolean {
    return this.expandedMenu === menuNumber;
  }

  /**Hàm check route để active menu theo chỉ số */
  checkMenuActiveByRoute() {
    // Lấy đường dẫn từ router để so sánh và active menu tương ứng
    let url = this.router.url;
    if (url === '/admin/dashboard') {
      this.toggleMenu(1);
    }else if (url === '/admin/counter-sales') {
      this.toggleMenu(2);
    } else if (url === '/admin/product') {
      this.toggleMenu(3);
      this.handleClickSubmenu(31);
    } else if (url === '/admin/product-attribute') {
      this.toggleMenu(3);
      this.handleClickSubmenu(32);
    }
  }

  ngOnInit(): void {
    this.checkMenuActiveByRoute();
  }
}
