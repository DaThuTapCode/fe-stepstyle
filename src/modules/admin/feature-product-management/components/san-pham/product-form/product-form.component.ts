import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SanPhamService } from "../../../services/san-pham.service";
import { SanPhamChiTietService } from "../../../services/san-pham-chi-tiet.service";
import { ThuongHieuService } from "../../../services/thuong-hieu.service";
import { DanhMucService } from "../../../services/danh-muc.service";
import { MauSacService } from "../../../../feature-attribute-management/service/mau-sac.service";
import { TrongLuongService } from "../../../../feature-attribute-management/service/trong-luong.service";
import { KichCoService } from "../../../../feature-attribute-management/service/kich-co.service";
import { ChatLieuService } from "../../../../feature-attribute-management/service/chat-lieu.service";
import { ActivatedRoute, Router } from '@angular/router';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ThuongHieuResponse } from '../../../../../../models/thuong-hieu/response/thuong-hieu-response';
import { DanhMucResponse } from '../../../../../../models/danh-muc/response/danh-muc-response';
import { MauSacRequest } from '../../../../../../models/mau-sac/request/mau-sac-request';
import { KichCoRequest } from '../../../../../../models/kich-co/request/kich-co-request';
import { MauSacResponse } from '../../../../../../models/mau-sac/response/mau-sac-response';
import { TrongLuongResponse } from '../../../../../../models/trong-luong/response/trong-luong-response';
import { KichCoResponse } from '../../../../../../models/kich-co/response/kich-co-response';
import { ChatLieuResponse } from '../../../../../../models/chat-lieu/response/chat-lieu-response';
import { SanPhamChiTietRequest } from '../../../../../../models/san-pham-chi-tiet/request/san-pham-chi-tiet-request';
import { StatusSPCT } from '../../../../../../shared/status-spct';
import { NotificationService } from '../../../../../../shared/notification.service';
import { SanPhamRequest } from '../../../../../../models/san-pham/request/san-pham-request';
import { StatusSP } from '../../../../../../shared/status-sp';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgMultiSelectDropDownModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent implements OnInit {

  selectedImages: { [key: string]: string } = {}; // Quản lý ảnh cho từng nhóm màu

onFileSelected(colorId: string, event: Event): void {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    const file = input.files[0];
    const reader = new FileReader();
    
    reader.onload = () => {
      this.selectedImages[colorId] = reader.result as string; // Lưu đường dẫn ảnh base64
    };
    reader.readAsDataURL(file);
  }
}

