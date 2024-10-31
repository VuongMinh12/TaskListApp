
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceInvoker } from './serviceInvoker';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private invoker: ServiceInvoker
  ) {}

  GetUser(request:any){
    return this.invoker.get( request,"User/AllUser");
  }

  GetUserTask(request:any){
    return this.invoker.get(request,"User/UserTask");
  }
  GetAllUser (request:any){
    return this.invoker.get(request,"User/GetAllUser");
  }
  EditUser(request : any){
    return this.invoker.put(request, "User/UpdateUser");
  }
  AddUser (request : any){
    return this.invoker.post(request,"User");
  }
  DeletetUser(request : any){
    return this.invoker.put(request, "User/DeleteUser");
  }
}

