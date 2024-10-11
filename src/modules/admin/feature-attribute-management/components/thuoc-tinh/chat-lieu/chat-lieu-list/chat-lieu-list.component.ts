import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ChatLieu } from '../../../../../../../models/chat-lieu/response/chat-lieu';
import { ChatLieuService } from '../../../../service/chat-lieu.service';

@Component({
  selector: 'app-chat-lieu-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './chat-lieu-list.component.html',
  styleUrl: './chat-lieu-list.component.scss',
})
export class ChatLieuListComponent implements OnInit {
  chatLieus: ChatLieu[] = [];

  constructor(
    private chatLieuService: ChatLieuService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.fetchDataChatLieus();
  }

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

  /** Khởi tạo đối tượng chất liệu add */
  chatLieuAdd: any = {
    idChatLieu: null,
    tenChatLieu: '',
    doBen: '',
    moTa: '',
    trangThai: 'ACTIVE', // Mặc định trạng thái là ACTIVE
  };

  /** Khởi tạo đối tượng chất liệu update */
  chatLieuUpdate: any = {
    idChatLieu: null,
    tenChatLieu: '',
    doBen: '',
    moTa: '',
    trangThai: 'ACTIVE', // Mặc định trạng thái là ACTIVE
  };

  /** Hàm bắt sự kiện xem chi tiết chất liệu */
  handleDetailChatLieu(idChatLieu: number): void {
    this.router.navigate([`/admin/color/detail/${idChatLieu}`]);
  }

  /** Hàm lấy dữ liệu cập nhật chất liệu */
  handleUpdateChatLieu(idChatLieu: number): void {}

  /** Hàm submit form thêm chất liệu */
  submitAdd(): void {
    if (!this.chatLieuAdd.tenChatLieu || !this.chatLieuAdd.doBen) {
      alert(
        'Vui lòng nhập đầy đủ thông tin tên chất liệu và độ bền chất liệu.'
      );
      return;
    }

    if (
      confirm(
        `Bạn có muốn thêm chất liệu: ${this.chatLieuAdd.tenChatLieu} không?`
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
      tenChatLieu: '',
      doBen: '',
      moTa: '',
      trangThai: 'ACTIVE', // Reset lại trạng thái mặc định
    };
  }
}
