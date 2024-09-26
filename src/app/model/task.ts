export interface TaskResponse {
  No :number ;
  Title : string;
  StatusName : string;
  CreateDate : Date;
  FinishDate : Date;
  Estimate : number;
  UserName : string;
}

export interface TaskRequest {
  PageNumber : number,
  PageSize : number,
  Title : string ,
  StatusId : number,
  CreateDate : string,
  FinishDate : string,
  UserId : number
}
export class TaskUpdateCreate {
  TaskId : number;
  Title : string;
  StatusId : number;
  CreateDate : Date;
  FinishDate : Date;
  Estimate : number;

  constructor(temp: any){
    this.TaskId = temp.taskId;
    this.Title = temp.title ;
    this.StatusId = temp.statusId;
    this.CreateDate = temp.createDate;
    this.FinishDate = temp.finishDate;
    this.Estimate = temp.estimate;
  }
}
