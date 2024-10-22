export interface User {
  No :number ;
  UserId : number,
  Email : string;
  FirstName : string;
  LastName : string;
  Password : string;
  RoleName : string;
  IsActive : boolean;
}
export class UserUpdateAddCreate {
  UserId : number;
  Email : string;
  FirstName : string;
  LastName : string;
  Password : string;
  RoleId : number;
  IsActive : number;

  constructor(temp: any){
    this.UserId = temp.userId;
    this.Email = temp.email ;
    this.FirstName = temp.firstName;
    this.LastName = temp.lastName;
    this.Password = temp.password;
    this.RoleId = temp.roleId;
    this.IsActive = temp.isActive;
  }
}
