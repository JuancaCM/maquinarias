// qr.service.ts
import { Injectable } from '@angular/core';
import * as QRCode from 'qrcode';

@Injectable({
  providedIn: 'root'
})
export class QRService {
  constructor() { }

  generarQR(data: string): Promise<string> {
    return QRCode.toDataURL(data);
  }
}
