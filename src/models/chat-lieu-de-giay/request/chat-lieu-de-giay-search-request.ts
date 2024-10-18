export class ChatLieuDeGiaySearchRequest {
  maChatLieuDeGiay: string | null;

  tenChatLieuDeGiay: string | null;

  constructor(data: Partial<ChatLieuDeGiaySearchRequest> = {}) {
    this.maChatLieuDeGiay = data.maChatLieuDeGiay || '';
    this.tenChatLieuDeGiay = data.tenChatLieuDeGiay || null;
  }
}
