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

  constructor(
   private router: Router
  ) {

  }
  isActive(buttonNumber: number): boolean {
    return this.activeButton === buttonNumber;
  }

  isSubmenuActive(subMenuNumber: number): boolean {
    return this.activeSubmenu === subMenuNumber;
  }

  toggleMenu(menuNumber: number): void {
    this.activeButton = menuNumber;
    this.expandedMenu = this.expandedMenu === menuNumber ? null : menuNumber;
    if(menuNumber === 1) {
      this.router.navigate(["/admin/dashboard"]);
    }
  }

  handleClickSubmenu(subMenuNumber: number) {
    this.activeSubmenu = subMenuNumber;
    if(subMenuNumber === 31) {
      this.router.navigate(["/admin/product"]);
    }else if(subMenuNumber === 32) {
      this.router.navigate(["/admin/product-attribute"]);
    }
  }

  isExpanded(menuNumber: number): boolean {
    return this.expandedMenu === menuNumber;
  }

  ngOnInit(): void {

  }
}
