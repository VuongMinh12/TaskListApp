import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, RouterOutlet } from '@angular/router';
import { RoleService } from '../../service/role.service';
import { Role, RoleUpdateAddCreate } from '../../model/role';
import { ToastService } from '../../service/toast.service';

@Component({
  selector: 'app-role',
  standalone: true,
  imports: [
    MatPaginator,
    MatPaginatorModule,
    MatTableModule,
    RouterOutlet,
    MatIconModule,
    MatToolbarModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    RouterModule,
    CommonModule,
  ],
  templateUrl: './role.component.html',
  styleUrl: './role.component.css'
})
export class RoleComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  displayedColumns: string[] = [
    'No',
    'RoleName',
    'IsActive',
    'Edit',
    'Delete',
  ];

  constructor(private roleService: RoleService, private toastService : ToastService) {}

  dataSource: MatTableDataSource<Role> = new MatTableDataSource();

  PageNumber = 1;
  PageSize = 20;
  RoleName = "";
  IsActive = -1;
  roleList: [] = [];
  updateModel: RoleUpdateAddCreate = new RoleUpdateAddCreate({});


  ngOnInit(): void {
    this.loadRole();
  }

  loadRole(){
    var request = {
      PageNumber: this.PageNumber,
      PageSize: this.PageSize,
      RoleName: this.RoleName,
      IsActive: this.IsActive,
    };
    this.roleService.GetRole(request).subscribe(
      (data) => {
        this.dataSource = new MatTableDataSource(data);
        this.roleList = data;
        this.dataSource.paginator = this.paginator;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  CloseEditAddRole() {
    const modalAdd = document.getElementById('ModalEdit');
    if (modalAdd != null) {
      modalAdd.style.display = 'none';
    }
  }

  editOrAdd: number = 1;
  OpenEditAddRole(element: any, type: number) {
    this.editOrAdd = type;
    const modalAdd = document.getElementById('ModalEdit');
    this.updateModel = new RoleUpdateAddCreate(element);
    if (modalAdd != null) {
      modalAdd.style.display = 'block';
    }
  }

  error = '';
  OnSave() {
    var request = {
      role: this.updateModel
    };

    if (this.updateModel.RoleName) {
      this.error = '';
      if (this.editOrAdd == 1) {
        this.roleService.EditRole(request).subscribe((response) => {
          if (response.status == 1) {
            this.CloseEditAddRole();
            this.loadRole();
            this.toastService.show(response.message,response.status);
          }
          else {
            this.toastService.show(response.message, response.status);
          }
        });
      } else if (this.editOrAdd == 2) {
        this.roleService.AddRole(request).subscribe((response) => {
          if (response.status == 1) {
            this.CloseEditAddRole();
            this.loadRole();
            this.toastService.show(response.message,response.status);
          }
          else {
            this.toastService.show(response.message, response.status);
          }
        });
      }
    } else {
      this.error = 'Vui lòng nhập đầy đủ thông tin';
    }
  }

  onCancel() {
    const modalDelete = document.getElementById('ModalDelete');
    if (modalDelete != null) {
      modalDelete.style.display = 'none';
    }
  }

  DeleteRole(element: number) {
    const modalDelete = document.getElementById('ModalDelete');
    if (modalDelete != null) {
      modalDelete.style.display = 'block';
    }
    this.updateModel = new RoleUpdateAddCreate(element);
    this.updateModel.RoleId = element;
  }

  onConfirm() {
    var request = {
      id: this.updateModel.RoleId,
    };
    this.roleService.DeleteRole(request).subscribe((response) => {
      if (response.status == 1) {
        this.loadRole();
        this.toastService.show(response.message, response.status);
        this.onCancel();
      }
      else {
        this.toastService.show(response.message, response.status);
      }
    });
  }

}
