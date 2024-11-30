import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Pagination } from '../../../../../../shared/type/pagination';
import { SanPhamResponse } from '../../../../../../models/san-pham/response/san-pham-response';
import { SanPhamService } from '../../../services/san-pham.service';
import { NotificationService } from '../../../../../../shared/notification.service';
import { SanPhamRequest } from '../../../../../../models/san-pham/request/san-pham-request';
import { StatusSP } from '../../../../../../shared/status-sp';
import { ThuongHieuResponse } from '../../../../../../models/thuong-hieu/response/thuong-hieu-response';
import { DanhMucResponse } from '../../../../../../models/danh-muc/response/danh-muc-response';
import { MauSacResponse } from '../../../../../../models/mau-sac/response/mau-sac-response';
import { TrongLuongResponse } from '../../../../../../models/trong-luong/response/trong-luong-response';
import { KichCoResponse } from '../../../../../../models/kich-co/response/kich-co-response';
import { ChatLieuResponse } from '../../../../../../models/chat-lieu/response/chat-lieu-response';
import { SanPhamChiTietService } from '../../../services/san-pham-chi-tiet.service';
import { ThuongHieuService } from '../../../services/thuong-hieu.service';
import { DanhMucService } from '../../../services/danh-muc.service';
import { MauSacService } from '../../../../feature-attribute-management/service/mau-sac.service';
import { TrongLuongService } from '../../../../feature-attribute-management/service/trong-luong.service';
import { KichCoService } from '../../../../feature-attribute-management/service/kich-co.service';
import { ChatLieuService } from '../../../../feature-attribute-management/service/chat-lieu.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {


  /**Hứng sản phẩm được lấy theo id */
  sanPhamById: SanPhamResponse = new SanPhamResponse;

  /**id san pham */
  idSanPham!: number;

  form!: FormGroup; //Biến form

  sanPhamRequest: SanPhamRequest = {
    idSanPham: 0,
    maSanPham: '',
    tenSanPham: '',
    moTa: '',
    nguoiTao: '',
    trangThai: StatusSP.ACTIVE,
    danhMuc: undefined,
    thuongHieu: undefined,
    sanPhamChiTiets: [],
    chatLieu: undefined,
    trongLuong: undefined
  }

  // Các biến hứng dữ liệu cho các combobox
  thuongHieus: ThuongHieuResponse[] = []; // Thương hiệu
  danhMucs: DanhMucResponse[] = []; // Danh mục
  mauSacs: MauSacResponse[] = []; // Màu sắc
  trongLuongs: TrongLuongResponse[] = []; // Trọng lượng
  kichCos: KichCoResponse[] = []; // Kích cỡ
  chatLieus: ChatLieuResponse[] = []; // Chất liệu

 /**Hàm khởi tạo*/
 constructor(
  private sanPhamService: SanPhamService,
  private sanPhamChiTietService: SanPhamChiTietService,
  private thuongHieuService: ThuongHieuService,
  private danhMucService: DanhMucService,
  private mauSacSerVice: MauSacService,
  private trongLuongService: TrongLuongService,
  private kichCoService: KichCoService,
  private chatLieuService: ChatLieuService,
  private notificationService: NotificationService,
  private router: Router,
  private route: ActivatedRoute,

) {}
  
  //Phân trang modal sản phẩm chi tiết
  paginatinonOfModalSPCT: Pagination = {
    size: 10,
    page: 0,
    totalElements: 0,
    totalPages: 0,
    first: false,
    last: false
  }

  /**Hàm bắt sự kiện đổi trang trong modal spct */
  handlePageSPCTChange(type: string) {
    if (type === 'pre') {
      this.paginatinonOfModalSPCT.page -= 1;
    } else if (type === 'next') {
      this.paginatinonOfModalSPCT.page += 1;
    }
  }

