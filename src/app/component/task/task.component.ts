import {OnInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { RouterOutlet } from '@angular/router';
import { TaskResponse, TaskUpdateCreate } from '../../model/task';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { TaskService } from '../../service/task.service';
import { DatePipe, NgFor } from "@angular/common";
import {CalendarModule} from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [MatPaginator,
    MatPaginatorModule,
    MatTableModule,
    RouterOutlet,
    MatIconModule,
    MatToolbarModule,
    CalendarModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    NgFor,
    RouterModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent  implements OnInit {
  displayedColumns: string[] = ['No', 'Title', 'Status', 'CreateDate' , 'FinishDate' , 'Estimate', 'Edit','Delete'];
  dataSource: MatTableDataSource<TaskResponse> = new MatTableDataSource ;

  PageNumber = 1;
  PageSize = 50;
  TitleInput: string = "";
  StatusInput: number = 0;
  CreateDateInput: Date | null = null;
  EndDateInput: Date | null = null;
  UserInput: number = 0;
  tasklist: TaskUpdateCreate[] = [];
  listTask : any[] = [];
  updateModel : TaskUpdateCreate = new TaskUpdateCreate({});
  editOrAdd: number = 1;
  statusList: any[] = [];


  constructor(
    private service : TaskService,
    private router: Router
  ){}

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  ngOnInit() {
    var token = localStorage.getItem("Token");

    if (token == null){
      this.router.navigate(["/login"]);
      alert("Xin moi nhap tai khoan!");
    }
    else{
      this.loadAllTask();
      this.loadStatus();
    }
  }

  loadAllTask() {
    var request = {
      pageNumber: this.PageNumber,
      pageSize: this.PageSize,
      title: this.TitleInput,
      statusId: this.StatusInput,
      createDate: this.CreateDateInput == null ? "" : this.getFormatedDate(this.CreateDateInput,"yyyy/MM/dd"),
      finishDate: this.EndDateInput == null ? "" : this.getFormatedDate(this.EndDateInput,"yyyy/MM/dd"),
    }
    this.service.GetListTask(request).subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.tasklist = data;
      this.dataSource.paginator = this.paginator;
    },(error) => { console.log(error); });
  }

  loadStatus(){
    var request = {
    PageNumber : this.PageNumber,
    PageSize : this.PageSize,
    StatusName : "",
    IsActive : 1,
    }
    this.service.GetStatus(request).subscribe((response : any) => {
      this.statusList = response;
    },(error : any) => { console.log(error); });
  }

  OnSave(){
    var request = {
      task: this.updateModel
    }
    if(this.editOrAdd == 1){
      this.service.EditTask(request).subscribe(reponse => {
        if(reponse.status == 1){
          this.CloveEditAddTask();
          this.loadAllTask();
        }
        alert(reponse.message);
      });
    }
    else if(this.editOrAdd == 2)
    {
      this.service.AddTask(request).subscribe(reponse => {
        if(reponse.status == 1){
          this.CloveEditAddTask();
          this.loadAllTask();
        }
        alert(reponse.message);
      });
    }

  }

  getFormatedDate(date: Date, format: string) {
    const datePipe = new DatePipe("en-US");
    return datePipe.transform(date, format);
  }

  //1 edit, 2 create
  OpenEditAddTask(element: any, type: number){
    this.editOrAdd = type;
    const modalAdd = document.getElementById('ModalEdit');
    this.updateModel = new TaskUpdateCreate(element);

    if (modalAdd != null){
      modalAdd.style.display = 'block';
    }
  }
  CloveEditAddTask(){
    const modalAdd = document.getElementById('ModalEdit');
    if (modalAdd != null){
      modalAdd.style.display = 'none';
    }
  }

  DeleteTask(id: any){
    if(confirm("Ban co chac chan muon xoa?")) {
      var request = {
        id: id,
      }
      this.service.DeleteTask(request).subscribe(reponse => {
        if(reponse.status == 1){
          this.loadAllTask();
        }
        alert(reponse.message);
      });
    }
  }
}
