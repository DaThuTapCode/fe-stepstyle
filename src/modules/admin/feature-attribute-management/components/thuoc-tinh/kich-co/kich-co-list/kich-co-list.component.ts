import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators,} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { KichCoService } from '../../../../service/kich-co.service';
import { KichCoResponse } from '../../../../../../../models/kich-co/response/kich-co-response';
import { KichCoSearchRequest } from '../../../../../../../models/kich-co/request/kich-co-search-request';
import { NotificationService } from '../../../../../../../shared/notification.service';
import { Pagination } from '../../../../../../../shared/type/pagination';
import { SttUtilsService } from '../../../../../../../shared/helper/stt-utils.service';

@Component({
  selector: 'app-kich-co-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './kich-co-list.component.html',
  styleUrl: './kich-co-list.component.scss',
})
export class KichCoListComponent implements OnInit {

  kichCos: KichCoResponse[] = [];
  form!: FormGroup;
  /**Phân trang */
  size: number = 5;
  page: number = 0;
  totalPages: number = 1;  /**Bắt sự kiện thay đổi trang */
  paginatinonOfKC: Pagination = {
    size: 5,
    page: 0,
    totalElements: 0,
    totalPages: 0,
    first: false,
    last: false
  }

  constructor(
    private kichCoService: KichCoService,
    private router: Router,
    private fb: FormBuilder,
    private sttService: SttUtilsService,
    private notificationService: NotificationService
  ) {}

  /** Hàm tải dữ liệu danh sách kích cỡ */
  fetchDataKichCos(): void {
    this.kichCoService.getAllKichCo().subscribe({
      next: (response: any) => {
        this.kichCos = response.data;
        console.log('KichCos', this.kichCos);
      },
      error: (err: any) => {
        console.error('Lỗi khi lấy danh sách kích cỡ: ', err);
      },
    });
  }

  /** Hàm tìm kiếm phân trang kích cỡ */
  fetchDataSearchKichCo() {
    this.kichCoService.searchPageKichCo(this.kichCoSearchRequest, this.paginatinonOfKC.page, this.paginatinonOfKC.size).subscribe({
        next: (res: any) => {
          this.kichCos = res.data.content;
          this.paginatinonOfKC.totalPages = res.data.totalPages;
          this.paginatinonOfKC.page = res.data.pageable.pageNumber;
          this.paginatinonOfKC.first = res.data.first;
          this.paginatinonOfKC.last = res.data.last;
          console.log('KichCoPage', res);
        },
      });
  }

  /** Hàm bắt sự kiện thay đổi trang */
  changePage(pageNew: number) {
    this.page = pageNew;
    this.fetchDataSearchKichCo();
  }

  /** Phân trang kích cỡ*/
  kichCoSearchRequest: KichCoSearchRequest = {
    maKichCo: '',
    giaTri: null
  };

  /**Hàm bắt sự kiện đổi trang trong modal kích cỡ */
  handlePageKCChange(type: string) {
    if (type === 'pre') {
      this.paginatinonOfKC.page -= 1;
    } else if (type === 'next') {
      this.paginatinonOfKC.page += 1;
    }
    this.fetchDataSearchKichCo();
  }

  /**Tính stt */
  tinhSTT(page: number, size: number, current: number): number {
    return this.sttService.tinhSTT(page, size, current);
  }

  /** Khởi tạo đối tượng kích cỡ add */
  kichCoAdd: any = {
    idKichCo: null,
    maKichCo: '',
    giaTri: null,
    moTa: '',
    trangThai: 'ACTIVE', // Mặc định trạng thái là ACTIVE
  };

  /** Khởi tạo đối tượng kích cỡ update */
  kichCoUpdate: any = {
    idKichCo: null,
    maKichCo: '',
    giaTri: null,
    moTa: '',
    trangThai: 'ACTIVE', // Mặc định trạng thái là ACTIVE
  };

  /** Khởi tạo đối tượng kích cỡ detail */
  kichCoDetail: KichCoResponse = {
    idKichCo: 0,
    maKichCo: '',
    giaTri: 0,
    moTa: '',
    trangThai: 'ACTIVE',
  };

  /** Hàm bắt sự kiện xem chi tiết kích cỡ */
  handleDetailKichCo(kichCo: any): void {
    this.kichCoDetail = kichCo;
  }

  /** Hàm lấy dữ liệu cập nhật kích cỡ */
  handleUpdateKichCo(idKichCos: number): void {
    this.kichCos.forEach((kichCos) => {
      if (kichCos.idKichCo === idKichCos) {
        this.kichCoUpdate.idKichCo = kichCos.idKichCo;
        this.kichCoUpdate.maKichCo = kichCos.maKichCo;
        this.kichCoUpdate.giaTri = kichCos.giaTri;
        this.kichCoUpdate.moTa = kichCos.moTa;
        this.kichCoUpdate.trangThai = kichCos.trangThai;
        console.log(this.kichCoUpdate);
      }
    });
  }

