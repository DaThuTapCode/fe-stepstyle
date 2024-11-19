export class ThuongHieuSearchRequest {
  maThuongHieu: string | null;

  tenThuongHieu: string | null;

  constructor(data: Partial<ThuongHieuSearchRequest> = {}) {
    this.maThuongHieu = data.maThuongHieu || '';
    this.tenThuongHieu = data.tenThuongHieu || null;
  }
}
