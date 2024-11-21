import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TrongLuongService } from '../../../../service/trong-luong.service';
import { TrongLuongResponse } from '../../../../../../../models/trong-luong/response/trong-luong-response';
import { TrongLuongSearchRequest } from '../../../../../../../models/trong-luong/request/trong-luong-search-request';
import { NotificationService } from '../../../../../../../shared/notification.service';
import { Pagination } from '../../../../../../../shared/type/pagination';
import { SttUtilsService } from '../../../../../../../shared/helper/stt-utils.service';

@Component({
  selector: 'app-trong-luong-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './trong-luong-list.component.html',
  styleUrl: './trong-luong-list.component.scss',
})
export class TrongLuongListComponent implements OnInit {
  trongLuongs: TrongLuongResponse[] = [];
  form!: FormGroup;
  /**Phân trang */
  size: number = 5;
  page: number = 0;
  totalPages: number = 1; /**Bắt sự kiện thay đổi trang */
  paginatinonOfTL: Pagination = {
    size: 5,
    page: 0,
    totalElements: 0,
    totalPages: 0,
    first: false,
    last: false
  }

  constructor(
    private trongLuongService: TrongLuongService,
    private router: Router,
    private fb: FormBuilder,
    private sttService: SttUtilsService,
    private notificationService: NotificationService
  ) {}

  /** Hàm tải dữ liệu danh sách trọng lượng */
  fetchDataTrongLuongs(): void {
    this.trongLuongService.getAllTrongLuong().subscribe({
      next: (response: any) => {
        this.trongLuongs = response.data;
        console.log('TrongLuongs', this.trongLuongs);
      },
      error: (err: any) => {
        console.error('Lỗi khi lấy danh sách trọng lượng: ', err);
      },
    });
  }

  /** Hàm tìm kiếm phân trang trọng lượng */
  fetchDataSearchTrongLuong() {
    this.trongLuongService
      .searchPageTrongLuong(this.trongLuongSearchRequest, this.paginatinonOfTL.page, this.paginatinonOfTL.size)
      .subscribe({
        next: (res: any) => {
          this.trongLuongs = res.data.content;
          this.paginatinonOfTL.totalPages = res.data.totalPages;
          this.paginatinonOfTL.page = res.data.pageable.pageNumber;
          this.paginatinonOfTL.first = res.data.first;
          this.paginatinonOfTL.last = res.data.last;
          console.log('TrongLuongPage', res);
        },
      });
  }

  /** Hàm bắt sự kiện thay đổi trang */
  changePage(pageNew: number) {
    this.page = pageNew;
    this.fetchDataSearchTrongLuong();
  }

  /** Phân trang trọng lượng*/
  trongLuongSearchRequest: TrongLuongSearchRequest = {
    maTrongLuong: '',
    giaTri: ''
  };

  /** Khởi tạo đối tượng trọng lượng add */
  trongLuongAdd: any = {
    idTrongLuong: null,
    maTrongLuong: '',
    giaTri: '',
    moTa: '',
    trangThai: 'ACTIVE', // Mặc định trạng thái là ACTIVE
  };

  /** Khởi tạo đối tượng trọng lượng update */
  trongLuongUpdate: any = {
    idTrongLuong: null,
    maTrongLuong: '',
    giaTri: '',
    moTa: '',
    trangThai: 'ACTIVE', // Mặc định trạng thái là ACTIVE
  };

  /** Khởi tạo đối tượng trọng lượng detail */
  trongLuongDetail: TrongLuongResponse = {
    idTrongLuong: 0,
    maTrongLuong: '',
    giaTri: '',
    moTa: '',
    trangThai: 'ACTIVE',
  };

  /** Hàm bắt sự kiện xem chi tiết trọng lượng */
  handleDetailTrongLuong(trongLuong: any): void {
    this.trongLuongDetail = trongLuong;
  }

  /** Hàm lấy dữ liệu cập nhật trọng lượng */
  handleUpdateTrongLuong(idTrongLuongs: number): void {
    this.trongLuongs.forEach((trongLuongs) => {
      if (trongLuongs.idTrongLuong === idTrongLuongs) {
        this.trongLuongUpdate.idTrongLuong = trongLuongs.idTrongLuong;
        this.trongLuongUpdate.maTrongLuong = trongLuongs.maTrongLuong;
        this.trongLuongUpdate.giaTri = trongLuongs.giaTri;
        this.trongLuongUpdate.moTa = trongLuongs.moTa;
        this.trongLuongUpdate.trangThai = trongLuongs.trangThai;
        console.log(this.trongLuongUpdate);
      }
    });
  }

  /**Hàm bắt sự kiện đổi trang trong trọng lượng */
  handlePageSPCTChange(type: string) {
    if (type === 'pre') {
      this.paginatinonOfTL.page -= 1;
    } else if (type === 'next') {
      this.paginatinonOfTL.page += 1;
    }
    this.fetchDataSearchTrongLuong();
  }

  /**Tính stt */
  tinhSTT(page: number, size: number, current: number): number {
    return this.sttService.tinhSTT(page, size, current);
  }

