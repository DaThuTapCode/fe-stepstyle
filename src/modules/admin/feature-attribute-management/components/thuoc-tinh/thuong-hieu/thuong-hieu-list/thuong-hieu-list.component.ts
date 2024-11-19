import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ThuongHieuResponse } from '../../../../../../../models/thuong-hieu/response/thuong-hieu-response';
import { Pagination } from '../../../../../../../shared/type/pagination';
import { Router } from '@angular/router';
import { SttUtilsService } from '../../../../../../../shared/helper/stt-utils.service';
import { NotificationService } from '../../../../../../../shared/notification.service';
import { ThuongHieuService } from '../../../../../feature-product-management/services/thuong-hieu.service';
import { ThuongHieuSearchRequest } from '../../../../../../../models/thuong-hieu/request/thuong-hieu-search-request';

@Component({
  selector: 'app-thuong-hieu-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './thuong-hieu-list.component.html',
  styleUrl: './thuong-hieu-list.component.scss'
})
export class ThuongHieuListComponent implements OnInit{
  form!: FormGroup;
  thuongHieus: ThuongHieuResponse[] = [];
  /**Phân trang */
  size: number = 5;
  page: number = 0;
  totalPages: number = 1; /**Bắt sự kiện thay đổi trang */
  paginatinonOfThuongHieu: Pagination = {
    size: 5,
    page: 0,
    totalElements: 0,
    totalPages: 0,
    first: false,
    last: false
  }

  /** Khởi tạo đối tượng tạo thương hiệu */
  thuongHieuAdd: any = {
    idThuongHieu: null,
    maThuongHieu: '',
    tenThuongHieu: '',
    xuatXu: '',
    moTa: '',
    trangThai: 'ACTIVE', // Mặc định trạng thái là ACTIVE
  };

  /** Khởi tạo đối tượng update thương hiệu */
  thuongHieuUpdate: any = {
    idThuongHieu: null,
    maThuongHieu: '',
    tenThuongHieu: '',
    xuatXu: '',
    moTa: '',
    trangThai: 'ACTIVE', // Mặc định trạng thái là ACTIVE
  };

  /** Khởi tạo đối tượng thương hiệu update */
  thuongHieuDetail: ThuongHieuResponse = {
    idThuongHieu: 0,
    maThuongHieu: '',
    tenThuongHieu: '',
    xuatXu: '',
    moTa: '',
    trangThai: 'ACTIVE', // Mặc định trạng thái là ACTIVE
  };

  /** Phân trang màu sắc*/
  thuongHieuSearch: ThuongHieuSearchRequest = {
    maThuongHieu: '',
    tenThuongHieu: '',
  };

  constructor(
    private thuongHieuService: ThuongHieuService,
    private router: Router,
    private fb: FormBuilder,
    private sttService: SttUtilsService,
    private notificationService: NotificationService
  ) {}

  /** Hàm tải dữ liệu cho danh sách thương hiệu*/
  fetchThuongHieus() {
    this.thuongHieuService.getAllThuongHieu().subscribe({
      next: (res: any) => {
        this.thuongHieus = res.data;
      },
      error: err => {
        console.log('Lỗi khi tải dữ liệu danh sách thương hiệu: ', err);
      }
    })
  }

  /** Hàm tìm kiếm phân trang thương hiệu */
  fetchDataSearchThuongHieu() {
    this.thuongHieuService
      .searchPageThuongHieu(this.thuongHieuSearch, this.paginatinonOfThuongHieu.page, this.paginatinonOfThuongHieu.size)
      .subscribe({
        next: (res: any) => {
          this.thuongHieus = res.data.content;
          this.paginatinonOfThuongHieu.totalPages = res.data.totalPages;
          this.paginatinonOfThuongHieu.page = res.data.pageable.pageNumber;
          this.paginatinonOfThuongHieu.first = res.data.first;
          this.paginatinonOfThuongHieu.last = res.data.last;
          console.log('ThuongHieuPage', res);
        },
      });
  }

  /** Hàm bắt sự kiện xem chi tiết thương hiệu */
  handleDetailThuongHieu(thuongHieu: any): void {
    this.thuongHieuDetail = thuongHieu;
  }

  /** Hàm lấy dữ liệu cập nhật thương hiệu */
  handleUpdateThuongHieu(idThuongHieus: number): void {
    this.thuongHieus.forEach((thuongHieu) => {
      if (thuongHieu.idThuongHieu === idThuongHieus) {
        this.thuongHieuUpdate.idThuongHieu = thuongHieu.idThuongHieu;
        this.thuongHieuUpdate.maThuongHieu = thuongHieu.maThuongHieu;
        this.thuongHieuUpdate.tenThuongHieu = thuongHieu.tenThuongHieu;
        this.thuongHieuUpdate.xuatXu = thuongHieu.xuatXu;
        this.thuongHieuUpdate.moTa = thuongHieu.moTa;
        this.thuongHieuUpdate.trangThai = thuongHieu.trangThai;
        console.log(this.thuongHieuUpdate);
      }
    });
  }

