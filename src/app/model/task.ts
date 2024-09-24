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

  constructor(){
    this.TaskId = 0;
    this.Title = "" ;
    this.StatusId = 0;
    this.CreateDate = new Date();
    this.FinishDate = new Date();
    this.Estimate = 0;
  }
}
