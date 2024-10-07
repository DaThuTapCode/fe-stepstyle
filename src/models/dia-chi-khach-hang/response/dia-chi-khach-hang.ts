
export class DiaChiKhachHang {

  idDiaChiKhachHang: number;

  quocGia: string;

  thanhPho: string;

  huyen: string;

  maPhuongXa: string;

  xa: string;

  duong: string;

  soNha: string;

  trangThai: string;


  constructor(data: Partial<DiaChiKhachHang> = {}) {
    this.idDiaChiKhachHang = data.idDiaChiKhachHang || 0;
    this.quocGia = data.quocGia || '';
    this.thanhPho = data.thanhPho || '';
    this.huyen = data.huyen || '';
    this.maPhuongXa = data.maPhuongXa || '';
    this.xa = data.xa || '';
    this.duong = data.duong || '';
    this.soNha = data.soNha || '';
    this.trangThai = data.trangThai || '';
  }
}
