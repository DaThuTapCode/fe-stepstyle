import {StatusSPCT} from "../../../shared/status-spct";
import { KichCoRequest } from "../../kich-co/request/kich-co-request";
import { MauSacRequest } from "../../mau-sac/request/mau-sac-request";

export class SanPhamChiTietRequest {

  idSpct: number;

  maSpct: string;

  gia: number;

  soLuong: number;

  trangThai: StatusSPCT;

  mauSac: MauSacRequest;

  kichCo: KichCoRequest;

  anh: File | null;
  
  isEditable: boolean;

  constructor(data: Partial<SanPhamChiTietRequest> = {}) {
    this.idSpct = data.idSpct || 0;
    this.maSpct = data.maSpct || '';
    this.gia = data.gia || 1;
    this.soLuong = data.soLuong || 0;
    this.trangThai = data.trangThai || StatusSPCT.ACTIVE;
    this.mauSac = new MauSacRequest(data.mauSac);
    this.kichCo = new KichCoRequest(data.kichCo);
    this.anh = data.anh || null;
    this.isEditable = data.isEditable || false;
  }


}
