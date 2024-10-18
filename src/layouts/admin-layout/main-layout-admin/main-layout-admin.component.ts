import { Component, HostListener, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from "../../../shared/notification/notification.component";

@Component({
  selector: 'app-main-layout-admin',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    RouterOutlet,
    SidebarComponent,
    NotificationComponent
],
  templateUrl: './main-layout-admin.component.html',
  styleUrl: './main-layout-admin.component.scss'
})
export class MainLayoutAdminComponent implements OnInit{
  isSidebarCollapsed: boolean = false;

  constructor() {
    this.checkScreenSize(); // Gọi khi khởi tạo component
  }

  // Hàm này sẽ kiểm tra độ rộng màn hình và cập nhật biến `isSidebarCollapsed`
  checkScreenSize() {
    const screenWidth = window.innerWidth;
    if (screenWidth < 1000) {
      this.isSidebarCollapsed = false;  // Ẩn sidebar khi màn hình nhỏ hơn 1000px
    } else {
      this.isSidebarCollapsed = true; // Hiển thị sidebar khi màn hình lớn hơn 1000px
    }
  }

  // Lắng nghe sự kiện resize của cửa sổ
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkScreenSize();
  }

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  ngOnInit(): void {
    // Bạn có thể gọi checkScreenSize() ở đây nếu muốn kiểm tra độ rộng ngay khi component khởi tạo
    this.checkScreenSize();
  }
}
