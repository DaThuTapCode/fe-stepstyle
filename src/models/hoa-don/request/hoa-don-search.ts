export class HoaDonSearch {
    maHoaDon: string | null;
    ngayTaoStart: Date | null;
    ngayTaoEnd: Date | null;
    idKhachHang: number | null;
    idNhanVien: number | null;
    idThanhToan: number | null;
    idPhieuGiamGia: number | null;

    constructor (data: Partial<HoaDonSearch> = {}){
        this.maHoaDon = data.maHoaDon || '';
        this.ngayTaoStart = data.ngayTaoStart || null;
        this.ngayTaoEnd = data.ngayTaoEnd || null;
        this.idKhachHang = data.idKhachHang || null;
        this.idNhanVien = data.idNhanVien || null;
        this.idThanhToan = data.idThanhToan || null;
        this.idPhieuGiamGia = data.idPhieuGiamGia || null;
    }
}
