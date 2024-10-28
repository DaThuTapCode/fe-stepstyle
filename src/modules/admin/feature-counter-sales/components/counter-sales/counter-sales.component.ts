import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CounterSalesService } from '../../service/counter-sales.service';
import { NotificationService } from '../../../../../shared/notification.service';

@Component({
  selector: 'app-counter-sales',
  standalone: true,
  imports: [CommonModule],
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
  ) { }

  /**Tải dữ liệu cho danh sách hóa đơn chờ thanh toán */  
  fetchListPendingInvoice() {
    this.counterSalesService.callApiGetListPendingInvoiceCounterSales().subscribe({
      next: (response: any) => {
        this.listPendingInvoice = response.data;
      },
      error: (err: any) => {

      }
    })
  }

  /**Hàm bắt sự kiện tạo hóa đơn chờ mới */
  handleCreatePendingInvoice() {
    throw new Error('Method not implemented.');
  }

  /**Khởi tạo dữ liệu */
  ngOnInit(): void {
    this.fetchListPendingInvoice();
  }
}
