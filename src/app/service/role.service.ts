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
}
