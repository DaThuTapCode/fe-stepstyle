export enum StatusHD {
    PENDING = 'PENDING', // Đang chờ xử lý
    PAID = 'PAID', // Đã thanh toán
    CANCELLED = 'CANCELLED',  // Đã hủy
    REFUNDED = 'REFUNDED', // Đã hoàn tiền
    OVERDUE = 'OVERDUE' // Quá hạn
}