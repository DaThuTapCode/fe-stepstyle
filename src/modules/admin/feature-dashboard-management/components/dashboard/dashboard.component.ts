import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../service/dashboard.service';
import { NotificationService } from '../../../../../shared/notification.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartStatisticsComponent } from "../chart-statistics/chart-statistics.component";
import { DoanhThuNgayComponent } from "../doanh-thu-ngay/doanh-thu-ngay.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, ChartStatisticsComponent, DoanhThuNgayComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{

  /**Biến hứng doanh thu ngày */
  doanhThuNgay: number = 0;

  /**Biến hứng doanh thu tháng */
  doanhThuThang: number = 0;
  
  /**Biến hứng doanh thu năm */
  doanhThuNam: number = 0;

  currentDate: Date = new Date()
  constructor( 
    private dashboardService: DashboardService,
    private notiService: NotificationService
  ){}

  /** Tải dữ liệu cho doanh thu ngày */
  fetchDoanhThuNgay() {
    this.dashboardService.callAPILayDoanhThuNgay().subscribe({
      next: (response: any) => {
        this.doanhThuNgay = response.data;
      },
      error: (err: any) => {  
        console.log('Lấy doanh thu ngày hôm nay thất bại: ', err);
        this.notiService.showError(err.error.message);
      }
    })
  }

  /** Tải dữ liệu cho doanh thu thánh */
  fetchDoanhThuThang() {
    this.dashboardService.callAPILayDoanhThuThang().subscribe({
      next: (response: any) => {
        this.doanhThuThang = response.data;
      },
      error: (err: any) => {  
        console.log('Lấy doanh thu tháng này thất bại: ', err);
        this.notiService.showError(err.error.message);
      }
    })
  }

  /** Tải dữ liệu cho doanh thu ngày */
  fetchDoanhThuNam() {
    this.dashboardService.callAPILayDoanhThuNam().subscribe({
      next: (response: any) => {
        this.doanhThuNam = response.data;
      },
      error: (err: any) => {  
        console.log('Lấy doanh thu năm thất bại: ', err);
        this.notiService.showError(err.error.message);
      }
    })
  }

  ngOnInit(): void {
    this.fetchDoanhThuNgay();    
    this.fetchDoanhThuThang();    
    this.fetchDoanhThuNam();    
  }

  
}
