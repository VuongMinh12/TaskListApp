export interface Role {
  No: number,
  RoleName : string,
  IsActive : boolean,
  RoleId : number
}
export class RoleUpdateAddCreate {
  RoleId : number;
  RoleName : string;
  IsActive : number;

  constructor(temp: any){
    this.RoleId = temp.roleId;
    this.RoleName = temp.roleName ;
    this.IsActive = temp.isActive;
  }
}
