
/**
 * Đối tượng danh mục hứng dữ liệu trả về từ BE
 */
export class DanhMuc {

    idDanhMuc: number;

    tenDanhMuc: string;

    moTa: string;

    ngayTao: Date | null;

    ngayChinhSua: Date | null;

    trangThai: string;

    constructor(data: Partial<DanhMuc> = {}) {
        this.idDanhMuc = data.idDanhMuc || 0;
        this.tenDanhMuc = data.tenDanhMuc || '';
        this.moTa = data.moTa || '';
        this.ngayTao = data.ngayTao || null;
        this.ngayChinhSua = data.ngayChinhSua || null;
        this.trangThai = data.trangThai || '';
    }
}
