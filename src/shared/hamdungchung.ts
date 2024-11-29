  /**
* Định dạng giá trị giảm giá dựa vào loại giảm giá
*/
export function formatGiaTriGiam(pgg: any): string {
   // Kiểm tra nếu đối tượng phieuGiamGia hoặc giá trị giảm giaTriGiam bị null hoặc undefined
   if (!pgg || !pgg.giaTriGiam) {
     return "N/A";  
   }

   if (pgg.loaiGiam === 'MONEY') {
     return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(pgg.giaTriGiam);
   } else if (pgg.loaiGiam === 'PERCENT') {
     return pgg.giaTriGiam + '%';
   }
   return pgg.giaTriGiam;
 }