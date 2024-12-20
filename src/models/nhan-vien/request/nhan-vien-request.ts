export class NhanVienRequest {

  idNhanVien: number;

  maNhanVien: string;

  matKhau: string;

  hoTen: string;

  ngaySinh: Date | null | any;

  diaChi: string;

  gioiTinh: boolean;

  soDienThoai: string;

  email: string;

  ghiChu: string;

  anh: string;

  ngayTao: Date | null;

  ngayChinhSua: Date | null;

  trangThai: string;

  constructor(data: Partial<NhanVienRequest> = {}) {
    this.idNhanVien = data.idNhanVien || 0;
    this.maNhanVien = data.maNhanVien || '';
    this,this.matKhau = data.matKhau || '';
    this.hoTen = data.hoTen || '';
    this.ngaySinh = data.ngaySinh || null;
    this.diaChi = data.diaChi || '';
    this.gioiTinh = data.gioiTinh || true;
    this.soDienThoai = data.soDienThoai || '';
    this.email = data.email || '';
    this.ghiChu = data.ghiChu || '';
    this.anh = data.anh || '';
    this.ngayTao = data.ngayTao || null;
    this.ngayChinhSua = data.ngayChinhSua || null;
    this.trangThai = data.trangThai || 'ACTIVE';
  }

}
