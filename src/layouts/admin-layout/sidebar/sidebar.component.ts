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
  logoBrandUrl: string = '/LogoStepStyle.png';

  expandedMenu: number | null = null;

  activeButton: number | null = null;

  activeSubmenu: number | null = null;


  isAttributeMenuExpanded: boolean = false; // Biến theo dõi trạng thái menu thuộc tính

  constructor(private router: Router) { }
  isActive(buttonNumber: number): boolean {
    return this.activeButton === buttonNumber;
  }

  isSubmenuActive(subMenuNumber: number): boolean {
    return this.activeSubmenu === subMenuNumber;
  }

  toggleAttributeMenu() {
    this.isAttributeMenuExpanded = !this.isAttributeMenuExpanded; // Chuyển đổi trạng thái menu thuộc tính
  }

  toggleMenu(menuNumber: number): void {
    this.activeButton = menuNumber;
    this.expandedMenu = this.expandedMenu === menuNumber ? null : menuNumber;
    if (menuNumber === 1) {
      this.router.navigate(["/admin/dashboard"]);
    }
  }

  handleClickSubmenu(subMenuNumber: number) {
    this.activeSubmenu = subMenuNumber;
    if (subMenuNumber === 31) {
      this.router.navigate(['/admin/product']);
    } else if (subMenuNumber === 32) {
      this.router.navigate(['/admin/product-attribute']);
    } else if (subMenuNumber === 33) {
      this.router.navigate(['/admin/attribute/list']);
    } else if (subMenuNumber === 34) {
      this.router.navigate(['/admin/chatLieu/list']);
    } else if (subMenuNumber === 35) {
      this.router.navigate(['/admin/chatLieuDeGiay/list']);
    } else if (subMenuNumber === 36) {
      this.router.navigate(['/admin/kichCo/list']);
    } else if (subMenuNumber === 37) {
      this.router.navigate(['/admin/trongLuong/list']);
    } else if (subMenuNumber === 38) {
      this.router.navigate(['/admin/kieuDeGiay/list']);
    } else if (subMenuNumber === 61) {
      this.router.navigate(["/admin/employee/list"]);
    } else if (subMenuNumber === 62) {
      this.router.navigate(["/admin/customer/list"]);
    }
  }


    isExpanded(menuNumber: number): boolean {
      return this.expandedMenu === menuNumber;
    }

    ngOnInit(): void {
      this.checkMenuActiveByRoute();
    }

    checkMenuActiveByRoute(){
      let url = this.router.url;
      if (url === '/admin/dashboard') {
        this.toggleMenu(1);
      } else if (url === '/admin/product') {
        this.toggleMenu(3);
        this.handleClickSubmenu(31);
      } else if (url === '/admin/product-attribute') {
        this.toggleMenu(3);
        this.handleClickSubmenu(32);
      }
    }

  }
