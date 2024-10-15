
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

  GetAllUser(request:any){
    return this.invoker.get( request,"User/AllUser");
  }

  GetUserTask(request:any){
    return this.invoker.get(request,"User/UserTask");
  }
}

