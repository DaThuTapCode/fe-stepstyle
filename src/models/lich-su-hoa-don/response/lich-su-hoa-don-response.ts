import {HoaDonResponse} from "../../hoa-don/response/hoa-don-response";

export class LichSuHoaDonResponse {
  idLshd: number;

  maLichSuHoaDon: string;

  hanhDong: string;

  ngayTao?: Date | null;

  nguoiThucHien: string;

  trangThai: string;

  hoaDon: HoaDonResponse;

  constructor (data: Partial<LichSuHoaDonResponse> = {}){
    this.idLshd = data.idLshd || 0;
    this.maLichSuHoaDon = data.maLichSuHoaDon || '',
      this.hanhDong = data.hanhDong || '';
    this.ngayTao = data.ngayTao || null;
    this.nguoiThucHien = data.nguoiThucHien || '';
    this.trangThai = data.trangThai || '';
    this.hoaDon = data.hoaDon || {} as HoaDonResponse;
  }
}
