export class KieuDeGiayResponse {
  idKieuDeGiay: number;

  maKieuDeGiay: string;

  tenKieuDeGiay: string;

  giaTri: string;

  moTa: string;

  trangThai: string;

  constructor(data: Partial<KieuDeGiayResponse> = {}) {
    this.idKieuDeGiay = data.idKieuDeGiay || 0;
    this.maKieuDeGiay = data.maKieuDeGiay || '';
    this.tenKieuDeGiay = data.tenKieuDeGiay || '';
    this.giaTri = data.giaTri || '';
    this.moTa = data.moTa || '';
    this.trangThai = data.trangThai || '';
  }
}
