import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateUtilsService {

  // Chuyển từ dd-MM-yyyy sang yyyy-MM-dd (để binding lên input date)
  convertToISOFormat(date: string): string {
    if (!date) return '';
    const [day, month, year] = date.split('-');
    return `${year}-${month}-${day}`;
  }

  // Chuyển từ yyyy-MM-dd sang dd-MM-yyyy (để gửi lên backend)
  convertToBackendFormat(date: string): string {
    if (!date) return '';
    const [year, month, day] = date.split('-');
    return `${day}-${month}-${year}`;
  }

  // Hàm convert kiểu dữ liệu HH:mm:ss dd-MM-yyyy
  convertToCustomFormat(date: string): string {
    if (!date) return '';
    const [year, month, day] = date.split('-');
    const time = '00:00:00'; // Hoặc bất kỳ giờ nào bạn muốn
    const formattedDate = `${time} ${day}-${month}-${year}`;
    return formattedDate;
  }

  // DateUtilsService
  getCurrentDateFormatted(): string {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
    const year = today.getFullYear();
    return `${day}-${month}-${year}`;
  }
  

}