  /** Hàm submit form thêm kích cỡ */
  submitAdd(): void {
    const kc = this.form.get('kichCo')?.value;
    this.kichCos = [];
    // Kiểm tra các trường không được có ký tự đặc biệt và không được khoảng trống
    const specialCharPattern = /^[\p{L}\p{N}\s]+$/u; // Ký tự đặc biệt

    if (!this.kichCoAdd.giaTri) {
      this.notificationService.showError('Vui lòng nhập đầy đủ thông tin giá trị kích cỡ.');
      return;
    }

    // Kiểm tra Giá trị
    if (!specialCharPattern.test(this.kichCoAdd.giaTri)) {
      this.notificationService.showError('Giá trị kích cỡ không được chứa ký tự đặc biệt.');
      return;
    }

    // Kiểm tra giá trị kích cỡ phải là số
    if (isNaN(Number(this.kichCoAdd.giaTri.trim()))) {
      this.notificationService.showError('Giá trị kích cỡ phải là số.');
      return;
    }

    // Kiểm tra độ dài của giá trị kích cỡ sau khi xóa khoảng trắng đầu cuối
    const doDaiTen = this.kichCoAdd.giaTri.trim().length;
    if (doDaiTen < 2 || doDaiTen > 255) {
      this.notificationService.showWarning('Giá trị kích cỡ phải từ 2 đến 255 ký tự.');
      return;
    }


    if (confirm(`Bạn có muốn thêm kích cỡ: ${this.kichCoAdd.giaTri} không?`)) {
      this.kichCoService.postAddKichCo(this.kichCoAdd).subscribe({
        next: () => {
          this.notificationService.showSuccess('Thêm kích cỡ thành công');
          this.resetForm();
          this.fetchDataKichCos();
          this.closeModal('closeModalAdd');
        },
        error: (err) =>{
          this.notificationService.showError(err.error.message);
          console.error('Lỗi khi thêm kích cỡ:', err);
          this.fetchDataKichCos();
        }
      });
    }
  }

  /** Hàm submit cập nhật kích cỡ */
  submitUpdate() {
    const checkGiaTri: string = this.kichCoUpdate.giaTri?.trim(); // Loại bỏ khoảng trắng thừa
    const specialCharPattern = /^[\p{L}\p{N}\s]+$/u; // Ký tự đặc biệt

    // Kiểm tra kích cỡ không được bỏ trống
    if (!checkGiaTri) {
      this.notificationService.showError('Giá trị kích cỡ không được bỏ trống.');
      return;
    }

    // Kiểm tra giá trị kích cỡ phải là số
    if (isNaN(Number(this.kichCoUpdate.giaTri.trim()))) {
      this.notificationService.showError('Giá trị kích cỡ phải là số.');
      return;
    }

    // Kiểm tra  kích cỡ không được chứa ký tự đặc biệt
    if (!specialCharPattern.test(checkGiaTri)) {
      this.notificationService.showError('Giá trị kích cỡ không được chứa ký tự đặc biệt.');
      return;
    }

    // Kiểm tra độ dài  kích cỡ
    const nameLength = checkGiaTri.length;
    if (nameLength < 2 || nameLength > 255) {
      this.notificationService.showWarning('Giá trị kích cỡ phải từ 2 đến 255 ký tự.');
      return;
    }

    let check: boolean = confirm(`Bạn có muốn cập nhật ${checkGiaTri} không?`);
    if (check) {
      // Kiểm tra xem CLDGUpdate đã có id kích cỡ hay chưa
      if (
        this.kichCoUpdate.idKichCo === null ||
        this.kichCoUpdate.idKichCo === undefined
      ) {
        this.notificationService.showError('Không có ID kích cỡ đế giày để cập nhật.');
        return;
      }

      console.log(this.kichCoUpdate);
      this.kichCoService.putUpdateKichCo(this.kichCoUpdate).subscribe({
        next: (value: any) => {
          this.notificationService.showSuccess('Cập nhật kích cỡ thành công.');
          this.resetForm();
          this.fetchDataKichCos(); // Tải lại danh sách sau khi cập nhật
          this.closeModal('closeModalUpdate');
        },
        error: (err) => {
          console.error('Lỗi khi cập nhật kích cỡ:', err);
          this.notificationService.showError(err.error.message);
          this.notificationService.showError('Cập nhật kích cỡ không thành công.'); // Thông báo cho người dùng
        },
      });
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
    this.kichCoAdd = {
      idKichCo: null,
      maKichCo: '',
      giaTri: '',
      moTa: '',
      trangThai: 'ACTIVE', // Reset lại trạng thái mặc định
    };
  }

  /** Hàm reset tìm kiếm */
  resetSearch() {
    this.kichCoSearchRequest = {
      maKichCo: '',
      giaTri: null
    };
    this.searchKC();
  }

  /** Hàm tìm kiếm kích cỡ */
  searchKC() {
    this.paginatinonOfKC.page = 0; // Reset lại trang khi bắt đầu tìm kiếm
    this.fetchDataSearchKichCo();
  }

  /** onSubmit để khi submit sẽ hiển thị các trường validate */
  onSubmit() {
    if (this.form.valid) {
      console.log('Form submitted', this.form.value);
    }
  }

  ngOnInit(): void {
    this.fetchDataKichCos();
    this.fetchDataSearchKichCo();
    this.form = this.fb.group({
      maKichCo: ['', Validators.required],
      giaTri: ['', [Validators.required, Validators.minLength(2)]],
    });
  }
}
