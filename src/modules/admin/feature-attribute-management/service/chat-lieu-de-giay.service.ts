import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChatLieuDeGiay } from '../../../../models/chat-lieu-de-giay/response/chat-lieu-de-giay';

@Injectable({
  providedIn: 'root',
})
export class ChatLieuDeGiayService {
  private baseUrlApi = environment.apiUrl;

  private uriApiGetAllCLDG: string = `${this.baseUrlApi}/api/chat-lieu-de-giay/get-all`;
  private uriApiAddCLDG: string = `${this.baseUrlApi}/api/chat-lieu-de-giay/create-chat-lieu-de-giay`;

  constructor(private http: HttpClient) {}

  // call api getAll chat lieu de giay
  getAllCLDG(): Observable<ChatLieuDeGiay[]> {
    return this.http.get<ChatLieuDeGiay[]>(this.uriApiGetAllCLDG);
  }

  // add CLDG
  postAddCLDG(CLDGAdd: ChatLieuDeGiay): Observable<any> {
    return this.http.post<any>(this.uriApiAddCLDG, CLDGAdd);
  }
}
