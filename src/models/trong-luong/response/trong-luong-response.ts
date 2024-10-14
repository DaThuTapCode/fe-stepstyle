export class TrongLuongResponse {
  idTrongLuong: number;

  maTrongLuong: string;

  giaTri: string;

  moTa: string;

  trangThai: string;

  constructor(data: Partial<TrongLuongResponse> = {}) {
    this.idTrongLuong = data.idTrongLuong || 0;
    this.maTrongLuong = data.maTrongLuong || '';
    this.giaTri = data.giaTri || '';
    this.moTa = data.moTa || '';
    this.trangThai = data.trangThai || '';
  }
}
