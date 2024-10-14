export class ThanhToanRequest {
  idThanhToan: number;

  maThanhToan: string;

  phuongThucThanhToan: string;

  trangThai: string;

  constructor (data: Partial<ThanhToanRequest> = {}){
    this.idThanhToan = data.idThanhToan || 0;
    this.maThanhToan = data.maThanhToan || '';
    this.phuongThucThanhToan = data.phuongThucThanhToan || '';
    this.trangThai = data.trangThai || '';
  }
}
