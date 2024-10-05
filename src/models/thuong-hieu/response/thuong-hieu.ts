
/**
 * Đối tượng thương hiệu hứng dữ liệu trả về từ BE 
 * */
export class ThuongHieu {

    idThuongHieu: number;

    tenThuongHieu: string;

    xuatXu: string;

    moTa: string;

    trangThai: string;

    constructor(data: Partial<ThuongHieu> = {}) {
        this.idThuongHieu = data.idThuongHieu || 0;
        this.tenThuongHieu = data.tenThuongHieu || '';
        this.xuatXu = data.xuatXu || '';
        this.moTa = data.moTa || '';
        this.trangThai = data.trangThai || '';
    }
}
