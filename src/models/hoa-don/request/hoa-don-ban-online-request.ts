import { StatusPTTT } from "../../../shared/status-pttt";
import { HoaDonChiTietBanOnlineRequest } from "../../hoa-don-chi-tiet/request/hoa-don-chi-tiet-ban-online-request";

export class HoaDonBanOnlineRequest {

     hoaDonChiTiets: HoaDonChiTietBanOnlineRequest[];

     tenKhachHang: string;

     diaChiGiaoHang: string;

     soDienThoaiKhachHang: string;

     ghiChu: string;

     thanhToan: StatusPTTT;

    constructor (data: Partial<HoaDonBanOnlineRequest> = {}){
        this.hoaDonChiTiets = data.hoaDonChiTiets || [];
        this.tenKhachHang = data.tenKhachHang || '';
        this.diaChiGiaoHang = data.diaChiGiaoHang || '';
        this.soDienThoaiKhachHang = data.soDienThoaiKhachHang || '';
        this.ghiChu = data.ghiChu || '';
        this.thanhToan = data.thanhToan || StatusPTTT.COD;
      }
}
