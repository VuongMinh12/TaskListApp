import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';
import { User, UserUpdateAddCreate } from '../../model/user';
import { RoleService } from '../../service/role.service';
import { UserService } from '../../service/user.service';
import { ToastService } from '../../service/toast.service';

@Component({
  selector: 'app-user',
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
    NgFor,
    CommonModule,
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  role: number = 0;
  ngOnInit(): void {
    this.LoadRole();
    this.LoadUser();
    const storedRole = localStorage.getItem('RoleId');
    this.role = storedRole ? +storedRole : 0;
    if(this.role > 2){
      this.displayedColumns.splice(this.displayedColumns.indexOf('Edit'), 0, 'IsActive');
    }
  }
  constructor(
    private roleService: RoleService,
    private userService: UserService,
    private toastService: ToastService
  ) {}

  displayedColumns: string[] = [
    'No',
    'Email',
    'FirstName',
    'LastName',
    'RoleName',
    'Edit',
    'Delete',
  ];

  dataSource: MatTableDataSource<User> = new MatTableDataSource();

  PageNumber = 1;
  PageSize = 1000;
  Email = '';
  FirstName = '';
  LastName = '';
  RoleId = 0;
  IsActive = -1;
  userList: UserUpdateAddCreate[] = [];
  roleList: any[] = [];
  updateModel: UserUpdateAddCreate = new UserUpdateAddCreate({});

  LoadRole() {
    var request = {
      PageNumber: this.PageNumber,
      PageSize: this.PageSize,
      RoleName: '',
      IsActive: 1,
    };
    this.roleService.GetRole(request).subscribe(
      (response: any) => {
        this.roleList = response;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  LoadUser() {
    var request = {
      pageNumber: this.PageNumber,
      pageSize: this.PageSize,
      email: this.Email.toLowerCase(),
      firstName: this.FirstName,
      lastName: this.LastName,
      roleId: this.RoleId,
      isActive: this.IsActive
    };
    this.userService.GetAllUser(request).subscribe(
      (data) => {
        this.dataSource = new MatTableDataSource(data);
        this.userList = data;
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  errorMessage = '';
  validateMail() {
    const emailPattern = /[a-zA-Z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,3}$/;
    if (this.updateModel.Email.trim() === '') {
      this.errorMessage = '';
    } else if (!emailPattern.test(this.updateModel.Email)) {
      this.errorMessage = 'Email không hợp lệ! Hãy nhập lại email';
    } else {
      this.errorMessage = '';
    }
  }


  CloseEditAddUser() {
    const modalAdd = document.getElementById('ModalEdit');
    if (modalAdd != null) {
      modalAdd.style.display = 'none';
    }
  }

  editOrAdd: number = 1;
  OpenEditAddUser(element: any, type: number) {
    this.editOrAdd = type;
    const modalAdd = document.getElementById('ModalEdit');
    this.updateModel = new UserUpdateAddCreate(element);
    if (modalAdd != null) {
      modalAdd.style.display = 'block';
    }
  }


  error = '' ;
  OnSave() {
    var request = {
      user: this.updateModel
    };
    if (
      this.updateModel.Email != '' &&
      this.updateModel.FirstName != '' &&
      this.updateModel.LastName != '' &&
      this.updateModel.Password != '' &&
      this.updateModel.RoleId != null
    ) {
      this.error = '';
      if (this.editOrAdd == 1) {
        this.userService.EditUser(request).subscribe((response) => {
          if (response.status == 1) {
            this.CloseEditAddUser();
            this.LoadUser();
            this.toastService.show(response.message,response.status);
          }
          else {
            this.toastService.show(response.message, response.status);
          }
        });
      } else if (this.editOrAdd == 2) {
        this.userService.AddUser(request).subscribe((response) => {
          if (response.status == 1) {
            this.CloseEditAddUser();
            this.LoadUser();
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

  clearRole(){
    this.RoleId = 0;
    this.LoadUser();
  }

  onCancel() {
    const modalDelete = document.getElementById('ModalDelete');
    if (modalDelete != null) {
      modalDelete.style.display = 'none';
    }
  }

  DeleteUser(element: number) {
    const modalDelete = document.getElementById('ModalDelete');
    if (modalDelete != null) {
      modalDelete.style.display = 'block';
    }
    this.updateModel = new UserUpdateAddCreate(element);
    this.updateModel.UserId = element;
  }

  onConfirm() {
    var request = {
      id: this.updateModel.UserId,
    };
    this.userService.DeletetUser(request).subscribe((response) => {
      if (response.status == 1) {
        this.LoadUser();
        this.toastService.show(response.message, response.status);
        this.onCancel();
      }
      else {
        this.toastService.show(response.message, response.status);
      }
    });
  }

}
