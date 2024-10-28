import { Component, OnInit } from '@angular/core';
import { ChatLieuDeGiayService } from '../../../../service/chat-lieu-de-giay.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ChatLieuDeGiayResponse } from '../../../../../../../models/chat-lieu-de-giay/response/chat-lieu-de-giay-response';
import { ChatLieuDeGiaySearchRequest } from '../../../../../../../models/chat-lieu-de-giay/request/chat-lieu-de-giay-search-request';

@Component({
  selector: 'app-chat-lieu-de-giay-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './chat-lieu-de-giay-list.component.html',
  styleUrl: './chat-lieu-de-giay-list.component.scss',
})
export class ChatLieuDeGiayListComponent implements OnInit {

  chatLieuDeGiays: ChatLieuDeGiayResponse[] = [];
  form!: FormGroup;
  /**Phân trang */
  size: number = 5;
  page: number = 0;
  totalPages: number = 1;  /**Bắt sự kiện thay đổi trang */
  dataSearch = {
    maChatLieuDeGiay: ''
  }

  constructor(
    private chatLieuDeGiayService: ChatLieuDeGiayService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  /** Hàm tải dữ liệu danh sách chất liệu đế giày */
  fetchDataChatLieuDeGiays(): void {
    this.chatLieuDeGiayService.getAllCLDG().subscribe({
      next: (response: any) => {
        this.chatLieuDeGiays = response.data;
        console.log('ChatLieuDeGiays', this.chatLieuDeGiays);
      },
      error: (err: any) => {
        console.error('Lỗi khi lấy danh sách chất liệu đế giày: ', err);
      },
    });
  }

  /** Hàm tìm kiếm phân trang chất liệu đế giày */
  fetchDataSearchChatLieuDeGiay() {
    this.chatLieuDeGiayService
      .searchPageChatLieuDeGiay(
        this.chatLieuDeGiaySearchRequest,
        this.page,
        this.size
      )
      .subscribe({
        next: (response: any) => {
          this.chatLieuDeGiays = response.data.content;
          this.totalPages = response.data.totalPages;
          console.log('ChatLieuDeGiayPage', response);
        },
      });
  }

  /** Hàm bắt sự kiện thay đổi trang */
  changePage(pageNew: number) {
    this.page = pageNew;
    this.fetchDataSearchChatLieuDeGiay();
  }

  /** Phân trang chất liệu đế giày*/
  chatLieuDeGiaySearchRequest: ChatLieuDeGiaySearchRequest = {
    maChatLieuDeGiay: null,
    tenChatLieuDeGiay: null,
  };

  /** Khởi tạo đối tượng chất liệu đế giày add */
  chatLieuDeGiayAdd: any = {
    idChatLieuDeGiay: null,
    maChatLieuDeGiay: '',
    tenChatLieuDeGiay: '',
    giaTri: '',
    moTa: '',
    trangThai: 'ACTIVE', // Mặc định trạng thái là ACTIVE
  };

  /** Khởi tạo đối tượng chất liệu đế giày update */
  chatLieuDeGiayUpdate: any = {
    idChatLieuDeGiay: null,
    maChatLieuDeGiay: '',
    tenChatLieuDeGiay: '',
    giaTri: '',
    moTa: '',
    trangThai: 'ACTIVE', // Mặc định trạng thái là ACTIVE
  };

  /** Khởi tạo đối tượng chất liệu đế giày Detail */
  ChatLieuDeGiayDetail: ChatLieuDeGiayResponse = {
    idChatLieuDeGiay: 0,
    maChatLieuDeGiay: '',
    tenChatLieuDeGiay: '',
    giaTri: '',
    moTa: '',
    trangThai: 'ACTIVE',
  };

  /** Hàm bắt sự kiện xem chi tiết chất liệu đế giày*/
  handleDetailChatLieuDeGiay(chatLieuDeGiay: any): void {
    this.ChatLieuDeGiayDetail = chatLieuDeGiay;
  }

  /** Hàm lấy dữ liệu cập nhật chất liệu đế giày */
  handleUpdateChatLieuDeGiay(idChatLieuDeGiays: number): void {
    this.chatLieuDeGiays.forEach((cldg) => {
      if (cldg.idChatLieuDeGiay === idChatLieuDeGiays) {
        this.chatLieuDeGiayUpdate.idChatLieuDeGiay = cldg.idChatLieuDeGiay;
        this.chatLieuDeGiayUpdate.maChatLieuDeGiay = cldg.maChatLieuDeGiay;
        this.chatLieuDeGiayUpdate.tenChatLieuDeGiay = cldg.tenChatLieuDeGiay;
        this.chatLieuDeGiayUpdate.giaTri = cldg.giaTri;
        this.chatLieuDeGiayUpdate.moTa = cldg.moTa;
        this.chatLieuDeGiayUpdate.trangThai = cldg.trangThai;
        console.log(this.chatLieuDeGiayUpdate);
      }
    });
  }

  /** Hàm submit form thêm chất liệu đế giày */
  submitAdd(): void {
    if (!this.chatLieuDeGiayAdd.maChatLieuDeGiay) {
      alert('Vui lòng nhập đầy đủ thông tin mã chất liệu đế giày.');
      return;
    }
    if (!this.chatLieuDeGiayAdd.tenChatLieuDeGiay) {
      alert('Vui lòng nhập đầy đủ thông tin tên chất liệu đế giày.');
      return;
    }
    /**  Kiểm tra độ dài của mã chất liệu đế giày và tên chất liệu đế giày */
    if (
      this.chatLieuDeGiayAdd.maChatLieuDeGiay.length < 5 ||
      this.chatLieuDeGiayAdd.maChatLieuDeGiay.length > 10
    ) {
      alert('Mã chất liệu đế giày phải từ 5 đến 10 ký tự.');
      return;
    }
    if (
      this.chatLieuDeGiayAdd.tenChatLieuDeGiay.length < 2 ||
      this.chatLieuDeGiayAdd.tenChatLieuDeGiay.length > 255
    ) {
      alert('Tên chất liệu đế giày phải từ 2 đến 255 ký tự.');
      return;
    }
    if (confirm(`Bạn có muốn thêm chất liệu đế giày: ${this.chatLieuDeGiayAdd.maChatLieuDeGiay} không?`)
    ) {
      this.chatLieuDeGiayService.postAddCLDG(this.chatLieuDeGiayAdd).subscribe({
        next: () => {
          alert('Thêm chất liệu đế giày thành công');
          this.resetForm();
          this.fetchDataChatLieuDeGiays();
          this.closeModal('closeModalAdd');
        },
        error: (err) => console.error('Lỗi khi thêm chất liệu đế giày:', err),
      });
    }
  }

  /** Hàm submit cập nhật chất liệu đế giày */
  submitUpdate() {
    if (
      !this.chatLieuDeGiayUpdate ||
      !this.chatLieuDeGiayUpdate.maChatLieuDeGiay
    ) {
      alert('Xin vui lòng nhập mã chất liệu đế giày');
      return;
    }

    let checkName: string = this.chatLieuDeGiayUpdate.maChatLieuDeGiay;
    if (checkName.length < 1) {
      alert('Xin vui lòng nhập mã chất liệu đế giày');
      return;
    }

    let check: boolean = confirm(`Bạn có muốn cập nhật ${checkName} không?`);
    if (check) {
      // Kiểm tra xem chatLieuDeGiay đã có id hay chưa
      if (
        this.chatLieuDeGiayUpdate.idChatLieuDeGiay === null ||
        this.chatLieuDeGiayUpdate.idChatLieuDeGiay === undefined
      ) {
        alert('Không có ID chất liệu đế giày để cập nhật.');
        return;
      }

      console.log(this.chatLieuDeGiayUpdate);
      this.chatLieuDeGiayService
        .putUpdateChatLieuDeGiay(this.chatLieuDeGiayUpdate)
        .subscribe({
          next: (value: any) => {
            alert('Cập nhật chất liệu đế giày thành công.');
            this.resetForm();
            this.fetchDataChatLieuDeGiays(); // Tải lại danh sách sau khi cập nhật
            this.closeModal('closeModalUpdate');
          },
          error: (err) => {
            console.error('Lỗi khi cập nhật chất liệu đế giày:', err);
            alert('Cập nhật chất liệu đế giày không thành công.'); // Thông báo cho người dùng
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
    this.chatLieuDeGiayAdd = {
      idChatLieuDeGiay: null,
      maChatLieuDeGiay: '',
      tenChatLieuChatLieu: '',
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
    this.fetchDataChatLieuDeGiays();
    this.fetchDataSearchChatLieuDeGiay();

    this.form = this.fb.group({
      maChatLieuDeGiay: ['', Validators.required],
      tenChatLieuDeGiay: ['', [Validators.required, Validators.minLength(5)]],
    });
  }
}
