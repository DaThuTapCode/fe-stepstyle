/**
 * Đối tượng kích cỡ hứng dữ liệu trả về từ BE
 */
export class KichCo {

  idKichCo: number;

  giaTri: number;

  moTa: string;

  trangThai: string;

  constructor(data: Partial<KichCo> = {}) {
      this.idKichCo = data.idKichCo || 0;
      this.giaTri = data.giaTri || 0;  // Sử dụng số thay vì chuỗi
      this.moTa = data.moTa || '';
      this.trangThai = data.trangThai || '';
  }
}
