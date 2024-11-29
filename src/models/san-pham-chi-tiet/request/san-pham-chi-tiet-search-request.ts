export class SanPhamChiTietSearchRequest {

    maSpct: String | null;

    tenSanPham: string | null;
    
    maSanPham: string | null;

    idMauSac: number | null;

    idKichCo: number | null;

    idThuongHieu: number | null;

    idChatLieu: number | null;

    idTrongLuong: number | null;

    idDanhMuc: number | null;

    constructor(data: Partial<SanPhamChiTietSearchRequest> = {}) {
      this.maSpct = data.maSpct || '';
      this.tenSanPham = data.tenSanPham || '';
      this.maSanPham = data.maSanPham || '';
      this.idMauSac = data.idMauSac || null;
      this.idKichCo = data.idKichCo || null;
      this.idThuongHieu = data.idThuongHieu || null;
      this.idChatLieu = data.idChatLieu || null;
      this.idTrongLuong = data.idTrongLuong || null;
      this.idDanhMuc = data.idDanhMuc || null;
    }
}
