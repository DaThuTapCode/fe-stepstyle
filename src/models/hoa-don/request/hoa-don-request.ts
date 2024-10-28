import { HoaDonChiTietRequest } from "../../hoa-don-chi-tiet/request/hoa-don-chi-tiet-request";
import { KhachHangRequest } from "../../khach-hang/request/khach-hang-request";
import { LichSuHoaDonRequest } from "../../lich-su-hoa-don/request/lich-su-hoa-don-request";
import { NhanVienRequest } from "../../nhan-vien/request/nhan-vien-request";
import { PhieuGiamGiaRequest } from "../../phieu-giam-gia/request/phieu-giam-gia-request";
import { SanPhamChiTietRequest } from "../../san-pham-chi-tiet/request/san-pham-chi-tiet-request";
import { ThanhToanRequest } from "../../thanh-toan/request/thanh-toan-request";

export class HoaDonRequest {
  
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

  trangThai: string;

  khachHang: KhachHangRequest | undefined;

  nhanVien: NhanVienRequest | undefined;

  thanhToan: ThanhToanRequest | undefined;

  phieuGiamGia: PhieuGiamGiaRequest | undefined;

  hoaDonChiTiet: HoaDonChiTietRequest[];

  sanPhamChiTiet: SanPhamChiTietRequest[];

  lichSuHoaDon: LichSuHoaDonRequest[];

  constructor (data: Partial<HoaDonRequest> = {}){
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
    this.trangThai = data.trangThai || '';
    this.khachHang = data.khachHang || {} as KhachHangRequest;
    this.nhanVien = data.nhanVien || {} as NhanVienRequest;
    this.thanhToan = data.thanhToan || {} as ThanhToanRequest;
    this.phieuGiamGia = data.phieuGiamGia || {} as PhieuGiamGiaRequest;
    this.hoaDonChiTiet = data.hoaDonChiTiet || [];
    this.sanPhamChiTiet = data.sanPhamChiTiet || [];
    this.lichSuHoaDon = data.lichSuHoaDon || [];
  }
}
