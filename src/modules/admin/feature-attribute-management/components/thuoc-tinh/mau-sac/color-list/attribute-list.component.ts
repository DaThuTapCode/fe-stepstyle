import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MauSacService } from '../../../../service/mau-sac.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MauSacResponse } from '../../../../../../../models/mau-sac/response/mau-sac-response';
import { MauSacSearch } from '../../../../../../../models/mau-sac/request/mau-sac-search';
import { NotificationService } from '../../../../../../../shared/notification.service';

@Component({
  selector: 'app-attribute-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './attribute-list.component.html',
  styleUrls: ['./attribute-list.component.scss'],
})
export class AttributeListComponent implements OnInit {
  form!: FormGroup;
  mauSacs: MauSacResponse[] = [];
  /**Phân trang */
  size: number = 5;
  page: number = 0;
  totalPages: number = 1; /**Bắt sự kiện thay đổi trang */
  dataSearch = {
    maMauSac: '',
  };

  /** Khởi tạo đối tượng màu sắc add */
  mauSacAdd: any = {
    idMauSac: null,
    maMauSac: '',
    tenMau: '',
    giaTri: '',
    moTa: '',
    trangThai: 'ACTIVE', // Mặc định trạng thái là ACTIVE
  };

  /** Khởi tạo đối tượng màu sắc update */
  mauSacUpdate: any = {
    idMauSac: null,
    maMauSac: '',
    tenMau: '',
    giaTri: '',
    moTa: '',
    trangThai: 'ACTIVE', // Mặc định trạng thái là ACTIVE
  };

  /** Khởi tạo đối tượng màu sắc update */
  mauSacDetail: MauSacResponse = {
    idMauSac: 0,
    maMauSac: '',
    tenMau: '',
    giaTri: '',
    moTa: '',
    trangThai: 'ACTIVE',
  };

  /** Phân trang màu sắc*/
  mauSacSearch: MauSacSearch = {
    maMauSac: null,
    tenMau: null,
  };

  constructor(
    private mauSacService: MauSacService,
    private router: Router,
    private fb: FormBuilder,
    private notificationService: NotificationService
  ) {}

  /** Hàm tải dữ liệu danh sách màu sắc */
  fetchDataMauSacs(): void {
    this.mauSacService.getAllMauSac().subscribe({
      next: (response: any) => {
        this.mauSacs = response.data;
        console.log('MauSacs', this.mauSacs);
      },
      error: (err: any) => {
        console.error('Lỗi khi lấy danh sách màu sắc: ', err);
      },
    });
  }

  /** Hàm tìm kiếm phân trang màu sắc */
  fetchDataSearchMauSac() {
    this.mauSacService
      .searchPageMauSac(this.mauSacSearch, this.page, this.size)
      .subscribe({
        next: (response: any) => {
          this.mauSacs = response.data.content;
          this.totalPages = response.data.totalPages;
          console.log('MauSacPage', response);
        },
      });
  }

  /** Hàm bắt sự kiện thay đổi trang */
  changePage(pageNew: number) {
    this.page = pageNew;
    this.fetchDataSearchMauSac();
  }

  /** Hàm bắt sự kiện xem chi tiết màu sắc */
  handleDetailMauSac(mauSac: any): void {
    this.mauSacDetail = mauSac;
  }

  /** Hàm lấy dữ liệu cập nhật màu sắc */
  handleUpdateMauSac(idMauSacs: number): void {
    this.mauSacs.forEach((mauSac) => {
      if (mauSac.idMauSac === idMauSacs) {
        this.mauSacUpdate.idMauSac = mauSac.idMauSac;
        this.mauSacUpdate.maMauSac = mauSac.maMauSac;
        this.mauSacUpdate.tenMau = mauSac.tenMau;
        this.mauSacUpdate.giaTri = mauSac.giaTri;
        this.mauSacUpdate.moTa = mauSac.moTa;
        this.mauSacUpdate.trangThai = mauSac.trangThai;
        console.log(this.mauSacUpdate);
      }
    });
  }

