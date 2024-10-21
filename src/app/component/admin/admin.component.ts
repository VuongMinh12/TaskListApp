import { CommonModule, NgIf } from "@angular/common";
import { Component, ViewChild } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatSidenav, MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { RouterModule, RouterOutlet } from "@angular/router";



@Component({
  selector: 'app-task',
  standalone: true,
  imports: [
    RouterOutlet, FormsModule, MatToolbarModule,
    MatIconModule,
    MatListModule,
    NgIf,
    MatSidenavModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {


  @ViewChild('sidenav') sidenav!: MatSidenav;
  isExpanded = false;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;

  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }
}
