export class KichCoRequest {
  idKichCo: number;

  maKichCo: string;

  giaTri: number;

  moTa: string;

  trangThai: string;

  constructor(data: Partial<KichCoRequest> = {}) {
    this.idKichCo = data.idKichCo || 0;
    this.maKichCo = data.maKichCo || '';
    this.giaTri = data.giaTri || 0;  // Sử dụng số thay vì chuỗi
    this.moTa = data.moTa || '';
    this.trangThai = data.trangThai || '';
  }
}
