export class ChatLieuRequest {
  idChatLieu: number;

  maChatLieu: string;

  tenChatLieu: string;

  doBen: string;

  moTa: string;

  trangThai: string;

  constructor(data: Partial<ChatLieuRequest> = {}) {
    this.idChatLieu = data.idChatLieu || 0;
    this.maChatLieu = data.maChatLieu || '';
    this.tenChatLieu = data.tenChatLieu || '';
    this.doBen = data.doBen || '';
    this.moTa = data.moTa || '';
    this.trangThai = data.trangThai || '';
  }
}
