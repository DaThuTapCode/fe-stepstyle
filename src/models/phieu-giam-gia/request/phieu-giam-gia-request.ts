import { StatusLoaiGiam } from "../../../shared/status-loaigiam";
import { StatusPGG } from "../../../shared/status-pgg";

export class PhieuGiamGiaRequest {
  idPhieuGiamGia: number;

  maPhieuGiamGia: string;

  tenPhieuGiamGia: string;

  soLuong: number;

  moTa: string;

  loaiGiam: StatusLoaiGiam;

  ngayBatDau?: Date | null | any;

  ngayKetThuc?: Date | null | any;

  giaTriGiamToiDa: number;

  giaTriHoaDonToiThieu: number;

  giaTriGiam: number;

  trangThai: StatusPGG;

  constructor (data: Partial<PhieuGiamGiaRequest> = {}){
    this.idPhieuGiamGia = data.idPhieuGiamGia || -1;
    this.maPhieuGiamGia = data.maPhieuGiamGia || '';
    this.tenPhieuGiamGia = data.tenPhieuGiamGia || '';
    this.soLuong = data.soLuong || 1;
    this.moTa = data.moTa || '';
    this.loaiGiam = data.loaiGiam || StatusLoaiGiam.MONEY;
    this.ngayBatDau = data.ngayBatDau || null;
    this.ngayKetThuc = data.ngayKetThuc || null;
    this.giaTriGiamToiDa = data.giaTriGiamToiDa || 0;
    this.giaTriHoaDonToiThieu = data.giaTriHoaDonToiThieu || 0;
    this.giaTriGiam = data.giaTriGiam || 0;
    this.trangThai = data.trangThai || StatusPGG.ACTIVE;
  }
}
