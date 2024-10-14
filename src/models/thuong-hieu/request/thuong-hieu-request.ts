export class ThuongHieuRequest {
  idThuongHieu: number;

  maThuongHieu: string;

  tenThuongHieu: string;

  xuatXu: string;

  moTa: string;

  constructor(data: Partial<ThuongHieuRequest> = {}) {
    this.idThuongHieu = data.idThuongHieu || 0;
    this.maThuongHieu = data.maThuongHieu || '';
    this.tenThuongHieu = data.tenThuongHieu || '';
    this.xuatXu = data.xuatXu || '';
    this.moTa = data.moTa || '';
  }
}
