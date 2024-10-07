/**
 * Đối tượng trọng lượng hứng dữ liệu trả về từ BE
 */
export class TrongLuong {

  idTrongLuong: number;

  giaTri: string;

  moTa: string;

  trangThai: string;

  constructor(data: Partial<TrongLuong> = {}) {
      this.idTrongLuong = data.idTrongLuong || 0;
      this.giaTri = data.giaTri || '';
      this.moTa = data.moTa || '';
      this.trangThai = data.trangThai || '';
  }
}
