import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SanPhamService } from "../../../services/san-pham.service";
import { SanPhamChiTietService } from "../../../services/san-pham-chi-tiet.service";
import { ThuongHieuService } from "../../../services/thuong-hieu.service";
import { DanhMucService } from "../../../services/danh-muc.service";
import { MauSacService } from "../../../../feature-attribute-management/service/mau-sac.service";
import { TrongLuongService } from "../../../../feature-attribute-management/service/trong-luong.service";
import { KieuDeGiayService } from "../../../../feature-attribute-management/service/kieu-de-giay.service";
import { ChatLieuDeGiayService } from "../../../../feature-attribute-management/service/chat-lieu-de-giay.service";
import { KichCoService } from "../../../../feature-attribute-management/service/kich-co.service";
import { ChatLieuService } from "../../../../feature-attribute-management/service/chat-lieu.service";
import { Router } from '@angular/router';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ThuongHieuResponse } from '../../../../../../models/thuong-hieu/response/thuong-hieu-response';
import { DanhMucResponse } from '../../../../../../models/danh-muc/response/danh-muc-response';
import { MauSacRequest } from '../../../../../../models/mau-sac/request/mau-sac-request';
import { KichCoRequest } from '../../../../../../models/kich-co/request/kich-co-request';
import { MauSacResponse } from '../../../../../../models/mau-sac/response/mau-sac-response';
import { TrongLuongResponse } from '../../../../../../models/trong-luong/response/trong-luong-response';
import { KieuDeGiayResponse } from '../../../../../../models/kieu-de-giay/response/kieu-de-giay-response';
import { ChatLieuDeGiayResponse } from '../../../../../../models/chat-lieu-de-giay/response/chat-lieu-de-giay-response';
import { KichCoResponse } from '../../../../../../models/kich-co/response/kich-co-response';
import { ChatLieuResponse } from '../../../../../../models/chat-lieu/response/chat-lieu-response';
import { SanPhamChiTietRequest } from '../../../../../../models/san-pham-chi-tiet/request/san-pham-chi-tiet-request';
import { StatusSPCT } from '../../../../../../shared/status-spct';
import { NotificationService } from '../../../../../../shared/notification.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgMultiSelectDropDownModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent implements OnInit {


  form!: FormGroup; //Biến form

  // Các biến hứng dữ liệu cho các combobox
  thuongHieus: ThuongHieuResponse[] = []; // Thương hiệu
  danhMucs: DanhMucResponse[] = []; // Danh mục
  mauSacs: MauSacResponse[] = []; // Màu sắc
  trongLuongs: TrongLuongResponse[] = []; // Trọng lượng
  kieuDeGiays: KieuDeGiayResponse[] = []; // Kiểu đế giày
  chatLieuDeGiays: ChatLieuDeGiayResponse[] = []; // Chất liệu đế giày
  kichCos: KichCoResponse[] = []; // Kích cỡ
  chatLieus: ChatLieuResponse[] = []; // Chất liệu

  selectedMauSac: MauSacRequest[] = []; // Mảng màu sắc đang được chọn
  selectedKichThuoc: KichCoRequest[] = []; // Mảng kích thước đang được chọn

  sanPhamChiTiets: SanPhamChiTietRequest[] = []; //Biến chứa các spct được gen ra
  groupedSanPhamChiTiet: { [colorCode: string]: SanPhamChiTietRequest[] } = {}; // Biến nhóm các sản phẩm chi tiết theo id màu sắc
  colorIds: string[] = []; // Biến hứng danh sách id của màu

  /**Cài đặt các thuộc tính cho combobox màu sắc */
  dropdownSettingForColor = {
    singleSelection: false,
    idField: 'idMauSac',
    textField: 'tenMau',
    selectAllText: 'Chọn tất cả',
    unSelectAllText: 'Bỏ chọn tất cả',
    itemsShowLimit: 300,
    allowSearchFilter: true
  };

  /**Cài đặt các thuộc tính cho combobox kích cỡ */
  dropdownSettingForSize = {
    singleSelection: false,
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
    private kieuDeGiayService: KieuDeGiayService,
    private chatLieuDeGiayService: ChatLieuDeGiayService,
    private kichCoService: KichCoService,
    private chatLieuService: ChatLieuService,
    private notificationService: NotificationService,
    private router: Router
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

  /**Hàm tải dữ liệu cho danh sách kiểu đế giày*/
  fetchKieuDeGiays() {
    this.kieuDeGiayService.getAllKieuDeGiay().subscribe({
      next: (res: any) => {
        this.kieuDeGiays = res.data;
      },
      error: err => {
        console.log('Lỗi khi tải dữ liệu danh sách kiểu đế giày: ', err);
      }
    })
  }

  /**Hàm tải dữ liệu cho danh sách chất liệu đế giày*/
  fetchChatLieuDeGiays() {
    this.chatLieuDeGiayService.getAllCLDG().subscribe({
      next: (res: any) => {
        this.chatLieuDeGiays = res.data;
      },
      error: err => {
        console.log('Lỗi khi tải dữ liệu danh sách chất liệu đế giày: ', err);
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

  /**Hàm nhóm các sản phẩm chi tiết theo mã màu */
  groupSPCTByColorCode(): void {
    debugger
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
  handleSubmitFormProduct() {
    console.log('San Pham Data Form: ', this.form.value);
    if (this.form.invalid) {
      this.form.markAllAsTouched(); // Đánh dấu tất cả các trường là "touched"
      return;
    }

    this.sanPhamService.createProduct(this.form.value).subscribe({
      next: (res: any) => {
        console.log("Message", res.message);
      }
    });
  }

  /**Hàm bắt sự kiện quay lại danh sách sản phẩm */
  handleBackToListProduct() {
    this.router.navigate(['/admin/product'])
  }

    /** Bắt sự kiện thêm mới sản phẩm */
    handleCreateNewSP() {
      throw new Error('Method not implemented.');
    }

  /** Hàm bắt sự kiện gen sản phẩm chi tiết nếu các thuộc tính của sản phẩm và sản phẩm chi tiết đầy đủ các thông tin cầm thiết */
  handleGenSPCT() {
    this.genSPCT();
  }

  /** Hàm gen danh sách sản phẩm chi tiết */
  genSPCT() {
    // const sanPham = this.form.get('sanPham')?.value;
    const spct = this.form.get('sanPhamChiTiet')?.value;
    this.sanPhamChiTiets = [];

    // Kiểm tra các thuộc tính của sanPhamChiTiet
    if (
      // sanPham &&
      // sanPham.danhMuc &&
      // sanPham.thuongHieu &&
      // sanPham.tenSanPham.length &&
      spct &&
      spct.mauSac?.length &&
      spct.kichCo?.length &&
      spct.chatLieu &&
      spct.chatLieuDeGiay &&
      spct.kieuDeGiay &&
      spct.trongLuong
    ) {
      // Lặp qua từng màu sắc
      spct.mauSac.forEach((mauSac: MauSacRequest) => {
        // Lặp qua từng kích cỡ
        spct.kichCo.forEach((kichCo: KichCoRequest) => {
          let sanPhamChiTiet: SanPhamChiTietRequest = new SanPhamChiTietRequest();

          // Gán các thuộc tính cho sản phẩm chi tiết
          sanPhamChiTiet.soLuong = 100; // Số lượng
          sanPhamChiTiet.gia = 1000000; // Giá
          sanPhamChiTiet.chatLieu = spct.chatLieu; // Chất liệu
          sanPhamChiTiet.chatLieuDeGiay = spct.chatLieuDeGiay; // Chất liệu đế giày
          sanPhamChiTiet.kieuDeGiay = spct.kieuDeGiay; // Kiểu đế giày
          sanPhamChiTiet.maSpct = 'RANDOM'; // Mã sản phẩm chi tiết (có thể thay đổi nếu cần)
          sanPhamChiTiet.trangThai = StatusSPCT.ACTIVE; // Trạng thái sản phẩm chi tiết
          sanPhamChiTiet.trongLuong = spct.trongLuong
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
      this.notificationService.showError('Vui lòng điền đầy đủ thông tin');
      console.log('Vui lòng điền đầy đủ thông tin chi tiết sản phẩm trước khi gen.');
    }
  }



  /**Khởi tạo giá trị cho giao diện trước khi render */
  ngOnInit(): void {
    /**Fetch các dữ liệu ban đầu */
    this.fetchThuongHieus();
    this.fetchDanhMuc();
    this.fetchMauSacs();
    this.fetchTrongLuongs();
    this.fetchKieuDeGiays();
    this.fetchChatLieuDeGiays();
    this.fetchKichCos();
    this.fetchChatLieus();

    /** Form */
    this.form = new FormGroup({
      tenSanPham: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(255)]),
      moTa: new FormControl('', [Validators.maxLength(500)]),
      danhMuc: new FormControl(null, [Validators.required]),
      thuongHieu: new FormControl(null, [Validators.required]),
      sanPhamChiTiet: new FormGroup({
        mauSac: new FormControl(null, [Validators.required]),
        kichCo: new FormControl(null, [Validators.required]),
        chatLieu: new FormControl(null, [Validators.required]),
        chatLieuDeGiay: new FormControl(null, [Validators.required]),
        kieuDeGiay: new FormControl(null, [Validators.required]),
        trongLuong: new FormControl(null, [Validators.required]),
      })
    });
  }


}
