import {DiaChiKhachHangResponse} from "../../dia-chi-khach-hang/response/dia-chi-khach-hang-response";

export class KhachHangResponse {

  idKhachHang: number;

  maKhachHang: string;

  tenKhachHang: string;

  soDienThoai: string;

  email: string;

  ngaySinh: Date | null;

  gioiTinh: boolean;

  ghiChu: string;

  ngayTao: Date | null;

  ngayChinhSua: Date | null;

  trangThai: string;

  diaChiKhachHangs: DiaChiKhachHangResponse[];

  constructor(data: Partial<KhachHangResponse> = {}) {
    this.idKhachHang = data.idKhachHang || 0;
    this.maKhachHang = data.maKhachHang || '';
    this.tenKhachHang = data.tenKhachHang || '';
    this.soDienThoai = data.soDienThoai || '';
    this.email = data.email || '';
    this.ngaySinh = data.ngaySinh || null;
    this.gioiTinh = data.gioiTinh || true;
    this.ghiChu = data.ghiChu || '';
    this.ngayTao = data.ngayTao || null;
    this.ngayChinhSua = data.ngayChinhSua || null;
    this.trangThai = data.trangThai || '';
    this.diaChiKhachHangs = data.diaChiKhachHangs || [];
  }
}
