import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CounterSalesService } from '../../service/counter-sales.service';
import { NotificationService } from '../../../../../shared/notification.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

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

  /**Biến tạo hóa đơn chi tiết mới */
  newDetailInvoie: any = {
    
  }

  /**Constructor */
  constructor(
    private counterSalesService: CounterSalesService,
    private notiService: NotificationService,
    private route: ActivatedRoute
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

  /**Hàm gọi API lấy danh sách hóa đơn chi tiết theo ID hóa đơn */
  fecthListDetailInvoiceById(idHoaDon: number) {
    this.counterSalesService.callApiGetListDetailInvoice(idHoaDon).subscribe({
      next: (response: any) => {
        this.listDetailInvoiceByIdInvoice = response.data;
      },
      error: (err: any) => {
        this.notiService.showError('Không thể tải danh sách hóa đơn chi tiết');
      }
    })
  }

  /**Hàm bắt sự kiện chọn hóa đơn chờ để xem chi tiêt */
  onSelectInvoice(idHoaDon: number){
    this.fecthListDetailInvoiceById(idHoaDon); //Gọi phương thức lấy chi tiết hóa đơn
  }

  /**Hàm bắt sự kiện tạo hóa đơn chờ mới */
  handleCreatePendingInvoice() {
    throw new Error('Method not implemented.');
  }

  /** Hàm chạy khởi tạo các dữ liệu */
  ngOnInit(): void {
    /**Lấy id Hóa đơn từ đương dẫn */
    this.fetchListPendingInvoice();
    this.route.paramMap.subscribe(params => {
      const idHoaDon = Number(params.get('id'));
      if (idHoaDon) {
        this.fecthListDetailInvoiceById(idHoaDon);  // Lấy dữ liệu khách hàng
      }
    });
  }
}
