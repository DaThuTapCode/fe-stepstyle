export class TrongLuongSearchRequest {
  maTrongLuong: string | null;

  giaTri: string | null;

  constructor(data: Partial<TrongLuongSearchRequest> = {}) {
    this.maTrongLuong = data.maTrongLuong || '';
    this.giaTri = data.giaTri || null;
  }
}