removeImage(colorId: string): void {
  delete this.selectedImages[colorId]; // Xóa ảnh của nhóm màu
}


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

  selectedMauSac: MauSacRequest[] = []; // Mảng màu sắc đang được chọn
  selectedKichThuoc: KichCoRequest[] = []; // Mảng kích thước đang được chọn

  sanPhamChiTiets: SanPhamChiTietRequest[] = []; //Biến chứa các spct được gen ra
  groupedSanPhamChiTiet: { [colorCode: string]: SanPhamChiTietRequest[] } = {}; // Biến nhóm các sản phẩm chi tiết theo id màu sắc
  colorIds: string[] = []; // Biến hứng danh sách id của màu

  /**Cài đặt các thuộc tính cho combobox màu sắc */
  dropdownSettingForColor = {
    // singleSelection: false,
    idField: 'idMauSac',
    textField: 'tenMau',
    selectAllText: 'Chọn tất cả',
    unSelectAllText: 'Bỏ chọn tất cả',
    itemsShowLimit: 300,
    allowSearchFilter: true
  };

  /**Cài đặt các thuộc tính cho combobox kích cỡ */
  dropdownSettingForSize = {
    // singleSelection: false,
    idField: 'idKichCo',
    textField: 'giaTri',
    selectAllText: 'Chọn tất cả',
    unSelectAllText: 'Bỏ chọn tất cả',
    itemsShowLimit: 300,
    allowSearchFilter: true
  };

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

  ) {

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

  /**Tải dữ liệu sản phẩm theo id */
  fetchSanPhamById(idProduct: number) {
    this.sanPhamService.callApiGetProductById(idProduct).subscribe({
      next: (response: any) => {
        this.sanPhamRequest = new SanPhamRequest(response.data);
        this.form.patchValue(this.sanPhamRequest);
        console.log(this.sanPhamRequest);
      },
      error: (err: any) => {
        this.notificationService.showError(err.error.message);
        console.error(err);
      }
    });
  }

  /**Hàm nhóm các sản phẩm chi tiết theo mã màu */
  groupSPCTByColorCode(): void {
    this.groupedSanPhamChiTiet = this.sanPhamChiTiets.reduce((groups: { [colorId: string]: SanPhamChiTietRequest[] }, spct) => {
      if (spct.mauSac.idMauSac) {
        const colorId = spct.mauSac.idMauSac;
        if (!groups[colorId]) {
          groups[colorId] = [];
        }
        groups[colorId].push(spct);
        return groups;
      } else {
        return groups;
      }

    }, {});
    this.colorIds = Object.keys(this.groupedSanPhamChiTiet);
  }

  /** Hàm bắt sự kiện chuyển trạng thái sản phẩm chi tiết được gen ra */
  handleChangeStatusSPCT() {

  }

  /**Hàm bắt sự kiện submit form*/
  handleCreateNewSP() {
    if(!this.form.valid){
      this.notificationService.showWarning('Vui lòng kiểm tra lại dữ liệu');
      this.form.markAllAsTouched();
      return;
    }

    const sanPham = this.form.value;
    let sanPhamNew = new SanPhamRequest;
    sanPhamNew = sanPham;
    sanPhamNew.sanPhamChiTiets = this.sanPhamChiTiets;
    console.log(sanPhamNew);
    this.sanPhamService.createProduct(sanPham).subscribe({
      next: (response: any) => {
          this.notificationService.showSuccess(response.message);
      },
      error: (err: any) => {
        this.notificationService.showError(err.error.message);
      }
    })
  }

  /**Hàm bắt sự kiện quay lại danh sách sản phẩm */
  handleBackToListProduct() {
    this.router.navigate(['/admin/product'])
  }



  /** Hàm bắt sự kiện gen sản phẩm chi tiết nếu các thuộc tính của sản phẩm và sản phẩm chi tiết đầy đủ các thông tin cầm thiết */
  handleGenSPCT() {
    this.genSPCT();
  }

  /** Hàm gen danh sách sản phẩm chi tiết */
  genSPCT() {
    const sanPham = this.form.value;
    const spct = this.form.get('sanPhamChiTiet')?.value;
    this.sanPhamChiTiets = [];

    // Kiểm tra các thuộc tính của sanPhamChiTiet
    if (
      spct && 
      spct.mauSac?.length &&
      spct.kichCo?.length
    ) {
      // Lặp qua từng màu sắc
      spct.mauSac.forEach((mauSac: MauSacRequest) => {
        // Lặp qua từng kích cỡ
        spct.kichCo.forEach((kichCo: KichCoRequest) => {
          let sanPhamChiTiet: SanPhamChiTietRequest = new SanPhamChiTietRequest();
          // Gán các thuộc tính cho sản phẩm chi tiết
          sanPhamChiTiet.soLuong = 100; // Số lượng
          sanPhamChiTiet.gia = 1000000; // Giá
          this.sanPhamRequest.chatLieu = spct.chatLieu; // Chất liệu
          sanPhamChiTiet.maSpct = 'RANDOM'; // Mã sản phẩm chi tiết (có thể thay đổi nếu cần)
          sanPhamChiTiet.trangThai = StatusSPCT.ACTIVE; // Trạng thái sản phẩm chi tiết
          this.sanPhamRequest.trongLuong = spct.trongLuong
          // Gán màu sắc và kích cỡ cho sản phẩm chi tiết
          sanPhamChiTiet.mauSac = mauSac; // Gán màu sắc từ vòng lặp
          sanPhamChiTiet.kichCo = kichCo; // Gán kích cỡ từ vòng lặp

          // Thêm sản phẩm chi tiết vào danh sách
          this.sanPhamChiTiets.push(sanPhamChiTiet);
        });
      });

      this.groupSPCTByColorCode(); // Nhóm sản phẩm chi tiết theo mã màu
    } else {
      // Nếu thiếu thuộc tính nào đó
      this.groupedSanPhamChiTiet = {};
      this.notificationService.showError('Vui lòng điền đầy đủ thông tin');
    }
  }

  /** Băt sự kiện xóa sản phẩm chi tiết không muốn thêm */
  handleDeleteSPCT(spct: SanPhamChiTietRequest, colorId: any) {
    const index = this.groupedSanPhamChiTiet[colorId].findIndex(item => 
      item.mauSac.idMauSac === spct.mauSac.idMauSac && item.kichCo.idKichCo === spct.kichCo.idKichCo
    );

    const index2 = this.sanPhamChiTiets.findIndex(item => 
      item.mauSac.idMauSac === spct.mauSac.idMauSac && item.kichCo.idKichCo === spct.kichCo.idKichCo
    );
  
    if (index !== -1) {
      this.groupedSanPhamChiTiet[colorId].splice(index, 1);
    }

    if (index2 !== -1) {
      this.sanPhamChiTiets.splice(index2, 1);
    }
  }
  

  async ngOnInit() {
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
      sanPhamChiTiet: new FormGroup({
        mauSac: new FormControl(null, [Validators.required]),
        kichCo: new FormControl(null, [Validators.required]),
      })
    });
     
  }
  
}
