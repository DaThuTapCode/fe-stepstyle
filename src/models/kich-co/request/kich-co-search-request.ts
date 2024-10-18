export class KichCoSearchRequest {
  maKichCo: string | null;

  giaTri: number | null;

  constructor(data: Partial<KichCoSearchRequest> = {}) {
    this.maKichCo = data.maKichCo || '';
    this.giaTri = data.giaTri ?? null;
  }
}
