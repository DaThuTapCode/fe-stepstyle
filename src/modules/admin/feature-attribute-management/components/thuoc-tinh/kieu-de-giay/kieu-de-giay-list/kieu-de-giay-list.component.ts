import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { KieuDeGiayService } from '../../../../service/kieu-de-giay.service';
import { KieuDeGiayResponse } from '../../../../../../../models/kieu-de-giay/response/kieu-de-giay-response';
import { KieuDeGiaySearchRequest } from '../../../../../../../models/kieu-de-giay/request/kieu-de-giay-search-request';

@Component({
  selector: 'app-kieu-de-giay-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './kieu-de-giay-list.component.html',
  styleUrl: './kieu-de-giay-list.component.scss',
})
export class KieuDeGiayListComponent implements OnInit {

  kieuDeGiays: KieuDeGiayResponse[] = [];
  form!: FormGroup;
  page: number = 0; // Giá trị mặc định của trang là 1
  size: number = 1;
  dataSearch: string = '';
  totalPages: number = 1;

  constructor(
    private kieuDeGiayService: KieuDeGiayService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  /** Hàm tải dữ liệu danh sách kiểu đế giày */
  fetchDataKieuDeGiays(): void {
    this.kieuDeGiayService.getAllKieuDeGiay().subscribe({
      next: (response: any) => {
        this.kieuDeGiays = response.data;
        console.log('KieuDeGiays', this.kieuDeGiays);
      },
      error: (err: any) => {
        console.error('Lỗi khi lấy danh sách kiểu đế giày: ', err);
      },
    });
  }

  /** Hàm tìm kiếm phân trang kiểu đế giày */
  fetchDataSearchKieuDeGiay() {
    this.kieuDeGiayService
      .searchPageKieuDeGiay(this.kieuDeGiaySearchRequest, this.page, this.size)
      .subscribe({
        next: (response: any) => {
          this.kieuDeGiays = response.data.content;
          this.totalPages = response.data.totalPages;
          console.log('KieuDeGiayPage', response);
        },
      });
  }

  /** Hàm bắt sự kiện thay đổi trang */
  changePage(pageNew: number) {
    this.page = pageNew;
    this.fetchDataSearchKieuDeGiay();
  }

  /** Phân trang kiểu đế giày*/
  kieuDeGiaySearchRequest: KieuDeGiaySearchRequest = {
    maKieuDeGiay: null,
    tenKieuDeGiay: null,
  };


  /** Khởi tạo đối tượng kiểu đế giày add */
  kieuDeGiayAdd: any = {
    idKieuDeGiay: null,
    maKieuDeGiay: '',
    tenKieuDeGiay: '',
    giaTri: '',
    moTa: '',
    trangThai: 'ACTIVE', // Mặc định trạng thái là ACTIVE
  };

  /** Khởi tạo đối tượng kiểu đế giày update */
  kieuDeGiayUpdate: any = {
    idKieuDeGiay: null,
    maKieuDeGiay: '',
    tenKieuDeGiay: '',
    giaTri: '',
    moTa: '',
    trangThai: 'ACTIVE', // Mặc định trạng thái là ACTIVE
  };
  
  /** Khởi tạo đối tượng kieu de giay update */
  kieuDeGiayDetail: KieuDeGiayResponse = {
    idKieuDeGiay: 0,
    maKieuDeGiay: '',
    tenKieuDeGiay: '',
    giaTri: '',
    moTa: '',
    trangThai: 'ACTIVE',
  };

  /** Hàm bắt sự kiện xem chi tiết kiểu đế giày */
  handleDetailKieuDeGiay(kieuDeGiay: any): void {
    this.kieuDeGiayDetail = kieuDeGiay;
  }

  /** Hàm lấy dữ liệu cập nhật kiểu đế giày */
  handleUpdateKieuDeGiay(idKieuDeGiays: number): void {
    this.kieuDeGiays.forEach((kieuDeGiays) => {
      if (kieuDeGiays.idKieuDeGiay === idKieuDeGiays) {
        this.kieuDeGiayUpdate.idKieuDeGiay = kieuDeGiays.idKieuDeGiay;
        this.kieuDeGiayUpdate.maKieuDeGiay = kieuDeGiays.maKieuDeGiay;
        this.kieuDeGiayUpdate.tenKieuDeGiay = kieuDeGiays.tenKieuDeGiay;
        this.kieuDeGiayUpdate.giaTri = kieuDeGiays.giaTri;
        this.kieuDeGiayUpdate.moTa = kieuDeGiays.moTa;
        this.kieuDeGiayUpdate.trangThai = kieuDeGiays.trangThai;
        console.log(this.kieuDeGiayUpdate);
      }
    });
  }

  /** Hàm submit form thêm kiểu đế giày */
  submitAdd(): void {
    if (!this.kieuDeGiayAdd.maKieuDeGiay) {
      alert('Vui lòng nhập đầy đủ thông tin mã kiểu đế giày.');
      return;
    }
    if (!this.kieuDeGiayAdd.tenKieuDeGiay) {
      alert('Vui lòng nhập đầy đủ thông tin tên kiểu đế giày.');
      return;
    }
    /**  Kiểm tra độ dài của mã kiểu đế giày và tên kiểu đế giày */
    if (
      this.kieuDeGiayAdd.maKieuDeGiay.length < 5 ||
      this.kieuDeGiayAdd.maKieuDeGiay.length > 10
    ) {
      alert('Mã kiểu đế giày phải từ 5 đến 10 ký tự.');
      return;
    }

    if (
      this.kieuDeGiayAdd.tenKieuDeGiay.length < 2 ||
      this.kieuDeGiayAdd.tenKieuDeGiay.length > 255
    ) {
      alert('Tên kiểu đế giày phải từ 2 đến 255 ký tự.');
      return;
    }

    if (
      confirm(
        `Bạn có muốn thêm kiểu đế giày: ${this.kieuDeGiayAdd.maKieuDeGiay} không?`
      )
    ) {
      this.kieuDeGiayService.postAddKieuDeGiay(this.kieuDeGiayAdd).subscribe({
        next: () => {
          alert('Thêm kiểu đế giày thành công');
          this.resetForm();
          this.fetchDataKieuDeGiays();
          this.closeModal('closeModalAdd');
        },
        error: (err) => console.error('Lỗi khi thêm kiểu đế giày:', err),
      });
    }
  }

  /** Hàm submit cập nhật kiểu đế giày */
  submitUpdate() {
    if (!this.kieuDeGiayUpdate || !this.kieuDeGiayUpdate.maKieuDeGiay) {
      alert('Xin vui lòng nhập mã kiểu đế giày');
      return;
    }

    let checkName: string = this.kieuDeGiayUpdate.maKieuDeGiay;
    if (checkName.length < 1) {
      alert('Xin vui lòng nhập mã kiểu đế giày');
      return;
    }

    let check: boolean = confirm(`Bạn có muốn cập nhật ${checkName} không?`);
    if (check) {
      // Kiểm tra xem kieuDeGiay đã có id kiểu đế giày hay chưa
      if (
        this.kieuDeGiayUpdate.idKieuDeGiay === null ||
        this.kieuDeGiayUpdate.idKieuDeGiay === undefined
      ) {
        alert('Không có ID kiểu đế giày để cập nhật.');
        return;
      }

      console.log(this.kieuDeGiayUpdate);
      this.kieuDeGiayService
        .putUpdateKieuDeGiay(this.kieuDeGiayUpdate)
        .subscribe({
          next: (value: any) => {
            alert('Cập nhật kiểu đế giày thành công.');
            this.resetForm();
            this.fetchDataKieuDeGiays(); // Tải lại danh sách sau khi cập nhật
            this.closeModal('closeModalUpdate');
          },
          error: (err) => {
            console.error('Lỗi khi cập nhật kiểu đế giày:', err);
            alert('Cập nhật kiểu đế giày không thành công.'); // Thông báo cho người dùng
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
    this.kieuDeGiayAdd = {
      idKieuDeGiay: null,
      maKieuDeGiay: '',
      tenKieuDeGiay: '',
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
    this.fetchDataKieuDeGiays();
    this.fetchDataSearchKieuDeGiay();
    this.form = this.fb.group({
      maKieuDeGiay: ['', Validators.required],
      tenKieuDeGiay: ['', [Validators.required, Validators.minLength(3)]]
    });
  }
}