  /** Hàm submit form thêm màu sắc */
  submitAdd(): void {
    const ms = this.form.get('mauSac')?.value;
    this.mauSacs = [];
    // Kiểm tra các trường không được có ký tự đặc biệt và không được khoảng trống
    const specialCharPattern = /^[\p{L}\p{N}\s]+$/u; // Ký tự đặc biệt

    if (!this.mauSacAdd.tenMau) {
      this.notificationService.showError(
        'Vui lòng nhập đầy đủ thông tin tên màu sắc.'
      );
      return;
    }

    // Kiểm tra tên
    if (!specialCharPattern.test(this.mauSacAdd.tenMau)) {
      this.notificationService.showError(
        'Tên màu sắc không được chứa ký tự đặc biệt.'
      );
      return;
    }

    if (!this.mauSacAdd.giaTri) {
      this.notificationService.showError(
        'Vui lòng nhập đầy đủ thông tin giá trị màu sắc.'
      );
      return;
    }

    // Kiểm tra độ dài của tên màu sắc sau khi xóa khoảng trắng đầu cuối
    const trimmedLength = this.mauSacAdd.tenMau.trim().length;
    if (trimmedLength < 2 || trimmedLength > 255) {
      this.notificationService.showWarning(
        'Tên màu sắc phải từ 2 đến 255 ký tự.'
      );
      return;
    }

    if (confirm(`Bạn có muốn thêm màu sắc: ${this.mauSacAdd.tenMau} không?`)) {
      this.mauSacService.postAddMauSac(this.mauSacAdd).subscribe({
        next: () => {
          this.notificationService.showSuccess('Thêm màu sắc thành công');
          this.resetForm();
          this.fetchDataMauSacs();
          this.closeModal('closeModalAdd');
        },
        error: (err) =>{
          this.notificationService.showError(err.error.message);
          console.error('Lỗi khi thêm màu sắc:', err);
        }
      });
    }
  }

  /** Hàm submit cập nhật màu sắc */
  submitUpdate() {
    let checkName: string = this.mauSacUpdate.tenMau;
    let checkGiaTri: string = this.mauSacUpdate.giaTri;

    // Kiểm tra tên màu sắc không được bỏ trống
    if (!checkName) {
      this.notificationService.showError('Tên màu sắc không được bỏ trống');
      return;
    }
    // Kiểm tra giá trị màu sắc không được bỏ trống
    if (!checkGiaTri || checkGiaTri.length < 1) {
      this.notificationService.showError(
        'Giá trị màu sắc không được bỏ trống.'
      );
      return;
    }

    let check: boolean = confirm(`Bạn có muốn cập nhật ${checkName} không?`);
    if (check) {
      // Kiểm tra xem mauSac đã có idMauSac hay chưa
      if (this.mauSacUpdate.idMauSac === null) {
        this.notificationService.showWarning(
          'Không có ID màu sắc để cập nhật.'
        );
        return;
      }

      console.log(this.mauSacUpdate);
      this.mauSacService.putUpdateMauSac(this.mauSacUpdate).subscribe({
        next: (value: any) => {
          this.notificationService.showSuccess('Cập nhật màu sắc thành công.');
          this.resetForm();
          this.fetchDataMauSacs(); // Tải lại danh sách sau khi cập nhật
          this.closeModal('closeModalUpdate');
        },
        error: (err) => {
          console.error('Lỗi khi cập nhật màu sắc:', err);
          this.notificationService.showError(
            'Cập nhật màu sắc không thành công.'
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

  /** Hàm reset form sau khi add hoặc update thành công */
  resetForm(): void {
    this.mauSacAdd = {
      idMauSac: null,
      maMauSac: '',
      tenMau: '',
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

  ngOnInit(): void {
    this.fetchDataMauSacs();
    this.fetchDataSearchMauSac();

    this.form = this.fb.group({
      tenMau: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(225),
        ],
      ],
      giaTri: ['', Validators.required],
    });
  }
}