/** Hàm bắt sự kiện cập nhật sản phẩm */
handleUpdateProduct() {
  if (!this.form.valid) {
    this.form.markAllAsTouched(); // Đánh dấu toàn bộ điều khiển trong form
    return;
  }
  const sanPham = this.form.value;
  const sanPhamRequest: SanPhamRequest = new SanPhamRequest();
  sanPhamRequest.tenSanPham = sanPham.tenSanPham;
  sanPhamRequest.moTa = sanPham.moTa; 

  this.chatLieus.forEach(cl => {
    if(sanPham.chatLieu === cl.idChatLieu) {
      sanPhamRequest.chatLieu = cl;
    }
  });
  this.trongLuongs.forEach(tl => {
    if(sanPham.trongLuong === tl.idTrongLuong) {
      sanPhamRequest.trongLuong = tl;
    }
  });
  this.danhMucs.forEach(dm => {
    if(sanPham.danhMuc === dm.idDanhMuc) {
      sanPhamRequest.danhMuc = dm;
    }
  });
  this.thuongHieus.forEach(th => {
    if(sanPham.thuongHieu === th.idThuongHieu) {
      sanPhamRequest.thuongHieu = th;
    }
  });

  this.sanPhamService.callApiPutUpdateProduct(this.idSanPham, sanPhamRequest).subscribe({
    next: (response: any) => {

      this.notificationService.showSuccess(response.message);
      this.fetchSanPhamById();
    },
    error: (err: any) => {
      this.notificationService.showError(err.error.message);
    }
  });
}


  /** Tải dữ liệu sản phẩm theo id */
  fetchSanPhamById(){
    this.sanPhamService.callApiGetProductById(this.idSanPham).subscribe({
      next: (response: any) => {
        this.sanPhamById = response.data;
        this.form.patchValue({
          tenSanPham: this.sanPhamById.tenSanPham,
          moTa: this.sanPhamById.moTa,
          danhMuc: this.sanPhamById.danhMuc.idDanhMuc,
          thuongHieu: this.sanPhamById.thuongHieu.idThuongHieu,
          trongLuong: this.sanPhamById.trongLuong.idTrongLuong,
          chatLieu: this.sanPhamById.chatLieu.idChatLieu,
        });
      },
      error: (error: any) => {
        this.notificationService.showError(error.error.message);
        console.error('Lỗi khi lấy sản phẩm với id', error);
      }
    })
  }


  /**Hàm tải dữ liệu cho danh sách thương hiệu*/
  fetchThuongHieus() {
    this.thuongHieuService.getAllThuongHieu().subscribe({
      next: (res: any) => {
        this.thuongHieus = res.data;
      },
      error: err => {
        console.log('Lỗi khi tải dữ liệu danh sách thương hiệu: ', err);
      }
    })
  }

  /**Hàm tải dữ liệu cho danh sách danh mục*/
  fetchDanhMuc() {
    this.danhMucService.getAllDanhMuc().subscribe({
      next: (res: any) => {
        this.danhMucs = res.data;
      },
      error: err => {
        console.log('Lỗi khi tải dữ liệu danh sách danh mục: ', err);
      }
    })
  }

  /**Hàm tải dữ liệu cho danh sách màu sắc*/
  fetchMauSacs() {
    this.mauSacSerVice.getAllMauSac().subscribe({
      next: (res: any) => {
        this.mauSacs = res.data;
      },
      error: err => {
        console.log('Lỗi khi tải dữ liệu danh sách màu sắc: ', err);
      }
    })
  }

  /**Hàm tải dữ liệu cho danh sách trọng lượngt*/
  fetchTrongLuongs() {
    this.trongLuongService.getAllTrongLuong().subscribe({
      next: (res: any) => {
        this.trongLuongs = res.data;
      },
      error: err => {
        console.log('Lỗi khi tải dữ liệu danh sách trọng lượng: ', err);
      }
    })
  }



  
  /**Hàm tải dữ liệu cho danh sách kích cỡ*/
  fetchKichCos() {
    this.kichCoService.getAllKichCo().subscribe({
      next: (res: any) => {
        this.kichCos = res.data;
      },
      error: err => {
        console.log('Lỗi khi tải dữ liệu danh sách kích cỡ: ', err);
      }
    })
  }

  /**Hàm tải dữ liệu cho danh sách chất liệu*/
  fetchChatLieus() {
    this.chatLieuService.getAllChatLieu().subscribe({
      next: (res: any) => {
        this.chatLieus = res.data;
      },
      error: err => {
        console.log('Lỗi khi tải dữ liệu danh sách chất liệu: ', err);
      }
    })
  }


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
    this.idSanPham = Number(params.get('idProduct'));
    this.fetchSanPhamById();
  });
     /** Fetch các dữ liệu ban đầu */
     this.fetchThuongHieus(),
     this.fetchDanhMuc(),
     this.fetchMauSacs(),
     this.fetchTrongLuongs(),
     this.fetchKichCos(),
     this.fetchChatLieus()
 
   /** Form */
   this.form = new FormGroup({
     tenSanPham: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(255)]),
     moTa: new FormControl('', [Validators.maxLength(500)]),
     danhMuc: new FormControl(null, [Validators.required]),
     thuongHieu: new FormControl(null, [Validators.required]),
     trongLuong: new FormControl(null, [Validators.required]),
     chatLieu: new FormControl(null, [Validators.required]),
   });
 }

}
