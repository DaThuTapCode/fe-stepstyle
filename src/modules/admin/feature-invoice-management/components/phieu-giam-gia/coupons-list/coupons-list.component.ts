import { Component, OnInit } from '@angular/core';
import { PhieuGiamGiaResponse } from '../../../../../../models/phieu-giam-gia/response/phieu-giam-gia-response';
import { PhieuGiamGiaSearch } from '../../../../../../models/phieu-giam-gia/request/phieu-giam-gia-search';
import { CouponsService } from '../../../services/coupons.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { NotificationService } from '../../../../../../shared/notification.service';
import { data } from 'jquery';
import { Pagination } from '../../../../../../shared/type/pagination';
import { SttUtilsService } from '../../../../../../shared/helper/stt-utils.service';
import { StatusLoaiGiam } from '../../../../../../shared/status-loaigiam';
import { StatusPGG } from '../../../../../../shared/status-pgg';
import { HamDungChung } from '../../../../../../shared/helper/ham-dung-chung';




@Component({
  selector: 'app-coupons-list',
  standalone: true,
  imports: [CommonModule, FormsModule, MatTabsModule],
  templateUrl: './coupons-list.component.html',
  styleUrl: './coupons-list.component.scss'
})
export class CouponsListComponent implements OnInit {

  /** Biến hứng dữ liệu */
  phieuGiamGias: PhieuGiamGiaResponse[] = [];

  /** Biến gửi dữ liệu tìm kiếm */
  phieuGiamGiaSearch: PhieuGiamGiaSearch = {
    maPhieuGiamGia: null,
    tenPhieuGiamGia: null,
    ngayBatDau: null,
    ngayKetThuc: null,
    loaiGiam: null,
    trangThai: null
  };


  /** Biến gọi số lượng phiếu giảm giá */
  couponsCount: number = 0;
  couponsTotalCount: number = 0;
  couponsActiveCount: number = 0;
  couponsComingSoonCount: number = 0;
  couponsExpiredCount: number = 0;
  couponsCanceledCount: number = 0;

  /** Biến enum Phiếu giảm giá để sử dụng trong template */
  /** Khai báo enum PGG */
  StatusPGG = StatusPGG

  // Chuyển đổi enum thành mảng
  statusList: string[] = Object.values(StatusPGG);

  /** Biến cho trạng thái lọc */
  selectedStatus: string | null = null; // Biến để lưu trạng thái đã chọnF

  //Phân trang 
  paginatinonOfPGG: Pagination = {
    size: 10,
    page: 0,
    totalElements: 0,
    totalPages: 0,
    first: false,
    last: false
  }

  /** Biến để lưu ID intervalid cho việc dừng lại say này */
  private intervalId: any;


  constructor(
    private couPonsService: CouponsService,
    private notificationService: NotificationService,
    private sttService: SttUtilsService,
    private router: Router,
    public hamDungChung: HamDungChung
  ) { }

  /** Hàm bắt dữ liệu trạng thái của phiếu giảm giá */
  getCouponsStatusPGG(status: string): string {
    switch (status) {
      case StatusPGG.ACTIVE:
        return 'Đang hoạt động';
      case StatusPGG.COMINGSOON:
        return 'Sắp diễn ra';
      case StatusPGG.EXPIRED:
        return 'Đã kết thúc';
      case StatusPGG.CANCELLED:
        return 'Đã bị hủy';
      default:
        return 'Không xác định';
    }
  }

  // /** Hàm bắt dữ liệu loại giảm của phiếu giảm giá */
  // getCouponsStatusLoaiGiam(status: string): string {
  //   switch (status) {
  //     case StatusLoaiGiam.PERCENT:
  //       return 'Phần trăm';
  //     case StatusLoaiGiam.MONEY:
  //       return 'Số tiền';
  //     default:
  //       return 'Không xác định';
  //   }
  // }

  /** Hàm tìm kiếm phiếu giảm giá */
  searchCoupons() {
    // Thiết lập tìm kiếm mã và tên
    this.phieuGiamGiaSearch.maPhieuGiamGia;
    this.phieuGiamGiaSearch.tenPhieuGiamGia;
    this.fetchDataSearchPhieuGiamGia();
  }

  /** Hàm lọc phiếu giảm giá theo trạng thái */
  filterByStatus() {
    this.phieuGiamGiaSearch.trangThai = this.selectedStatus || null;
    this.fetchDataSearchPhieuGiamGia();
  }


  /** Hàm phân trang Phiếu Giảm Giá */
  fetchDataSearchPhieuGiamGia() {
    this.couPonsService.searchPageCoupons(this.phieuGiamGiaSearch, this.paginatinonOfPGG.page, this.paginatinonOfPGG.size).subscribe({
      next: (response: any) => {
        this.phieuGiamGias = response.data.content;
        // this.couponsCount = this.phieuGiamGias.length;
        this.paginatinonOfPGG.totalPages = response.data.totalPages;
        this.paginatinonOfPGG.totalElements = response.data.totalElements;
        this.paginatinonOfPGG.page = response.data.pageable.pageNumber;
        this.paginatinonOfPGG.first = response.data.first;
        this.paginatinonOfPGG.last = response.data.last;
        this.getCouponsCountByStatus();
      },
      error: (err: any) => {
        console.error('Lỗi khi tìm kiếm Phiếu giảm giá', err);

      }
    })
  }

