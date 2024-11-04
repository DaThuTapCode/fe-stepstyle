export class SanPhamSearch {
    maSanPham: string | null;
    tenSanPham: string | null;
    ngayTaoStart: Date | null;
    ngayTaoEnd: Date | null;
    idDanhMuc: number | null;
    idThuongHieu: number | null;

    constructor(data: Partial<SanPhamSearch> = {}) {
        this.maSanPham = data.maSanPham || null;
        this.tenSanPham = data.tenSanPham || null;
        this.ngayTaoStart = data.ngayTaoStart || null;
        this.ngayTaoEnd = data.ngayTaoEnd || null;
        this.idDanhMuc = data.idDanhMuc || null;
        this.idThuongHieu = data.idThuongHieu || null;
    }

}
