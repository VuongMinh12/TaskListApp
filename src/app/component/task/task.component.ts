import {OnInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { RouterOutlet } from '@angular/router';
import {  TaskResponse, TaskUpdateCreate } from '../../model/task';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { TaskService } from '../../service/task.service';
import { DatePipe } from "@angular/common";
import {CalendarModule} from 'primeng/calendar';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [MatPaginator,MatPaginatorModule,MatTableModule,RouterOutlet,MatIconModule,MatToolbarModule,CalendarModule,FormsModule],
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
  updateModel : TaskUpdateCreate = new TaskUpdateCreate();

  constructor(
    private service : TaskService,
  ){}

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  ngOnInit() {
    this.loadAllTask();
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
    // this.taskList = await firstValueFrom(this.service.getAllTaskList());
    this.service.GetListTask(request).subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      console.log('dataSource' , this.dataSource);
      this.tasklist = data;
      console.log('Task List' , this.tasklist);
      this.dataSource.paginator = this.paginator;
    },(error) => { console.log(error); });
  }

  getFormatedDate(date: Date, format: string) {
    const datePipe = new DatePipe("en-US");
    return datePipe.transform(date, format);
  }

  OpenEditTask(){
    const modalAdd = document.getElementById('ModalEdit');

    if (modalAdd != null){
      modalAdd.style.display = 'block';
    }
  }
  CloveEditTask(){
    const modalAdd = document.getElementById('ModalEdit');
    if (modalAdd != null){
      modalAdd.style.display = 'none';
    }
  }
}
