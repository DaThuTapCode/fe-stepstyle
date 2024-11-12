export enum StatusHD {
    TOTAL = 'TOTAL', //Tất cả hóa đơn
    PENDING = 'PENDING', // Đang chờ xử lý
    SHIPPING = 'SHIPPING', //Đang vận chuyển
    PAID = 'PAID', // Đã thanh toán
    CANCELLED = 'CANCELLED',  // Đã hủy
    REFUNDED = 'REFUNDED', // Đã hoàn tiền
    OVERDUE = 'OVERDUE' // Quá hạn
}