  /**Hàm bắt sự kiện đổi trang trong modal spct */
  handlePageSPCTChange(type: string) {
    if (type === 'pre') {
      this.paginatinonOfThuongHieu.page -= 1;
    } else if (type === 'next') {
      this.paginatinonOfThuongHieu.page += 1;
    }
    //this.fetchDataSearchThuongHieu();
  }
  /**Tính stt */
  tinhSTT(page: number, size: number, current: number): number {
    return this.sttService.tinhSTT(page, size, current);
  }

  /** Hàm submit form thêm thương hiệu */
  submitAdd(): void {
    const ms = this.form.get('thuongHieu')?.value;
    this.thuongHieus = [];
    // Kiểm tra các trường không được có ký tự đặc biệt và không được khoảng trống
    const specialCharPattern = /^[\p{L}\p{N}\s]+$/u; // Ký tự đặc biệt

    if (!this.thuongHieuAdd.tenThuongHieu) {
      this.notificationService.showError(
        'Vui lòng nhập đầy đủ thông tin tên thương hiệu.'
      );
      return;
    }

    // Kiểm tra tên
    if (!specialCharPattern.test(this.thuongHieuAdd.tenThuongHieu)) {
      this.notificationService.showError(
        'Tên thương hiệu không được chứa ký tự đặc biệt.'
      );
      return;
    }

    if (!this.thuongHieuAdd.xuatXu) {
      this.notificationService.showError(
        'Vui lòng nhập đầy đủ thông tin xuất xứ thương hiệu.'
      );
      return;
    }

    // Kiểm tra độ dài của tên thương hiệu sau khi xóa khoảng trắng đầu cuối
    const trimmedLength = this.thuongHieuAdd.tenThuongHieu.trim().length;
    if (trimmedLength < 2 || trimmedLength > 255) {
      this.notificationService.showWarning(
        'Tên thương hiệu phải từ 2 đến 255 ký tự.'
      );
      return;
    }

    if (confirm(`Bạn có muốn thêm thương hiệu: ${this.thuongHieuAdd.tenThuongHieu} không?`)) {
      this.thuongHieuService.createThuongHieu(this.thuongHieuAdd).subscribe({
        next: () => {
          this.notificationService.showSuccess('Thêm thương hiệu thành công');
          this.resetForm();
          this.fetchThuongHieus();
          this.closeModal('closeModalAdd');
        },
        error: (err) =>{
          this.notificationService.showError(err.error.message);
          console.error('Lỗi khi thêm thương hiệu:', err);
        }
      });
    }
  }

  /** Hàm submit cập nhật thương hiệu */
  submitUpdate() {
    let checkName: string = this.thuongHieuUpdate.tenThuongHieu;

    // Kiểm tra tên thương hiệu không được bỏ trống
    if (!checkName) {
      this.notificationService.showError('Tên thương hiệu không được bỏ trống');
      return;
    }

    let check: boolean = confirm(`Bạn có muốn cập nhật ${checkName} không?`);
    if (check) {
      // Kiểm tra xem thuongHieu đã có idThuongHieu hay chưa
      if (this.thuongHieuUpdate.idThuongHieu === null) {
        this.notificationService.showWarning(
          'Không có ID thương hiệu để cập nhật.'
        );
        return;
      }

      console.log(this.thuongHieuUpdate);
      this.thuongHieuService.callApiUpdateThuongHieu(this.thuongHieuUpdate).subscribe({
        next: (value: any) => {
          this.notificationService.showSuccess('Cập nhật thương hiệu thành công.');
          this.resetForm();
          this.fetchThuongHieus(); // Tải lại danh sách sau khi cập nhật
          this.closeModal('closeModalUpdate');
        },
        error: (err) => {
          console.error('Lỗi khi cập nhật thương hiệu:', err);
          this.notificationService.showError(
            'Cập nhật thương hiệu không thành công.'
          ); // Thông báo cho người dùng
        },
      });
    }
  }

  /** Closemodal để đống modal khi submitAdd và update */
  closeModal(idBtn: string) {
    const closeModalUpdate = document.getElementById(idBtn);
    if (closeModalUpdate) {
      closeModalUpdate.click();
    }
  }

  /** Hàm reset tìm kiếm */
  resetSearch() {
    this.thuongHieuSearch = {
      maThuongHieu: '',
      tenThuongHieu: '',
    };
    this.searchTH();
  }

  /** Hàm reset form sau khi add hoặc update thành công */
  resetForm(): void {
    this.thuongHieuAdd = {
      idThuongHieu: null,
      maThuongHieu: '',
      tenThuongHieu: '',
      giaTri: '',
      moTa: '',
      trangThai: 'ACTIVE', // Reset lại trạng thái mặc định
    };
  }

  /** onSubmit để khi submit sẽ hiển thị các trường validate */
  onSubmit() {
    if (this.form.valid) {
      console.log('Form submitted', this.form.value);
    }
  }

  /** Hàm tìm kiếm thương hiệu */
  searchTH() {
    this.paginatinonOfThuongHieu.page = 0; // Reset lại trang khi bắt đầu tìm kiếm
    this.fetchDataSearchThuongHieu();
  }

  ngOnInit(): void {
    this.fetchThuongHieus();
    this.fetchDataSearchThuongHieu();

    this.form = this.fb.group({
      maThuongHieu: [
        '',
        [
          Validators.required,
        ],
      ],
      tenThuongHieu: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(225),
        ],
      ],
      xuatXu: ['', Validators.required],
    });
  }

}
