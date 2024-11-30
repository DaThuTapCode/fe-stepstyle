import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart, registerables } from 'chart.js';
import { environment } from '../../../../../environments/environment';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-doanh-thu-ngay',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './doanh-thu-ngay.component.html',
  styleUrl: './doanh-thu-ngay.component.scss'
})

export class DoanhThuNgayComponent implements OnInit {
  months: string[] = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];
  years: number[] = [2024, 2023, 2022];  // Mảng năm, có thể lấy từ dữ liệu thực tế nếu cần
  selectedYear: number = new Date().getFullYear();  // Mặc định là năm hiện tại
  selectedMonth: number = new Date().getMonth() + 1;  // Mặc định là tháng hiện tại (tháng 1-12)
  private chart: Chart | null = null; // Biến lưu trữ biểu đồ
  urlBase = environment.apiUrl;

  constructor(private http: HttpClient) {
    Chart.register(...registerables);
  }


  onYearChange(event: any): void {
    const year = parseInt(event.target.value);
    this.selectedYear = year;  // Lưu năm đã chọn
    this.fetchDoanhThuThang(this.selectedMonth, this.selectedYear);  // Gọi lại API khi thay đổi năm
  }

  onMonthChange(event: any): void {
    const month = parseInt(event.target.value);
    this.selectedMonth = month;  // Lưu tháng đã chọn
    this.fetchDoanhThuThang(this.selectedMonth, this.selectedYear);  // Gọi lại API khi thay đổi tháng
  }



  fetchDoanhThuThang(thang: number, nam: number): void {
    this.http.get<any[]>(`${this.urlBase}/api/dashboard/doanh-thu-cac-ngay-trong-thang-nam?thang=${thang}&nam=${nam}`)
      .subscribe({
        next: (response: any) => {
          const ngay = response.data.map((item: { ngay: any; }) => item.ngay); // Lấy danh sách ngày
          const doanhThu = response.data.map((item: { doanhThu: any; }) => item.doanhThu); // Lấy danh sách doanh thu
  
          this.renderChart(ngay, doanhThu); // Render biểu đồ với dữ liệu mới
        },
        error: (err) => {
          console.error('Lỗi khi lấy dữ liệu doanh thu:', err);
        }
      });
  }
  


  renderChart(days: string[], revenue: number[]): void {
    const canvas = document.getElementById('doanhThuNgayChart') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    // Kiểm tra ctx có phải null không
    if (ctx) {
      // Hủy biểu đồ cũ nếu tồn tại
      if (this.chart) {
        this.chart.destroy();
      }

      // Tạo biểu đồ mới
      this.chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: days,
          datasets: [{
            label: 'Doanh thu',
            data: revenue,
            borderColor: 'rgba(75, 192, 192, 1)',
            fill: false,
          }]
        },
        options: {
          responsive: true,
          scales: {
            x: {
              title: {
                display: true,
                text: 'Ngày'
              }
            },
            y: {
              title: {
                display: true,
                text: 'Doanh thu (VND)'
              }
            }
          }
        }
      });
    } else {
      console.error('Không thể lấy ngữ cảnh vẽ từ canvas');
    }
  }

  

  ngOnInit(): void {
    const thangHienTai = new Date().getMonth() + 1; // Tháng hiện tại (1-12)
    const namHienTai = new Date().getFullYear();    // Năm hiện tại
    
    this.selectedYear = namHienTai;
    this.selectedMonth = thangHienTai;
  
    this.fetchDoanhThuThang(thangHienTai, namHienTai);  // Gọi API để lấy dữ liệu doanh thu cho tháng và năm hiện tại
  }
  

}
