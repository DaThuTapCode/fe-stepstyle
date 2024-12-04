import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class GiaoHangNhanhService {
    // Đường dẫn cơ sở cho API GHN
    private readonly apiBaseUrlForAddress: string = 'https://dev-online-gateway.ghn.vn/shiip/public-api/master-data';
    private readonly apiBaseUrlForServiceFee: string = 'https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/available-services';
    private readonly apiBaseUrlForShippingFee: string = 'https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee';

    private apiGetTinhThanhs: string = `${this.apiBaseUrlForAddress}/province`;
    private apiGetDistricts: string = `${this.apiBaseUrlForAddress}/district`;
    private apiGetCommunes: string = `${this.apiBaseUrlForAddress}/ward`;
    private readonly tokenGHN: string = '98d52a73-6480-11ef-8e53-0a00184fe694'; // Token của GHN

    private shopId = 194395 + '';
    constructor(private http: HttpClient) { }

    // Hàm lấy danh sách tỉnh/thành
    getTinhThanhs() {
        const headers = new HttpHeaders().set('Token', this.tokenGHN);
        return this.http.get(this.apiGetTinhThanhs, { headers });
    }

    // Hàm lấy danh sách huyện dựa trên tỉnh/thành đã chọn
    getQuanHuyen(province: any) {
        const headers = new HttpHeaders().set('Token', this.tokenGHN);
        return this.http.post(`${this.apiGetDistricts}`, province, { headers });
    }

    // Hàm lấy danh sách xã dựa trên huyện đã chọn
    getPhuongXa(district: any) {
        const headers = new HttpHeaders().set('Token', this.tokenGHN);
        return this.http.post(`${this.apiGetCommunes}`, district, { headers });
    }

    /**Call Api lấy gói dịch vụ */
    getGoiDichVu(toDistrict: any) {
        let body = {
            shop_id: Number(this.shopId),
            from_district: 1447,
            to_district: Number(toDistrict)
        };
        const headers = new HttpHeaders().set('Token', this.tokenGHN).set('ShopID', this.shopId);
        return this.http.post(`${this.apiBaseUrlForServiceFee}`, body, { headers });
    }





    
    /**Call api lấy phí ship */
    getPhiShip(service_type_id: number, to_district_id: number, to_ward_code: string, giaTriDonHang: number, weight: number) {
        let body = {
            service_type_id: service_type_id, //Để lấy thông tin chính xác từng dịch vụ phù hợp với tuyến đường nên gọi API lấy gói dịch vụ Lưu ý: Nếu đã truyền service_type_id thì không cần truyền service_id.
            // service_id: service_id,
            // from_district_id: 1442, // Mã Quận/Huyện người gửi hàng. Nếu không truyền sẽ lấy thông tin từ ShopId
            to_district_id: to_district_id, //Mã Quận/Huyện người nhận hàng.
            to_ward_code: to_ward_code, //Mã Phường/Xã người nhận hàng.
            height: 20,
            length: 30,
            weight: weight,
            width: 40,
            insurance_value: giaTriDonHang, //Giá trị của đơn hàng ( Trường hợp mất hàng, bể hàng sẽ đền theo giá trị của đơn hàng).Tối đa 5.000.000 Giá trị mặc định: 0
            // items: [  //Thông tin sản phẩm. Bắt buộc truyền Item khi sử dụng gói dịch vụ Chuyển phát truyền thống
            //     {
            //         "name": "TEST1", //Tên của sản phẩm.
            //         "quantity": 1, //Số lượng của sản phẩm.
            //         "height": 200, //Chiều cao của sản phẩm chuyển phát truyền thống đi nhiều kiện thì bắt buộc phải truyền height 
            //         "weight": 1000, //Đối với trường hợp chọn gói dịch chuyển phát truyền thống đi nhiều kiện thì bắt buộc phải truyền weight .
            //         "length": 200, //Chiều dài của sản phẩm chuyển phát truyền thống đi nhiều kiện thì bắt buộc phải truyền length .
            //         "width": 200 //Chiều rộng của sản phẩm chuyển phát truyền thống đi nhiều kiện thì bắt buộc phải truyền width .
            //     }
            // ]
        }
        const headers = new HttpHeaders().set('Token', this.tokenGHN).set('ShopID', this.shopId);
        return this.http.post(`${this.apiBaseUrlForShippingFee}`, body, { headers });

    }
}
