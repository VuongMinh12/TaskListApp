import { CommonModule, NgIf } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import {
  NavigationEnd,
  Router,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterOutlet,
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    NgIf,
    MatSidenavModule,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  constructor(private router: Router, private cdr: ChangeDetectorRef) {}

  token: string | null = localStorage.getItem('AccessToken');
  role: number = 0;
  nameEmail : string | null = null;
  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const storedRole = localStorage.getItem('RoleId');
        this.role = storedRole ? +storedRole : 0;
        let token = localStorage.getItem('AccessToken');
        let name = localStorage.getItem('Email');
        this.nameEmail = name;
        if (!token) {
          this.router.navigate(['/login']);
        }
      });
  }

  isTokenValid(): boolean {
    const token = localStorage.getItem('AccessToken');
    return token !== null && token.trim() !== '';
  }

  @ViewChild('sidenav') sidenav!: MatSidenav;
  isExpanded = false;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;

  Logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
