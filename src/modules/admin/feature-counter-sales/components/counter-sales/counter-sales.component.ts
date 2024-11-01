import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CounterSalesService } from '../../service/counter-sales.service';
import { NotificationService } from '../../../../../shared/notification.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-counter-sales',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './counter-sales.component.html',
  styleUrl: './counter-sales.component.scss'
})
export class CounterSalesComponent implements OnInit {

  /**Biến hứng dữ liệu cho danh sách hóa đơn chờ thanh toán */
  listPendingInvoice: any[] = [];

  /**Biến hứng dữ liệu cho danh sách sản phẩm chi tiết  */
  listProductDetail: any[] = [];

  /**Biến hứng dữ liệu cho danh sách hóa đơn chi tiết lấy theo id hóa đơn */
  listDetailInvoiceByIdInvoice: any[] = [];

  /**Constructor */
  constructor(
    private counterSalesService: CounterSalesService,
    private notiService: NotificationService
  ) { };

  /**Tải dữ liệu cho danh sách hóa đơn chờ thanh toán */  
  fetchListPendingInvoice() {
    this.counterSalesService.callApiGetListPendingInvoiceCounterSales().subscribe({
      next: (response: any) => {
        this.listPendingInvoice = response.data;
      },
      error: (err: any) => {

      }
    })
  };

  /**Hàm bắt sự kiện tạo hóa đơn chờ mới */
  handleCreatePendingInvoice() {
    this.counterSalesService.callApiCreateNewPendingInvoice().subscribe({
      next: (response: any) => {
        if(response.status === 200){
          this.fetchListPendingInvoice();
          this.notiService.showSuccess(response.message);
          this.activeTab = this.listPendingInvoice.length;
        }
      },
      error: (err: any) => {
        this.notiService.showError(err.error.message);
      }
    })
  };

  /**Hàm bắt sự kiện xem chi tiết hóa đơn chờ  */
  handleViewDetailPendingInvoice(idHoaDon: number) {
    this.fetchListPendingInvoice();
  };

  bills = [
    { id: 1, name: "Hóa đơn 1", details: "Chi tiết hóa đơn 1" },
    { id: 2, name: "Hóa đơn 2", details: "Chi tiết hóa đơn 2" },
    { id: 3, name: "Hóa đơn 3", details: "Chi tiết hóa đơn 3" },
    // thêm hóa đơn khác nếu cần
  ];
  activeTab = 0; // Tab mặc định

  /**Khởi tạo dữ liệu */
  ngOnInit(): void {
    this.fetchListPendingInvoice();
  };
}
