import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class SttUtilsService {
   /** Hàm tính số thứ tự */
tinhSTT(page: number, size: number, viTriHienTai: number) {
    return page * size + viTriHienTai + 1;
}

}