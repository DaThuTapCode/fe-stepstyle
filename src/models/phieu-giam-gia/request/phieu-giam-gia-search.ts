export class PhieuGiamGiaSearch {
    maPhieuGiamGia: string | null;
    tenPhieuGiamGia: string | null;
    ngayBatDau: Date | null;
    ngayKetThuc: Date | null;
    loaiGiam: string | null;
    trangThai: string | null;

    constructor (data: Partial<PhieuGiamGiaSearch> = {}){
        this.maPhieuGiamGia = data.maPhieuGiamGia || '';
        this.tenPhieuGiamGia = data.tenPhieuGiamGia || '';
        this.ngayBatDau = data.ngayBatDau || null;
        this.ngayKetThuc = data.ngayKetThuc || null;
        this.loaiGiam = data.loaiGiam || '';
        this.trangThai = data.trangThai || ''
    }
}
