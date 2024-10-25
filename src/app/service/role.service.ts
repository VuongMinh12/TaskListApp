import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceInvoker } from './serviceInvoker';


@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(
    private http: HttpClient,
    private invoker: ServiceInvoker
  ) {}
  GetRole(request: any){
    return this.invoker.get(request, "Role");
  }
  AddRole(request:any){
    return this.invoker.post(request,"Role");
  }
  EditRole(request: any){
    return this.invoker.put(request,"Role/UpdateRole");
  }
  DeleteRole(request:any){
    return this.invoker.put(request,"Role/DeleteRole");
  }
}
