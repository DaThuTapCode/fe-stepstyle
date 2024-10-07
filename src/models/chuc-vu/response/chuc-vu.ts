export class ChucVu {

  idChucVu: number;

  tenChucVu: string;

  moTa: string;

  trangThai: string;

  constructor(data: Partial<ChucVu> = {}) {
    this.idChucVu = data.idChucVu || 0;
    this.tenChucVu = data.tenChucVu || '';
    this.moTa = data.moTa || '';
    this.trangThai = data.trangThai || '';
  }
}
