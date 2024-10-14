export class DanhMucRequest {

  idDanhMuc: number;

  maDanhMuc: string;

  tenDanhMuc: string;

  moTa: string;

  constructor(data: Partial<DanhMucRequest> = {}) {
    this.idDanhMuc = data.idDanhMuc || 0;
    this.maDanhMuc = data.maDanhMuc || '';
    this.tenDanhMuc = data.tenDanhMuc || '';
    this.moTa = data.moTa || '';
  }
}
