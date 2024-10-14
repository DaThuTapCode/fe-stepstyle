export class DanhMucResponse {

  idDanhMuc: number;

  maDanhMuc: string;

  tenDanhMuc: string;

  moTa: string;

  ngayTao: Date | null;

  ngayChinhSua: Date | null;

  trangThai: string;

  constructor(data: Partial<DanhMucResponse> = {}) {
    this.idDanhMuc = data.idDanhMuc || 0;
    this.maDanhMuc = data.maDanhMuc || '';
    this.tenDanhMuc = data.tenDanhMuc || '';
    this.moTa = data.moTa || '';
    this.ngayTao = data.ngayTao || null;
    this.ngayChinhSua = data.ngayChinhSua || null;
    this.trangThai = data.trangThai || '';
  }

}
