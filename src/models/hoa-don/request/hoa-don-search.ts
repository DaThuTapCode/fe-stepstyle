export class HoaDonSearch {
    maHoaDon: string | null;
    ngayTaoStart: Date | any;
    ngayTaoEnd: Date | any;
    tenKhachHang: string | null;
    soDienThoai: string | null;
    trangThai: string | null;
    loaiHoaDon: string | null;

    constructor (data: Partial<HoaDonSearch> = {}){
        this.maHoaDon = data.maHoaDon || '';
        this.ngayTaoStart = data.ngayTaoStart || null;
        this.ngayTaoEnd = data.ngayTaoEnd || null;
        this.tenKhachHang = data.tenKhachHang || '';
        this.soDienThoai = data.soDienThoai || '';
        this.trangThai = data.trangThai || '';
        this.loaiHoaDon = data.loaiHoaDon || '';
    }
}
