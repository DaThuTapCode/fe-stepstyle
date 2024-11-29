import { StatusPTTT } from "../../../shared/status-pttt";
import { HoaDonChiTietBanOnlineRequest } from "../../hoa-don-chi-tiet/request/hoa-don-chi-tiet-ban-online-request";
import { KhachHangRequest } from "../../khach-hang/request/khach-hang-request";
import { PhieuGiamGiaRequest } from "../../phieu-giam-gia/request/phieu-giam-gia-request";

export class HoaDonBanOnlineRequest {

     hoaDonChiTiets: HoaDonChiTietBanOnlineRequest[];

     khachHang: KhachHangRequest;

     phieuGiamGia: PhieuGiamGiaRequest;

     tongTien: number; 

     phiVanChuyen: number;
    
     tongTienSauGiam: number;

     tenKhachHang: string;

     diaChiGiaoHang: string;

     soDienThoaiKhachHang: string;

     ghiChu: string;

     thanhToan: StatusPTTT;

    constructor (data: Partial<HoaDonBanOnlineRequest> = {}){
        this.hoaDonChiTiets = data.hoaDonChiTiets || [];
        this.khachHang = data.khachHang || {} as KhachHangRequest;
        this.phieuGiamGia = data.phieuGiamGia || {} as PhieuGiamGiaRequest;
        this.tenKhachHang = data.tenKhachHang || '';
        this.tongTien = data.tongTien || 0;
        this.phiVanChuyen = data.phiVanChuyen || 30000;
        this.tongTienSauGiam = data.tongTienSauGiam || 0;
        this.diaChiGiaoHang = data.diaChiGiaoHang || '';
        this.soDienThoaiKhachHang = data.soDienThoaiKhachHang || '';
        this.ghiChu = data.ghiChu || '';
        this.thanhToan = data.thanhToan || StatusPTTT.COD;
      }
}
