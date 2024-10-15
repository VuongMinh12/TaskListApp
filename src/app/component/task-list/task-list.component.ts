import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { TaskService } from '../../service/task.service';
import { UserService } from '../../service/user.service';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FormsModule } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    MatPaginatorModule,
    CommonModule,
    NgMultiSelectDropDownModule,
    FormsModule,
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit {
  constructor(private service: TaskService, private userService: UserService) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  userList: { [key: number]: string } = {};
  assigneeList: { [key: number]: {item_id: number, item_text: string}[] } = {};
  dropdownList: { item_id: number, item_text: string }[] = [];
  selectedItems: { [key: number]: { item_id: number, item_text: string }[] } = {};
  dropdownSettings: IDropdownSettings = {};

  PageNumber = 1;
  PageSize = 10;
  TitleInput: string = "";
  StatusInput: number = 0;
  CreateDateInput: Date | null = null;
  EndDateInput: Date | null = null;
  tasks: any[] = [];
  statusList: any[] = [];
  totalTasks: number = 0;

  ngOnInit(): void {
    this.initializeDropdownSettings();
    this.loadUser();
    this.loadAllTask();
    this.loadTaskUser();
    this.loadStatus();
    console.log("taskList\n",this.assigneeList);
  }

  initializeDropdownSettings(): void {
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'Unselect All',
      itemsShowLimit: 10,
      allowSearchFilter: true
    };
  }

  loadUser() {
    let request = {};
    this.userService.GetAllUser(request).subscribe(
      (response) => {
        var users: any[] = response.users;

        this.dropdownList = users.map(user => ({
          item_id: user.userId,
          item_text: user.email
        }));

        users.forEach(a => {
          if(!this.userList.hasOwnProperty(a.userId)){
            this.userList[a.userId] = "";
          }
          this.userList[a.userId] = a.email;
        });
      }
    );
  }

  loadTaskUser() {
    let request = {};
    this.userService.GetUserTask(request).subscribe((response: any[]) => {
      response.forEach(a => {
        this.assigneeList[a.taskId] = this.assigneeList[a.taskId] ?? [];

        var temp : {item_id: number, item_text: string} = { item_id: 0, item_text: ""};
        temp.item_id = a.userId;
        temp.item_text = this.userList[a.userId];

        this.assigneeList[a.taskId].push(temp);

        // Initialize selectedItems for each task
        this.selectedItems[a.taskId] = this.assigneeList[a.taskId];
      });
    });
  }

  loadAllTask() {
    var request = {
      pageNumber: this.PageNumber,
      pageSize: this.PageSize,
      title: this.TitleInput.toLowerCase(),
      statusId: this.StatusInput,
      createDate: this.CreateDateInput == null ? "" : this.getFormatedDate(this.CreateDateInput, 'yyyy/MM/dd'),
      finishDate: this.EndDateInput == null ? "" : this.getFormatedDate(this.EndDateInput, 'yyyy/MM/dd'),
    };
    this.service.GetListTask(request).subscribe(
      (response: any) => {
        this.tasks = response;
        response.totalCount = this.totalTasks ;
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

  getFormatedDate(date: Date | null, format: string): string {
    const datePipe = new DatePipe('en-US');
    let temp = datePipe.transform(date, format);
    if (temp == null) return "";
    return temp;
  }

  onItemSelect(item: any, taskId: number) {
    console.log("taskList\n",this.assigneeList);
  }

  onSelectAll(items: any[], taskId: number) {
    console.log("taskList\n",this.assigneeList);
    // this.assigneeList[taskId] = items.map(item => item.item_id);
  }
}
