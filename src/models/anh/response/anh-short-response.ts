import { StatusEnum } from "../../../shared/status-enum";

export class AnhShortResponse {
    idAnh: number;
    tenAnh: string;
    trangThai: StatusEnum.ACTIVE;
    thu_tu: number;

    constructor(data: AnhShortResponse){
        this.idAnh = data.idAnh;
        this.tenAnh = data.tenAnh;
        this.trangThai = data.trangThai;
        this.thu_tu = data.thu_tu;
    }
}