  /** Hàm lấy số lượng phiếu giảm giá theo trạng thái */
  getCouponsCountByStatus() {
    this.couPonsService.getCouponsCount().subscribe({
      next: (response: any) => {
        this.couponsTotalCount = response.TOTAL || 0;
        this.couponsActiveCount = response.ACTIVE || 0;
        this.couponsComingSoonCount = response.COMINGSOON || 0;
        this.couponsExpiredCount = response.EXPIRED || 0;
        this.couponsCanceledCount = response.CANCELLED || 0;
      },
      error: (err: any) => {
        this.notificationService.showError(err.error.message);
        console.error('Lỗi khi hiển thị số lượng hóa đơn theo trạng thái', err);
      }
    });
  }

  /** Hàm bắt sư kiện thay đổi trang cho tất cả phiếu giảm giá */
  changePage(pageNew: number) {
    this.paginatinonOfPGG.page = pageNew;
    this.fetchDataSearchPhieuGiamGia();
  }

  /** Hàm reset tìm kiếm */
  resetSearch() {
    this.phieuGiamGiaSearch = {
      maPhieuGiamGia: null,
      tenPhieuGiamGia: null,
      ngayBatDau: null,
      ngayKetThuc: null,
      loaiGiam: null,
      trangThai: null
    };
    this.paginatinonOfPGG.page = 0;
    this.fetchDataSearchPhieuGiamGia();
  }

  /**
 * Định dạng giá trị giảm giá dựa vào loại giảm giá
 */
  formatGiaTriGiam(phieuGiamGia: any): string {
    // Kiểm tra nếu đối tượng phieuGiamGia hoặc giá trị giảm giaTriGiam bị null hoặc undefined
    if (!phieuGiamGia || !phieuGiamGia.giaTriGiam) {
      return "N/A";  
    }

    if (phieuGiamGia.loaiGiam === 'MONEY') {
      return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(phieuGiamGia.giaTriGiam);
    } else if (phieuGiamGia.loaiGiam === 'PERCENT') {
      return phieuGiamGia.giaTriGiam + '%';
    }

    
    return phieuGiamGia.giaTriGiam;
  }



  /** Dữ liệu phiếu giảm giá được chọn để xem */
  selectedCoupons: PhieuGiamGiaResponse = {
    idPhieuGiamGia: 0,
    maPhieuGiamGia: '',
    tenPhieuGiamGia: '',
    moTa: '',
    loaiGiam: StatusLoaiGiam.MONEY,
    giaTriGiamToiDa: 0,
    giaTriHoaDonToiThieu: 0,
    giaTriGiam: 0,
    trangThai: StatusPGG.ACTIVE,
    soLuong: 0
  };

  /** Hàm bắt sự kiện chi tiết phiếu giảm giá */
  handleDetailPhieuGiamGia(phieuGiamGia: any): void {
    this.selectedCoupons = phieuGiamGia;
  }

  /** Hàm bắt sự kiện thêm phiếu giảm giá */
  handleCreatePhieuGiamGia() {
    this.router.navigate([`/admin/coupons/create`]);
  }

  /**Tính stt */
  tinhSTT(page: number, size: number, current: number): number {
    return this.sttService.tinhSTT(page, size, current);
  }

  /**Hàm bắt sự kiện đổi trang bảng phiếu giảm giá */
  handlePagePGGChange(type: string) {
    if (type === 'pre') {
      this.paginatinonOfPGG.page -= 1;
    } else if (type === 'next') {
      this.paginatinonOfPGG.page += 1;
    }
    this.fetchDataSearchPhieuGiamGia();
  }

  /** Hàm bắt sự kiện cập nhật phiếu giảm giá */
  handleUpdatePhieuGiamGia(idPhieuGiamGia: number) {
    const selectedCoupon = this.phieuGiamGias.find(coupon => coupon.idPhieuGiamGia === idPhieuGiamGia);

    // Kiểm tra xem phiếu giảm giá có trạng thái EXPIRED hay không
    if (selectedCoupon && selectedCoupon.trangThai === StatusPGG.EXPIRED) {
      this.notificationService.showError('Không thể cập nhật phiếu giảm giá đã hết hạn.'); 
      return; 
    }

    this.router.navigate([`/admin/coupons/update/${idPhieuGiamGia}`]);
  }

  /** Hàm kết thúc chương trình khuyến mãi */
  handleEndPromotion(idPhieuGiamGia: number) {
    if(!confirm('Bạn có muốn kết thúc nhanh phiếu giảm giá này?')){
      return;
    }
    
    const data = { trangThai: StatusPGG.EXPIRED };
    this.couPonsService.endPromotion(idPhieuGiamGia, data).subscribe({
      next: (response: any) => {
        this.notificationService.showSuccess(response.message);
        this.fetchDataSearchPhieuGiamGia(); 
        this.getCouponsCountByStatus();
      },
      error: (err) => {
        this.notificationService.showError(err.error.message);
      }
    });
  }

  /** Hàm lấy các phiếu giảm giá hết hạn và cập nhật trạng thái */
  getExpiredActiveCoupons() {
    this.couPonsService.getExpiredActiveCoupons().subscribe({
      next: (response) => {
        this.fetchDataSearchPhieuGiamGia(); 
      },
      error: (err) => {
        this.notificationService.showWarning(err.error.message);
        console.error('Lỗi khi lấy phiếu giảm giá hết hạn', err);
      }
    });
  }

  ngOnDestroy(): void {
    // Dừng interval khi component bị hủy
    clearInterval(this.intervalId);
  }

  ngOnInit(): void {
    this.fetchDataSearchPhieuGiamGia();
    this.getCouponsCountByStatus();

    // Khởi tạo luồng quét cơ sở dữ liệu mỗi 1 phút
    this.intervalId = setInterval(() => {
      this.getExpiredActiveCoupons();
    }, 6000); // Cứ một 1 phút quét một lần
  }
}
