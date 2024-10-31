import { Injectable } from '@angular/core';
import { ToastComponent } from '../component/toast/toast.component';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private toastComponent!: ToastComponent;

  setToastComponent(toast: ToastComponent) {
    this.toastComponent = toast;
  }

  show(message: string, status: number) {
    this.toastComponent.show(message, status);
  }
}
