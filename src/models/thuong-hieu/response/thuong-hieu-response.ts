export class ThuongHieuResponse {

  idThuongHieu: number;

  maThuongHieu: string;

  tenThuongHieu: string;

  xuatXu: string;

  moTa: string;

  trangThai: string;

  constructor(data: Partial<ThuongHieuResponse> = {}) {
    this.idThuongHieu = data.idThuongHieu || 0;
    this.maThuongHieu = data.maThuongHieu || '';
    this.tenThuongHieu = data.tenThuongHieu || '';
    this.xuatXu = data.xuatXu || '';
    this.moTa = data.moTa || '';
    this.trangThai = data.trangThai || '';
  }
}
