import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceInvoker } from './serviceInvoker';


@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor(
    private http: HttpClient,
    private invoker: ServiceInvoker
  ) {}
  GetStatus(request: any){
    return this.invoker.get(request, "Status");
  }
}
