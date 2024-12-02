import { Injectable } from "@angular/core";
import { PhieuGiamGiaResponse } from "../../models/phieu-giam-gia/response/phieu-giam-gia-response";
import { StatusLoaiGiam } from "../status-loaigiam";
import { PhieuGiamGiaRequest } from "../../models/phieu-giam-gia/request/phieu-giam-gia-request";
import { StatusPTTT } from "../status-pttt";
import { StatusHDCT } from "../status-hdct";
import { StatusHD } from "../status-hd";
import { LoaiHoaDon } from "../loaihoadon";

@Injectable({
    providedIn: 'root'
})
export class HamDungChung {
   /**
 * Định dạng giá trị giảm giá dựa vào loại giảm giá
 */
   formatGiaTriGiam(pgg: any): string {
    // Kiểm tra nếu đối tượng phieuGiamGia hoặc giá trị giảm giaTriGiam bị null hoặc undefined
    if (!pgg || !pgg.giaTriGiam) {
      return "N/A";  
    }

    if (pgg.loaiGiam === 'MONEY') {
      return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(pgg.giaTriGiam);
    } else if (pgg.loaiGiam === 'PERCENT') {
      return pgg.giaTriGiam + '%';
    }

    
    return pgg.giaTriGiam;
  }

   /**
 * Trả ra text cho loại giảm
 */
   getTextLoaiGiam(pgg: PhieuGiamGiaResponse | PhieuGiamGiaRequest): string {
    if(pgg.loaiGiam === StatusLoaiGiam.MONEY) {
      return 'Số tiền'
    }else {
      return 'Phần trăm'
    }
  }


  /** Hàm bắt dữ liệu trạng thái của hóa đơn */
  getInvoiceStatus(status: string): string {
    switch (status) {
      case StatusHD.PENDING:
        return 'Đang chờ thanh toán';
      case StatusHD.PENDINGPROCESSING:
        return 'Đang chờ xác nhận';
      case StatusHD.CONFIRMED:
        return 'Đã xác nhận';
      case StatusHD.SHIPPING:
        return 'Đang vận chuyển';
      case StatusHD.DELIVERED:
        return 'Đã giao hàng';
      case StatusHD.PAID:
        return 'Đã thanh toán';
      case StatusHD.CANCELLED:
        return 'Đã hủy';
      default:
        return 'Không xác định';
    }
  }

  /** Hàm bắt dữ liệu trạng thái của hóa đơn chi tiết */
  getInvoiceDetailStatus(status: string): string {
    switch (status) {
      case StatusHDCT.ACTIVE:
        return 'Đang hoạt động';
      case StatusHDCT.INACTIVE:
        return 'Ngừng hoạt động';
      default:
        return 'Không xác định';
    }
  }

  /** Hàm bắt dữ liệu trạng thái của lịch sủ hóa đơn */
  getInvoiceHistoryStatus(status: string): string {
    switch (status) {
      case StatusHDCT.ACTIVE:
        return 'Đang hoạt động';
      case StatusHDCT.INACTIVE:
        return 'Ngừng hoạt động';
      default:
        return 'Không xác định';
    }
  }


  /** Hàm bắt dữ liệu trạng thái của lịch sủ hóa đơn */
  getInvoicePaymentStatus(status: StatusPTTT): string {
    switch (status) {
      case StatusPTTT.CASH:
        return 'Tiền mặt';
      case StatusPTTT.COD:
        return 'COD';
      case StatusPTTT.VNPAY:
        return 'Chuyển khoản';
      default:
        return 'Không xác định';
    }
  }


   /** Hàm bắt dữ liệu loại hóa đơn */
   getInvoiceType(statusInvoieType: string): string {
    switch (statusInvoieType) {
      case LoaiHoaDon.COUNTERSALES:
        return 'Bán hàng tại quầy';
      case LoaiHoaDon.ONLINESALES:
        return 'Bán hàng trực tuyến';
      default:
        return 'Không xác định';
    }
  }

}