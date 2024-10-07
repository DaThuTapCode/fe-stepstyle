/**
 * Đối tượng kiểu đế giày hứng dữ liệu trả về từ BE
 */
export class KieuDeGiay {

  idKieuDeGiay: number;

  tenKieuDeGiay: string;

  giaTri: string;

  moTa: string;

  trangThai: string;

  constructor(data: Partial<KieuDeGiay> = {}) {
      this.idKieuDeGiay = data.idKieuDeGiay || 0;
      this.tenKieuDeGiay = data.tenKieuDeGiay || '';
      this.giaTri = data.giaTri || '';
      this.moTa = data.moTa || '';
      this.trangThai = data.trangThai || '';
  }
}
