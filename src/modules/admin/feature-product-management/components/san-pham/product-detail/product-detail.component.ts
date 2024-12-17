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
import { SanPhamChiTietResponse } from '../../../../../../models/san-pham-chi-tiet/response/san-pham-chi-tiet-response';
import { HamDungChung } from '../../../../../../shared/helper/ham-dung-chung';
import { SttUtilsService } from '../../../../../../shared/helper/stt-utils.service';
import { SanPhamChiTietRequest } from '../../../../../../models/san-pham-chi-tiet/request/san-pham-chi-tiet-request';
import { StatusSPCT } from '../../../../../../shared/status-spct';
import { StatusEnum } from '../../../../../../shared/status-enum';
import { Contans } from '../../../../../../shared/contans';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MauSacRequest } from '../../../../../../models/mau-sac/request/mau-sac-request';
import { KichCoRequest } from '../../../../../../models/kich-co/request/kich-co-request';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgMultiSelectDropDownModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {


  mauSacIsSelected: any = [];
  kichCoIsSelected: any = [];
  groupedSanPhamChiTiet: { [colorCode: string]: SanPhamChiTietRequest[] } = {}; // Biến nhóm các sản phẩm chi tiết theo id màu sắc
  sanPhamChiTietRequetss: SanPhamChiTietRequest[] = [];
  colorIds: string[] = []; // Biến hứng danh sách id của màu


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
    public hamDungChung: HamDungChung,
    private sttUtilsService: SttUtilsService,
  ) { }


  handleCreateSPCT() {
    this.sanPhamChiTietService.callApiCreateProductDetailByIdSanPham(this.sanPhamById.idSanPham, this.sanPhamChiTietRequetss).subscribe({
      next: (response: any) => {
        this.notificationService.showSuccess(response.message);
        this.fetchSanPhamById();
        this.hamDungChung.closeModal('closeModalCreateSpct');
      },
      error: (err: any) => {
        this.notificationService.showError(err.error.message);
      }
    })
  }
  genSPCT() {
    this.sanPhamChiTietRequetss = [];

    // Lặp qua từng màu sắc
    this.mauSacIsSelected.forEach((mauSac: MauSacRequest) => {
      // Lặp qua từng kích cỡ
      this.kichCoIsSelected.forEach((kichCo: KichCoRequest) => {
        let sanPhamChiTiet: SanPhamChiTietRequest = new SanPhamChiTietRequest();
        // Gán các thuộc tính cho sản phẩm chi tiết
        sanPhamChiTiet.soLuong = 100; // Số lượng
        sanPhamChiTiet.gia = 1000000; // Giá
        sanPhamChiTiet.maSpct = 'RANDOM'; // Mã sản phẩm chi tiết (có thể thay đổi nếu cần)
        sanPhamChiTiet.trangThai = StatusSPCT.ACTIVE; // Trạng thái sản phẩm chi tiết
        // Gán màu sắc và kích cỡ cho sản phẩm chi tiết
        sanPhamChiTiet.mauSac = mauSac;
        sanPhamChiTiet.kichCo = kichCo;
        this.sanPhamChiTietRequetss.push(sanPhamChiTiet);  // Thêm sản phẩm chi tiết vào danh sách
      });
    });

    this.groupSPCTByColorCode(); // Nhóm sản phẩm chi tiết theo mã màu
  }


  spctIsEdit: SanPhamChiTietRequest = new SanPhamChiTietRequest();
  handleDetailProductEdit(spct: SanPhamChiTietRequest) {
    this.spctIsEdit = { ...spct };
  }
  handleConfirmEditProductDetail() {
    if(!this.validateSoLUongVaGiaCuaSPCTFAKE()){
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

  validateSoLUongVaGiaCuaSPCTFAKE(): boolean {


    // Kiểm tra giá trị `gia`
    if (!Number.isInteger(this.spctIsEdit.gia) || this.spctIsEdit.gia <= 0) {
      this.notificationService.showError('Giá phải là số nguyên dương');
      return false; // Dừng xử lý nếu giá trị không hợp lệ
    }

    if (this.spctIsEdit.gia > Contans.MAX_GIA) {
      this.notificationService.showError(`Giá không được vượt quá ${Contans.MAX_GIA}`);
      return false; // Dừng xử lý nếu giá trị quá lớn
    }

    // Kiểm tra giá trị `soLuong`
    if (!Number.isInteger(this.spctIsEdit.soLuong) || this.spctIsEdit.soLuong < 0) {
      this.notificationService.showError('Số lượng phải là số nguyên dương');
      return false; // Dừng xử lý nếu số lượng không hợp lệ
    }

    if (this.spctIsEdit.soLuong > Contans.MAX_SO_LUONG) {
      this.notificationService.showError(`Số lượng không được vượt quá ${Contans.MAX_SO_LUONG}`);
      return false; // Dừng xử lý nếu giá trị quá lớn
    }
    return true;
  }




/** Băt sự kiện xóa sản phẩm chi tiết không muốn thêm */
handleDeleteSPCT(spct: SanPhamChiTietRequest, colorId: any) {

  if (!confirm('Bạn có muốn loại bỏ sản phẩm chi tiết này?')) {
    return;
  }

  const index = this.groupedSanPhamChiTiet[colorId].findIndex(item =>
    item.mauSac.idMauSac === spct.mauSac.idMauSac && item.kichCo.idKichCo === spct.kichCo.idKichCo
  );

  const index2 = this.sanPhamChiTietRequetss.findIndex(item =>
    item.mauSac.idMauSac === spct.mauSac.idMauSac && item.kichCo.idKichCo === spct.kichCo.idKichCo
  );

  if (index !== -1) {
    this.groupedSanPhamChiTiet[colorId].splice(index, 1);
  }

  if (index2 !== -1) {
    this.sanPhamChiTietRequetss.splice(index2, 1);
  }
}


  groupSPCTByColorCode(): void {
    this.groupedSanPhamChiTiet = this.sanPhamChiTietRequetss.reduce((groups: { [colorId: string]: SanPhamChiTietRequest[] }, spct) => {
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

  /**Hứng sản phẩm được lấy theo id */
  sanPhamById: SanPhamResponse = new SanPhamResponse;

  sanPhamChiTiets: SanPhamChiTietResponse[] = [];
  /**id san pham */
  idSanPham!: number;

  form!: FormGroup; //Biến form

  /**Biến hứng dữ liệu cập nhật sản phẩm chi tiết */
  spctUpdate: SanPhamChiTietRequest = new SanPhamChiTietRequest();

  /**Biến hứng dữ liệu cho sản phẩm cần update */
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

  //Phân trang modal sản phẩm chi tiết
  paginatinonOfSPCT: Pagination = {
    size: 10,
    page: 0,
    totalElements: 0,
    totalPages: 0,
    first: false,
    last: false,
  }

  /**BIến nhóm các sản phẩm chi tiết theo màu */
  groupedSanPhamChiTietByColorId: { [colorId: number]: SanPhamChiTietResponse[] } = {};

  /**Biến lưu trữ các key của nhóm màu */
  colorIdKeys: number[] = [];

  /** Hàm nhóm các sản phẩm chi tiết theo màu sắc */
  groupSpctByColorId() {
    this.groupedSanPhamChiTietByColorId = this.sanPhamById.sanPhamChiTiets.reduce(
      (groups: { [colorId: number]: SanPhamChiTietResponse[] }, spct) => {
        const colorId = spct.mauSac.idMauSac;
        if (!groups[colorId]) {
          groups[colorId] = [];
        }
        groups[colorId].push(spct);
        return groups;

      }, {});
    this.colorIdKeys = Object.keys(this.groupedSanPhamChiTietByColorId).map(Number);
  }



  selectedFile: File | null = null;
  previewUrl: string | null = null;


  idColorIselected = 0;
  /** Xử lý sự kiện chọn file */
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      // Kiểm tra loại file là ảnh
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        this.notificationService.showError('Vui lòng chọn tệp ảnh (JPEG, PNG, GIF)');
        this.selectedFile = null;
        this.previewUrl = null;
        return;
      }

      // Kiểm tra kích thước file (dưới 2MB)
      if (file.size > 2 * 1024 * 1024) { // 2MB
        this.notificationService.showError('Tệp ảnh phải nhỏ hơn 2MB');

        this.selectedFile = null;
        this.previewUrl = null;
        return;
      }

      // Tạo URL để xem trước ảnh
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    } else {
      this.selectedFile = null;
      this.previewUrl = null;
    }
  }

  /** Gửi ảnh đã chọn */
  handleSubmitUpdateAnhSpct() {
    if (!this.selectedFile) {
      this.notificationService.showError('Vui lòng chọn ảnh!');
      return;
    }
    this.sanPhamChiTietService.callApiUpdateAnhSPCT(this.sanPhamById.idSanPham, this.idColorIselected, this.selectedFile).subscribe({
      next: (response: any) => {
        this.notificationService.showSuccess(response.message);
        this.hamDungChung.closeModal('closeModalUpdateAnhSpct')
        this.fetchSanPhamById();
        this.selectedFile = null;
        this.previewUrl = null;

      }, error: (err: any) => {
        this.notificationService.showError(err.error.message);
        console.error('Lỗi khi cập nhật ảnh sản phẩm');
      }
    })
  }


  /**Hàm bắt sự kiện đổi trang trong modal spct */
  handlePageSPCTChange(type: string) {
    if (type === 'pre') {
      this.paginatinonOfSPCT.page -= 1;
      this.fetchPageSpct();
    } else if (type === 'next') {
      this.paginatinonOfSPCT.page += 1;
      this.fetchPageSpct();
    }
  }

  /** Hàm bắt sự kiện cập nhật sản phẩm */
  handleUpdateProduct() {
    if (!this.form.valid) {
      this.form.markAllAsTouched(); // Đánh dấu toàn bộ điều khiển trong form
      return;
    }
    if (!confirm('Bạn có muốn cập nhật sản phẩm này?')) {
      return;
    }
    const sanPham = this.form.value;
    const sanPhamRequest: SanPhamRequest = new SanPhamRequest();
    sanPhamRequest.tenSanPham = sanPham.tenSanPham;
    sanPhamRequest.moTa = sanPham.moTa;

    this.chatLieus.forEach(cl => {
      if (sanPham.chatLieu === cl.idChatLieu) {
        sanPhamRequest.chatLieu = cl;
      }
    });
    this.trongLuongs.forEach(tl => {
      if (sanPham.trongLuong === tl.idTrongLuong) {
        sanPhamRequest.trongLuong = tl;
      }
    });
    this.danhMucs.forEach(dm => {
      if (sanPham.danhMuc === dm.idDanhMuc) {
        sanPhamRequest.danhMuc = dm;
      }
    });
    this.thuongHieus.forEach(th => {
      if (sanPham.thuongHieu === th.idThuongHieu) {
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

  /**Băt sự kiện spct cần chỉnh sửa */
  handleSelectSpctUpdate(spct: SanPhamChiTietResponse) {
    this.spctUpdate.gia = spct.gia;
    this.spctUpdate.soLuong = spct.soLuong;
    this.spctUpdate.idSpct = spct.idSpct;
    this.spctUpdate.maSpct = spct.maSpct;
    this.spctUpdate.trangThai = StatusSPCT.ACTIVE;
    this.spctUpdate.mauSac.trangThai = StatusEnum.ACTIVE;
    this.spctUpdate.kichCo.trangThai = StatusEnum.ACTIVE;
  }


  validateSoLUongVaGia(): boolean {


    // Kiểm tra giá trị `gia`
    if (!Number.isInteger(this.spctUpdate.gia) || this.spctUpdate.gia <= 0) {
      this.notificationService.showError('Giá phải là số nguyên dương');
      return false; // Dừng xử lý nếu giá trị không hợp lệ
    }

    if (this.spctUpdate.gia > Contans.MAX_GIA) {
      this.notificationService.showError(`Giá không được vượt quá ${Contans.MAX_GIA}`);
      return false; // Dừng xử lý nếu giá trị quá lớn
    }

    // Kiểm tra giá trị `soLuong`
    if (!Number.isInteger(this.spctUpdate.soLuong) || this.spctUpdate.soLuong < 0) {
      this.notificationService.showError('Số lượng phải là số nguyên dương');
      return false; // Dừng xử lý nếu số lượng không hợp lệ
    }

    if (this.spctUpdate.soLuong > Contans.MAX_SO_LUONG) {
      this.notificationService.showError(`Số lượng không được vượt quá ${Contans.MAX_SO_LUONG}`);
      return false; // Dừng xử lý nếu giá trị quá lớn
    }
    return true;
  }


  /** Bắt sự kiện chỉnh sửa sản phẩm chi tiết*/
  handleSubmitUpdateSPct() {
    if (!this.validateSoLUongVaGia()) {
      return;
    }

    this.sanPhamChiTietService.callApiUpdateSPCT(this.spctUpdate.idSpct, this.spctUpdate).subscribe({
      next: (response: any) => {
        this.fetchPageSpct();
        this.fetchSanPhamById();
        this.notificationService.showSuccess(response.message);
        this.hamDungChung.closeModal('closeModalUpdateSpct');
      },
      error: (err: any) => {
        this.notificationService.showError(err.error.message);
      }
    })
  }


  /** Tải dữ liệu sản phẩm theo id */
  fetchSanPhamById() {
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
        this.groupSpctByColorId();
        this.fetchPageSpct();
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


  /**Hàm tải dữ liệu cho danh sách chất liệu*/
  fetchPageSpct() {
    this.sanPhamChiTietService.callApiGetSPCTByIdSP(this.sanPhamById.idSanPham, null, this.paginatinonOfSPCT.page, this.paginatinonOfSPCT.size).subscribe({
      next: (res: any) => {
        this.sanPhamChiTiets = res.data.content;
        this.paginatinonOfSPCT.totalPages = res.data.totalPages;
        this.paginatinonOfSPCT.page = res.data.pageable.pageNumber;
        this.paginatinonOfSPCT.first = res.data.first;
        this.paginatinonOfSPCT.last = res.data.last;
      },
      error: err => {
        console.log('Lỗi khi tải dữ liệu danh spct: ', err);
      }
    })
  }

  /**Tính stt */
  tinhSTT(page: number, size: number, current: number): number {
    return this.sttUtilsService.tinhSTT(page, size, current);
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
