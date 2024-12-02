import { StatusPTTT } from "../../../shared/status-pttt";

export class ThanhToanResponse {
  idThanhToan: number;

  maThanhToan: string;

  phuongThucThanhToan: StatusPTTT;

  trangThai: string;

  constructor (data: Partial<ThanhToanResponse> = {}){
    this.idThanhToan = data.idThanhToan || 0;
    this.maThanhToan = data.maThanhToan || '';
    this.phuongThucThanhToan = data.phuongThucThanhToan || StatusPTTT.CASH;
    this.trangThai = data.trangThai || '';
  }
}
