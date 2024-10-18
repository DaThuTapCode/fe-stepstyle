import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChatLieuDeGiayResponse } from '../../../../models/chat-lieu-de-giay/response/chat-lieu-de-giay-response';
import { ChatLieuDeGiaySearchRequest } from '../../../../models/chat-lieu-de-giay/request/chat-lieu-de-giay-search-request';


@Injectable({
  providedIn: 'root',
})
export class ChatLieuDeGiayService {
  private baseUrlApi = environment.apiUrl;

  private uriApiGetAllCLDG: string = `${this.baseUrlApi}/api/chat-lieu-de-giay/get-all`;
  private uriApiAddCLDG: string = `${this.baseUrlApi}/api/chat-lieu-de-giay/create-chat-lieu-de-giay`;
  private uriApiGetChatLieuDeGiayById: string = `${this.baseUrlApi}/api/chat-lieu-de-giay`;   // API lấy chi tiết
  private urlApiPostSearchPageChatLieuDeGiay: string = `${this.baseUrlApi}/api/chat-lieu-de-giay/search`;

  constructor(private http: HttpClient) {}

  // call api getAll chat lieu de giay
  getAllCLDG(): Observable<ChatLieuDeGiayResponse[]> {
    return this.http.get<ChatLieuDeGiayResponse[]>(this.uriApiGetAllCLDG);
  }

  // add CLDG
  postAddCLDG(CLDGAdd: ChatLieuDeGiayResponse): Observable<any> {
    return this.http.post<any>(this.uriApiAddCLDG, CLDGAdd);
  }

  // update chất liệu đế giày
  putUpdateChatLieuDeGiay(CLDGUpdate: ChatLieuDeGiayResponse): Observable<any> {
    // Thay thế {{id}} bằng giá trị thực tế của CLDGUpdate.idChatLieuDeGiay
    const url = `${this.baseUrlApi}/api/chat-lieu-de-giay/update-chat-lieu-de-giay/${CLDGUpdate.idChatLieuDeGiay}`; // Thêm ID vào URL
    return this.http.put<any>(url, CLDGUpdate); // Gửi CLDGUpdate trong thân yêu cầu
  }

  /** Lấy chi theo ID */
  getChatLieuDeGiayById(idChatLieuDeGiay: number): Observable<ChatLieuDeGiayResponse> {
    const url = `${this.uriApiGetChatLieuDeGiayById}/${idChatLieuDeGiay}`;
    return this.http.get<ChatLieuDeGiayResponse>(url);
  }

  // phân trang
  searchPageChatLieuDeGiay(chatLieuDeGiaySearchRequest: ChatLieuDeGiaySearchRequest, page: number, size: number): Observable<any> {
    return this.http.post<any>(`${this.urlApiPostSearchPageChatLieuDeGiay}?page=${page}&size=${size}`, chatLieuDeGiaySearchRequest);
  }
}
