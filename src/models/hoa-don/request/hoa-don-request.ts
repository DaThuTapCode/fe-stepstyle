
import {ThanhToanRequest} from "../../thanh-toan/request/thanh-toan-request";
import {PhieuGiamGiaRequest} from "../../phieu-giam-gia/request/phieu-giam-gia-request";
import {HoaDonChiTietRequest} from "../../hoa-don-chi-tiet/request/hoa-don-chi-tiet-request";


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

  // khachHang: KhachHang;

  // nhanVien: NhanVien;

  thanhToan: ThanhToanRequest;

  phieuGiamGia: PhieuGiamGiaRequest;

  hoaDonChiTiet: HoaDonChiTietRequest[];

  constructor (data: Partial<HoaDonRequest> = {}){
    this.idHoaDon = data.idHoaDon || 0;
    this.maHoaDon = data.maHoaDon || '';
    this.ngayTaoDon = data.ngayTaoDon || null;
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
    // this.khachHang = data.khachHang || {} as KhachHang;
    // this.nhanVien = data.nhanVien || {} as NhanVien;
    this.thanhToan = data.thanhToan || {} as ThanhToanRequest;
    this.phieuGiamGia = data.phieuGiamGia || {} as PhieuGiamGiaRequest;
    this.hoaDonChiTiet = data.hoaDonChiTiet || [];
  }
}
