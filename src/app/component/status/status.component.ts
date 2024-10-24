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
import { StatusService } from '../../service/status.service';
import { Status, StatusUpdateAddCreate } from '../../model/status';

@Component({
  selector: 'app-status',
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
  templateUrl: './status.component.html',
  styleUrl: './status.component.css',
})
export class StatusComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  ngOnInit(): void {
    this.loadStatus();
  }

  displayedColumns: string[] = [
    'No',
    'StatusName',
    'IsActive',
    'Edit',
    'Delete',
  ];

  constructor(private statusService: StatusService) {}

  dataSource: MatTableDataSource<Status> = new MatTableDataSource();

  PageNumber = 1;
  PageSize = 20;
  statusList: [] = [];
  updateModel: StatusUpdateAddCreate = new StatusUpdateAddCreate({});

  loadStatus() {
    var request = {
      PageNumber: this.PageNumber,
      PageSize: this.PageSize,
      StatusName: '',
      IsActive: 1,
    };
    this.statusService.GetStatus(request).subscribe(
      (data) => {
        this.dataSource = new MatTableDataSource(data);
        this.statusList = data;
        this.dataSource.paginator = this.paginator;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  CloseEditAddStatus() {
    const modalAdd = document.getElementById('ModalEdit');
    if (modalAdd != null) {
      modalAdd.style.display = 'none';
    }
  }

  editOrAdd: number = 1;
  OpenEditAddStatus(element: any, type: number) {
    this.editOrAdd = type;
    const modalAdd = document.getElementById('ModalEdit');
    this.updateModel = new StatusUpdateAddCreate(element);
    if (modalAdd != null) {
      modalAdd.style.display = 'block';
    }
  }

  OnSave() {
    var request = {
      status: this.updateModel,
    };
    if (this.updateModel.StatusName != '') {
      if (this.editOrAdd == 1) {
        this.statusService.EditStatus(request).subscribe((response) => {
          if (response.status == 1) {
            this.CloseEditAddStatus();
            this.loadStatus();
          }
          alert(response.message);
        });
      } else if (this.editOrAdd == 2) {
        this.statusService.AddStatus(request).subscribe((response) => {
          if (response.status == 1) {
            this.CloseEditAddStatus();
            this.loadStatus();
          }
          alert(response.message);
        });
      }
    } else {
      alert('Hay nhap ten cua Status!');
    }
  }

  DeleteStatus(id: any) {
    if (confirm('Bạn có chắc chắn muốn xóa status này?')) {
      var request = {
        id: id,
      };
      this.statusService.DeleteStatus(request).subscribe((reponse) => {
        if (reponse.status == 1) {
          this.loadStatus();
          reponse.message;
        }
        alert(reponse.message);
      });
    }
  }
}
