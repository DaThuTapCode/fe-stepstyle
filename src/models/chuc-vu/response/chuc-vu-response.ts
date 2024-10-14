export class ChucVuResponse {

  idChucVu: number;

  maChucVu: string;

  tenChucVu: string;

  moTa: string;

  trangThai: string;

  constructor(data: Partial<ChucVuResponse> = {}) {
    this.idChucVu = data.idChucVu || 0;
    this.maChucVu = data.maChucVu || '';
    this.tenChucVu = data.tenChucVu || '';
    this.moTa = data.moTa || '';
    this.trangThai = data.trangThai || '';
  }

}
