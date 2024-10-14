import {StatusSP} from "../../../shared/status-sp";
import {DanhMucRequest} from "../../danh-muc/request/danh-muc-request";
import {SanPhamChiTietRequest} from "../../san-pham-chi-tiet/request/san-pham-chi-tiet-request";
import {ThuongHieuRequest} from "../../thuong-hieu/request/thuong-hieu-request";

export class SanPhamRequest {
  idSanPham: number;

  maSanPham: string;

  tenSanPham: string;

  moTa: string;

  nguoiTao: string;

  trangThai: StatusSP;

  danhMuc: DanhMucRequest | undefined;

  thuongHieu: ThuongHieuRequest | undefined;

  sanPhamChiTiets: SanPhamChiTietRequest[];

  constructor(data: Partial<SanPhamRequest> = {}) {
    this.idSanPham = data.idSanPham || 0;
    this.maSanPham = data.maSanPham || '';
    this.tenSanPham = data.tenSanPham || '';
    this.moTa = data.tenSanPham || '';
    this.nguoiTao = data.tenSanPham || '';
    this.trangThai = data.trangThai || StatusSP.ACTIVE;
    this.danhMuc = data.danhMuc;
    this.thuongHieu = data.thuongHieu;
    this.sanPhamChiTiets = data.sanPhamChiTiets || [];
  }
}
