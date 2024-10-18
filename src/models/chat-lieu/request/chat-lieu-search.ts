export class ChatLieuSearch {
  maChatLieu: string | null;

  tenChatLieu: string | null;

  constructor(data: Partial<ChatLieuSearch> = {}) {
    this.maChatLieu = data.maChatLieu || '';
    this.tenChatLieu = data.tenChatLieu || null;
  }
}
