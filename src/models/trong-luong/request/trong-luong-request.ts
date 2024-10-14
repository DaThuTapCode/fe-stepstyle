export class TrongLuongRequest {
  idTrongLuong: number;

  maTrongLuong: string;

  giaTri: string;

  moTa: string;

  trangThai: string;

  constructor(data: Partial<TrongLuongRequest> = {}) {
    this.idTrongLuong = data.idTrongLuong || 0;
    this.maTrongLuong = data.maTrongLuong || '';
    this.giaTri = data.giaTri || '';
    this.moTa = data.moTa || '';
    this.trangThai = data.trangThai || '';
  }
}
