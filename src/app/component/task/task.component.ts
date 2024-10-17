import { OnInit, Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterOutlet } from '@angular/router';
import { Task, TaskUpdateAddCreate } from '../../model/task';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TaskService } from '../../service/task.service';
import { CommonModule, DatePipe, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule, Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import {
  IDropdownSettings,
  NgMultiSelectDropDownModule,
} from 'ng-multiselect-dropdown';

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
    CommonModule,
    NgMultiSelectDropDownModule,
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
    'Assignee',
    'Edit',
    'Delete',
  ];

  dataSource: MatTableDataSource<Task> = new MatTableDataSource();

  PageNumber = 1;
  PageSize = 1000;
  TitleInput: string = '';
  StatusInput: number = 2;
  CreateDateInput: Date | null = null;
  EndDateInput: Date | null = null;
  UserInput: number = 0;
  tasklist: TaskUpdateAddCreate[] = [];
  listTask: any[] = [];
  updateModel: TaskUpdateAddCreate = new TaskUpdateAddCreate({});
  editOrAdd: number = 1;
  statusList: any[] = [];

  editCreateDate: string = '';
  editEndDate: string = '';

  userList: { [key: number]: string } = {};
  assigneeList: { [key: number]: { item_id: number; item_text: string }[] } =
    {};
  dropdownList: { item_id: number; item_text: string }[] = [];
  selectedItems: { [key: number]: { item_id: number; item_text: string }[] } =
    {};

  constructor(
    private service: TaskService,
    private router: Router,
    private userService: UserService
  ) {}

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  ngOnInit() : void {
    this.loadUser();
    this.loadAllTask();
    this.loadStatus();
    this.initializeDropdownSettings();
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
        this.CreateDateInput == null
          ? ''
          : this.getFormatedDate(this.CreateDateInput, 'yyyy/MM/dd'),
      finishDate:
        this.EndDateInput == null
          ? ''
          : this.getFormatedDate(this.EndDateInput, 'yyyy/MM/dd'),
    };
    this.service.GetListTask(request).subscribe(
      (data) => {
        this.dataSource = new MatTableDataSource(data);
        this.tasklist = data;
        this.dataSource.paginator = this.paginator;
        this.loadTaskUser();
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

  //updaet = 1; add = 2
  OnSave() {
    this.updateModel.CreateDate = new Date(this.editCreateDate);
    this.updateModel.FinishDate = new Date(this.editEndDate);
    this.updateModel.listUser = [];
    if (this.CurrentAssigneeList != null ){
      this.CurrentAssigneeList.forEach((u) => {
        this.updateModel.listUser.push(u.item_id);
      });
    }else {
      this.updateModel.listUser = [];
    }
    var request = {
      task: this.updateModel,
    };
    if (
      this.updateModel.Title != '' &&
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

  getFormatedDate(date: Date | null, format: string): string {
    const datePipe = new DatePipe('en-US');
    let temp = datePipe.transform(date, format);
    if (temp == null) return '';
    return temp;
  }

  CurrentAssigneeList: any[] = [];
  //1 edit, 2 create
  OpenEditAddTask(element: any, type: number) {
    this.editOrAdd = type;
    const modalAdd = document.getElementById('ModalEdit');
    this.updateModel = new TaskUpdateAddCreate(element);
    this.editCreateDate = this.getFormatedDate(
      this.updateModel.CreateDate,
      'yyyy-MM-dd'
    );
    this.editEndDate = this.getFormatedDate(
      this.updateModel.FinishDate,
      'yyyy-MM-dd'
    );
    this.CurrentAssigneeList = this.assigneeList[element.taskId];

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
        if (reponse.status == 1) {
          this.loadAllTask();
          reponse.message;
        }
        alert(reponse.message);
      });
    }
  }

  Logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  loadUser() {
    let request = {};
    this.userService.GetAllUser(request).subscribe((response) => {
      var users: any[] = response.users;

      this.dropdownList = users.map((user) => ({
        item_id: user.userId,
        item_text: user.email,
      }));

      users.forEach((a) => {
        if (!this.userList.hasOwnProperty(a.userId)) {
          this.userList[a.userId] = '';
        }
        this.userList[a.userId] = a.email;
      });
    });
  }

  loadTaskUser() {
    this.assigneeList = []
    let request = {};
    this.userService.GetUserTask(request).subscribe((response: any) => {
      response.usersTask.forEach((a: { taskId: number; userId: number; }) => {
        this.assigneeList[a.taskId] = this.assigneeList[a.taskId] ?? [];

        var temp: { item_id: number; item_text: string } = {
          item_id: 0,
          item_text: '',
        };
        temp.item_id = a.userId;
        temp.item_text = this.userList[a.userId];

        this.assigneeList[a.taskId].push(temp);

        this.selectedItems[a.taskId] = this.assigneeList[a.taskId];
      });
    });
  }

  dropdownSettings: IDropdownSettings = {};
  initializeDropdownSettings(): void {
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'Unselect All',
      itemsShowLimit: 10,
      allowSearchFilter: true,
    };
  }

  onItemSelect(item: any, taskId: number) {
    console.log('taskList\n', this.assigneeList);
  }
}
