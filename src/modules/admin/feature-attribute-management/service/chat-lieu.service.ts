import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChatLieu } from '../../../../models/chat-lieu/response/chat-lieu';

@Injectable({
  providedIn: 'root',
})
export class ChatLieuService {
  private baseUrlApi = environment.apiUrl;

  private uriApiGetAllChatLieu: string = `${this.baseUrlApi}/api/chat-lieu/get-all`;
  private uriApiAddChatLieu: string = `${this.baseUrlApi}/api/chat-lieu/create-chat-lieu`;

  constructor(private http: HttpClient) {}

  // call api getAll chất liệu
  getAllChatLieu(): Observable<ChatLieu[]> {
    return this.http.get<ChatLieu[]>(this.uriApiGetAllChatLieu);
  }

  // add chất liệu
  postAddChatLieu(chatLieuAdd: ChatLieu): Observable<any> {
    return this.http.post<any>(this.uriApiAddChatLieu, chatLieuAdd);
  }
}
