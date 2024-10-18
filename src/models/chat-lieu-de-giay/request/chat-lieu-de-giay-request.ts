export class ChatLieuDeGiayRequest {
  idChatLieuDeGiay: number;

  maChatLieuDeGiay: string;

  tenChatLieuDeGiay: string;

  giaTri: string;

  moTa: string;

  trangThai: string;

  constructor(data: Partial<ChatLieuDeGiayRequest> = {}) {
    this.idChatLieuDeGiay = data.idChatLieuDeGiay || 0;
    this.maChatLieuDeGiay = data.maChatLieuDeGiay || '';
    this.tenChatLieuDeGiay = data.tenChatLieuDeGiay || '';
    this.giaTri = data.giaTri || '';
    this.moTa = data.moTa || '';
    this.trangThai = data.trangThai || '';
  }
}