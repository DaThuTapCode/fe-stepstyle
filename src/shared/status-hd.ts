export enum StatusHD {
    TOTAL = 'TOTAL', //Tất cả hóa đơn
    PENDING = 'PENDING', // Đang chờ xử lý
    PENDINGPROCESSING = 'PENDINGPROCESSING', // Đang chờ thanh toán
    SHIPPING = 'SHIPPING', //Đang vận chuyển
    PAID = 'PAID', // Đã thanh toán
    CANCELLED = 'CANCELLED' // Đã hủy
}