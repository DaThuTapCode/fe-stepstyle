import {DiaChiKhachHang} from "../../dia-chi-khach-hang/response/dia-chi-khach-hang";


export class KhachHang {

  idKhachHang: number;

  tenKhachHang: string;

  soDienThoai: string;

  email: string;

  ngaySinh: Date | null;

  gioiTinh: boolean;

  ghiChu: string;

  ngayTao: Date | null;

  ngayChinhSua: Date | null;

  trangThai: string;

  diaChiKhachHangs: DiaChiKhachHang[];

  constructor(data: Partial<KhachHang> = {}) {
    this.idKhachHang = data.idKhachHang || 0;
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
