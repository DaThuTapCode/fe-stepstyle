import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { DanhMucResponse } from '../../../../../../../models/danh-muc/response/danh-muc-response';
import { Pagination } from '../../../../../../../shared/type/pagination';
import { DanhMucService } from '../../../../../feature-product-management/services/danh-muc.service';
import { SttUtilsService } from '../../../../../../../shared/helper/stt-utils.service';
import { NotificationService } from '../../../../../../../shared/notification.service';
import { DanhMucSearchRequest } from '../../../../../../../models/danh-muc/request/danh-muc-search-request';
import { DateUtilsService } from '../../../../../../../shared/helper/date-utils.service';

@Component({
  selector: 'app-danh-muc-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './danh-muc-list.component.html',
  styleUrl: './danh-muc-list.component.scss'
})
export class DanhMucListComponent implements OnInit{
  danhMucs: DanhMucResponse[] = [];
  form!: FormGroup;
  /**Phân trang */
  size: number = 5;
  page: number = 0;
  totalPages: number = 1; /**Bắt sự kiện thay đổi trang */
  paginatinonOfDM: Pagination = {
    size: 5,
    page: 0,
    totalElements: 0,
    totalPages: 0,
    first: false,
    last: false
  }

  constructor(
    private danhMucService: DanhMucService,
    private router: Router,
    private fb: FormBuilder,
    private sttService: SttUtilsService,
    private dateUtilsService: DateUtilsService,
    private notificationService: NotificationService
  ) {}

  /** Hàm tải dữ liệu danh sách danh mục */
  fetchDataDanhMucs(): void {
    this.danhMucService.getAllDanhMuc().subscribe({
      next: (response: any) => {
        this.danhMucs = response.data;
        console.log('DanhMucs', this.danhMucs);
      },
      error: (err: any) => {
        console.error('Lỗi khi lấy danh sách danh mục: ', err);
      },
    });
  }

  /** Hàm tìm kiếm phân trang danh mục */
  fetchDataSearchDanhMuc() {
    this.danhMucService
      .searchPageDanhMuc(this.danhMucSearch, this.paginatinonOfDM.page, this.paginatinonOfDM.size)
      .subscribe({
        next: (res: any) => {
          this.danhMucs = res.data.content;
          this.paginatinonOfDM.totalPages = res.data.totalPages;
          this.paginatinonOfDM.page = res.data.pageable.pageNumber;
          this.paginatinonOfDM.first = res.data.first;
          this.paginatinonOfDM.last = res.data.last;
          console.log('DanhMucPage', res);
        },
      });
  }

  /** Hàm bắt sự kiện thay đổi trang */
  changePage(pageNew: number) {
    this.page = pageNew;
    this.fetchDataSearchDanhMuc();
  }

  /** Phân trang danh mục*/
  danhMucSearch: DanhMucSearchRequest = {
    maDanhMuc: '',
    tenDanhMuc: ''
  };

  /** Khởi tạo đối tượng danh mục add */
  danhMucAdd: any = {
    idDanhMuc: null,
    maDanhMuc: '',
    tenDanhMuc: '',
    moTa: '',
    ngayTao: '',
    ngayChinhSua: '',
    trangThai: 'ACTIVE'
  };

  /** Khởi tạo đối tượng danh mục update */
  danhMucUpdate: any = {
    idDanhMuc: null,
    maDanhMuc: '',
    tenDanhMuc: '',
    moTa: '',
    trangThai: 'ACTIVE'
  };

  /** Khởi tạo đối tượng danh mục detail */
  danhMucDetail: DanhMucResponse = {
    idDanhMuc: 0,
    maDanhMuc: '',
    tenDanhMuc: '',
    moTa: '',
    ngayTao: null,
    ngayChinhSua: null,
    trangThai: 'ACTIVE'
  };

  /** Hàm bắt sự kiện xem chi tiết danh mục */
  handleDetailDanhMuc(danhMuc: any): void {
    this.danhMucDetail = danhMuc;
  }

  /** Hàm lấy dữ liệu cập nhật danh mục */
  handleUpdateDanhMuc(idDanhMucs: number): void {
    this.danhMucs.forEach((danhMucs) => {
      if (danhMucs.idDanhMuc === idDanhMucs) {
        this.danhMucUpdate.idDanhMuc = danhMucs.idDanhMuc;
        this.danhMucUpdate.maDanhMuc = danhMucs.maDanhMuc;
        this.danhMucUpdate.tenDanhMuc = danhMucs.tenDanhMuc;
        this.danhMucUpdate.moTa = danhMucs.moTa;
        this.danhMucUpdate.ngayTao = danhMucs.ngayTao;
        this.danhMucUpdate.ngayChinhSua = danhMucs.ngayChinhSua;
        this.danhMucUpdate.trangThai = danhMucs.trangThai;
        console.log(this.danhMucUpdate);
      }
    });
  }

  /**Hàm bắt sự kiện đổi trang trong danh mục */
  handlePageSPCTChange(type: string) {
    if (type === 'pre') {
      this.paginatinonOfDM.page -= 1;
    } else if (type === 'next') {
      this.paginatinonOfDM.page += 1;
    }
    this.fetchDataSearchDanhMuc();
  }
  /**Tính stt */
  tinhSTT(page: number, size: number, current: number): number {
    return this.sttService.tinhSTT(page, size, current);
  }

