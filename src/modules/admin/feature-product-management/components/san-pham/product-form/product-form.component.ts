import {CommonModule} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {SanPhamService} from "../../../services/san-pham.service";
import {SanPhamChiTietService} from "../../../services/san-pham-chi-tiet.service";
import {ThuongHieuService} from "../../../services/thuong-hieu.service";
import {DanhMucService} from "../../../services/danh-muc.service";
import {MauSacService} from "../../../../feature-attribute-management/service/mau-sac.service";
import {TrongLuongService} from "../../../../feature-attribute-management/service/trong-luong.service";
import {KieuDeGiayService} from "../../../../feature-attribute-management/service/kieu-de-giay.service";
import {ChatLieuDeGiayService} from "../../../../feature-attribute-management/service/chat-lieu-de-giay.service";
import {KichCoService} from "../../../../feature-attribute-management/service/kich-co.service";
import {ThuongHieu} from "../../../../../../models/thuong-hieu/response/thuong-hieu";
import {DanhMuc} from "../../../../../../models/danh-muc/response/danh-muc";
import {MauSac} from "../../../../../../models/mau-sac/response/mau-sac";
import {TrongLuong} from "../../../../../../models/trong-luong/response/trong-luong";
import {KieuDeGiay} from "../../../../../../models/kieu-de-giay/response/kieu-de-giay";
import {ChatLieuService} from "../../../../feature-attribute-management/service/chat-lieu.service";
import {ChatLieuDeGiay} from "../../../../../../models/chat-lieu-de-giay/response/chat-lieu-de-giay";
import {KichCo} from "../../../../../../models/kich-co/response/kich-co";
import {ChatLieu} from "../../../../../../models/chat-lieu/response/chat-lieu";
import { SanPham } from '../../../../../../models/san-pham/request/san-pham';
import { Router } from '@angular/router';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgMultiSelectDropDownModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent implements OnInit {
  form!: FormGroup;


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
    private fb: FormBuilder,
    private router: Router
  ) {

  }

  selectedMauSac: MauSac[] = [];
  selectedKichThuoc: KichCo[] = [];

  dropdownSettingForColor = {
    singleSelection: false,
    idField: 'idMauSac',
    textField: 'tenMau',
    selectAllText: 'Chọn tất cả',
    unSelectAllText: 'Bỏ chọn tất cả',
    itemsShowLimit: 300,
    allowSearchFilter: true
  };

  dropdownSettingForSize = {
    singleSelection: false,
    idField: 'idKichCo',
    textField: 'giaTri',
    selectAllText: 'Chọn tất cả',
    unSelectAllText: 'Bỏ chọn tất cả',
    itemsShowLimit: 300,
    allowSearchFilter: true
  };

  // Các biến hứng dữ liệu cho các combobox
  thuongHieus: ThuongHieu[] = [];
  danhMucs: DanhMuc[] = [];
  mauSacs: MauSac[] = [];
  trongLuongs: TrongLuong[] = [];
  kieuDeGiays: KieuDeGiay[] = [];
  chatLieuDeGiays: ChatLieuDeGiay[] = [];
  kichCos: KichCo[] = [];
  chatLieus: ChatLieu[] = [];

  /**Hàm tải dữ liệu cho danh sách thương hiệu*/
  fetchThuongHieus() {
    this.thuongHieuService.getAllThuongHieu().subscribe({
      next: (res: any) => {
          this.thuongHieus = res.data;
      },
      error: err => {
        console.log('Lỗi khi tải dữ liệu danh sách thương hiệu: ',err);
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
        console.log('Lỗi khi tải dữ liệu danh sách danh mục: ',err);
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
        console.log('Lỗi khi tải dữ liệu danh sách màu sắc: ',err);
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
        console.log('Lỗi khi tải dữ liệu danh sách trọng lượng: ',err);
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
        console.log('Lỗi khi tải dữ liệu danh sách kiểu đế giày: ',err);
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
        console.log('Lỗi khi tải dữ liệu danh sách chất liệu đế giày: ',err);
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
        console.log('Lỗi khi tải dữ liệu danh sách kích cỡ: ',err);
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
        console.log('Lỗi khi tải dữ liệu danh sách chất liệu: ',err);
      }
    })
  }

  /**Hàm bắt sự kiện submit form*/
  handleSubmitFormProduct() {
    console.log('San Pham Data Form: ', this.form.value);
    if (this.form.invalid) {
      this.form.markAllAsTouched(); // Đánh dấu tất cả các trường là "touched"
      return;
    }
   
    this.sanPhamService.createProduct(this.form.value).subscribe({
      next: (res: any) =>{
        console.log("Message", res.message);
      }
    });
  }

  /**Hàm bắt sự kiện quay lại danh sách sản phẩm */
  handleBackToListProduct() {
    this.router.navigate(['/admin/product'])
  }


  ngOnInit(): void {
    this.fetchThuongHieus();
    this.fetchDanhMuc();
    this.fetchMauSacs();
    this.fetchTrongLuongs();
    this.fetchKieuDeGiays();
    this.fetchChatLieuDeGiays();
    this.fetchKichCos();
    this.fetchChatLieus();

    this.form = new FormGroup({
      tenSanPham: new FormControl('', [Validators.required, Validators.minLength(4)]),
      moTa: new FormControl(''),
      danhMuc: new FormControl(null, [Validators.required]), 
      thuongHieu: new FormControl(null, [Validators.required]), 
      mauSac: new FormControl([], [Validators.required]),
      kichCo: new FormControl([], [Validators.required]), 
      chatLieu: new FormControl(null, [Validators.required]), 
      chatLieuDeGiay: new FormControl(null, [Validators.required]), 
      kieuDeGiay: new FormControl(null, [Validators.required]), 
      trongLuong: new FormControl(null, [Validators.required])
  });
  

  }


}
