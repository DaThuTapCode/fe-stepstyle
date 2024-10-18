export class KieuDeGiaySearchRequest {
  maKieuDeGiay: string | null;

  tenKieuDeGiay: string | null;

  constructor(data: Partial<KieuDeGiaySearchRequest> = {}) {
    this.maKieuDeGiay = data.maKieuDeGiay || '';
    this.tenKieuDeGiay = data.tenKieuDeGiay || null;
  }
}
