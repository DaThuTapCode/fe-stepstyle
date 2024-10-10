import { Component, OnInit } from '@angular/core';
import { MauSac } from '../../../../../../models/mau-sac/response/mau-sac';
import { MauSacService } from '../../../service/mau-sac.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-color-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './color-detail.component.html',
  styleUrls: ['./color-detail.component.scss'],  // Fix: "styleUrl" -> "styleUrls"
})
export class ColorDetailComponent implements OnInit {

  mauSacDetail: any = {
    idMauSac: null,
    tenMau: null,
    giaTri: '',
    moTa: '',
    trangThai: '',
  };

  constructor(
    private mauSacService: MauSacService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.fetchColorDetail();
  }

  // Hàm lấy chi tiết màu sắc từ API
  fetchColorDetail(): void {
    const idMauSac = this.route.snapshot.paramMap.get('id');
    if (idMauSac) {
      this.mauSacService.getMauSacById(Number(idMauSac)).subscribe({
        next: (response: MauSac) => {
          this.mauSacDetail = response;
        },
        error: (err) => {
          console.error('Lỗi khi lấy chi tiết màu sắc: ', err);
        },
      });
    } else {
      console.warn('ID màu sắc không tồn tại');
    }
  }


}
