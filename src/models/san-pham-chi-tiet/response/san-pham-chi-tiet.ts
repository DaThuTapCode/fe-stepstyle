/**
 * Đối tượng sản phẩm chi tiết hứng dữ liệu trả về từ BE
 */
export class SanPhamChiTiet {
    idSpct: number;
    gia: number;
    soLuong: number;
    ngayTao: Date | null;
    ngayChinhSua: Date | null;
    trangThai: string;

    constructor (data: Partial<SanPhamChiTiet> = {}) {
        this.idSpct = data.idSpct || 0;
        this.gia = data.gia || 0;
        this.soLuong = data.soLuong || 0;
        this.ngayTao = data.ngayTao || null;
        this.ngayChinhSua = data.ngayChinhSua || null;
        this.trangThai = data.trangThai || '';
    }
}
