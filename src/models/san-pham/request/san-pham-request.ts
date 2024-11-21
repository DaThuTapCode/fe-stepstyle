import {StatusSP} from "../../../shared/status-sp";
import { ChatLieuRequest } from "../../chat-lieu/request/chat-lieu-request";
import {DanhMucRequest} from "../../danh-muc/request/danh-muc-request";
import {SanPhamChiTietRequest} from "../../san-pham-chi-tiet/request/san-pham-chi-tiet-request";
import {ThuongHieuRequest} from "../../thuong-hieu/request/thuong-hieu-request";
import { TrongLuongRequest } from "../../trong-luong/request/trong-luong-request";

export class SanPhamRequest {
  idSanPham: number;

  maSanPham: string;

  tenSanPham: string;

  moTa: string;

  nguoiTao: string;

  trangThai: StatusSP;

  danhMuc: DanhMucRequest | undefined;

  thuongHieu: ThuongHieuRequest | undefined;

  chatLieu: ChatLieuRequest | undefined;

  trongLuong: TrongLuongRequest | undefined;

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
    this.chatLieu = data.chatLieu;
    this.trongLuong = data.trongLuong;
    this.sanPhamChiTiets = data.sanPhamChiTiets || [];
  }
}
