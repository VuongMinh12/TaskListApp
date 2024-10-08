import { OnInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterOutlet } from '@angular/router';
import { Task, TaskUpdateAddCreate } from '../../model/task';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TaskService } from '../../service/task.service';
import { DatePipe, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-task',
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

  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent implements OnInit {
  displayedColumns: string[] = [
    'No',
    'Title',
    'Status',
    'CreateDate',
    'FinishDate',
    'Estimate',
    'Edit',
    'Delete',
  ];
  dataSource: MatTableDataSource<Task> = new MatTableDataSource();

  PageNumber = 1;
  PageSize = 50;
  TitleInput: string = "";
  StatusInput: number = 2;
  CreateDateInput: Date | null = null;
  EndDateInput: Date | null = null;
  UserInput: number = 0;
  tasklist: TaskUpdateAddCreate[] = [];
  listTask: any[] = [];
  updateModel: TaskUpdateAddCreate = new TaskUpdateAddCreate({});
  editOrAdd: number = 1;
  statusList: any[] = [];

  editCreateDate: string = "";
  editEndDate: string = "";

  constructor(private service: TaskService, private router: Router, ) {}

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  ngOnInit() {
    this.loadStatus();
    this.loadAllTask();
  }

  clearStatus() {
    this.StatusInput = 0;
    this.loadAllTask();
  }

  loadAllTask() {
    var request = {
      pageNumber: this.PageNumber,
      pageSize: this.PageSize,
      title: this.TitleInput.toLowerCase(),
      statusId: this.StatusInput,
      createDate:
        this.CreateDateInput == null? '': this.getFormatedDate(this.CreateDateInput, 'yyyy/MM/dd'),
      finishDate: this.EndDateInput == null? '': this.getFormatedDate(this.EndDateInput, 'yyyy/MM/dd'),
    };
    this.service.GetListTask(request).subscribe(
      (data) => {
        this.dataSource = new MatTableDataSource(data);
        this.tasklist = data;
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  loadStatus() {
    var request = {
      PageNumber: this.PageNumber,
      PageSize: this.PageSize,
      StatusName: '',
      IsActive: 1,
    };
    this.service.GetStatus(request).subscribe(
      (response: any) => {
        this.statusList = response;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  OnSave() {
    this.updateModel.CreateDate = new Date(this.editCreateDate);
    this.updateModel.FinishDate = new Date(this.editEndDate);
    var request = {
      task: this.updateModel,
    };
    if (
      this.updateModel.Title != "" &&
      this.updateModel.StatusId != null &&
      this.updateModel.CreateDate != null &&
      this.updateModel.FinishDate != null &&
      this.updateModel.Estimate != null
    ) {

      if (this.updateModel.CreateDate > this.updateModel.FinishDate) {
        alert('CreateDate không được lớn hơn FinishDate');
        this.updateModel.CreateDate.getDay();
        this.updateModel.CreateDate.getDay();
      } else {
        if (this.updateModel.Estimate <= 0) {
          alert('Estimate phải lớn hơn 0');

        } else {
          if (this.editOrAdd == 1) {
            this.service.EditTask(request).subscribe((reponse) => {
              if (reponse.status == 1) {
                this.CloveEditAddTask();
                this.loadAllTask();
              }
              alert(reponse.message);
            });
          } else if (this.editOrAdd == 2) {
            this.service.AddTask(request).subscribe((reponse) => {
              if (reponse.status == 1) {
                this.CloveEditAddTask();
                this.loadAllTask();
              }
              alert(reponse.message);
            });
          }
        }
      }
    } else {
      alert('Hay nhap va dien day du!');
    }
  }

  getFormatedDate(date: Date| null, format: string) : string {
    const datePipe = new DatePipe('en-US');
    let temp = datePipe.transform(date, format);
    if (temp == null) return ""
    return temp;
  }

  //1 edit, 2 create
  OpenEditAddTask(element: any, type: number) {
    this.editOrAdd = type;
    const modalAdd = document.getElementById('ModalEdit');
    this.updateModel = new TaskUpdateAddCreate(element);
    this.editCreateDate = this.getFormatedDate(this.updateModel.CreateDate, 'yyyy-MM-dd');
    this.editEndDate = this.getFormatedDate(this.updateModel.FinishDate, 'yyyy-MM-dd');
    if (modalAdd != null) {
      modalAdd.style.display = 'block';
    }
  }

  CloveEditAddTask() {
    const modalAdd = document.getElementById('ModalEdit');
    if (modalAdd != null) {
      modalAdd.style.display = 'none';
    }
  }

  DeleteTask(id: any) {
    if (confirm('Bạn có chắc chắn muốn xóa task này?')) {
      var request = {
        id: id,
      };
      this.service.DeleteTask(request).subscribe((reponse) => {
        console.log(id);
        if (reponse.status == 1) {
          this.loadAllTask();
          reponse.message
        }
        alert(reponse.message);
      });
    }
  }

  Logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
