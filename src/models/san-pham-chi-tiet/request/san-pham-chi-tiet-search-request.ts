export class SanPhamChiTietSearchRequest {
    maSpct: String | null;

    idChatLieu: number | null;

    idKieuDeGiay: number | null;

    idChatLieuDeGiay: number | null;

    idTrongLuong: number | null;

    idMauSac: number | null;

    idKichCo: number | null;

    constructor(data: Partial<SanPhamChiTietSearchRequest> = {}) {
      this.maSpct = data.maSpct || '';
      this.idChatLieu = data.idChatLieu || null;
      this.idKieuDeGiay = data.idKieuDeGiay || null;
      this.idChatLieuDeGiay = data.idChatLieuDeGiay || null;
      this.idTrongLuong = data.idTrongLuong || null;
      this.idMauSac = data.idMauSac || null;
      this.idKichCo = data.idKichCo || null;
    }
}
