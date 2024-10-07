/**
 * Đối tượng chất liệu hứng dữ liệu trả về từ BE
 */
export class ChatLieu {

  idChatLieu: number;

  tenChatLieu: string;

  doBen: string;

  moTa: string;

  trangThai: string;

  constructor(data: Partial<ChatLieu> = {}) {
      this.idChatLieu = data.idChatLieu || 0;
      this.tenChatLieu = data.tenChatLieu || '';
      this.doBen = data.doBen || '';
      this.moTa = data.moTa || '';
      this.trangThai = data.trangThai || '';
  }
}
