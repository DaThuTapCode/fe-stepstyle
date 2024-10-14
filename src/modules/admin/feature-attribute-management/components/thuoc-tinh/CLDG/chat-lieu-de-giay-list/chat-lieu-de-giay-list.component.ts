import { Component, OnInit } from '@angular/core';
import { ChatLieuDeGiayService } from '../../../../service/chat-lieu-de-giay.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatLieuDeGiayResponse } from '../../../../../../../models/chat-lieu-de-giay/response/chat-lieu-de-giay-response';

@Component({
  selector: 'app-chat-lieu-de-giay-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './chat-lieu-de-giay-list.component.html',
  styleUrl: './chat-lieu-de-giay-list.component.scss',
})
export class ChatLieuDeGiayListComponent implements OnInit {
  chatLieuDeGiays: ChatLieuDeGiayResponse[] = [];

  constructor(
    private chatLieuDeGiayService: ChatLieuDeGiayService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchDataChatLieuDeGiays();
  }

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

  /** Khởi tạo đối tượng chất liệu đế giày add */
  CLDGAdd: any = {
    idChatLieuDeGiay: null,
    maChatLieuDeGiay: '',
    tenChatLieuDeGiay: '',
    giaTri: '',
    moTa: '',
    trangThai: 'ACTIVE', // Mặc định trạng thái là ACTIVE
  };
  /** Khởi tạo đối tượng chất liệu đế giày update */
  CLDGUpdate: any = {
    idChatLieuDeGiay: null,
    maChatLieuDeGiay: '',
    tenChatLieuDeGiay: '',
    giaTri: '',
    moTa: '',
    trangThai: 'ACTIVE', // Mặc định trạng thái là ACTIVE
  };

  /** Hàm bắt sự kiện xem chi tiết chất liệu đế giày*/
  handleDetailChatLieuDeGiay(idChatLieuDeGiay: number): void {
    this.router.navigate([`/admin/color/detail/${idChatLieuDeGiay}`]);
  }

  /** Hàm lấy dữ liệu cập nhật chất liệu đế giày */
  handleUpdateChatLieuDeGiay(idChatLieuDeGiays: number): void {
    this.chatLieuDeGiays.forEach((chatLieuDeGiay) => {
      if (chatLieuDeGiay.idChatLieuDeGiay === idChatLieuDeGiays) {
        this.CLDGUpdate.idChatLieuDeGiay = chatLieuDeGiay.idChatLieuDeGiay;
        this.CLDGUpdate.maChatLieuDeGiay = chatLieuDeGiay.maChatLieuDeGiay;
        this.CLDGUpdate.tenChatLieuDeGiay = chatLieuDeGiay.tenChatLieuDeGiay;
        this.CLDGUpdate.giaTri = chatLieuDeGiay.giaTri;
        this.CLDGUpdate.moTa = chatLieuDeGiay.moTa;
        this.CLDGUpdate.trangThai = chatLieuDeGiay.trangThai;
        console.log(this.CLDGUpdate);
      }
    });
  }

  /** Hàm submit form thêm chất liệu đế giày */
  submitAdd(): void {
    if (!this.CLDGAdd.maChatLieuDeGiay || !this.CLDGAdd.tenChatLieuDeGiay) {
      alert(
        'Vui lòng nhập đầy đủ thông tin tên chất liệu đế giày và mã chất liệu đế giày.'
      );
      return;
    }

    if (
      confirm(
        `Bạn có muốn thêm chất liệu đế giày: ${this.CLDGAdd.maChatLieuDeGiay} không?`
      )
    ) {
      this.chatLieuDeGiayService.postAddCLDG(this.CLDGAdd).subscribe({
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

  /** Hàm submit cập nhật chất liệu */
  submitUpdate() {
    if (!this.CLDGUpdate || !this.CLDGUpdate.maChatLieuDeGiay) {
      alert('Xin vui lòng nhập mã chất liệu đế giày');
      return;
    }

    let checkName: string = this.CLDGUpdate.maChatLieuDeGiay;
    if (checkName.length < 1) {
      alert('Xin vui lòng nhập mã chất liệu đế giày');
      return;
    }

    let check: boolean = confirm(`Bạn có muốn cập nhật ${checkName} không?`);
    if (check) {
      // Kiểm tra xem CLDGUpdate đã có id chất liệu hay chưa
      if (
        this.CLDGUpdate.idChatLieuDeGiay === null ||
        this.CLDGUpdate.idChatLieuDeGiay === undefined
      ) {
        alert('Không có ID chất liệu đế giày để cập nhật.');
        return;
      }

      console.log(this.CLDGUpdate);
      this.chatLieuDeGiayService.putUpdateChatLieuDeGiay(this.CLDGUpdate).subscribe({
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

  closeModal(idBtn: string) {
    const closeModalUpdate = document.getElementById(idBtn);
    if (closeModalUpdate) {
      closeModalUpdate.click();
    }
  }

  /** Hàm reset form sau khi add hoặc update thành công */
  resetForm(): void {
    this.CLDGAdd = {
      idChatLieuDeGiay: null,
      maChatLieuDeGiay: '',
      tenChatLieuChatLieu: '',
      giaTri: '',
      moTa: '',
      trangThai: 'ACTIVE', // Reset lại trạng thái mặc định
    };
  }
}
