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
import { HamDungChung } from '../../../../../../shared/helper/ham-dung-chung';

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

      // Kiểm tra dung lượng tệp (2MB = 2 * 1024 * 1024 bytes)
      const maxSize = 2 * 1024 * 1024; // 2MB
      if (file.size > maxSize) {
        this.notificationService.showError('Dung lượng tệp phải nhỏ hơn 2MB.');
        return; // Dừng xử lý nếu tệp quá lớn
      }

      // Kiểm tra định dạng tệp (chỉ cho phép ảnh PNG, JPG, JPEG)
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!validTypes.includes(file.type)) {
        this.notificationService.showError('Vui lòng chọn tệp ảnh (JPG, PNG).');
        return; // Dừng xử lý nếu không phải ảnh
      }

      const reader = new FileReader();
      reader.onload = () => {
        this.sanPhamChiTiets.forEach(spct => {
          if (spct.mauSac.idMauSac === Number(colorId)) {
            spct.anhFile = file;
          }
        });
        this.selectedImages[colorId] = reader.result as string; // Lưu đường dẫn ảnh base64
      };
      reader.readAsDataURL(file);
    }
  }


  removeImage(colorId: string): void {
    delete this.selectedImages[colorId]; // Xóa ảnh của nhóm màu
    this.sanPhamChiTiets.forEach(spct => {
      if (spct.mauSac.idMauSac === Number(colorId)) {
        spct.anhFile = null;
      }
    })

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
    allowSearchFilter: true,
    enableCheckAll: false // Bỏ nút "Chọn tất cả"
  };

  /**Cài đặt các thuộc tính cho combobox kích cỡ */
  dropdownSettingForSize = {
    // singleSelection: false,
    idField: 'idKichCo',
    textField: 'giaTri',
    selectAllText: 'Chọn tất cả',
    unSelectAllText: 'Bỏ chọn tất cả',
    itemsShowLimit: 300,
    allowSearchFilter: true,
    enableCheckAll: false // Bỏ nút "Chọn tất cả"
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
    private hamDungChung: HamDungChung,
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


  /** Hàm bắt sự kiện chuyển trạng thái sản phẩm chi tiết được gen ra */
  handleChangeStatusSPCT() {

  }

  handleCreateNewSP() {
    if (!this.form.valid) {
      this.notificationService.showWarning('Vui lòng kiểm tra lại dữ liệu');
      this.form.markAllAsTouched();
      return;
    }

    const sanPham = this.form.value;
    let sanPhamNew = new SanPhamRequest();
    sanPhamNew = sanPham;
    sanPhamNew.sanPhamChiTiets = this.sanPhamChiTiets;

    const formData = new FormData();

    // Thêm thông tin sản phẩm vào FormData
    formData.append('tenSanPham', sanPham.tenSanPham);
    formData.append('moTa', sanPham.tenSanPham);
    formData.append('danhMuc.idDanhMuc', sanPham.danhMuc.idDanhMuc);
    formData.append('thuongHieu.idThuongHieu', sanPham.thuongHieu.idThuongHieu);
    formData.append('chatLieu.idChatLieu', sanPham.chatLieu.idChatLieu);
    formData.append('trongLuong.idTrongLuong', sanPham.trongLuong.idTrongLuong);

    // Thêm ảnh vào FormData (nếu đã có ảnh trong sản phẩm chi tiết)
    this.sanPhamChiTiets.forEach((spct, index) => {
      if (spct.anhFile && sanPham !== null) {
        formData.append('sanPhamChiTiets[' + index + '].anhFile', spct.anhFile, spct.anhFile.name); // Đính kèm ảnh từ SPCTRequest
      }
      formData.append('sanPhamChiTiets[' + index + '].mauSac.idMauSac', spct.mauSac.idMauSac.toString());
      formData.append('sanPhamChiTiets[' + index + '].kichCo.idKichCo', spct.kichCo.idKichCo.toString());
      formData.append('sanPhamChiTiets[' + index + '].gia', spct.gia.toString());
      formData.append('sanPhamChiTiets[' + index + '].soLuong', spct.soLuong.toString());
    });

    if (!confirm('Bạn có muốn thêm sản phẩm mới không?')) {
      return;
    }
    this.sanPhamService.createProduct(formData).subscribe({
      next: (response: any) => {
        this.notificationService.showSuccess(response.message);
        this.router.navigate(['/admin/product']);
      },
      error: (err: any) => {
        this.notificationService.showError(err.error.message);
      }
    });
  }


  /**Hàm bắt sự kiện quay lại danh sách sản phẩm */
  handleBackToListProduct() {
    this.router.navigate(['/admin/product'])
  }

  /** Hàm bắt sự kiện gen sản phẩm chi tiết nếu các thuộc tính của sản phẩm và sản phẩm chi tiết đầy đủ các thông tin cầm thiết */
  handleGenSPCT() {
    this.genSPCT();
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

          this.sanPhamChiTiets.push(sanPhamChiTiet);  // Thêm sản phẩm chi tiết vào danh sách
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

    if (!confirm('Bạn có muốn loại bỏ sản phẩm chi tiết này?')) {
      return;
    }

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


  spctIsEdit: SanPhamChiTietRequest = new SanPhamChiTietRequest();
  handleDetailProductEdit(spct: SanPhamChiTietRequest) {
    this.spctIsEdit = { ...spct };
  }


  validateSoLUongVaGia(): boolean{
    const MAX_INTEGER = 999999999;
  
    // Kiểm tra giá trị `gia`
    if (!Number.isInteger(this.spctIsEdit.gia) || this.spctIsEdit.gia <= 0) {
      this.notificationService.showError('Giá phải là số nguyên dương');
      return false; // Dừng xử lý nếu giá trị không hợp lệ
    }
  
    if (this.spctIsEdit.gia > MAX_INTEGER) {
      this.notificationService.showError(`Giá không được vượt quá ${MAX_INTEGER}`);
      return false; // Dừng xử lý nếu giá trị quá lớn
    }
  
    // Kiểm tra giá trị `soLuong`
    if (!Number.isInteger(this.spctIsEdit.soLuong) || this.spctIsEdit.soLuong < 0) {
      this.notificationService.showError('Số lượng phải là số nguyên không âm');
      return false; // Dừng xử lý nếu số lượng không hợp lệ
    }
  
    if (this.spctIsEdit.soLuong > MAX_INTEGER) {
      this.notificationService.showError(`Số lượng không được vượt quá ${MAX_INTEGER}`);
      return false; // Dừng xử lý nếu giá trị quá lớn
    }
    return true;
  }

  handleConfirmEditProductDetail() {
    if(!this.validateSoLUongVaGia()){
      return;
    }
    // Lấy các sản phẩm chi tiết theo màu sắc
    const spctList = this.groupedSanPhamChiTiet[this.spctIsEdit.mauSac.idMauSac];
  
    // Nếu không có sản phẩm nào khớp, thông báo lỗi
    if (!spctList || spctList.length === 0) {
      this.notificationService.showError('Không tìm thấy sản phẩm chi tiết phù hợp');
      return;
    }
  
    // Duyệt qua danh sách và cập nhật sản phẩm chi tiết
    let isUpdated = false; // Để kiểm tra xem có sản phẩm nào được cập nhật không
    spctList.forEach(item => {
      if (item.kichCo.idKichCo === this.spctIsEdit.kichCo.idKichCo) {
        // Gán giá trị nếu hợp lệ
        item.gia = this.spctIsEdit.gia;
        item.soLuong = this.spctIsEdit.soLuong;
        isUpdated = true;
      }
    });
  
    // Nếu không có sản phẩm nào được cập nhật, thông báo lỗi
    if (!isUpdated) {
      this.notificationService.showError('Không tìm thấy sản phẩm chi tiết cần cập nhật');
    } else {
      this.notificationService.showSuccess('Cập nhật sản phẩm chi tiết thành công');
      this.spctIsEdit = new SanPhamChiTietRequest();
      this.hamDungChung.closeModal('btnCloseModalSuaSPct');
    }
  }
  

  colorIdEdit: string = '';

  handleSuaSpctTheoNhomMau(colorid: string) {
    this.colorIdEdit = colorid;
    this.spctIsEdit = new SanPhamChiTietRequest();
    // this.spctIsEdit.gia = 0;
    // this.spctIsEdit.soLuong = 0;
  }

  confirmSuaSPCTTheoNhomMau(){
    if(!this.validateSoLUongVaGia()){
      return;
    }
     // Lấy các sản phẩm chi tiết theo màu sắc
     const spctList = this.groupedSanPhamChiTiet[this.colorIdEdit];
  
     // Nếu không có sản phẩm nào khớp, thông báo lỗi
     if (!spctList || spctList.length === 0) {
       this.notificationService.showError('Không tìm thấy sản phẩm chi tiết phù hợp');
       return;
     }
   
     // Duyệt qua danh sách và cập nhật sản phẩm chi tiết
     let isUpdated = false; // Để kiểm tra xem có sản phẩm nào được cập nhật không
     spctList.forEach(item => {
        // Gán giá trị nếu hợp lệ
         item.gia = this.spctIsEdit.gia;
         item.soLuong = this.spctIsEdit.soLuong;
         isUpdated = true;
     });
   
     // Nếu không có sản phẩm nào được cập nhật, thông báo lỗi
     if (!isUpdated) {
       this.notificationService.showError('Không tìm thấy sản phẩm chi tiết cần cập nhật');
     } else {
       this.notificationService.showSuccess('Cập nhật sản phẩm chi tiết thành công');
       this.spctIsEdit = new SanPhamChiTietRequest();
       this.hamDungChung.closeModal('btnCloseModalmodalProductDetailEditByNhomMau');
     }
  }



  ngOnInit() {
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
