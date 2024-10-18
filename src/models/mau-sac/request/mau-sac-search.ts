export class MauSacSearch {
  maMauSac: string | null;

  tenMau: string | null;

  constructor(data: Partial<MauSacSearch> = {}) {
    this.maMauSac = data.maMauSac || '';
    this.tenMau = data.tenMau || null;
  }
}
