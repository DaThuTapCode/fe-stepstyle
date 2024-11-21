export class SanPhamChiTietSearchRequest {
    maSpct: String | null;

    idMauSac: number | null;

    idKichCo: number | null;

    constructor(data: Partial<SanPhamChiTietSearchRequest> = {}) {
      this.maSpct = data.maSpct || '';
      this.idMauSac = data.idMauSac || null;
      this.idKichCo = data.idKichCo || null;
    }
}
