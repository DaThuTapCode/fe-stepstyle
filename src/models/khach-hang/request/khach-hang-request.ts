import { DiaChiKhachHangRequest } from "../../dia-chi-khach-hang/request/dia-chi-khach-hang-request";

export class KhachHangRequest {

  idKhachHang: number;

  maKhachHang: string;

  tenKhachHang: string;

  soDienThoai: string;

  email: string;

  ngaySinh: Date | null | any;

  gioiTinh: boolean;

  ghiChu: string;

  ngayTao: Date | null;

  ngayChinhSua: Date | null;

  trangThai: string;

  diaChiKhachHangs: DiaChiKhachHangRequest[];

  constructor(data: Partial<KhachHangRequest> = {}) {
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
    this.trangThai = data.trangThai || 'ACTIVE';
    this.diaChiKhachHangs = data.diaChiKhachHangs || [];
  }

}
