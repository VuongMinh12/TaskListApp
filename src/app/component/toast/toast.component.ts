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
  toasts: { message: string, status: string, id: number}[] = [];
  toastId: number = 0;

  constructor(public toastService: ToastService , private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.cdr.detectChanges();
  }

  show(message: string, status: number) {
    let statusClass = "toast-status-" + status
    var temp = { message : message, status : statusClass, id : this.toastId };
    this.toasts.push(temp);
    setTimeout(() => this.removeToast(temp.id),60000);
    this.toastId++;
  }

  removeToast(id: number) {
    this.toasts = this.toasts.filter(t => t.id != id);
  }
}
