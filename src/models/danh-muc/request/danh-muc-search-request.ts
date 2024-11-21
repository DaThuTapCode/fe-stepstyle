export class DanhMucSearchRequest {
  maDanhMuc: string | null;

  tenDanhMuc: string | null;

  constructor(data: Partial<DanhMucSearchRequest> = {}) {
    this.maDanhMuc = data.maDanhMuc || '';
    this.tenDanhMuc = data.tenDanhMuc || '';
  }
}
