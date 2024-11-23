import {HoaDonChiTietResponse} from "../../hoa-don-chi-tiet/response/hoa-don-chi-tiet-response";
import {ThanhToanResponse} from "../../thanh-toan/response/thanh-toan-response";
import {PhieuGiamGiaResponse} from "../../phieu-giam-gia/response/phieu-giam-gia-response";
import { KhachHangResponse } from "../../khach-hang/response/khach-hang-response";
import { NhanVienResponse } from "../../nhan-vien/response/nhan-vien-response";
import { SanPhamChiTietResponse } from "../../san-pham-chi-tiet/response/san-pham-chi-tiet-response";
import { LichSuHoaDonResponse } from "../../lich-su-hoa-don/response/lich-su-hoa-don-response";
import { StatusHD } from "../../../shared/status-hd";


export class HoaDonResponse {

  idHoaDon: number;

  maHoaDon: string;

  ngayTaoDon?: Date | null;

  phiVanChuyen: number;

  tongTien: number;

  tongTienSauGiam: number;

  ngayChinhSua?: Date | null;

  ngayXacNhan?: Date | null;

  ngayNhanHang?: Date | null;

  loaiHoaDon: string;

  tenKhachHang: string;

  diaChiGiaoHang: string;

  soDienThoaiKhachHang: string;

  ghiChu: string;

  trangThai: StatusHD;

  khachHang: KhachHangResponse;

  nhanVien: NhanVienResponse;

  thanhToan: ThanhToanResponse;

  phieuGiamGia: PhieuGiamGiaResponse;

  hoaDonChiTiet: HoaDonChiTietResponse[];

  sanPhamChiTiet: SanPhamChiTietResponse[];

  lichSuHoaDon: LichSuHoaDonResponse[];

  constructor (data: Partial<HoaDonResponse> = {}){
    this.idHoaDon = data.idHoaDon || 0;
    this.ngayTaoDon = data.ngayTaoDon || null;
    this.maHoaDon = data.maHoaDon || '';
    // Khởi tạo với 0 nếu không có giá trị
    this.phiVanChuyen = data.phiVanChuyen !== undefined ? data.phiVanChuyen : 0;
    this.tongTien = data.tongTien || 0;
    this.tongTienSauGiam = data.tongTienSauGiam || 0;
    this.ngayChinhSua = data.ngayChinhSua || null;
    this.ngayXacNhan = data.ngayXacNhan || null;
    this.ngayNhanHang = data.ngayNhanHang || null;
    this.loaiHoaDon = data.loaiHoaDon || '';
    this.tenKhachHang = data.tenKhachHang || '';
    this.diaChiGiaoHang = data.diaChiGiaoHang || '';
    this.soDienThoaiKhachHang = data.soDienThoaiKhachHang || '';
    this.ghiChu = data.ghiChu || '';
    this.trangThai = data.trangThai || StatusHD.TOTAL;
    this.khachHang = data.khachHang || {} as KhachHangResponse;
    this.nhanVien = data.nhanVien || {} as NhanVienResponse;
    this.thanhToan = data.thanhToan || {} as ThanhToanResponse;
    this.phieuGiamGia = data.phieuGiamGia || {} as PhieuGiamGiaResponse;
    this.hoaDonChiTiet = data.hoaDonChiTiet || [];
    this.sanPhamChiTiet = data.sanPhamChiTiet || [];
    this.lichSuHoaDon = data.lichSuHoaDon || [];
  }
}
