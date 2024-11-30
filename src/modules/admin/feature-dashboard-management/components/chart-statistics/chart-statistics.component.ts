  import { Component, OnInit } from '@angular/core';
  import { Chart, registerables } from 'chart.js';
  
@Component({
  selector: 'app-chart-statistics',
  standalone: true,
  imports: [],
  templateUrl: './chart-statistics.component.html',
  styleUrl: './chart-statistics.component.scss'
})
export class ChartStatisticsComponent implements OnInit {

    constructor() {
      Chart.register(...registerables);
    }
  
    chart: any;
  
    ngOnInit(): void {
      this.createChart();
    }
  
    createChart() {
      this.chart = new Chart("MyChart", {
        type: 'bar', // Loại biểu đồ
        data: {
          labels: ['Ngày', 'Tháng', 'Năm'], // Trục X
          datasets: [
            {
              label: 'Doanh thu',
              data: [1000000, 30000000, 200000000], // Giá trị doanh thu mẫu
              backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726'], // Màu sắc
              borderColor: ['#1E88E5', '#43A047', '#FB8C00'], // Viền
              borderWidth: 1
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Thống kê doanh thu'
            }
          }
        }
      });
    }
  }
