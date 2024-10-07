/**
 * Đối tượng chất liệu độ bền hứng dữ liệu trả về từ BE
 */
export class ChatLieuDoBen {

  idChatLieuDoBen: number;

  tenChatLieuDoBen: string;

  giaTri: string;

  moTa: string;

  trangThai: string;

  constructor(data: Partial<ChatLieuDoBen> = {}) {
      this.idChatLieuDoBen = data.idChatLieuDoBen || 0;
      this.tenChatLieuDoBen = data.tenChatLieuDoBen || '';
      this.giaTri = data.giaTri || '';
      this.moTa = data.moTa || '';
      this.trangThai = data.trangThai || '';
  }
}
