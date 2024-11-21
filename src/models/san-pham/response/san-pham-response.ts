import {StatusSP} from "../../../shared/status-sp";
import {DanhMucResponse} from "../../danh-muc/response/danh-muc-response";
import {ThuongHieuResponse} from "../../thuong-hieu/response/thuong-hieu-response";
import {SanPhamChiTietResponse} from "../../san-pham-chi-tiet/response/san-pham-chi-tiet-response";
import { ChatLieuResponse } from "../../chat-lieu/response/chat-lieu-response";
import { TrongLuongResponse } from "../../trong-luong/response/trong-luong-response";

export class SanPhamResponse {
  idSanPham: number;

  maSanPham: string;

  tenSanPham: string;

  moTa: string;

  ngayTao: Date| null;

  ngayChinhSua: Date | null;

  nguoiTao: string;

  trangThai: StatusSP;

  danhMuc: DanhMucResponse;

  thuongHieu: ThuongHieuResponse;

  chatLieu: ChatLieuResponse;

  trongLuong: TrongLuongResponse;

  sanPhamChiTiets: SanPhamChiTietResponse[] | [];

  constructor(data: Partial<SanPhamResponse> = {}) {
    this.idSanPham = data.idSanPham || 0;
    this.maSanPham = data.maSanPham || '';
    this.tenSanPham = data.tenSanPham || '';
    this.moTa = data.moTa || '';
    this.ngayTao = data.ngayTao || null;
    this.ngayChinhSua = data.ngayChinhSua || null;
    this.nguoiTao = data.nguoiTao || '';
    this.trangThai = data.trangThai || StatusSP.ACTIVE;
    this.danhMuc = data.danhMuc as DanhMucResponse;
    this.thuongHieu = data.thuongHieu as ThuongHieuResponse;
    this.chatLieu = data.chatLieu as ChatLieuResponse;
    this.trongLuong = data.trongLuong as TrongLuongResponse;
    this.sanPhamChiTiets = data.sanPhamChiTiets || [];
  }

}