  /** Hàm submit form thêm danh mục */
  submitAdd(): void {
    const dm = this.form.get('danhMuc')?.value;
    this.danhMucs = [];
    // Kiểm tra các trường không được có ký tự đặc biệt và không được khoảng trống
    const specialCharPattern = /^[\p{L}\p{N}\s]+$/u; // Ký tự đặc biệt

    if (!this.danhMucAdd.tenDanhMuc) {
      this.notificationService.showError('Vui lòng nhập đầy đủ thông tin tên danh mục.');
      return;
    }

    // Kiểm tra tên
    if (!specialCharPattern.test(this.danhMucAdd.tenDanhMuc)) {
      this.notificationService.showError('Tên danh mục không được chứa ký tự đặc biệt.');
      return;
    }

    // Kiểm tra tên danh mục không được là số
    if (!isNaN(Number(this.danhMucAdd.tenDanhMuc.trim()))) {
      this.notificationService.showError('Tên danh mục không được là số.');
      return;
    }

    // Kiểm tra độ dài của tên danh mục sau khi xóa khoảng trắng đầu cuối
    const doDaiTen = this.danhMucAdd.tenDanhMuc.trim().length;
    if (doDaiTen < 2 || doDaiTen > 255) {
      this.notificationService.showWarning('Tên danh mục phải từ 2 đến 255 ký tự.');
      return;
    }

    if (confirm(`Bạn có muốn thêm danh mục: ${this.danhMucAdd.tenDanhMuc} không?`)) {
      this.danhMucService.createDanhMuc(this.danhMucAdd).subscribe({
        next: () => {
          this.notificationService.showSuccess('Thêm danh mục thành công');
          this.resetForm();
          this.fetchDataDanhMucs();
          this.closeModal('closeModalAdd');
        },
        error: (err) => {
          this.notificationService.showError(err.error.message);
          console.error('Lỗi khi thêm danh mục:', err);
          this.fetchDataDanhMucs();
        }
      });
    }
  }

  /** Hàm submit cập nhật danh mục */
  submitUpdate() {
    const checkName: string = this.danhMucUpdate.tenDanhMuc?.trim(); // Loại bỏ khoảng trắng thừa
    const specialCharPattern = /^[\p{L}\p{N}\s]+$/u; // Ký tự đặc biệt

    // Kiểm tra kích cỡ không được bỏ trống
    if (!checkName) {
      this.notificationService.showError('Tên danh mục không được bỏ trống.');
      return;
    }

    // Kiểm tra giá trị kích cỡ phải là số
    if (isNaN(Number(this.danhMucUpdate.tenDanhMuc.trim()))) {
      this.notificationService.showError('Tên danh mục phải là số.');
      return;
    }

    // Kiểm tra  kích cỡ không được chứa ký tự đặc biệt
    if (!specialCharPattern.test(checkName)) {
      this.notificationService.showError('Tên danh mục không được chứa ký tự đặc biệt.');
      return;
    }

    // Kiểm tra độ dài  kích cỡ
    const nameLength = checkName.length;
    if (nameLength < 2 || nameLength > 255) {
      this.notificationService.showWarning('Tên danh mục phải từ 2 đến 255 ký tự.');
      return;
    }
    let check: boolean = confirm(`Bạn có muốn cập nhật ${checkName} không?`);
    if (check) {
      // Kiểm tra xem danhMuc đã có id danh mục hay chưa
      if (
        this.danhMucUpdate.idDanhMuc === null ||
        this.danhMucUpdate.idDanhMuc === undefined
      ) {
        this.notificationService.showWarning(
          'Không có ID danh mục để cập nhật.'
        );
        return;
      }

      console.log(this.danhMucUpdate);
      this.danhMucService
        .callApiUpdateDanhMuc(this.danhMucUpdate)
        .subscribe({
          next: (value: any) => {
            this.notificationService.showSuccess(
              'Cập nhật danh mục thành công.'
            );
            this.resetForm();
            this.fetchDataDanhMucs(); // Tải lại danh sách sau khi cập nhật
            this.closeModal('closeModalUpdate');
          },
          error: (err) => {
            console.error('Lỗi khi cập nhật danh mục:', err);
            this.notificationService.showError(err.error.message);
            this.notificationService.showError(
              'Cập nhật danh mục không thành công.'
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
    this.danhMucAdd = {
      idDanhMuc: null,
      maDanhMuc: '',
      tenDanhMuc: '',
      moTa: '',
      ngayTao: '',
      ngayChinhSua: '',
      trangThai: 'ACTIVE', // Reset lại trạng thái mặc định
    };
  }

  /** Hàm reset tìm kiếm */
  resetSearch() {
    this.danhMucSearch = {
      maDanhMuc: '',
      tenDanhMuc: ''
    };
    this.searchDM();
  }

  /** Hàm tìm kiếm danh mục */
  searchDM() {
    this.paginatinonOfDM.page = 0; // Reset lại trang khi bắt đầu tìm kiếm
    this.fetchDataSearchDanhMuc();
  }

  ngOnInit(): void {
    this.fetchDataDanhMucs();
    this.fetchDataSearchDanhMuc();

    this.form = this.fb.group({
      tenDanhMuc: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

}
