import {HoaDonRequest} from "../../hoa-don/request/hoa-don-request";

export class LichSuHoaDonRequest {
  idLshd: number;

  maLichSuHoaDon: string;

  hanhDong: string;

  ngayTao?: Date | null;

  nguoiThucHien: string;

  trangThai: string;

  hoaDon: HoaDonRequest;

  constructor (data: Partial<LichSuHoaDonRequest> = {}){
    this.idLshd = data.idLshd || 0;
    this.maLichSuHoaDon = data.maLichSuHoaDon || '';
      this.hanhDong = data.hanhDong || '';
    this.ngayTao = data.ngayTao || null;
    this.nguoiThucHien = data.nguoiThucHien || '';
    this.trangThai = data.trangThai || '';
    this.hoaDon = data.hoaDon || {} as HoaDonRequest;
  }
}
