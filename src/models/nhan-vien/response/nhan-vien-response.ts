import {ChucVuResponse} from "../../chuc-vu/response/chuc-vu-response";

export class NhanVienResponse {

  idNhanVien: number;

  maNhanVien: string;

  hoTen: string | '';
  matKhau: string;

  ngaySinh: Date | null;

  diaChi: string;

  gioiTinh: boolean;

  soDienThoai: string;

  email: string;

  ghiChu: string;

  anh: string;

  ngayTao: Date | null;

  ngayChinhSua: Date | null;

  trangThai: string;

  chucVu: ChucVuResponse;

  constructor(data: Partial<NhanVienResponse> = {}) {
    this.idNhanVien = data.idNhanVien || 0;
    this.maNhanVien = data.maNhanVien || '';
    this.matKhau = data.matKhau || '';
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
    this.trangThai = data.trangThai || '';
    this.chucVu = data.chucVu || {} as ChucVuResponse;
  }

}
