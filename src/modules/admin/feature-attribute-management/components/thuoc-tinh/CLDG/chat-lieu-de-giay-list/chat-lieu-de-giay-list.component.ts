import { Component, OnInit } from '@angular/core';
import { ChatLieuDeGiay } from '../../../../../../../models/chat-lieu-de-giay/response/chat-lieu-de-giay';
import { ChatLieuDeGiayService } from '../../../../service/chat-lieu-de-giay.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat-lieu-de-giay-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './chat-lieu-de-giay-list.component.html',
  styleUrl: './chat-lieu-de-giay-list.component.scss',
})
export class ChatLieuDeGiayListComponent implements OnInit {
  chatLieuDeGiays: ChatLieuDeGiay[] = [];

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
  handleUpdateChatLieuDeGiay(idChatLieuDeGiay: number): void {}

  /** Hàm submit form thêm chất liệu đế giày */
  submitAdd(): void {
    if (!this.CLDGAdd.tenChatLieuDeGiay || !this.CLDGAdd.giaTri) {
      alert(
        'Vui lòng nhập đầy đủ thông tin tên chất liệu đế giày và giá trị chất liệu đế giày.'
      );
      return;
    }

    if (
      confirm(
        `Bạn có muốn thêm chất liệu đế giày: ${this.CLDGAdd.tenChatLieuDeGiay} không?`
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
      tenChatLieuChatLieu: '',
      giaTri: '',
      moTa: '',
      trangThai: 'ACTIVE', // Reset lại trạng thái mặc định
    };
  }
}
