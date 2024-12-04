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

  anhFile: File | null;
  
  constructor(data: Partial<SanPhamChiTietRequest> | any = {}) {
    this.idSpct = data.idSpct || 0;
    this.maSpct = data.maSpct || '';
    this.gia = data.gia || 1;
    this.soLuong = data.soLuong || 0;
    this.trangThai = data.trangThai || StatusSPCT.ACTIVE;
    this.mauSac = new MauSacRequest(data.mauSac);
    this.kichCo = new KichCoRequest(data.kichCo);
    this.anhFile = data.anhFile || null;
  }


}
