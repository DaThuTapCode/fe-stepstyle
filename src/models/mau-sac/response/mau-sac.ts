/**
 * Đối tượng màu sắc hứng dữ liệu trả về từ BE
 */
export class MauSac {

  idMauSac: number;

  tenMau: string;

  giaTri: string;

  moTa: string;

  trangThai: string;

  constructor(data: Partial<MauSac> = {}) {
      this.idMauSac = data.idMauSac || 0;
      this.tenMau = data.tenMau || '';
      this.giaTri = data.giaTri || '';
      this.moTa = data.moTa || '';
      this.trangThai = data.trangThai || '';
  }
}
