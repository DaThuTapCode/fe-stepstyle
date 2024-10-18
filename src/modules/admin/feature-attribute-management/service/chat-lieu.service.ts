import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChatLieuResponse } from '../../../../models/chat-lieu/response/chat-lieu-response';
import { ChatLieuSearch } from '../../../../models/chat-lieu/request/chat-lieu-search';


@Injectable({
  providedIn: 'root',
})
export class ChatLieuService {
  private baseUrlApi = environment.apiUrl;

  private uriApiGetAllChatLieu: string = `${this.baseUrlApi}/api/chat-lieu/get-all`;
  private uriApiAddChatLieu: string = `${this.baseUrlApi}/api/chat-lieu/create-chat-lieu`;
  private uriApiGetChatLieuById: string = `${this.baseUrlApi}/api/chat-lieu`;   // API lấy chi tiết
  private urlApiPostSearchPageChatLieu: string = `${this.baseUrlApi}/api/chat-lieu/search`;

  constructor(private http: HttpClient) {}

  // call api getAll chất liệu
  getAllChatLieu(): Observable<ChatLieuResponse[]> {
    return this.http.get<ChatLieuResponse[]>(this.uriApiGetAllChatLieu);
  }

  // add chất liệu
  postAddChatLieu(chatLieuAdd: ChatLieuResponse): Observable<any> {
    return this.http.post<any>(this.uriApiAddChatLieu, chatLieuAdd);
  }

  // update chất liệu
  putUpdateChatLieu(chatLieuUpdate: ChatLieuResponse): Observable<any> {
    // Thay thế {{id}} bằng giá trị thực tế của chatLieuUpdate.idChatLieu
    const url = `${this.baseUrlApi}/api/chat-lieu/update-chat-lieu/${chatLieuUpdate.idChatLieu}`; // Thêm ID vào URL
    return this.http.put<any>(url, chatLieuUpdate); // Gửi chatLieuUpdate trong thân yêu cầu
  }

  /** Lấy chi tiết theo ID */
  getChatLieuById(idChatLieu: number): Observable<ChatLieuResponse> {
    const url = `${this.uriApiGetChatLieuById}/${idChatLieu}`;
    return this.http.get<ChatLieuResponse>(url);
  }
  // phân trang
  searchPageChatLieu(chatLieuSearch: ChatLieuSearch, page: number, size: number): Observable<any> {
    return this.http.post<any>(`${this.urlApiPostSearchPageChatLieu}?page=${page}&size=${size}`, chatLieuSearch);
  }
}