  /** Hàm submit form thêm trọng lượng */
  submitAdd(): void {
    const kc = this.form.get('trongLuong')?.value;
    this.trongLuongs = [];
    // Kiểm tra các trường không được có ký tự đặc biệt và không được khoảng trống
    const specialCharPattern = /^[\p{L}\p{N}\s]+$/u; // Ký tự đặc biệt

    if (!this.trongLuongAdd.giaTri) {
      this.notificationService.showError('Vui lòng nhập đầy đủ thông tin giá trị trọng lượng.');
      return;
    }

    // Kiểm tra Giá trị
    if (!specialCharPattern.test(this.trongLuongAdd.giaTri)) {
      this.notificationService.showError('Giá trị trọng lượng không được chứa ký tự đặc biệt.');
      return;
    }

    // Kiểm tra giá trị trọng lượng phải là số
    if (isNaN(Number(this.trongLuongAdd.giaTri.trim()))) {
      this.notificationService.showError('Giá trị trọng lượng phải là số.');
      return;
    }

    // Kiểm tra độ dài của giá trị trọng lượng sau khi xóa khoảng trắng đầu cuối
    const doDaiTen = this.trongLuongAdd.giaTri.trim().length;
    if (doDaiTen < 2 || doDaiTen > 255) {
      this.notificationService.showWarning('Giá trị trọng lượng phải từ 2 đến 255 ký tự.');
      return;
    }

    if (confirm(`Bạn có muốn thêm trọng lượng: ${this.trongLuongAdd.giaTri} không?`)) {
      this.trongLuongService.postAddTrongLuong(this.trongLuongAdd).subscribe({
        next: () => {
          this.notificationService.showSuccess('Thêm trọng lượng thành công');
          this.resetForm();
          this.fetchDataTrongLuongs();
          this.closeModal('closeModalAdd');
        },
        error: (err) => {
          this.notificationService.showError(err.error.message);
          console.error('Lỗi khi thêm trọng lượng:', err);
          this.fetchDataTrongLuongs();
        }
      });
    }
  }

  /** Hàm submit cập nhật trọng lượng */
  submitUpdate() {
    const checkGiaTri: string = this.trongLuongUpdate.giaTri?.trim(); // Loại bỏ khoảng trắng thừa
    const specialCharPattern = /^[\p{L}\p{N}\s]+$/u; // Ký tự đặc biệt

    // Kiểm tra trọng lượng không được bỏ trống
    if (!checkGiaTri) {
      this.notificationService.showError('Giá trị trọng lượng không được bỏ trống.');
      return;
    }

    // Kiểm tra giá trị trọng lượng phải là số
    if (isNaN(Number(this.trongLuongUpdate.giaTri.trim()))) {
      this.notificationService.showError('Giá trị trọng lượng phải là số.');
      return;
    }

    // Kiểm tra  trọng lượng không được chứa ký tự đặc biệt
    if (!specialCharPattern.test(checkGiaTri)) {
      this.notificationService.showError('Giá trị trọng lượng không được chứa ký tự đặc biệt.');
      return;
    }

    // Kiểm tra độ dài  trọng lượng
    const nameLength = checkGiaTri.length;
    if (nameLength < 2 || nameLength > 255) {
      this.notificationService.showWarning('Giá trị trọng lượng phải từ 2 đến 255 ký tự.');
      return;
    }
    let check: boolean = confirm(`Bạn có muốn cập nhật ${checkGiaTri} không?`);
    if (check) {
      // Kiểm tra xem trongLuong đã có id trọng lượng hay chưa
      if (
        this.trongLuongUpdate.idTrongLuong === null ||
        this.trongLuongUpdate.idTrongLuong === undefined
      ) {
        this.notificationService.showWarning(
          'Không có ID trọng lượng để cập nhật.'
        );
        return;
      }

      console.log(this.trongLuongUpdate);
      this.trongLuongService
        .putUpdateTrongLuong(this.trongLuongUpdate)
        .subscribe({
          next: (value: any) => {
            this.notificationService.showSuccess(
              'Cập nhật trọng lượng thành công.'
            );
            this.resetForm();
            this.fetchDataTrongLuongs(); // Tải lại danh sách sau khi cập nhật
            this.closeModal('closeModalUpdate');
          },
          error: (err) => {
            console.error('Lỗi khi cập nhật trọng lượng:', err);
            this.notificationService.showError(err.error.message);
            this.notificationService.showError(
              'Cập nhật trọng lượng không thành công.'
            ); // Thông báo cho người dùng
          },
        });
    }
  }

  /** onSubmit để khi submit sẽ hiển thị các trường validate */
  onSubmit() {
    if (this.form.valid) {
      console.log('Form submitted', this.form.value);
    }
  }

  /** Closemodal để đống modal khi submit */
  closeModal(idBtn: string) {
    const closeModalUpdate = document.getElementById(idBtn);
    if (closeModalUpdate) {
      closeModalUpdate.click();
    }
  }

  /** Hàm reset form sau khi add hoặc update thành công */
  resetForm(): void {
    this.trongLuongAdd = {
      idTrongLuong: null,
      maTrongLuong: '',
      giaTri: '',
      moTa: '',
      trangThai: 'ACTIVE', // Reset lại trạng thái mặc định
    };
  }

  /** Hàm reset tìm kiếm */
  resetSearch() {
    this.trongLuongSearchRequest = {
      maTrongLuong: '',
      giaTri: ''
    };
    this.searchTL();
  }

  /** Hàm tìm kiếm trọng lượng */
  searchTL() {
    this.paginatinonOfTL.page = 0; // Reset lại trang khi bắt đầu tìm kiếm
    this.fetchDataSearchTrongLuong();
  }

  ngOnInit(): void {
    this.fetchDataTrongLuongs();
    this.fetchDataSearchTrongLuong();

    this.form = this.fb.group({
      giaTri: ['', [Validators.required, Validators.minLength(2)]],
    });
  }
}
