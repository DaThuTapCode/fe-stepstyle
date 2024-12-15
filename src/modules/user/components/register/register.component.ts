import { Component } from '@angular/core';
import { NotificationComponent } from "../../../../shared/notification/notification.component";
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LoginAndRegisterService } from '../../service/login.service';
import { NotificationService } from '../../../../shared/notification.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [NotificationComponent, CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginAndRegisterService,
    private notiService: NotificationService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        userName: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z0-9_]*$/)]],
        fullName: ['', [Validators.required, Validators.minLength(3)]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        phone: ['', [Validators.required, Validators.pattern(/^0\d{9,10}$/)]],
        email: ['', [Validators.required, Validators.email]]
      },
      { validator: this.passwordMatchValidator }
    );
  }

  // Custom validator để kiểm tra mật khẩu khớp
  passwordMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  submitRegister(): void {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;
      this.loginService.callApiCustomerRegister(formData).subscribe({
        next: (response: any) => {
          this.notiService.showSuccess(response.message);
          this.router.navigate(['/okconde/login']);
        },
        error: (err: any) => {
          this.notiService.showError(err.error.message);
        }
      })
    } else {
      this.registerForm.markAllAsTouched();
      this.notiService.showWarning('Vui lòng xem lại dữ liệu đầu vào');
    }
  }
}
