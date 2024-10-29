import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ToastService } from '../../service/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css'
})
export class ToastComponent implements OnInit {
  toasts: { message: string, status: string}[] = [];

  constructor(public toastService: ToastService , private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.cdr.detectChanges();
  }

  show(message: string, status: number) {
    let statusClass = "toast-status-" + status
    this.toasts.push({ message, status : statusClass});
    setTimeout(() => this.removeToast(message), 5000);
  }

  removeToast(message: string) {
    this.toasts = this.toasts.filter(t => t.message !== message);
  }
}
