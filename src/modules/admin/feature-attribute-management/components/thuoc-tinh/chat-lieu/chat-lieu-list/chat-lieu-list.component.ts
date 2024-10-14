import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ChatLieuService } from '../../../../service/chat-lieu.service';
import { ChatLieuResponse } from '../../../../../../../models/chat-lieu/response/chat-lieu-response';

@Component({
  selector: 'app-chat-lieu-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './chat-lieu-list.component.html',
  styleUrl: './chat-lieu-list.component.scss',
})
export class ChatLieuListComponent implements OnInit {
  chatLieus: ChatLieuResponse[] = [];

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

  /** Hàm bắt sự kiện xem chi tiết chất liệu */
  handleDetailChatLieu(idChatLieu: number): void {
    this.router.navigate([`/admin/color/detail/${idChatLieu}`]);
  }

  /** Hàm lấy dữ liệu cập nhật chất liệu */
  handleUpdateChatLieu(idChatLieus: number): void {
    this.chatLieus.forEach((chatLieu) => {
      if (chatLieu.idChatLieu === idChatLieus) {
        this.chatLieuUpdate.idChatLieu = chatLieu.idChatLieu;
        this.chatLieuUpdate.maChatLieu = chatLieu.maChatLieu;
        this.chatLieuUpdate.tenChatLieu = chatLieu.tenChatLieu;
        this.chatLieuUpdate.doBen = chatLieu.doBen;
        this.chatLieuUpdate.moTa = chatLieu.moTa;
        this.chatLieuUpdate.trangThai = chatLieu.trangThai;
        console.log(this.chatLieuUpdate);
      }
    });
  }

  /** Hàm submit form thêm chất liệu */
  submitAdd(): void {
    if (!this.chatLieuAdd.maChatLieu || !this.chatLieuAdd.tenChatLieu) {
      alert('Vui lòng nhập đầy đủ thông tin mã chất liệu và tên chất liệu.');
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
      // Kiểm tra xem chatLieuUpdate đã có id chất liệu hay chưa
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
}
