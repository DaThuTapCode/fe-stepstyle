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
import { ChatLieuService } from '../../../../service/chat-lieu.service';
import { ChatLieuResponse } from '../../../../../../../models/chat-lieu/response/chat-lieu-response';
import { ChatLieuDeGiaySearchRequest } from '../../../../../../../models/chat-lieu-de-giay/request/chat-lieu-de-giay-search-request';
import { ChatLieuSearch } from '../../../../../../../models/chat-lieu/request/chat-lieu-search';

@Component({
  selector: 'app-chat-lieu-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './chat-lieu-list.component.html',
  styleUrl: './chat-lieu-list.component.scss',
})
export class ChatLieuListComponent implements OnInit {
  chatLieus: ChatLieuResponse[] = [];
  form!: FormGroup;
  /**Phân trang */
  size: number = 5;
  page: number = 0;
  totalPages: number = 1; /**Bắt sự kiện thay đổi trang */
  dataSearch = {
    maChatLieu: '',
  };

  constructor(
    private chatLieuService: ChatLieuService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  /** Hàm tải dữ liệu danh sách chất liệu */
  fetchDataChatLieus(): void {
    this.chatLieuService.getAllChatLieu().subscribe({
      next: (response: any) => {
        this.chatLieus = response.data;
        console.log('ChatLieus', this.chatLieus);
      },
      error: (err: any) => {
        console.error('Lỗi khi lấy danh sách chất liệu: ', err);
      },
    });
  }

  /** Hàm tìm kiếm phân trang chất liệu */
  fetchDataSearchChatLieu() {
    this.chatLieuService
      .searchPageChatLieu(this.ChatLieuSearch, this.page, this.size)
      .subscribe({
        next: (response: any) => {
          this.chatLieus = response.data.content;
          this.totalPages = response.data.totalPages;
          console.log('ChatLieuPage', response);
        },
      });
  }

  /** Hàm bắt sự kiện thay đổi trang */
  changePage(pageNew: number) {
    this.page = pageNew;
    this.fetchDataSearchChatLieu();
  }

  /** Phân trang chất liệu*/
  ChatLieuSearch: ChatLieuSearch = {
    maChatLieu: null,
    tenChatLieu: null,
  };

  /** Khởi tạo đối tượng chất liệu add */
  chatLieuAdd: any = {
    idChatLieu: null,
    maChatLieu: '',
    tenChatLieu: '',
    doBen: '',
    moTa: '',
    trangThai: 'ACTIVE', // Mặc định trạng thái là ACTIVE
  };

  /** Khởi tạo đối tượng chất liệu update */
  chatLieuUpdate: any = {
    idChatLieu: null,
    maChatLieu: '',
    tenChatLieu: '',
    doBen: '',
    moTa: '',
    trangThai: 'ACTIVE', // Mặc định trạng thái là ACTIVE
  };

  /** Khởi tạo đối tượng chất liệu detail */
  chatLieuDetail: ChatLieuResponse = {
    idChatLieu: 0,
    maChatLieu: '',
    tenChatLieu: '',
    doBen: '',
    moTa: '',
    trangThai: 'ACTIVE',
  };

  /** Hàm bắt sự kiện xem chi tiết chất liệu */
  handleDetailChatLieu(chatLieu: any): void {
    this.chatLieuDetail = chatLieu;
  }

  /** Hàm lấy dữ liệu cập nhật chất liệu */
  handleUpdateChatLieu(idChatLieus: number): void {
    this.chatLieus.forEach((chatLieus) => {
      if (chatLieus.idChatLieu === idChatLieus) {
        this.chatLieuUpdate.idChatLieu = chatLieus.idChatLieu;
        this.chatLieuUpdate.maChatLieu = chatLieus.maChatLieu;
        this.chatLieuUpdate.tenChatLieu = chatLieus.tenChatLieu;
        this.chatLieuUpdate.doBen = chatLieus.doBen;
        this.chatLieuUpdate.moTa = chatLieus.moTa;
        this.chatLieuUpdate.trangThai = chatLieus.trangThai;
        console.log(this.chatLieuUpdate);
      }
    });
  }

  /** Hàm submit form thêm chất liệu */
  submitAdd(): void {
    if (!this.chatLieuAdd.maChatLieu) {
      alert('Vui lòng nhập đầy đủ thông tin mã chất liệu.');
      return;
    }
    if (!this.chatLieuAdd.tenChatLieu) {
      alert('Vui lòng nhập đầy đủ thông tin tên chất liệu.');
      return;
    }
    /**  Kiểm tra độ dài của mã chất liệu và tên chất liệu */
    if (
      this.chatLieuAdd.maChatLieu.length < 5 ||
      this.chatLieuAdd.maChatLieu.length > 10
    ) {
      alert('Mã chất liệu phải từ 5 đến 10 ký tự.');
      return;
    }

    if (
      this.chatLieuAdd.tenChatLieu.length < 2 ||
      this.chatLieuAdd.tenChatLieu.length > 255
    ) {
      alert('Tên chất liệu phải từ 2 đến 255 ký tự.');
      return;
    }

    if (
      confirm(
        `Bạn có muốn thêm chất liệu: ${this.chatLieuAdd.maChatLieu} không?`
      )
    ) {
      this.chatLieuService.postAddChatLieu(this.chatLieuAdd).subscribe({
        next: () => {
          alert('Thêm chất liệu thành công');
          this.resetForm();
          this.fetchDataChatLieus();
          this.closeModal('closeModalAdd');
        },
        error: (err) => console.error('Lỗi khi thêm chất liệu:', err),
      });
    }
  }

  /** Hàm submit cập nhật chất liệu */
  submitUpdate() {
    if (!this.chatLieuUpdate || !this.chatLieuUpdate.maChatLieu) {
      alert('Xin vui lòng nhập mã chất liệu');
      return;
    }

    let checkName: string = this.chatLieuUpdate.maChatLieu;
    if (checkName.length < 1) {
      alert('Xin vui lòng nhập mã chất liệu');
      return;
    }

    let check: boolean = confirm(`Bạn có muốn cập nhật ${checkName} không?`);
    if (check) {
      // Kiểm tra xem chất liệu đã có id chất liệu hay chưa
      if (
        this.chatLieuUpdate.idChatLieu === null ||
        this.chatLieuUpdate.idChatLieu === undefined
      ) {
        alert('Không có ID chất liệu để cập nhật.');
        return;
      }

      console.log(this.chatLieuUpdate);
      this.chatLieuService.putUpdateChatLieu(this.chatLieuUpdate).subscribe({
        next: (value: any) => {
          alert('Cập nhật chất liệu thành công.');
          this.resetForm();
          this.fetchDataChatLieus(); // Tải lại danh sách sau khi cập nhật
          this.closeModal('closeModalUpdate');
        },
        error: (err) => {
          console.error('Lỗi khi cập nhật chất liệu:', err);
          alert('Cập nhật chất liệu không thành công.'); // Thông báo cho người dùng
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
    this.chatLieuAdd = {
      idChatLieu: null,
      maChatLieu: '',
      tenChatLieu: '',
      doBen: '',
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
    this.fetchDataChatLieus();
    this.fetchDataSearchChatLieu();

    this.form = this.fb.group({
      maChatLieu: ['', Validators.required],
      tenChatLieu: ['', [Validators.required, Validators.minLength(5)]],
    });
  }
}
