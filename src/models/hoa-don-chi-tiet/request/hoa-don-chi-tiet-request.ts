export class HoaDonChiTietRequest {
  idHoaDonChiTiet: number | null;

  idHoaDon: number;

  idSpct: number;

  maHoaDonChiTiet: string;

  soLuong: number;

  donGia: number;

  tongTien: number;

  trangThai: string;

  constructor (data: Partial<HoaDonChiTietRequest> = {}){
    this.idHoaDonChiTiet = data.idHoaDonChiTiet || 0;
    this.idHoaDon = data.idHoaDon || -1;
    this.idSpct = data.idSpct || -1;
    this.maHoaDonChiTiet = data.maHoaDonChiTiet || '';
    this.soLuong = data.soLuong || 1;
    this.donGia = data.donGia || 0;
    this.tongTien = data.tongTien || 0;
    this.trangThai = data.trangThai || '';
  }
}
