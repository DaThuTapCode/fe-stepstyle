import { DanhMuc } from "../../danh-muc/response/danh-muc";
import { SanPhamChiTiet } from "../../san-pham-chi-tiet/response/san-pham-chi-tiet";
import { ThuongHieu } from "../../thuong-hieu/response/thuong-hieu";

/**
 * Đối tượng sản phẩm hứng dữ liệu trả về từ Back end;
 */
export class SanPham {
    idSanPham: number;

    tenSanPham: string;

    moTa: string;

    ngayTao?: Date | null;

    ngayChinhSua?: Date | null;

    nguoiTao: string;

    trangThai: string; 

    danhMuc: DanhMuc;

    thuongHieu: ThuongHieu;

    sanPhamChiTiets: SanPhamChiTiet[];

    constructor (data: Partial<SanPham> = {}){
        this.idSanPham = data.idSanPham || 0;
        this.tenSanPham = data.tenSanPham || '';
        this.moTa = data.moTa || '';
        this.ngayTao = data.ngayTao || null;
        this.ngayChinhSua = data.ngayChinhSua || null;
        this.nguoiTao = data.nguoiTao || '';
        this.trangThai = data.trangThai || '';
        this.danhMuc = data.danhMuc || {} as DanhMuc;
        this.thuongHieu = data.thuongHieu || {} as ThuongHieu;
        this.sanPhamChiTiets = data.sanPhamChiTiets || [];
    }
}
