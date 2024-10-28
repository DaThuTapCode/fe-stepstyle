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
  dataSearch = {
    maTrongLuong: '',
  };

  constructor(
    private trongLuongService: TrongLuongService,
    private router: Router,
    private fb: FormBuilder,
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
      .searchPageTrongLuong(this.trongLuongSearchRequest, this.page, this.size)
      .subscribe({
        next: (response: any) => {
          this.trongLuongs = response.data.content;
          this.totalPages = response.data.totalPages;
          console.log('TrongLuongPage', response);
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
    maTrongLuong: null,
    giaTri: null,
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

  /** Hàm submit form thêm trọng lượng */
  submitAdd(): void {
    const tl = this.form.get('trongLuong')?.value;
    this.trongLuongs = [];
    // Kiểm tra các trường không được có ký tự đặc biệt và không được khoảng trống
    const specialCharPattern = /^[\p{L}\p{N}\s]+$/u; // Ký tự đặc biệt

    if (!this.trongLuongAdd.giaTri) {
      this.notificationService.showError(
        'Vui lòng nhập đầy đủ thông tin giá trị trọng lượng.'
      );
      return;
    }

    // Kiểm tra tên
    if (!specialCharPattern.test(this.trongLuongAdd.giaTri)) {
      this.notificationService.showError(
        'Giá trị trọng lượng không được chứa ký tự đặc biệt.'
      );
      return;
    }

    // Kiểm tra độ dài của giá trị trọng lượng sau khi xóa khoảng trắng đầu cuối
    const trimmedLength = this.trongLuongAdd.giaTri.trim().length;
    if (trimmedLength < 2 || trimmedLength > 255) {
      this.notificationService.showWarning(
        'giá trị trọng lượng phải từ 2 đến 255 ký tự.'
      );
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
        error: (err) => console.error('Lỗi khi thêm trọng lượng:', err),
      });
    }
  }

  /** Hàm submit cập nhật trọng lượng */
  submitUpdate() {
    let checkMa: string = this.trongLuongUpdate.maTrongLuong;
    let checkGiaTri: string = this.trongLuongUpdate.giaTri;

    // Kiểm tra giá trị trọng lượng không được bỏ trống
    if (!checkGiaTri || checkGiaTri.length < 1) {
      this.notificationService.showError(
        'Giá trị trọng lượng không được bỏ trống.'
      );
      return;
    }
    let check: boolean = confirm(`Bạn có muốn cập nhật ${checkMa} không?`);
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
  ngOnInit(): void {
    this.fetchDataTrongLuongs();
    this.fetchDataSearchTrongLuong();

    this.form = this.fb.group({
      maTrongLuong: ['', Validators.required],
      giaTri: ['', [Validators.required, Validators.minLength(2)]],
    });
  }
}
