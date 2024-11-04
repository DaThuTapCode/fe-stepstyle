export class DiaChiKhachHangResponse {

  idDiaChiKhachHang: number;

  maDiaChiKhachHang: string;

  idTinh: string;

  tenTinh: string;

  idQuanHuyen: string;

  tenQuanHuyen: string;

  maPhuongXa: string;

  tenPhuongXa: string;

  diaChiChiTiet: string;

  trangThai: string;


  constructor(data: Partial<DiaChiKhachHangResponse> = {}) {
    this.idDiaChiKhachHang = data.idDiaChiKhachHang || 0;
    this.maDiaChiKhachHang = data.maDiaChiKhachHang || '';
    this.idTinh = data.idTinh || '';
    this.tenTinh = data.tenTinh || '';
    this.idQuanHuyen = data.idQuanHuyen || '';
    this.tenQuanHuyen = data.tenQuanHuyen || '';
    this.maPhuongXa = data.maPhuongXa || '';
    this.tenPhuongXa = data.tenPhuongXa || '';
    this.diaChiChiTiet = data.diaChiChiTiet || '';
    this.trangThai = data.trangThai || '';
  }
}
