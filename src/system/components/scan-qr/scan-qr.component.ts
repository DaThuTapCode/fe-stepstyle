import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { BarcodeFormat } from '@zxing/browser';

@Component({
  selector: 'app-scan-qr',
  standalone: true,
  imports: [ZXingScannerModule, CommonModule],
  templateUrl: './scan-qr.component.html',
  styleUrl: './scan-qr.component.scss'
})
export class ScanQrComponent {
  qrResult: string | null = null;
  selectedDevice: MediaDeviceInfo | undefined;
  availableDevices: MediaDeviceInfo[] = [];
  formats: BarcodeFormat[] = [BarcodeFormat.QR_CODE];

  ngOnInit() {
    navigator.mediaDevices.enumerateDevices().then(devices => {
      this.availableDevices = devices.filter(device => device.kind === 'videoinput');
      this.selectedDevice = this.availableDevices[0] || undefined;
    });
  }

  onScanSuccess(result: string) {
    this.qrResult = result;
    console.log('QR code result:', result);
  }

  onScanFailure(event: any) {
    console.warn('Scan failed:', event);
  }

  onScanError(event: any) {
    console.error('Scan error:', event);
  }
}
