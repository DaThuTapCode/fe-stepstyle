export class MauSacResponse {
  idMauSac: number;

  maMauSac: string;

  tenMau: string;

  giaTri: string;

  moTa: string;

  trangThai: string;

  constructor(data: Partial<MauSacResponse> = {}) {
    this.idMauSac = data.idMauSac || 0;
    this.maMauSac = data.maMauSac || '';
    this.tenMau = data.tenMau || '';
    this.giaTri = data.giaTri || '';
    this.moTa = data.moTa || '';
    this.trangThai = data.trangThai || '';
  }
}
