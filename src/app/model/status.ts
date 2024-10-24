export interface Status {
  No: number,
  StatusName : string,
  IsActive : boolean,
  StatusId : number
}
export class StatusUpdateAddCreate {
  StatusId : number;
  StatusName : string;
  IsActive : number;

  constructor(temp: any){
    this.StatusId = temp.statusId;
    this.StatusName = temp.statusName ;
    this.IsActive = temp.isActive;
  }
}
