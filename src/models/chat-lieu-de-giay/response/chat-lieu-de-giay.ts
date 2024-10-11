/**
 * Đối tượng chất liệu độ bền hứng dữ liệu trả về từ BE
 */
export class ChatLieuDeGiay {

  idChatLieuDeGiay: number;

  tenChatLieuDeGiay: string;

  giaTri: string;

  moTa: string;

  trangThai: string;

  constructor(data: Partial<ChatLieuDeGiay> = {}) {
      this.idChatLieuDeGiay = data.idChatLieuDeGiay || 0;
      this.tenChatLieuDeGiay = data.tenChatLieuDeGiay || '';
      this.giaTri = data.giaTri || '';
      this.moTa = data.moTa || '';
      this.trangThai = data.trangThai || '';
  }
}
