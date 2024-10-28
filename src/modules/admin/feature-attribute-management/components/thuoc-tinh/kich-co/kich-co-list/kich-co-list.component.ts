import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { KichCoService } from '../../../../service/kich-co.service';
import { KichCoResponse } from '../../../../../../../models/kich-co/response/kich-co-response';
import { KichCoSearchRequest } from '../../../../../../../models/kich-co/request/kich-co-search-request';

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
  dataSearch = {
    maKichCo: ''
  }

  constructor(
    private kichCoService: KichCoService,
    private router: Router,
    private fb: FormBuilder
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
    this.kichCoService
      .searchPageKichCo(this.kichCoSearchRequest, this.page, this.size)
      .subscribe({
        next: (response: any) => {
          this.kichCos = response.data.content;
          this.totalPages = response.data.totalPages;
          console.log('KichCoPage', response);
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
    maKichCo: null,
    giaTri: null,
  };

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
    if (!this.kichCoAdd.maKichCo) {
      alert('Vui lòng nhập đầy đủ thông tin mã kích cỡ.');
      return;
    }
    if (!this.kichCoAdd.giaTri) {
      alert('Vui lòng nhập đầy đủ thông tin giá trị kích cỡ.');
      return;
    }
    /**  Kiểm tra độ dài của mã kích cỡ và tên kích cỡ */
    if (
      this.kichCoAdd.maKichCo.length < 5 ||
      this.kichCoAdd.maKichCo.length > 10
    ) {
      alert('Mã kích cỡ phải từ 5 đến 10 ký tự.');
      return;
    }

    if (
      this.kichCoAdd.giaTri.length < 2 ||
      this.kichCoAdd.giaTri.length > 255
    ) {
      alert('Giá trị kích cỡ phải từ 2 đến 255 ký tự.');
      return;
    }

    if (confirm(`Bạn có muốn thêm kích cỡ: ${this.kichCoAdd.maKichCo} không?`)
    ) {
      this.kichCoService.postAddKichCo(this.kichCoAdd).subscribe({
        next: () => {
          alert('Thêm kích cỡ thành công');
          this.resetForm();
          this.fetchDataKichCos();
          this.closeModal('closeModalAdd');
        },
        error: (err) => console.error('Lỗi khi thêm kích cỡ:', err),
      });
    }
  }

  /** Hàm submit cập nhật kích cỡ */
  submitUpdate() {
    if (!this.kichCoUpdate || !this.kichCoUpdate.maKichCo) {
      alert('Xin vui lòng nhập mã kích cỡ');
      return;
    }

    let checkName: string = this.kichCoUpdate.maKichCo;
    if (checkName.length < 1) {
      alert('Xin vui lòng nhập mã kích cỡ');
      return;
    }

    let check: boolean = confirm(`Bạn có muốn cập nhật ${checkName} không?`);
    if (check) {
      // Kiểm tra xem CLDGUpdate đã có id kích cỡ hay chưa
      if (
        this.kichCoUpdate.idKichCo === null ||
        this.kichCoUpdate.idKichCo === undefined
      ) {
        alert('Không có ID kích cỡ đế giày để cập nhật.');
        return;
      }

      console.log(this.kichCoUpdate);
      this.kichCoService.putUpdateKichCo(this.kichCoUpdate).subscribe({
        next: (value: any) => {
          alert('Cập nhật kích cỡ thành công.');
          this.resetForm();
          this.fetchDataKichCos(); // Tải lại danh sách sau khi cập nhật
          this.closeModal('closeModalUpdate');
        },
        error: (err) => {
          console.error('Lỗi khi cập nhật kích cỡ:', err);
          alert('Cập nhật kích cỡ không thành công.'); // Thông báo cho người dùng
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
      giaTri: ['', [Validators.required, Validators.minLength(3)]],
    });
  }
}
