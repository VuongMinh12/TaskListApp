export interface StatusRequest {
  PageNumber : number;
  PageSize : number;
  StatusName : string ;
  IsActive : number;
}

export interface StatusResponse {
  StatusId : number;
  StatusName : string ;
  IsActive : number;
}
