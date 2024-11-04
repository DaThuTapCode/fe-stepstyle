import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit } from '@angular/core';
import { SanPhamService } from '../../../services/san-pham.service';
import { Router } from '@angular/router';
import { SanPhamSearch } from '../../../../../../models/san-pham/request/san-pham-search';
import { ThuongHieuService } from '../../../services/thuong-hieu.service';
import { DanhMucService } from '../../../services/danh-muc.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SanPhamResponse } from "../../../../../../models/san-pham/response/san-pham-response";
import { ThuongHieuResponse } from "../../../../../../models/thuong-hieu/response/thuong-hieu-response";
import { DanhMucResponse } from "../../../../../../models/danh-muc/response/danh-muc-response";
import { NotificationService } from '../../../../../../shared/notification.service';
import { LoadingComponent } from "../../../../../../shared/loading/loading.component";
import { SttUtilsService } from '../../../../../../shared/helper/stt-utils.service';
import { SanPhamChiTietResponse } from '../../../../../../models/san-pham-chi-tiet/response/san-pham-chi-tiet-response';
import { Pagination } from '../../../../../../shared/type/pagination';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, LoadingComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {

  form!: FormGroup; //Biến form

  loading: boolean = true;

  sanPhams: SanPhamResponse[] = []; //Biến hứng dữ liệu
  // Các biến hứng dữ liệu cho các combobox
  thuongHieus: ThuongHieuResponse[] = [];
  danhMucs: DanhMucResponse[] = [];

  sanPhamSearch: SanPhamSearch = {//Biến gửi dữ liệu tìm kiếm
    maSanPham: null,
    tenSanPham: null,
    ngayTaoStart: null,
    ngayTaoEnd: null,
    idDanhMuc: null,
    idThuongHieu: null
  };

  //Phân trang 
  paginatinonOfSP: Pagination = {
    size: 10,
    page: 0,
    totalElements: 0,
    totalPages: 0,
    first: false,
    last: false
  }

  constructor(
    private sanPhamService: SanPhamService,
    private thuongHieuService: ThuongHieuService,
    private danhMucService: DanhMucService,
    private router: Router,
    private notificationService: NotificationService,
    private el: ElementRef,
    private sttUtilsService: SttUtilsService
  ) { }


  /** Hàm tìm kiếm phân trang sản phẩm */
  fetchDataSearchSanPham() {
    this.sanPhamService.searchPageProduct(this.sanPhamSearch, this.paginatinonOfSP.page, this.paginatinonOfSP.size).subscribe({
      next: (response: any) => {
        this.sanPhams = response.data.content;
        this.paginatinonOfSP.totalPages = response.data.totalPages;
        this.paginatinonOfSP.totalElements = response.data.totalElements;
        this.paginatinonOfSP.page = response.data.pageable.pageNumber;
        this.paginatinonOfSP.first = response.data.first;
        this.paginatinonOfSP.last = response.data.last;
        console.log("SanPhamPage: ", response);
      }
    });
  }

  /** Hàm tải dữ liệu cho danh sách thương hiệu*/
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

  /** Hàm tải dữ liệu cho danh sách danh mục*/
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

  /** Hàm trả về giá trị của trạng thái*/
  getTrangThaiLabel(trangThai: string): string {
    if (trangThai === 'ACTIVE') {
      return 'Hoạt động';
    } else if (trangThai === 'INACTIVE') {
      return 'Ngừng bán';
    }
    return 'Ngừng bán';
  }

  /** Hàm trả về class css theo trạng thái của đối tượng */
  getTrangThaiClass(trangThai: string) {
    if (trangThai === 'ACTIVE') {
      return 'tag-c tag-success';
    } else if (trangThai === 'INACTIVE') {
      return 'tag-c tag-danger';
    }
    return 'tag-c tag-danger';
  }


  /** Hàm bắt sự kiện chuyển hướng thêm sản phẩm mới */
  handleRedirectCreateProduct() {
    this.router.navigate(['/admin/product/create']);
  }

  /** Hàm bắt sự kiện chuyển hướng update sản phẩm */
  handleUpdateProduct(idSanPham: number) {

  }

  /** Bắt sự kiện submit form thêm sản phẩm */
  handleSubmitFormProduct() {
    //Kiểm tra tính hợp lệ của form
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.notificationService.showError('Vui lòng nhập đầy đủ các thông tin cần thiết');
      return;
    }
    this.loading = true;
    // Form hợp lệ thì gửi request thêm mới sản phẩm
    this.sanPhamService.createProduct(this.form.value).subscribe({
      next: (res: any) => {
        this.fetchDataSearchSanPham();
        this.notificationService.showSuccess('Thêm sản phẩm mới thành công');
        this.closeModal('btnCloseModalAdd');
        this.clearFormData;
        this.loading = false;
      },
      error: (err: any) => {
        this.notificationService.showError(err.error.message);
        this.loading = false;
      }
    });
  }

  /** Hàm bắt sự kiện chuyển hướng xem chi tiết sản phẩm */
  handleDetailProduct(idSanPham: number) {
    this.router.navigate([`/admin/product/detail/${idSanPham}`]);
  }

  /** Hàm bắt sự kiện xuất excel */
  handleExportExcel() {
    alert('Xuất excel')
  }

  /** Closemodal để đống modal khi submitAdd và update */
  closeModal(idBtn: string) {
    const btn = document.getElementById(idBtn);
    if (btn) {
      btn.click();
    }
  }

  /**Clear dữ liệu trên form */
  clearFormData() {
    this.form.reset();
  }

  /**Tính stt */
  tinhSTT(page: number, size: number, current: number): number {
    return this.sttUtilsService.tinhSTT(page, size, current);
  }
  /**Hàm bắt sự kiện đổi trang bảng sản phẩm */
  handlePageSPCTChange(type: string) {
    if (type === 'pre') {
      this.paginatinonOfSP.page -= 1;
    } else if (type === 'next') {
      this.paginatinonOfSP.page += 1;
    }
    this.fetchDataSearchSanPham();
  }

  
  /**Bắt sự kiện tìm kiếm sản phẩm */
  handleSearchSanPham(){
    this.paginatinonOfSP.page = 0;
    this.fetchDataSearchSanPham();
  }

  /**Tính số lượng sản phẩm */
  tinhTongSPCT(spctList: SanPhamChiTietResponse[] | any) {
    let total = 0;
    spctList.forEach((item: { soLuong: number; }) => {
      total += item.soLuong;
    });
    return total;
  }

  /**Reset lại kết quả tìm kiếm */
  resetSanPhamSearch() {
    this.paginatinonOfSP.page = 0;
    this.sanPhamSearch = {
      maSanPham: null,
      tenSanPham: null,
      ngayTaoStart: null,
      ngayTaoEnd: null,
      idDanhMuc: null,
      idThuongHieu: null
    };
    this.fetchDataSearchSanPham();
  }


    

  /** Khởi tạo dữ liệu */
  ngOnInit(): void {
    this.fetchDataSearchSanPham();
    this.fetchThuongHieus();
    this.fetchDanhMuc();
    /** Form */
    this.form = new FormGroup({
      tenSanPham: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(255)]),
      moTa: new FormControl('', [Validators.maxLength(500)]),
      danhMuc: new FormControl(null, [Validators.required]),
      thuongHieu: new FormControl(null, [Validators.required]),
    });
    this.loading = false;
  }
}
