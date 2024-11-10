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
import { ChatLieuSearch } from '../../../../../../../models/chat-lieu/request/chat-lieu-search';
import { SttUtilsService } from '../../../../../../../shared/helper/stt-utils.service';
import { NotificationService } from '../../../../../../../shared/notification.service';
import { Pagination } from '../../../../../../../shared/type/pagination';

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
  //Phân trang chất liệu
  paginatinonOfCL: Pagination = {
    size: 5,
    page: 0,
    totalElements: 0,
    totalPages: 0,
    first: false,
    last: false
  }

  constructor(
    private chatLieuService: ChatLieuService,
    private router: Router,
    private fb: FormBuilder,
    private sttService: SttUtilsService,
    private notificationService: NotificationService
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
      .searchPageChatLieu(this.ChatLieuSearch, this.paginatinonOfCL.page, this.paginatinonOfCL.size)
      .subscribe({
        next: (res: any) => {
          this.chatLieus = res.data.content;
          this.paginatinonOfCL.totalPages = res.data.totalPages;
          this.paginatinonOfCL.page = res.data.pageable.pageNumber;
          this.paginatinonOfCL.first = res.data.first;
          this.paginatinonOfCL.last = res.data.last;
          console.log('ChatLieuPage', res);
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
    maChatLieu: '',
    tenChatLieu: null,
  };

  /**Hàm bắt sự kiện đổi trang trong modal chất liệu */
  handlePageCLChange(type: string) {
    if (type === 'pre') {
      this.paginatinonOfCL.page -= 1;
    } else if (type === 'next') {
      this.paginatinonOfCL.page += 1;
    }
    this.fetchDataSearchChatLieu();
  }
  /**Tính stt */
  tinhSTT(page: number, size: number, current: number): number {
    return this.sttService.tinhSTT(page, size, current);
  }

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
      this.notificationService.showWarning('Vui lòng nhập đầy đủ thông tin mã chất liệu.');
      return;
    }
    if (!this.chatLieuAdd.tenChatLieu) {
      this.notificationService.showWarning('Vui lòng nhập đầy đủ thông tin tên chất liệu.');
      return;
    }
    /**  Kiểm tra độ dài của mã chất liệu và tên chất liệu */
    if (
      this.chatLieuAdd.maChatLieu.length < 5 ||
      this.chatLieuAdd.maChatLieu.length > 10
    ) {
      this.notificationService.showWarning('Mã chất liệu phải từ 5 đến 10 ký tự.');
      return;
    }

    if (
      this.chatLieuAdd.tenChatLieu.length < 2 ||
      this.chatLieuAdd.tenChatLieu.length > 255
    ) {
      this.notificationService.showWarning('Tên chất liệu phải từ 2 đến 255 ký tự.');
      return;
    }

    if (
      confirm(
        `Bạn có muốn thêm chất liệu: ${this.chatLieuAdd.maChatLieu} không?`
      )
    ) {
      this.chatLieuService.postAddChatLieu(this.chatLieuAdd).subscribe({
        next: () => {
          this.notificationService.showSuccess('Thêm chất liệu thành công');
          this.resetForm();
          this.fetchDataChatLieus();
          this.closeModal('closeModalAdd');
        },
        error: (err) => {
          this.notificationService.showError(err.error.message);
          console.error('Lỗi khi thêm chất liệu:', err);
        }
      });
    }
  }

  /** Hàm submit cập nhật chất liệu */
  submitUpdate() {
    if (!this.chatLieuUpdate || !this.chatLieuUpdate.maChatLieu) {
      this.notificationService.showWarning('Xin vui lòng nhập mã chất liệu');
      return;
    }

    let checkName: string = this.chatLieuUpdate.maChatLieu;
    if (checkName.length < 1) {
      this.notificationService.showWarning('Xin vui lòng nhập mã chất liệu');
      return;
    }

    let check: boolean = confirm(`Bạn có muốn cập nhật ${checkName} không?`);
    if (check) {
      // Kiểm tra xem chất liệu đã có id chất liệu hay chưa
      if (
        this.chatLieuUpdate.idChatLieu === null ||
        this.chatLieuUpdate.idChatLieu === undefined
      ) {
        this.notificationService.showError('Không có ID chất liệu để cập nhật.');
        return;
      }

      console.log(this.chatLieuUpdate);
      this.chatLieuService.putUpdateChatLieu(this.chatLieuUpdate).subscribe({
        next: (value: any) => {
          this.notificationService.showSuccess('Cập nhật chất liệu thành công.');
          this.resetForm();
          this.fetchDataChatLieus(); // Tải lại danh sách sau khi cập nhật
          this.closeModal('closeModalUpdate');
        },
        error: (err) => {
          console.error('Lỗi khi cập nhật chất liệu:', err);
          this.notificationService.showError('Cập nhật chất liệu không thành công.'); // Thông báo cho người dùng
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

  /** Hàm reset tìm kiếm */
  resetSearch() {
    this.ChatLieuSearch = {
      maChatLieu: '',
      tenChatLieu: null
    };
    this.searchKC();
  }

  /** Hàm tìm kiếm màu sắc */
  searchKC() {
    this.paginatinonOfCL.page = 0; // Reset lại trang khi bắt đầu tìm kiếm
    this.fetchDataSearchChatLieu();
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
