export class PhieuGiamGiaRequest {
  idPhieuGiamGia: number;

  maPhieuGiamGia: string;

  tenPhieuGiamGia: string;

  moTa: string;

  loaiGiam: string;

  ngayBatDau?: Date | null;

  ngayKetThuc?: Date | null;

  giaTriGiamToiDa: number;

  giaTriGiamToiThieu: number;

  giaTriGiam: number;

  trangThai: string;

  constructor (data: Partial<PhieuGiamGiaRequest> = {}){
    this.idPhieuGiamGia = data.idPhieuGiamGia || 0;
    this.maPhieuGiamGia = data.maPhieuGiamGia || '';
    this.tenPhieuGiamGia = data.tenPhieuGiamGia || '';
    this.moTa = data.moTa || '';
    this.loaiGiam = data.loaiGiam || '';
    this.ngayBatDau = data.ngayBatDau || null;
    this.ngayKetThuc = data.ngayKetThuc || null;
    this.giaTriGiamToiDa = data.giaTriGiamToiDa || 0;
    this.giaTriGiamToiThieu = data.giaTriGiamToiThieu || 0;
    this.giaTriGiam = data.giaTriGiam || 0;
    this.trangThai = data.trangThai || '';
  }
}
