import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, RouterOutlet } from '@angular/router';
import { User, UserUpdateAddCreate } from '../../model/user';
import { RoleService } from '../../service/role.service';
import { UserService } from '../../service/user.service';

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
    RouterModule,
    CommonModule,
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  ngOnInit(): void {
    this.LoadRole();
    this.LoadUser();
  }
  constructor(
    private roleService: RoleService,
    private userService: UserService
  ) {}

  displayedColumns: string[] = [
    'No',
    'Email',
    'FirstName',
    'LastName',
    'Password',
    'RoleName',
    'IsActive',
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
  IsAcvite = 1;
  userList: UserUpdateAddCreate[] = [];
  roleList: any[] = [];
  updateModel: UserUpdateAddCreate = new UserUpdateAddCreate({});

  LoadRole() {
    var request = {
      PageNumber: this.PageNumber,
      PageSize: this.PageSize,
      RoleName: '',
      IsAcvite: 1,
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
      email: this.Email,
      firstName: this.FirstName,
      lastName: this.LastName,
      roleId: this.RoleId,
      isActive: this.IsAcvite,
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

  validateMail() {
    const emailPattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
    if (!emailPattern.test(this.updateModel.Email)) {
      alert('Email không hợp lệ! Hãy nhập lại email');
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
    this.updateModel.IsActive = 1;
    if (modalAdd != null) {
      modalAdd.style.display = 'block';
    }
  }

  OnSave() {
    var request = {
      user: this.updateModel,
    };
    if (
      this.updateModel.Email != '' &&
      this.updateModel.FirstName != '' &&
      this.updateModel.LastName != '' &&
      this.updateModel.Password != '' &&
      this.updateModel.RoleId != null
    ) {
      if (this.editOrAdd == 1) {
        this.userService.EditUser(request).subscribe((response) => {
          if (response.status == 1) {
            this.CloseEditAddUser();
            this.LoadUser();
          }
          alert(response.message);
        });
      } else if (this.editOrAdd == 2) {
        this.userService.AddUser(request).subscribe((response) => {
          if (response.status == 1) {
            this.CloseEditAddUser();
            this.LoadUser();
          }
          alert(response.message);
        });
      }
    } else {
      alert('Hay nhap va dien day du!');
    }
  }

  DeleteUser(id: any) {
    if (confirm('Bạn có chắc chắn muốn xóa user này?')) {
      var request = {
        id: id,
      };
      this.userService.DeletetUser(request).subscribe((reponse) => {
        if (reponse.status == 1) {
          this.LoadUser();
          reponse.message;
        }
        alert(reponse.message);
      });
    }
  }
}
